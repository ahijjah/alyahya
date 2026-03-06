import React from 'react';
import { useProductContext } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';
import { ProductModal } from '../components/ProductModal';
import { Product } from '../types';
import { STORE_CONFIG, DATA_SOURCE } from '../config';
import { motion } from 'motion/react';
import { ArrowLeft, Coffee, Zap, Award, ShieldCheck, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { normalizeCategory, getCategoryTheme, getCategoryImage, CATEGORY_PLACEHOLDER } from '../constants';

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  const { products, categories, loading, error, retry } = useProductContext();
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);

  const featuredProducts = products.slice(0, 8);

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
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[calc(70vh-var(--header-h,64px))] flex items-center overflow-hidden coffee-gradient pt-6">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1920"
            alt="Food Supplies Hero"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="pt-4"
            >
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                شريككم الموثوق <br /> <span className="text-accent">في عالم الأغذية</span>
              </h1>
              <p className="text-lg text-stone-300 mb-10 leading-relaxed max-w-lg">
                نحن في {STORE_CONFIG.name} متخصصون في توريد أجود المواد الغذائية والمستلزمات الاحترافية لقطاع المطاعم والمقاهي والفنادق.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/categories"
                  className="px-10 py-4 bg-accent text-espresso rounded-full font-black hover:bg-white transition-all transform hover:-translate-y-1"
                >
                  تصفح الكتالوج
                </Link>
                <Link 
                  to="/contact"
                  className="px-10 py-4 border-2 border-white/20 text-white rounded-full font-black hover:bg-white/10 transition-all"
                >
                  تواصل معنا
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="hidden md:block"
            >
              <img 
                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800"
                alt="Professional Supplies"
                className="rounded-[3rem] shadow-2xl border-8 border-white/5"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black mb-4">لماذا تختار {STORE_CONFIG.name}؟</h2>
          <div className="w-20 h-1.5 bg-accent mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-stone-100 flex flex-col items-center text-center space-y-4 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-cream rounded-2xl flex items-center justify-center text-accent">
              <Award size={32} />
            </div>
            <h4 className="font-bold text-xl">جودة مضمونة</h4>
            <p className="text-sm text-stone-500 leading-relaxed">نختار منتجاتنا بعناية فائقة من أفضل المصادر العالمية لضمان رضا عملائنا.</p>
          </div>
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-stone-100 flex flex-col items-center text-center space-y-4 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-cream rounded-2xl flex items-center justify-center text-accent">
              <Zap size={32} />
            </div>
            <h4 className="font-bold text-xl">توريد مستمر</h4>
            <p className="text-sm text-stone-500 leading-relaxed">نلتزم بجداول توريد دقيقة لضمان عدم انقطاع أعمال شركائنا.</p>
          </div>
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-stone-100 flex flex-col items-center text-center space-y-4 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-cream rounded-2xl flex items-center justify-center text-accent">
              <ShieldCheck size={32} />
            </div>
            <h4 className="font-bold text-xl">أسعار تنافسية</h4>
            <p className="text-sm text-stone-500 leading-relaxed">نقدم أفضل الأسعار لقطاع الجملة والتوريد لتعزيز ربحية شركائنا.</p>
          </div>
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-stone-100 flex flex-col items-center text-center space-y-4 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-cream rounded-2xl flex items-center justify-center text-accent">
              <MapPin size={32} />
            </div>
            <h4 className="font-bold text-xl">تغطية شاملة</h4>
            <p className="text-sm text-stone-500 leading-relaxed">نخدم قطاعاً واسعاً يشمل المقاهي، المطاعم، الفنادق، ومحلات التجزئة.</p>
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black mb-4">تصفح حسب الفئة</h2>
          <p className="text-stone-500">اكتشف مجموعتنا الواسعة من المنتجات المتخصصة</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.slice(1).map((cat) => {
            const theme = getCategoryTheme(cat);
            const imageUrl = getCategoryImage(cat);
            console.log("Category:", cat, "Image:", imageUrl);
            
            return (
              <Link 
                key={cat}
                to={`/categories?cat=${cat}`}
                className="group flex flex-col items-center justify-start p-4 md:p-6 min-h-[145px] md:min-h-[170px] bg-white rounded-2xl border border-stone-100 hover:border-accent hover:shadow-xl transition-all text-center"
              >
                <img 
                  src={imageUrl} 
                  alt={cat} 
                  className="w-[72px] h-[72px] md:w-[96px] md:h-[96px] object-contain block mx-auto mb-3 md:mb-4 transition-transform group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    if (!e.currentTarget.dataset.fallbackApplied) {
                      e.currentTarget.dataset.fallbackApplied = "true";
                      e.currentTarget.src = CATEGORY_PLACEHOLDER;
                    }
                  }}
                />
                <h3 className="text-sm font-bold text-espresso group-hover:text-accent transition-colors">{normalizeCategory(cat)}</h3>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-black mb-2">منتجات مختارة</h2>
            <div className="w-12 h-1 bg-accent rounded-full"></div>
          </div>
          <Link to="/categories" className="text-accent font-bold hover:underline flex items-center gap-1">
            عرض الكتالوج الكامل <ArrowLeft size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onView={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>
      </section>

      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)}
      />


    </div>
  );
};
