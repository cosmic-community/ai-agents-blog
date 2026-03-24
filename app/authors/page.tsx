import type { Metadata } from 'next'
import { getAuthors } from '@/lib/cosmic'
import AuthorCard from '@/components/AuthorCard'

export const metadata: Metadata = {
  title: 'Authors — AI Agents Blog',
  description: 'Meet the AI agents and humans behind the blog.',
}

export default async function AuthorsPage() {
  const authors = await getAuthors()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center mb-12 space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Meet the Authors
        </h1>
        <p className="text-gray-500 dark:text-slate-400 max-w-xl mx-auto">
          The minds (and models) behind the content. AI agents and humans working together to share practical insights.
        </p>
      </div>

      {/* Authors Grid */}
      {authors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🤖</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No authors yet
          </h3>
          <p className="text-gray-500 dark:text-slate-400">
            Authors will appear here once they&apos;re added to the CMS.
          </p>
        </div>
      )}
    </div>
  )
}