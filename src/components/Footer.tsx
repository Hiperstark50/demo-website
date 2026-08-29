import React, { useState } from 'react';
import { 
  Sparkles, 
  Mail, 
  Check, 
  MapPin, 
  Phone, 
  Award, 
  ArrowUp
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { NavigationTab } from '../types';

interface FooterProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setSubscribed(true);
    setNewsletterEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#08090b] border-t border-[#1e212b] text-[#f2ede4] pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-[#181a24]">
          
          {/* Brand Col (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-[#c5a059] flex items-center justify-center bg-[#15171e]">
                <span className="font-serif text-base font-bold text-[#c5a059]">A</span>
              </div>
              <span className="font-serif tracking-[0.25em] text-xl font-bold text-[#f5efe6]">
                {RESTAURANT_INFO.name.toUpperCase()}
              </span>
            </div>

            <p className="text-xs text-[#8c8270] leading-relaxed max-w-sm font-light">
              Modern French-Japanese haute gastronomy. Two Michelin Stars. Dedicated to the celebration of culinary harmony, rare vintages, and unforgettable hospitality.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#14161f] border border-[#2b2f3d] text-[11px] text-[#e5c07b]">
                <Award className="w-3.5 h-3.5" />
                <span>Michelin Guide 2026</span>
              </span>
            </div>
          </div>

          {/* Quick Nav (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#a89d8b] font-semibold">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-[#8c8270]">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#e5c07b] transition-colors"
                >
                  Home Salon
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-[#e5c07b] transition-colors"
                >
                  Tasting Carte
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('experience')}
                  className="hover:text-[#e5c07b] transition-colors"
                >
                  Chef & Cellar
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reservation')}
                  className="hover:text-[#e5c07b] transition-colors text-[#c5a059]"
                >
                  Table Reservations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('location')}
                  className="hover:text-[#e5c07b] transition-colors"
                >
                  Location & Map
                </button>
              </li>
            </ul>
          </div>

          {/* Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#a89d8b] font-semibold">
              Private Concierge
            </h4>
            <div className="space-y-2 text-xs text-[#8c8270]">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#c5a059] shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-white">
                  {RESTAURANT_INFO.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                <a href={`mailto:${RESTAURANT_INFO.email}`} className="hover:text-white">
                  {RESTAURANT_INFO.email}
                </a>
              </p>
            </div>
          </div>

          {/* Newsletter (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#a89d8b] font-semibold">
              Seasonal Releases
            </h4>
            <p className="text-xs text-[#8c8270] leading-relaxed">
              Receive private invitations to seasonal tasting menus, white truffle releases, and sommelier masterclasses.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  id="footer-newsletter-email"
                  placeholder="Enter your email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-[#12141c] border border-[#262938] focus:border-[#c5a059] rounded-md px-3 py-2 text-xs text-[#f2ede4] placeholder-[#5c5547] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                id="footer-subscribe-btn"
                className="w-full py-2 bg-[#c5a059] hover:bg-[#d4af37] text-black font-semibold text-xs uppercase tracking-wider rounded-sm transition-all"
              >
                {subscribed ? 'Invitation Confirmed ✓' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6e6657]">
          <p>© 2026 Aurelia Haute Gastronomy. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            id="footer-scroll-top-btn"
            className="flex items-center gap-1.5 text-[#a89d8b] hover:text-[#e5c07b] transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
