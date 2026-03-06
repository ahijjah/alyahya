import React, { createContext, useContext, ReactNode } from 'react';
import { useProducts } from '../hooks/useProducts';
import { Product } from '../types';

interface ProductContextType {
  products: Product[];
  categories: string[];
  loading: boolean;
  error: string | null;
  retry: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const productData = useProducts();

  return (
    <ProductContext.Provider value={productData}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};
