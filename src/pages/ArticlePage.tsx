import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock3,
  Compass,
  Link2,
  MessageCircle,
  Share2,
  Tag,
  TriangleAlert,
} from 'lucide-react'
import {
  getNoticeBySlug,
  getNoticeCategory,
  getRelatedNotices,
  type ArticleBlock,
} from '../lib/data/notices'
import { NoticeCard } from '../components/notices/NoticeCard'
import { ReadingProgress } from '../components/shared/ReadingProgress'
import { Reveal } from '../components/shared/Reveal'
import { ScrollToContent } from '../components/shared/ScrollToContent'
import { formatDate } from '../lib/utils/date'

type ShareStatus = 'idle' | 'copied' | 'shared' | 'error'

const copyText = async (value: string): Promise<boolean> => {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value)
      return true
    }
  } catch {
    // Fall through to the legacy path below.
  }

  try {
    const field = document.createElement('textarea')
    field.value = value
    field.setAttribute('readonly', '')
    field.style.position = 'fixed'
    field.style.opacity = '0'
    document.body.appendChild(field)
    field.select()
    const copied = document.execCommand('copy')
    document.body.removeChild(field)
    return copied
  } catch {
    return false
  }
}

function ArticleContent({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="article-body__content">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'heading':
            return <h2 key={index}>{block.text}</h2>
          case 'list':
            return (
              <ul key={index}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )
          case 'quote':
            return (
              <blockquote key={index}>
                <p>{block.text}</p>
                {block.attribution ? <cite>{block.attribution}</cite> : null}
              </blockquote>
            )
          default:
            return <p key={index}>{block.text}</p>
        }
      })}
    </div>
  )
}

export function ArticlePage() {
  const { slug = '' } = useParams()
  const article = useMemo(() => getNoticeBySlug(slug), [slug])
  const related = useMemo(() => (article ? getRelatedNotices(article, 3) : []), [article])
  const [shareStatus, setShareStatus] = useState<ShareStatus>('idle')

  useEffect(() => {
    if (!article) return
    document.title = `${article.title} — FlightsFuzz`
    return () => {
      document.title = 'Notices — FlightsFuzz'
    }
  }, [article])

  useEffect(() => {
    if (shareStatus === 'idle') return
    const timer = window.setTimeout(() => setShareStatus('idle'), 3200)
    return () => window.clearTimeout(timer)
  }, [shareStatus])

  if (!article) {
    return (
      <div className="notices-page">
        <section className="article-missing">
          <div className="article-missing__glow" aria-hidden="true" />
          <div className="container article-missing__inner">
            <Reveal>
              <p className="eyebrow eyebrow--light"><span className="eyebrow__dot" /> Notice not found</p>
              <h1>THIS STORY<br /><span>HASN’T LANDED.</span></h1>
              <p>
                The article you requested does not exist, is still a draft, or has been archived.
                Only published notices are available in this demonstration.
              </p>
              <div className="article-missing__actions">
                <Link to="/notices" className="btn btn--primary btn--lg">
                  <ArrowLeft size={17} /> Back to notices
                </Link>
                <Link to="/flights" className="btn btn--ghost-light btn--lg">
                  Search flights <ArrowRight size={17} />
                </Link>
              </div>
            </Reveal>
            <Reveal className="article-missing__card" delay={90}>
              <TriangleAlert size={26} />
              <span>FF / 404</span>
              <strong>NOTICE UNAVAILABLE</strong>
              <p>Draft and archived content is deliberately hidden from public routes.</p>
            </Reveal>
          </div>
        </section>
      </div>
    )
  }

  const category = getNoticeCategory(article.category)
  const shareUrl = typeof window === 'undefined' ? '' : window.location.href

  const handleShare = async () => {
    setShareStatus('idle')
    const payload = {
      title: article.title,
      text: article.excerpt,
      url: shareUrl,
    }

    if (typeof navigator.share === 'function') {
      try {
        await navigator.share(payload)
        setShareStatus('shared')
        return
      } catch (error) {
        // Cancelling the share sheet is not an error, but any real failure
        // (unsupported payload, blocked share, no user activation) should
        // still fall through to the clipboard path.
        if (error instanceof DOMException && error.name === 'AbortError') return
      }
    }

    const copied = await copyText(shareUrl)
    setShareStatus(copied ? 'copied' : 'error')
  }

  const shareLabel =
    shareStatus === 'copied'
      ? 'Link copied'
      : shareStatus === 'shared'
        ? 'Shared'
        : shareStatus === 'error'
          ? 'Copy failed'
          : 'Share article'

  const shareHelper =
    shareStatus === 'copied'
      ? 'The article link is on your clipboard.'
      : shareStatus === 'shared'
        ? 'The article link was passed to your share sheet.'
        : shareStatus === 'error'
          ? 'Clipboard access was blocked. Copy the page URL from your browser instead.'
          : 'Native sharing where supported, clipboard everywhere else.'

  return (
    <div className="notices-page article-page">
      <ReadingProgress targetId="article-body" />

      <header className="article-hero">
        <div className="article-hero__grid" aria-hidden="true" />
        <div className="article-hero__glow" aria-hidden="true" />
        <div className="container article-hero__inner">
          <Reveal className="article-hero__copy">
            <Link to="/notices" className="article-back">
              <ArrowLeft size={15} /> Back to notices
            </Link>
            <div className="article-hero__meta">
              <span className="article-hero__category">{category?.label ?? 'Notice'}</span>
              <span>{formatDate(article.publishedAt)}</span>
              <span className="notice-card__dot" aria-hidden="true" />
              <span><Clock3 size={13} /> {article.readingTime} min read</span>
            </div>
            <h1>{article.title}</h1>
            <p className="article-hero__excerpt">{article.excerpt}</p>
            <div className="article-hero__actions">
              <button type="button" className="btn btn--ghost-light" onClick={handleShare}>
                {shareStatus === 'copied' || shareStatus === 'shared' ? <Check size={16} /> : <Share2 size={16} />}
                {shareLabel}
              </button>
              {shareStatus === 'error' ? (
                <span className="article-hero__share-note" role="status">
                  Copy the page URL from your browser instead.
                </span>
              ) : (
                <span className="article-hero__share-note">Web Share or clipboard fallback</span>
              )}
            </div>
            <ScrollToContent targetId="article-body" label="Scroll to read" />
          </Reveal>

          <Reveal className="article-hero__aside" delay={100}>
            <div className="article-hero__stamp">
              <span>SAMPLE ARTICLE</span>
              <strong>{category?.label}</strong>
              <i />
              <p>{category?.description}</p>
            </div>
            {article.updatedAt ? (
              <span className="article-hero__updated">Updated {formatDate(article.updatedAt)}</span>
            ) : null}
          </Reveal>
        </div>
      </header>

      <div className="container article-cover">
        <Reveal>
          <figure>
            <img src={article.coverImage} alt={article.coverAlt} />
            <figcaption>{article.coverAlt} · demonstration image</figcaption>
          </figure>
        </Reveal>
      </div>

      <section className="article-body" id="article-body">
        <div className="container article-body__grid">
          <article className="article-body__main">
            <ArticleContent blocks={article.content} />

            <div className="article-body__tags">
              <span><Tag size={14} /> Tags</span>
              {article.tags.map((tag) => (
                <span key={tag} className="article-tag">{tag}</span>
              ))}
            </div>

            <div className="article-body__disclaimer">
              <TriangleAlert size={18} />
              <p>
                <strong>Demonstration content.</strong> This article was written to demonstrate the
                editorial experience. It is not an official FlightsFuzz announcement, live fare,
                airline statement or travel advisory. Always verify details with the airline and
                official authorities.
              </p>
            </div>

            <div className="article-body__share">
              <div>
                <span className="micro-label">Share this story</span>
                <p>{shareHelper}</p>
              </div>
              <button type="button" className="btn btn--outline btn--sm" onClick={handleShare}>
                {shareStatus === 'copied' || shareStatus === 'shared' ? <Check size={15} /> : <Link2 size={15} />}
                {shareLabel}
              </button>
            </div>
          </article>

          <aside className="article-body__aside">
            <div className="article-side-card">
              <span className="micro-label">In this category</span>
              <strong>{category?.label}</strong>
              <p>{category?.description}</p>
              <Link to="/notices" className="text-link">
                All notices <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="article-side-card article-side-card--dark">
              <Compass size={21} />
              <strong>Planning a trip?</strong>
              <p>Search a route or start a request. Human review comes before any real booking.</p>
              <Link to="/flights" className="btn btn--primary btn--sm">
                Search flights <ArrowRight size={15} />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--soft article-related">
        <div className="container">
          <div className="article-related__head">
            <Reveal>
              <span className="section-kicker"><span>03</span> Keep reading</span>
              <h2>RELATED<br />DISPATCHES.</h2>
            </Reveal>
            <Reveal className="article-related__aside" delay={60}>
              <p>More sample guides and notices from the FlightsFuzz editorial desk.</p>
              <Link to="/notices" className="text-link">All notices <ArrowUpRight size={14} /></Link>
            </Reveal>
          </div>

          <div className="article-related__grid">
            {related.map((item, index) => (
              <NoticeCard key={item.id} article={item} index={index} variant="standard" />
            ))}
          </div>
        </div>
      </section>

      <section className="article-cta">
        <div className="container article-cta__inner">
          <Reveal>
            <h2>READY WHEN<br />YOU ARE.</h2>
            <p>Turn the context into a route, a date and a structured request.</p>
          </Reveal>
          <Reveal className="article-cta__actions" delay={70}>
            <Link to="/flights" className="btn btn--primary btn--lg">
              Search flights <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn btn--ghost-light btn--lg">
              <MessageCircle size={17} /> Contact the team
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
