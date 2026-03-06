import React from 'react';
import { motion } from 'motion/react';
import { STORE_CONFIG } from '../config';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send an email. For this catalog, we'll open WhatsApp with the details.
    const text = `رسالة جديدة من الموقع:\nالاسم: ${formData.name}\nالموضوع: ${formData.subject}\nالرسالة: ${formData.message}`;
    const whatsappUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative h-[30vh] min-h-[250px] flex items-center overflow-hidden coffee-gradient">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80&w=1920"
            alt="Contact Us Hero"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white mb-4"
          >
            تواصل معنا
          </motion.h1>
          <p className="text-stone-300 max-w-2xl mx-auto font-medium">
            نحن هنا للإجابة على جميع استفساراتكم وتلبية احتياجات أعمالكم.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-8 rounded-3xl shadow-xl border border-stone-100 space-y-6"
            >
              <h3 className="text-xl font-bold text-espresso border-b border-stone-100 pb-4">معلومات الاتصال</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cream rounded-xl flex items-center justify-center text-accent flex-shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-stone-400 font-bold uppercase mb-1">اتصل بنا</p>
                    <p className="font-bold text-espresso" dir="ltr">{STORE_CONFIG.contact.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cream rounded-xl flex items-center justify-center text-accent flex-shrink-0">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-stone-400 font-bold uppercase mb-1">واتساب</p>
                    <p className="font-bold text-espresso" dir="ltr">{STORE_CONFIG.contact.whatsapp}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cream rounded-xl flex items-center justify-center text-accent flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-stone-400 font-bold uppercase mb-1">البريد الإلكتروني</p>
                    <p className="font-bold text-espresso">{STORE_CONFIG.contact.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cream rounded-xl flex items-center justify-center text-accent flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-stone-400 font-bold uppercase mb-1">العنوان</p>
                    <p className="font-bold text-espresso leading-relaxed">{STORE_CONFIG.contact.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cream rounded-xl flex items-center justify-center text-accent flex-shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-stone-400 font-bold uppercase mb-1">ساعات العمل</p>
                    <p className="font-bold text-espresso">{STORE_CONFIG.contact.workingHours}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-10 rounded-3xl shadow-xl border border-stone-100"
            >
              <h3 className="text-2xl font-bold text-espresso mb-8">أرسل لنا رسالة</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-stone-600">الاسم الكامل</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-accent outline-none transition-all"
                      placeholder="أدخل اسمك هنا"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-stone-600">البريد الإلكتروني</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-accent outline-none transition-all"
                      placeholder="example@mail.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-600">الموضوع</label>
                  <input 
                    type="text" 
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-accent outline-none transition-all"
                    placeholder="كيف يمكننا مساعدتك؟"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-600">الرسالة</label>
                  <textarea 
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-accent outline-none transition-all resize-none"
                    placeholder="اكتب رسالتك هنا بالتفصيل..."
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-espresso text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-accent transition-all shadow-lg shadow-espresso/10"
                >
                  <Send size={18} />
                  إرسال الرسالة
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="w-full h-[400px] bg-stone-100 rounded-[3rem] overflow-hidden border border-stone-200 relative">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-400 space-y-4">
            <MapPin size={48} />
            <p className="font-bold">خريطة الموقع</p>
            <p className="text-xs">{STORE_CONFIG.contact.address}</p>
          </div>
          {/* In a real app, you'd embed a Google Map here */}
        </div>
      </section>
    </div>
  );
};
