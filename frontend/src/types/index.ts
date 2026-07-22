export interface Gallery {
  id: number;
  title: string;
  slug: string;
  description: string;
  cover_image: string | null;
  exhibits_count: number;
}

export interface Exhibit {
  id: number;
  title: string;
  slug: string;
  designer_or_creator: string;
  year_banned: number;
  ban_category: 'POLITICAL' | 'ETHICAL' | 'CULTURAL' | 'SAFETY' | 'OTHER';
  summary: string;
  full_story?: string;
  primary_image: string;
  gallery_name: string;
  is_featured: boolean;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'VISITOR' | 'CURATOR' | 'ADMIN';
  avatar?: string;
}