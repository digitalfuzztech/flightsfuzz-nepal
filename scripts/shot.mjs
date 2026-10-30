import { spawn } from 'node:child_process'
import { mkdir, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

const [url = 'http://localhost:5173/', widthArg = '1440', heightArg = '1000', out = 'shot.png', fullArg = 'false', scrollArg = '0'] = process.argv.slice(2)
const width = Number(widthArg)
const height = Number(heightArg)
const fullPage = fullArg === 'true'
const scrollY = Number(scrollArg)
const port = 9333 + Math.floor(Math.random() * 300)
const profile = join(tmpdir(), `ff-edge-${Date.now()}`)
const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'

await mkdir(profile, { recursive: true })

const proc = spawn(edge, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  '--no-first-run',
  '--no-default-browser-check',
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`,
  'about:blank',
], { stdio: 'ignore' })

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

let version
for (let attempt = 0; attempt < 80; attempt += 1) {
  try {
    const response = await fetch(`http://127.0.0.1:${port}/json/version`)
    if (response.ok) {
      version = await response.json()
      break
    }
  } catch {}
  await sleep(100)
}
if (!version) throw new Error('Edge did not start')

const targetResponse = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(url)}`, { method: 'PUT' })
const target = await targetResponse.json()
const socket = new WebSocket(target.webSocketDebuggerUrl)

await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true })
  socket.addEventListener('error', reject, { once: true })
})

let nextId = 1
const pending = new Map()
socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data)
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id)
    pending.delete(message.id)
    if (message.error) reject(new Error(JSON.stringify(message.error)))
    else resolve(message.result)
  }
})
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = nextId++
  pending.set(id, { resolve, reject })
  socket.send(JSON.stringify({ id, method, params }))
})

await send('Page.enable')
await send('Runtime.enable')
await send('Emulation.setDeviceMetricsOverride', {
  width,
  height,
  deviceScaleFactor: 1,
  mobile: width < 700,
})
await send('Page.navigate', { url })
await sleep(3200)

if (scrollY) {
  await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${scrollY})` })
  await sleep(700)
}

if (fullPage) {
  const metrics = await send('Page.getLayoutMetrics')
  const content = metrics.cssContentSize ?? metrics.contentSize
  await send('Emulation.setDeviceMetricsOverride', {
    width,
    height: Math.min(Math.ceil(content.height), 20000),
    deviceScaleFactor: 1,
    mobile: width < 700,
  })
  await sleep(500)
}

const screenshot = await send('Page.captureScreenshot', { format: 'png', fromSurface: true })
await writeFile(out, Buffer.from(screenshot.data, 'base64'))
console.log(JSON.stringify({ out, width, height, fullPage }))

socket.close()
proc.kill()
await sleep(300)
await rm(profile, { recursive: true, force: true }).catch(() => {})
process.exit(0)
