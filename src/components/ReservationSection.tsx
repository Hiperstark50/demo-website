import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Calendar, 
  Clock, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Wine, 
  ShieldCheck, 
  AlertCircle, 
  Heart, 
  Download, 
  MapPin,
  UtensilsCrossed,
  Info
} from 'lucide-react';
import { SEATING_ZONES, RESTAURANT_INFO } from '../data/restaurantData';
import { SeatingArea, Reservation, MenuItem } from '../types';

interface ReservationSectionProps {
  initialPartySize?: number;
  initialDate?: string;
  initialTime?: string;
  selectedMenuItem?: MenuItem | null;
  onBookingSuccess: (reservation: Reservation) => void;
  onNavigateToLocation: () => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  initialPartySize = 2,
  initialDate,
  initialTime = '7:30 PM',
  selectedMenuItem,
  onBookingSuccess,
  onNavigateToLocation,
}) => {
  // Steps: 1: Party & Seating -> 2: Date & Time -> 3: Guest Info & Personalization -> 4: Confirmed
  const [step, setStep] = useState<number>(1);

  // Form State
  const [partySize, setPartySize] = useState<number>(initialPartySize);
  const [seatingArea, setSeatingArea] = useState<SeatingArea>('main_dining');
  
  const todayStr = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState<string>(initialDate || todayStr);
  const [time, setTime] = useState<string>(initialTime);

  // Guest Details
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [occasion, setOccasion] = useState<string>('Casual Fine Dining');
  const [dietary, setDietary] = useState<string[]>([]);
  const [winePairing, setWinePairing] = useState<boolean>(false);
  const [specialRequests, setSpecialRequests] = useState<string>('');

  // Confirmed booking state
  const [confirmedBooking, setConfirmedBooking] = useState<Reservation | null>(null);

  // Form validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialPartySize) setPartySize(initialPartySize);
    if (initialDate) setDate(initialDate);
    if (initialTime) setTime(initialTime);
  }, [initialPartySize, initialDate, initialTime]);

  const lunchSlots = ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM'];
  const dinnerSlots = [
    '5:30 PM', 
    '6:00 PM', 
    '6:30 PM', 
    '7:00 PM', 
    '7:30 PM', 
    '8:00 PM', 
    '8:30 PM', 
    '9:00 PM', 
    '9:30 PM'
  ];

  const occasions = [
    'Casual Fine Dining',
    'Romantic Date Night',
    'Anniversary Celebration',
    'Birthday Celebration',
    'Executive Business Dinner',
    'Proposal / Engagement',
    'Degustation Tasting Immersion',
  ];

  const dietaryOptions = [
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Nut Allergy',
    'Shellfish Allergy',
    'Dairy-Free',
    'Halal Friendly',
    'Pescatarian',
  ];

  const handleDietaryToggle = (item: string) => {
    setDietary((prev) =>
      prev.includes(item) ? prev.filter((d) => d !== item) : [...prev, item]
    );
  };

  const validateStep3 = () => {
    const errs: { [key: string]: string } = {};
    if (!guestName.trim()) errs.name = 'Please provide the guest name.';
    if (!guestEmail.trim() || !guestEmail.includes('@')) errs.email = 'Please provide a valid email for confirmation.';
    if (!guestPhone.trim() || guestPhone.length < 7) errs.phone = 'Please provide a contact phone number.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    const randomRef = 'AUR-' + Math.floor(10000 + Math.random() * 90000);
    const newReservation: Reservation = {
      id: 'res-' + Date.now(),
      bookingRef: randomRef,
      createdAt: new Date().toISOString(),
      guestName,
      guestEmail,
      guestPhone,
      partySize,
      date,
      time,
      seatingArea,
      occasion,
      dietaryRequirements: dietary,
      specialRequests,
      winePairingSelected: winePairing,
      status: 'confirmed',
    };

    setConfirmedBooking(newReservation);
    onBookingSuccess(newReservation);
    setStep(4);

    // Fire celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#c5a059', '#e5c07b', '#ffffff', '#ffd700'],
      });
    } catch {
      // safe fallback
    }
  };

  const getCalendarLink = () => {
    if (!confirmedBooking) return '#';
    const title = encodeURIComponent(`Reservation at Aurelia Fine Dining (${confirmedBooking.bookingRef})`);
    const details = encodeURIComponent(
      `Table for ${confirmedBooking.partySize} guests in ${SEATING_ZONES.find(z => z.id === confirmedBooking.seatingArea)?.name}.\nOccasion: ${confirmedBooking.occasion}\nDress Code: Smart Elegant\nAddress: ${RESTAURANT_INFO.address}`
    );
    const location = encodeURIComponent(`${RESTAURANT_INFO.name}, ${RESTAURANT_INFO.address}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <section id="reservation-section" className="py-24 bg-[#0c0d11] relative text-[#f2ede4] min-h-screen flex flex-col justify-center">
      {/* Background ambient accents */}
      <div className="absolute inset-0 bg-radial-at-t from-[#c5a059]/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181a24] border border-[#302b21] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#c5a059] font-semibold">
              Instant Table Guarantee
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#f8f5ee] tracking-tight mb-2">
            Online Table Reservation
          </h2>
          <p className="text-[#a69c8a] text-sm sm:text-base font-light">
            Reserve your bespoke culinary experience at Aurelia. All bookings include personalized tableside hospitality.
          </p>
        </div>

        {/* Multi-step progress bar */}
        {step < 4 && (
          <div className="mb-10">
            <div className="flex items-center justify-between relative max-w-xl mx-auto">
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[2px] bg-[#222530] z-0" />
              <div
                className="absolute top-1/2 -translate-y-1/2 left-0 h-[2px] bg-gradient-to-r from-[#c5a059] to-[#e5c07b] z-0 transition-all duration-500"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              />

              {[
                { s: 1, label: 'Table & Guests' },
                { s: 2, label: 'Date & Time' },
                { s: 3, label: 'Details & Dining' },
              ].map((st) => (
                <div key={st.s} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      step >= st.s
                        ? 'bg-[#c5a059] text-black shadow-lg shadow-[#c5a059]/30'
                        : 'bg-[#181a24] text-[#8c8270] border border-[#2b2f3d]'
                    }`}
                  >
                    {st.s}
                  </div>
                  <span className={`text-[11px] mt-1.5 font-medium tracking-wider uppercase ${
                    step >= st.s ? 'text-[#e5c07b]' : 'text-[#6e6657]'
                  }`}>
                    {st.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Selected Menu Item Notice (if initiated from a specific dish/course) */}
        {selectedMenuItem && step < 4 && (
          <div className="mb-6 p-4 rounded-xl bg-[#161822] border border-[#c5a059]/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <UtensilsCrossed className="w-4 h-4 text-[#c5a059]" />
              <div>
                <p className="text-xs text-[#c5a059] font-medium">Selected Experience Inquiry</p>
                <p className="text-sm font-serif text-[#f2ede4] font-medium">{selectedMenuItem.name} (${selectedMenuItem.price})</p>
              </div>
            </div>
            <span className="text-xs px-2.5 py-1 bg-[#252838] text-[#d6cdbe] rounded-full">
              Pre-noted
            </span>
          </div>
        )}

        {/* STEP 1: PARTY SIZE & SEATING ZONE */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="bg-[#12141c] border border-[#262938] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-8"
          >
            {/* Party Size Selector */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#a89d8b] font-semibold mb-3">
                1. Select Number of Guests
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <button
                    key={num}
                    id={`party-size-btn-${num}`}
                    type="button"
                    onClick={() => setPartySize(num)}
                    className={`py-3 rounded-lg text-sm font-semibold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                      partySize === num
                        ? 'bg-[#c5a059] text-black shadow-lg shadow-[#c5a059]/25 scale-105'
                        : 'bg-[#181a24] text-[#d6cdbe] hover:bg-[#202432] border border-[#2b2f3d]'
                    }`}
                  >
                    <span>{num}</span>
                    <span className="text-[10px] font-normal opacity-80">
                      {num === 1 ? 'Solo' : num === 2 ? 'Pair' : 'Guests'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Seating Zones Interactive Cards */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#a89d8b] font-semibold mb-3">
                2. Choose Dining Atmosphere & Seating Area
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SEATING_ZONES.map((zone) => {
                  const isSelected = seatingArea === zone.id;
                  const isCapacityValid = partySize >= zone.minGuests && partySize <= zone.maxGuests;

                  return (
                    <div
                      key={zone.id}
                      id={`seating-zone-card-${zone.id}`}
                      onClick={() => {
                        if (isCapacityValid) setSeatingArea(zone.id);
                      }}
                      className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#1a1812] border-[#c5a059] shadow-lg shadow-[#c5a059]/10'
                          : isCapacityValid
                          ? 'bg-[#161822] border-[#262938] hover:border-[#3d382c] hover:bg-[#1a1d28]'
                          : 'bg-[#12141c]/50 border-[#1d202b] opacity-40 cursor-not-allowed'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-serif text-lg font-medium text-[#f8f5ee]">
                            {zone.name}
                          </span>
                          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#272a38] text-[#c5a059] font-medium border border-[#3b3528]">
                            {zone.badge}
                          </span>
                        </div>
                        <p className="text-xs text-[#c5a059]/90 italic mb-2">{zone.subtitle}</p>
                        <p className="text-xs text-[#9c917f] leading-relaxed font-light mb-3">
                          {zone.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#232634] flex items-center justify-between text-[11px] text-[#7a7263]">
                        <span>Capacity: {zone.minGuests}–{zone.maxGuests} guests</span>
                        {isSelected && (
                          <span className="text-[#c5a059] flex items-center gap-1 font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Selected
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Next Button */}
            <div className="flex justify-end pt-4 border-t border-[#232634]">
              <button
                id="reservation-step-1-next"
                type="button"
                onClick={() => setStep(2)}
                className="px-8 py-3.5 bg-gradient-to-r from-[#c5a059] to-[#9e7c38] text-black font-semibold text-xs tracking-widest uppercase rounded-sm hover:brightness-110 shadow-lg shadow-[#c5a059]/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to Date & Time</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: DATE & TIME SELECTION */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="bg-[#12141c] border border-[#262938] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-8"
          >
            {/* Date Picker */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label htmlFor="reservation-calendar-input" className="block text-xs uppercase tracking-widest text-[#a89d8b] font-semibold">
                  1. Select Reservation Date
                </label>
                <span className="text-xs text-[#c5a059]">Tables available for next 60 days</span>
              </div>

              <div className="bg-[#161822] border border-[#2b2f3e] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#202432] flex items-center justify-center text-[#c5a059]">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-[#8c8270]">Current Selection</p>
                    <p className="text-base font-serif text-[#f8f5ee] font-medium">
                      {new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                <input
                  type="date"
                  id="reservation-calendar-input"
                  min={todayStr}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-[#0c0d12] border border-[#303444] rounded-lg px-4 py-2.5 text-sm text-[#f2ede4] focus:outline-none focus:border-[#c5a059] cursor-pointer [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Time Slots */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#a89d8b] font-semibold mb-3">
                2. Select Service Time
              </label>

              {/* Dinner Slots */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-[#c5a059] uppercase tracking-wider">
                    Dinner Service (Haute Carte & Tasting)
                  </span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                  {dinnerSlots.map((slot) => {
                    const isSelected = time === slot;
                    return (
                      <button
                        key={slot}
                        id={`dinner-time-slot-${slot.replace(/[:\s]/g, '-')}`}
                        type="button"
                        onClick={() => setTime(slot)}
                        className={`py-3 px-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#c5a059] text-black font-bold shadow-md scale-105'
                            : 'bg-[#181a24] text-[#d6cdbe] hover:bg-[#202432] border border-[#2b2f3d]'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Lunch Slots */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-[#8c8270] uppercase tracking-wider">
                    Lunch Service (Salon Dining)
                  </span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                  {lunchSlots.map((slot) => {
                    const isSelected = time === slot;
                    return (
                      <button
                        key={slot}
                        id={`lunch-time-slot-${slot.replace(/[:\s]/g, '-')}`}
                        type="button"
                        onClick={() => setTime(slot)}
                        className={`py-3 px-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#c5a059] text-black font-bold shadow-md scale-105'
                            : 'bg-[#181a24] text-[#d6cdbe] hover:bg-[#202432] border border-[#2b2f3d]'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Back & Next Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-[#232634]">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-3 text-xs uppercase tracking-wider text-[#a89d8b] hover:text-white flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                id="reservation-step-2-next"
                type="button"
                onClick={() => setStep(3)}
                className="px-8 py-3.5 bg-gradient-to-r from-[#c5a059] to-[#9e7c38] text-black font-semibold text-xs tracking-widest uppercase rounded-sm hover:brightness-110 shadow-lg shadow-[#c5a059]/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to Guest Details</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: GUEST INFORMATION & PERSONALIZATION */}
        {step === 3 && (
          <motion.form
            onSubmit={handleConfirmReservation}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="bg-[#12141c] border border-[#262938] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-8"
          >
            {/* Booking Summary Pill */}
            <div className="p-4 rounded-xl bg-[#181a24] border border-[#2d3142] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-[#786f60] uppercase tracking-wider block text-[10px]">Party</span>
                <span className="text-[#f2ede4] font-medium">{partySize} Guests</span>
              </div>
              <div>
                <span className="text-[#786f60] uppercase tracking-wider block text-[10px]">Area</span>
                <span className="text-[#c5a059] font-medium">
                  {SEATING_ZONES.find((z) => z.id === seatingArea)?.name}
                </span>
              </div>
              <div>
                <span className="text-[#786f60] uppercase tracking-wider block text-[10px]">Date</span>
                <span className="text-[#f2ede4] font-medium">{date}</span>
              </div>
              <div>
                <span className="text-[#786f60] uppercase tracking-wider block text-[10px]">Time</span>
                <span className="text-[#f2ede4] font-medium">{time}</span>
              </div>
            </div>

            {/* Guest Contact Details */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-[#a89d8b] font-semibold">
                Guest Contact Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="guest-name-input" className="block text-xs text-[#8c8270] mb-1 font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="guest-name-input"
                    placeholder="e.g. Julian Dupont"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-[#161822] border border-[#2b2f3e] focus:border-[#c5a059] rounded-lg px-3.5 py-2.5 text-sm text-[#f2ede4] focus:outline-none"
                  />
                  {errors.name && <p className="text-red-400 text-[11px] mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="guest-email-input" className="block text-xs text-[#8c8270] mb-1 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="guest-email-input"
                    placeholder="e.g. julian@example.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full bg-[#161822] border border-[#2b2f3e] focus:border-[#c5a059] rounded-lg px-3.5 py-2.5 text-sm text-[#f2ede4] focus:outline-none"
                  />
                  {errors.email && <p className="text-red-400 text-[11px] mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="guest-phone-input" className="block text-xs text-[#8c8270] mb-1 font-medium">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="guest-phone-input"
                    placeholder="e.g. +1 (555) 019-2834"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full bg-[#161822] border border-[#2b2f3e] focus:border-[#c5a059] rounded-lg px-3.5 py-2.5 text-sm text-[#f2ede4] focus:outline-none"
                  />
                  {errors.phone && <p className="text-red-400 text-[11px] mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Occasion Selector */}
            <div>
              <label htmlFor="occasion-select" className="block text-xs uppercase tracking-widest text-[#a89d8b] font-semibold mb-2">
                Dining Occasion
              </label>
              <select
                id="occasion-select"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="w-full bg-[#161822] border border-[#2b2f3e] rounded-lg px-3.5 py-2.5 text-sm text-[#f2ede4] focus:outline-none focus:border-[#c5a059] cursor-pointer"
              >
                {occasions.map((occ) => (
                  <option key={occ} value={occ} className="bg-[#161822]">
                    {occ}
                  </option>
                ))}
              </select>
            </div>

            {/* Dietary Requirements Checklist */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#a89d8b] font-semibold mb-2">
                Dietary Requirements & Allergies (Optional)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {dietaryOptions.map((opt) => {
                  const isChecked = dietary.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleDietaryToggle(opt)}
                      className={`px-3 py-2 rounded-lg text-xs text-left transition-all border flex items-center justify-between cursor-pointer ${
                        isChecked
                          ? 'bg-[#262218] border-[#c5a059] text-[#e5c07b] font-medium'
                          : 'bg-[#161822] border-[#2b2f3e] text-[#8c8270] hover:text-[#d6cdbe]'
                      }`}
                    >
                      <span>{opt}</span>
                      {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a059]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sommelier Wine Pairing Add-on */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-[#181a24] to-[#1e1c17] border border-[#3b3528] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2a261d] flex items-center justify-center text-[#c5a059] shrink-0">
                  <Wine className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-serif text-[#f8f5ee] font-medium">
                    Grand Cru Sommelier Wine Pairing
                  </p>
                  <p className="text-xs text-[#9c917f] font-light">
                    Hand-selected rare vintages paired specifically with each course ($135/guest).
                  </p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  id="wine-pairing-checkbox"
                  checked={winePairing}
                  onChange={(e) => setWinePairing(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#252838] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#c5a059]" />
              </label>
            </div>

            {/* Special Requests */}
            <div>
              <label htmlFor="special-requests-input" className="block text-xs uppercase tracking-widest text-[#a89d8b] font-semibold mb-1">
                Special Requests or Notes for Chef Julian
              </label>
              <textarea
                id="special-requests-input"
                rows={2}
                placeholder="e.g. Quiet corner table, celebratory dessert inscription, champagne on arrival..."
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="w-full bg-[#161822] border border-[#2b2f3e] focus:border-[#c5a059] rounded-lg p-3 text-sm text-[#f2ede4] focus:outline-none"
              />
            </div>

            {/* Policy & Confirmation Row */}
            <div className="pt-4 border-t border-[#232634] space-y-4">
              <div className="flex items-start gap-2.5 text-xs text-[#8c8270]">
                <ShieldCheck className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <span>
                  No deposit charged today. Complimentary cancellation is accepted up to 24 hours prior to service.
                </span>
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-3 text-xs uppercase tracking-wider text-[#a89d8b] hover:text-white flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  id="reservation-submit-btn"
                  type="submit"
                  className="px-8 py-3.5 bg-gradient-to-r from-[#c5a059] to-[#9e7c38] text-black font-bold text-xs tracking-widest uppercase rounded-sm hover:brightness-110 shadow-xl shadow-[#c5a059]/30 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Confirm Reservation</span>
                </button>
              </div>
            </div>
          </motion.form>
        )}

        {/* STEP 4: INSTANT BOOKING CONFIRMATION PASS */}
        {step === 4 && confirmedBooking && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#12141c] border border-[#c5a059]/60 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black relative overflow-hidden"
          >
            {/* Gold Ribbon / Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-[#1f1d16] border-2 border-[#c5a059] flex items-center justify-center mx-auto mb-4 text-[#c5a059] shadow-lg shadow-[#c5a059]/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#c5a059] font-bold">
                Table Guaranteed & Confirmed
              </p>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#fbf8f2] mt-1">
                We Look Forward to Welcoming You
              </h3>
              <p className="text-[#a69c8a] text-xs sm:text-sm mt-1">
                A confirmation summary has been logged for <span className="text-[#f2ede4] font-medium">{confirmedBooking.guestEmail}</span>
              </p>
            </div>

            {/* Digital Pass / Reservation Ticket */}
            <div className="bg-[#0c0d12] border border-[#2b2f3d] rounded-2xl p-6 sm:p-8 space-y-6 mb-8 relative">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#1e222f] gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#786f60]">
                    Reservation Pass
                  </span>
                  <p className="font-serif text-2xl text-[#c5a059] font-semibold">
                    {confirmedBooking.bookingRef}
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#181b24] border border-[#2b2f3e] text-xs text-[#d6cdbe]">
                  <UtensilsCrossed className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>{SEATING_ZONES.find(z => z.id === confirmedBooking.seatingArea)?.name}</span>
                </div>
              </div>

              {/* Grid of details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
                <div>
                  <span className="text-xs text-[#786f60] block mb-1">Guest Name</span>
                  <span className="text-[#f2ede4] font-medium">{confirmedBooking.guestName}</span>
                </div>
                <div>
                  <span className="text-xs text-[#786f60] block mb-1">Party Size</span>
                  <span className="text-[#f2ede4] font-medium">{confirmedBooking.partySize} Guests</span>
                </div>
                <div>
                  <span className="text-xs text-[#786f60] block mb-1">Date</span>
                  <span className="text-[#f2ede4] font-medium">{confirmedBooking.date}</span>
                </div>
                <div>
                  <span className="text-xs text-[#786f60] block mb-1">Seating Time</span>
                  <span className="text-[#f2ede4] font-medium">{confirmedBooking.time}</span>
                </div>
              </div>

              {/* Notes & Pairing Row */}
              <div className="pt-4 border-t border-[#1e222f] text-xs space-y-2 text-[#a89d8b]">
                <p>
                  <span className="text-[#786f60]">Occasion:</span> {confirmedBooking.occasion}
                </p>
                {confirmedBooking.dietaryRequirements.length > 0 && (
                  <p>
                    <span className="text-[#786f60]">Dietary Notes:</span>{' '}
                    {confirmedBooking.dietaryRequirements.join(', ')}
                  </p>
                )}
                {confirmedBooking.winePairingSelected && (
                  <p className="text-[#e5c07b]">
                    ✓ Sommelier Grand Cru Wine Pairing Reserved
                  </p>
                )}
                {confirmedBooking.specialRequests && (
                  <p>
                    <span className="text-[#786f60]">Special Requests:</span>{' '}
                    "{confirmedBooking.specialRequests}"
                  </p>
                )}
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={getCalendarLink()}
                target="_blank"
                rel="noreferrer"
                id="booking-add-calendar-btn"
                className="px-5 py-3 rounded bg-[#1c1f2a] hover:bg-[#252938] text-xs tracking-wider uppercase font-semibold text-[#f2ede4] border border-[#3b3528] transition-colors flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#c5a059]" />
                <span>Add to Calendar</span>
              </a>

              <button
                id="booking-view-location-btn"
                onClick={onNavigateToLocation}
                className="px-5 py-3 rounded bg-[#1c1f2a] hover:bg-[#252938] text-xs tracking-wider uppercase font-semibold text-[#f2ede4] border border-[#3b3528] transition-colors flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-[#c5a059]" />
                <span>View Google Map & Valet Directions</span>
              </button>

              <button
                id="booking-make-another-btn"
                onClick={() => {
                  setStep(1);
                  setConfirmedBooking(null);
                }}
                className="px-5 py-3 rounded bg-[#c5a059] hover:bg-[#d4af37] text-black text-xs tracking-wider uppercase font-bold transition-all shadow-md"
              >
                <span>Make Another Booking</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
