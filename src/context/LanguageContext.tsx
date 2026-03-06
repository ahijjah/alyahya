import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ar' | 'en';

interface TranslationDictionary {
  [key: string]: {
    ar: string;
    en: string;
  };
}

export const translations: TranslationDictionary = {
  // Common
  appName: { ar: 'شركة اليحيى', en: 'Al Yahya Company' },
  home: { ar: 'الرئيسية', en: 'Home' },
  about: { ar: 'من نحن', en: 'About Us' },
  contact: { ar: 'تواصل معنا', en: 'Contact Us' },
  products: { ar: 'المنتجات', en: 'Products' },
  categories: { ar: 'الأقسام', en: 'Categories' },
  search: { ar: 'بحث', en: 'Search' },
  loading: { ar: 'جاري التحميل...', en: 'Loading...' },
  retry: { ar: 'إعادة المحاولة', en: 'Retry' },
  errorLoading: { ar: 'فشل تحميل البيانات', en: 'Failed to load data' },
  currency: { ar: 'شيكل', en: 'NIS' },
  price: { ar: 'السعر', en: 'Price' },
  indicativePrice: { ar: 'سعر استرشادي', en: 'Indicative Price' },
  
  // Hero
  heroTitle: { ar: 'شريككم الموثوق لمستلزمات المقاهي والحلويات', en: 'Your Trusted Partner for Café and Dessert Supplies' },
  heroTitleMain: { ar: 'شريككم الموثوق', en: 'Your Trusted Partner' },
  heroTitleAccent: { ar: 'لمستلزمات المقاهي والحلويات', en: 'for Café and Dessert Supplies' },
  heroDescription: { ar: 'نحن في شركة اليحيى متخصصون في توريد أجود المكونات الغذائية والمستلزمات الاحترافية لقطاع المقاهي والمطاعم والفنادق.', en: 'At Al Yahya Company, we specialize in supplying the finest food ingredients and professional supplies for the café, restaurant, and hotel sectors.' },
  browseCatalog: { ar: 'تصفح الكتالوج', en: 'Browse Catalog' },
  
  // Why Choose Us
  whyChooseUs: { ar: 'لماذا تختار شركة اليحيى؟', en: 'Why Choose Al Yahya Company?' },
  qualityTitle: { ar: 'جودة مضمونة', en: 'Guaranteed Quality' },
  qualityDesc: { ar: 'نختار منتجاتنا بعناية فائقة من أفضل المصادر العالمية لضمان رضا عملائنا.', en: 'We select our products with extreme care from the best global sources to ensure customer satisfaction.' },
  supplyTitle: { ar: 'توريد مستمر', en: 'Continuous Supply' },
  supplyDesc: { ar: 'نلتزم بجداول توريد دقيقة لضمان عدم انقطاع أعمال شركائنا.', en: 'We adhere to precise supply schedules to ensure our partners\' business continuity.' },
  priceTitle: { ar: 'أسعار تنافسية', en: 'Competitive Prices' },
  priceDesc: { ar: 'نقدم أفضل الأسعار لقطاع الجملة والتوريد لتعزيز ربحية شركائنا.', en: 'We offer the best prices for the wholesale and supply sector to enhance our partners\' profitability.' },
  coverageTitle: { ar: 'تغطية شاملة', en: 'Comprehensive Coverage' },
  coverageDesc: { ar: 'نخدم قطاعاً واسعاً يشمل المقاهي، المطاعم، الفنادق، ومحلات التجزئة.', en: 'We serve a wide sector including cafés, restaurants, hotels, and retail stores.' },
  
  // Home Sections
  browseByCategory: { ar: 'تصفح حسب الفئة', en: 'Browse by Category' },
  browseByCategoryDesc: { ar: 'اكتشف مجموعتنا الواسعة من المنتجات المتخصصة', en: 'Discover our wide range of specialized products' },
  featuredProducts: { ar: 'منتجات مختارة', en: 'Featured Products' },
  viewFullCatalog: { ar: 'عرض الكتالوج الكامل', en: 'View Full Catalog' },
  
  // Categories Page
  allCategories: { ar: 'جميع الفئات', en: 'All Categories' },
  allProducts: { ar: 'جميع المنتجات', en: 'All Products' },
  results: { ar: 'نتائج', en: 'Results' },
  searchInCategory: { ar: 'ابحث في هذه الفئة...', en: 'Search in this category...' },
  searchCategory: { ar: 'ابحث عن فئة...', en: 'Search for a category...' },
  noProductsFound: { ar: 'لم يتم العثور على منتجات تطابق بحثك.', en: 'No products found matching your search.' },
  backToAll: { ar: 'العودة لجميع المنتجات', en: 'Back to all products' },
  needHelp: { ar: 'هل تحتاج مساعدة؟', en: 'Need Help?' },
  helpDesc: { ar: 'فريقنا جاهز للرد على استفساراتكم وتوفير عروض أسعار مخصصة لاحتياجاتكم.', en: 'Our team is ready to answer your inquiries and provide customized quotes for your needs.' },
  contactNow: { ar: 'تواصل معنا الآن', en: 'Contact Us Now' },
  sortBy: { ar: 'ترتيب حسب', en: 'Sort By' },
  sortNameAsc: { ar: 'الاسم: أ-ي', en: 'Name: A-Z' },
  sortNameDesc: { ar: 'الاسم: ي-أ', en: 'Name: Z-A' },
  productsCount: { ar: 'منتج', en: 'Products' },
  
  // Product Card/Modal
  viewDetails: { ar: 'عرض التفاصيل', en: 'View Details' },
  requestQuote: { ar: 'طلب عرض سعر', en: 'Request Quote' },
  category: { ar: 'الفئة', en: 'Category' },
  brand: { ar: 'العلامة التجارية', en: 'Brand' },
  weight: { ar: 'الوزن/الحجم', en: 'Weight/Size' },
  origin: { ar: 'بلد المنشأ', en: 'Origin' },
  description: { ar: 'الوصف', en: 'Description' },
  close: { ar: 'إغلاق', en: 'Close' },
  whatsappInquiry: { ar: 'مرحبا، أود الاستفسار عن المنتج:', en: 'Hello, I would like to inquire about the product:' },
  productModalDesc: { ar: 'للمزيد من التفاصيل حول هذا المنتج والمواصفات الفنية، يرجى التواصل معنا مباشرة. نحن نوفر حلولاً متكاملة لقطاع المطاعم والمقاهي والفنادق.', en: 'For more details about this product and technical specifications, please contact us directly. We provide integrated solutions for the restaurant, café, and hotel sectors.' },
  contactInquiry: { ar: 'تواصل معنا للاستفسار', en: 'Contact us for inquiry' },
  
  // Footer
  quickLinks: { ar: 'روابط سريعة', en: 'Quick Links' },
  contactInfo: { ar: 'معلومات التواصل', en: 'Contact Information' },
  rightsReserved: { ar: 'جميع الحقوق محفوظة', en: 'All Rights Reserved' },
  allRightsReserved: { ar: 'جميع الحقوق محفوظة.', en: 'All Rights Reserved.' },
  footerAbout: { ar: 'وجهتكم الأولى للمواد الغذائية والمستلزمات الاحترافية. نقدم لكم أرقى المنتجات المختارة بعناية لتلبية كافة احتياجاتكم.', en: 'Your first destination for food materials and professional supplies. We offer you the finest carefully selected products to meet all your needs.' },
  ourServices: { ar: 'خدماتنا', en: 'Our Services' },
  wholesale: { ar: 'توريد الجملة', en: 'Wholesale Supply' },
  hospitalitySolutions: { ar: 'حلول قطاع الضيافة', en: 'Hospitality Solutions' },
  technicalSupport: { ar: 'الدعم الفني', en: 'Technical Support' },
  contactUs: { ar: 'تواصل معنا', en: 'Contact Us' },
  
  // About Page
  aboutTitle: { ar: 'عن شركة اليحيى', en: 'About Al Yahya Company' },
  aboutHeroDesc: { ar: 'تعرف على رحلتنا في تقديم أجود المنتجات الغذائية لشركائنا في جميع أنحاء المنطقة.', en: 'Learn about our journey in providing the finest food products to our partners across the region.' },
  ourVision: { ar: 'رؤيتنا', en: 'Our Vision' },
  ourVisionDesc: { ar: 'أن نكون المورد الأول والمفضل لقطاع الضيافة والأغذية، من خلال الابتكار المستمر والالتزام بأعلى معايير الجودة.', en: 'To be the first and preferred supplier for the hospitality and food sector, through continuous innovation and commitment to the highest quality standards.' },
  ourMission: { ar: 'رسالتنا', en: 'Our Mission' },
  ourMissionDesc: { ar: 'توفير حلول غذائية متكاملة ومنتجات عالية الجودة تدعم نجاح ونمو أعمال شركائنا في قطاع الأغذية والمشروبات.', en: 'Providing integrated food solutions and high-quality products that support the success and growth of our partners\' businesses in the food and beverage sector.' },
  ourValues: { ar: 'قيمنا', en: 'Our Values' },
  ourValuesDesc: { ar: 'النزاهة، الجودة، الشراكة المستدامة، والتميز في الخدمة هي الركائز التي نبني عليها علاقتنا مع عملائنا.', en: 'Integrity, quality, sustainable partnership, and excellence in service are the pillars upon which we build our relationship with our customers.' },
  sectorsWeServe: { ar: 'القطاعات التي نخدمها', en: 'Sectors We Serve' },
  sectorsWeServeDesc: { ar: 'نحن فخورون بدعم مجموعة متنوعة من الأعمال في قطاع الأغذية', en: 'We are proud to support a variety of businesses in the food sector' },
  cafes: { ar: 'المقاهي', en: 'Cafés' },
  restaurants: { ar: 'المطاعم', en: 'Restaurants' },
  hotels: { ar: 'الفنادق', en: 'Hotels' },
  retailStores: { ar: 'محلات التجزئة', en: 'Retail Stores' },
  whyChooseUsDetailTitle: { ar: 'لماذا تعتبر شركة اليحيى الخيار الأمثل لأعمالكم؟', en: 'Why is Al Yahya Company the perfect choice for your business?' },
  whyChooseUsDetail1: { ar: 'أكثر من 10 سنوات من الخبرة في قطاع التوريد الغذائي.', en: 'More than 10 years of experience in the food supply sector.' },
  whyChooseUsDetail2: { ar: 'شبكة توريد عالمية تضمن توفر أفضل المنتجات دائماً.', en: 'A global supply network that ensures the best products are always available.' },
  whyChooseUsDetail3: { ar: 'فريق دعم فني متخصص لمساعدة المقاهي والمطاعم.', en: 'A specialized technical support team to assist cafés and restaurants.' },
  whyChooseUsDetail4: { ar: 'حلول لوجستية متطورة تضمن وصول المنتجات بحالة مثالية.', en: 'Advanced logistical solutions that ensure products arrive in perfect condition.' },
  
  // Contact Page
  contactTitle: { ar: 'تواصل معنا', en: 'Contact Us' },
  contactHeroDesc: { ar: 'نحن هنا للإجابة على جميع استفساراتكم وتلبية احتياجات أعمالكم.', en: 'We are here to answer all your inquiries and meet your business needs.' },
  sendMessage: { ar: 'أرسل لنا رسالة', en: 'Send us a message' },
  name: { ar: 'الاسم', en: 'Name' },
  email: { ar: 'البريد الإلكتروني', en: 'Email' },
  phone: { ar: 'رقم الهاتف', en: 'Phone Number' },
  message: { ar: 'الرسالة', en: 'Message' },
  send: { ar: 'إرسال', en: 'Send' },
  whatsapp: { ar: 'واتساب', en: 'WhatsApp' },
  address: { ar: 'العنوان', en: 'Address' },
  workingHours: { ar: 'ساعات العمل', en: 'Working Hours' },
  fullName: { ar: 'الاسم الكامل', en: 'Full Name' },
  subject: { ar: 'الموضوع', en: 'Subject' },
  fullNamePlaceholder: { ar: 'أدخل اسمك هنا', en: 'Enter your name here' },
  subjectPlaceholder: { ar: 'كيف يمكننا مساعدتك؟', en: 'How can we help you?' },
  messagePlaceholder: { ar: 'اكتب رسالتك هنا بالتفصيل...', en: 'Write your message here in detail...' },
  sendMessageBtn: { ar: 'إرسال الرسالة', en: 'Send Message' },
  locationMap: { ar: 'خريطة الموقع', en: 'Location Map' },
  whatsappMessagePrefix: { ar: 'رسالة جديدة من الموقع:', en: 'New message from website:' },
  whatsappNameLabel: { ar: 'الاسم:', en: 'Name:' },
  whatsappSubjectLabel: { ar: 'الموضوع:', en: 'Subject:' },
  whatsappMessageLabel: { ar: 'الرسالة:', en: 'Message:' },

  // Cart Drawer
  shoppingCart: { ar: 'سلة التسوق', en: 'Shopping Cart' },
  cartEmpty: { ar: 'سلتك فارغة حالياً', en: 'Your cart is currently empty' },
  startShopping: { ar: 'ابدأ التسوق', en: 'Start Shopping' },
  subtotal: { ar: 'المجموع الفرعي', en: 'Subtotal' },
  shippingFeesNote: { ar: 'رسوم الشحن تُحسب عند الدفع', en: 'Shipping fees calculated at checkout' },
  checkout: { ar: 'إتمام الطلب', en: 'Checkout' },

  // Data Loading
  unnamedProduct: { ar: 'منتج بدون اسم', en: 'Unnamed Product' },
  generalCategory: { ar: 'عام', en: 'General' },
  errorParsingData: { ar: 'خطأ في معالجة ملف البيانات:', en: 'Error parsing data file:' },
  fetchDataFailed: { ar: 'فشل في جلب البيانات', en: 'Failed to fetch data' },
  fetchDataError: { ar: 'حدث خطأ أثناء تحميل البيانات. يرجى التأكد من اتصال الإنترنت أو المحاولة لاحقاً.', en: 'An error occurred while loading data. Please check your internet connection or try again later.' },
  all: { ar: 'الكل', en: 'All' },
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('lang');
    return (saved as Language) || 'ar';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('lang', newLang);
  };

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][lang];
  };

  const isRtl = lang === 'ar';

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
