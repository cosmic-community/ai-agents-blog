// app/categories/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCategoryBySlug, getCategories, getPostsByCategory, getMetafieldValue } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    return { title: 'Category Not Found — AI Agents Blog' }
  }

  const name = getMetafieldValue(category.metadata?.name) || category.title

  return {
    title: `${name} — AI Agents Blog`,
    description: getMetafieldValue(category.metadata?.description) || `Browse ${name} posts`,
  }
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((cat) => ({ slug: cat.slug }))
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(slug)
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)
  const icon = getMetafieldValue(category.metadata?.icon)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-slate-500 mb-8">
        <Link href="/" className="hover:text-accent-500 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-accent-500 transition-colors">
          Blog
        </Link>
        <span>/</span>
        <span className="text-gray-600 dark:text-slate-300">{name}</span>
      </nav>

      {/* Category Header */}
      <div className="text-center mb-12 space-y-4">
        {icon && <div className="text-5xl">{icon}</div>}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          {name}
        </h1>
        {description && (
          <p className="text-gray-500 dark:text-slate-400 max-w-xl mx-auto text-lg">
            {description}
          </p>
        )}
        <p className="text-sm text-gray-400 dark:text-slate-500">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}
        </p>
      </div>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass-card rounded-xl">
          <div className="text-5xl mb-4">📭</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No posts yet
          </h3>
          <p className="text-gray-500 dark:text-slate-400 mb-6">
            No posts in this category yet. Check back soon!
          </p>
          <Link
            href="/blog"
            className="px-6 py-2.5 bg-accent-600 text-white text-sm font-medium rounded-lg hover:bg-accent-700 transition-colors"
          >
            Browse all posts
          </Link>
        </div>
      )}
    </div>
  )
}