import Link from 'next/link'
import type { BlogPost } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface FeaturedPostProps {
  post: BlogPost
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const category = post.metadata?.category
  const summary = getMetafieldValue(post.metadata?.summary)
  const readingTime = getMetafieldValue(post.metadata?.reading_time)
  const categoryName = getMetafieldValue(category?.metadata?.name) || category?.title || ''

  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="group relative glass-card rounded-2xl overflow-hidden hover-lift">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image */}
        {featuredImage?.imgix_url && (
          <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
            <img
              src={`${featuredImage.imgix_url}?w=1200&h=800&fit=crop&auto=format,compress`}
              alt={post.title}
              width={600}
              height={400}
              className="w-full h-64 lg:h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </Link>
        )}

        {/* Content */}
        <div className="p-6 lg:p-10 flex flex-col justify-center space-y-4">
          <div className="flex items-center gap-3 text-xs">
            <span className="px-2 py-0.5 bg-cyber-100 dark:bg-cyber-900/30 text-cyber-700 dark:text-cyber-300 rounded-full font-semibold uppercase tracking-wider">
              Featured
            </span>
            {categoryName && (
              <Link
                href={`/categories/${category?.slug || ''}`}
                className="px-2.5 py-1 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded-full font-medium hover:bg-accent-200 dark:hover:bg-accent-900/50 transition-colors"
              >
                {categoryName}
              </Link>
            )}
          </div>

          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h2>

          {summary && (
            <p className="text-gray-500 dark:text-slate-400 line-clamp-3 text-base">
              {summary}
            </p>
          )}

          <div className="flex items-center gap-4 pt-2">
            {author && (
              <Link href={`/authors/${author.slug}`} className="flex items-center gap-2">
                {author.metadata?.avatar?.imgix_url && (
                  <img
                    src={`${author.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                    alt={getMetafieldValue(author.metadata?.name) || author.title}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <span className="text-sm font-medium text-gray-600 dark:text-slate-300 hover:text-accent-600 dark:hover:text-accent-400 transition-colors">
                  {getMetafieldValue(author.metadata?.name) || author.title}
                </span>
              </Link>
            )}
            <span className="text-sm text-gray-400 dark:text-slate-500">{formattedDate}</span>
            {readingTime && (
              <span className="text-sm text-gray-400 dark:text-slate-500">· {readingTime}</span>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}