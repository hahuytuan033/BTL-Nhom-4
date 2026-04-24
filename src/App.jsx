/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Search, 
  User, 
  ShoppingBag, 
  Heart, 
  ArrowRight,
  Info,
  Globe,
  Share2,
  MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthModal from './components/AuthModal';

// --- Mock Data ---

// --- Mock Data ---
const RECOMMENDED_PRODUCTS = [
  { id: 1, name: "Jordan 1 Retro Low OG SP", subText: "Fragment x Travis Scott", price: "$1,200", image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&q=80", xpressShip: true },
  { id: 2, name: "Jordan 1 Retro Low OG SP", subText: "Travis Scott Medium Olive", price: "$495", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80", xpressShip: true },
  { id: 3, name: "Jordan 1 Retro Low OG SP", subText: "Travis Scott Reverse...", price: "$1,056", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80", xpressShip: true },
  { id: 4, name: "Jordan 1 Retro Low OG SP", subText: "Travis Scott Velvet Brown", price: "$362", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80", xpressShip: true },
  { id: 5, name: "Jordan 1 Retro High Virgil", subText: "Abloh Archive Alaska", price: "$343", image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400&q=80", xpressShip: true },
  { id: 6, name: "Jordan 1 Retro Low OG SP", subText: "Travis Scott Mocha", price: "$1,652", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&q=80", xpressShip: true },
];

const POPULAR_BRANDS = [
  { id: 1, name: "Jordan", image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=200&q=80" },
  { id: 2, name: "Fear of God", image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=200&q=80" },
  { id: 3, name: "POP MART", image: "https://images.unsplash.com/photo-1559563458-527698bf5295?w=200&q=80" },
  { id: 4, name: "Supreme", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=200&q=80" },
  { id: 5, name: "Louis Vuitton", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&q=80" },
];

const TRENDING_SNEAKERS = [
  { id: 7, name: "Jordan 1 Retro High Virgil", subText: "Abloh Archive Alaska", price: "$343", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
  { id: 8, name: "Jordan 4 Retro Iced", subText: "Carmine (Women's)", price: "$136", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80" },
  { id: 9, name: "Nike Mind 001 Slide Black", subText: "Lowest Ask", price: "$199", image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=400&q=80" },
  { id: 10, name: "Vans Old Skool 36", subText: "Pearlized Pack Vintage", price: "$147", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&q=80" },
  { id: 11, name: "Jordan 5 Retro White", subText: "Metallic (2025)", price: "$203", image: "https://images.unsplash.com/photo-1552346154-21d328109a27?w=400&q=80" },
  { id: 12, name: "Nike Air Force 1 Low WB", subText: "Light Orewood Brown Pink", price: "$157", image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80" },
];

const APPAREL = [
  { id: 13, name: "Nike FC Barcelona Re...", subText: "Issue 2005/06 Ronaldin...", price: "$151", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
  { id: 14, name: "Supreme MM6 Maison", subText: "Margiela Box Logo Zip U...", price: "$640", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&q=80" },
  { id: 15, name: "adidas CTT Chinese Track", subText: "No. 31 Gender Neutral...", price: "$138", image: "https://images.unsplash.com/photo-1559563458-527698bf5295?w=400&q=80" },
  { id: 16, name: "Gymshark Onyx 5.0", subText: "Seamless Hoodie...", price: "$90", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80" },
  { id: 17, name: "Supreme Grim Reaper Tee", subText: "Black", price: "$58", image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400&q=80" },
  { id: 18, name: "Nike ACG × CPFM", subText: "Light Orewood Brown Pink", price: "$312", image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80" },
];

const CALENDAR_EVENTS = [
  { day: "Apr 23", name: "Supreme FB Soccer Jersey Multicolor", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&q=80" },
  { day: "Apr 23", name: "Supreme Hanes Spider-Man Boxer Briefs", image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400&q=80" },
  { day: "Apr 24", name: "adidas Handball Spezial", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&q=80" },
  { day: "Apr 24", name: "Magic: The Gathering Secret Lair", image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=400&q=80" },
  { day: "Apr 24", name: "2024 Wizards of the Coast Magic", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
];

const INSTAGRAM_POSTS = [
  "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80",
  "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&q=80",
  "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80",
  "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80",
  "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400&q=80",
];

// --- Components ---

const ProductGrid = ({ title, products, showSeeAll = true }) => (
  <section>
    <SectionHeader title={title} showSeeAll={showSeeAll} />
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {products.map(product => (
        <ProductCard key={`${title}-${product.id}`} product={product} />
      ))}
    </div>
  </section>
);

const VideoBanner = () => (
  <div className="w-full aspect-video md:aspect-[21/9] bg-zinc-950 rounded overflow-hidden relative group cursor-pointer shadow-2xl border border-zinc-800">
    <img 
      src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600&q=80" 
      className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-[2000ms] grayscale" 
      alt="Travis Scott Clinic"
    />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-20 h-20 rounded-full bg-black/40 backdrop-blur-xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-all shadow-inner">
        <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[18px] border-l-emerald-500 border-b-[12px] border-b-transparent ml-2 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
      </div>
    </div>
    <div className="absolute bottom-8 left-8 text-white">
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-2">Exclusive Broadcast</p>
      <h3 className="text-3xl font-black italic uppercase tracking-tighter">THE CLINIC: ARCHIVE SERIES</h3>
    </div>
  </div>
);

const ReleaseCalendar = () => (
  <section>
    <SectionHeader title="Release Calendar" />
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
      {CALENDAR_EVENTS.map((event, i) => (
        <div key={i} className="border border-zinc-800 rounded p-0 overflow-hidden hover:border-zinc-500 transition-colors cursor-pointer bg-zinc-900 group">
          <div className="p-3 border-b border-zinc-800 bg-black flex items-baseline gap-2">
            <span className="font-black text-lg text-white group-hover:text-emerald-500 transition-colors">{event.day.split(' ')[1]}</span>
            <span className="text-[10px] font-black uppercase text-zinc-500">{event.day.split(' ')[0]}</span>
          </div>
          <div className="p-4 flex flex-col items-center">
            <div className="w-full aspect-square mb-4 relative">
              <div className="w-12 h-12 bg-emerald-500/5 rounded-full blur-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <img src={event.image} className="w-full h-full object-contain relative z-10" alt={event.name} />
            </div>
            <p className="text-[9px] font-bold text-center leading-tight uppercase tracking-wider text-zinc-400 group-hover:text-white transition-colors">{event.name}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const InstagramSection = () => (
  <section>
    <div className="flex items-center gap-2 mb-4">
      <Instagram className="w-6 h-6" />
      <h2 className="text-xl font-black">As Seen On Instagram</h2>
      <span className="text-xs font-medium text-gray-400">Use #GotItOnBTL4 and you could be featured.</span>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {INSTAGRAM_POSTS.map((post, i) => (
        <div key={i} className="aspect-square rounded-lg overflow-hidden relative group cursor-pointer">
          <img src={post} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
             <Instagram className="text-white w-8 h-8" />
          </div>
        </div>
      ))}
    </div>
  </section>
);

const MegaBanner = ({ title, sub, bg, btnText = "SHOP NOW", img }) => (
  <section className={`w-full min-h-[450px] ${bg} rounded overflow-hidden flex items-center relative group isolate`}>
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-0"></div>
    <div className="max-w-[1200px] mx-auto w-full px-12 lg:px-16 flex items-center justify-between relative z-10">
      <div className="space-y-6 max-w-lg py-12">
        <h2 className="text-6xl font-black leading-[0.8] text-white uppercase italic tracking-tighter shadow-black/20 drop-shadow-lg">{title}</h2>
        <p className="text-lg font-bold text-white/80 uppercase tracking-widest">{sub}</p>
        <button className="bg-white text-black px-8 py-3 font-black uppercase text-sm rounded shadow-xl hover:scale-105 transition-transform">{btnText}</button>
      </div>
      <div className="h-full py-12 hidden lg:flex items-center justify-center">
        <img 
          src={img} 
          className="h-[380px] object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-700" 
          alt={title}
        />
      </div>
    </div>
    <div className="absolute bottom-0 right-0 p-8 opacity-5">
      <h4 className="text-9xl font-black text-white leading-none tracking-tighter">BTL-4 PRO</h4>
    </div>
  </section>
);

const Navbar = ({ onAuthClick }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-zinc-800">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-black tracking-tighter text-white">BTL-4</h1>
            
            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-zinc-900 border border-zinc-700 rounded-full px-4 py-2 w-[400px] focus-within:border-white transition-colors">
              <Search className="w-4 h-4 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search for brand, color, etc." 
                className="bg-transparent border-none focus:ring-0 w-full text-sm ml-2 placeholder:text-zinc-500 text-white"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6 text-sm font-medium">
            <span className="hidden lg:block cursor-pointer hover:text-zinc-400">News</span>
            <span className="hidden lg:block cursor-pointer hover:text-zinc-400">About</span>
            <span className="hidden lg:block cursor-pointer hover:text-zinc-400">Help</span>
            <span className="hidden lg:block cursor-pointer hover:text-zinc-400">Sell</span>
            <div className="h-4 w-px bg-zinc-700 mx-1 hidden lg:block"></div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => onAuthClick('login')}
                className="text-white hover:text-zinc-400 transition-colors"
                id="navbar-login-btn"
              >
                Login
              </button>
              <button 
                onClick={() => onAuthClick('signup')}
                className="px-5 py-2 rounded-full bg-white text-black font-bold hover:bg-zinc-200 transition-colors"
                id="navbar-signup-btn"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
        
        {/* Categories */}
        <div className="flex items-center gap-8 h-12 overflow-x-auto no-scrollbar whitespace-nowrap text-[11px] font-bold uppercase tracking-widest text-zinc-400 border-t border-zinc-800">
          <span className="text-white cursor-pointer hover:text-white">All</span>
          <span className="cursor-pointer hover:text-white">Sneakers</span>
          <span className="cursor-pointer hover:text-white">Apparel</span>
          <span className="cursor-pointer hover:text-white">Electronics</span>
          <span className="cursor-pointer hover:text-white">Trading Cards</span>
          <span className="cursor-pointer hover:text-white">Collectibles</span>
          <span className="cursor-pointer hover:text-white">Accessories</span>
          <span className="cursor-pointer hover:text-white">Last Sale Stats</span>
          <span className="text-emerald-500 cursor-pointer">Deals</span>
        </div>
      </div>
    </nav>
  );
};

const ProductCard = ({ product }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="group bg-zinc-900 border border-zinc-800 hover:border-zinc-500 transition-colors cursor-pointer p-4 rounded relative flex flex-col"
    >
      <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <Heart className="w-5 h-5 text-zinc-500 hover:text-emerald-500 hover:fill-emerald-500" />
      </div>
      
      <div className="aspect-square w-full mb-3 overflow-hidden rounded bg-zinc-800 flex items-center justify-center p-4 relative">
        <div className="w-16 h-1 w-16 bg-zinc-700 rounded-full blur-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 drop-shadow-2xl relative z-10"
        />
      </div>
      
      <div className="space-y-1 mt-auto">
        <h3 className="font-bold text-[11px] text-zinc-400 uppercase truncate leading-tight">{product.name}</h3>
        {product.subText && <p className="text-zinc-500 text-[10px] truncate uppercase font-medium">{product.subText}</p>}
        
        <div className="pt-2">
          <p className="text-lg font-black text-white">{product.price}</p>
          <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider mt-1">
            <span className="text-zinc-500">Last Sale</span>
            {product.xpressShip ? (
              <span className="text-emerald-500">Trending</span>
            ) : (
              <span className="text-zinc-600">Verified</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SectionHeader = ({ title, showSeeAll = true }) => (
  <div className="flex justify-between items-end mb-6 border-b border-zinc-800 pb-2">
    <h2 className="text-xl font-bold uppercase tracking-tighter text-white">{title}</h2>
    {showSeeAll && (
      <a href="#" className="text-xs text-zinc-500 border-b border-zinc-500 hover:text-zinc-300 hover:border-zinc-300 transition-colors">
        View All
      </a>
    )}
  </div>
);

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const slides = [
    {
      title: "JORDAN 4 RETRO",
      tagline: "SB PINE GREEN",
      sub: "The definitive skate-ready icon. Authentication guaranteed.",
      img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1200&q=80",
      marketMetric: "+14.2% Market Index"
    },
    {
      title: "AIR MAX PLUS",
      tagline: "TRIPLE BLACK",
      sub: "A timeless silhouettes reimagined with midnight aesthetics.",
      img: "https://images.unsplash.com/photo-1552346154-21d328109a27?w=1200&q=80",
      marketMetric: "+5.1% Today"
    }
  ];

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded bg-gradient-to-r from-zinc-900 to-black flex items-center px-12 group">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 blur-3xl bg-emerald-500/10 rounded-full translate-x-1/4 -translate-y-1/4"></div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.6 }}
          className="z-10 max-w-lg w-full"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-emerald-500 text-black text-[10px] font-black px-2 py-0.5 rounded">TRENDING NOW</span>
            <span className="text-emerald-500 text-xs font-mono font-bold">{slides[current].marketMetric}</span>
          </div>
          <h2 className="text-6xl font-black mb-4 leading-[0.9] text-white">
            {slides[current].title} <br/> 
            <span className="text-zinc-500 italic font-serif text-5xl">{slides[current].tagline}</span>
          </h2>
          <p className="text-zinc-400 text-sm mb-8 max-w-sm">{slides[current].sub}</p>
          <div className="flex gap-4">
            <button className="bg-emerald-500 text-black px-8 py-3 font-black uppercase text-sm rounded shadow-lg shadow-emerald-500/20 hover:scale-105 transition-transform">Buy Now</button>
            <button className="border border-white text-white px-8 py-3 font-black uppercase text-sm rounded hover:bg-white hover:text-black transition-colors">Sell Yours</button>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute right-12 top-1/2 -translate-y-1/2 w-[500px] h-full hidden lg:flex items-center justify-center pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.img 
            key={current}
            initial={{ opacity: 0, rotate: -15, scale: 0.8 }}
            animate={{ opacity: 1, rotate: -5, scale: 1 }}
            exit={{ opacity: 0, rotate: 5, scale: 0.9 }}
            transition={{ duration: 0.8 }}
            src={slides[current].img} 
            alt={slides[current].title} 
            className="h-[320px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          />
        </AnimatePresence>
      </div>

      <div className="absolute bottom-6 left-12 flex gap-2">
        {slides.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrent(i)}
            className={`h-1 transition-all duration-300 ${current === i ? 'w-8 bg-emerald-500' : 'w-4 bg-zinc-700'}`}
          />
        ))}
      </div>
    </div>
  );
};

const BrandPill = ({ brand }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="flex flex-col items-center gap-2 group cursor-pointer"
  >
    <div className="w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden border border-gray-100 bg-white shadow-sm flex items-center justify-center p-2 group-hover:shadow-md transition-shadow">
      <img src={brand.image} alt={brand.name} className="w-full h-full object-cover rounded-sm" />
    </div>
    <span className="text-xs font-bold uppercase tracking-tight">{brand.name}</span>
  </motion.div>
);

const Footer = () => {
  const sections = [
    {
      title: "Air Jordan",
      links: ["Air Jordan 1", "Air Jordan 3", "Air Jordan 4", "Air Jordan 5", "Air Jordan 11", "Air Jordan 12"]
    },
    {
      title: "Adidas",
      links: ["Adidas Yeezy", "Yeezy Slides", "Yeezy Foam RNNR", "Yeezy Boost 350", "Yeezy 700", "Campus 00s"]
    },
    {
      title: "New Balance",
      links: ["New Balance 2002R", "New Balance 1906R", "New Balance 530", "New Balance 550", "New Balance 9060", "New Balance 990"]
    },
    {
      title: "Nike",
      links: ["Air Force 1", "Air Max", "Nike Dunk", "Nike SB", "Kobe", "Vomero 5"]
    },
    {
      title: "ASICS",
      links: ["ASICS Gel 1130", "ASICS Kayano 14", "ASICS Gel NYC", "ASICS for Men", "ASICS for Women", "ASICS Kids"]
    }
  ];

  return (
    <footer className="bg-black text-white py-20 border-t border-zinc-800">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 mb-20">
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-3xl font-black text-white mb-6 tracking-tighter">BTL-4</h3>
            <div className="space-y-6">
              <p className="text-sm font-medium text-zinc-500 leading-relaxed">The immersive global network for high-value collectibles and culture.</p>
              <div className="flex gap-6">
                  <Globe className="w-5 h-5 text-zinc-600 hover:text-white cursor-pointer transition-colors" />
                <Share2 className="w-5 h-5 text-zinc-600 hover:text-white cursor-pointer transition-colors" />
                <MessageCircle className="w-5 h-5 text-zinc-600 hover:text-white cursor-pointer transition-colors" />
                <Info className="w-5 h-5 text-zinc-600 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
          
          {sections.map((sec, i) => (
            <div key={i}>
              <h4 className="text-[11px] font-black mb-6 uppercase tracking-widest text-zinc-400">{sec.title}</h4>
              <ul className="space-y-3">
                {sec.links.map((link, j) => (
                  <li key={j} className="text-xs text-zinc-500 hover:text-white cursor-pointer transition-colors font-medium">{link}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-zinc-800 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-zinc-600 uppercase font-bold tracking-[0.2em]">
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"><Globe className="w-3 h-3" /> Market: Global</span>
            <span className="hover:text-white transition-colors cursor-pointer">Help Center</span>
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Protocol</span>
            <span className="hover:text-white transition-colors cursor-pointer">Network Terms</span>
          </div>
          <p className="font-mono">© 2026 INTERNAL BTL-4 DATA REPOSITORY</p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black font-sans text-white selection:bg-emerald-500 selection:text-black">
      <Navbar onAuthClick={openAuthModal} />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
      
      <main className="pt-40 pb-20 max-w-[1400px] mx-auto px-4 lg:px-8 space-y-32">
        
        {/* Hero Section */}
        <HeroCarousel />

        {/* Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-y border-zinc-800 py-12">
          <div className="flex flex-col gap-4 p-8 hover:bg-zinc-900 transition-colors cursor-pointer rounded border border-transparent hover:border-zinc-800 group">
            <div className="w-12 h-12 bg-zinc-900 rounded flex items-center justify-center border border-zinc-800 group-hover:border-emerald-500 group-hover:text-emerald-500 transition-colors">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <p className="font-black text-sm uppercase tracking-wider mb-1 text-white">Verification Engine</p>
              <p className="text-xs text-zinc-500 leading-relaxed font-medium uppercase">Authentication as a protocol. Every asset traded is verified by our decentralized expert network.</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-8 hover:bg-zinc-900 transition-colors cursor-pointer rounded border border-transparent hover:border-zinc-800 group">
            <div className="w-12 h-12 bg-zinc-900 rounded flex items-center justify-center border border-zinc-800 group-hover:border-emerald-500 group-hover:text-emerald-500 transition-colors">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <p className="font-black text-sm uppercase tracking-wider mb-1 text-white">Liquidity Promise</p>
              <p className="text-xs text-zinc-500 leading-relaxed font-medium uppercase">Instant settlement and market-leading spreads. We bridge the gap between collectors and market makers.</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-8 hover:bg-zinc-900 transition-colors cursor-pointer rounded border border-transparent hover:border-zinc-800 group">
            <div className="w-12 h-12 bg-zinc-900 rounded flex items-center justify-center border border-zinc-800 group-hover:border-emerald-500 group-hover:text-emerald-500 transition-colors">
              <ArrowRight className="w-6 h-6" />
            </div>
            <div>
              <p className="font-black text-sm uppercase tracking-wider mb-1 text-white">Global Scalability</p>
              <p className="text-xs text-zinc-500 leading-relaxed font-medium uppercase">List once, trade globally. Access high-value inventory through our low-latency infrastructure.</p>
            </div>
          </div>
        </div>

        {/* Recommended For You */}
        <ProductGrid title="Market Favorites" products={RECOMMENDED_PRODUCTS} />

        {/* Video Banner */}
        <VideoBanner />

        {/* Popular Brands (Now styled as immersive boxes) */}
        <section>
          <SectionHeader title="Curated Collections" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {POPULAR_BRANDS.map(brand => (
              <motion.div 
                key={brand.id}
                whileHover={{ scale: 1.02 }}
                className="aspect-square bg-zinc-900 border border-zinc-800 rounded overflow-hidden relative group cursor-pointer"
              >
                <img src={brand.image} alt={brand.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white group-hover:text-emerald-500 transition-colors">{brand.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Trending Sneakers */}
        <ProductGrid title="High Performance Footwear" products={TRENDING_SNEAKERS} />

        {/* Featured Apparel */}
        <ProductGrid title="Apparel Archive" products={APPAREL} />

        {/* Double Banner Promo */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-[350px] bg-zinc-900 border border-zinc-800 rounded relative overflow-hidden flex items-center p-12 group transition-colors hover:border-zinc-500">
            <div className="z-10 space-y-6">
              <div className="flex items-center gap-2">
                 <span className="h-px w-8 bg-emerald-500"></span>
                 <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Member Exclusive</span>
              </div>
              <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">UPGRADE <br/> YOUR WRIST</h3>
              <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Market Efficiency: 60% SAVINGS</p>
              <button className="bg-white text-black px-6 py-3 text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform">Access Vault</button>
            </div>
            <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80" className="absolute right-[-20%] top-1/2 -translate-y-1/2 h-[90%] rotate-[15deg] drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] opacity-40 group-hover:opacity-100 group-hover:rotate-0 transition-all duration-700" alt="Watch" />
          </div>
          <div className="h-[350px] bg-emerald-500 rounded relative overflow-hidden flex items-center p-12 group">
            <div className="z-10 space-y-6 text-black">
              <div className="flex items-center gap-2">
                 <span className="h-px w-8 bg-black"></span>
                 <span className="text-[10px] font-black uppercase tracking-widest">Global Drops</span>
              </div>
              <h3 className="text-4xl font-black italic tracking-tighter uppercase leading-none">GRAPHIC TEES <br/> UNDER $100</h3>
              <p className="text-sm font-bold uppercase tracking-widest opacity-60">Verified Inventory Only</p>
              <button className="bg-black text-white px-6 py-3 text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform">Explore Store</button>
            </div>
            <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80" className="absolute right-[-10%] top-1/2 -translate-y-1/2 h-full opacity-30 group-hover:opacity-100 group-hover:translate-x-[-20px] transition-all duration-1000 grayscale select-none" alt="T-Shirt" />
          </div>
        </section>

        {/* New to BTL-4 */}
        <ProductGrid title="Network Arrivals" products={RECOMMENDED_PRODUCTS.slice(0, 6)} />

        {/* Release Calendar */}
        <ReleaseCalendar />

        {/* Instagram Section */}
        <InstagramSection />

        {/* Green Mega Banner */}
        <MegaBanner 
          title="THE WOMEN'S EDIT"
          sub="Spring Marketplace Essentials"
          bg="bg-zinc-900 border border-zinc-800"
          btnText="View Collection"
          img="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200&q=80"
        />

        {/* Picks For Her */}
        <ProductGrid title="Curated for Her" products={APPAREL.reverse()} />

        {/* Trending Trading Cards */}
        <ProductGrid title="Collectible Assets" products={TRENDING_SNEAKERS} />

        {/* Vans Large Banner */}
        <MegaBanner 
          title="PEARLIZED PACK"
          sub="New Colorways Authenticated"
          bg="bg-zinc-950 border border-zinc-800 shadow-[inset_0_0_100px_rgba(0,0,0,1)]"
          img="https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=1200&q=80"
        />

        {/* Seasonal Favorites (Now as technical pills) */}
        <section>
          <SectionHeader title="Category Index" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {["Hoodies", "Pokemon Cards", "T-Shirts", "YZY Slides", "Nike Mind 001"].map((fav, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded p-6 flex flex-col items-center justify-center gap-6 group cursor-pointer hover:border-emerald-500 transition-colors">
                <div className="w-20 h-20 rounded bg-black border border-zinc-800 flex items-center justify-center overflow-hidden p-2 group-hover:rotate-6 transition-transform">
                   <img src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=100&q=80`} className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0 transition-all" alt={fav} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 group-hover:text-white transition-colors">{fav}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Collectibles Staff Picks */}
        <ProductGrid title="Staff Acquisitions" products={RECOMMENDED_PRODUCTS.slice(3, 9)} />

        {/* From The Magazine */}
        <section>
          <SectionHeader title="Intel Repository" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[16/9] bg-zinc-900 border border-zinc-800 rounded overflow-hidden mb-6 group-hover:border-zinc-500 transition-colors">
                  <img src={`https://images.unsplash.com/photo-${1510000000000 + i*100000}?w=600&q=80`} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 grayscale" alt="News" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                     <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                     <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Sector Intel</p>
                  </div>
                  <h4 className="font-bold text-xl leading-tight text-white uppercase tracking-tighter">The Future of Value: Distributed Marketplace Protocols in 2026</h4>
                  <p className="text-xs text-zinc-500 line-clamp-2 uppercase font-medium leading-relaxed">Analyzing the shift from traditional ecommerce to decentralized verification networks and the impact on secondary market liquidity...</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />

      {/* Bottom Bar Info Ticker */}
      <div className="fixed bottom-0 left-0 right-0 h-10 bg-emerald-500 text-black z-50 overflow-hidden flex items-center shadow-[0_-10px_30px_rgba(16,185,129,0.3)]">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap items-center gap-12 px-8 font-black text-[10px] uppercase tracking-wider"
        >
          <div className="flex items-center gap-2">
            <span className="opacity-50">NETWORK LIVE:</span>
            <span>AIR JORDAN 4 'MILITARY BLUE' JUST TRADED FOR $342</span>
            <span className="mx-4 text-black/20">|</span>
            <span>VERIFICATION PROTOCOL v4.2 DEPLOYED IN HONG KONG HUB</span>
            <span className="mx-4 text-black/20">|</span>
            <span>SUPREME BOX LOGO SS26 ESTIMATED MARKET FAIR VALUE: $450</span>
            <span className="mx-4 text-black/20">|</span>
            <span>BTC MARKET CAP CORRELATION TO SNEAKER RESALE INDEX: 0.84</span>
          </div>
          {/* Repeat for seamless loop */}
          <div className="flex items-center gap-2">
            <span className="opacity-50">NETWORK LIVE:</span>
            <span>AIR JORDAN 4 'MILITARY BLUE' JUST TRADED FOR $342</span>
            <span className="mx-4 text-black/20">|</span>
            <span>VERIFICATION PROTOCOL v4.2 DEPLOYED IN HONG KONG HUB</span>
            <span className="mx-4 text-black/20">|</span>
            <span>SUPREME BOX LOGO SS26 ESTIMATED MARKET FAIR VALUE: $450</span>
            <span className="mx-4 text-black/20">|</span>
            <span>BTC MARKET CAP CORRELATION TO SNEAKER RESALE INDEX: 0.84</span>
          </div>
        </motion.div>
      </div>

      {/* Floating Action Button (Technical style) */}
      <div className="fixed bottom-16 right-8 flex flex-col gap-4 z-40">
        <button className="w-14 h-14 bg-zinc-900 border border-zinc-800 text-white rounded-full flex items-center justify-center shadow-2xl hover:border-emerald-500 transition-all hover:scale-110 active:scale-95 group relative">
          <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <Bell className="w-6 h-6 group-hover:text-emerald-500 transition-colors" />
        </button>
      </div>

      {/* Auth Modal Overlay */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialMode={authMode} 
      />
    </div>
  );
}
