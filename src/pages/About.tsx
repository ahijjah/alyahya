import React from 'react';
import { motion } from 'motion/react';
import { STORE_CONFIG } from '../config';
import { Award, Users, Target, CheckCircle2, Coffee, Utensils, Hotel, ShoppingCart } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center overflow-hidden coffee-gradient">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1920"
            alt="About Us Hero"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white mb-4"
          >
            من نحن
          </motion.h1>
          <p className="text-stone-300 max-w-2xl mx-auto font-medium">
            تعرف على رحلتنا في تقديم أجود المنتجات الغذائية لشركائنا في جميع أنحاء المنطقة.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-stone-100 text-center space-y-4"
          >
            <div className="w-16 h-16 bg-cream rounded-2xl flex items-center justify-center text-accent mx-auto">
              <Target size={32} />
            </div>
            <h3 className="text-xl font-bold text-espresso">رؤيتنا</h3>
            <p className="text-sm text-stone-500 leading-relaxed">
              أن نكون المورد الأول والمفضل لقطاع الضيافة والأغذية، من خلال الابتكار المستمر والالتزام بأعلى معايير الجودة.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-stone-100 text-center space-y-4"
          >
            <div className="w-16 h-16 bg-cream rounded-2xl flex items-center justify-center text-accent mx-auto">
              <Award size={32} />
            </div>
            <h3 className="text-xl font-bold text-espresso">رسالتنا</h3>
            <p className="text-sm text-stone-500 leading-relaxed">
              توفير حلول غذائية متكاملة ومنتجات عالية الجودة تدعم نجاح ونمو أعمال شركائنا في قطاع الأغذية والمشروبات.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-stone-100 text-center space-y-4"
          >
            <div className="w-16 h-16 bg-cream rounded-2xl flex items-center justify-center text-accent mx-auto">
              <Users size={32} />
            </div>
            <h3 className="text-xl font-bold text-espresso">قيمنا</h3>
            <p className="text-sm text-stone-500 leading-relaxed">
              النزاهة، الجودة، الشراكة المستدامة، والتميز في الخدمة هي الركائز التي نبني عليها علاقتنا مع عملائنا.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sectors We Serve */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black mb-4">القطاعات التي نخدمها</h2>
          <p className="text-stone-500">نحن فخورون بدعم مجموعة متنوعة من الأعمال في قطاع الأغذية</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { name: 'المقاهي', icon: Coffee },
            { name: 'المطاعم', icon: Utensils },
            { name: 'الفنادق', icon: Hotel },
            { name: 'محلات التجزئة', icon: ShoppingCart },
          ].map((sector, idx) => (
            <motion.div 
              key={sector.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-stone-50 p-8 rounded-3xl border border-stone-100 flex flex-col items-center text-center space-y-4 hover:bg-white hover:shadow-xl hover:border-accent transition-all"
            >
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-espresso group-hover:text-accent transition-colors shadow-sm">
                <sector.icon size={40} />
              </div>
              <h4 className="font-bold text-lg">{sector.name}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Detail */}
      <section className="bg-espresso py-24 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-black leading-tight">
                لماذا تعتبر {STORE_CONFIG.name} <br /> الخيار الأمثل لأعمالكم؟
              </h2>
              <div className="space-y-6">
                {[
                  'أكثر من 10 سنوات من الخبرة في قطاع التوريد الغذائي.',
                  'شبكة توريد عالمية تضمن توفر أفضل المنتجات دائماً.',
                  'فريق دعم فني متخصص لمساعدة المقاهي والمطاعم.',
                  'حلول لوجستية متطورة تضمن وصول المنتجات بحالة مثالية.',
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <CheckCircle2 className="text-accent mt-1 flex-shrink-0" size={20} />
                    <p className="text-stone-300 font-medium">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-accent/20 rounded-[3rem] blur-2xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&q=80&w=800"
                alt="Our Quality"
                className="relative rounded-[3rem] shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
