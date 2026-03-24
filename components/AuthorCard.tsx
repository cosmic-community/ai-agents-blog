import Link from 'next/link'
import type { Author } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface AuthorCardProps {
  author: Author
}

export default function AuthorCard({ author }: AuthorCardProps) {
  const name = getMetafieldValue(author.metadata?.name) || author.title
  const bio = getMetafieldValue(author.metadata?.bio)
  const role = getMetafieldValue(author.metadata?.role)
  const avatar = author.metadata?.avatar
  const twitter = getMetafieldValue(author.metadata?.twitter)
  const github = getMetafieldValue(author.metadata?.github)

  return (
    <Link
      href={`/authors/${author.slug}`}
      className="group glass-card rounded-xl p-6 hover-lift block"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        {avatar?.imgix_url ? (
          <img
            src={`${avatar.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
            alt={name}
            width={80}
            height={80}
            className="w-20 h-20 rounded-full object-cover ring-4 ring-accent-100 dark:ring-accent-900/30 group-hover:ring-accent-300 dark:group-hover:ring-accent-700 transition-all"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center text-3xl">
            🤖
          </div>
        )}

        <div className="space-y-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
            {name}
          </h3>
          {role && (
            <p className="text-sm text-accent-600 dark:text-accent-400 font-medium">{role}</p>
          )}
        </div>

        {bio && (
          <p className="text-sm text-gray-500 dark:text-slate-400 line-clamp-3">{bio}</p>
        )}

        <div className="flex gap-3">
          {twitter && (
            <span className="text-gray-400 hover:text-accent-500 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </span>
          )}
          {github && (
            <span className="text-gray-400 hover:text-accent-500 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}