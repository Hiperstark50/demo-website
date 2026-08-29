export type NavigationTab = 'home' | 'menu' | 'reservation' | 'experience' | 'location';

export type SeatingArea = 'main_dining' | 'chefs_counter' | 'wine_vault' | 'terrace_garden';

export interface MenuItem {
  id: string;
  name: string;
  frenchName?: string;
  category: 'starters' | 'mains' | 'tasting_course' | 'desserts' | 'wines_cocktails';
  price: number;
  description: string;
  ingredients: string[];
  dietary: ('vegetarian' | 'vegan' | 'gluten_free' | 'chef_signature' | 'contains_nuts')[];
  pairing?: string;
  calories?: number;
  image?: string;
  coursesCount?: number;
}

export interface TastingCourseStep {
  courseNumber: number;
  courseName: string;
  title: string;
  description: string;
  winePairing: string;
}

export interface Reservation {
  id: string;
  bookingRef: string;
  createdAt: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  partySize: number;
  date: string;
  time: string;
  seatingArea: SeatingArea;
  occasion: string;
  dietaryRequirements: string[];
  specialRequests?: string;
  winePairingSelected: boolean;
  status: 'confirmed' | 'cancelled';
}

export interface RestaurantReview {
  id: string;
  author: string;
  title: string;
  quote: string;
  source: string;
  rating: number;
  date: string;
}
