'use client'

import { useState, useMemo } from 'react'
import type { BlogPost, Category } from '@/types'
import PostCard from '@/components/PostCard'
import CategoryFilter from '@/components/CategoryFilter'

interface BlogPageClientProps {
  posts: BlogPost[]
  categories: Category[]
}

export default function BlogPageClient({ posts, categories }: BlogPageClientProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredPosts = useMemo(() => {
    if (!activeCategory) return posts
    return posts.filter(
      (post) => post.metadata?.category?.slug === activeCategory
    )
  }, [posts, activeCategory])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center mb-12 space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          All Posts
        </h1>
        <p className="text-gray-500 dark:text-slate-400 max-w-xl mx-auto">
          Explore articles on AI agents — from tutorials and case studies to opinion pieces and tool deep-dives.
        </p>
      </div>

      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="flex justify-center mb-10">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>
      )}

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No posts found
          </h3>
          <p className="text-gray-500 dark:text-slate-400">
            {activeCategory
              ? 'No posts in this category yet. Try a different filter.'
              : 'No blog posts available yet. Check back soon!'}
          </p>
          {activeCategory && (
            <button
              onClick={() => setActiveCategory(null)}
              className="mt-4 px-4 py-2 bg-accent-600 text-white text-sm font-medium rounded-lg hover:bg-accent-700 transition-colors"
            >
              Clear filter
            </button>
          )}
        </div>
      )}
    </div>
  )
}