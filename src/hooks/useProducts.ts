import { useState, useEffect, useCallback } from 'react';
import Papa from 'papaparse';
import { Product } from '../types';
import { DATA_SOURCE } from '../config';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(['الكل']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getProductImageUrl = (product: any) => {
    const rawValue = product.image_png ? String(product.image_png).trim() : '';
    
    if (!rawValue) return '/images/placeholder-product.png';
    if (rawValue.startsWith('http')) return rawValue;
    
    // Normalize: remove leading "images/" if present
    let filename = rawValue;
    if (filename.startsWith('images/')) {
      filename = filename.replace(/^images\//, '');
    }
    
    const finalUrl = `${DATA_SOURCE.imagesBaseUrl}${filename}`;
    return encodeURI(finalUrl);
  };

  const parseCSV = useCallback((csvText: string) => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedData = results.data as any[];
        const formattedProducts: Product[] = parsedData.map((item, index) => {
          return {
            ...item,
            id: item.id || `prod-${index}`,
            name: (item.product_name || '').trim() || 'منتج بدون اسم',
            category: (item.product_category || '').trim() || 'عام',
            price: (item.normal_price || '').trim(),
            image: getProductImageUrl(item)
          };
        });

        const uniqueCategories = Array.from(new Set(formattedProducts.map(p => p.category))).filter(Boolean);
        setCategories(['الكل', ...uniqueCategories]);
        setProducts(formattedProducts);
        setLoading(false);
        setError(null);
      },
      error: (err: any) => {
        setError(`خطأ في معالجة ملف البيانات: ${err.message}`);
        setLoading(false);
      }
    });
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(DATA_SOURCE.csvUrl, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`فشل في جلب البيانات (Status: ${response.status})`);
      }
      const csvText = await response.text();
      parseCSV(csvText);
    } catch (err: any) {
      console.error('Fetch error:', err);
      setError(err.message || 'حدث خطأ أثناء تحميل البيانات. يرجى التأكد من اتصال الإنترنت أو المحاولة لاحقاً.');
      setLoading(false);
    }
  }, [parseCSV]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, categories, loading, error, retry: fetchProducts };
}
