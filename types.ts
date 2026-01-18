
// Defined to support different digital asset types
export type ProductType = 'app' | 'ebook';

// Core product interface
export interface Product {
  id: string;
  title: string;
  price: number;
  type: ProductType;
  category: string;
  cover_url: string;
  download_url: string;
  descricao: string;
  created_at: string;
  is_featured?: boolean;
}

export interface Ad {
  id: string;
  title: string;
  image_url: string;
  link_url?: string;
  is_active: boolean;
  created_at: string;
}

export interface CommunityQuestion {
  id: string;
  user_name: string;
  question: string;
  answer?: string;
  is_published: boolean;
  created_at: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface SiteStats {
  visitors: number;
  sales: number;
  inventory: number;
  revenue: number;
}
