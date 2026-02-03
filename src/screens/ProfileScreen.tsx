import React from 'react';
import { Award, Leaf, Droplet, Lock, Compass, Medal, Castle } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfileScreen = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full bg-[#0b101b] text-slate-100 flex flex-col font-sans overflow-y-auto"
        >
            {/* Header Profile Section */}
            <div className="pt-10 pb-6 flex flex-col items-center relative z-10">
                <div className="relative group cursor-pointer">
                    <div className="w-28 h-28 rounded-full border-[3px] border-indi-gold overflow-hidden bg-gray-800 shadow-[0_0_25px_rgba(245,158,11,0.25)] transition-transform transform group-hover:scale-105">
                        <img src="/assets/profile-pic (1).jpg" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-2 -right-0 bg-[#0f172a] text-indi-gold font-bold rounded-full w-9 h-9 flex items-center justify-center border border-indi-gold font-pixel text-lg shadow-lg">
                        42
                    </div>
                    {/* Badge icon */}
                    <div className="absolute -top-1 -right-4 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full p-1.5 shadow-lg border border-white/20">
                        <Medal className="text-white w-5 h-5" />
                    </div>
                </div>

                <h2 className="mt-5 text-4xl font-serif text-indi-gold tracking-wide drop-shadow-lg">Explorer</h2>
                <p className="text-slate-400 font-serif text-sm tracking-[0.2em] uppercase mt-1 border-b border-indi-gold/30 pb-1">Grand Sage</p>
            </div>

            {/* Level Progress */}
            <div className="px-5 mb-8 w-full">
                <div className="bg-[#131b2e] rounded-xl p-5 border border-white/5 shadow-xl relative overflow-hidden group">
                    {/* Decoration */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-indi-gold/5 rounded-bl-full"></div>

                    <div className="flex justify-between items-end mb-3 relative z-10">
                        <div>
                            <span className="text-[10px] text-indi-gold/80 font-bold tracking-widest uppercase block mb-1">Ascension Tier</span>
                            <span className="text-2xl font-serif text-white">Level 42</span>
                        </div>
                        <div className="text-right">
                            <span className="text-[9px] text-slate-500 block uppercase tracking-wider mb-1">XP to Next Enlightenment</span>
                            <span className="text-sm font-pixel text-slate-300">12,400 <span className="text-slate-600">/</span> 15,000</span>
                        </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-2.5 bg-slate-900 rounded-full overflow-hidden relative border border-white/5">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '82%' }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-700 via-amber-500 to-indi-gold shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                        ></motion.div>
                    </div>
                </div>
            </div>

            {/* Stamps of Merit */}
            <div className="px-5 mb-8 w-full fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center gap-3 mb-5 px-2">
                    <div className="h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent flex-1"></div>
                    <h3 className="text-indi-gold/70 font-serif text-xs tracking-[0.2em] uppercase">Stamps of Merit</h3>
                    <div className="h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent flex-1"></div>
                </div>

                <div className="grid grid-cols-4 gap-3">
                    <StampItem icon={<Leaf size={22} />} label="Forest Bound" active />
                    <StampItem icon={<Castle size={20} />} label="Citadel Key" active />
                    <StampItem icon={<Droplet size={20} />} label="Ganga Blessed" active />
                    <StampItem icon={<Lock size={16} />} label="Unknown" active={false} />
                </div>
            </div>

            {/* Voyage Logs */}
            <div className="px-5 pb-24 w-full fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center gap-3 mb-5 px-2">
                    <div className="h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent flex-1"></div>
                    <h3 className="text-indi-gold/70 font-serif text-xs tracking-[0.2em] uppercase">Voyage Logs</h3>
                    <div className="h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent flex-1"></div>
                </div>

                <div className="space-y-3">
                    <LogItem
                        icon={<Compass size={18} />}
                        title="Discovered Ancient Shrine of Hampi"
                        subtitle="Added 450 Wisdom to the record"
                        color="rose"
                    />
                    <LogItem
                        icon={<Medal size={18} />}
                        title="Reached Reputation Level 'Noble'"
                        subtitle="Honored by the Southern Tribes"
                        color="amber"
                    />
                </div>
            </div>
        </motion.div>
    );
};

const StampItem = ({ icon, label, active }: { icon: React.ReactNode, label: string, active: boolean }) => (
    <div className={`flex flex-col items-center gap-3 group ${active ? 'opacity-100' : 'opacity-50'}`}>
        <div className={`w-14 h-14 rounded-full border ${active ? 'border-amber-700/50 bg-gradient-to-b from-amber-900/20 to-transparent' : 'border-slate-700 bg-slate-800/30'} flex items-center justify-center ${active ? 'text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.1)]' : 'text-slate-600'} transition-all group-hover:scale-110`}>
            {icon}
        </div>
        <span className={`text-[9px] uppercase font-bold text-center leading-tight tracking-wide ${active ? 'text-amber-500/80' : 'text-slate-600'}`}>{label}</span>
    </div>
);

const LogItem = ({ icon, title, subtitle, color }: { icon: React.ReactNode, title: string, subtitle: string, color: string }) => {
    const isRose = color === 'rose';
    return (
        <div className="bg-[#131b2e] p-4 rounded-lg border border-white/5 flex gap-4 items-center shadow-sm hover:bg-[#1a2339] transition-colors cursor-pointer group">
            <div className={`w-10 h-10 rounded-full ${isRose ? 'bg-rose-900/20 text-rose-500 border-rose-900/30' : 'bg-amber-900/20 text-amber-500 border-amber-900/30'} border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
            <div>
                <h4 className="font-serif text-sm text-slate-200 group-hover:text-indi-gold transition-colors">{title}</h4>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">{subtitle}</p>
            </div>
        </div>
    );
};

export default ProfileScreen;
