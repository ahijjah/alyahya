import { 
  Tag,
  LucideIcon
} from 'lucide-react';

/**
 * Normalizes a category string by removing RTL/LTR marks and collapsing spaces.
 */
export function normalizeCategory(s: string | null | undefined): string {
  return (s ?? "")
    .toString()
    .trim()
    .replace(/\u200f|\u200e|\u202a|\u202b|\u202c/g, "")   // remove RTL/LTR marks
    .replace(/\s+/g, " ");                               // collapse spaces
}

export const CATEGORY_THEMES: Record<string, { bg: string, text: string }> = {
  "أجبان كريمي": { bg: "bg-yellow-50", text: "text-yellow-600" },
  "حشوات وزبدة الشوكولاتة": { bg: "bg-amber-50", text: "text-amber-900" },
  "توابل وصلصات الطعام": { bg: "bg-red-50", text: "text-red-600" },
  "نكهات وسيروب موهيتو": { bg: "bg-emerald-50", text: "text-emerald-600" },
  "المشروبات الباردة والايسات": { bg: "bg-blue-50", text: "text-blue-500" },
  "أدوات ومواد بلاستيك": { bg: "bg-stone-100", text: "text-stone-600" },
  "شاي وأعشاب": { bg: "bg-green-50", text: "text-green-600" },
  "زينة الكيك والحلويات والكوكتيل": { bg: "bg-pink-50", text: "text-pink-500" },
  "ماكينات الاسبريسو والبيع الذاتي": { bg: "bg-stone-200", text: "text-stone-800" },
  "اكسسوارات الباريستا": { bg: "bg-stone-100", text: "text-stone-700" },
  "مشروبات ساخنة": { bg: "bg-orange-50", text: "text-orange-700" },
  "قهوة اسبريسو": { bg: "bg-stone-800", text: "text-white" },
  "عجائن وخلطات الحلويات الجاهزة": { bg: "bg-orange-100", text: "text-orange-800" }
};

export const NORMALIZED_THEMES: Record<string, { bg: string, text: string }> = Object.entries(CATEGORY_THEMES).reduce(
  (acc, [key, theme]) => ({
    ...acc,
    [normalizeCategory(key)]: theme,
  }),
  {}
);

export const DEFAULT_CATEGORY_ICON = Tag;
export const DEFAULT_THEME = { bg: "bg-stone-50", text: "text-stone-400" };

export const CATEGORY_PLACEHOLDER = "https://alyahya.ps/images/placeholder-category.png";

export const CATEGORY_IMAGE_MAP: Record<string, string> = {
  "اجبان كريمي": "https://alyahya.ps/images/categories/cream-cheese.png",
  "حشوات و زبدة الشوكولاتة": "https://alyahya.ps/images/categories/chocolate-fillings.png",
  "توابل وصلصات الطعام": "https://alyahya.ps/images/categories/spices-sauces.png",
  "نكهات وسيروب موهيتو": "https://alyahya.ps/images/categories/mojito-syrups.png",
  "المشروبات الباردة والأيسات": "https://alyahya.ps/images/categories/cold-drinks.png",
  "أدوات ومواد بلاستيك": "https://alyahya.ps/images/categories/plastic-tools.png",
  "شاي وأعشاب": "https://alyahya.ps/images/categories/tea-herbs.png",
  "زينة الكيك و الحلويات والكوكتيل": "https://alyahya.ps/images/categories/cake-decorations.png",
  "ماكينات الاسبريسو والبيع الذاتي": "https://alyahya.ps/images/categories/espresso-machines-vending.png",
  "أكسسوارات البريستا": "https://alyahya.ps/images/categories/barista-accessories.png",
  "مشروبات ساخنة": "https://alyahya.ps/images/categories/hot-drinks.png",
  "قهوة أسبريسو": "https://alyahya.ps/images/categories/espresso-coffee.png",
  "عجائن و خلطات الحلويات الجاهزة": "https://alyahya.ps/images/categories/ready-mixes-doughs.png"
};

/**
 * Returns the image URL for a given Arabic category name.
 */
export const getCategoryImage = (categoryName: string): string => {
  return CATEGORY_IMAGE_MAP[categoryName] || CATEGORY_PLACEHOLDER;
};

/**
 * Returns the theme (colors) for a given Arabic category name.
 * @param categoryName The Arabic category name from the CSV.
 * @returns The theme object with bg and text classes.
 */
export const getCategoryTheme = (categoryName: string) => {
  const key = normalizeCategory(categoryName);
  return NORMALIZED_THEMES[key] || DEFAULT_THEME;
};
