import React from 'react';
import { Link } from 'react-router-dom';
import { STORE_CONFIG } from '../config';
import { Instagram, Twitter, Facebook, Phone, Mail, MapPin } from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { lang, t, isRtl } = useLanguage();
  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className={`flex items-center ${isRtl ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
              <span className="text-3xl font-black tracking-tighter">{STORE_CONFIG.name[lang]}</span>
              <div className="w-2 h-2 rounded-full bg-accent"></div>
            </Link>
            <p className="text-stone-400 text-sm leading-relaxed">
              {t('footerAbout')}
            </p>
            <div className={`flex ${isRtl ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t('quickLinks')}</h4>
            <ul className="space-y-4 text-stone-400 text-sm">
              <li><Link to="/" className="hover:text-accent transition-colors">{t('home')}</Link></li>
              <li><Link to="/categories" className="hover:text-accent transition-colors">{t('products')}</Link></li>
              <li><Link to="/about" className="hover:text-accent transition-colors">{t('about')}</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">{t('contact')}</Link></li>
            </ul>
          </div>

          {/* Business Info */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t('ourServices')}</h4>
            <ul className="space-y-4 text-stone-400 text-sm">
              <li><Link to="/categories" className="hover:text-accent transition-colors">{t('wholesale')}</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">{t('requestQuote')}</Link></li>
              <li><Link to="/about" className="hover:text-accent transition-colors">{t('hospitalitySolutions')}</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">{t('technicalSupport')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6">{t('contactUs')}</h4>
            <ul className="space-y-4 text-stone-400 text-sm">
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-accent" />
                <span>{STORE_CONFIG.contact.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-accent" />
                <span>{STORE_CONFIG.contact.email}</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-accent" />
                <span>{STORE_CONFIG.contact.address[lang]}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-stone-500 text-xs">
          <p>© {new Date().getFullYear()} {STORE_CONFIG.name[lang]}. {t('allRightsReserved')}</p>
          <div className="flex items-center gap-4">
            <span className="text-stone-600">{STORE_CONFIG.domain}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
