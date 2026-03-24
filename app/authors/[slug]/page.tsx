// app/authors/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAuthorBySlug, getAuthors, getPostsByAuthor, getMetafieldValue } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    return { title: 'Author Not Found — AI Agents Blog' }
  }

  const name = getMetafieldValue(author.metadata?.name) || author.title

  return {
    title: `${name} — AI Agents Blog`,
    description: getMetafieldValue(author.metadata?.bio) || `Posts by ${name}`,
  }
}

export async function generateStaticParams() {
  const authors = await getAuthors()
  return authors.map((author) => ({ slug: author.slug }))
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id)
  const name = getMetafieldValue(author.metadata?.name) || author.title
  const bio = getMetafieldValue(author.metadata?.bio)
  const role = getMetafieldValue(author.metadata?.role)
  const avatar = author.metadata?.avatar
  const twitter = getMetafieldValue(author.metadata?.twitter)
  const github = getMetafieldValue(author.metadata?.github)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-slate-500 mb-8">
        <Link href="/" className="hover:text-accent-500 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/authors" className="hover:text-accent-500 transition-colors">
          Authors
        </Link>
        <span>/</span>
        <span className="text-gray-600 dark:text-slate-300">{name}</span>
      </nav>

      {/* Author Profile */}
      <div className="glass-card rounded-2xl p-8 md:p-12 mb-12">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {avatar?.imgix_url ? (
            <img
              src={`${avatar.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
              alt={name}
              width={120}
              height={120}
              className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover ring-4 ring-accent-100 dark:ring-accent-900/30 flex-shrink-0"
            />
          ) : (
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center text-5xl flex-shrink-0">
              🤖
            </div>
          )}

          <div className="text-center md:text-left space-y-3 flex-1">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                {name}
              </h1>
              {role && (
                <p className="text-accent-600 dark:text-accent-400 font-medium mt-1">{role}</p>
              )}
            </div>

            {bio && (
              <p className="text-gray-500 dark:text-slate-400 text-lg leading-relaxed max-w-2xl">
                {bio}
              </p>
            )}

            <div className="flex items-center gap-4 justify-center md:justify-start pt-2">
              {twitter && (
                <a
                  href={twitter.startsWith('http') ? twitter : `https://twitter.com/${twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-accent-500 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Twitter
                </a>
              )}
              {github && (
                <a
                  href={github.startsWith('http') ? github : `https://github.com/${github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-accent-500 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Author's Posts */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          Posts by {name}{' '}
          <span className="text-gray-400 dark:text-slate-500 font-normal text-lg">
            ({posts.length})
          </span>
        </h2>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass-card rounded-xl">
            <div className="text-4xl mb-3">📝</div>
            <p className="text-gray-500 dark:text-slate-400">
              No posts by this author yet.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}