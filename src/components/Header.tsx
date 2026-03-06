import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, ChevronDown, Phone } from 'lucide-react';
import { STORE_CONFIG } from '../config';
import { motion, AnimatePresence } from 'motion/react';
import { useProductContext } from '../context/ProductContext';
import { getCategoryTheme, normalizeCategory, getCategoryImage, CATEGORY_PLACEHOLDER } from '../constants';
import { useLanguage } from '../context/LanguageContext';

export const Header: React.FC = () => {
  const { categories } = useProductContext();
  const { lang, setLang, t, isRtl } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isCatDropdownOpen, setIsCatDropdownOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const headerRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.getBoundingClientRect().height;
        document.documentElement.style.setProperty('--header-h', `${height}px`);
      }
    };

    updateHeaderHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateHeaderHeight();
    });

    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    window.addEventListener('resize', updateHeaderHeight);
    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      resizeObserver.disconnect();
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/categories?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-stone-100 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20 gap-4">
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-espresso"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-reverse space-x-2 flex-shrink-0">
            <span className="text-2xl font-black tracking-tighter text-espresso uppercase">
              {STORE_CONFIG.name[lang]}
            </span>
            <div className="w-2 h-2 rounded-full bg-accent"></div>
          </Link>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center ${isRtl ? 'space-x-reverse space-x-8' : 'space-x-8'}`}>
            <Link to="/" className={`text-sm font-bold transition-colors hover:text-accent ${location.pathname === '/' ? 'text-accent' : 'text-espresso'}`}>{t('home')}</Link>
            
            <div className="relative group">
              <button 
                onMouseEnter={() => setIsCatDropdownOpen(true)}
                className="flex items-center gap-1 text-sm font-bold text-espresso hover:text-accent transition-colors"
              >
                {t('products')}
                <ChevronDown size={14} />
              </button>
              
              <AnimatePresence>
                {isCatDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onMouseLeave={() => setIsCatDropdownOpen(false)}
                    className={`absolute top-full ${isRtl ? 'right-0' : 'left-0'} mt-2 w-56 bg-white border border-stone-100 shadow-xl rounded-xl overflow-hidden py-2`}
                  >
                    <Link
                      to="/categories"
                      onClick={() => setIsCatDropdownOpen(false)}
                      className="block px-4 py-2.5 text-sm font-bold text-accent hover:bg-cream transition-colors"
                    >
                      {t('viewFullCatalog')}
                    </Link>
                    <div className="h-px bg-stone-100 mx-2 my-1" />
                    {categories.slice(1).map(cat => {
                      const theme = getCategoryTheme(cat);
                      const imageUrl = getCategoryImage(cat);
                      return (
                        <Link
                          key={cat}
                          to={`/categories?cat=${cat}`}
                          onClick={() => setIsCatDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-espresso hover:bg-cream hover:text-accent transition-colors"
                        >
                          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden border border-stone-100 flex items-center justify-center bg-white p-1`}>
                            <img 
                              src={imageUrl} 
                              alt={cat} 
                              className="w-full h-full object-contain block mx-auto"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                if (!e.currentTarget.dataset.fallbackApplied) {
                                  e.currentTarget.dataset.fallbackApplied = "true";
                                  e.currentTarget.src = CATEGORY_PLACEHOLDER;
                                }
                              }}
                            />
                          </div>
                          {normalizeCategory(cat)}
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <Link to="/about" className={`text-sm font-bold transition-colors hover:text-accent ${location.pathname === '/about' ? 'text-accent' : 'text-espresso'}`}>{t('about')}</Link>
            <Link to="/contact" className={`text-sm font-bold transition-colors hover:text-accent ${location.pathname === '/contact' ? 'text-accent' : 'text-espresso'}`}>{t('contact')}</Link>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className={`hidden lg:flex flex-grow max-w-md relative mx-4`}>
            <input 
              type="text"
              placeholder={t('search') + '...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full bg-stone-100 border-none rounded-full py-2.5 ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'} text-sm focus:ring-2 focus:ring-accent outline-none`}
            />
            <button type="submit" className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-stone-400 hover:text-accent`}>
              <Search size={18} />
            </button>
          </form>

          {/* Actions */}
          <div className={`flex items-center ${isRtl ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
            {/* Language Switcher */}
            <button 
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="px-3 py-1.5 rounded-lg text-xs font-black bg-stone-100 text-espresso hover:bg-accent hover:text-white transition-all uppercase"
            >
              {lang === 'ar' ? 'English' : 'العربية'}
            </button>

            <button className="lg:hidden p-2 text-espresso hover:text-accent transition-colors">
              <Search size={22} />
            </button>
            <Link 
              to="/contact"
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-espresso text-white rounded-full text-sm font-bold hover:bg-accent transition-all"
            >
              <Phone size={16} />
              {t('requestQuote')}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-stone-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-4 text-base font-bold text-espresso">{t('home')}</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block px-3 py-4 text-base font-bold text-espresso">{t('about')}</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block px-3 py-4 text-base font-bold text-espresso">{t('contact')}</Link>
              <div className="px-3 py-2 text-xs font-bold text-stone-400 uppercase tracking-widest">{t('products')}</div>
              {categories.map((cat) => {
                const theme = getCategoryTheme(cat);
                const imageUrl = getCategoryImage(cat);
                return (
                  <Link
                    key={cat}
                    to={`/categories?cat=${cat}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-espresso hover:text-accent"
                  >
                    <div className={`w-12 h-12 rounded-xl overflow-hidden border border-stone-100 flex items-center justify-center bg-white p-1.5`}>
                      <img 
                        src={imageUrl} 
                        alt={cat} 
                        className="w-full h-full object-contain block mx-auto"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          if (!e.currentTarget.dataset.fallbackApplied) {
                            e.currentTarget.dataset.fallbackApplied = "true";
                            e.currentTarget.src = CATEGORY_PLACEHOLDER;
                          }
                        }}
                      />
                    </div>
                    {normalizeCategory(cat)}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
