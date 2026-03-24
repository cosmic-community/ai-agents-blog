// app/blog/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { getBlogPostBySlug, getBlogPosts, getMetafieldValue } from '@/lib/cosmic'
import TagBadge from '@/components/TagBadge'
import NewsletterSignup from '@/components/NewsletterSignup'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found — AI Agents Blog' }
  }

  const seoDescription =
    getMetafieldValue(post.metadata?.seo_description) ||
    getMetafieldValue(post.metadata?.summary) ||
    ''

  return {
    title: `${post.title} — AI Agents Blog`,
    description: seoDescription,
    openGraph: {
      title: post.title,
      description: seoDescription,
      type: 'article',
      images: post.metadata?.featured_image?.imgix_url
        ? [`${post.metadata.featured_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`]
        : [],
    },
  }
}

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const content = getMetafieldValue(post.metadata?.content) || post.content || ''
  const summary = getMetafieldValue(post.metadata?.summary)
  const readingTime = getMetafieldValue(post.metadata?.reading_time)
  const author = post.metadata?.author
  const category = post.metadata?.category
  const tags = post.metadata?.tags
  const featuredImage = post.metadata?.featured_image
  const categoryName = getMetafieldValue(category?.metadata?.name) || category?.title || ''
  const authorName = getMetafieldValue(author?.metadata?.name) || author?.title || ''
  const authorBio = getMetafieldValue(author?.metadata?.bio)
  const authorRole = getMetafieldValue(author?.metadata?.role)

  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="min-h-screen">
      {/* Hero */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 space-y-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-slate-500">
          <Link href="/" className="hover:text-accent-500 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-accent-500 transition-colors">
            Blog
          </Link>
          {category && (
            <>
              <span>/</span>
              <Link
                href={`/categories/${category.slug}`}
                className="hover:text-accent-500 transition-colors"
              >
                {categoryName}
              </Link>
            </>
          )}
        </nav>

        {/* Category + Meta */}
        <div className="flex flex-wrap items-center gap-3 text-sm">
          {categoryName && (
            <Link
              href={`/categories/${category?.slug || ''}`}
              className="px-3 py-1 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded-full font-medium hover:bg-accent-200 dark:hover:bg-accent-900/50 transition-colors"
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
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
          {post.title}
        </h1>

        {/* Summary */}
        {summary && (
          <p className="text-xl text-gray-500 dark:text-slate-400 leading-relaxed">
            {summary}
          </p>
        )}

        {/* Author */}
        {author && (
          <Link href={`/authors/${author.slug}`} className="flex items-center gap-3 group">
            {author.metadata?.avatar?.imgix_url && (
              <img
                src={`${author.metadata.avatar.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                alt={authorName}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200 dark:ring-slate-700 group-hover:ring-accent-400 transition-all"
              />
            )}
            <div>
              <p className="font-semibold text-gray-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                {authorName}
              </p>
              {authorRole && (
                <p className="text-sm text-gray-400 dark:text-slate-500">{authorRole}</p>
              )}
            </div>
          </Link>
        )}
      </header>

      {/* Featured Image */}
      {featuredImage?.imgix_url && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <img
            src={`${featuredImage.imgix_url}?w=2000&h=1000&fit=crop&auto=format,compress`}
            alt={post.title}
            width={1000}
            height={500}
            className="w-full rounded-2xl object-cover shadow-lg"
          />
        </div>
      )}

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-accent-600 dark:prose-a:text-accent-400 prose-a:no-underline hover:prose-a:underline prose-code:text-accent-600 dark:prose-code:text-accent-400 prose-pre:bg-gray-50 dark:prose-pre:bg-slate-800 prose-img:rounded-xl max-w-none">
          <ReactMarkdown
            rehypePlugins={[rehypeHighlight, rehypeRaw]}
            remarkPlugins={[remarkGfm]}
          >
            {content}
          </ReactMarkdown>
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="mt-10 pt-8 border-t border-gray-200 dark:border-slate-800">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-3">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <TagBadge key={tag.id} tag={tag} />
              ))}
            </div>
          </div>
        )}

        {/* Author Bio */}
        {author && authorBio && (
          <div className="mt-10 pt-8 border-t border-gray-200 dark:border-slate-800">
            <Link href={`/authors/${author.slug}`} className="glass-card rounded-xl p-6 flex items-start gap-4 group block">
              {author.metadata?.avatar?.imgix_url && (
                <img
                  src={`${author.metadata.avatar.imgix_url}?w=128&h=128&fit=crop&auto=format,compress`}
                  alt={authorName}
                  width={56}
                  height={56}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-200 dark:ring-slate-700 flex-shrink-0"
                />
              )}
              <div>
                <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                  Written by
                </p>
                <p className="font-bold text-gray-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                  {authorName}
                </p>
                <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">{authorBio}</p>
              </div>
            </Link>
          </div>
        )}
      </div>

      {/* Newsletter */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <NewsletterSignup />
      </div>
    </article>
  )
}