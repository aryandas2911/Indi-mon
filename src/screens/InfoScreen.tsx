import {Share2, Eye, X } from 'lucide-react';
import { motion } from 'framer-motion';

const InfoScreen = ({ onBack }: { onBack: () => void }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full h-full flex items-center justify-center bg-black/60 backdrop-blur-sm p-8"
            onClick={onBack}
        >
            {/* Modal Container */}
            <div
                className="w-full h-full max-w-6xl bg-[#0f172a] rounded-2xl overflow-hidden shadow-2xl flex border border-white/10 relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button onClick={onBack} className="absolute top-4 right-4 z-50 p-2 bg-black/40 rounded-full text-white hover:bg-white/10 transition-colors">
                    <X size={20} />
                </button>

                {/* Left: Visuals */}
                <div className="w-1/2 h-full bg-black relative">
                    <img src="/assets/temple.jpg" className="w-full h-full object-cover opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent"></div>
                    <div className="absolute bottom-8 left-8 right-8">
                        <h1 className="font-serif text-5xl text-white leading-tight drop-shadow-lg mb-2">The Iron Pillar of Dhar</h1>
                        <div className="flex items-center gap-3">
                            <span className="px-2 py-1 bg-indi-gold text-black text-[10px] font-bold uppercase tracking-widest rounded">Legendary</span>
                            <span className="text-slate-300 font-pixel text-sm uppercase">Paramara Dynasty • 11th Century</span>
                        </div>
                    </div>
                </div>

                {/* Right: Info */}
                <div className="w-1/2 h-full p-10 flex flex-col bg-[#0b101b] relative overflow-hidden">
                    {/* Background Decor */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-indi-gold/5 rounded-full blur-3xl pointer-events-none"></div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-[#131b2e] p-4 rounded-xl border border-white/5">
                            <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-1">Wisdom (XP)</span>
                            <span className="text-2xl font-pixel text-indi-gold">+500</span>
                        </div>
                        <div className="bg-[#131b2e] p-4 rounded-xl border border-white/5">
                            <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-1">Location</span>
                            <span className="text-lg font-serif text-slate-200">Madhya Pradesh</span>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        <h3 className="font-serif text-xl text-slate-200 mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-indi-gold rounded-full"></span>
                            Codex Entry
                        </h3>
                        <p className="text-slate-400 leading-relaxed font-serif text-lg italic border-l-2 border-slate-700 pl-6 py-2 mb-6">
                            "Behold the legacy of King Bhoja. This pillar, forged from mysterious iron that defies the ravages of time and rust, stands as a silent testament to the metallurgical mastery of ancient Bharat. Inscribed with forgotten verses, it holds the secrets of the cosmos."
                        </p>

                        <p className="text-slate-500 text-sm leading-relaxed">
                            This structure was originally located at the Lat Masjid. It is one of the highest iron pillars of the medieval period. The pillar is made of wrought iron and is currently lying in three broken pieces.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="mt-8 flex gap-4 pt-6 border-t border-white/5">
                        <button className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm uppercase tracking-widest shadow-lg shadow-indigo-900/40 flex items-center justify-center gap-3 transition-colors group">
                            <Eye size={18} className="group-hover:scale-110 transition-transform" />
                            Inspect Inscription
                        </button>
                        <button className="px-6 py-4 bg-[#1e293b] hover:bg-[#28354b] text-slate-300 rounded-xl border border-white/10 flex items-center justify-center transition-colors">
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default InfoScreen;
