
import React, { useState, useEffect, Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PackageList from './components/PackageList';
import RamadanAd from './components/RamadanAd';
import Auth from './components/Auth';
import Profile from './components/Profile';
import Footer from './components/Footer';
import { Language, Theme, User } from './types';
import { TRANSLATIONS, CONTACT_NUMBER } from './constants';
import { Zap, ShieldCheck, Banknote, Globe, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('bn');
  const [theme, setTheme] = useState<Theme>('dark');
  const [currentPage, setCurrentPage] = useState<'home' | 'packages' | 'auth' | 'profile'>('home');
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const toggleLanguage = () => setLang(prev => prev === 'en' ? 'bn' : 'en');
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const handleLogin = (name: string, email: string, phone: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setUser({
        name: name,
        email: email,
        phone: phone || CONTACT_NUMBER,
        activePackage: "Goti Family Unlimited",
        expiryDate: "2025-04-15"
      });
      setIsLoading(false);
      setCurrentPage('profile');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  const handleNavigate = (page: 'home' | 'packages' | 'auth' | 'profile') => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const BenefitIcon = ({ type }: { type: string }) => {
    const iconClass = "text-red-600 transition-transform duration-500 group-hover:scale-110";
    switch(type) {
      case 'speed': return <Zap className={iconClass} size={32} />;
      case 'price': return <Banknote className={iconClass} size={32} />;
      case 'flex': return <ShieldCheck className={iconClass} size={32} />;
      default: return <Globe className={iconClass} size={32} />;
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6 bg-white dark:bg-zinc-950">
          <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
          <p className={`text-zinc-500 font-black uppercase tracking-widest text-[10px] ${lang === 'bn' ? 'font-bengali' : 'font-english'}`}>
            {lang === 'bn' ? 'সংযোগ স্থাপন করা হচ্ছে...' : 'Establishing Secure Connection...'}
          </p>
        </div>
      );
    }

    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero 
              lang={lang} 
              t={TRANSLATIONS[lang]} 
              isLoggedIn={!!user}
              onCta={() => handleNavigate('packages')} 
              onLoginClick={() => handleNavigate('auth')}
            />
            
            <RamadanAd lang={lang} />

            <section className="py-16 md:py-24 px-6 bg-white dark:bg-zinc-950 transition-colors duration-500 relative overflow-hidden">
              <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-8">
                  <div className="max-w-2xl">
                    <span className="text-red-600 font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">Core Technology</span>
                    <h2 className={`text-4xl md:text-6xl font-black leading-none text-zinc-900 dark:text-zinc-100 ${lang === 'bn' ? 'font-bengali' : 'font-english uppercase italic tracking-tightest'}`}>
                      {lang === 'bn' ? 'কেন আমরা সেরা?' : 'Why Choose Goti?'}
                    </h2>
                  </div>
                  <button 
                    onClick={() => handleNavigate('packages')}
                    className="group flex items-center gap-4 bg-zinc-100 dark:bg-zinc-900 px-8 py-4 rounded-full text-red-600 font-black font-english uppercase tracking-widest text-[10px] hover:bg-red-600 hover:text-white transition-all duration-500 focus-ring w-fit"
                  >
                    View All Packs <Zap size={16} fill="currentColor" />
                  </button>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {(Object.entries(TRANSLATIONS[lang].benefits) as [string, { title: string; desc: string }][]).map(([key, benefit]) => (
                    <div key={key} className="relative group bg-zinc-50 dark:bg-zinc-900/40 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 hover:border-red-600 transition-all duration-500">
                      <div className="mb-8 p-4 bg-white dark:bg-zinc-800 rounded-2xl w-fit shadow-lg group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                        <BenefitIcon type={key} />
                      </div>
                      <h3 className={`text-xl font-black mb-4 text-zinc-900 dark:text-zinc-100 group-hover:text-red-600 transition-colors ${lang === 'bn' ? 'font-bengali text-2xl' : 'font-english uppercase'}`}>
                        {benefit.title}
                      </h3>
                      <p className={`text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm ${lang === 'bn' ? 'font-bengali' : 'font-english font-medium opacity-80'}`}>
                        {benefit.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        );
      case 'packages':
        return <PackageList lang={lang} t={TRANSLATIONS[lang]} />;
      case 'auth':
        return <Auth lang={lang} t={TRANSLATIONS[lang]} onLogin={handleLogin} />;
      case 'profile':
        return user ? (
          <Profile user={user} lang={lang} t={TRANSLATIONS[lang]} setUser={setUser} />
        ) : (
          <Auth lang={lang} t={TRANSLATIONS[lang]} onLogin={handleLogin} />
        );
      default:
        return <Hero 
          lang={lang} 
          t={TRANSLATIONS[lang]} 
          isLoggedIn={!!user}
          onCta={() => handleNavigate('packages')} 
          onLoginClick={() => handleNavigate('auth')}
        />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'bg-zinc-950 text-zinc-100' : 'bg-white text-zinc-900'}`}>
      <Header 
        lang={lang} 
        theme={theme} 
        onLangToggle={toggleLanguage} 
        onThemeToggle={toggleTheme} 
        onNavigate={handleNavigate} 
        currentPage={currentPage}
        t={TRANSLATIONS[lang]}
      />
      
      <main className="pt-16">
        <Suspense fallback={<div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-red-600 w-10 h-10" /></div>}>
          {renderContent()}
        </Suspense>
      </main>

      <Footer lang={lang} theme={theme} />
    </div>
  );
};

export default App;
