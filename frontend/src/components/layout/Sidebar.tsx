import { Map, Scroll, Award, Settings, Briefcase } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';

interface SidebarProps {
    activeScreen: string;
    setScreen: (screen: 'LANDING' | 'AUTH' | 'MAP' | 'DEX' | 'LEADERBOARD' | 'PROFILE' | 'SETTINGS') => void;
}

const Sidebar = ({ activeScreen, setScreen }: SidebarProps) => {
    const { profile } = useAuth();
    const displayName = profile?.full_name || 'Explorer';

    const containerVariants: any = {
        hidden: { x: -20, opacity: 0 },
        visible: { 
            x: 0, 
            opacity: 1,
            transition: { 
                staggerChildren: 0.1,
                when: "beforeChildren",
                duration: 0.6,
                ease: "easeOut" 
            }
        }
    };

    const itemVariants: any = {
        hidden: { x: -10, opacity: 0 },
        visible: { x: 0, opacity: 1 }
    };

    return (
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="w-44 h-full bg-[#161b22] border-r border-[#30363d] flex flex-col items-center py-6 z-20 shrink-0"
        >
            {/* Profile Avatar / Top */}
            <motion.div 
                variants={itemVariants}
                className="mb-8 flex flex-col items-center cursor-pointer group" 
                onClick={() => setScreen('PROFILE')}
            >
                <div className="w-16 h-16 rounded-full border-2 border-indi-gold p-0.5 mb-2 relative group-hover:scale-105 transition-transform duration-300">
                    <img src="/assets/profile-pic (1).jpg" className="w-full h-full rounded-full object-cover" />
                    <div className="absolute -bottom-1 -right-1 bg-indi-gold text-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold font-pixel border border-black shadow-[0_0_10px_rgba(245,158,11,0.5)]">42</div>
                    <div className="absolute inset-0 rounded-full bg-indi-gold/0 group-hover:bg-indi-gold/10 transition-colors duration-300"></div>
                </div>
                <div className="block text-center px-2">
                    <h3 className="text-indi-gold font-serif text-sm tracking-wide group-hover:text-white transition-colors truncate w-32">{displayName}</h3>
                    <p className="text-[9px] text-slate-500 uppercase tracking-widest">Grand Sage</p>
                </div>
            </motion.div>

            {/* Nav Items */}
            <div className="flex-1 w-full space-y-2 px-2">
                <NavItem
                    icon={<Map size={20} />}
                    label="Map"
                    isActive={activeScreen === 'MAP'}
                    onClick={() => setScreen('MAP')}
                    variants={itemVariants}
                />
                <NavItem
                    icon={<Scroll size={20} />}
                    label="Grantha"
                    isActive={activeScreen === 'DEX'}
                    onClick={() => setScreen('DEX')}
                    variants={itemVariants}
                />
                <NavItem
                    icon={<Award size={20} />}
                    label="Leaderboard"
                    isActive={activeScreen === 'LEADERBOARD'}
                    onClick={() => setScreen('LEADERBOARD')}
                    variants={itemVariants}
                />
                <NavItem
                    icon={<Briefcase size={20} />}
                    label="Inventory"
                    isActive={activeScreen === 'INVENTORY'}
                    onClick={() => { }}
                    variants={itemVariants}
                />
            </div>

            {/* Bottom Settings */}
            <div className="w-full px-2 mt-auto">
                <NavItem
                    icon={<Settings size={20} />}
                    label="Settings"
                    isActive={activeScreen === 'SETTINGS'}
                    onClick={() => setScreen('SETTINGS')}
                    variants={itemVariants}
                />
            </div>

            <motion.div variants={itemVariants} className="mt-4 opacity-30 group">
                <img src="/assets/logo.png" className="w-6 invert group-hover:scale-110 transition-transform duration-300" />
            </motion.div>
        </motion.div>
    );
};

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
    variants: any;
}

const NavItem = ({ icon, label, isActive, onClick, variants }: NavItemProps) => (
    <motion.button
        variants={variants}
        onClick={onClick}
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full flex justify-start items-center gap-3 p-3 rounded-lg transition-all duration-300 group relative overflow-hidden
      ${isActive
                ? 'bg-indi-gold/10 text-indi-gold border border-indi-gold/20 shadow-[inset_0_0_20px_rgba(245,158,11,0.05)]'
                : 'text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent'
            }`}
    >
        {/* Left Active Indicator */}
        {isActive && (
            <motion.div 
                layoutId="nav-active"
                className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indi-gold rounded-r shadow-[0_0_10px_rgba(245,158,11,0.5)]"
            />
        )}

        <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105 group-hover:text-indi-gold'}`}>
            {icon}
        </div>

        <span className={`block font-pixel text-sm uppercase tracking-wider ${isActive ? 'font-bold' : ''}`}>
            {label}
        </span>

        {/* Subtle Hover Glow */}
        <div className="absolute inset-0 bg-indi-gold/0 group-hover:bg-indi-gold/5 transition-colors duration-300 pointer-events-none"></div>
    </motion.button>
);

export default Sidebar;
