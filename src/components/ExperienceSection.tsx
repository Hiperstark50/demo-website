import React from 'react';
import { motion } from 'motion/react';
import { 
  Award, 
  Wine, 
  Flame, 
  Sparkles, 
  Quote, 
  Star, 
  ChefHat,
  HeartHandshake
} from 'lucide-react';
import { RESTAURANT_IMAGES, REVIEWS, SEATING_ZONES } from '../data/restaurantData';

interface ExperienceSectionProps {
  onOpenReservation: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  onOpenReservation,
}) => {
  return (
    <section id="experience-section" className="py-24 bg-[#0c0d11] relative text-[#f2ede4] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#c5a059]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#9e7c38]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-28">
        
        {/* Section 1: Culinary Philosophy & Executive Chef Julian Mercer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Chef Image & Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#3b3528] shadow-2xl bg-[#151720]">
              <img
                src={RESTAURANT_IMAGES.chef}
                alt="Executive Chef Julian Mercer"
                referrerPolicy="no-referrer"
                className="w-full h-[450px] object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d11] via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#12141c]/90 backdrop-blur-md border border-[#2d2922]">
                <p className="font-serif text-lg text-[#f8f5ee] font-medium">Julian Mercer</p>
                <p className="text-xs text-[#c5a059] uppercase tracking-widest">Executive Chef & Co-Founder</p>
              </div>
            </div>
            
            {/* Small decorative badge */}
            <div className="absolute -top-4 -right-4 bg-[#c5a059] text-black text-xs font-bold px-3.5 py-1.5 rounded-full shadow-xl flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>Two Michelin Stars</span>
            </div>
          </div>

          {/* Philosophy Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181a24] border border-[#302b21]">
              <ChefHat className="w-3.5 h-3.5 text-[#c5a059]" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#c5a059] font-semibold">
                Culinary Heritage & Vision
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#f8f5ee] leading-tight">
              Where Ancient Discipline Meets Modern Imagination
            </h2>

            <p className="text-sm sm:text-base text-[#bfb5a3] font-light leading-relaxed">
              At Aurelia, our cuisine is a love letter to time-honored craftsmanship. Having trained across Tokyo's Ginza kaiseki houses and Paris's legendary three-star institutions, Chef Julian Mercer merges pristine dashi extractions with complex French reductions.
            </p>

            <p className="text-sm sm:text-base text-[#bfb5a3] font-light leading-relaxed">
              Every ingredient arrives with provenance — from line-caught turbot from Brittany waters to heirloom vegetables nurtured by third-generation growers. We honor the ingredient by amplifying its purest essence.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#232634]">
              <div>
                <p className="font-serif text-3xl text-[#c5a059] font-medium">100%</p>
                <p className="text-xs text-[#8c8270] mt-0.5">Ethically Sourced Provenance</p>
              </div>
              <div>
                <p className="font-serif text-3xl text-[#c5a059] font-medium">1,200+</p>
                <p className="text-xs text-[#8c8270] mt-0.5">Curated Grand Cru Reserves</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Four Dining Atmospheres */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181a24] border border-[#302b21] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#c5a059] font-semibold">
                The Environments
              </span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#f8f5ee]">
              Four Unique Spatial Experiences
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SEATING_ZONES.map((zone) => (
              <div
                key={zone.id}
                className="bg-[#12141c] border border-[#252838] hover:border-[#c5a059]/60 rounded-2xl p-6 flex flex-col justify-between transition-all group shadow-xl"
              >
                <div>
                  <div className="text-xs text-[#c5a059] uppercase tracking-wider font-semibold mb-2">
                    {zone.badge}
                  </div>
                  <h4 className="font-serif text-xl text-[#f8f5ee] mb-1 group-hover:text-[#e5c07b] transition-colors">
                    {zone.name}
                  </h4>
                  <p className="text-xs text-[#8c8270] italic mb-3">{zone.subtitle}</p>
                  <p className="text-xs text-[#b8ad9d] font-light leading-relaxed mb-4">
                    {zone.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1f222f] text-xs text-[#8c8270]">
                  <p className="text-[#c5a059]">{zone.atmosphere}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Sommelier Cellar & Pairing Artistry */}
        <div className="bg-[#12141c] border border-[#2e2a22] rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1c15] border border-[#c5a059]/40 text-[#c5a059] text-xs">
                <Wine className="w-3.5 h-3.5" />
                <span className="uppercase tracking-widest font-semibold text-[10px]">The Wine Programme</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-[#f8f5ee]">
                A Living Cellar of Over 1,200 Rare Bottles
              </h3>

              <p className="text-sm text-[#b8ad9d] font-light leading-relaxed">
                Guided by Head Sommelier Élodie Laurent, our cellar houses coveted verticals of Romanée-Conti, Château Latour, and rare grower Champagnes, alongside biodynamic revelations from the volcanic slopes of Etna and Nagano.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <div className="p-3 bg-[#181a24] rounded-xl border border-[#2b2f3e]">
                  <p className="text-xs font-semibold text-[#f2ede4]">Coravin Program</p>
                  <p className="text-[11px] text-[#8c8270]">Iconic grand crus served by the glass</p>
                </div>
                <div className="p-3 bg-[#181a24] rounded-xl border border-[#2b2f3e]">
                  <p className="text-xs font-semibold text-[#f2ede4]">Bespoke Pairing</p>
                  <p className="text-[11px] text-[#8c8270]">Customized to each guest’s tasting tempo</p>
                </div>
              </div>

              <button
                onClick={onOpenReservation}
                className="px-6 py-3 bg-[#c5a059] hover:bg-[#d4af37] text-black text-xs font-bold tracking-widest uppercase rounded-sm transition-all shadow-lg cursor-pointer"
              >
                Reserve with Wine Pairing
              </button>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-[#3b3528] shadow-2xl">
                <img
                  src={RESTAURANT_IMAGES.cellar}
                  alt="Aurelia Grand Wine Cellar"
                  referrerPolicy="no-referrer"
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Accolades & Guest Reviews */}
        <div className="space-y-10">
          <div className="text-center max-w-xl mx-auto">
            <div className="flex items-center justify-center gap-1 text-[#e5c07b] mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <h3 className="font-serif text-3xl text-[#f8f5ee]">
              Critical Acclaim & Accolades
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="bg-[#12141c] border border-[#232634] rounded-2xl p-6 flex flex-col justify-between shadow-xl"
              >
                <div className="space-y-4">
                  <Quote className="w-6 h-6 text-[#c5a059]/60" />
                  <p className="text-xs sm:text-sm text-[#d4cbbe] italic leading-relaxed font-light">
                    "{rev.quote}"
                  </p>
                </div>

                <div className="pt-6 border-t border-[#1e212b] mt-6">
                  <p className="font-serif text-base text-[#f8f5ee] font-medium">{rev.author}</p>
                  <p className="text-xs text-[#c5a059]">{rev.title}</p>
                  <span className="text-[11px] text-[#786f60] block mt-1">{rev.source} • {rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
