import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Calendar, 
  Users, 
  Clock, 
  ChevronRight, 
  Award, 
  Compass,
  Wine,
  Flame
} from 'lucide-react';
import { RESTAURANT_INFO, RESTAURANT_IMAGES } from '../data/restaurantData';
import { NavigationTab } from '../types';

interface HeroSectionProps {
  onNavigate: (tab: NavigationTab) => void;
  onQuickBook: (params: { partySize: number; date: string; time: string }) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onQuickBook,
}) => {
  // Default Quick Booking state
  const todayStr = new Date().toISOString().split('T')[0];
  const [quickPartySize, setQuickPartySize] = useState<number>(2);
  const [quickDate, setQuickDate] = useState<string>(todayStr);
  const [quickTime, setQuickTime] = useState<string>('7:00 PM');

  const handleQuickFind = (e: React.FormEvent) => {
    e.preventDefault();
    onQuickBook({
      partySize: quickPartySize,
      date: quickDate,
      time: quickTime,
    });
  };

  return (
    <section id="hero-section" className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-24 pb-16">
      {/* Background Image with Cinematic Slow Zoom */}
      <div className="absolute inset-0 z-0">
        <motion.img
          src={RESTAURANT_IMAGES.hero}
          alt="Aurelia Luxury Restaurant Interior"
          referrerPolicy="no-referrer"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 12, ease: 'easeOut' }}
          className="w-full h-full object-cover object-center"
        />
        {/* Layered Vignette and Gradient Overlay for Pristine Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-[#0c0d10]/70 to-[#0c0d10]/50" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#0c0d10]/40 to-[#0c0d10]/90" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          
          {/* Michelin Stars & Accolades Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#181a22]/80 border border-[#c5a059]/40 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(197,160,89,0.15)]"
          >
            <Award className="w-4 h-4 text-[#e5c07b]" />
            <span className="text-xs uppercase tracking-[0.22em] text-[#e5c07b] font-medium">
              {RESTAURANT_INFO.stars}
            </span>
          </motion.div>

          {/* Majestic Hero Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#fbf8f2] leading-[1.05] text-balance mb-6"
          >
            An Ode to Haute Gastronomy
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-[#d4cbbe] max-w-2xl font-light leading-relaxed tracking-wide mb-10"
          >
            Experience contemporary French artistry intertwined with pristine Japanese sensibilities. 
            Curated by Chef Julian Mercer in the heart of the Grand Promenade.
          </motion.p>

          {/* Direct CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-12"
          >
            <button
              id="hero-reserve-btn"
              onClick={() => onNavigate('reservation')}
              className="px-8 py-4 bg-gradient-to-r from-[#c5a059] to-[#9e7c38] text-black font-semibold text-xs tracking-[0.2em] uppercase rounded-sm hover:brightness-110 shadow-xl shadow-[#c5a059]/25 hover:shadow-[#c5a059]/40 active:scale-[0.98] transition-all flex items-center gap-2.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Reserve Your Table</span>
            </button>

            <button
              id="hero-view-menu-btn"
              onClick={() => onNavigate('menu')}
              className="px-8 py-4 bg-[#161820]/80 hover:bg-[#1f222c] text-[#f2ede4] border border-[#3b3528] hover:border-[#c5a059]/60 font-medium text-xs tracking-[0.2em] uppercase rounded-sm backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>View Tasting Menus</span>
              <ChevronRight className="w-4 h-4 text-[#c5a059]" />
            </button>
          </motion.div>
        </div>

        {/* Interactive Quick-Booking Bar (Embedded in Hero) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="max-w-4xl mx-auto w-full bg-[#12141a]/90 backdrop-blur-xl border border-[#2e2a22] rounded-xl p-4 sm:p-5 shadow-2xl shadow-black/80"
        >
          <form onSubmit={handleQuickFind} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center">
            {/* Guests Selector */}
            <div className="bg-[#181a23] border border-[#2e2a22] rounded-lg px-3.5 py-2.5 flex items-center gap-3">
              <Users className="w-4 h-4 text-[#c5a059] shrink-0" />
              <div className="flex flex-col w-full">
                <label htmlFor="quick-party-select" className="text-[10px] tracking-wider uppercase text-[#8f8574] font-medium">Guests</label>
                <select
                  id="quick-party-select"
                  value={quickPartySize}
                  onChange={(e) => setQuickPartySize(Number(e.target.value))}
                  className="bg-transparent text-sm text-[#f2ede4] font-medium focus:outline-none cursor-pointer"
                >
                  <option value={1} className="bg-[#181a23]">1 Guest (Solo Dining)</option>
                  <option value={2} className="bg-[#181a23]">2 Guests (Table for Two)</option>
                  <option value={3} className="bg-[#181a23]">3 Guests</option>
                  <option value={4} className="bg-[#181a23]">4 Guests (Standard)</option>
                  <option value={5} className="bg-[#181a23]">5 Guests</option>
                  <option value={6} className="bg-[#181a23]">6 Guests (Party)</option>
                  <option value={8} className="bg-[#181a23]">8 Guests (Private Dining)</option>
                </select>
              </div>
            </div>

            {/* Date Selector */}
            <div className="bg-[#181a23] border border-[#2e2a22] rounded-lg px-3.5 py-2.5 flex items-center gap-3">
              <Calendar className="w-4 h-4 text-[#c5a059] shrink-0" />
              <div className="flex flex-col w-full">
                <label htmlFor="quick-date-input" className="text-[10px] tracking-wider uppercase text-[#8f8574] font-medium">Date</label>
                <input
                  type="date"
                  id="quick-date-input"
                  min={todayStr}
                  value={quickDate}
                  onChange={(e) => setQuickDate(e.target.value)}
                  className="bg-transparent text-sm text-[#f2ede4] font-medium focus:outline-none cursor-pointer [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Time Selector */}
            <div className="bg-[#181a23] border border-[#2e2a22] rounded-lg px-3.5 py-2.5 flex items-center gap-3">
              <Clock className="w-4 h-4 text-[#c5a059] shrink-0" />
              <div className="flex flex-col w-full">
                <label htmlFor="quick-time-select" className="text-[10px] tracking-wider uppercase text-[#8f8574] font-medium">Seating Time</label>
                <select
                  id="quick-time-select"
                  value={quickTime}
                  onChange={(e) => setQuickTime(e.target.value)}
                  className="bg-transparent text-sm text-[#f2ede4] font-medium focus:outline-none cursor-pointer"
                >
                  <optgroup label="Lunch Service" className="bg-[#181a23] text-[#c5a059]">
                    <option value="12:00 PM" className="bg-[#181a23] text-white">12:00 PM</option>
                    <option value="12:30 PM" className="bg-[#181a23] text-white">12:30 PM</option>
                    <option value="1:00 PM" className="bg-[#181a23] text-white">1:00 PM</option>
                    <option value="1:30 PM" className="bg-[#181a23] text-white">1:30 PM</option>
                  </optgroup>
                  <optgroup label="Dinner Service" className="bg-[#181a23] text-[#c5a059]">
                    <option value="5:30 PM" className="bg-[#181a23] text-white">5:30 PM (Early Dinner)</option>
                    <option value="6:00 PM" className="bg-[#181a23] text-white">6:00 PM</option>
                    <option value="6:30 PM" className="bg-[#181a23] text-white">6:30 PM</option>
                    <option value="7:00 PM" className="bg-[#181a23] text-white">7:00 PM (Prime)</option>
                    <option value="7:30 PM" className="bg-[#181a23] text-white">7:30 PM (Prime)</option>
                    <option value="8:00 PM" className="bg-[#181a23] text-white">8:00 PM (Prime)</option>
                    <option value="8:30 PM" className="bg-[#181a23] text-white">8:30 PM</option>
                    <option value="9:00 PM" className="bg-[#181a23] text-white">9:00 PM (Late Dining)</option>
                  </optgroup>
                </select>
              </div>
            </div>

            {/* Quick Find Button */}
            <button
              type="submit"
              id="quick-find-table-btn"
              className="w-full h-full min-h-[50px] bg-gradient-to-r from-[#c5a059] to-[#a8843c] hover:brightness-110 text-black font-bold text-xs tracking-widest uppercase rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Find Table</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>

      {/* Hero Footnote / Feature Badges */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-[#262833]/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#181b22] border border-[#2e2a22] flex items-center justify-center text-[#c5a059]">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-medium text-[#f2ede4]">Bespoke Omakase</p>
              <p className="text-[11px] text-[#8c8270]">7-Course Live Counter</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#181b22] border border-[#2e2a22] flex items-center justify-center text-[#c5a059]">
              <Wine className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-medium text-[#f2ede4]">1,200 Reserve Cellar</p>
              <p className="text-[11px] text-[#8c8270]">Grand Cru Sommelier</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#181b22] border border-[#2e2a22] flex items-center justify-center text-[#c5a059]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-medium text-[#f2ede4]">Private Dining Salon</p>
              <p className="text-[11px] text-[#8c8270]">Secluded Wine Vault</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#181b22] border border-[#2e2a22] flex items-center justify-center text-[#c5a059]">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-medium text-[#f2ede4]">Grand Promenade</p>
              <p className="text-[11px] text-[#8c8270]">Valet & Map Directions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
