
import { Search, Map } from 'lucide-react';
import { motion } from 'framer-motion';

const HeritageDexScreen = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full bg-[#0b101b] text-slate-100 flex font-sans overflow-hidden"
        >
            {/* Left Panel: Search & Filters (Fixed width) */}
            <div className="w-[320px] h-full border-r border-white/5 bg-[#0f172a] flex flex-col z-10 shrink-0 shadow-xl">
                <div className="p-6 border-b border-white/5">
                    <h2 className="font-serif text-2xl tracking-wide text-indi-gold mb-1">Grantha</h2>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">Heritage-Dex System</p>

                    <div className="mt-6 relative">
                        <Search className="absolute left-3 top-2.5 text-slate-500" size={14} />
                        <input
                            type="text"
                            placeholder="Search archives..."
                            className="w-full bg-[#1e293b] border border-white/10 rounded-lg py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-indi-gold/50 text-slate-300 placeholder:text-slate-600 font-serif"
                        />
                    </div>
                </div>

                {/* Stats Widget */}
                <div className="p-6 pt-2">
                    <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-4 rounded-xl border border-indi-gold/20 shadow-lg">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-[9px] uppercase text-slate-400 font-bold tracking-wider">Total Discovered</span>
                            <Map size={14} className="text-indi-gold opacity-50" />
                        </div>
                        <div className="flex items-baseline gap-2 mb-3">
                            <span className="text-3xl font-serif text-indi-gold">42</span>
                            <span className="text-sm text-slate-600">/ 108</span>
                        </div>
                        <div className="text-[10px] text-amber-500/80 mb-1">Regional Mastery: Hampi</div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 w-[85%]"></div>
                        </div>
                    </div>
                </div>

                {/* Filter List */}
                <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-1">
                    <FilterItem label="All Scrolls" active count={42} />
                    <FilterItem label="Hampi Region" count={12} />
                    <FilterItem label="Ajanta Caves" count={5} />
                    <FilterItem label="Konark Temple" count={8} />
                    <FilterItem label="Undiscovered" count={66} isGray />
                </div>
            </div>

            {/* Right Panel: Content Grid (Scrollable) */}
            <div className="flex-1 bg-[#0b101b] p-8 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-12">
                    <DexCard
                        title="The Stone Chariot"
                        desc="A shrine built in the form of a temple chariot. Legend says the wheels could once turn..."
                        img="/assets/temple.jpg"
                        tags={['Rare Find', 'Discovered: 12 Oct']}
                        isRare
                    />
                    <DexCard
                        title="Virupaksha Tower"
                        desc="The main shrine dedicated to Lord Virupaksha. The tower casts an inverted shadow in the inner sanctum."
                        img="/assets/temple (2).jpg"
                        tags={['Common', 'Verified']}
                    />
                    <DexCard
                        title="Lotus Mahal"
                        desc="Zenana Enclosure's primary palace with lotus-like archways."
                        img="/assets/temple.jpg"
                        tags={['Common', 'Verified']}
                    />

                    {/* Undiscovered */}
                    <div className="bg-slate-900/30 rounded-xl p-6 border border-white/5 flex gap-6 opacity-60 hover:opacity-100 transition-opacity border-dashed">
                        <div className="w-32 h-32 bg-slate-800 rounded-lg flex items-center justify-center text-slate-700 text-4xl font-serif shrink-0">?</div>
                        <div className="flex-1 py-2">
                            <div className="h-6 w-32 bg-slate-800 rounded mb-4"></div>
                            <div className="h-4 w-full bg-slate-800/50 rounded mb-2"></div>
                            <div className="h-4 w-2/3 bg-slate-800/50 rounded mb-4"></div>
                            <p className="text-xs text-indigo-400 italic">"Hints suggest this artifact lies near the Tungabhadra river..."</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

const FilterItem = ({ label, active, count }: any) => (
    <button className={`w-full flex justify-between items-center px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${active ? 'bg-indi-gold text-black shadow-lg shadow-amber-900/20' : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'}`}>
        <span>{label}</span>
        <span className={`${active ? 'bg-black/20 text-black' : 'bg-white/10 text-slate-400'} px-2 py-0.5 rounded text-[10px]`}>{count}</span>
    </button>
)

const DexCard = ({ title, desc, img, tags, isRare }: { title: string, desc: string, img: string, tags: string[], isRare?: boolean }) => (
    <div className="bg-[#fdf6e3] rounded-xl overflow-hidden text-slate-900 shadow-xl relative group hover:-translate-y-1 transition-transform duration-300 h-full flex flex-col">
        <div className="p-4 flex gap-5 h-full">
            <div className="w-32 h-32 bg-slate-200 rounded-lg shrink-0 overflow-hidden border border-amber-900/20 shadow-inner">
                <img src={img} className="w-full h-full object-cover sepia-[.3] group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start">
                        <h3 className="font-serif text-2xl leading-none text-amber-950 mb-2 truncate">{title}</h3>
                        <span className="text-[9px] font-bold bg-black text-white px-1.5 py-0.5 rounded ml-2 shrink-0">HAMPI</span>
                    </div>
                    <p className="text-xs text-amber-900/80 italic leading-snug line-clamp-3 font-serif pr-6">{desc}</p>
                </div>

                <div className="flex items-center gap-3 mt-3">
                    {tags.map((t, i) => (
                        <span key={i} className={`text-[10px] font-bold uppercase tracking-wider ${isRare && i === 0 ? 'text-amber-700 flex items-center gap-1' : 'text-slate-500'}`}>
                            {isRare && i === 0 && <span className="w-1.5 h-1.5 bg-amber-600 rounded-full inline-block"></span>}
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </div>

        {/* Rare Seal */}
        {isRare && (
            <div className="absolute top-10 right-4 w-16 h-16 rounded-full border-2 border-amber-800/30 text-[9px] text-amber-900/40 flex items-center justify-center font-bold uppercase -rotate-12 border-dashed pointer-events-none">
                Royal Seal
            </div>
        )}
    </div>
);

export default HeritageDexScreen;
