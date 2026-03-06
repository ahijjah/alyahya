import React from 'react';
import { useProductContext } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';
import { ProductModal } from '../components/ProductModal';
import { Product } from '../types';
import { STORE_CONFIG } from '../config';
import { Search, SlidersHorizontal, ChevronDown, Grid, List, Check } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';
import { normalizeCategory, getCategoryTheme, getCategoryImage, CATEGORY_PLACEHOLDER } from '../constants';
import { motion, AnimatePresence } from 'motion/react';

interface CategoriesProps {}

export const Categories: React.FC<CategoriesProps> = () => {
  const { products, categories, loading, error, retry } = useProductContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [sortBy, setSortBy] = React.useState('name-asc');
  const [isCatDropdownOpen, setIsCatDropdownOpen] = React.useState(false);
  const [catSearchQuery, setCatSearchQuery] = React.useState('');

  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCatDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentCategory = searchParams.get('cat') || 'الكل';
  const searchQuery = searchParams.get('search') || '';

  const filteredProducts = products.filter(p => {
    const matchesCat = currentCategory === 'الكل' || p.category === currentCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name, 'ar');
    if (sortBy === 'name-desc') return b.name.localeCompare(a.name, 'ar');
    return 0;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 max-w-md">
          <h2 className="text-xl font-bold mb-2">فشل تحميل المنتجات</h2>
          <p className="text-sm mb-4">{error}</p>
          <button 
            onClick={retry}
            className="px-6 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs & Title */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs text-stone-400 mb-4">
          <Link to="/" className="hover:text-accent transition-colors">الرئيسية</Link>
          <span>/</span>
          <span className="text-espresso font-bold">{currentCategory}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-center gap-6">
            {currentCategory !== 'الكل' && (
              <div className="hidden sm:block w-24 h-24 rounded-2xl overflow-hidden border border-stone-100 shadow-sm bg-white p-2">
                <img 
                  src={getCategoryImage(currentCategory)} 
                  alt={currentCategory} 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    if (!e.currentTarget.dataset.fallbackApplied) {
                      e.currentTarget.dataset.fallbackApplied = "true";
                      e.currentTarget.src = CATEGORY_PLACEHOLDER;
                    }
                  }}
                />
              </div>
            )}
            <div>
              <h1 className="text-4xl font-black mb-2">{currentCategory}</h1>
              <p className="text-stone-500">تصفح مجموعتنا المختارة من {currentCategory}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-stone-100 p-1.5 rounded-xl">
             <span className="px-4 py-2 text-xs font-bold text-stone-500">
               {filteredProducts.length} منتج
             </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar Filters - Desktop */}
        <aside className="hidden lg:block lg:w-72 flex-shrink-0">
          <div className="sticky top-32 space-y-10">
            <div ref={dropdownRef}>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                الفئات
              </h3>
              
              <div className="relative">
                <button
                  onClick={() => setIsCatDropdownOpen(!isCatDropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-white border border-stone-200 rounded-xl text-sm font-bold text-espresso hover:border-accent transition-all shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    {(() => {
                      const theme = getCategoryTheme(currentCategory);
                      const imageUrl = getCategoryImage(currentCategory);
                      return (
                        <div className={`w-10 h-10 rounded-lg overflow-hidden border border-stone-100 flex items-center justify-center bg-white p-1`}>
                          <img 
                            src={imageUrl} 
                            alt={currentCategory} 
                            className="w-full h-full object-contain"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              if (!e.currentTarget.dataset.fallbackApplied) {
                                e.currentTarget.dataset.fallbackApplied = "true";
                                e.currentTarget.src = CATEGORY_PLACEHOLDER;
                              }
                            }}
                          />
                        </div>
                      );
                    })()}
                    <span>{normalizeCategory(currentCategory)}</span>
                  </div>
                  <ChevronDown size={16} className={`transition-transform ${isCatDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isCatDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute z-50 top-full left-0 right-0 mt-2 bg-white border border-stone-100 shadow-2xl rounded-2xl overflow-hidden"
                    >
                      <div className="p-3 border-b border-stone-50">
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="ابحث عن فئة..."
                            value={catSearchQuery}
                            onChange={(e) => setCatSearchQuery(e.target.value)}
                            className="w-full bg-stone-50 border-none rounded-lg py-2 pr-9 pl-3 text-xs focus:ring-1 focus:ring-accent outline-none"
                            autoFocus
                          />
                          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400" size={14} />
                        </div>
                      </div>
                      
                      <div className="max-h-80 overflow-y-auto py-2 custom-scrollbar">
                        {categories
                          .filter(cat => normalizeCategory(cat).toLowerCase().includes(catSearchQuery.toLowerCase()))
                          .map(cat => {
                            const theme = getCategoryTheme(cat);
                            const isSelected = currentCategory === cat;
                            const imageUrl = getCategoryImage(cat);
                            
                            return (
                              <button
                                key={cat}
                                onClick={() => {
                                  setSearchParams({ cat });
                                  setIsCatDropdownOpen(false);
                                  setCatSearchQuery('');
                                }}
                                className={`w-full text-right px-4 py-2.5 text-sm flex items-center justify-between transition-colors ${
                                  isSelected ? 'bg-accent/5 text-accent' : 'text-stone-600 hover:bg-stone-50'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`w-[72px] h-[72px] md:w-[96px] md:h-[96px] rounded-lg overflow-hidden border border-stone-100 flex items-center justify-center bg-white p-1`}>
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
                                  <span className={isSelected ? 'font-bold' : 'font-medium'}>
                                    {normalizeCategory(cat)}
                                  </span>
                                </div>
                                {isSelected && <Check size={14} className="text-accent" />}
                              </button>
                            );
                          })}
                        {categories.filter(cat => normalizeCategory(cat).toLowerCase().includes(catSearchQuery.toLowerCase())).length === 0 && (
                          <div className="px-4 py-8 text-center text-xs text-stone-400">
                            لا توجد فئات تطابق بحثك
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="p-6 bg-cream rounded-2xl border border-accent/10">
              <h4 className="font-bold text-espresso mb-3">هل تحتاج مساعدة؟</h4>
              <p className="text-xs text-stone-500 leading-relaxed mb-4">
                فريقنا جاهز للرد على استفساراتكم وتوفير عروض أسعار مخصصة لاحتياجاتكم.
              </p>
              <Link to="/contact" className="block text-center py-3 bg-accent text-espresso rounded-xl text-xs font-bold hover:bg-espresso hover:text-white transition-all">
                تواصل معنا الآن
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Catalog */}
        <div className="flex-grow">
          {/* Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-stone-100">
            <div className="flex-grow max-w-md relative">
              <input 
                type="text"
                placeholder="ابحث في هذه الفئة..."
                value={searchQuery}
                onChange={(e) => setSearchParams({ cat: currentCategory, search: e.target.value })}
                className="w-full bg-stone-50 border-none rounded-xl py-2.5 pr-10 pl-4 text-sm focus:ring-2 focus:ring-accent outline-none"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
            </div>
            
            <div className="flex items-center gap-4">
               <div className="relative">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-stone-50 border-none rounded-xl py-2.5 pr-10 pl-4 text-xs font-bold focus:ring-2 focus:ring-accent outline-none cursor-pointer"
                >
                  <option value="name-asc">الاسم: أ-ي</option>
                  <option value="name-desc">الاسم: ي-أ</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" size={14} />
              </div>
            </div>
          </div>

          {/* Mobile Filters Trigger */}
          <div className="lg:hidden mb-6 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map(cat => {
              const theme = getCategoryTheme(cat);
              const imageUrl = getCategoryImage(cat);
              return (
                <button
                  key={cat}
                  onClick={() => setSearchParams({ cat })}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                    currentCategory === cat 
                      ? 'bg-accent text-white shadow-md shadow-accent/20' 
                      : `bg-white border border-stone-100 text-stone-600`
                  }`}
                >
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border border-white/20 flex items-center justify-center bg-white p-0.5`}>
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
                </button>
              );
            })}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-stone-200">
              <p className="text-stone-400 font-medium">لم يتم العثور على منتجات تطابق بحثك.</p>
              <button 
                onClick={() => setSearchParams({ cat: 'الكل' })}
                className="mt-4 text-accent font-bold text-sm hover:underline"
              >
                عرض جميع المنتجات
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onView={(p) => setSelectedProduct(p)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
