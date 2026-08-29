import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Ticket, 
  Calendar, 
  Clock, 
  Users, 
  UtensilsCrossed, 
  Trash2, 
  AlertTriangle,
  ExternalLink,
  MapPin,
  CheckCircle2,
  Printer
} from 'lucide-react';
import { Reservation } from '../types';
import { SEATING_ZONES, RESTAURANT_INFO } from '../data/restaurantData';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservations: Reservation[];
  onCancelReservation: (id: string) => void;
  onNewBooking: () => void;
  onNavigateToLocation: () => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  isOpen,
  onClose,
  reservations,
  onCancelReservation,
  onNewBooking,
  onNavigateToLocation,
}) => {
  const [cancelingId, setCancelingId] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-2xl bg-[#101217] border border-[#3b3528] rounded-3xl overflow-hidden shadow-2xl flex flex-col my-auto max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 bg-[#151720] border-b border-[#252834] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#202432] flex items-center justify-center text-[#c5a059]">
                <Ticket className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-[#f8f5ee]">My Table Reservations</h3>
                <p className="text-xs text-[#8c8270]">
                  {reservations.length} {reservations.length === 1 ? 'active booking' : 'active bookings'}
                </p>
              </div>
            </div>

            <button
              id="my-bookings-close-btn"
              onClick={onClose}
              className="p-2 rounded-full text-[#8c8270] hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            {reservations.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <UtensilsCrossed className="w-12 h-12 text-[#4f483c] mx-auto" />
                <p className="text-base text-[#f2ede4] font-serif">No Active Reservations</p>
                <p className="text-xs text-[#8c8270] max-w-xs mx-auto">
                  You currently have no upcoming table bookings at Aurelia.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onNewBooking();
                  }}
                  className="px-6 py-2.5 bg-[#c5a059] hover:bg-[#d4af37] text-black text-xs uppercase font-bold tracking-widest rounded-sm transition-all"
                >
                  Book a Table Now
                </button>
              </div>
            ) : (
              reservations.map((res) => {
                const zone = SEATING_ZONES.find((z) => z.id === res.seatingArea);

                return (
                  <div
                    key={res.id}
                    className="bg-[#161822] border border-[#2b2f3e] rounded-2xl p-5 space-y-4 shadow-lg relative"
                  >
                    {/* Top Row: Ref & Status */}
                    <div className="flex items-center justify-between pb-3 border-b border-[#222634]">
                      <div>
                        <span className="text-[10px] text-[#786f60] uppercase tracking-wider block">
                          Booking Reference
                        </span>
                        <span className="font-serif text-lg text-[#c5a059] font-bold">
                          {res.bookingRef}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Confirmed</span>
                        </span>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div>
                        <span className="text-[#786f60] block mb-0.5">Guest Name</span>
                        <span className="text-[#f2ede4] font-medium">{res.guestName}</span>
                      </div>
                      <div>
                        <span className="text-[#786f60] block mb-0.5">Party</span>
                        <span className="text-[#f2ede4] font-medium">{res.partySize} Guests</span>
                      </div>
                      <div>
                        <span className="text-[#786f60] block mb-0.5">Date</span>
                        <span className="text-[#f2ede4] font-medium">{res.date}</span>
                      </div>
                      <div>
                        <span className="text-[#786f60] block mb-0.5">Time</span>
                        <span className="text-[#f2ede4] font-medium">{res.time}</span>
                      </div>
                    </div>

                    {/* Atmosphere & Occasion */}
                    <div className="bg-[#101218] p-3 rounded-xl border border-[#202330] text-xs space-y-1 text-[#b8ad9d]">
                      <p>
                        <span className="text-[#786f60]">Seating:</span>{' '}
                        <span className="text-[#e5c07b] font-medium">{zone?.name}</span>
                      </p>
                      <p>
                        <span className="text-[#786f60]">Occasion:</span> {res.occasion}
                      </p>
                      {res.dietaryRequirements.length > 0 && (
                        <p>
                          <span className="text-[#786f60]">Dietary:</span>{' '}
                          {res.dietaryRequirements.join(', ')}
                        </p>
                      )}
                      {res.winePairingSelected && (
                        <p className="text-[#c5a059]">✓ Grand Cru Sommelier Wine Pairing Included</p>
                      )}
                    </div>

                    {/* Actions: Cancel / Print */}
                    <div className="pt-2 flex items-center justify-between">
                      {cancelingId === res.id ? (
                        <div className="flex items-center gap-2 bg-red-950/40 p-2 rounded-lg border border-red-800/60 w-full justify-between">
                          <span className="text-xs text-red-300 flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                            Cancel this booking?
                          </span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                onCancelReservation(res.id);
                                setCancelingId(null);
                              }}
                              className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded"
                            >
                              Yes, Cancel
                            </button>
                            <button
                              onClick={() => setCancelingId(null)}
                              className="px-2.5 py-1 bg-[#252838] text-xs text-[#d6cdbe] rounded"
                            >
                              Keep
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between w-full">
                          <button
                            onClick={() => window.print()}
                            className="text-xs text-[#8c8270] hover:text-white flex items-center gap-1.5"
                          >
                            <Printer className="w-3.5 h-3.5 text-[#c5a059]" />
                            <span>Print Pass</span>
                          </button>

                          <button
                            onClick={() => setCancelingId(res.id)}
                            className="text-xs text-red-400/80 hover:text-red-400 flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Cancel Reservation</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-4 bg-[#151720] border-t border-[#252834] flex items-center justify-between">
            <button
              onClick={() => {
                onClose();
                onNavigateToLocation();
              }}
              className="text-xs text-[#c5a059] hover:underline flex items-center gap-1 font-medium"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>View Map & Valet Directions</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onNewBooking();
              }}
              className="px-5 py-2 bg-[#c5a059] hover:bg-[#d4af37] text-black text-xs uppercase font-bold tracking-wider rounded-sm transition-all"
            >
              + New Reservation
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
