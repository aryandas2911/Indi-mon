import { Share2, X, MapPin, Users, MessageSquare, Plus, CheckCircle2, AlertCircle, ShoppingBag, Hotel, Utensils, Tent, Zap, ChevronRight, Star, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { HeritageSite, POI } from '../data/heritageSites';
import { useState } from 'react';

interface InfoScreenProps {
    site: HeritageSite;
    onBack: () => void;
}

const InfoScreen = ({ site, onBack }: InfoScreenProps) => {
    const [showNearby, setShowNearby] = useState(false);
    const [pointsFeedback, setPointsFeedback] = useState<number | null>(null);

    const handleVisitPOI = (poi: POI) => {
        setPointsFeedback(poi.points);
        setTimeout(() => setPointsFeedback(null), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-8 pt-12"
            onClick={onBack}
        >
            {/* Modal Container */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="w-full h-full max-w-7xl bg-[#0f172a] rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] flex border border-white/10 relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Points Feedback Overlay */}
                <AnimatePresence>
                    {pointsFeedback && (
                        <motion.div
                            initial={{ opacity: 0, y: 0, scale: 0.5 }}
                            animate={{ opacity: 1, y: -100, scale: 1.5 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center z-[100] pointer-events-none"
                        >
                            <div className="flex flex-col items-center">
                                <Zap size={48} className="text-indi-gold animate-pulse mb-2" />
                                <span className="text-4xl font-pixel text-indi-gold drop-shadow-[0_0_20px_rgba(245,158,11,0.8)]">
                                    +{pointsFeedback} WISDOM
                                </span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Close Button */}
                <button onClick={onBack} className="absolute top-6 right-6 z-50 p-2.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-white/10 transition-all hover:rotate-90">
                    <X size={24} />
                </button>

                {/* Left: Visuals & Core Info */}
                <div className="w-5/12 h-full bg-black relative flex flex-col">
                    <div className="flex-1 relative overflow-hidden group">
                        <img src={site.image || "/assets/temple.jpg"} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-[10s] ease-linear" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/20 to-transparent"></div>

                        <div className="absolute top-8 left-8 flex flex-col gap-2">
                            {site.status === 'Verified' ? (
                                <span className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 border border-green-500/40 text-green-400 text-[10px] font-bold uppercase tracking-widest rounded-full backdrop-blur-md shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                                    <CheckCircle2 size={12} />
                                    Verified Record
                                </span>
                            ) : (
                                <span className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 border border-blue-500/40 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-full backdrop-blur-md">
                                    <AlertCircle size={12} />
                                    Pending Validation
                                </span>
                            )}
                            {site.isRare && (
                                <span className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/20 border border-amber-500/40 text-amber-500 text-[10px] font-bold uppercase tracking-widest rounded-full backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                                    <Star size={12} fill="currentColor" />
                                    Rare Discovery
                                </span>
                            )}
                        </div>

                        <div className="absolute bottom-12 left-10 right-10">
                            <span className="text-indi-gold font-pixel text-[10px] uppercase tracking-[0.5em] mb-4 block opacity-70">Territory of {site.region}</span>
                            <h1 className="font-serif text-5xl text-white leading-tight mb-8 drop-shadow-2xl">{site.name}</h1>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex items-center gap-3 text-slate-300">
                                    <div className="p-2 bg-white/5 rounded-lg text-indi-gold">
                                        <MapPin size={16} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-pixel uppercase tracking-widest text-slate-500">Coordinates</span>
                                        <span className="font-pixel text-[10px] tracking-tighter">
                                            {site.coordinates?.[1]?.toFixed(4)}, {site.coordinates?.[0]?.toFixed(4)}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-slate-300">
                                    <div className="p-2 bg-white/5 rounded-lg text-indi-gold"><Users size={16} /></div>
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-pixel uppercase tracking-widest text-slate-500">Guardians</span>
                                        <span className="font-pixel text-[10px] tracking-tighter">{site.visitorCount?.toLocaleString() || 0} Visited</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Detailed Info & Community */}
                <div className="w-7/12 h-full flex flex-col bg-[#0b101b] relative overflow-hidden">
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-12 pb-32">
                        {/* Summary Section */}
                        <section className="mb-12">
                            <h3 className="font-serif text-2xl text-indi-gold italic mb-6 border-b border-indi-gold/20 pb-2 inline-block">Chronicler's Insight</h3>
                            <p className="text-slate-200 leading-relaxed font-serif text-xl italic opacity-80 border-l-2 border-indi-gold/30 pl-8 py-4 bg-white/5 rounded-r-2xl">
                                "{site.description}"
                            </p>
                            
                            {site.history && (
                                <div className="mt-8">
                                    <h4 className="text-indi-gold font-pixel text-[10px] uppercase tracking-widest mb-3">Significance</h4>
                                    <p className="text-slate-300 font-serif leading-relaxed">
                                        {site.history}
                                    </p>
                                </div>
                            )}

                            {site.activities && site.activities.length > 0 && (
                                <div className="mt-8">
                                    <h4 className="text-indi-gold font-pixel text-[10px] uppercase tracking-widest mb-3">Rituals & Endeavors</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {site.activities.map((activity, i) => (
                                            <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-slate-400 font-serif">
                                                {activity}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </section>

                        {/* Community Observations */}
                        <section>
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="font-serif text-2xl text-slate-200 flex items-center gap-3">
                                    <MessageSquare size={20} className="text-indi-gold" />
                                    Explorer Logs
                                </h3>

                                {/* Guardian Avatar Strip */}
                                <div className="flex items-center -space-x-2">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0b101b] bg-slate-800 overflow-hidden">
                                            <img src={`/assets/profile-pic (1).jpg`} className="w-full h-full object-cover opacity-60" />
                                        </div>
                                    ))}
                                    <div className="w-8 h-8 rounded-full border-2 border-[#0b101b] bg-slate-800 flex items-center justify-center text-[8px] font-bold text-slate-400">
                                        +{(site.visitorCount || 0) > 4 ? (site.visitorCount || 0) - 4 : 0}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {site.comments && site.comments.length > 0 ? (
                                    site.comments.map((comment) => (
                                        <div key={comment.id} className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 transition-all hover:bg-white/5">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="w-12 h-12 rounded-xl bg-slate-800 overflow-hidden border border-white/10 p-0.5">
                                                    <img src={comment.avatar || "/assets/profile-pic (1).jpg"} className="w-full h-full object-cover rounded-lg" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold text-slate-200 font-pixel tracking-wide">{comment.user}</h4>
                                                    <span className="text-[9px] text-indi-gold opacity-50 uppercase font-pixel tracking-widest">{comment.date}</span>
                                                </div>
                                            </div>
                                            <p className="text-slate-400 text-sm leading-relaxed font-serif italic mb-4">
                                                "{comment.text}"
                                            </p>
                                            {comment.image && (
                                                <div className="rounded-xl overflow-hidden border border-white/10 h-40 w-full">
                                                    <img src={comment.image} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-12 flex flex-col items-center justify-center text-slate-600 border border-white/5 bg-white/[0.02] rounded-2xl">
                                        <MessageSquare size={32} className="mb-4 opacity-10" />
                                        <p className="font-serif italic text-lg opacity-30">The archive awaits its first observation...</p>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Action Bar */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 pt-10 bg-gradient-to-t from-[#0b101b] via-[#0b101b] to-transparent border-t border-white/5 flex gap-4 z-20">
                        <button
                            onClick={(e) => { e.stopPropagation(); setShowNearby(true); }}
                            className="flex-1 py-4 bg-indi-gold hover:bg-amber-400 text-black rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 active:scale-95"
                        >
                            <Search size={18} />
                            Nearby Rituals
                        </button>
                        <button className="px-8 py-4 bg-[#1e293b] hover:bg-[#28354b] text-slate-200 rounded-2xl border border-white/10 flex items-center justify-center transition-all">
                            <Plus size={18} />
                        </button>
                        <button className="px-8 py-4 bg-[#1e293b] hover:bg-[#28354b] text-slate-200 rounded-2xl border border-white/10 flex items-center justify-center transition-all">
                            <Share2 size={18} />
                        </button>
                    </div>

                    {/* Nearby Discovery Overlay */}
                    <AnimatePresence>
                        {showNearby && (
                            <motion.div
                                initial={{ opacity: 0, y: '100%' }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: '100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="absolute inset-0 z-50 bg-[#0f172a] p-12 flex flex-col"
                            >
                                <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/10">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-indi-gold/10 rounded-2xl text-indi-gold">
                                            <Search size={24} />
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-serif text-white italic">Territorial Rituals</h2>
                                            <p className="text-[10px] font-pixel text-indi-gold opacity-60 uppercase tracking-[0.3em]">Mapping Synchronized Rituals in the Sector</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setShowNearby(false)}
                                        className="p-3 bg-white/5 rounded-full text-white hover:bg-white/10 transition-colors"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto custom-scrollbar pr-4">
                                    <div className="grid grid-cols-1 gap-6">
                                        {site.nearby?.map((poi) => (
                                            <motion.div
                                                key={poi.id}
                                                whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.05)' }}
                                                className="bg-white/5 border border-white/5 p-6 rounded-2xl flex items-center gap-6 cursor-pointer group transition-all"
                                                onClick={() => handleVisitPOI(poi)}
                                            >
                                                <div className={`p-5 rounded-2xl ${poi.type === 'shop' ? 'bg-rose-500/10 text-rose-500' :
                                                    poi.type === 'hotel' ? 'bg-blue-500/10 text-blue-500' :
                                                        poi.type === 'restaurant' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'
                                                    }`}>
                                                    {poi.type === 'shop' && <ShoppingBag size={28} />}
                                                    {poi.type === 'hotel' && <Hotel size={28} />}
                                                    {poi.type === 'restaurant' && <Utensils size={28} />}
                                                    {poi.type === 'activity' && <Tent size={28} />}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <h4 className="text-xl font-serif text-slate-100 italic group-hover:text-indi-gold transition-colors">{poi.name}</h4>
                                                        <span className="px-2 py-0.5 bg-black/40 rounded border border-white/10 text-[8px] font-pixel text-slate-500 uppercase">{poi.distance} AWAY</span>
                                                    </div>
                                                    <p className="text-sm text-slate-500 font-serif leading-relaxed line-clamp-1">{poi.description}</p>
                                                </div>
                                                <div className="flex flex-col items-end gap-2 text-right">
                                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-indi-gold/5 border border-indi-gold/20 rounded-full text-indi-gold group-hover:bg-indi-gold group-hover:text-black transition-all">
                                                        <Zap size={12} fill="currentColor" />
                                                        <span className="font-pixel text-[10px]">+{poi.points} XP</span>
                                                    </div>
                                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[8px] font-pixel text-slate-400">
                                                        Visit Now <ChevronRight size={10} />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )) || (
                                                <div className="py-20 flex flex-col items-center opacity-30 italic font-serif text-2xl">
                                                    "No nearby records found in this sector's grid."
                                                </div>
                                            )}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default InfoScreen;
