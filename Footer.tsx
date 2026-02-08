
import React from 'react';
import { Language } from '../types';
import { SOCIAL_LINKS, CONTACT_NUMBER } from '../constants';
import { Youtube, Video, Facebook, ShieldCheck, TrendingUp, Send, MessageCircle, Mail } from 'lucide-react';

interface FooterProps {
  lang: Language;
  theme: 'light' | 'dark';
}

const Footer: React.FC<FooterProps> = ({ lang }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Youtube': return <Youtube size={14} />;
      case 'Video': return <Video size={14} />;
      case 'Facebook': return <Facebook size={14} />;
      case 'ShieldCheck': return <ShieldCheck size={14} />;
      case 'TrendingUp': return <TrendingUp size={14} />;
      case 'Send': return <Send size={14} />;
      case 'MessageCircle': return <MessageCircle size={14} />;
      case 'Mail': return <Mail size={14} />;
      default: return null;
    }
  };

  return (
    <footer className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 py-12 px-6 border-t border-zinc-100 dark:border-zinc-900 transition-all duration-500 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          <div className="space-y-5">
            <h2 className="text-2xl font-black text-red-600 font-english tracking-tightest">GOTI.</h2>
            <p className={`text-zinc-500 dark:text-zinc-400 text-xs max-w-sm leading-relaxed ${lang === 'bn' ? 'font-bengali' : 'font-english'}`}>
              {lang === 'bn' 
                ? 'বাংলাদেশের প্রতিটি কোণায় উচ্চগতির ডিজিটাল সংযোগ পৌঁছে দিতে আমরা প্রতিশ্রুতিবদ্ধ।'
                : 'Pioneering high-speed fiber across Bangladesh with next-gen reliability.'}
            </p>
            <div className="flex flex-wrap gap-2">
              {SOCIAL_LINKS.map((social) => (
                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-lg flex items-center justify-center text-zinc-400 hover:text-red-600 transition-all duration-300">
                  {getIcon(social.icon)}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-[8px] font-black text-red-600 uppercase tracking-widest font-english">Support Core</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-[7px] font-black text-zinc-400 uppercase tracking-widest font-english">Contact Gateway</p>
                  <p className="text-xs font-black font-english tracking-tight">{CONTACT_NUMBER}</p>
                </div>
                <div>
                  <p className="text-[7px] font-black text-zinc-400 uppercase tracking-widest font-english">Email Endpoint</p>
                  <a href="mailto:info.techitnetwork@gmail.com" className="text-[10px] font-bold hover:text-red-600 transition-colors truncate block font-english">info.techitnetwork@gmail.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-100 dark:border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-green-500/5 dark:bg-green-500/10 rounded-full border border-green-500/10">
            <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-500 text-[7px] font-black uppercase tracking-widest font-english">Infrastructure Active</span>
          </div>
          <p className="text-zinc-400 text-[8px] font-black uppercase tracking-widest font-english">
            © Goti Network By Techit Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
