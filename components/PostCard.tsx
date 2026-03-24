import Link from 'next/link'
import type { BlogPost } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import TagBadge from '@/components/TagBadge'

interface PostCardProps {
  post: BlogPost
  className?: string
}

export default function PostCard({ post, className = '' }: PostCardProps) {
  const category = post.metadata?.category
  const author = post.metadata?.author
  const featuredImage = post.metadata?.featured_image
  const tags = post.metadata?.tags
  const readingTime = getMetafieldValue(post.metadata?.reading_time)
  const summary = getMetafieldValue(post.metadata?.summary)
  const categoryName = getMetafieldValue(category?.metadata?.name) || category?.title || ''

  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <article className={`group glass-card rounded-xl overflow-hidden hover-lift ${className}`}>
      {/* Image */}
      {featuredImage?.imgix_url && (
        <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
          <img
            src={`${featuredImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={post.title}
            width={400}
            height={225}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
      )}

      <div className="p-5 space-y-3">
        {/* Category + Date */}
        <div className="flex items-center gap-3 text-xs">
          {categoryName && (
            <Link
              href={`/categories/${category?.slug || ''}`}
              className="px-2.5 py-1 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded-full font-medium hover:bg-accent-200 dark:hover:bg-accent-900/50 transition-colors"
            >
              {categoryName}
            </Link>
          )}
          <span className="text-gray-400 dark:text-slate-500">{formattedDate}</span>
          {readingTime && (
            <span className="text-gray-400 dark:text-slate-500">· {readingTime}</span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors line-clamp-2">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>

        {/* Summary */}
        {summary && (
          <p className="text-sm text-gray-500 dark:text-slate-400 line-clamp-2">
            {summary}
          </p>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <TagBadge key={tag.id} tag={tag} />
            ))}
          </div>
        )}

        {/* Author */}
        {author && (
          <div className="flex items-center gap-2 pt-2 border-t border-gray-100 dark:border-slate-700/50">
            {author.metadata?.avatar?.imgix_url && (
              <img
                src={`${author.metadata.avatar.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                alt={getMetafieldValue(author.metadata?.name) || author.title}
                width={24}
                height={24}
                className="w-6 h-6 rounded-full object-cover"
              />
            )}
            <Link
              href={`/authors/${author.slug}`}
              className="text-xs font-medium text-gray-500 dark:text-slate-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
            >
              {getMetafieldValue(author.metadata?.name) || author.title}
            </Link>
          </div>
        )}
      </div>
    </article>
  )
}