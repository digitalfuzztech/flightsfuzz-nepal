import { Link } from 'react-router-dom'
import { ArrowUpRight, Clock3 } from 'lucide-react'
import type { NoticeArticle } from '../../lib/data/notices'
import { getNoticeCategory } from '../../lib/data/notices'
import { formatDate } from '../../lib/utils/date'
import { cn } from '../../lib/utils/format'
import { SmartImage } from '../shared/SmartImage'

export type NoticeCardVariant = 'standard' | 'wide' | 'tall' | 'text'

interface NoticeCardProps {
  article: NoticeArticle
  variant?: NoticeCardVariant
  index?: number
}

export function NoticeCard({ article, variant = 'standard', index = 0 }: NoticeCardProps) {
  const category = getNoticeCategory(article.category)

  return (
    <article
      className={cn('notice-card', `notice-card--${variant}`)}
      style={{ '--notice-index': index } as React.CSSProperties}
    >
      <Link to={`/notices/${article.slug}`} className="notice-card__link" aria-label={`Read: ${article.title}`}>
        {variant !== 'text' ? (
          <div className="notice-card__media">
            <SmartImage
              src={article.coverImage}
              alt={article.coverAlt}
              loading="lazy"
              wrapperClassName="smart-image--fill"
            />
            <span className="notice-card__shade" aria-hidden="true" />
            <span className="notice-card__category">{category?.label ?? 'Notice'}</span>
            <span className="notice-card__index" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
        ) : (
          <div className="notice-card__text-mark" aria-hidden="true">
            <span>FF</span>
            <i />
            <span>EDITORIAL</span>
          </div>
        )}

        <div className="notice-card__body">
          <div className="notice-card__meta">
            {variant === 'text' ? <span className="notice-card__category-inline">{category?.label}</span> : null}
            <span>{formatDate(article.publishedAt)}</span>
            <span className="notice-card__dot" aria-hidden="true" />
            <span className="notice-card__reading"><Clock3 size={12} /> {article.readingTime} min read</span>
          </div>
          <h3 className="notice-card__title">{article.title}</h3>
          <p className="notice-card__excerpt">{article.excerpt}</p>
          <span className="notice-card__cta">
            Read more
            <ArrowUpRight size={15} />
          </span>
        </div>
      </Link>
    </article>
  )
}
