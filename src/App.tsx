import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Star, Menu, X, ChevronRight, MessageSquareQuote, Cookie, ShoppingCart } from 'lucide-react';

const COOKIES = [
  {
    id: 1,
    name: 'Milk Chocolate Chip',
    description: 'The classic you can never go wrong with. Thick, soft, and packed with milk chocolate chips.',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 2,
    name: 'Classic Pink Sugar',
    description: 'A vanilla sugar cookie topped with a perfect pink swoop of real almond frosting.',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 3,
    name: 'Snickerdoodle',
    description: 'A classic vanilla sugar cookie coated in a sparkly cinnamon sugar crust.',
    image: 'https://images.unsplash.com/photo-1618923850107-d1a234d7a73a?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 4,
    name: 'Peanut Butter',
    description: 'An iconic, thick, and soft peanut butter cookie with a classic crisscross pattern.',
    image: 'https://images.unsplash.com/photo-1601000938259-9e92002320b2?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 5,
    name: 'Double Fudge Brownie',
    description: 'A thick, rich, and gooey chocolate brownie cookie topped with a glossy chocolate glaze.',
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 6,
    name: 'Chilled Sugar',
    description: 'A chilled, soft sugar cookie topped with a sweet vanilla buttercream frosting.',
    image: 'https://images.unsplash.com/photo-1557089706-68d02dbda277?auto=format&fit=crop&q=80&w=800',
  }
];

const REVIEWS = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    rating: 5,
    text: 'Absolutely the best cookies I have ever had! The Milk Chocolate Chip is to die for. So thick and gooey.',
    date: '2 days ago'
  },
  {
    id: 2,
    name: 'Michael Chen',
    rating: 5,
    text: 'The rotating menu keeps me coming back every week. The Pink Sugar cookie is a classic that never disappoints.',
    date: '1 week ago'
  },
  {
    id: 3,
    name: 'Emily Davis',
    rating: 5,
    text: 'Huge cookies, definitely meant for sharing! I love the creative flavors they come up with.',
    date: '2 weeks ago'
  },
  {
    id: 4,
    name: 'Jessica Taylor',
    rating: 5,
    text: 'I ordered a box for my office and they were gone in minutes. The Double Fudge Brownie is incredibly rich!',
    date: '3 weeks ago'
  },
  {
    id: 5,
    name: 'David Wilson',
    rating: 4,
    text: 'Great cookies, very sweet. The Snickerdoodle has the perfect amount of cinnamon. Will order again.',
    date: '1 month ago'
  },
  {
    id: 6,
    name: 'Amanda Martinez',
    rating: 5,
    text: 'The chilled sugar cookie is a revelation. I never knew a cold cookie could taste so fresh and soft.',
    date: '1 month ago'
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { scrollYProgress } = useScroll();
  
  // Animate the hero cookie image as we scroll down
  const cookieScale = useTransform(scrollYProgress, [0, 0.2, 1], [1, 1.1, 1]);
  const cookieY = useTransform(scrollYProgress, [0, 1], [0, 400]);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF8F5] text-stone-900 font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FDF8F5]/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center cursor-pointer" onClick={() => scrollToSection('home')}>
              {/* Fallback to icon if logo fails to load */}
              <div className="relative w-10 h-10 mr-3 overflow-hidden rounded-full bg-stone-200 flex items-center justify-center">
                <img 
                  src="https://drive.google.com/uc?export=view&id=1t-VZD3NC74CWszncNQSE4TfwKnfCWa2t" 
                  alt="Bisco Logo" 
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <Cookie className="w-6 h-6 text-stone-500" />
              </div>
              <span className="font-serif text-3xl font-bold tracking-tight text-stone-900">bisco</span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-stone-600 hover:text-stone-900 font-medium transition-colors">Home</button>
              <button onClick={() => scrollToSection('menu')} className="text-stone-600 hover:text-stone-900 font-medium transition-colors">Menu</button>
              <button onClick={() => scrollToSection('reviews')} className="text-stone-600 hover:text-stone-900 font-medium transition-colors">Reviews</button>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <button className="relative p-2 text-stone-900 hover:bg-stone-100 rounded-full transition-colors">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full transform translate-x-1 -translate-y-1 border-2 border-[#FDF8F5]">
                    {cartCount}
                  </span>
                )}
              </button>
              <div className="md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-stone-900 p-2">
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#FDF8F5] border-b border-stone-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button onClick={() => scrollToSection('home')} className="block w-full text-left px-3 py-2 text-stone-900 font-medium">Home</button>
              <button onClick={() => scrollToSection('menu')} className="block w-full text-left px-3 py-2 text-stone-900 font-medium">Menu</button>
              <button onClick={() => scrollToSection('reviews')} className="block w-full text-left px-3 py-2 text-stone-900 font-medium">Reviews</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background Cookie */}
        <motion.div 
          style={{ 
            scale: cookieScale,
            y: cookieY
          }}
          className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-70"
        >
          <div className="w-[150vmax] h-[150vmax] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=100&w=2560" 
              alt="Delicious Bisco Cookie Background" 
              className="w-full h-full object-cover saturate-200 contrast-125"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>

        {/* Subtle radial gradient behind text to maintain readability */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(253,248,245,0.85)_0%,rgba(253,248,245,0)_60%)] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-6xl md:text-8xl font-serif font-bold tracking-tight text-stone-900 mb-6 drop-shadow-md"
          >
            Taste the <br />
            <span className="text-amber-600 italic">Perfection</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-stone-800 font-medium mb-10 max-w-2xl mx-auto drop-shadow-sm"
          >
            Gourmet cookies baked fresh daily. Thick, soft, and packed with flavor. Experience the best cookies in town.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button onClick={() => scrollToSection('menu')} className="px-10 py-5 bg-stone-900 text-white rounded-full text-lg font-medium hover:bg-stone-800 transition-colors flex items-center justify-center group shadow-xl">
              View Menu
              <ChevronRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">Our Cookies</h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Baked fresh daily with premium ingredients. Our menu rotates, but these classics are always here to satisfy your cravings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {COOKIES.map((cookie, index) => (
              <motion.div 
                key={cookie.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col items-center text-center"
              >
                <div className="relative w-64 h-64 md:w-72 md:h-72 mb-8 rounded-full overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 border-4 border-white">
                  <img 
                    src={cookie.image} 
                    alt={cookie.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {/* Inner shadow to make it look more like a 3D cookie cutout */}
                  <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] pointer-events-none"></div>
                </div>
                <h3 className="text-2xl font-serif font-bold text-stone-900 mb-3">{cookie.name}</h3>
                <p className="text-stone-600 leading-relaxed max-w-sm mb-6">{cookie.description}</p>
                <button 
                  onClick={() => setCartCount(prev => prev + 1)}
                  className="mt-auto px-6 py-3 bg-stone-900 text-white rounded-full font-medium hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 group w-full max-w-[200px]"
                >
                  <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Add to Cart
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24 bg-stone-900 text-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <MessageSquareQuote className="w-12 h-12 mx-auto text-amber-500 mb-6" />
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Client Love</h2>
            <p className="text-lg text-stone-400 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our cookie lovers have to say.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((review, index) => (
              <motion.div 
                key={review.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-stone-800 p-8 rounded-3xl border border-stone-700"
              >
                <div className="flex text-amber-500 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-lg text-stone-300 mb-6 italic">"{review.text}"</p>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white">{review.name}</span>
                  <span className="text-sm text-stone-500">{review.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 text-stone-400 py-12 text-center relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-6">
            <Cookie className="w-8 h-8 text-amber-600 mr-3" />
            <span className="font-serif text-3xl font-bold tracking-tight text-white">bisco</span>
          </div>
          <p className="mb-6">Baking the world a better place, one cookie at a time.</p>
          <p className="text-sm text-stone-600">Â© {new Date().getFullYear()} Bisco Cookies. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
