import { Crown, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const LeaderboardScreen = () => {
    // ... data ...
    const topList = [
        { rank: 1, name: "Sage Vashistha", title: "The Eternal Librarian", wisdom: "89,240", img: "/assets/profile-pic (1).jpg" },
        { rank: 2, name: "Acharya Kripa", title: "Guardian of the Vedas", wisdom: "74,150", img: "/assets/profile-pic (1).jpg" },
        { rank: 3, name: "Sage Aruna", title: "Grand Sage (You)", wisdom: "68,400", img: "/assets/profile-pic (1).jpg", isUser: true },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full bg-transparent text-slate-100 flex flex-col font-sans overflow-hidden"
        >
            {/* Header */}
            <div className="h-20 border-b border-white/10 bg-black/50 backdrop-blur-md flex items-center justify-between px-8 shrink-0 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-indi-gold/10 rounded-lg text-indi-gold">
                        <Trophy size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-serif text-indi-gold tracking-wide">Council of Archivists</h2>
                        <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em]">Top Scholars of the Realm</p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-indi-gold text-black rounded-full">Global</button>
                    <button className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:bg-white/5 rounded-full">Regional</button>
                    <button className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:bg-white/5 rounded-full">Friends</button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Top 3 Podium (Left Panel) */}
                <div className="w-[45%] h-full bg-black/40 backdrop-blur-sm p-8 flex flex-col justify-center items-center relative border-r border-white/10 overflow-hidden">
                    {/* Decoration */}
                    <div className="absolute inset-0 z-0">
                        <img src="/assets/Golgumbaz.jpg" className="w-full h-full object-cover opacity-10 grayscale mix-blend-overlay" />
                        <div className="absolute inset-0 bg-[url('/assets/map.png')] opacity-20 mix-blend-overlay"></div>
                    </div>

                    <div className="flex items-end gap-4 relative z-10 translate-y-4">
                        {/* Rank 2 */}
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full border-2 border-slate-400 p-0.5 mb-2 relative">
                                <img src={topList[1].img} className="w-full h-full rounded-full object-cover grayscale-[0.3]" />
                                <div className="absolute -bottom-2 -right-0 bg-slate-700 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold border border-slate-500">2</div>
                            </div>
                            <div className="h-32 w-28 bg-slate-800/50 rounded-t-lg border-t border-x border-slate-600/30 flex items-center justify-center flex-col p-2 text-center">
                                <span className="font-serif text-slate-300 text-sm">{topList[1].name}</span>
                                <span className="text-[10px] text-slate-500">{topList[1].wisdom}</span>
                            </div>
                        </div>

                        {/* Rank 1 */}
                        <div className="flex flex-col items-center -translate-y-8 z-20">
                            <Crown className="text-indi-gold mb-2 fill-indi-gold/20" size={32} />
                            <div className="w-28 h-28 rounded-full border-4 border-indi-gold p-1 mb-2 relative shadow-[0_0_40px_rgba(245,158,11,0.3)]">
                                <img src={topList[0].img} className="w-full h-full rounded-full object-cover" />
                                <div className="absolute -bottom-2 -right-0 bg-indi-gold text-black text-sm w-8 h-8 rounded-full flex items-center justify-center font-bold border border-white">1</div>
                            </div>
                            <div className="h-44 w-36 bg-gradient-to-b from-indi-gold/20 to-amber-900/10 rounded-t-lg border-t border-x border-indi-gold/50 flex items-center justify-center flex-col p-2 text-center shadow-lg">
                                <span className="font-serif text-indi-gold text-lg">{topList[0].name}</span>
                                <span className="text-xs text-amber-200/50 uppercase tracking-wider mb-1">Champion</span>
                                <span className="text-sm font-pixel text-white">{topList[0].wisdom}</span>
                            </div>
                        </div>

                        {/* Rank 3 */}
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full border-2 border-amber-700 p-0.5 mb-2 relative">
                                <img src={topList[2].img} className="w-full h-full rounded-full object-cover grayscale-[0.3]" />
                                <div className="absolute -bottom-2 -right-0 bg-amber-800 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold border border-amber-600">3</div>
                            </div>
                            <div className="h-24 w-28 bg-amber-900/20 rounded-t-lg border-t border-x border-amber-700/30 flex items-center justify-center flex-col p-2 text-center">
                                <span className="font-serif text-amber-500 text-sm">{topList[2].name}</span>
                                <span className="text-[10px] text-slate-500">{topList[2].wisdom}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* List (Right Panel) */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-2 bg-black/30 backdrop-blur-sm">
                    {[4, 5, 6, 7, 8, 9, 10].map((rank) => (
                        <div key={rank} className="flex items-center gap-4 p-4 rounded-lg bg-slate-800/20 border border-white/5 hover:bg-slate-800/40 transition-colors">
                            <span className="font-serif text-slate-500 w-8 text-center text-lg opacity-50">{rank}</span>
                            <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden">
                                <img src="/assets/profile-pic (1).jpg" className="w-full h-full object-cover opacity-50 grayscale" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-slate-300 font-serif">Archivist Name</h3>
                                <p className="text-[10px] text-slate-600 uppercase tracking-wider">Title Placeholder</p>
                            </div>
                            <span className="font-pixel text-slate-400">45,000</span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default LeaderboardScreen;
