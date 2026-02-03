import React from 'react';
import { Search, Bell, Map, Filter, User } from 'lucide-react';
import { motion } from 'framer-motion';

const HeritageDexScreen = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full bg-[#0b101b] text-slate-100 flex flex-col font-sans overflow-y-auto pb-24"
        >
            {/* Header */}
            <div className="bg-[#0f172a] p-5 pb-3 border-b border-white/5 sticky top-0 z-20">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-indi-gold/10 rounded-lg text-indi-gold">
                        <Map size={20} />
                    </div>
                    <div>
                        <h2 className="font-serif text-xl tracking-wide">Grantha of Knowledge</h2>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Heritage-Dex System</p>
                    </div>
                    <div className="ml-auto relative">
                        <Bell size={20} className="text-slate-400" />
                        <div className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full"></div>
                    </div>
                </div>

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-slate-500" size={14} />
                    <input
                        type="text"
                        placeholder="Find scrolls..."
                        className="w-full bg-[#1e293b] border border-white/10 rounded-full py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-indi-gold/50 text-slate-300 placeholder:text-slate-600 font-serif"
                    />
                </div>
            </div>

            {/* Stats Carousel */}
            <div className="p-5 flex gap-3 overflow-x-auto custom-scrollbar -mx-0 snap-x">
                <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-3 rounded-lg border border-indi-gold/20 min-w-[160px] snap-center">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-[9px] uppercase text-slate-400 font-bold tracking-wider">Collection Progress</span>
                        <Map size={12} className="text-indi-gold opacity-50" />
                    </div>
                    <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-2xl font-serif text-indi-gold">42</span>
                        <span className="text-xs text-slate-600">/ 108</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-indi-gold w-[38%]"></div>
                    </div>
                </div>

                <div className="bg-[#131b2e] p-3 rounded-lg border border-white/5 min-w-[160px] snap-center">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-[9px] uppercase text-slate-400 font-bold tracking-wider">Hampi Region</span>
                    </div>
                    <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-2xl font-serif text-amber-500">85%</span>
                        <span className="text-[9px] text-slate-600 uppercase">Mastery</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 w-[85%]"></div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="px-5 mb-4 flex gap-2 overflow-x-auto no-scrollbar">
                {['All Scrolls', 'Hampi', 'Ajanta', 'Konark'].map((f, i) => (
                    <button
                        key={f}
                        className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${i === 0 ? 'bg-indi-gold text-black' : 'bg-slate-800 text-slate-500 border border-white/5'}`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="px-5 space-y-4">
                {/* Card 1 */}
                <DexCard
                    title="The Stone Chariot"
                    desc="A shrine built in the form of a temple chariot. Legend says the wheels could once turn..."
                    img="/assets/temple.jpg" // Fallback
                    tags={['Rare Find', 'Discovered: 12 Oct']}
                    isRare
                />
                <DexCard
                    title="Virupaksha Tower"
                    desc="The main shrine dedicated to Lord Virupaksha. The tower casts an inverted shadow in the inner sanctum."
                    img="/assets/temple (2).jpg"
                    tags={['Common']}
                />

                {/* Undiscovered */}
                <div className="bg-slate-900/50 rounded-lg p-4 border border-white/5 flex gap-4 opacity-70">
                    <div className="w-16 h-16 bg-slate-800 rounded flex items-center justify-center text-slate-700 text-2xl font-serif">?</div>
                    <div className="flex-1">
                        <h3 className="font-serif text-slate-500">Undiscovered Relic</h3>
                        <p className="text-[10px] text-indigo-900 mt-1 italic">Hints suggest this artifact lies near the Tungabhadra river...</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

const DexCard = ({ title, desc, img, tags, isRare }: { title: string, desc: string, img: string, tags: string[], isRare?: boolean }) => (
    <div className="bg-[#fdf6e3] rounded-lg overflow-hidden text-slate-900 shadow-md relative group">
        <div className="p-3 pb-0 flex gap-4">
            <div className="w-20 h-20 bg-slate-200 rounded shrink-0 overflow-hidden border border-amber-900/20">
                <img src={img} className="w-full h-full object-cover sepia-[.3]" />
            </div>
            <div className="flex-1 min-w-0 py-1">
                <div className="flex justify-between items-start">
                    <h3 className="font-serif text-lg leading-tight text-amber-950 mb-1">{title}</h3>
                    {/* Hampi Tag */}
                    <span className="text-[9px] font-bold bg-black text-white px-1.5 py-0.5 rounded ml-2">HAMPI</span>
                </div>
                <p className="text-[10px] text-amber-900/80 italic leading-snug line-clamp-2 pr-8">{desc}</p>
            </div>
        </div>
        <div className="px-3 pb-3 pt-2 flex items-center gap-3">
            {tags.map((t, i) => (
                <span key={i} className={`text-[9px] font-bold uppercase ${isRare && i === 0 ? 'text-amber-700 flex items-center gap-1' : 'text-slate-500'}`}>
                    {isRare && i === 0 && <span className="w-1.5 h-1.5 bg-amber-600 rounded-full inline-block"></span>}
                    {t}
                </span>
            ))}
        </div>

        {/* Stamp */}
        {isRare && (
            <div className="absolute top-8 right-3 w-12 h-12 rounded-full border-2 border-amber-800/20 text-[8px] text-amber-900/30 flex items-center justify-center font-bold uppercase -rotate-12 border-dashed">
                Royal Seal
            </div>
        )}
    </div>
);

export default HeritageDexScreen;
