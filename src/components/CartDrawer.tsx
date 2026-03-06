import React from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import { STORE_CONFIG } from '../config';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  subtotal: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, onClose, items, onUpdateQty, onRemove, subtotal 
}) => {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-bottom border-stone-100 flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ShoppingBag size={24} className="text-accent" />
                سلة التسوق
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center text-stone-300">
                    <ShoppingBag size={40} />
                  </div>
                  <p className="text-stone-500 font-medium">سلتك فارغة حالياً</p>
                  <button 
                    onClick={onClose}
                    className="px-6 py-2 bg-primary text-white rounded-full text-sm font-bold hover:bg-accent transition-colors"
                  >
                    ابدأ التسوق
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-24 bg-stone-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/placeholder-product.png';
                        }}
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h3 className="font-bold text-sm line-clamp-1">{item.name}</h3>
                        <button onClick={() => onRemove(item.id)} className="text-stone-400 hover:text-red-500">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-accent font-bold text-sm mt-1">
                        {item.selectedPrice} {STORE_CONFIG.currency}
                      </p>
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center border border-stone-200 rounded-full px-2 py-1">
                          <button 
                            onClick={() => onUpdateQty(item.id, -1)}
                            className="p-1 hover:text-accent"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQty(item.id, 1)}
                            className="p-1 hover:text-accent"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 bg-stone-50 border-t border-stone-100 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-stone-500 font-medium">المجموع الفرعي</span>
                  <span className="text-xl font-extrabold">{subtotal} {STORE_CONFIG.currency}</span>
                </div>
                <p className="text-[10px] text-stone-400 text-center">
                  رسوم الشحن تُحسب عند الدفع
                </p>
                <button 
                  onClick={() => {
                    onClose();
                    navigate('/checkout');
                  }}
                  className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-accent transition-all transform active:scale-[0.98]"
                >
                  إتمام الطلب
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
