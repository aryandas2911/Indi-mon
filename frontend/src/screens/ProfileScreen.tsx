import { Award, Leaf, Droplet, Lock, Compass, Medal, Castle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';

const ProfileScreen = () => {
    const { profile } = useAuth();
    const displayName = profile?.full_name || 'Explorer';
    const organization = profile?.organization || '';

    const containerVariants: any = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const sectionVariants: any = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const statsVariants: any = {
        hidden: { scale: 0.95, opacity: 0 },
        visible: { 
            scale: 1, 
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="w-full h-full bg-[#0b101b] text-slate-100 flex font-sans overflow-hidden"
        >
            {/* Left Column: Stats & Avatar (Fixed width) */}
            <motion.div 
                variants={sectionVariants}
                className="w-1/3 min-w-[300px] h-full border-r border-white/5 bg-[#0f172a]/50 p-8 flex flex-col items-center justify-center relative"
            >
                <motion.div 
                    variants={statsVariants}
                    whileHover={{ scale: 1.02 }}
                    className="relative group cursor-pointer mb-6"
                >
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-indi-gold/20 blur-2xl rounded-full scale-110 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="w-40 h-40 rounded-full border-[4px] border-indi-gold overflow-hidden bg-gray-800 shadow-[0_0_40px_rgba(245,158,11,0.15)] relative z-10 transition-all duration-500 group-hover:border-indi-gold/80">
                        <img src="/assets/profile-pic (1).jpg" alt="Profile" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>

                    <motion.div 
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
                        className="absolute -bottom-3 -right-0 bg-[#0f172a] text-indi-gold font-bold rounded-full w-12 h-12 flex items-center justify-center border-2 border-indi-gold font-pixel text-2xl shadow-[0_4px_10px_rgba(0,0,0,0.5)] z-20"
                    >
                        42
                    </motion.div>
                </motion.div>

                <motion.h2 variants={sectionVariants} className="text-5xl font-serif text-indi-gold tracking-wide drop-shadow-md text-center truncate w-full px-4">{displayName}</motion.h2>
                <motion.p variants={sectionVariants} className="text-slate-400 font-serif text-sm tracking-[0.3em] uppercase mt-2 border-b border-indi-gold/30 pb-2">Grand Sage</motion.p>
                {organization && (
                    <motion.p variants={sectionVariants} className="text-slate-500 text-[10px] uppercase tracking-[0.2em] mt-3 opacity-60 italic">{organization}</motion.p>
                )}

                <motion.div variants={sectionVariants} className="mt-8 w-full max-w-[240px]">
                    <div className="flex justify-between text-[10px] uppercase tracking-wider text-slate-500 mb-2">
                        <span>Next Enlightenment</span>
                        <span className="text-indi-gold">12.4k / 15k</span>
                    </div>
                    <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden border border-white/5 p-[1px]">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "82%" }}
                            transition={{ duration: 1.5, ease: "circOut", delay: 0.8 }}
                            className="h-full bg-gradient-to-r from-amber-800 via-amber-600 to-indi-gold shadow-[0_0_15px_rgba(245,158,11,0.4)] rounded-full"
                        ></motion.div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Right Column: Content (Scrollable) */}
            <div className="flex-1 h-full overflow-y-auto custom-scrollbar p-8">

                {/* Stamps Grid */}
                <motion.div variants={sectionVariants} className="mb-10">
                    <div className="flex items-center gap-3 mb-8">
                        <h3 className="text-indi-gold font-serif text-lg tracking-widest uppercase border-b border-indi-gold/20 pb-1">Stamps of Merit</h3>
                        <div className="h-[px] bg-gradient-to-r from-white/10 to-transparent flex-1"></div>
                    </div>

                    <div className="grid grid-cols-5 gap-6">
                        <StampItem icon={<Leaf size={28} />} label="Forest Bound" active index={0} />
                        <StampItem icon={<Castle size={26} />} label="Citadel Key" active index={1} />
                        <StampItem icon={<Droplet size={26} />} label="Ganga Blessed" active index={2} />
                        <StampItem icon={<Award size={26} />} label="Royal Guard" active index={3} />
                        <StampItem icon={<Lock size={22} />} label="Unknown" active={false} index={4} />
                    </div>
                </motion.div>

                {/* Voyage Logs */}
                <motion.div variants={sectionVariants}>
                    <div className="flex items-center gap-3 mb-8">
                        <h3 className="text-indi-gold font-serif text-lg tracking-widest uppercase border-b border-indi-gold/20 pb-1">Voyage Logs</h3>
                        <div className="h-[px] bg-gradient-to-r from-white/10 to-transparent flex-1"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <LogItem
                            icon={<Compass size={22} />}
                            title="Discovered Ancient Shrine of Hampi"
                            subtitle="Added 450 Wisdom to the record • 2 hrs ago"
                            color="rose"
                            index={0}
                        />
                        <LogItem
                            icon={<Medal size={22} />}
                            title="Reached Reputation Level 'Noble'"
                            subtitle="Honored by the Southern Tribes • Yesterday"
                            color="amber"
                            index={1}
                        />
                        <LogItem
                            icon={<Compass size={22} />}
                            title="Mapped the Lost Stepwell"
                            subtitle="Rajasthan Sector • 3 days ago"
                            color="blue"
                            index={2}
                        />
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

const StampItem = ({ icon, label, active, index }: { icon: React.ReactNode, label: string, active: boolean, index: number }) => (
    <motion.div 
        variants={{
            hidden: { scale: 0.8, opacity: 0 },
            visible: { scale: 1, opacity: 1, transition: { delay: 0.1 * index } }
        }}
        whileHover={{ y: -5, scale: 1.05 }}
        className={`flex flex-col items-center gap-4 group cursor-pointer ${active ? 'opacity-100' : 'opacity-40'}`}
    >
        <div className={`w-20 h-20 rounded-xl border-2 transition-all duration-300 ${active ? 'border-amber-700/50 bg-gradient-to-br from-amber-900/20 to-transparent' : 'border-slate-700 bg-slate-800/30'} flex items-center justify-center ${active ? 'text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.1)] group-hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] group-hover:border-indi-gold' : 'text-slate-600'} `}>
            {icon}
        </div>
        <span className={`text-[10px] uppercase font-bold text-center leading-tight tracking-widest transition-colors duration-300 ${active ? 'text-amber-500/80 group-hover:text-indi-gold' : 'text-slate-600'}`}>{label}</span>
    </motion.div>
);

const LogItem = ({ icon, title, subtitle, color, index }: { icon: React.ReactNode, title: string, subtitle: string, color: string, index: number }) => {
    const colors: any = {
        rose: 'text-rose-500 bg-rose-950/30 border-rose-900/50 group-hover:border-rose-500/50',
        amber: 'text-amber-500 bg-amber-950/30 border-amber-900/50 group-hover:border-amber-500/50',
        blue: 'text-sky-500 bg-sky-950/30 border-sky-900/50 group-hover:border-sky-500/50',
    }
    return (
        <motion.div 
            variants={{
                hidden: { x: 20, opacity: 0 },
                visible: { x: 0, opacity: 1, transition: { delay: 0.1 * index } }
            }}
            whileHover={{ x: 5 }}
            className="bg-[#131b2e]/40 backdrop-blur-sm p-5 rounded-xl border border-white/5 flex gap-5 items-center shadow-sm hover:bg-[#1a2339]/60 transition-all cursor-pointer group hover:border-indi-gold/20"
        >
            <div className={`w-12 h-12 rounded-full border transition-all duration-300 ${colors[color] || colors.amber} flex items-center justify-center shrink-0 group-hover:scale-110 shadow-lg`}>
                {icon}
            </div>
            <div>
                <h4 className="font-serif text-lg text-slate-200 group-hover:text-indi-gold transition-colors">{title}</h4>
                <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">{subtitle}</p>
            </div>
        </motion.div>
    );
};

export default ProfileScreen;
