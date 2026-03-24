'use client'

import type { Category } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface CategoryFilterProps {
  categories: Category[]
  activeCategory: string | null
  onCategoryChange: (slug: string | null) => void
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onCategoryChange(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
          activeCategory === null
            ? 'bg-accent-600 text-white shadow-md shadow-accent-500/25'
            : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700'
        }`}
      >
        All Posts
      </button>
      {categories.map((cat) => {
        const catName = getMetafieldValue(cat.metadata?.name) || cat.title
        const catIcon = getMetafieldValue(cat.metadata?.icon)
        return (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.slug)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === cat.slug
                ? 'bg-accent-600 text-white shadow-md shadow-accent-500/25'
                : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700'
            }`}
          >
            {catIcon && <span className="mr-1">{catIcon}</span>}
            {catName}
          </button>
        )
      })}
    </div>
  )
}