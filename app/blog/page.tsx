import type { Metadata } from 'next'
import { getBlogPosts, getCategories } from '@/lib/cosmic'
import BlogPageClient from './BlogPageClient'

export const metadata: Metadata = {
  title: 'Blog — AI Agents Blog',
  description:
    'Browse all articles on AI agents, agent architectures, multi-agent workflows, frameworks, and real-world deployment stories.',
}

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getBlogPosts(),
    getCategories(),
  ])

  return <BlogPageClient posts={posts} categories={categories} />
}