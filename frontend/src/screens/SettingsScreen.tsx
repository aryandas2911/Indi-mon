import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Shield, Compass } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../hooks/useAuth';

const SettingsScreen = () => {
    const { user } = useAuth();
    const explorerName = user?.user_metadata?.explorer_name || 'Explorer';
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        // Simulate a ritualistic transition delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        await supabase.auth.signOut();
        // Redirect logic is handled in App.tsx via useAuth state change
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full bg-[#0b101b] text-slate-100 flex flex-col font-sans overflow-hidden relative"
        >
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 bg-[url('/assets/map.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indi-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

            {/* Header */}
            <div className="h-24 border-b border-white/5 bg-[#0f172a]/80 backdrop-blur-md flex items-center px-12 shrink-0 z-10">
                <div className="flex items-center gap-6">
                    <div className="p-3 bg-indi-gold/10 rounded-xl text-indi-gold border border-indi-gold/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                        <Shield size={28} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-serif text-indi-gold tracking-widest uppercase">The inner sanctum</h2>
                        <p className="text-[10px] text-slate-500 uppercase tracking-[0.4em] mt-1">Registry of the Chronicler</p>
                    </div>
                </div>
            </div>

            {/* Content Scrollable */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-12 z-10 space-y-12">

                {/* Account Overview Section */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-[1px] bg-indi-gold/20 flex-1"></div>
                        <h3 className="font-serif text-xl text-indi-gold/80 tracking-widest uppercase px-4 whitespace-nowrap">Account Overview</h3>
                        <div className="h-[1px] bg-indi-gold/20 flex-1"></div>
                    </div>

                    <div className="max-w-4xl mx-auto bg-[#131b2e]/60 border border-white/5 rounded-2xl p-10 relative overflow-hidden group hover:border-indi-gold/20 transition-colors shadow-2xl">
                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-indi-gold/30"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-indi-gold/30"></div>

                        <div className="flex items-start gap-10">
                            <div className="relative">
                                <div className="w-32 h-32 rounded-full border-2 border-indi-gold p-1 relative z-10 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                                    <img src="/assets/profile-pic (1).jpg" className="w-full h-full rounded-full object-cover" />
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-indi-gold text-black text-xl font-bold font-pixel w-10 h-10 rounded-full flex items-center justify-center border-2 border-black z-20">42</div>
                            </div>

                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h4 className="text-4xl font-serif text-slate-100 tracking-wide mb-1">{explorerName}</h4>
                                        <p className="text-indi-gold font-serif text-sm tracking-[0.2em] uppercase opacity-80">Grand Sage</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">Wisdom Accumulated</span>
                                        <span className="text-2xl font-pixel text-indi-gold">68,400 XP</span>
                                    </div>
                                </div>

                                <p className="text-slate-400 font-serif italic text-lg leading-relaxed mb-6 border-l-2 border-indi-gold/20 pl-6">
                                    "Bearer of Records, Seeker of Lost Sites. Your journey through the fog of history has illuminated the paths of many."
                                </p>

                                <div className="w-full">
                                    <div className="flex justify-between text-[10px] uppercase tracking-widest text-slate-500 mb-2">
                                        <span>Path to Next Enlightenment</span>
                                        <span>82%</span>
                                    </div>
                                    <div className="h-2.5 bg-slate-800/50 rounded-full overflow-hidden border border-white/5">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "82%" }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            className="h-full bg-gradient-to-r from-amber-700 to-indi-gold shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                                        ></motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Logout Section */}
                <section className="pt-8">
                    <div className="max-w-4xl mx-auto flex flex-col items-center">
                        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent mb-12"></div>

                        <button
                            onClick={() => setShowConfirm(true)}
                            className="group relative px-12 py-5 bg-transparent border border-indi-gold/30 rounded-xl overflow-hidden transition-all hover:border-indi-gold/60 active:scale-95 shadow-lg"
                        >
                            <div className="absolute inset-0 bg-indi-gold/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            <div className="relative flex items-center gap-4">
                                <LogOut size={20} className="text-indi-gold group-hover:rotate-12 transition-transform" />
                                <span className="text-xl font-serif text-indi-gold uppercase tracking-[0.3em] font-light">Log Out</span>
                            </div>
                        </button>

                        <p className="mt-6 text-[10px] text-slate-600 uppercase tracking-[0.3em]">Seal your ledger and exit the gateway</p>
                    </div>
                </section>
            </div>

            {/* Logout Confirmation & Modal */}
            <AnimatePresence>
                {(showConfirm || isLoggingOut) && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="w-full max-w-lg bg-[#0f172a] border border-indi-gold/20 rounded-2xl p-12 text-center relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]"
                        >
                            {/* Decorative Frame */}
                            <div className="absolute inset-4 border border-indi-gold/10 pointer-events-none"></div>

                            {!isLoggingOut ? (
                                <>
                                    <div className="mb-8 w-20 h-20 bg-indi-gold/10 rounded-full flex items-center justify-center mx-auto border border-indi-gold/20">
                                        <Compass size={36} className="text-indi-gold animate-spin-slow" />
                                    </div>
                                    <h3 className="text-3xl font-serif text-indi-gold mb-4 tracking-wide">Seal the Record?</h3>
                                    <p className="text-slate-400 font-serif italic text-lg mb-10 px-4">
                                        "Are you prepared to depart the sanctum? Your current discoveries will be safe within the archives."
                                    </p>
                                    <div className="flex flex-col gap-4">
                                        <button
                                            onClick={handleLogout}
                                            className="w-full py-4 bg-indi-gold text-black font-bold font-serif uppercase tracking-widest rounded-xl hover:bg-amber-400 transition-colors shadow-lg shadow-amber-900/20"
                                        >
                                            Confirm Departure
                                        </button>
                                        <button
                                            onClick={() => setShowConfirm(false)}
                                            className="w-full py-4 bg-transparent text-slate-500 font-serif uppercase tracking-widest rounded-xl hover:text-slate-300 transition-colors"
                                        >
                                            Await Longer
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="py-10">
                                    <div className="relative w-24 h-24 mx-auto mb-8">
                                        <div className="absolute inset-0 border-4 border-indi-gold/20 rounded-full"></div>
                                        <div className="absolute inset-0 border-4 border-t-indi-gold rounded-full animate-spin"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-12 h-12 bg-indi-gold/10 rounded-full flex items-center justify-center">
                                                <div className="w-2 h-2 bg-indi-gold rounded-full animate-pulse"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-serif text-indi-gold tracking-[0.2em] uppercase animate-pulse">Sealing the Chronicle...</h3>
                                    <p className="text-slate-500 font-pixel text-sm tracking-widest mt-4">Returning to the Outer Gate</p>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default SettingsScreen;
