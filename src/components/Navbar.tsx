import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  UtensilsCrossed, 
  CalendarCheck, 
  Menu as MenuIcon, 
  X, 
  Phone, 
  MapPin, 
  Sparkles,
  Ticket
} from 'lucide-react';
import { NavigationTab } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface NavbarProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenMyBookings: () => void;
  bookingCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenMyBookings,
  bookingCount,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: NavigationTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menus' },
    { id: 'experience', label: 'Experience' },
    { id: 'reservation', label: 'Reservations' },
    { id: 'location', label: 'Location & Map' },
  ];

  const handleNavClick = (tab: NavigationTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0c0d10]/90 backdrop-blur-md border-b border-[#2d2922] py-3 shadow-2xl shadow-black/60'
          : 'bg-gradient-to-b from-[#0a0b0e]/95 via-[#0a0b0e]/70 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <button
            id="nav-brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full border border-[#c5a059]/60 flex items-center justify-center bg-[#15171e]/80 group-hover:border-[#e5c07b] group-hover:shadow-[0_0_15px_rgba(197,160,89,0.3)] transition-all">
              <span className="font-serif text-lg font-bold text-[#c5a059] group-hover:text-[#e5c07b]">
                A
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif tracking-[0.25em] text-xl font-bold text-[#f5efe6] group-hover:text-[#c5a059] transition-colors">
                {RESTAURANT_INFO.name.toUpperCase()}
              </span>
              <span className="text-[10px] tracking-[0.28em] text-[#a59a86] uppercase">
                Haute Gastronomy
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 text-sm tracking-wider uppercase transition-all duration-300 font-medium cursor-pointer ${
                    isActive
                      ? 'text-[#e5c07b]'
                      : 'text-[#bfb5a3] hover:text-[#f5efe6]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-[#c5a059] to-transparent"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions: My Bookings & Reserve CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {bookingCount > 0 && (
              <button
                id="nav-my-bookings-btn"
                onClick={onOpenMyBookings}
                className="relative flex items-center gap-2 px-3 py-2 text-xs uppercase tracking-wider text-[#d4af37] border border-[#d4af37]/30 rounded-md hover:bg-[#d4af37]/10 transition-colors cursor-pointer"
                title="View active reservations"
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>My Bookings</span>
                <span className="w-5 h-5 rounded-full bg-[#c5a059] text-black font-bold text-[10px] flex items-center justify-center">
                  {bookingCount}
                </span>
              </button>
            )}

            <button
              id="nav-reserve-cta-btn"
              onClick={() => handleNavClick('reservation')}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#c5a059] to-[#9e7c38] text-black font-semibold text-xs tracking-widest uppercase rounded-sm hover:brightness-110 shadow-lg shadow-[#c5a059]/20 hover:shadow-[#c5a059]/40 active:scale-[0.98] transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Reserve Table</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            {bookingCount > 0 && (
              <button
                id="nav-mobile-bookings-badge-btn"
                onClick={onOpenMyBookings}
                className="p-2 text-[#d4af37] relative"
              >
                <Ticket className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#c5a059] text-black font-bold text-[9px] flex items-center justify-center">
                  {bookingCount}
                </span>
              </button>
            )}

            <button
              id="nav-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#e5c07b] hover:text-white transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#0e1014]/98 border-b border-[#2d2922] backdrop-blur-xl px-6 py-6"
          >
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`nav-mobile-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left py-2.5 px-3 text-base tracking-wider uppercase rounded-md transition-colors ${
                    activeTab === item.id
                      ? 'bg-[#c5a059]/15 text-[#e5c07b] font-semibold border-l-2 border-[#c5a059]'
                      : 'text-[#d6cdbe] hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-4 border-t border-[#262830] flex flex-col gap-3">
                <button
                  id="nav-mobile-reserve-btn"
                  onClick={() => handleNavClick('reservation')}
                  className="w-full py-3 bg-gradient-to-r from-[#c5a059] to-[#9e7c38] text-black font-semibold text-xs tracking-widest uppercase rounded-sm text-center"
                >
                  Book A Table
                </button>

                {bookingCount > 0 && (
                  <button
                    id="nav-mobile-my-bookings-btn"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenMyBookings();
                    }}
                    className="w-full py-2.5 border border-[#c5a059]/40 text-[#c5a059] text-xs tracking-wider uppercase rounded-sm flex items-center justify-center gap-2"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>My Active Reservations ({bookingCount})</span>
                  </button>
                )}

                <div className="flex items-center justify-between text-xs text-[#8c8270] pt-2">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
                    {RESTAURANT_INFO.phone}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
                    Arts District
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
