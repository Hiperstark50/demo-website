import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Search, 
  Wine, 
  Leaf, 
  Award, 
  ChefHat, 
  ChevronRight, 
  X, 
  Check, 
  Clock, 
  Layers
} from 'lucide-react';
import { MENU_ITEMS, TASTING_COURSES } from '../data/restaurantData';
import { MenuItem } from '../types';

interface MenuSectionProps {
  onReserveWithItem?: (item: MenuItem) => void;
  onOpenReservation: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onReserveWithItem,
  onOpenReservation,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedDietary, setSelectedDietary] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showTastingModal, setShowTastingModal] = useState<boolean>(false);
  const [activeTastingIndex, setActiveTastingIndex] = useState<number>(0);

  const categories = [
    { id: 'all', label: 'Complete Collection' },
    { id: 'tasting_course', label: 'Grand Tasting Menus' },
    { id: 'starters', label: 'Entrées & Starters' },
    { id: 'mains', label: 'Mains & Binchotan' },
    { id: 'desserts', label: 'Douceurs & Desserts' },
    { id: 'wines_cocktails', label: 'Grand Cellar & Bar' },
  ];

  const dietaryFilters = [
    { id: 'all', label: 'All Dishes' },
    { id: 'chef_signature', label: "Chef's Signature", icon: Award },
    { id: 'vegetarian', label: 'Vegetarian / Plant', icon: Leaf },
    { id: 'gluten_free', label: 'Gluten-Free Friendly' },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Dietary filter
      if (selectedDietary !== 'all') {
        if (selectedDietary === 'chef_signature' && !item.dietary.includes('chef_signature')) return false;
        if (selectedDietary === 'vegetarian' && !item.dietary.includes('vegetarian') && !item.dietary.includes('vegan')) return false;
        if (selectedDietary === 'gluten_free' && !item.dietary.includes('gluten_free')) return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchFrench = item.frenchName?.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchIng = item.ingredients.some((i) => i.toLowerCase().includes(q));
        return matchName || matchFrench || matchDesc || matchIng;
      }
      return true;
    });
  }, [activeCategory, selectedDietary, searchQuery]);

  return (
    <section id="menu-section" className="py-24 bg-[#0a0b0e] relative text-[#f2ede4] overflow-hidden">
      {/* Decorative subtle ambient lights */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#c5a059]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181a24] border border-[#302b21] mb-4">
            <ChefHat className="w-3.5 h-3.5 text-[#c5a059]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#c5a059] font-semibold">
              Seasonal Culinary Repertoire
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[#f8f5ee] tracking-tight mb-4">
            The Autumn-Winter Carte
          </h2>
          <p className="text-[#a89d8b] text-base sm:text-lg font-light leading-relaxed max-w-xl mx-auto">
            Sourced daily from coastal line fishermen, heritage Japanese purveyors, and local biodynamic micro-farms.
          </p>

          {/* Interactive 7-Course Degustation Banner CTA */}
          <div className="mt-8">
            <button
              id="menu-open-degustation-tour-btn"
              onClick={() => setShowTastingModal(true)}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#1c1f2a]/90 hover:bg-[#252938] border border-[#c5a059]/40 hover:border-[#c5a059] text-sm text-[#f0e7d8] transition-all shadow-lg hover:shadow-[#c5a059]/20 group cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#c5a059] group-hover:rotate-12 transition-transform" />
              <span>Explore the Interactive 7-Course Degustation Journey</span>
              <ChevronRight className="w-4 h-4 text-[#c5a059] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col gap-6 mb-12">
          {/* Category Tabs */}
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 scrollbar-none gap-2">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`menu-category-${cat.id}`}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 text-xs sm:text-sm tracking-wider uppercase whitespace-nowrap rounded-md transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#c5a059] text-black font-semibold shadow-md shadow-[#c5a059]/20'
                      : 'bg-[#151720] text-[#a69c8b] hover:text-[#f2ede4] hover:bg-[#1e212d] border border-[#272a36]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Subfilters & Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#1e212b]">
            {/* Dietary Chips */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              {dietaryFilters.map((df) => {
                const isSelected = selectedDietary === df.id;
                const IconComponent = df.icon;
                return (
                  <button
                    key={df.id}
                    id={`menu-dietary-${df.id}`}
                    onClick={() => setSelectedDietary(df.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#2b271d] border border-[#c5a059] text-[#e5c07b] font-medium'
                        : 'bg-[#12141c] border border-[#232633] text-[#8c8270] hover:text-[#d6cdbe]'
                    }`}
                  >
                    {IconComponent && <IconComponent className="w-3 h-3 text-[#c5a059]" />}
                    <span>{df.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-[#8c8270] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                id="menu-search-input"
                placeholder="Search ingredients, dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#12141c] border border-[#232633] focus:border-[#c5a059]/60 rounded-full pl-9 pr-8 py-1.5 text-xs text-[#f2ede4] placeholder-[#6b6455] focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8c8270] hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-[#12141c]/50 rounded-2xl border border-[#232633]">
            <p className="text-[#8c8270] text-sm">No dishes found matching your criteria.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSelectedDietary('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs text-[#c5a059] border border-[#c5a059]/30 rounded hover:bg-[#c5a059]/10"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                id={`menu-item-card-${item.id}`}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.4 }}
                className="bg-[#12141c] hover:bg-[#161822] border border-[#232633] hover:border-[#3d382c] rounded-2xl overflow-hidden flex flex-col justify-between transition-all group shadow-xl hover:shadow-2xl hover:shadow-black/60"
              >
                {/* Dish Visual Header (if item has an image) */}
                {item.image && (
                  <div className="relative h-56 sm:h-64 overflow-hidden bg-[#181a24]">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12141c] via-transparent to-transparent" />
                    
                    {/* Badge Pill */}
                    {item.dietary.includes('chef_signature') && (
                      <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0c0d10]/85 border border-[#c5a059]/60 backdrop-blur-md">
                        <Award className="w-3.5 h-3.5 text-[#e5c07b]" />
                        <span className="text-[10px] tracking-widest uppercase text-[#e5c07b] font-bold">
                          Chef's Signature
                        </span>
                      </div>
                    )}

                    {item.coursesCount && (
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#181a24]/90 border border-[#40392b] text-[10px] tracking-wider uppercase text-[#d6cdbe] font-medium backdrop-blur-md">
                        {item.coursesCount} Courses
                      </div>
                    )}
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Title & Price Row */}
                    <div className="flex items-baseline justify-between gap-4 mb-1">
                      <h3 className="font-serif text-xl sm:text-2xl text-[#f8f5ee] font-medium group-hover:text-[#e5c07b] transition-colors">
                        {item.name}
                      </h3>
                      <span className="font-serif text-xl sm:text-2xl font-semibold text-[#c5a059] shrink-0">
                        ${item.price}
                      </span>
                    </div>

                    {/* French Name Subtitle */}
                    {item.frenchName && (
                      <p className="font-serif italic text-xs text-[#8c8270] mb-3">
                        {item.frenchName}
                      </p>
                    )}

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#b8ad9d] font-light leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Ingredients list */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.ingredients.map((ing, i) => (
                        <span
                          key={i}
                          className="text-[11px] px-2 py-0.5 rounded bg-[#181b24] text-[#9e9484] border border-[#272a36]"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Sommelier Pairing & Booking Action */}
                  <div className="pt-4 border-t border-[#1e212b] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    {item.pairing ? (
                      <div className="flex items-center gap-2 text-xs text-[#c5a059]/90 font-light">
                        <Wine className="w-3.5 h-3.5 shrink-0 text-[#c5a059]" />
                        <span className="truncate max-w-[260px]">{item.pairing}</span>
                      </div>
                    ) : (
                      <div className="text-[11px] text-[#786f60]">Seasonal Selection</div>
                    )}

                    <button
                      id={`menu-item-reserve-btn-${item.id}`}
                      onClick={() => {
                        if (onReserveWithItem) onReserveWithItem(item);
                        else onOpenReservation();
                      }}
                      className="px-3.5 py-1.5 rounded bg-[#1e212d] hover:bg-[#c5a059] text-[#e5c07b] hover:text-black text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 self-end sm:self-auto cursor-pointer"
                    >
                      <span>Reserve Table</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Tasting Menu Experience Modal / Interactive Stepper */}
        <AnimatePresence>
          {showTastingModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowTastingModal(false)}
                className="absolute inset-0 bg-black/85 backdrop-blur-md"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative z-10 w-full max-w-4xl bg-[#101217] border border-[#3b3528] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
              >
                {/* Modal Header */}
                <div className="p-6 border-b border-[#252834] flex items-center justify-between bg-[#151720]">
                  <div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#c5a059]" />
                      <span className="text-xs uppercase tracking-[0.2em] text-[#c5a059] font-semibold">
                        Degustation Walkthrough
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl text-[#f8f5ee]">
                      The 7-Course Aurelia Grand Degustation ($245)
                    </h3>
                  </div>

                  <button
                    id="modal-close-tasting-btn"
                    onClick={() => setShowTastingModal(false)}
                    className="p-2 rounded-full text-[#8c8270] hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Stepper Tabs */}
                <div className="flex items-center overflow-x-auto bg-[#0d0e12] px-6 py-3 border-b border-[#20222d] gap-2">
                  {TASTING_COURSES.map((course, idx) => (
                    <button
                      key={course.courseNumber}
                      onClick={() => setActiveTastingIndex(idx)}
                      className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                        activeTastingIndex === idx
                          ? 'bg-[#c5a059] text-black font-bold shadow'
                          : 'bg-[#181a24] text-[#8c8270] hover:text-[#d6cdbe]'
                      }`}
                    >
                      <span>Course {course.courseNumber}</span>
                    </button>
                  ))}
                </div>

                {/* Stepper Content */}
                <div className="p-6 sm:p-8 overflow-y-auto flex-1 flex flex-col justify-between">
                  {(() => {
                    const curr = TASTING_COURSES[activeTastingIndex];
                    return (
                      <motion.div
                        key={curr.courseNumber}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-serif italic text-[#c5a059] tracking-widest uppercase">
                            {curr.courseName}
                          </span>
                          <span className="text-xs text-[#786f60]">
                            Course {curr.courseNumber} of {TASTING_COURSES.length}
                          </span>
                        </div>

                        <h4 className="font-serif text-3xl sm:text-4xl text-[#fbf8f2]">
                          {curr.title}
                        </h4>

                        <p className="text-base sm:text-lg text-[#d4cbbe] font-light leading-relaxed">
                          {curr.description}
                        </p>

                        <div className="p-4 rounded-xl bg-[#161822] border border-[#2b2f3d] flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-[#202432] flex items-center justify-center text-[#c5a059] shrink-0">
                            <Wine className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-[11px] uppercase tracking-wider text-[#a59a86] font-semibold">
                              Sommelier Vintage Cru Pairing
                            </p>
                            <p className="text-sm font-serif text-[#f2ede4] font-medium">
                              {curr.winePairing}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })()}
                </div>

                {/* Modal Footer Controls */}
                <div className="p-6 bg-[#151720] border-t border-[#252834] flex items-center justify-between">
                  <button
                    disabled={activeTastingIndex === 0}
                    onClick={() => setActiveTastingIndex((prev) => Math.max(0, prev - 1))}
                    className="px-4 py-2 text-xs uppercase tracking-wider text-[#d6cdbe] disabled:opacity-30 disabled:cursor-not-allowed hover:text-white"
                  >
                    Previous Course
                  </button>

                  <div className="flex items-center gap-3">
                    {activeTastingIndex < TASTING_COURSES.length - 1 ? (
                      <button
                        onClick={() => setActiveTastingIndex((prev) => prev + 1)}
                        className="px-5 py-2.5 bg-[#252938] hover:bg-[#303548] text-xs uppercase tracking-widest text-[#f2ede4] font-semibold rounded-sm transition-colors cursor-pointer"
                      >
                        Next Course
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setShowTastingModal(false);
                          onOpenReservation();
                        }}
                        className="px-6 py-2.5 bg-[#c5a059] hover:bg-[#d4af37] text-black text-xs uppercase tracking-widest font-bold rounded-sm transition-all shadow-lg cursor-pointer"
                      >
                        Book Degustation
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
