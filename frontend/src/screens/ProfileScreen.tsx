import { Award, Leaf, Droplet, Lock, Compass, Medal, Castle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';

const ProfileScreen = () => {
    const { user } = useAuth();
    const explorerName = user?.user_metadata?.explorer_name || 'Explorer';

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full bg-[#0b101b] text-slate-100 flex font-sans overflow-hidden"
        >
            {/* Left Column: Stats & Avatar (Fixed width) */}
            <div className="w-1/3 min-w-[300px] h-full border-r border-white/5 bg-[#0f172a]/50 p-8 flex flex-col items-center justify-center relative">
                <div className="relative group cursor-pointer mb-6">
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-indi-gold/20 blur-xl rounded-full scale-110"></div>

                    <div className="w-40 h-40 rounded-full border-[4px] border-indi-gold overflow-hidden bg-gray-800 shadow-[0_0_25px_rgba(245,158,11,0.25)] relative z-10">
                        <img src="/assets/profile-pic (1).jpg" alt="Profile" className="w-full h-full object-cover" />
                    </div>

                    <div className="absolute -bottom-3 -right-0 bg-[#0f172a] text-indi-gold font-bold rounded-full w-12 h-12 flex items-center justify-center border-2 border-indi-gold font-pixel text-2xl shadow-lg z-20">
                        42
                    </div>
                </div>

                <h2 className="text-5xl font-serif text-indi-gold tracking-wide drop-shadow-md text-center truncate w-full px-4">{explorerName}</h2>
                <p className="text-slate-400 font-serif text-sm tracking-[0.3em] uppercase mt-2 border-b border-indi-gold/30 pb-2">Grand Sage</p>

                <div className="mt-8 w-full max-w-[240px]">
                    <div className="flex justify-between text-[10px] uppercase tracking-wider text-slate-500 mb-1">
                        <span>Next Enlightenment</span>
                        <span>12.4k / 15k</span>
                    </div>
                    <div className="h-3 bg-slate-800 rounded-full overflow-hidden border border-white/10">
                        <div className="h-full w-[82%] bg-gradient-to-r from-amber-800 to-indi-gold shadow-[0_0_10px_orange]"></div>
                    </div>
                </div>
            </div>

            {/* Right Column: Content (Scrollable) */}
            <div className="flex-1 h-full overflow-y-auto custom-scrollbar p-8">

                {/* Stamps Grid */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-6">
                        <h3 className="text-indi-gold font-serif text-lg tracking-widest uppercase border-b border-indi-gold/20 pb-1">Stamps of Merit</h3>
                        <div className="h-[1px] bg-white/10 flex-1"></div>
                    </div>

                    <div className="grid grid-cols-5 gap-6">
                        <StampItem icon={<Leaf size={28} />} label="Forest Bound" active />
                        <StampItem icon={<Castle size={26} />} label="Citadel Key" active />
                        <StampItem icon={<Droplet size={26} />} label="Ganga Blessed" active />
                        {/* Duplicates to fill grid */}
                        <StampItem icon={<Award size={26} />} label="Royal Guard" active />
                        <StampItem icon={<Lock size={22} />} label="Unknown" active={false} />
                    </div>
                </div>

                {/* Voyage Logs (Horizontal List style or Grid) */}
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <h3 className="text-indi-gold font-serif text-lg tracking-widest uppercase border-b border-indi-gold/20 pb-1">Voyage Logs</h3>
                        <div className="h-[1px] bg-white/10 flex-1"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <LogItem
                            icon={<Compass size={22} />}
                            title="Discovered Ancient Shrine of Hampi"
                            subtitle="Added 450 Wisdom to the record • 2 hrs ago"
                            color="rose"
                        />
                        <LogItem
                            icon={<Medal size={22} />}
                            title="Reached Reputation Level 'Noble'"
                            subtitle="Honored by the Southern Tribes • Yesterday"
                            color="amber"
                        />
                        <LogItem
                            icon={<Compass size={22} />}
                            title="Mapped the Lost Stepwell"
                            subtitle="Rajasthan Sector • 3 days ago"
                            color="blue"
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const StampItem = ({ icon, label, active }: { icon: React.ReactNode, label: string, active: boolean }) => (
    <div className={`flex flex-col items-center gap-4 group ${active ? 'opacity-100' : 'opacity-40'}`}>
        <div className={`w-20 h-20 rounded-xl border-2 ${active ? 'border-amber-700/50 bg-gradient-to-br from-amber-900/20 to-transparent' : 'border-slate-700 bg-slate-800/30'} flex items-center justify-center ${active ? 'text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.1)]' : 'text-slate-600'} transition-all group-hover:scale-105 group-hover:bg-amber-900/10`}>
            {icon}
        </div>
        <span className={`text-[10px] uppercase font-bold text-center leading-tight tracking-widest ${active ? 'text-amber-500/80' : 'text-slate-600'}`}>{label}</span>
    </div>
);

const LogItem = ({ icon, title, subtitle, color }: { icon: React.ReactNode, title: string, subtitle: string, color: string }) => {
    const colors: any = {
        rose: 'text-rose-500 bg-rose-950/30 border-rose-900/50',
        amber: 'text-amber-500 bg-amber-950/30 border-amber-900/50',
        blue: 'text-sky-500 bg-sky-950/30 border-sky-900/50',
    }
    return (
        <div className="bg-[#131b2e] p-5 rounded-xl border border-white/5 flex gap-5 items-center shadow-sm hover:bg-[#1a2339] transition-colors cursor-pointer group hover:border-indi-gold/20">
            <div className={`w-12 h-12 rounded-full border ${colors[color] || colors.amber} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
            <div>
                <h4 className="font-serif text-lg text-slate-200 group-hover:text-indi-gold transition-colors">{title}</h4>
                <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">{subtitle}</p>
            </div>
        </div>
    );
};

export default ProfileScreen;
