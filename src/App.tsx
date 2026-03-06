import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Categories } from './pages/Categories';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

import { ProductProvider } from './context/ProductContext';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <ProductProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Header />
            
            <main className="flex-grow pt-[var(--header-h,64px)]">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </Router>
      </ProductProvider>
    </LanguageProvider>
  );
}
