export type Sport = 'padel' | 'golf' | 'cycling' | 'running'
export type TrustTier = 'community' | 'trusted' | 'club_partner'
export type ThreadPrefix = 'Discussion' | 'Game' | 'Event' | 'Gear Talk' | 'Throwback'
export type ListingPrefix = 'For Sale' | 'WTB' | 'Trade' | 'Free'
export type ListingCondition = 'New' | 'Like new' | 'Excellent' | 'Good' | 'Used'

export interface Profile {
  id: string
  username: string
  display_name: string
  avatar_url: string | null
  location: string | null
  bio: string | null
  sports: string[]
  skill_levels: Record<string, string>
  trust_tier: TrustTier
  trade_count: number
  rep_score: number
  is_verified: boolean
  club_id: string | null
  last_visited_at: string
  created_at: string
  updated_at: string
}

export interface Club {
  id: string
  name: string
  sport: string
  location: string
  province: string
  description: string | null
  logo_url: string | null
  website_url: string | null
  member_count: number
  courts_count: number
  rating: number
  is_verified: boolean
  is_safe_trade_location: boolean
  booking_url: string | null
  created_at: string
}

export interface Thread {
  id: string
  author_id: string
  sport: Sport
  prefix: string
  title: string
  body: string
  region: string | null
  club_id: string | null
  is_wtb: boolean
  reply_count: number
  like_count: number
  is_pinned: boolean
  is_locked: boolean
  created_at: string
  updated_at: string
  author?: Profile
}

export interface Reply {
  id: string
  thread_id: string
  author_id: string
  body: string
  like_count: number
  created_at: string
  author?: Profile
}

export interface Listing {
  id: string
  seller_id: string
  sport: Sport
  prefix: string
  category: string | null
  brand: string | null
  province: string | null
  tags: string[]
  sub_category: string | null
  title: string
  description: string
  price: number | null
  condition: string | null
  location: string
  is_bundle: boolean
  item_count: number
  is_sold: boolean
  is_active: boolean
  save_count: number
  view_count: number
  created_at: string
  updated_at: string
  seller?: Profile
  images?: ListingImage[]
}

export interface ListingImage {
  id: string
  listing_id: string
  storage_path: string
  display_order: number
  created_at: string
}

export interface Message {
  id: string
  sender_id: string
  recipient_id: string
  listing_id: string | null
  body: string
  is_read: boolean
  created_at: string
}

export interface ChatMessage {
  id: string
  channel: string
  author_id: string
  body: string
  created_at: string
  author?: Profile
}

export interface Notification {
  id: string
  user_id: string
  type: 'reply' | 'like' | 'message' | 'trade' | 'mention'
  title: string
  body: string | null
  link: string | null
  is_read: boolean
  created_at: string
}

export interface Trade {
  id: string
  listing_id: string
  seller_id: string
  buyer_id: string
  agreed_price: number | null
  seller_rating: number | null
  buyer_rating: number | null
  seller_review: string | null
  buyer_review: string | null
  completed_at: string
}
