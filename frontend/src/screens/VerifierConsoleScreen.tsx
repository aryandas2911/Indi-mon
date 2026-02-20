import { ShieldCheck, MapPin, CheckCircle2, Clock, User, AlertCircle, X, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import type { HeritageSite } from '../data/heritageSites';

interface VerifierConsoleProps {
    sites: HeritageSite[];
    onReviewSite?: (site: HeritageSite | null) => void;
}

const VerifierConsoleScreen = ({ sites, onReviewSite }: VerifierConsoleProps) => {
    const [activeFilter, setActiveFilter] = useState<'ALL' | 'DELHI' | 'KERALA' | 'RAJASTHAN' | 'HAMPI'>('ALL');

    const pendingSites = useMemo(() => {
        return sites.filter(site => {
            if (site.status !== 'Pending') return false;

            if (activeFilter === 'ALL') return true;

            const regionFilterMap: Record<string, string> = {
                'DELHI': 'Delhi',
                'KERALA': 'Kerala',
                'RAJASTHAN': 'Rajasthan',
                'HAMPI': 'Hampi'
            };

            return site.region === regionFilterMap[activeFilter];
        });
    }, [activeFilter, sites]);

    const counts = useMemo(() => {
        const p = sites.filter(s => s.status === 'Pending');
        return {
            ALL: p.length,
            DELHI: p.filter(s => s.region === 'Delhi').length,
            KERALA: p.filter(s => s.region === 'Kerala').length,
            RAJASTHAN: p.filter(s => s.region === 'Rajasthan').length,
            HAMPI: p.filter(s => s.region === 'Hampi').length,
        };
    }, [sites]);


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full bg-transparent text-slate-100 flex font-sans overflow-hidden"
        >
            {/* Left Panel: Filters (Fixed width) */}
            <div className="w-[320px] h-full border-r border-white/10 bg-black/60 backdrop-blur-md flex flex-col z-10 shrink-0 shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <img src="/assets/map.png" className="w-full h-full object-cover grayscale" />
                </div>
                <div className="p-6 border-b border-white/5 bg-black/40">
                    <div className="flex items-center gap-3 mb-1">
                        <ShieldCheck className="text-indi-gold" size={24} />
                        <h2 className="font-serif text-2xl tracking-wide text-indi-gold">Verifier Console</h2>
                    </div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest pl-9">Archival Validation System</p>
                </div>

                {/* Filter List */}
                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-1">
                    <h3 className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold mb-4 px-4">Review Desk</h3>
                    <FilterItem label="All Pending Sites" active={activeFilter === 'ALL'} count={counts.ALL} onClick={() => setActiveFilter('ALL')} />
                    <FilterItem label="Delhi Region" active={activeFilter === 'DELHI'} count={counts.DELHI} onClick={() => setActiveFilter('DELHI')} />
                    <FilterItem label="Kerala Region" active={activeFilter === 'KERALA'} count={counts.KERALA} onClick={() => setActiveFilter('KERALA')} />
                    <FilterItem label="Rajasthan Region" active={activeFilter === 'RAJASTHAN'} count={counts.RAJASTHAN} onClick={() => setActiveFilter('RAJASTHAN')} />
                    <FilterItem label="Hampi Region" active={activeFilter === 'HAMPI'} count={counts.HAMPI} onClick={() => setActiveFilter('HAMPI')} />
                </div>

                {/* Footer Info */}
                <div className="p-6 bg-black/20 border-t border-white/5">
                    <div className="flex items-center gap-2 text-slate-500 text-[9px] uppercase tracking-wider mb-2">
                        <Clock size={12} />
                        <span>Last scan: Real-time</span>
                    </div>
                    <div className="text-[8px] text-slate-600 italic">
                        Authorized Archivists Only. Every verification is logged in the Eternal Record.
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col bg-black/20 backdrop-blur-sm overflow-hidden relative">
                {/* Header */}
                <div className="p-8 pb-4 flex justify-between items-center z-20">
                    <h1 className="font-serif text-3xl text-slate-200">Pending Undocumented Sites</h1>
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                        <AlertCircle size={14} className="text-indi-gold" />
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold font-pixel">
                            {pendingSites.length} Items Require Action
                        </span>
                    </div>
                </div>

                {/* Grid Container */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-4">
                    {pendingSites.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center opacity-40">
                            <div className="w-16 h-16 border-2 border-dashed border-slate-700 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle2 size={24} className="text-green-500" />
                            </div>
                            <p className="font-serif text-xl text-slate-400 italic">Queue is clear, Chronicler.</p>
                            <p className="text-xs uppercase tracking-[0.2em] mt-2">All discoveries have been vetted.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 pb-12">
                            <AnimatePresence>
                                {pendingSites.map(site => (
                                    <PendingCard key={site.id} site={site} onClick={() => onReviewSite?.(site)} />
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal removed from here to be rendered globally in App.tsx */}
        </motion.div>
    );
};

const FilterItem = ({ label, active, count, onClick }: any) => (
    <button
        onClick={onClick}
        className={`w-full flex justify-between items-center px-4 py-3.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${active ? 'bg-indi-gold text-black shadow-lg shadow-amber-900/20' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}`}
    >
        <span className="flex items-center gap-3">
            <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-black' : 'bg-indi-gold/30'}`}></span>
            {label}
        </span>
        <span className={`${active ? 'bg-black/20 text-black' : 'bg-white/5 text-slate-500'} px-2 py-0.5 rounded text-[10px]`}>{count}</span>
    </button>
);

const PendingCard = ({ site, onClick }: { site: HeritageSite, onClick: () => void }) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        whileHover={{ y: -4, backgroundColor: 'rgba(255,255,255,0.04)' }}
        onClick={onClick}
        className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300"
    >
        <div className="p-6 flex gap-8">
            {/* Visual */}
            <div className="w-48 h-32 rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 bg-slate-800 border border-white/5">
                <img src={site.image || '/assets/temple.jpg'} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-serif text-2xl text-slate-300 group-hover:text-indi-gold transition-colors">{site.name || 'Unnamed Site'}</h3>
                        <span className="text-[10px] font-bold px-2 py-1 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20 uppercase tracking-widest flex items-center gap-1.5">
                            <Clock size={10} />
                            Pending Verification
                        </span>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] text-slate-500 uppercase tracking-wider mb-3">
                        <span className="flex items-center gap-1.5">
                            <MapPin size={12} className="text-indi-gold/50" />
                            {site.region} ARCHIVE
                        </span>
                        <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                        <span className="flex items-center gap-1.5">
                            <User size={12} className="text-indi-gold/50" />
                            Submited by {site.submittedBy || 'Anonymous'}
                        </span>
                    </div>
                    <p className="text-xs text-slate-500 italic leading-relaxed line-clamp-2 max-w-2xl font-serif">
                        "{site.description}"
                    </p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <span className="text-[9px] text-slate-600 uppercase tracking-[0.2em]">Log ID: {site.id} · {site.submissionDate}</span>
                    <span className="text-indi-gold text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                        Review Records →
                    </span>
                </div>
            </div>
        </div>
    </motion.div>
);

export const VerificationModal = ({ site, onClose, onVerify, onReject }: any) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-10 pt-16"
        onClick={onClose}
    >
        <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            onClick={e => e.stopPropagation()}
            className="w-full h-full max-w-7xl bg-[#0f172a] rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/10 flex relative"
        >
            {/* Close Button */}
            <button onClick={onClose} className="absolute top-6 right-6 z-50 p-2.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-white/10 transition-all hover:rotate-90">
                <X size={24} />
            </button>

            {/* Left: visuals */}
            <div className="w-1/2 h-full bg-black relative flex flex-col border-r border-white/10">
                <div className="flex-1 relative overflow-hidden group">
                    <img src={site.image || '/assets/temple.jpg'} className="w-full h-full object-cover opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent"></div>

                    <div className="absolute bottom-16 left-12 right-12 z-10">
                        <span className="text-indi-gold font-pixel text-[10px] uppercase tracking-[0.4em] mb-4 block">Original Evidence File</span>
                        <h1 className="font-serif text-4xl text-white leading-tight mb-4 drop-shadow-2xl">{site.name || 'Unnamed Discovery'}</h1>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 text-slate-300">
                                <MapPin size={16} className="text-indi-gold" />
                                <span className="font-pixel text-[10px] opacity-80">{site.coordinates[0].toFixed(4)}, {site.coordinates[1].toFixed(4)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-300">
                                <User size={16} className="text-indi-gold" />
                                <span className="font-pixel text-[10px] opacity-80">Filed by {site.submittedBy}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Validation details */}
            <div className="w-1/2 h-full flex flex-col bg-[#0b101b]">
                <div className="flex-1 overflow-y-auto custom-scrollbar p-16">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="p-3 bg-amber-500/10 rounded-xl">
                            <ShieldCheck className="text-indi-gold" size={32} />
                        </div>
                        <div>
                            <h2 className="font-serif text-3xl text-slate-200">Archival Evidence Review</h2>
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Status: Restricted Access · Case ID: {site.id}</p>
                        </div>
                    </div>

                    <div className="space-y-12">
                        <section>
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-6 flex items-center gap-3">
                                <span className="w-1.5 h-1.5 bg-indi-gold rounded-full"></span>
                                Citizens Narrative
                            </h3>
                            <p className="text-slate-300 text-lg leading-relaxed font-serif italic border-l-2 border-indi-gold/30 pl-8 py-2">
                                "{site.description}"
                            </p>
                        </section>

                        <div className="grid grid-cols-2 gap-8">
                            <section>
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Discovery Signals</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                                        <span className="text-xs text-slate-400">Total Visits</span>
                                        <span className="text-indi-gold font-pixel">{site.visitorCount || 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                                        <span className="text-xs text-slate-400">Independent Files</span>
                                        <span className="text-indi-gold font-pixel">1</span>
                                    </div>
                                </div>
                            </section>
                            <section>
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Location Validation</h3>
                                <div className="p-4 bg-white/5 rounded-xl border border-white/5 h-[92px] flex items-center justify-center gap-4">
                                    <MapPin className="text-green-500" size={24} />
                                    <div className="text-left">
                                        <p className="text-[10px] text-green-500 uppercase font-bold tracking-widest">GPS Match Confirmed</p>
                                        <p className="text-[9px] text-slate-500 mt-0.5">Regional sector: {site.region}</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>

                {/* Actions Footer */}
                <div className="p-10 bg-black/40 border-t border-white/10 flex gap-4">
                    <button
                        onClick={onVerify}
                        className="flex-[3] py-5 bg-indi-gold hover:bg-amber-400 text-black rounded-2xl font-bold text-sm uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1"
                    >
                        <CheckCircle2 size={20} />
                        Verify & Commit to Grantha
                    </button>
                    <button
                        onClick={onReject}
                        className="flex-1 py-5 bg-white/5 hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 rounded-2xl border border-white/10 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1"
                    >
                        <Trash2 size={20} />
                        Reject File
                    </button>
                </div>
            </div>
        </motion.div>
    </motion.div>
);

export default VerifierConsoleScreen;
