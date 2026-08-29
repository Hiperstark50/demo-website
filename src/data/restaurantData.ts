import { MenuItem, TastingCourseStep, RestaurantReview, SeatingArea, Reservation } from '../types';

import heroBg from '../assets/images/restaurant_hero_bg_1787920224072.jpg';
import wagyuImg from '../assets/images/dish_wagyu_plating_1787920238320.jpg';
import seabassImg from '../assets/images/dish_seabass_plating_1787920257191.jpg';
import dessertWineImg from '../assets/images/restaurant_wine_dessert_1787920275889.jpg';

export const RESTAURANT_IMAGES = {
  hero: heroBg,
  wagyu: wagyuImg,
  seabass: seabassImg,
  dessertWine: dessertWineImg,
  // High quality complementary photography
  caviar: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
  scallops: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1200&q=80',
  duck: 'https://images.unsplash.com/photo-1514944298352-78d120534220?auto=format&fit=crop&w=1200&q=80',
  cocktail: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80',
  cellar: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
  chef: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=80',
};

export const RESTAURANT_INFO = {
  name: 'Aurelia',
  tagline: 'Modern French-Japanese Haute Cuisine',
  subtitle: 'A sensory symphony where heritage craftsmanship meets avant-garde gastronomy',
  stars: 'Two Michelin Stars • Le Guide Michelin 2026',
  address: '428 Aurelia Boulevard, Grand Promenade, Suite 100',
  city: 'Metropolitan Arts District',
  phone: '+1 (212) 555-8940',
  email: 'concierge@aurelia-dining.com',
  coordinates: {
    lat: 40.758896,
    lng: -73.985130, // Manhattan Theatre / Arts District
  },
  openingHours: [
    { days: 'Tuesday – Thursday', lunch: '12:00 PM – 2:30 PM', dinner: '5:30 PM – 10:30 PM' },
    { days: 'Friday – Saturday', lunch: '12:00 PM – 3:00 PM', dinner: '5:00 PM – 11:30 PM' },
    { days: 'Sunday', lunch: '11:30 AM – 3:30 PM', dinner: '5:00 PM – 10:00 PM' },
    { days: 'Monday', lunch: 'Closed', dinner: 'Private Wine Tastings & Events' },
  ],
  dressCode: 'Smart Elegant / Formal. Jackets recommended for gentlemen. Athletic attire is not permitted.',
  valetParking: 'Complimentary white-glove valet available at the Grand Promenade portico entrance.',
};

export const SEATING_ZONES: {
  id: SeatingArea;
  name: string;
  subtitle: string;
  description: string;
  atmosphere: string;
  badge: string;
  minGuests: number;
  maxGuests: number;
}[] = [
  {
    id: 'main_dining',
    name: 'Grand Dining Salon',
    subtitle: 'Under the crystal gilded chandeliers',
    description: 'Spacious banquettes and candlelit tables with soaring acoustic architecture and attentive tableside service.',
    atmosphere: 'Intimate, Sophisticated & Luminous',
    badge: 'Popular',
    minGuests: 1,
    maxGuests: 8,
  },
  {
    id: 'chefs_counter',
    name: "Chef Mercer's Omakase Counter",
    subtitle: 'Front-row live culinary theatre',
    description: 'Only 8 exclusive seats directly overlooking the master line. Enjoy personalized interactions and course introductions from Executive Chef Julian Mercer.',
    atmosphere: 'Exclusive & Theatrical',
    badge: 'Limited (8 Seats)',
    minGuests: 1,
    maxGuests: 4,
  },
  {
    id: 'wine_vault',
    name: 'Sommelier Private Wine Vault',
    subtitle: 'Surrounded by 1,200 vintage bottles',
    description: 'A secluded private cellar room with rare grand cru reserves, bespoke crystal glassware, and personal dedicated sommelier pairing.',
    atmosphere: 'Private, Decadent & Timeless',
    badge: 'Private Dining',
    minGuests: 2,
    maxGuests: 12,
  },
  {
    id: 'terrace_garden',
    name: 'Glasshouse Terrace & Pergola',
    subtitle: 'Heated all-season conservatory',
    description: 'Lush botanical setting featuring heated travertine floors, panoramic starlight view, and ambient acoustic strings.',
    atmosphere: 'Romantic & Botanical',
    badge: 'Skyline View',
    minGuests: 2,
    maxGuests: 6,
  },
];

export const TASTING_COURSES: TastingCourseStep[] = [
  {
    courseNumber: 1,
    courseName: 'L’Amuse-Bouche',
    title: 'Hokkaido Uni & Crispy Nori Tartlet',
    description: 'Smoked dashi gelée, yuzu kosho pearls, 24k edible gold leaf',
    winePairing: 'Dom Pérignon Vintage Champagne 2013',
  },
  {
    courseNumber: 2,
    courseName: 'Le Premier Service',
    title: 'King Crab & Oscietra Caviar Parfait',
    description: 'Crème fraîche foam, green apple emulsion, crisp brioche wafer',
    winePairing: 'Puligny-Montrachet 1er Cru, Domaine Leflaive 2020',
  },
  {
    courseNumber: 3,
    courseName: 'La Mer',
    title: 'Seared Wild Turbot & Saffron Foam',
    description: 'Braised baby leeks, sea asparagus, white truffle oil essence',
    winePairing: 'Meursault-Charmes 1er Cru, Comtes Lafon 2019',
  },
  {
    courseNumber: 4,
    courseName: 'L’Intermède',
    title: 'Hibiscus & Blood Orange Granite',
    description: 'Infused with wild botanical mint and shiso crisp',
    winePairing: 'Billecart-Salmon Brut Rosé',
  },
  {
    courseNumber: 5,
    courseName: 'La Terre',
    title: 'A5 Miyazaki Wagyu Tenderloin',
    description: 'Black Périgord truffle jus, smoked parsnip mousseline, charred morels',
    winePairing: 'Château Margaux 1er Grand Cru Classé 2015',
  },
  {
    courseNumber: 6,
    courseName: 'L’Artisan Fromage',
    title: 'Aged Comté & Truffled Brillat-Savarin',
    description: 'Honeyed honeycomb, caramelized walnut bread, fig reduction',
    winePairing: 'Taylor Fladgate 30 Year Tawny Port',
  },
  {
    courseNumber: 7,
    courseName: 'La Douceur Finale',
    title: 'Valrhona Chocolate Sphere & Smoked Vanilla',
    description: 'Warm gold-dusted salted caramel, raspberry elixir, hazelnut praline',
    winePairing: 'Château d’Yquem Sauternes 2011',
  },
];

export const MENU_ITEMS: MenuItem[] = [
  // Tasting Menus
  {
    id: 'menu-tasting-signature',
    name: 'The Aurelia Grand Degustation',
    frenchName: 'Le Grand Menu Dégustation en Sept Temps',
    category: 'tasting_course',
    price: 245,
    description: 'Seven bespoke courses orchestrating the finest oceanic jewels, rare seasonal harvests, and prized Miyazaki A5 Wagyu.',
    ingredients: ['Oscietra Caviar', 'Hokkaido Uni', 'Black Périgord Truffle', 'A5 Wagyu', 'Valrhona Grand Cru'],
    dietary: ['chef_signature'],
    pairing: 'Prestige Wine Pairing by Head Sommelier (+$165/person)',
    coursesCount: 7,
    image: RESTAURANT_IMAGES.wagyu,
  },
  {
    id: 'menu-tasting-botanical',
    name: 'Botanical & Earth Discovery',
    frenchName: 'La Symphonie des Jardins Royaux',
    category: 'tasting_course',
    price: 195,
    description: 'A 6-course avant-garde vegetarian immersion highlighting biodynamic micro-farms, wild chanterelles, and charred heirloom varietals.',
    ingredients: ['Morel Mushrooms', 'Fermented Black Garlic', 'Heirloom Beets', 'White Asparagus', 'Wild Shiso'],
    dietary: ['vegetarian', 'chef_signature'],
    pairing: 'Organic & Biodynamic Natural Wine Pairing (+$135/person)',
    coursesCount: 6,
    image: RESTAURANT_IMAGES.scallops,
  },

  // Starters
  {
    id: 'starter-1',
    name: 'Oscietra Royal Caviar & Tartare',
    frenchName: 'Tartare de Thon Rouge et Caviar Royal',
    category: 'starters',
    price: 68,
    description: 'Bluefin tuna tartare layered with 30g Imperial Oscietra Caviar, chive blossom cream, and toasted nori blinis.',
    ingredients: ['Bluefin Tuna', 'Oscietra Caviar', 'Crème Fraîche', 'Chive Oil', 'Brioche'],
    dietary: ['chef_signature', 'gluten_free'],
    pairing: 'Krug Grande Cuvée 170th Edition',
    image: RESTAURANT_IMAGES.caviar,
  },
  {
    id: 'starter-2',
    name: 'Hokkaido Diver Scallop Crudo',
    frenchName: 'Carpaccio de Saint-Jacques aux Agrumes',
    category: 'starters',
    price: 52,
    description: 'Delicately shaved raw scallops with yuzu ponzu gelée, pickled watermelon radish, and smoked trout roe.',
    ingredients: ['Hokkaido Scallops', 'Yuzu Pearls', 'Radish', 'Trout Roe', 'Avocado Mousseline'],
    dietary: ['gluten_free'],
    pairing: 'Chablis Grand Cru "Les Clos" 2021',
    image: RESTAURANT_IMAGES.scallops,
  },
  {
    id: 'starter-3',
    name: 'Pan-Seared Duck Foie Gras',
    frenchName: 'Escalope de Foie Gras Poêlée',
    category: 'starters',
    price: 58,
    description: 'Caramelized Mission figs, spiced brioche crouton, port wine reduction, and roasted hazelnut brittle.',
    ingredients: ['Foie Gras', 'Mission Figs', 'Port Reduction', 'Hazelnuts', 'Cardamom'],
    dietary: ['contains_nuts', 'chef_signature'],
    pairing: 'Tokaji Aszú 5 Puttonyos 2017',
    image: RESTAURANT_IMAGES.duck,
  },
  {
    id: 'starter-4',
    name: 'Charred Heirloom Beet Carpaccio',
    frenchName: 'Carpaccio de Betteraves Crapaudine',
    category: 'starters',
    price: 36,
    description: 'Aged cashew-truffle ricotta, pickled mustard seeds, roasted pistachios, and blood orange vinaigrette.',
    ingredients: ['Heirloom Beets', 'Truffle Ricotta', 'Pistachio', 'Blood Orange', 'Micro Sorrel'],
    dietary: ['vegetarian', 'vegan', 'gluten_free', 'contains_nuts'],
    pairing: 'Sancerre Blanc, Domaine Vacheron 2022',
  },

  // Mains
  {
    id: 'main-1',
    name: 'Miyazaki A5 Wagyu Ribcap',
    frenchName: 'Filet de Bœuf Wagyu A5 du Japon',
    category: 'mains',
    price: 135,
    description: 'Charcoal-grilled over binchotan wood, served with bone marrow emulsion, glazed morel mushrooms, and pomme purée.',
    ingredients: ['A5 Wagyu', 'Morel Mushrooms', 'Bone Marrow Jus', 'Robuchon Potatoes', 'Black Truffle'],
    dietary: ['chef_signature', 'gluten_free'],
    pairing: 'Opus One, Napa Valley 2019',
    image: RESTAURANT_IMAGES.wagyu,
  },
  {
    id: 'main-2',
    name: 'Glazed Chilean Glacier Sea Bass',
    frenchName: 'Bar de Ligne Rôti au Miso et Saffron',
    category: 'mains',
    price: 88,
    description: 'Sweet white miso reduction, saffron risotto, caramelized baby leeks, sea beans, and ginger dashi froth.',
    ingredients: ['Chilean Sea Bass', 'Saffron Risotto', 'Saikyo Miso', 'Dashi Emulsion', 'Edible Orchids'],
    dietary: ['gluten_free', 'chef_signature'],
    pairing: 'Chassagne-Montrachet, Michel Niellon 2020',
    image: RESTAURANT_IMAGES.seabass,
  },
  {
    id: 'main-3',
    name: 'Crispy Skin Rohan Duck Breast',
    frenchName: 'Magret de Canard Rohan Rôti aux Cerises',
    category: 'mains',
    price: 76,
    description: 'Lavender honey lacquer, sour Bing cherry gastrique, roasted Romanesco, and parsnip velvet.',
    ingredients: ['Rohan Duck', 'Bing Cherries', 'Lavender Honey', 'Romanesco', 'Parsnip'],
    dietary: ['gluten_free'],
    pairing: 'Gevrey-Chambertin, Domaine Dujac 2018',
    image: RESTAURANT_IMAGES.duck,
  },
  {
    id: 'main-4',
    name: 'Wild Maitake & Black Truffle Risotto',
    frenchName: 'Risotto Carnaroli aux Morilles et Truffe Noire',
    category: 'mains',
    price: 64,
    description: 'Aged Acquerello Carnaroli rice, 36-month Parmigiano-Reggiano, charred maitake clusters, fresh shaved Périgord truffle.',
    ingredients: ['Acquerello Rice', 'Maitake Mushroom', 'Black Truffle', 'Parmigiano-Reggiano', 'Chive Butter'],
    dietary: ['vegetarian', 'gluten_free'],
    pairing: 'Barolo DOCG, Vietti Castiglione 2018',
  },

  // Desserts
  {
    id: 'dessert-1',
    name: 'The Golden Valrhona Sphere',
    frenchName: 'Sphère au Chocolat Grand Cru et Or Fin',
    category: 'desserts',
    price: 34,
    description: 'Single-origin 70% Guanaja chocolate dome melted tableside with hot Fleur de Sel caramel, smoked Tahitian vanilla bean gelato.',
    ingredients: ['Valrhona 70% Dark Chocolate', 'Tahitian Vanilla', 'Smoked Caramel', 'Gold Leaf', 'Hazelnut Crunch'],
    dietary: ['vegetarian', 'contains_nuts', 'chef_signature'],
    pairing: 'Rare Rutherglen Muscat, Campbells',
    image: RESTAURANT_IMAGES.dessertWine,
  },
  {
    id: 'dessert-2',
    name: 'Kyoto Yuzu & White Peach Soufflé',
    frenchName: 'Soufflé Chaud au Yuzu et Pêche Blanche',
    category: 'desserts',
    price: 32,
    description: 'Puffed to perfection, served with white peach compote and infused jasmine tea crème anglaise poured warm inside.',
    ingredients: ['Kyoto Yuzu', 'White Peach', 'Jasmine Crème Anglaise', 'Organic Eggs', 'Powdered Sugar'],
    dietary: ['vegetarian'],
    pairing: 'Moscato d’Asti, La Spinetta 2023',
  },
  {
    id: 'dessert-3',
    name: 'Wild Blackberry & Pistachio Tart',
    frenchName: 'Tartelette Croustillante Mûres Sauvages et Pistache de Bronte',
    category: 'desserts',
    price: 28,
    description: 'Bronte pistachio ganache, fresh mountain blackberries, shiso leaf sorbet, delicate sable crust.',
    ingredients: ['Bronte Pistachio', 'Wild Blackberries', 'Shiso Sorbet', 'Almond Sable'],
    dietary: ['vegetarian', 'contains_nuts'],
    pairing: 'Château Coutet Sauternes-Barsac 2016',
  },

  // Wines & Cocktails
  {
    id: 'cocktail-1',
    name: 'The Aurelia Elixir',
    frenchName: 'Cocktail Signature à l’Or Éthéré',
    category: 'wines_cocktails',
    price: 28,
    description: 'Rare Japanese Whisky Hibiki, smoked rosemary vermouth, clarified bergamot liqueur, 24k suspended gold leaf, hand-carved ice.',
    ingredients: ['Hibiki Whisky', 'Clarified Bergamot', 'Rosemary Smoke', '24k Gold Leaf'],
    dietary: ['chef_signature', 'vegan'],
    pairing: 'Ideal welcoming aperitif before course service',
    image: RESTAURANT_IMAGES.cocktail,
  },
  {
    id: 'cocktail-2',
    name: 'Smoked French Boulevardier',
    frenchName: 'Boulevardier Fumé au Bois de Chêne',
    category: 'wines_cocktails',
    price: 26,
    description: 'Michter’s Bourbon, Campari Cask Tales, Antica Formula, torch-expressed orange peel, oak barrel smoke.',
    ingredients: ['Bourbon', 'Campari Cask', 'Sweet Vermouth', 'Oak Smoke'],
    dietary: ['vegan'],
  },
  {
    id: 'cocktail-3',
    name: 'Château d’Yquem 2015 (By Glass)',
    frenchName: 'Premier Cru Supérieur Sauternes',
    category: 'wines_cocktails',
    price: 95,
    description: 'Coravin preserved glass of liquid gold nectar, honeyed apricots, candied ginger, and supreme floral acidity.',
    ingredients: ['100% Sémillon/Sauvignon Blanc', 'Bordeaux Grand Cru'],
    dietary: ['vegetarian', 'vegan', 'gluten_free', 'chef_signature'],
  },
];

export const REVIEWS: RestaurantReview[] = [
  {
    id: 'rev-1',
    author: 'Eleanor Vance',
    title: 'Michelin Guide Inspector Verdict',
    quote: 'A breathtaking demonstration of culinary discipline. Every plate at Aurelia is executed with the surgical precision of haute cuisine and the soul of intimate hospitality.',
    source: 'The Michelin Guide 2026',
    rating: 5,
    date: 'February 2026',
  },
  {
    id: 'rev-2',
    author: 'Sebastian Morales',
    title: 'A Masterclass in Contemporary Gastronomy',
    quote: 'The Miyazaki A5 Wagyu paired with their cellar reserve Margaux was the single greatest course I have experienced this decade. The booking system was seamless and the ambiance unforgettable.',
    source: 'Gourmet World Review',
    rating: 5,
    date: 'January 2026',
  },
  {
    id: 'rev-3',
    author: 'Claire & Harrison Dupont',
    title: 'Unrivaled Anniversary Celebration',
    quote: 'From our private sommelier in the Wine Vault to the hand-written welcome note and customized dessert, Aurelia treated our 10th anniversary like royalty.',
    source: 'Verified Patron',
    rating: 5,
    date: 'March 2026',
  },
];

export const SAMPLE_RESERVATIONS: Reservation[] = [
  {
    id: 'res-demo-1',
    bookingRef: 'AUR-98241',
    createdAt: '2026-08-20T14:30:00Z',
    guestName: 'Harrison Dupont',
    guestEmail: 'harrison.dupont@example.com',
    guestPhone: '+1 (555) 234-9812',
    partySize: 2,
    date: '2026-09-12',
    time: '7:30 PM',
    seatingArea: 'wine_vault',
    occasion: 'Anniversary',
    dietaryRequirements: ['Nut Allergy'],
    specialRequests: 'Celebrating 10th anniversary. Would appreciate sommelier vintage pairing recommendations.',
    winePairingSelected: true,
    status: 'confirmed',
  },
];
