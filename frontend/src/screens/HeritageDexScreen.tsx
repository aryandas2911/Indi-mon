import { Search, Map, Info, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { heritageSites } from '../data/heritageSites';
import type { HeritageSite } from '../data/heritageSites';

const HeritageDexScreen = ({ onOpenInfo }: { onOpenInfo: (site: HeritageSite) => void }) => {
    const [activeFilter, setActiveFilter] = useState<'ALL' | 'DELHI' | 'KERALA' | 'RAJASTHAN' | 'UNDISCOVERED'>('ALL');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredSites = useMemo(() => {
        return heritageSites.filter(site => {
            const matchesSearch = site.name.toLowerCase().includes(searchQuery.toLowerCase());

            if (activeFilter === 'UNDISCOVERED') {
                return site.status === 'Undiscovered' && matchesSearch;
            }

            if (activeFilter === 'ALL') {
                // Show discovered sites, but we'll include undiscovered in the UI differently
                return site.status !== 'Undiscovered' && matchesSearch;
            }

            const regionFilterMap: Record<string, string> = {
                'DELHI': 'Delhi',
                'KERALA': 'Kerala',
                'RAJASTHAN': 'Rajasthan',
                'HAMPI': 'Hampi'
            };

            return site.region === regionFilterMap[activeFilter] && site.status !== 'Undiscovered' && matchesSearch;
        });
    }, [activeFilter, searchQuery]);

    const undiscoveredSites = useMemo(() => {
        if (activeFilter === 'UNDISCOVERED') return []; // Handled by filteredSites
        return heritageSites.filter(site =>
            site.status === 'Undiscovered' &&
            site.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (activeFilter === 'ALL' || site.region.toUpperCase() === activeFilter)
        );
    }, [activeFilter, searchQuery]);

    const counts = useMemo(() => {
        return {
            ALL: heritageSites.filter(s => s.status !== 'Undiscovered').length,
            DELHI: heritageSites.filter(s => s.region === 'Delhi' && s.status !== 'Undiscovered').length,
            KERALA: heritageSites.filter(s => s.region === 'Kerala' && s.status !== 'Undiscovered').length,
            RAJASTHAN: heritageSites.filter(s => s.region === 'Rajasthan' && s.status !== 'Undiscovered').length,
            HAMPI: heritageSites.filter(s => s.region === 'Hampi' && s.status !== 'Undiscovered').length,
            UNDISCOVERED: heritageSites.filter(s => s.status === 'Undiscovered').length,
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full bg-transparent text-slate-100 flex font-sans overflow-hidden"
        >
            {/* Left Panel: Filters (Fixed width) */}
            <div className="w-[320px] h-full border-r border-white/10 bg-black/60 backdrop-blur-md flex flex-col z-10 shrink-0 shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <img src="/assets/indian-religious-monuments.jpg" className="w-full h-full object-cover grayscale" />
                </div>
                <div className="p-6 border-b border-white/5">
                    <h2 className="font-serif text-2xl tracking-wide text-indi-gold mb-1">Grantha</h2>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">Heritage-Dex System</p>
                </div>

                {/* Stats Widget */}
                <div className="p-6 pt-6">
                    <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-4 rounded-xl border border-indi-gold/20 shadow-lg">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-[9px] uppercase text-slate-400 font-bold tracking-wider">Total Discovered</span>
                            <Map size={14} className="text-indi-gold opacity-50" />
                        </div>
                        <div className="flex items-baseline gap-2 mb-3">
                            <span className="text-3xl font-serif text-indi-gold">{counts.ALL}</span>
                            <span className="text-sm text-slate-600">/ {heritageSites.length}</span>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 transition-all duration-1000" style={{ width: `${(counts.ALL / heritageSites.length) * 100}%` }}></div>
                        </div>
                    </div>
                </div>

                {/* Filter List */}
                <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-1">
                    <FilterItem label="All Discovered Sites" active={activeFilter === 'ALL'} count={counts.ALL} onClick={() => setActiveFilter('ALL')} />
                    <FilterItem label="Delhi Region" active={activeFilter === 'DELHI'} count={counts.DELHI} onClick={() => setActiveFilter('DELHI')} />
                    <FilterItem label="Kerala Region" active={activeFilter === 'KERALA'} count={counts.KERALA} onClick={() => setActiveFilter('KERALA')} />
                    <FilterItem label="Rajasthan Region" active={activeFilter === 'RAJASTHAN'} count={counts.RAJASTHAN} onClick={() => setActiveFilter('RAJASTHAN')} />
                    <FilterItem label="Hampi Region" active={activeFilter === 'HAMPI'} count={counts.HAMPI} onClick={() => setActiveFilter('HAMPI')} />
                    <FilterItem label="Undiscovered Sites" active={activeFilter === 'UNDISCOVERED'} count={counts.UNDISCOVERED} isGray onClick={() => setActiveFilter('UNDISCOVERED')} />
                </div>
            </div>

            {/* Right Panel: Content Grid */}
            <div className="flex-1 flex flex-col bg-black/20 backdrop-blur-sm overflow-hidden relative">
                {/* Search Header */}
                <div className="p-8 pb-4 z-20">
                    <div className="relative group max-w-2xl mx-auto">
                        <div className="absolute inset-0 bg-indi-gold/5 rounded-xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indi-gold transition-colors" size={18} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={`Search artifacts in ${activeFilter.toLowerCase()}...`}
                            className="w-full bg-[#1e293b]/60 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm font-serif focus:outline-none focus:border-indi-gold/40 text-slate-200 placeholder:text-slate-600 shadow-2xl backdrop-blur-md transition-all"
                        />
                    </div>
                </div>

                {/* Grid Container */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-0">
                    {filteredSites.length === 0 && undiscoveredSites.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center opacity-40">
                            <div className="w-16 h-16 border-2 border-dashed border-slate-700 rounded-full flex items-center justify-center mb-4">
                                <Search size={24} />
                            </div>
                            <p className="font-serif text-lg text-slate-400">No matching sites found</p>
                            <p className="text-xs uppercase tracking-[0.2em] mt-2">Adjust your search or filter</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 pb-12">
                            <AnimatePresence>
                                {[...filteredSites].sort((a, b) => {
                                    const months: Record<string, number> = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
                                    const parseDate = (d?: string) => {
                                        if (!d) return 0;
                                        const [day, month] = d.split(' ');
                                        return new Date(2025, months[month] || 0, parseInt(day)).getTime();
                                    };
                                    return parseDate(b.discoveredOn) - parseDate(a.discoveredOn);
                                }).map(site => (
                                    <DexCard key={site.id} site={site} onClick={() => onOpenInfo(site)} />
                                ))}
                                {undiscoveredSites.map(site => (
                                    <DexCard key={site.id} site={site} isUndiscovered />
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

const FilterItem = ({ label, active, count, onClick }: any) => (
    <button
        onClick={(e) => {
            e.stopPropagation();
            onClick();
        }}
        className={`w-full flex justify-between items-center px-4 py-3 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${active ? 'bg-indi-gold text-black shadow-lg shadow-amber-900/20' : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'}`}
    >
        <span>{label}</span>
        <span className={`${active ? 'bg-black/20 text-black' : 'bg-white/10 text-slate-400'} px-2 py-0.5 rounded text-[10px]`}>{count}</span>
    </button>
)

const DexCard = ({ site, isUndiscovered, onClick }: { site: HeritageSite, isUndiscovered?: boolean, onClick?: () => void }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={!isUndiscovered ? { y: -4, scale: 1.01 } : { scale: 0.99 }}
            onClick={!isUndiscovered ? onClick : undefined}
            className={`rounded-xl overflow-hidden shadow-2xl relative group transition-all duration-500 h-full flex flex-col ${isUndiscovered ? 'bg-[#0f172a]/80 border border-white/5 border-dashed cursor-default' : 'bg-[#fdf6e3] text-slate-900 cursor-pointer'}`}
        >
            {/* Mysterious Veiled Overlay for Undiscovered */}
            {isUndiscovered && (
                <div className="absolute inset-0 z-10 bg-gradient-to-br from-slate-900/40 via-transparent to-slate-900/60 pointer-events-none"></div>
            )}

            {/* New Discovery Badge */}
            {!isUndiscovered && site.status === 'Pending' && (
                <div className="absolute top-0 right-0 left-0 bg-blue-600 text-white text-[9px] font-bold uppercase tracking-[0.2em] py-1 text-center z-20 shadow-lg">
                    New Discovery
                </div>
            )}

            <div className={`p-5 flex gap-6 h-full ${site.status === 'Pending' ? 'pt-8' : ''}`}>
                {/* Visual Section */}
                <div className={`w-32 h-32 rounded-xl shrink-0 overflow-hidden border shadow-inner relative ${isUndiscovered ? 'bg-slate-950/50 flex items-center justify-center text-slate-800 text-4xl font-serif border-white/5 backdrop-blur-sm' : 'bg-slate-200 border-amber-900/10'}`}>
                    {isUndiscovered ? (
                        <div className="relative w-full h-full flex items-center justify-center">
                            <span className="opacity-20 translate-y-1">?</span>
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,23,42,0.8)_100%)]"></div>
                            {/* Faint blueprint lines */}
                            <div className="absolute inset-0 opacity-[0.03] overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-full border-[0.5px] border-indi-gold space-y-4">
                                    <div className="h-[1px] w-full border-t border-indi-gold"></div>
                                    <div className="h-[1px] w-full border-t border-indi-gold"></div>
                                    <div className="h-[1px] w-full border-t border-indi-gold"></div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <img src={site.image} className="w-full h-full object-cover sepia-[0.2] group-hover:scale-110 transition-transform duration-700" />
                    )}
                </div>

                {/* Info Section */}
                <div className="flex-1 min-w-0 flex flex-col justify-between relative z-10">
                    <div>
                        <div className="flex justify-between items-start mb-1">
                            {isUndiscovered ? (
                                <div className="h-6 w-3/4 bg-slate-800/40 rounded blur-[1px]"></div>
                            ) : (
                                <h3 className="font-serif text-2xl leading-tight text-amber-950 truncate">{site.name}</h3>
                            )}
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ml-2 shrink-0 ${isUndiscovered ? 'bg-slate-800/40 text-slate-600' : 'bg-black text-white'}`}>
                                {site.region.toUpperCase()}
                            </span>
                        </div>

                        {isUndiscovered ? (
                            <div className="space-y-2 mt-3">
                                <div className="h-3 w-full bg-slate-800/20 rounded blur-[1px]"></div>
                                <div className="h-3 w-1/2 bg-slate-800/20 rounded blur-[1px]"></div>
                                <p className="text-[10px] text-indi-gold/40 italic mt-4 font-serif leading-relaxed px-2 border-l border-indi-gold/20">"{site.teaser}"</p>
                            </div>
                        ) : (
                            <p className="text-xs text-amber-900/70 italic leading-relaxed line-clamp-3 font-serif pr-4">
                                {site.description}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 pt-3 border-t border-amber-900/5">
                        {!isUndiscovered && (
                            <>
                                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                    <Clock size={12} className="opacity-70" />
                                    {site.discoveredOn}
                                </span>

                                {site.status === 'Verified' && (
                                    <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-green-600">
                                        <CheckCircle2 size={12} className="opacity-70" />
                                        Verified
                                    </span>
                                )}

                                {site.status === 'Pending' && (
                                    <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-600">
                                        <AlertCircle size={12} className="opacity-70" />
                                        Pending
                                    </span>
                                )}

                                {site.isRare && (
                                    <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-600">
                                        <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
                                        Rare Find
                                    </span>
                                )}
                            </>
                        )}
                        {isUndiscovered && (
                            <span className="text-[9px] text-slate-600 uppercase tracking-widest flex items-center gap-2 opacity-50">
                                <Info size={10} />
                                Fog of History: Explore area to uncover info
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Rare Seal */}
            {!isUndiscovered && site.isRare && (
                <div className="absolute top-12 right-6 w-16 h-16 rounded-full border-2 border-amber-800/20 text-[8px] text-amber-900/30 flex items-center justify-center font-bold uppercase -rotate-12 border-dashed pointer-events-none group-hover:scale-110 transition-transform">
                    Royal Seal
                </div>
            )}

            {/* Interactive Tooltip for undiscovered - More subtle & mysterious */}
            {isUndiscovered && (
                <div className="absolute inset-0 z-40 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/30 flex flex-col items-center justify-center pointer-events-none backdrop-blur-[1px]">
                    <div className="bg-[#0f172a]/95 px-6 py-3 rounded-xl border border-indi-gold/20 text-[9px] text-indi-gold uppercase tracking-[0.3em] font-serif shadow-2xl">
                        Awaiting your journey...
                    </div>
                    <div className="mt-2 text-[8px] text-slate-500 uppercase tracking-widest opacity-60 italic">
                        The archives are incomplete
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default HeritageDexScreen;
