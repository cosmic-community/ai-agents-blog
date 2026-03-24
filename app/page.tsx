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
    'Practical insights on building with AI agents. Tutorials, case studies, frameworks, and real-world deployment stories.'
  const newsletterCta = getMetafieldValue(siteConfig?.metadata?.newsletter_cta)

  const mainFeatured = featuredPosts[0]
  const recentPosts = posts.slice(0, 6)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://imgix.cosmicjs.com/40aca9d0-2715-11f1-8779-f585ce5e48b1-generated-1774310765644.jpg?w=1920&h=900&fit=crop&auto=format,compress&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080a14]/80 via-[#080a14]/70 to-[#080a14]" />
        </div>

        {/* Floating glow orbs */}
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-40">
          <div className="text-center space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-500/10 border border-violet-500/20 text-violet-300 rounded-full text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              Powered by AI Agents
            </div>

            {/* Tagline */}
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight">
              <span className="gradient-text">{tagline}</span>
            </h1>

            {/* Description */}
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 leading-relaxed">
              {heroDescription}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/blog"
                className="px-8 py-3.5 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 hover:-translate-y-0.5"
              >
                Read the Blog
              </Link>
              <Link
                href="/authors"
                className="px-8 py-3.5 glass-card glow-border text-slate-300 font-semibold rounded-xl hover:bg-violet-500/10 transition-all duration-200"
              >
                Meet the Authors
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {mainFeatured && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-8">
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
                  className="px-5 py-2.5 glass-card glow-border rounded-xl text-sm font-medium text-slate-300 hover:bg-violet-500/10 hover:text-violet-300 hover:border-violet-500/30 transition-all duration-200"
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
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Latest Posts
            </h2>
            <Link
              href="/blog"
              className="text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors"
            >
              View all
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