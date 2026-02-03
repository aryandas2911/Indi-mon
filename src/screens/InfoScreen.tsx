import React from 'react';
import { ArrowLeft, Share2, MapPin, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const InfoScreen = ({ onBack }: { onBack: () => void }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="w-full h-full bg-[#0b101b] text-slate-100 flex flex-col font-sans overflow-y-auto z-50 relative custom-scrollbar"
        >
            {/* Header Image */}
            <div className="relative h-[40%] w-full bg-slate-800 shrink-0">
                <img src="/assets/temple.jpg" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b101b] to-transparent"></div>

                <button onClick={onBack} className="absolute top-6 left-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white border border-white/10 hover:bg-black/60 transition-colors z-20">
                    <ArrowLeft size={20} />
                </button>

                <div className="absolute bottom-4 left-5 right-5 z-10">
                    <h2 className="font-serif text-3xl text-white leading-tight drop-shadow-lg mb-1">The Iron Pillar of Dhar</h2>
                    <p className="text-indi-gold font-bold uppercase text-[10px] tracking-widest">Paramara Dynasty, 11th Century</p>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-2 px-5 py-4 border-b border-white/5 shrink-0">
                <div className="bg-[#131b2e] rounded-lg p-2 text-center border border-indi-gold/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]">
                    <span className="text-[9px] text-slate-500 uppercase block mb-1">Rarity Class</span>
                    <span className="font-serif text-indi-gold text-sm">Legendary</span>
                </div>
                <div className="bg-[#131b2e] rounded-lg p-2 text-center border border-white/5">
                    <span className="text-[9px] text-slate-500 uppercase block mb-1">Gyan (XP)</span>
                    <span className="font-serif text-white text-sm">+500</span>
                </div>
                <div className="bg-[#131b2e] rounded-lg p-2 text-center border border-white/5">
                    <span className="text-[9px] text-slate-500 uppercase block mb-1">Region</span>
                    <span className="font-serif text-white text-xs">Madhya Pradesh</span>
                </div>
            </div>

            {/* Codex Entry */}
            <div className="p-5 overflow-y-auto">
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-4 bg-indi-gold rounded-full"></div>
                    <h3 className="font-serif text-lg text-slate-200">Codex Entry</h3>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed font-serif italic border-l-2 border-slate-700 pl-4 py-1">
                    "Behold the legacy of King Bhoja. This pillar, forged from mysterious iron that defies the ravages of time and rust, stands as a silent testament to the metallurgical mastery of ancient Bharat."
                </p>

                <div className="mt-6 bg-[#131b2e] rounded-xl p-1 border border-white/5">
                    {/* Mini Map Placeholder */}
                    <div className="w-full h-24 bg-slate-800 rounded-lg overflow-hidden relative opacity-60">
                        <img src="/assets/map.png" className="w-full h-full object-cover" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <MapPin className="text-red-500 drop-shadow-lg" fill="currentColor" />
                        </div>
                    </div>
                    <div className="p-3 flex justify-between items-center">
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider">Coordinates Encrypted</span>
                        <button className="text-[10px] text-indi-gold flex items-center gap-1 hover:underline">
                            Related Quest <ArrowLeft size={10} className="rotate-180" />
                        </button>
                    </div>
                </div>

                <div className="h-20"></div> {/* Spacer */}
            </div>

            {/* Actions Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-5 pt-8 bg-gradient-to-t from-[#0b101b] to-transparent flex gap-3 z-20">
                <button className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold text-xs uppercase tracking-widest shadow-lg shadow-indigo-900/40 flex items-center justify-center gap-2 transition-colors">
                    <Eye size={16} /> Inspect Inscription
                </button>
                <button className="px-4 py-3 bg-[#1e293b] hover:bg-[#28354b] text-slate-300 rounded-lg border border-white/10 flex items-center justify-center transition-colors">
                    <Share2 size={18} />
                </button>
            </div>
        </motion.div>
    );
}

export default InfoScreen;
