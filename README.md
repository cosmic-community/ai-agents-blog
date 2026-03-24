# AI Agents Blog

![App Preview](https://imgix.cosmicjs.com/a9eba290-2713-11f1-a9b4-1bd048ffba97-autopilot-photo-1667372393119-3d4c48d07fc9-1774310083365.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A modern blog about building with AI agents. Built by agents. About agents. This Next.js application leverages Cosmic CMS as the content backend, featuring dark/light mode, rich markdown rendering, category filtering, author bios, newsletter signup, and SEO-optimized meta tags.

## Features

- 🌗 **Dark/Light Mode** — System-aware toggle with persistent preference
- 📝 **Rich Markdown Rendering** — Syntax-highlighted code blocks with react-markdown
- 🏷️ **Category Filtering** — Filter by tutorials, case studies, opinion, tools
- ⭐ **Featured Posts** — Highlighted content on homepage hero
- 🤖 **Author Profiles** — Dedicated pages with bios and social links
- 📧 **Newsletter Signup** — Email collection CTA
- 🔍 **SEO Optimized** — Dynamic Open Graph and meta tags
- ⏱️ **Reading Time Estimates** — Per-post reading time
- 📱 **Fully Responsive** — Beautiful on all devices
- 🚀 **Next.js 16 App Router** — Server Components for fast, SEO-friendly rendering

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=69a719cafa2ad19da1888d9d&clone_repository=69c1d44f0551a62ae24d1c45)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a blog with posts (including featured images, content, and tags), authors, and categories. User instructions: A modern blog about building with AI agents. The blog itself is built and managed by AI agents, creating a meta narrative. Content covers topics like: how to build AI agents, agent architectures, multi-agent workflows, AI agent use cases in business, autonomous agents, agent frameworks (LangChain, CrewAI, AutoGen, etc.), real-world agent deployment stories, and lessons learned. The tone is practical and founder-friendly, not academic. Clean, minimal design with a dark/light mode toggle. Features: blog post listing page with featured posts, individual post pages with rich markdown rendering, category filtering (tutorials, case studies, opinion, tools), author bios, newsletter signup, and SEO-optimized meta tags. Built with Next.js and Cosmic CMS as the content backend. The hero section should have a tagline like "Built by agents. About agents." with a subtle AI-themed visual aesthetic."

### Code Generation Prompt

> "Build a Next.js application for a creative portfolio called "AI Agents Blog". The content is managed in Cosmic CMS with the following object types: authors, tags, blog-posts, site-config. Create a beautiful, modern, responsive design with a homepage and pages for each content type. User instructions: A modern blog about building with AI agents. The blog itself is built and managed by AI agents, creating a meta narrative. Content covers topics like: how to build AI agents, agent architectures, multi-agent workflows, AI agent use cases in business, autonomous agents, agent frameworks (LangChain, CrewAI, AutoGen, etc.), real-world agent deployment stories, and lessons learned. The tone is practical and founder-friendly, not academic. Clean, minimal design with a dark/light mode toggle. Features: blog post listing page with featured posts, individual post pages with rich markdown rendering, category filtering (tutorials, case studies, opinion, tools), author bios, newsletter signup, and SEO-optimized meta tags. Built with Next.js and Cosmic CMS as the content backend. The hero section should have a tagline like "Built by agents. About agents." with a subtle AI-themed visual aesthetic."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [Cosmic](https://www.cosmicjs.com) — Headless CMS for content management ([docs](https://www.cosmicjs.com/docs))
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [react-markdown](https://github.com/remarkjs/react-markdown) — Markdown rendering
- [rehype-highlight](https://github.com/rehypejs/rehype-highlight) — Syntax highlighting
- [rehype-raw](https://github.com/rehypejs/rehype-raw) — Raw HTML in markdown

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed
- A [Cosmic](https://www.cosmicjs.com) account with content configured

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd ai-agents-blog

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Cosmic credentials

# Run development server
bun dev
```

### Environment Variables

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## Cosmic SDK Examples

### Fetching Blog Posts

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: posts } = await cosmic.objects
  .find({ type: 'blog-posts' })
  .props(['id', 'title', 'slug', 'metadata', 'created_at'])
  .depth(1)
```

### Fetching a Single Post by Slug

```typescript
const { object: post } = await cosmic.objects
  .findOne({ type: 'blog-posts', slug: 'my-post-slug' })
  .props(['id', 'title', 'slug', 'metadata', 'content', 'created_at'])
  .depth(1)
```

## Cosmic CMS Integration

This blog uses the following Cosmic object types:

- **Blog Posts** (`blog-posts`) — Articles with content, summaries, featured images, authors, categories, tags, and reading time
- **Authors** (`authors`) — Writer profiles with bios, avatars, roles, and social links
- **Tags** (`tags`) — Content tags for post organization
- **Categories** (`categories`) — Content categories with descriptions and icons
- **Site Config** (`site-config`) — Global site settings like tagline, hero description, and social URLs

## Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy

### Netlify

1. Push your code to GitHub
2. Import the project in [Netlify](https://netlify.com)
3. Set build command to `bun run build`
4. Add environment variables
5. Deploy

<!-- README_END -->