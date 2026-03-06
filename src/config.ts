export const DATA_SOURCE = {
  csvUrl: import.meta.env.VITE_CSV_URL || "/data/products.csv",
  imagesBaseUrl: import.meta.env.VITE_IMAGES_BASE_URL || "/images/"
};

export const STORE_CONFIG = {
  name: {
    ar: "AL YAHYA FOODS اليحيى",
    en: "AL YAHYA FOODS"
  },
  fullName: {
    ar: "AL YAHYA FOODS",
    en: "AL YAHYA FOODS"
  },
  currency: "₪",
  domain: "alyahya.ps",
  whatsappNumber: "966500000000",
  showPrices: true, // Set to false to hide prices site-wide
  indicativePriceText: {
    ar: "سعر إرشادي",
    en: "Indicative Price"
  },
  contact: {
    phone: "+966 50 000 0000",
    whatsapp: "966500000000",
    email: "sales@alyahya.ps",
    address: {
      ar: "شارع الاستقلال ، 10 P304 طولكرم فلسطين",
      en: "Al-Istiqlal Street, Building 10 P304, Tulkarm, Palestine"
    },
    workingHours: {
      ar: "السبت - الخميس: 9:00 صباحاً - 6:00 مساءً",
      en: "Saturday - Thursday: 9:00 AM - 6:00 PM"
    }
  }
};
