import React from 'react';
import { Award, Crown, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const LeaderboardScreen = () => {
    const topList = [
        { rank: 1, name: "Sage Vashistha", title: "The Eternal Librarian", wisdom: "89,240", img: "/assets/profile-pic (1).jpg" },
        { rank: 2, name: "Acharya Kripa", title: "Guardian of the Vedas", wisdom: "74,150", img: "/assets/profile-pic (1).jpg" }, // Use same img placeholder
        { rank: 3, name: "Sage Aruna", title: "Grand Sage (You)", wisdom: "68,400", img: "/assets/profile-pic (1).jpg", isUser: true },
    ];

    const list = [
        { rank: 4, name: "Pandit Ravi", title: "Ancient Mapkeeper", wisdom: "52,900" },
        { rank: 5, name: "Scribe Maya", title: "Prakrit Scholar", wisdom: "49,200" },
        { rank: 6, name: "Bhikshu Devan", title: "Temple Chronicler", wisdom: "45,600" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full bg-[#0b101b] text-slate-100 flex flex-col font-sans overflow-y-auto pb-20"
        >
            {/* Header */}
            <div className="pt-8 pb-6 flex flex-col items-center border-b border-white/5 bg-[#0f172a]">
                <Award className="text-indi-gold w-8 h-8 mb-3" />
                <h2 className="text-2xl font-serif text-indi-gold tracking-wide text-center">Council of<br />Archivists</h2>
                <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-indi-gold/50 to-transparent mt-3 mb-2"></div>
                <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em]">High Sages of the Ancient Realms</p>
            </div>

            {/* Top 3 */}
            <div className="px-5 py-6 space-y-4">
                {topList.map((item) => (
                    <motion.div
                        key={item.rank}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: item.rank * 0.1 }}
                        className={`relative rounded-xl p-1 ${item.rank === 1 ? 'bg-gradient-to-r from-amber-700/50 via-indi-gold/50 to-amber-900/50' : item.isUser ? 'bg-indigo-900/40 border border-indi-gold/30' : 'bg-slate-800/40'}`}
                    >
                        <div className={`flex items-center gap-4 p-3 rounded-lg ${item.rank === 1 ? 'bg-[#1a140a]' : 'bg-[#131b2e]'}`}>
                            {/* Rank Badge */}
                            <div className="relative">
                                <div className={`w-12 h-12 rounded-full border-2 ${item.rank === 1 ? 'border-indi-gold' : item.rank === 2 ? 'border-slate-300' : 'border-amber-700'} overflow-hidden`}>
                                    <img src={item.img} className="w-full h-full object-cover" />
                                </div>
                                <div className={`absolute -top-1 -left-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${item.rank === 1 ? 'bg-indi-gold text-black' : item.rank === 2 ? 'bg-slate-300 text-black' : 'bg-amber-700 text-white'}`}>
                                    {item.rank}
                                </div>
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className={`font-serif text-sm ${item.isUser ? 'text-indi-gold' : 'text-slate-100'} truncate`}>{item.name} {item.isUser && "(You)"}</h3>
                                <p className="text-[10px] text-slate-500 uppercase tracking-wider truncate">{item.title}</p>
                            </div>

                            <div className="text-right">
                                <span className="block text-[9px] text-slate-500 uppercase">Wisdom</span>
                                <span className="block font-pixel text-sm text-indi-gold">{item.wisdom}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Rest of List */}
            <div className="px-5 space-y-3">
                {list.map((item, idx) => (
                    <motion.div
                        key={item.rank}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 + (idx * 0.1) }}
                        className="flex items-center gap-4 p-3 bg-slate-800/20 rounded-lg border border-white/5"
                    >
                        <div className="w-8 flex justify-center font-serif text-slate-500 opacity-50">{item.rank}</div>
                        <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden">
                            <img src="/assets/profile-pic (1).jpg" className="w-full h-full object-cover opacity-50 grayscale" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm text-slate-300 font-serif">{item.name}</h3>
                            <p className="text-[9px] text-slate-600 uppercase">{item.title}</p>
                        </div>
                        <span className="font-pixel text-xs text-slate-500">{item.wisdom}</span>
                    </motion.div>
                ))}
            </div>

            {/* Footer CTA */}
            <div className="p-6 mt-auto">
                <button className="w-full py-3 border border-indi-gold/30 rounded-full text-indi-gold text-xs font-bold tracking-[0.2em] uppercase hover:bg-indi-gold/10 transition-colors flex items-center justify-center gap-2 group">
                    View Full Archives
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </motion.div>
    );
};

export default LeaderboardScreen;
