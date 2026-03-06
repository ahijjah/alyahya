import React from 'react';
import { Product } from '../types';
import { STORE_CONFIG } from '../config';
import { ShoppingCart, Plus, Eye } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onView }) => {
  const displayPrice = product.price;

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="group bg-white rounded-xl overflow-hidden border border-stone-100 flex flex-col h-full transition-all hover:shadow-xl"
    >
      <div 
        className="relative aspect-square bg-stone-50 overflow-hidden cursor-pointer p-6"
        onClick={() => onView(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/placeholder-product.png';
          }}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
        
        <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
           <button 
             onClick={(e) => {
               e.stopPropagation();
               onView(product);
             }}
             className="bg-white text-espresso p-3 rounded-full shadow-lg hover:bg-accent hover:text-white transition-all"
           >
             <Eye size={20} />
           </button>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow text-center">
        <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-1">
          {product.category}
        </span>
        <h3 
          className="text-sm font-bold text-espresso mb-2 line-clamp-2 cursor-pointer hover:text-accent transition-colors"
          onClick={() => onView(product)}
        >
          {product.name}
        </h3>
        <div className="mt-auto pt-4 border-t border-stone-50">
          {STORE_CONFIG.showPrices && displayPrice && (
            <div className="text-sm font-bold text-stone-500 mb-3">
              {displayPrice} {STORE_CONFIG.currency}
              <span className="text-[10px] block font-normal text-stone-400 mt-0.5">{STORE_CONFIG.indicativePriceText}</span>
            </div>
          )}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onView(product);
            }}
            className="w-full py-2.5 bg-espresso text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-accent transition-colors"
          >
            عرض التفاصيل
          </button>
        </div>
      </div>
    </motion.div>
  );
};
