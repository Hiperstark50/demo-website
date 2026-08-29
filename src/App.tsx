/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { ReservationSection } from './components/ReservationSection';
import { ExperienceSection } from './components/ExperienceSection';
import { LocationSection } from './components/LocationSection';
import { MyBookingsModal } from './components/MyBookingsModal';
import { Footer } from './components/Footer';
import { NavigationTab, Reservation, MenuItem } from './types';
import { SAMPLE_RESERVATIONS } from './data/restaurantData';
import { Sparkles, Calendar, Utensils } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState<boolean>(false);

  // Reservations State (synced with localStorage)
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    try {
      const saved = localStorage.getItem('aurelia_reservations');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return SAMPLE_RESERVATIONS;
  });

  // Quick booking prefill parameters
  const [bookingParams, setBookingParams] = useState<{
    partySize: number;
    date: string;
    time: string;
    item?: MenuItem | null;
  }>({
    partySize: 2,
    date: new Date().toISOString().split('T')[0],
    time: '7:30 PM',
    item: null,
  });

  useEffect(() => {
    try {
      localStorage.setItem('aurelia_reservations', JSON.stringify(reservations));
    } catch {
      // ignore
    }
  }, [reservations]);

  const handleBookingSuccess = (newRes: Reservation) => {
    setReservations((prev) => [newRes, ...prev]);
  };

  const handleCancelReservation = (id: string) => {
    setReservations((prev) => prev.filter((r) => r.id !== id));
  };

  const handleQuickBook = (params: { partySize: number; date: string; time: string }) => {
    setBookingParams({
      partySize: params.partySize,
      date: params.date,
      time: params.time,
      item: null,
    });
    setActiveTab('reservation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReserveWithItem = (item: MenuItem) => {
    setBookingParams((prev) => ({
      ...prev,
      item,
    }));
    setActiveTab('reservation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const tabTransitionVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.25, ease: 'easeIn' } },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0b0e] text-[#f2ede4] font-sans selection:bg-[#c5a059]/30 selection:text-[#fefbf6]">
      {/* Top Main Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        bookingCount={reservations.length}
      />

      {/* Main Content View with Smooth AnimatePresence Transitions */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="tab-home"
              variants={tabTransitionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <HeroSection
                onNavigate={setActiveTab}
                onQuickBook={handleQuickBook}
              />
              
              {/* Highlight Teasers for Menu & Experience */}
              <div className="bg-[#0c0d11] py-16 border-t border-[#1e212b]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-[#13151d] border border-[#262938] rounded-2xl p-8 shadow-2xl">
                    <div className="space-y-2">
                      <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-semibold">
                        A Gastronomic Masterpiece
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl text-[#f8f5ee]">
                        Explore the 7-Course Degustation & Grand Cellar
                      </h3>
                      <p className="text-xs sm:text-sm text-[#a89d8b] max-w-xl font-light">
                        Discover the Autumn-Winter Carte, crafted with Michelin two-star distinction and paired with 1,200 rare vintage bottles.
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        onClick={() => {
                          setActiveTab('menu');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-6 py-3 bg-[#202432] hover:bg-[#2b3044] text-xs font-semibold tracking-wider uppercase text-[#f2ede4] rounded-sm transition-colors cursor-pointer"
                      >
                        View Menu
                      </button>
                      <button
                        onClick={() => {
                          setActiveTab('reservation');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-6 py-3 bg-[#c5a059] hover:bg-[#d4af37] text-black text-xs font-bold tracking-widest uppercase rounded-sm transition-all shadow-lg cursor-pointer"
                      >
                        Book Table
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seamless Location Preview & Map on Home */}
              <LocationSection />
            </motion.div>
          )}

          {activeTab === 'menu' && (
            <motion.div
              key="tab-menu"
              variants={tabTransitionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="pt-16"
            >
              <MenuSection
                onReserveWithItem={handleReserveWithItem}
                onOpenReservation={() => {
                  setActiveTab('reservation');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </motion.div>
          )}

          {activeTab === 'reservation' && (
            <motion.div
              key="tab-reservation"
              variants={tabTransitionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="pt-16"
            >
              <ReservationSection
                initialPartySize={bookingParams.partySize}
                initialDate={bookingParams.date}
                initialTime={bookingParams.time}
                selectedMenuItem={bookingParams.item}
                onBookingSuccess={handleBookingSuccess}
                onNavigateToLocation={() => {
                  setActiveTab('location');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </motion.div>
          )}

          {activeTab === 'experience' && (
            <motion.div
              key="tab-experience"
              variants={tabTransitionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="pt-16"
            >
              <ExperienceSection
                onOpenReservation={() => {
                  setActiveTab('reservation');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </motion.div>
          )}

          {activeTab === 'location' && (
            <motion.div
              key="tab-location"
              variants={tabTransitionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="pt-16"
            >
              <LocationSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Bottom Quick Booking Action on Mobile */}
      {activeTab !== 'reservation' && (
        <div className="sm:hidden fixed bottom-5 left-4 right-4 z-40">
          <button
            onClick={() => {
              setActiveTab('reservation');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full py-3.5 bg-gradient-to-r from-[#c5a059] to-[#a8843c] text-black font-bold text-xs tracking-widest uppercase rounded-full shadow-2xl shadow-black/80 flex items-center justify-center gap-2 border border-[#f5df9e]/40"
          >
            <Sparkles className="w-4 h-4" />
            <span>Reserve a Table Online</span>
          </button>
        </div>
      )}

      {/* My Bookings Modal */}
      <MyBookingsModal
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        reservations={reservations}
        onCancelReservation={handleCancelReservation}
        onNewBooking={() => {
          setIsMyBookingsOpen(false);
          setActiveTab('reservation');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateToLocation={() => {
          setIsMyBookingsOpen(false);
          setActiveTab('location');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Footer */}
      <Footer onNavigate={setActiveTab} />
    </div>
  );
}

