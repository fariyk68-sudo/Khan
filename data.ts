import { Product, Category } from './types';

export const categories: Category[] = [
  { id: 'mobile', name: 'Mobile', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=1200&q=80' },
  { id: 'electronics', name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&q=80' },
  { id: 'accessories', name: 'Accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=80' },
  { id: 'clothes', name: 'Clothes', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&q=80' },
];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Titan Pro Max 5G',
    description: 'The ultimate flagship experience. Featuring a 6.9" Dynamic AMOLED display, 200MP pro-grade camera, and the fastest chip ever in a smartphone.',
    price: 999.00,
    originalPrice: 1199.00,
    discount: 15,
    category: 'Mobile',
    image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800&q=80',
      'https://images.unsplash.com/photo-1592890288564-76628a30a657?w=800&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
      'https://images.unsplash.com/photo-1556656793-062ff9878273?w=800&q=80',
      'https://images.unsplash.com/photo-1533228891704-fb96ac775be3?w=800&q=80'
    ],
    badge: 'New Arrival',
    variations: [
      { label: 'Storage', options: ['256GB', '512GB', '1TB'] },
      { label: 'Color', options: ['Titanium', 'Midnight', 'Emerald'] }
    ],
    reviews: [{ id: 'r1', reviewerName: 'Alex', rating: 5, comment: 'Incredible camera quality!', date: 'Today' }]
  },
  {
    id: 'p2',
    name: 'Stealth Audio Wireless',
    description: 'Immersive sound with hybrid noise cancellation, 40h runtime, and premium memory foam cushions for all-day comfort.',
    price: 129.99,
    originalPrice: 199.99,
    discount: 35,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80',
      'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80'
    ],
    badge: 'Bestseller',
    reviews: []
  },
  {
    id: 'p3',
    name: 'Urban Riviera Blazer',
    description: 'Bespoke tailoring meets casual comfort. Breathable Italian linen in a contemporary slim cut for the modern professional.',
    price: 85.00,
    originalPrice: 125.00,
    discount: 32,
    category: 'Clothes',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
      'https://images.unsplash.com/photo-1594932224456-806c95465bf3?w=800&q=80',
      'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80',
      'https://images.unsplash.com/photo-1520975916090-3105956dac52?w=800&q=80'
    ],
    badge: 'Staff Pick',
    variations: [{ label: 'Size', options: ['S', 'M', 'L', 'XL'] }],
    reviews: []
  },
  {
    id: 'p4',
    name: 'Neo Tab Ultra 14"',
    description: 'A powerhouse tablet for creators. 14-inch OLED display with pressure-sensitive stylus included. Perfect for design and gaming.',
    price: 749.00,
    originalPrice: 899.00,
    discount: 16,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80',
      'https://images.unsplash.com/photo-1561154464-82e99adf3276?w=800&q=80',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
      'https://images.unsplash.com/photo-1585790050230-5ad2847699cd?w=800&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&q=80'
    ],
    reviews: []
  },
  {
    id: 'p5',
    name: 'Vantage Chrono Watch',
    description: 'Precision engineering meets classic design. Sapphire glass, waterproof up to 100m, and genuine leather strap.',
    price: 155.00,
    originalPrice: 220.00,
    discount: 30,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80',
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&q=80',
      'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=800&q=80',
      'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=800&q=80'
    ],
    badge: 'Limited',
    reviews: []
  },
  {
    id: 'p6',
    name: 'Canvas Trek Backpack',
    description: 'Durable, waterproof, and stylish. Features a 16" laptop compartment and hidden anti-theft pockets.',
    price: 65.00,
    originalPrice: 95.00,
    discount: 31,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
      'https://images.unsplash.com/photo-1491633582648-279425c14963?w=800&q=80',
      'https://images.unsplash.com/photo-1544648183-ce163d487212?w=800&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80',
      'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&q=80'
    ],
    reviews: []
  }
];

export const heroSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80',
    title: 'Joy Of Shopping',
    subtitle: 'Find your perfect style with a smile.'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1600&q=80',
    title: 'New Collections',
    subtitle: 'Explore the latest trends in luxury lifestyle.'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1600&q=80',
    title: 'Premium Gadgets',
    subtitle: 'Experience performance and design redefined.'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&q=80',
    title: 'Modern Living',
    subtitle: 'Technology that simplifies your everyday life.'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=80',
    title: 'Designer Wear',
    subtitle: 'Unbeatable style meets quality craftsmanship.'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1552581234-26160f608093?w=1600&q=80',
    title: 'Happy Customers',
    subtitle: 'Join thousands of satisfied shoppers today.'
  }
];

export const contactSlides = [
  { 
    id: 1, 
    image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=1600&q=80', 
    title: 'Always Here To Help', 
    subtitle: 'Our dedicated team is ready for your questions.' 
  },
  { 
    id: 2, 
    image: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=1600&q=80', 
    title: 'Premium Support', 
    subtitle: 'Get assistance from our shopping experts.' 
  },
  { 
    id: 3, 
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80', 
    title: 'Visit Our Office', 
    subtitle: 'Located in the tech hub of Islamabad F17.' 
  }
];