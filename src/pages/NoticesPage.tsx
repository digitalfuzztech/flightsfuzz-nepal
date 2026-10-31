import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Mail,
  MessageCircle,
  Newspaper,
  SearchX,
  Sparkles,
} from 'lucide-react'
import {
  NOTICE_CATEGORIES,
  getCategoryCounts,
  getFeaturedNotice,
  getPublishedNotices,
  getNoticeCategory,
  type NoticeArticle,
  type NoticeCategoryId,
} from '../lib/data/notices'
import { NoticeCard, type NoticeCardVariant } from '../components/notices/NoticeCard'
import { ScrollToContent } from '../components/shared/ScrollToContent'
import { Reveal } from '../components/shared/Reveal'
import { formatDate } from '../lib/utils/date'
import { cn } from '../lib/utils/format'

type FilterValue = 'all' | NoticeCategoryId

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const variantFor = (
  index: number,
  total: number,
  filtered: boolean,
): NoticeCardVariant => {
  // Filtered views are short, so a spanning card would leave an empty gutter.
  if (filtered) return index === 0 && total > 2 ? 'wide' : 'standard'
  if (index === 0) return 'wide'
  if (index === 1 && total > 2) return 'tall'
  if (index === 3 && total > 4) return 'text'
  return 'standard'
}

export function NoticesPage() {
  const [activeCategory, setActiveCategory] = useState<FilterValue>('all')
  const [email, setEmail] = useState('')
  const [subscribeError, setSubscribeError] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const published = useMemo(() => getPublishedNotices(), [])
  const featured = useMemo(() => getFeaturedNotice(), [])
  const counts = useMemo(() => getCategoryCounts(), [])

  const list = useMemo(() => {
    const withoutFeatured = activeCategory === 'all' && featured
      ? published.filter((article) => article.id !== featured.id)
      : published
    return activeCategory === 'all'
      ? withoutFeatured
      : withoutFeatured.filter((article) => article.category === activeCategory)
  }, [activeCategory, featured, published])

  const handleSubscribe = (event: React.FormEvent) => {
    event.preventDefault()
    if (!EMAIL_PATTERN.test(email.trim())) {
      setSubscribeError('Enter a valid email address to preview the subscription state.')
      setSubscribed(false)
      return
    }
    setSubscribeError('')
    setSubscribed(true)
  }

  return (
    <div className="notices-page">
      <header className="notices-hero">
        <div className="notices-hero__grid" aria-hidden="true" />
        <div className="notices-hero__glow" aria-hidden="true" />
        <div className="container notices-hero__inner">
          <Reveal className="notices-hero__copy">
            <p className="eyebrow eyebrow--light">
              <span className="eyebrow__dot" /> Notices &amp; articles · editorial demo
            </p>
            <h1>
              WHAT’S HAPPENING<br />
              IN THE <span>WORLD OF FLIGHTS.</span>
            </h1>
            <p className="notices-hero__lead">
              Travel guides, product notes and clearly labelled sample updates from the FlightsFuzz
              editorial desk. Read the thinking behind the request workflow, then search when you are
              ready to plan.
            </p>
            <div className="notices-hero__meta">
              <span><Newspaper size={15} /> {published.length} published samples</span>
              <span><Clock3 size={15} /> New editorial every few weeks</span>
            </div>
            <ScrollToContent targetId="notices-featured" label="Scroll to the latest" />
          </Reveal>

          <Reveal className="notices-hero__visual" delay={120}>
            <figure className="notices-hero__shot notices-hero__shot--main">
              <img src="/images/destinations/tokyo.jpg" alt="Tokyo street at night" />
              <figcaption>TOKYO / GUIDE</figcaption>
            </figure>
            <figure className="notices-hero__shot notices-hero__shot--small">
              <img src="/images/destinations/kathmandu.jpg" alt="Himalayan mountains near Kathmandu" />
              <figcaption>KTM / HOME</figcaption>
            </figure>
            <span className="notices-hero__stamp">
              <Sparkles size={13} /> SAMPLE CONTENT
            </span>
            <span className="notices-hero__route" aria-hidden="true" />
          </Reveal>
        </div>
      </header>

      {featured ? (
        <section className="section notices-featured" id="notices-featured">
          <div className="container">
            <Reveal className="notices-featured__label">
              <span className="section-kicker"><span>01</span> Featured dispatch</span>
              <span className="notices-featured__badge">EDITOR’S PICK</span>
            </Reveal>

            <Reveal className="notices-featured__article" delay={70}>
              <Link to={`/notices/${featured.slug}`} className="notices-featured__media" aria-label={`Read: ${featured.title}`}>
                <img src={featured.coverImage} alt={featured.coverAlt} />
                <span className="notices-featured__shade" aria-hidden="true" />
                <span className="notices-featured__tag">{getNoticeCategory(featured.category)?.label}</span>
                <span className="notices-featured__media-code" aria-hidden="true">FF / FEATURE</span>
              </Link>

              <div className="notices-featured__copy">
                <div className="notices-featured__meta">
                  <span>{formatDate(featured.publishedAt)}</span>
                  <span className="notice-card__dot" aria-hidden="true" />
                  <span><Clock3 size={13} /> {featured.readingTime} min read</span>
                  <span className="notices-featured__demo">Sample article</span>
                </div>
                <h2>{featured.title}</h2>
                <p>{featured.excerpt}</p>
                <div className="notices-featured__actions">
                  <Link to={`/notices/${featured.slug}`} className="btn btn--primary">
                    Read the feature <ArrowRight size={17} />
                  </Link>
                  <Link to="/#search" className="btn btn--outline">
                    Search flights
                  </Link>
                </div>
              </div>
            </Reveal>

            <p className="notices-demo-note">
              All articles in this section are demonstration content written for the frontend build.
              They are not official FlightsFuzz announcements, live deals or travel advisories.
            </p>
          </div>
        </section>
      ) : null}

      <section className="section section--soft notices-feed" id="notices-feed">
        <div className="container">
          <div className="notices-feed__head">
            <Reveal>
              <span className="section-kicker"><span>02</span> The noticeboard</span>
              <h2>LATEST<br />UPDATES.</h2>
            </Reveal>
            <Reveal className="notices-feed__intro" delay={60}>
              <p>
                Browse by category or read everything in publication order. Draft and archived
                entries are filtered out before this page ever sees them.
              </p>
              <span className="notices-feed__count">
                {list.length} {list.length === 1 ? 'article' : 'articles'} shown
              </span>
            </Reveal>
          </div>

          <div className="category-filter" role="tablist" aria-label="Filter notices by category">
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'all'}
              className={cn('category-chip', activeCategory === 'all' && 'is-active')}
              onClick={() => setActiveCategory('all')}
            >
              All notices
              <span>{published.length}</span>
            </button>
            {NOTICE_CATEGORIES.map((category) => (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === category.id}
                className={cn('category-chip', activeCategory === category.id && 'is-active')}
                onClick={() => setActiveCategory(category.id)}
                title={category.description}
              >
                {category.label}
                <span>{counts[category.id]}</span>
              </button>
            ))}
          </div>

          {list.length > 0 ? (
            <div className="notice-grid">
              {list.map((article: NoticeArticle, index) => (
                <NoticeCard
                  key={`${activeCategory}-${article.id}`}
                  article={article}
                  index={index}
                  variant={variantFor(index, list.length, activeCategory !== 'all')}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state notices-empty">
              <span className="empty-state__icon"><SearchX size={24} /></span>
              <h2>No published articles in this category yet.</h2>
              <p>
                Sample content lives in a local data file. Choose another category, or read the
                featured dispatch above.
              </p>
              <div className="empty-state__actions">
                <button type="button" className="btn btn--primary" onClick={() => setActiveCategory('all')}>
                  Show all notices
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section notices-subscribe">
        <div className="container notices-subscribe__inner">
          <Reveal className="notices-subscribe__copy">
            <span className="micro-label">Updates desk</span>
            <h2>STAY IN THE<br /><span className="text-red">LOOP.</span></h2>
            <p>
              A subscription flow is being designed for when the editorial desk goes live. For now
              this form only validates an address in your browser.
            </p>
          </Reveal>

          <Reveal className="notices-subscribe__form-card" delay={90}>
            <form className="notices-subscribe__form" onSubmit={handleSubscribe} noValidate>
              <label htmlFor="notices-email">
                <Mail size={15} /> Email address
              </label>
              <div className="notices-subscribe__row">
                <input
                  id="notices-email"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value)
                    setSubscribeError('')
                    setSubscribed(false)
                  }}
                  placeholder="you@example.com"
                  autoComplete="email"
                  aria-invalid={Boolean(subscribeError)}
                  aria-describedby={subscribeError ? 'notices-email-error' : undefined}
                  required
                />
                <button type="submit" className="btn btn--primary">
                  Preview subscribe <ArrowRight size={16} />
                </button>
              </div>
              {subscribeError ? (
                <p className="field-error" id="notices-email-error">{subscribeError}</p>
              ) : null}
              {subscribed ? (
                <div className="notices-subscribe__result" role="status" aria-live="polite">
                  <CheckCircle2 size={18} />
                  <p>
                    <strong>The address passes validation.</strong> This demo has not stored or
                    subscribed it, and no email will be sent. A real subscription integration is
                    still pending.
                  </p>
                </div>
              ) : (
                <p className="notices-subscribe__note">
                  No mailing list is connected. Nothing is stored, transmitted or confirmed.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </section>

      <section className="notices-final">
        <div className="notices-final__glow" aria-hidden="true" />
        <div className="container notices-final__inner">
          <Reveal>
            <p className="eyebrow eyebrow--light"><span className="eyebrow__dot" /> From reading to planning</p>
            <h2>THE NEXT STORY<br /><span>COULD BE YOUR TRIP.</span></h2>
            <p>
              Search a route or start a booking request when you are ready. The editorial desk can
              explain the context; a person helps with the actual journey.
            </p>
            <div className="notices-final__actions">
              <Link to="/flights" className="btn btn--primary btn--lg">
                Search flights <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="btn btn--ghost-light btn--lg">
                <MessageCircle size={17} /> Contact the team
              </Link>
            </div>
          </Reveal>
          <Reveal className="notices-final__links" delay={90}>
            <Link to="/popular-routes" className="text-link text-link--light">
              Browse popular routes <ArrowUpRight size={15} />
            </Link>
            <Link to="/about" className="text-link text-link--light">
              How FlightsFuzz works <ArrowUpRight size={15} />
            </Link>
            <Link to="/booking-request" className="text-link text-link--light">
              Start a booking request <ArrowUpRight size={15} />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
