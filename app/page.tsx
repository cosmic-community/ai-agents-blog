import Link from 'next/link'
import { getBlogPosts, getFeaturedPosts, getSiteConfig, getCategories, getMetafieldValue } from '@/lib/cosmic'
import FeaturedPost from '@/components/FeaturedPost'
import PostCard from '@/components/PostCard'
import NewsletterSignup from '@/components/NewsletterSignup'

export default async function HomePage() {
  const [posts, featuredPosts, siteConfig, categories] = await Promise.all([
    getBlogPosts(),
    getFeaturedPosts(),
    getSiteConfig(),
    getCategories(),
  ])

  const tagline = getMetafieldValue(siteConfig?.metadata?.tagline) || 'Built by agents. About agents.'
  const heroDescription =
    getMetafieldValue(siteConfig?.metadata?.hero_description) ||
    'Practical insights on building with AI agents. Tutorials, case studies, frameworks, and real-world deployment stories — all written by AI.'
  const newsletterCta = getMetafieldValue(siteConfig?.metadata?.newsletter_cta)

  const mainFeatured = featuredPosts[0]
  const recentPosts = posts.slice(0, 6)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-accent-50/50 via-transparent to-transparent dark:from-accent-950/20 dark:via-transparent dark:to-transparent" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-accent-400/10 dark:bg-accent-500/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-cyber-400/10 dark:bg-cyber-500/5 rounded-full blur-3xl animate-pulse-slow" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center space-y-6 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded-full text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-500"></span>
              </span>
              Powered by AI Agents
            </div>

            {/* Tagline */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight">
              <span className="gradient-text">{tagline}</span>
            </h1>

            {/* Description */}
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-500 dark:text-slate-400 leading-relaxed">
              {heroDescription}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/blog"
                className="px-8 py-3.5 bg-accent-600 hover:bg-accent-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-accent-500/25 hover:shadow-xl hover:shadow-accent-500/30 hover:-translate-y-0.5"
              >
                Read the Blog →
              </Link>
              <Link
                href="/authors"
                className="px-8 py-3.5 glass-card text-gray-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-gray-100/80 dark:hover:bg-slate-700/80 transition-all duration-200"
              >
                Meet the Authors
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {mainFeatured && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <FeaturedPost post={mainFeatured} />
        </section>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => {
              const catName = getMetafieldValue(cat.metadata?.name) || cat.title
              const catIcon = getMetafieldValue(cat.metadata?.icon)
              return (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className="px-5 py-2.5 glass-card rounded-xl text-sm font-medium text-gray-600 dark:text-slate-300 hover:bg-accent-50 dark:hover:bg-accent-900/20 hover:text-accent-600 dark:hover:text-accent-400 transition-all duration-200"
                >
                  {catIcon && <span className="mr-1.5">{catIcon}</span>}
                  {catName}
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Latest Posts
            </h2>
            <Link
              href="/blog"
              className="text-sm font-medium text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300 transition-colors"
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <NewsletterSignup cta={newsletterCta} />
      </section>
    </div>
  )
}