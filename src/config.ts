export const DATA_SOURCE = {
  csvUrl: import.meta.env.VITE_CSV_URL || "/data/products.csv",
  imagesBaseUrl: import.meta.env.VITE_IMAGES_BASE_URL || "/images/"
};

export const STORE_CONFIG = {
  name: "AL YAHYA FOODS اليحيى",
  fullName: "AL YAHYA FOODS",
  currency: "₪",
  domain: "alyahya.ps",
  whatsappNumber: "966500000000",
  showPrices: true, // Set to false to hide prices site-wide
  indicativePriceText: "سعر إرشادي", // Text shown next to price
  contact: {
    phone: "+966 50 000 0000",
    whatsapp: "966500000000",
    email: "info@alyahya.ps",
    address: "شارع الاستقلال ، 10 P304 طولكرم فلسطين",
    workingHours: "السبت - الخميس: 9:00 صباحاً - 6:00 مساءً"
  }
};
