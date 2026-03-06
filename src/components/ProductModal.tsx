import React from 'react';
import { X, ShoppingCart, Info } from 'lucide-react';
import { Product } from '../types';
import { STORE_CONFIG } from '../config';
import { motion, AnimatePresence } from 'motion/react';

import { useLanguage } from '../context/LanguageContext';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { lang, t, isRtl } = useLanguage();
  if (!product) return null;

  const displayPrice = product.price;
  
  const handleContact = () => {
    const message = `${t('whatsappInquiry')} ${product.name}`;
    const whatsappUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
        >
          <button 
            onClick={onClose}
            className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} z-10 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white transition-colors`}
          >
            <X size={20} />
          </button>

          <div className="md:w-1/2 bg-stone-100">
            <img 
              src={product.image}
              alt={product.name}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/placeholder-product.png';
              }}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content Section */}
          <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
            <span className="text-xs font-bold text-accent tracking-widest uppercase mb-2 block">
              {product.category}
            </span>
            <h2 className="text-3xl font-extrabold text-primary mb-4">
              {product.name}
            </h2>
            
            {STORE_CONFIG.showPrices && displayPrice && (
              <div className="flex items-center gap-4 mb-8">
                <span className="text-2xl font-black text-primary">
                  {displayPrice} {t('currency')}
                </span>
                <span className="px-2 py-1 bg-accent/10 text-accent text-[10px] font-bold rounded uppercase">
                  {STORE_CONFIG.indicativePriceText[lang]}
                </span>
              </div>
            )}

            <div className="space-y-6 mb-10">
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary block">{t('description')}</label>
                <p className="text-stone-500 leading-relaxed">
                  {t('productModalDesc')}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={handleContact}
                className="flex-grow py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-accent transition-all transform active:scale-[0.98]"
              >
                {t('contactInquiry')}
              </button>
            </div>

            <div className="mt-8 pt-8 border-t border-stone-100 flex items-start gap-3 text-stone-400">
              <Info size={18} className="mt-0.5 flex-shrink-0" />
              <p className="text-xs leading-relaxed">
                {t('footerAbout')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
