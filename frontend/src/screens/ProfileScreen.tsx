import { MapPin, History, Search, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import type { HeritageSite } from '../data/heritageSites';
import { useMemo, useState } from 'react';

interface ProfileProps {
    sites: HeritageSite[];
}

const ProfileScreen = ({ sites }: ProfileProps) => {
    const { profile } = useAuth();
    const displayName = profile?.full_name || 'Explorer';
    const [expandedStates, setExpandedStates] = useState<Record<string, boolean>>({});

    const verifiedSites = useMemo(() => sites.filter(s => s.status === 'Verified'), [sites]);

    const stats = useMemo(() => {
        const states = new Set(verifiedSites.map(s => s.region));
        return {
            monuments: verifiedSites.length,
            states: states.size,
            wisdom: verifiedSites.length * 450
        };
    }, [verifiedSites]);

    const journeyByState = useMemo(() => {
        const grouped: Record<string, HeritageSite[]> = {};
        verifiedSites.forEach(site => {
            if (!grouped[site.region]) grouped[site.region] = [];
            grouped[site.region].push(site);
        });
        return grouped;
    }, [verifiedSites]);

    const toggleState = (state: string) => {
        setExpandedStates(prev => ({
            ...prev,
            [state]: !prev[state]
        }));
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } as any
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="w-full h-full bg-transparent text-slate-100 flex font-sans overflow-hidden"
        >
            {/* Left Panel: Explorer Profile */}
            <motion.div
                variants={itemVariants}
                className="w-[380px] h-full border-r border-white/10 bg-black/60 backdrop-blur-xl p-10 flex flex-col items-center shrink-0 shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indi-gold/50 to-transparent"></div>
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <img src="/assets/map.png" className="w-full h-full object-cover grayscale" />
                </div>

                <div className="relative mb-10">
                    <div className="absolute inset-0 bg-indi-gold/20 blur-3xl rounded-full scale-125 opacity-40"></div>
                    <div className="w-48 h-48 rounded-full border-4 border-indi-gold/30 p-2 relative z-10">
                        <div className="w-full h-full rounded-full border-2 border-indi-gold overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.2)] bg-slate-900">
                            <img src="/assets/profile-pic (1).jpg" alt="Profile" className="w-full h-full object-cover transition-all duration-700" />
                        </div>
                    </div>
                    <div className="absolute -bottom-2 right-4 bg-black border-2 border-indi-gold text-indi-gold font-pixel text-xl w-12 h-12 rounded-full flex items-center justify-center shadow-2xl z-20">
                        42
                    </div>
                </div>

                <div className="text-center z-10 w-full px-4">
                    <h2 className="text-4xl font-serif text-indi-gold tracking-wide mb-1 break-words">{displayName}</h2>
                    <div className="inline-block px-3 py-1 border border-indi-gold/20 bg-indi-gold/5 rounded-full mb-8">
                        <span className="text-[10px] text-indi-gold font-bold uppercase tracking-[0.3em]">Grand Sage chronicler</span>
                    </div>

                    <div className="space-y-6 w-full text-left">
                        <StatBlock label="Monuments Archived" value={stats.monuments} icon={<History size={16} />} />
                        <StatBlock label="States Explored" value={stats.states} icon={<MapPin size={16} />} />
                        <StatBlock label="Accumulated Wisdom" value={stats.wisdom.toLocaleString()} icon={<Search size={16} />} />
                    </div>

                    {/* Discovery Seals: Monument Thumbnails as Icons */}
                    {verifiedSites.length > 0 && (
                        <div className="mt-10 w-full text-left">
                            <span className="text-[9px] font-pixel text-slate-500 uppercase tracking-widest block mb-4 border-b border-white/5 pb-2">Archival Seals</span>
                            <div className="flex flex-wrap gap-3">
                                {verifiedSites.slice(0, 4).map((site) => (
                                    <div key={site.id} className="group relative">
                                        <div className="w-12 h-12 rounded-lg border border-indi-gold/30 p-0.5 group-hover:border-indi-gold transition-all duration-300 rotate-3 group-hover:rotate-0">
                                            <div className="w-full h-full rounded-md overflow-hidden bg-slate-900 border border-white/10">
                                                <img
                                                    src={site.image || '/assets/temple.jpg'}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    alt={site.name}
                                                />
                                            </div>
                                        </div>
                                        {/* Tooltip */}
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black border border-indi-gold/50 text-indi-gold text-[8px] font-pixel px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                                            {site.name}
                                        </div>
                                    </div>
                                ))}
                                {verifiedSites.length > 4 && (
                                    <div className="w-12 h-12 rounded-lg border border-dashed border-white/10 flex items-center justify-center text-slate-600 font-pixel text-[10px]">
                                        +{verifiedSites.length - 4}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-auto w-full pt-8 border-t border-white/5 z-10">
                    <div className="flex justify-between items-center mb-2 px-1">
                        <span className="text-[9px] font-pixel text-slate-500 uppercase tracking-widest text-indi-gold/60">Next enlightenment</span>
                        <span className="text-[10px] font-pixel text-indi-gold">82%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "82%" }}
                            transition={{ duration: 1.5, ease: "circOut", delay: 1 }}
                            className="h-full bg-indi-gold shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                        />
                    </div>
                </div>
            </motion.div>

            {/* Right Panel: Journey Record */}
            <div className="flex-1 h-full overflow-y-auto custom-scrollbar p-12 bg-black/20 backdrop-blur-sm">
                <motion.div variants={itemVariants} className="max-w-5xl mx-auto">
                    <div className="flex items-center gap-4 mb-16">
                        <History size={32} className="text-indi-gold opacity-50" />
                        <div>
                            <h1 className="text-5xl font-serif text-slate-200">The Eternal Journey</h1>
                            <p className="text-xs font-pixel text-indi-gold/60 uppercase tracking-[0.4em] mt-2">Personal Records of the Great Mapping</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {Object.entries(journeyByState).length === 0 ? (
                            <div className="py-20 text-center opacity-30 italic font-serif text-2xl">
                                "The first step has not yet been logged in the archive."
                            </div>
                        ) : (
                            Object.entries(journeyByState).map(([state, sites]) => (
                                <section key={state} className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
                                    <button
                                        onClick={() => toggleState(state)}
                                        className="w-full flex items-center gap-6 p-8 hover:bg-white/[0.03] transition-all group"
                                    >
                                        <div className="p-3 bg-indi-gold/10 rounded-xl text-indi-gold">
                                            {expandedStates[state] ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
                                        </div>
                                        <div className="flex-1 text-left">
                                            <h3 className="font-serif text-3xl text-indi-gold italic">{state} Sector</h3>
                                            <p className="text-[10px] font-pixel text-slate-500 uppercase tracking-widest mt-1">
                                                {sites.length} Records Verified in this Territory
                                            </p>
                                        </div>
                                        <div className="hidden group-hover:block font-pixel text-[10px] text-indi-gold tracking-widest">
                                            {expandedStates[state] ? 'CLOSE RECORD' : 'OPEN RECORD'}
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {expandedStates[state] && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-8 pt-0 grid grid-cols-1 gap-4">
                                                    {sites.map((site, siteIndex) => (
                                                        <JourneyLogItem
                                                            key={site.id}
                                                            site={site}
                                                            index={siteIndex}
                                                        />
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </section>
                            ))
                        )}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

const StatBlock = ({ label, value, icon }: { label: string, value: string | number, icon: React.ReactNode }) => (
    <div className="group">
        <div className="flex items-center gap-3 text-slate-500 mb-1">
            <span className="text-indi-gold opacity-50">{icon}</span>
            <span className="text-[9px] font-pixel uppercase tracking-widest">{label}</span>
        </div>
        <div className="text-2xl font-serif text-slate-200 group-hover:text-indi-gold transition-colors">{value}</div>
    </div>
);

const JourneyLogItem = ({ site, index }: { site: HeritageSite, index: number }) => (
    <motion.div
        variants={{
            hidden: { x: 20, opacity: 0 },
            visible: { x: 0, opacity: 1, transition: { delay: index * 0.05 } }
        }}
        whileHover={{ x: 8, backgroundColor: 'rgba(255,191,0,0.03)' }}
        className="flex items-center gap-8 p-6 bg-white/[0.01] border border-white/5 rounded-2xl transition-all group cursor-pointer"
    >
        <div className="w-20 h-20 rounded-xl overflow-hidden transition-all duration-700 bg-slate-900 shrink-0">
            <img src={site.image || '/assets/temple.jpg'} className="w-full h-full object-cover opacity-80 group-hover:opacity-100" />
        </div>
        <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
                <span className="font-pixel text-[9px] text-indi-gold/40">{site.discoveredOn} · Log #{site.id}</span>
                <span className="h-px w-8 bg-white/10" />
                <span className="font-pixel text-[9px] text-slate-500 uppercase tracking-widest">{site.category}</span>
            </div>
            <h4 className="font-serif text-2xl text-slate-200 group-hover:text-indi-gold transition-colors">{site.name}</h4>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-indi-gold font-pixel text-[10px] tracking-widest">
            VIEW RECORD →
        </div>
    </motion.div>
);

export default ProfileScreen;
