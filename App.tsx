
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ShoppingCart, Menu, X, Search, ChevronRight, ChevronLeft, 
  Minus, Plus, Trash2, Heart, CheckCircle, Star, 
  Package, Mail, MapPin, Phone, ArrowRight, ShoppingBag, 
  Facebook, Instagram, Twitter, Smartphone, CreditCard, Wallet, User,
  Globe, PlayCircle, CreditCard as VisaIcon
} from 'lucide-react';
import { Product, CartItem, Review, PaymentMethod } from './types';
import { products, categories, heroSlides, contactSlides } from './data';

type View = 'home' | 'about' | 'products' | 'categories' | 'contact';

// --- Product Card Component ---
interface ProductCardProps {
  product: Product;
  isInWishlist: boolean;
  toggleWishlist: (p: Product) => void;
  setLightboxImage: (img: string) => void;
  quantities: Record<string, number>;
  setQuantities: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  selectedVariations: Record<string, Record<string, string>>;
  updateVariation: (productId: string, label: string, option: string) => void;
  addToCart: (p: Product) => void;
  onBuyNow: (p: Product) => void;
  expandedReviews: Record<string, boolean>;
  setExpandedReviews: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  handleAddReview: (pId: string, data: Omit<Review, 'id' | 'date'>) => void;
  imgRef: (el: HTMLImageElement | null) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  isInWishlist, 
  toggleWishlist, 
  setLightboxImage, 
  quantities, 
  setQuantities, 
  selectedVariations, 
  updateVariation, 
  addToCart, 
  onBuyNow,
  expandedReviews, 
  setExpandedReviews, 
  handleAddReview,
  imgRef
}) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);
  
  const isExpanded = expandedReviews[product.id];
  const avgRating = product.reviews?.length 
    ? (product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length).toFixed(1)
    : "NEW";

  const badgeColors: Record<string, string> = {
    'Bestseller': 'bg-amber-500',
    'New Arrival': 'bg-emerald-500',
    'Limited': 'bg-purple-500',
    'Staff Pick': 'bg-sky-500'
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomOrigin({ x, y });
  };

  return (
    <div className="group bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col overflow-hidden relative border-b-4 border-b-indigo-600/10">
      <div 
        className="relative aspect-[4/5] overflow-hidden m-2 rounded-[1.5rem] cursor-zoom-in"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
      >
        <img 
          ref={imgRef}
          src={product.images[currentImgIndex]} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 ease-out"
          style={{
            transform: isZooming ? 'scale(1.8)' : 'scale(1)',
            transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`
          }}
          onClick={() => setLightboxImage(product.images[currentImgIndex])}
        />
        
        {product.images.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-20 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
            <div className="flex gap-1.5 p-1.5 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-2xl">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onMouseEnter={() => setCurrentImgIndex(i)}
                  className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    i === currentImgIndex 
                      ? 'border-indigo-600 scale-110 shadow-lg' 
                      : 'border-white/50 opacity-60 hover:opacity-100 hover:scale-105'
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" alt={`${product.name} view ${i + 1}`} />
                </button>
              ))}
            </div>
          </div>
        )}

        {product.discount > 0 && (
          <div className="absolute top-4 left-4 bg-red-600 text-white text-[9px] font-black px-3 py-1.5 rounded-full z-10 shadow-lg uppercase tracking-widest pointer-events-none">
            -{product.discount}%
          </div>
        )}
        {product.badge && (
          <div className={`absolute ${product.discount > 0 ? 'top-12' : 'top-4'} left-4 ${badgeColors[product.badge] || 'bg-indigo-600'} text-white text-[9px] font-black px-3 py-1.5 rounded-full z-10 shadow-lg uppercase tracking-widest pointer-events-none`}>
            {product.badge}
          </div>
        )}
        <button 
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
          className={`absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-sm rounded-full transition-all shadow-md z-10 hover:scale-110 ${isInWishlist ? 'text-red-500' : 'text-gray-300'}`}
        >
          <Heart size={18} fill={isInWishlist ? "currentColor" : "none"} />
        </button>
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{product.category}</span>
          <div className="flex items-center gap-1 text-[10px] font-black text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full">
            <Star size={10} className="fill-yellow-400 text-yellow-400" />
            {avgRating}
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 leading-tight mb-2 truncate group-hover:text-indigo-600 transition-colors font-heading">{product.name}</h3>
        <p className="text-xs text-gray-500 font-medium line-clamp-2 h-8 leading-relaxed mb-4">{product.description}</p>
        
        <div className="space-y-3 mb-6">
          {product.variations?.map(v => (
            <div key={v.label} className="space-y-1">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{v.label}</span>
              <div className="flex flex-wrap gap-1">
                {v.options.map(opt => (
                  <button
                    key={opt}
                    onClick={() => updateVariation(product.id, v.label, opt)}
                    className={`px-2 py-1 text-[9px] font-black rounded-md border transition-all ${
                      selectedVariations[product.id]?.[v.label] === opt
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                        : 'bg-white border-gray-100 text-gray-400 hover:border-indigo-300'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-baseline gap-2 mb-6">
          <span className="text-2xl font-black text-gray-900 tracking-tighter font-heading">${product.price.toFixed(2)}</span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-gray-300 line-through font-bold">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        <div className="mt-auto space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center bg-gray-50 rounded-xl h-12 px-1 border border-gray-100">
              <button onClick={() => setQuantities(prev => ({ ...prev, [product.id]: Math.max(1, (prev[product.id] || 1) - 1) }))} className="p-2 text-gray-400 hover:text-indigo-600 transition"><Minus size={14} /></button>
              <span className="flex-1 text-center font-black text-sm text-gray-700">{quantities[product.id] || 1}</span>
              <button onClick={() => setQuantities(prev => ({ ...prev, [product.id]: (prev[product.id] || 1) + 1 }))} className="p-2 text-gray-400 hover:text-indigo-600 transition"><Plus size={14} /></button>
            </div>
            <button 
              onClick={() => addToCart(product)}
              className="bg-gray-900 hover:bg-gray-800 text-white h-12 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
            >
              <ShoppingCart size={14} /> Cart
            </button>
          </div>
          <button 
            onClick={() => onBuyNow(product)}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-12 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
          >
            <CreditCard size={16} /> Buy Now
          </button>

          <button 
            onClick={() => setExpandedReviews(prev => ({ ...prev, [product.id]: !prev[product.id] }))}
            className="w-full py-2 text-[10px] font-black text-gray-400 hover:text-indigo-600 uppercase tracking-widest flex items-center justify-center gap-1 transition-colors"
          >
            {isExpanded ? "Collapse" : `Reviews (${product.reviews?.length || 0})`}
            <ChevronRight size={12} className={isExpanded ? 'rotate-90' : ''} />
          </button>

          {isExpanded && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <ProductReviews productId={product.id} reviews={product.reviews || []} onAddReview={handleAddReview} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [allProducts, setAllProducts] = useState<Product[]>(products);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({});
  const [cartPulsing, setCartPulsing] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[] | null>(null);

  const productImgRefs = useRef<Record<string, HTMLImageElement | null>>({});
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(products.map(p => [p.id, 1]))
  );

  const [selectedVariations, setSelectedVariations] = useState<Record<string, Record<string, string>>>(
    Object.fromEntries(
      products.filter(p => p.variations).map(p => [
        p.id, 
        Object.fromEntries(p.variations!.map(v => [v.label, v.options[0]]))
      ])
    )
  );

  const handleNav = (view: View) => {
    setCurrentView(view);
    setIsMenuOpen(false); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, allProducts]);

  const addToCart = (product: Product) => {
    const qty = quantities[product.id] || 1;
    const itemVariations = selectedVariations[product.id] || {};
    setCart(prev => {
      const existing = prev.find(item => 
        item.id === product.id && 
        JSON.stringify(item.selectedVariations) === JSON.stringify(itemVariations)
      );
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && JSON.stringify(item.selectedVariations) === JSON.stringify(itemVariations)) 
          ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { ...product, quantity: qty, selectedVariations: itemVariations }];
    });
    setCartPulsing(true);
    setTimeout(() => setCartPulsing(false), 600);
    setQuantities(prev => ({ ...prev, [product.id]: 1 }));
  };

  const handleBuyNow = (product: Product) => {
    const qty = quantities[product.id] || 1;
    const itemVariations = selectedVariations[product.id] || {};
    setCheckoutItems([{ ...product, quantity: qty, selectedVariations: itemVariations }]);
    setIsCheckingOut(true);
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const checkoutItemsTotal = checkoutItems?.reduce((acc, item) => acc + (item.price * item.quantity), 0) || 0;
  const currentCheckoutTotal = (checkoutItems ? checkoutItemsTotal : cartTotal) * (1 - appliedDiscount / 100);

  const navItems: { label: string; view: View }[] = [
    { label: 'Home', view: 'home' },
    { label: 'About Us', view: 'about' },
    { label: 'Products', view: 'products' },
    { label: 'Categories', view: 'categories' },
    { label: 'Contact Us', view: 'contact' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex justify-between items-center">
          <button onClick={() => handleNav('home')} className="text-2xl font-black text-indigo-600 tracking-tighter hover:opacity-80 transition uppercase font-heading">KHAN STORE</button>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button 
                key={item.view} 
                onClick={() => handleNav(item.view)}
                className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:text-indigo-600 ${currentView === item.view ? 'text-indigo-600' : 'text-gray-500'}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <button onClick={() => setIsWishlistOpen(true)} className="relative p-2 text-gray-400 hover:text-red-500 transition">
              <Heart size={22} />
              {wishlist.length > 0 && <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full animate-bounce">{wishlist.length}</span>}
            </button>
            <button onClick={() => setIsCartOpen(true)} className={`relative p-2 text-gray-400 hover:text-indigo-600 transition ${cartPulsing ? 'scale-110 text-indigo-600' : ''}`}>
              <ShoppingCart size={22} />
              {cart.length > 0 && <span className="absolute top-1 right-1 bg-indigo-600 text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full animate-pulse">{cart.reduce((a, b) => a + b.quantity, 0)}</span>}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-gray-500 hover:text-indigo-600 transition-colors">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`md:hidden absolute w-full bg-white border-b shadow-xl transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="p-6 space-y-4">
            {navItems.map((item) => (
              <button 
                key={item.view} 
                onClick={() => handleNav(item.view)}
                className={`block w-full text-left font-black uppercase tracking-tighter text-lg py-2 ${currentView === item.view ? 'text-indigo-600' : 'text-gray-900'}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="flex-1 mt-16 sm:mt-20">
        {currentView === 'home' && (
          <div className="animate-in fade-in duration-700">
            <Hero onShopNow={() => handleNav('products')} slides={heroSlides} />
            <section className="py-24 bg-white text-center px-4">
              <h2 className="text-5xl font-bold mb-8 tracking-tight font-heading">Luxury Tech for Everyone</h2>
              <p className="max-w-2xl mx-auto text-gray-500 text-lg leading-relaxed font-medium">
                Islamabad's premium destination for gadgets, accessories, and designer fashion. We bring the world's most innovative brands to your doorstep.
              </p>
            </section>
            
            <section className="py-24 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between mb-12">
                  <h2 className="text-4xl font-bold font-heading">Featured Categories</h2>
                  <button onClick={() => handleNav('categories')} className="text-indigo-600 font-black text-xs uppercase tracking-widest flex items-center gap-2 group">View All <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" /></button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {categories.map(cat => (
                    <div 
                      key={cat.id} 
                      onClick={() => { setSelectedCategory(cat.name); handleNav('products'); }} 
                      className="group relative h-96 rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl transition-all"
                    >
                      <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 duration-1000 transition-transform" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-10 left-10 text-white">
                        <h3 className="text-3xl font-bold font-heading mb-1">{cat.name}</h3>
                        <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">Explore Category</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-4xl font-bold font-heading mb-12">Trending Now</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {allProducts.slice(0, 4).map(product => (
                    <ProductCard 
                      key={product.id}
                      product={product}
                      isInWishlist={wishlist.some(item => item.id === product.id)}
                      toggleWishlist={(p) => setWishlist(prev => prev.some(i => i.id === p.id) ? prev.filter(i => i.id !== p.id) : [...prev, p])}
                      setLightboxImage={setLightboxImage}
                      quantities={quantities}
                      setQuantities={setQuantities}
                      selectedVariations={selectedVariations}
                      updateVariation={(id, l, o) => setSelectedVariations(prev => ({ ...prev, [id]: { ...(prev[id] || {}), [l]: o } }))}
                      addToCart={addToCart}
                      onBuyNow={handleBuyNow}
                      expandedReviews={expandedReviews}
                      setExpandedReviews={setExpandedReviews}
                      handleAddReview={(id, r) => setAllProducts(prev => prev.map(p => p.id === id ? { ...p, reviews: [...(p.reviews || []), { ...r, id: Date.now().toString(), date: 'Today' }] } : p))}
                      imgRef={(el) => { productImgRefs.current[product.id] = el; }}
                    />
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {currentView === 'products' && (
          <div className="py-24 bg-white animate-in fade-in duration-700">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex flex-col md:flex-row gap-4 mb-16 items-center">
                <div className="flex-1 relative w-full">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input type="text" placeholder="Search inventory..." className="w-full pl-16 pr-6 py-5 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-indigo-600 outline-none font-bold text-lg shadow-sm" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 custom-scrollbar">
                  <button 
                    onClick={() => setSelectedCategory('All')} 
                    className={`px-8 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap shadow-sm ${selectedCategory === 'All' ? 'bg-indigo-600 text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                  >
                    All
                  </button>
                  {categories.map(c => (
                    <button 
                      key={c.id} 
                      onClick={() => setSelectedCategory(c.name)} 
                      className={`px-8 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap shadow-sm ${selectedCategory === c.name ? 'bg-indigo-600 text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id}
                    product={product}
                    isInWishlist={wishlist.some(item => item.id === product.id)}
                    toggleWishlist={(p) => setWishlist(prev => prev.some(i => i.id === p.id) ? prev.filter(i => i.id !== p.id) : [...prev, p])}
                    setLightboxImage={setLightboxImage}
                    quantities={quantities}
                    setQuantities={setQuantities}
                    selectedVariations={selectedVariations}
                    updateVariation={(id, l, o) => setSelectedVariations(prev => ({ ...prev, [id]: { ...(prev[id] || {}), [l]: o } }))}
                    addToCart={addToCart}
                    onBuyNow={handleBuyNow}
                    expandedReviews={expandedReviews}
                    setExpandedReviews={setExpandedReviews}
                    handleAddReview={(id, r) => setAllProducts(prev => prev.map(p => p.id === id ? { ...p, reviews: [...(p.reviews || []), { ...r, id: Date.now().toString(), date: 'Today' }] } : p))}
                    imgRef={(el) => { productImgRefs.current[product.id] = el; }}
                  />
                ))}
              </div>
              {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                  <Search size={64} className="mx-auto text-gray-200 mb-6" />
                  <p className="text-gray-400 font-bold uppercase tracking-widest">No products found for your search</p>
                </div>
              )}
            </div>
          </div>
        )}

        {currentView === 'categories' && (
          <div className="py-24 bg-gray-50 animate-in fade-in duration-700">
            <div className="max-w-7xl mx-auto px-4">
              <h1 className="text-6xl font-bold font-heading mb-16 text-center">Shop by Category</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {categories.map(cat => (
                  <div 
                    key={cat.id} 
                    onClick={() => { setSelectedCategory(cat.name); handleNav('products'); }} 
                    className="group relative h-[400px] rounded-[3rem] overflow-hidden cursor-pointer shadow-2xl transition-all hover:-translate-y-2"
                  >
                    <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 duration-1000 transition-transform" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                      <h3 className="text-5xl font-bold font-heading mb-4">{cat.name}</h3>
                      <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all">Shop Now</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentView === 'contact' && (
          <div className="animate-in fade-in duration-700">
            <Hero onShopNow={() => {}} slides={contactSlides} />
            <div className="max-w-3xl mx-auto px-4 py-24 text-center">
              <h1 className="text-6xl font-bold font-heading mb-8">Get In Touch</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
                <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 hover:border-indigo-200 transition-colors">
                  <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6"><Phone /></div>
                  <h3 className="text-xl font-bold font-heading mb-2">WhatsApp / Call</h3>
                  <p className="text-gray-500 font-bold">0310 5314345</p>
                </div>
                <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 hover:border-indigo-200 transition-colors">
                  <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6"><MapPin /></div>
                  <h3 className="text-xl font-bold font-heading mb-2">Location</h3>
                  <p className="text-gray-500 font-bold">Islamabad F17 Telegarden</p>
                </div>
              </div>
              <div className="bg-indigo-600 p-12 rounded-[4rem] text-white">
                <h3 className="text-3xl font-bold font-heading mb-6">Send Us A Message</h3>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Message sent! We will contact you soon.'); }}>
                  <input required placeholder="Your Name" className="w-full px-8 py-5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 outline-none focus:bg-white/20 transition-all font-bold" />
                  <input required type="email" placeholder="Email Address" className="w-full px-8 py-5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 outline-none focus:bg-white/20 transition-all font-bold" />
                  <textarea required placeholder="Your Message" rows={4} className="w-full px-8 py-5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 outline-none focus:bg-white/20 transition-all font-bold resize-none" />
                  <button type="submit" className="w-full bg-white text-indigo-600 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-gray-50 transition-colors">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        )}

        {currentView === 'about' && (
          <div className="py-24 bg-white animate-in fade-in duration-700">
            <div className="max-w-5xl mx-auto px-4">
              <h1 className="text-7xl font-bold font-heading mb-12 text-center">Our Story</h1>
              <div className="aspect-video rounded-[4rem] overflow-hidden mb-16 shadow-2xl">
                <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80" className="w-full h-full object-cover" alt="Khan Store Retail" />
              </div>
              <div className="prose prose-xl mx-auto text-gray-500 leading-relaxed font-medium">
                <p className="mb-8">
                  Khan Store was founded in Islamabad with a single mission: to provide high-quality electronic devices, mobile accessories, and premium fashion to the discerning youth of Pakistan.
                </p>
                <p className="mb-8">
                  We believe that technology should be an extension of your personality. That's why we carefully curate our inventory to include only the most reliable and aesthetically pleasing products available globally.
                </p>
                <div className="p-12 bg-gray-50 rounded-[3rem] text-center border border-gray-100">
                  <h3 className="text-3xl font-bold font-heading text-gray-900 mb-4">Our Vision</h3>
                  <p className="italic font-serif text-2xl text-indigo-600">"To be the leading premium retail destination in Islamabad, connecting innovation with style."</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-gray-950 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
          <h3 className="text-4xl font-bold text-indigo-500 mb-8 uppercase font-heading tracking-tighter">KHAN STORE</h3>
          <div className="flex gap-8 mb-12 flex-wrap justify-center">
            {navItems.map(item => (
              <button key={item.view} onClick={() => handleNav(item.view)} className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors mx-4 my-2">{item.label}</button>
            ))}
          </div>
          <p className="text-gray-500 text-[11px] font-black uppercase tracking-widest mb-12">&copy; {new Date().getFullYear()} Khan Store Global. Islamabad, PK. All Rights Reserved.</p>
          <div className="flex justify-center gap-6">
            <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer"><Facebook size={20} /></div>
            <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer"><Instagram size={20} /></div>
            <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer"><Twitter size={20} /></div>
          </div>
        </div>
      </footer>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart} 
        onUpdateQty={(id, vars, delta) => setCart(prev => prev.map(item => (item.id === id && JSON.stringify(item.selectedVariations) === JSON.stringify(vars)) ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item))} 
        onRemove={(id, vars) => setCart(prev => prev.filter(item => !(item.id === id && JSON.stringify(item.selectedVariations) === JSON.stringify(vars))))} 
        total={cartTotal * (1 - appliedDiscount / 100)} 
        onCheckout={() => { setCheckoutItems(null); setIsCartOpen(false); setIsCheckingOut(true); }}
        onApply={(code: string) => {
          if (code === 'SAVE10') setAppliedDiscount(10);
          else if (code === 'SAVE20') setAppliedDiscount(20);
          else alert('Invalid Discount Code');
        }}
      />

      <WishlistDrawer 
        isOpen={isWishlistOpen} 
        onClose={() => setIsWishlistOpen(false)} 
        items={wishlist} 
        onToggle={(p) => setWishlist(prev => prev.filter(i => i.id !== p.id))} 
        onAddToCart={(p) => { addToCart(p); setIsWishlistOpen(false); }} 
      />

      {isCheckingOut && (
        <CheckoutModal 
          total={currentCheckoutTotal} 
          onConfirm={() => { setOrderConfirmed(true); setTimeout(() => { setIsCheckingOut(false); setOrderConfirmed(false); if (!checkoutItems) setCart([]); setCheckoutItems(null); }, 4000); }} 
          onClose={() => { setIsCheckingOut(false); setCheckoutItems(null); }} 
          orderConfirmed={orderConfirmed} 
          items={checkoutItems || cart} 
        />
      )}

      {lightboxImage && (
        <div className="fixed inset-0 z-[110] bg-black/95 flex items-center justify-center p-4 animate-in fade-in backdrop-blur-md" onClick={() => setLightboxImage(null)}>
          <button className="absolute top-8 right-8 text-white hover:scale-110 transition-transform"><X size={32} /></button>
          <img src={lightboxImage} alt="Large preview" className="max-w-full max-h-[85vh] rounded-3xl shadow-2xl border-4 border-white/10 object-contain" />
        </div>
      )}
    </div>
  );
}

// --- Specialized Components ---

const Hero = ({ onShopNow, slides }: { onShopNow: () => void, slides: any[] }) => {
  const [slide, setSlide] = useState(0);
  useEffect(() => { 
    const t = setInterval(() => setSlide(s => (s + 1) % slides.length), 6000); 
    return () => clearInterval(t); 
  }, [slides.length]);
  
  return (
    <section className="relative h-[85vh] overflow-hidden">
      {slides.map((s, idx) => (
        <div key={s.id} className={`absolute inset-0 transition-opacity duration-1000 ${idx === slide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[6s] scale-100" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${s.image})`, transform: idx === slide ? 'scale(1.1)' : 'scale(1)' }} />
          <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center items-start text-white">
            <h1 className="text-6xl md:text-8xl font-bold leading-none mb-6 font-heading animate-in slide-in-from-bottom-10 duration-1000">{s.title}</h1>
            <p className="text-xl md:text-2xl font-medium max-w-2xl mb-10 text-white/90 animate-in slide-in-from-bottom-12 duration-1000 delay-200">{s.subtitle}</p>
            {onShopNow && <button onClick={onShopNow} className="bg-indigo-600 hover:bg-white hover:text-indigo-600 px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-2xl active:scale-95 animate-in slide-in-from-bottom-14 duration-1000 delay-300">Shop Collection</button>}
          </div>
        </div>
      ))}
      <div className="absolute bottom-10 right-10 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setSlide(i)} className={`h-1.5 rounded-full transition-all duration-500 ${i === slide ? 'w-12 bg-white' : 'w-4 bg-white/30 hover:bg-white/60'}`} />
        ))}
      </div>
    </section>
  );
};

const CartDrawer = ({ isOpen, onClose, cart, onUpdateQty, onRemove, total, onCheckout, onApply }: any) => {
  const [code, setCode] = useState('');
  return (
    <>
      <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white z-[70] shadow-2xl transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
        <div className="p-8 border-b flex justify-between items-center bg-gray-50">
          <h2 className="text-2xl font-bold font-heading uppercase flex items-center gap-3"><ShoppingCart className="text-indigo-600" /> Shopping Bag</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white transition-colors"><X /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
              <ShoppingBag size={64} className="mb-4" />
              <p className="font-black text-xs uppercase tracking-widest">Your bag is empty</p>
            </div>
          ) : cart.map((item: any, idx: number) => (
            <div key={idx} className="flex gap-4 border-b border-gray-100 pb-6 group">
              <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-sm flex-shrink-0">
                <img src={item.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold font-heading text-lg truncate">{item.name}</h4>
                  <button onClick={() => onRemove(item.id, item.selectedVariations)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                </div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">{Object.values(item.selectedVariations || {}).join(' / ')}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1 border">
                    <button onClick={() => onUpdateQty(item.id, item.selectedVariations, -1)} className="p-1 hover:text-indigo-600 transition-colors"><Minus size={12} /></button>
                    <span className="w-6 text-center text-xs font-black">{item.quantity}</span>
                    <button onClick={() => onUpdateQty(item.id, item.selectedVariations, 1)} className="p-1 hover:text-indigo-600 transition-colors"><Plus size={12} /></button>
                  </div>
                  <span className="font-black text-sm text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="p-8 bg-gray-50 border-t space-y-4 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
            <div className="flex gap-2 mb-4">
              <input 
                placeholder="Discount Code" 
                className="flex-1 px-4 py-3 rounded-xl bg-white border outline-none focus:ring-2 focus:ring-indigo-600 font-bold text-sm" 
                value={code} 
                onChange={(e) => setCode(e.target.value.toUpperCase())}
              />
              <button onClick={() => onApply(code)} className="bg-gray-900 text-white px-6 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg active:scale-95 transition-all">Apply</button>
            </div>
            <div className="flex justify-between text-2xl font-bold font-heading pt-2">
              <span>Total</span>
              <span className="text-indigo-600">${total.toFixed(2)}</span>
            </div>
            <button onClick={onCheckout} className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl active:scale-95 transition-all">Checkout Now</button>
          </div>
        )}
      </div>
    </>
  );
};

const WishlistDrawer = ({ isOpen, onClose, items, onToggle, onAddToCart }: any) => (
  <>
    <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
    <div className={`fixed top-0 left-0 h-full w-full sm:w-[450px] bg-white z-[70] shadow-2xl transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}>
      <div className="p-8 border-b flex justify-between items-center bg-gray-50">
        <h2 className="text-2xl font-bold font-heading uppercase flex items-center gap-3 text-red-500"><Heart fill="currentColor" /> Favorites</h2>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-white transition-colors"><X /></button>
      </div>
      <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
            <Heart size={64} className="mb-4" />
            <p className="font-black text-xs uppercase tracking-widest">No favorites saved</p>
          </div>
        ) : items.map((item: any) => (
          <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-6 group">
            <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-sm flex-shrink-0">
              <img src={item.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold font-heading text-lg truncate">{item.name}</h4>
                <button onClick={() => onToggle(item)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
              </div>
              <p className="font-black text-sm text-gray-900 mb-4">${item.price.toFixed(2)}</p>
              <button 
                onClick={() => onAddToCart(item)}
                className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline flex items-center gap-1"
              >
                Move to bag <ChevronRight size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
);

const CheckoutModal = ({ total, onConfirm, onClose, orderConfirmed, items }: any) => {
  const [method, setMethod] = useState<PaymentMethod>('Visa');
  
  const handleFinalPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const redirectUrls: Record<string, string> = {
      'Payoneer': 'https://www.payoneer.com',
      'Google Pay': 'https://pay.google.com',
      'Visa': 'https://www.visa.com/pay-with-visa',
      'MasterCard': 'https://www.mastercard.com/global/en/personal/get-support/payments.html',
    };

    if (redirectUrls[method]) {
      window.location.href = redirectUrls[method];
    } else {
      onConfirm();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => !orderConfirmed && onClose()} />
      <div className="relative bg-white w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 max-h-[90vh] flex flex-col">
        {orderConfirmed ? (
          <div className="p-16 text-center">
            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce"><CheckCircle size={56} /></div>
            <h2 className="text-3xl font-bold font-heading mb-4">Order Received!</h2>
            <p className="text-gray-500 font-bold mb-12 leading-relaxed">
              Dear coustmer you order successfully place plz wait 3 or 2 day to receive your order Thank you for shopping
            </p>
            <div className="p-6 bg-gray-50 rounded-2xl border flex flex-col items-center">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Paid</span>
              <span className="text-4xl font-black text-indigo-600 font-heading">${total.toFixed(2)}</span>
            </div>
          </div>
        ) : (
          <div className="p-8 sm:p-12 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-start">
              <h2 className="text-3xl font-bold font-heading uppercase flex items-center gap-3"><Package className="text-indigo-600" /> Secure Checkout</h2>
              <button onClick={onClose} className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"><X size={20} /></button>
            </div>
            
            <div className="space-y-3 p-6 bg-gray-50 rounded-[2rem] border">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Order Summary</h4>
              <div className="space-y-4 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between text-xs font-bold items-center">
                    <div className="flex gap-2 items-center">
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border">
                        <img src={item.images[0]} className="w-full h-full object-cover" />
                      </div>
                      <span className="truncate max-w-[120px]">{item.quantity}x {item.name}</span>
                    </div>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t font-black text-indigo-600 flex justify-between text-xl items-center">
                <span>Total Payable</span>
                <span className="font-heading tracking-tighter">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Payment Method</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'Payoneer', icon: <Globe size={16} /> },
                  { id: 'Google Pay', icon: <PlayCircle size={16} /> },
                  { id: 'Payeer', icon: <Wallet size={16} /> },
                  { id: 'Visa', icon: <VisaIcon size={16} /> },
                  { id: 'MasterCard', icon: <CreditCard size={16} /> },
                  { id: 'Cash', icon: <Package size={16} /> }
                ].map(m => (
                  <button 
                    key={m.id} 
                    type="button"
                    onClick={() => setMethod(m.id as PaymentMethod)} 
                    className={`py-4 px-2 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${method === m.id ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-sm' : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-indigo-200'}`}
                  >
                    {m.icon}
                    <span className="text-[9px] font-black uppercase tracking-widest text-center leading-tight">{m.id}</span>
                  </button>
                ))}
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleFinalPayment}>
              <div className="grid grid-cols-2 gap-4">
                <input required placeholder="First Name" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none font-bold text-sm focus:ring-2 focus:ring-indigo-600 transition-all" />
                <input required placeholder="Last Name" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none font-bold text-sm focus:ring-2 focus:ring-indigo-600 transition-all" />
              </div>
              <input required type="email" placeholder="Email Address" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none font-bold text-sm focus:ring-2 focus:ring-indigo-600 transition-all" />
              <textarea required placeholder="Shipping Address" rows={2} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none font-bold text-sm focus:ring-2 focus:ring-indigo-600 transition-all resize-none" />
              <button type="submit" className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all mt-4">
                {method === 'Cash' || method === 'Payeer' ? 'Place Order Securely' : `Pay Now via ${method}`}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

const ProductReviews = ({ 
  reviews, 
  productId, 
  onAddReview 
}: { 
  reviews: Review[]; 
  productId: string; 
  onAddReview: (pId: string, data: Omit<Review, 'id' | 'date'>) => void;
}) => {
  const [adding, setAdding] = useState(false);
  const [formData, setFormData] = useState({ reviewerName: '', comment: '', rating: 5 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddReview(productId, formData);
    setFormData({ reviewerName: '', comment: '', rating: 5 });
    setAdding(false);
  };

  return (
    <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Customer Feedback</h4>
        <button onClick={() => setAdding(!adding)} className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">{adding ? 'Cancel' : 'Write Review'}</button>
      </div>

      {adding && (
        <form onSubmit={handleSubmit} className="p-4 bg-gray-50 rounded-2xl space-y-3 animate-in fade-in slide-in-from-top-2">
          <input 
            required 
            placeholder="Your Name" 
            className="w-full px-4 py-2 rounded-xl text-[10px] font-bold outline-none border-none bg-white"
            value={formData.reviewerName}
            onChange={e => setFormData({...formData, reviewerName: e.target.value})}
          />
          <textarea 
            required 
            placeholder="Your Comment" 
            className="w-full px-4 py-2 rounded-xl text-[10px] font-bold outline-none border-none bg-white resize-none"
            value={formData.comment}
            onChange={e => setFormData({...formData, comment: e.target.value})}
          />
          <div className="flex justify-between items-center">
            <div className="flex gap-1">
              {[1,2,3,4,5].map(s => (
                <Star 
                  key={s} 
                  size={12} 
                  onClick={() => setFormData({...formData, rating: s})}
                  className={`cursor-pointer ${s <= formData.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} 
                />
              ))}
            </div>
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">Submit</button>
          </div>
        </form>
      )}

      {reviews.length === 0 ? (
        <p className="text-[10px] text-gray-300 italic py-2">No feedback yet. Be the first!</p>
      ) : (
        <div className="space-y-3">
          {reviews.map(r => (
            <div key={r.id} className="bg-gray-50 p-4 rounded-2xl">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-black text-gray-900">{r.reviewerName}</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={8} className={i < r.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'} />
                  ))}
                </div>
              </div>
              <p className="text-[10px] text-gray-500 italic leading-relaxed">"{r.comment}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
