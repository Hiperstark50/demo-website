import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Navigation, 
  Car, 
  Shirt, 
  Sparkles, 
  Check, 
  Copy, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const LocationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${RESTAURANT_INFO.address}, ${RESTAURANT_INFO.city}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const encodedAddress = encodeURIComponent(`${RESTAURANT_INFO.name}, ${RESTAURANT_INFO.address}`);
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
  const googleMapsViewUrl = `https://maps.google.com/maps?q=${RESTAURANT_INFO.coordinates.lat},${RESTAURANT_INFO.coordinates.lng}&hl=en&z=15&output=embed`;

  return (
    <section id="location-section" className="py-24 bg-[#0a0b0e] relative text-[#f2ede4] overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#c5a059]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#1f2433]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181a24] border border-[#302b21] mb-4">
            <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#c5a059] font-semibold">
              Grand Promenade Location
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[#f8f5ee] tracking-tight mb-4">
            Arrival & Neighborhood
          </h2>
          <p className="text-[#a89d8b] text-base sm:text-lg font-light leading-relaxed max-w-xl mx-auto">
            Situated within the historic Arts District overlooking the Grand Promenade fountains. 
            Complimentary white-glove valet awaits upon arrival.
          </p>
        </div>

        {/* Main Grid: Google Map & Practical Information */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Google Map Container (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="bg-[#12141c] border border-[#262938] rounded-2xl overflow-hidden shadow-2xl flex-1 flex flex-col">
              
              {/* Map Top Bar */}
              <div className="px-5 py-3.5 bg-[#161822] border-b border-[#262938] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-[#f2ede4] font-medium">Google Maps Navigation</span>
                </div>

                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  id="map-open-native-btn"
                  className="text-xs text-[#c5a059] hover:underline flex items-center gap-1 font-medium"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Interactive Map Iframe */}
              <div className="relative w-full h-[380px] sm:h-[460px] bg-[#1a1d26]">
                <iframe
                  title="Aurelia Restaurant Google Map"
                  src={googleMapsViewUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(100%)' }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />

                {/* Floating Map Overlay Card */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-[#0e1015]/95 backdrop-blur-md border border-[#c5a059]/40 p-4 rounded-xl shadow-2xl max-w-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-serif text-base font-medium text-[#f8f5ee]">
                        {RESTAURANT_INFO.name}
                      </p>
                      <p className="text-xs text-[#a69c8a] mt-0.5">
                        {RESTAURANT_INFO.address}
                      </p>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#c5a059]/20 text-[#e5c07b] border border-[#c5a059]/40 shrink-0">
                      2 Stars
                    </span>
                  </div>

                  <div className="mt-3 pt-3 border-t border-[#252834] flex items-center gap-2">
                    <a
                      href={googleMapsDirectionsUrl}
                      target="_blank"
                      rel="noreferrer"
                      id="map-card-directions-btn"
                      className="flex-1 py-2 bg-[#c5a059] hover:bg-[#d4af37] text-black text-[11px] font-bold tracking-wider uppercase rounded text-center flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Directions</span>
                    </a>

                    <button
                      onClick={handleCopyAddress}
                      className="px-3 py-2 bg-[#1c1f2b] hover:bg-[#252938] text-xs text-[#d6cdbe] rounded border border-[#2d3244] flex items-center gap-1 transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span className="text-[11px]">{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Practical Info, Hours & Policies (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Contact & Address Card */}
            <div className="bg-[#12141c] border border-[#262938] rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="font-serif text-xl text-[#f8f5ee] font-medium pb-3 border-b border-[#1f222f] flex items-center justify-between">
                <span>Concierge & Reservations</span>
                <Sparkles className="w-4 h-4 text-[#c5a059]" />
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#c5a059] shrink-0 mt-1" />
                  <div>
                    <p className="text-xs text-[#786f60] uppercase tracking-wider">Address</p>
                    <p className="text-[#f2ede4] font-medium">{RESTAURANT_INFO.address}</p>
                    <p className="text-[#a69c8a] text-xs">{RESTAURANT_INFO.city}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#c5a059] shrink-0 mt-1" />
                  <div>
                    <p className="text-xs text-[#786f60] uppercase tracking-wider">Direct Concierge Phone</p>
                    <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-[#f2ede4] font-medium hover:text-[#c5a059]">
                      {RESTAURANT_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#c5a059] shrink-0 mt-1" />
                  <div>
                    <p className="text-xs text-[#786f60] uppercase tracking-wider">Inquiries & Events</p>
                    <a href={`mailto:${RESTAURANT_INFO.email}`} className="text-[#f2ede4] font-medium hover:text-[#c5a059]">
                      {RESTAURANT_INFO.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="bg-[#12141c] border border-[#262938] rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1f222f]">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#c5a059]" />
                  <h3 className="font-serif text-xl text-[#f8f5ee] font-medium">Service Hours</h3>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Open for Dinner
                </span>
              </div>

              <div className="space-y-3">
                {RESTAURANT_INFO.openingHours.map((sched, idx) => (
                  <div key={idx} className="text-xs pb-2 border-b border-[#1a1d28] last:border-none last:pb-0">
                    <p className="font-semibold text-[#e5c07b] mb-0.5">{sched.days}</p>
                    <div className="flex items-center justify-between text-[#a89d8b]">
                      <span>Lunch: {sched.lunch}</span>
                      <span>Dinner: {sched.dinner}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Valet & Dress Code Protocols */}
            <div className="bg-[#12141c] border border-[#262938] rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-start gap-3">
                <Car className="w-4 h-4 text-[#c5a059] shrink-0 mt-1" />
                <div className="text-xs">
                  <p className="font-semibold text-[#f2ede4] mb-0.5">Valet Parking</p>
                  <p className="text-[#a69c8a] leading-relaxed">{RESTAURANT_INFO.valetParking}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-[#1a1d28]">
                <Shirt className="w-4 h-4 text-[#c5a059] shrink-0 mt-1" />
                <div className="text-xs">
                  <p className="font-semibold text-[#f2ede4] mb-0.5">Dress Code Etiquette</p>
                  <p className="text-[#a69c8a] leading-relaxed">{RESTAURANT_INFO.dressCode}</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
