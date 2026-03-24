export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface CosmicImage {
  url: string;
  imgix_url: string;
}

export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    name?: string;
    bio?: string;
    avatar?: CosmicImage;
    role?: string;
    twitter?: string;
    github?: string;
  };
}

export interface Tag extends CosmicObject {
  type: 'tags';
  metadata: {
    name?: string;
  };
}

export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name?: string;
    description?: string;
    icon?: string;
  };
}

export interface BlogPost extends CosmicObject {
  type: 'blog-posts';
  metadata: {
    content?: string;
    summary?: string;
    featured_image?: CosmicImage;
    author?: Author;
    category?: Category;
    tags?: Tag[];
    reading_time?: string;
    featured?: boolean;
    seo_description?: string;
  };
}

export interface SiteConfig extends CosmicObject {
  type: 'site-config';
  metadata: {
    tagline?: string;
    hero_description?: string;
    newsletter_cta?: string;
    twitter_url?: string;
    github_url?: string;
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}