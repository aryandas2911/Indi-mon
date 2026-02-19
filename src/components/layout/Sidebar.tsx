import { Map, Scroll, Award, Settings, Briefcase } from 'lucide-react';

interface SidebarProps {
    activeScreen: string;
    setScreen: (screen: 'LANDING' | 'MAP' | 'DEX' | 'LEADERBOARD' | 'PROFILE') => void;
}

const Sidebar = ({ activeScreen, setScreen }: SidebarProps) => {
    return (
        <div className="w-20 lg:w-44 h-full bg-[#161b22] border-r border-[#30363d] flex flex-col items-center py-6 z-20 shrink-0">
            {/* Profile Avatar / Top */}
            <div className="mb-8 flex flex-col items-center cursor-pointer group" onClick={() => setScreen('PROFILE')}>
                <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full border-2 border-indi-gold p-0.5 mb-2 relative">
                    <img src="/assets/profile-pic (1).jpg" className="w-full h-full rounded-full object-cover" />
                    <div className="absolute -bottom-1 -right-1 bg-indi-gold text-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold font-pixel border border-black">42</div>
                </div>
                <div className="hidden lg:block text-center">
                    <h3 className="text-indi-gold font-serif text-sm tracking-wide group-hover:text-white transition-colors">Explorer</h3>
                    <p className="text-[9px] text-slate-500 uppercase tracking-widest">Grand Sage</p>
                </div>
            </div>

            {/* Nav Items */}
            <div className="flex-1 w-full space-y-2 px-2">
                <NavItem
                    icon={<Map size={20} />}
                    label="Map"
                    isActive={activeScreen === 'MAP'}
                    onClick={() => setScreen('MAP')}
                />
                <NavItem
                    icon={<Scroll size={20} />}
                    label="Grantha"
                    isActive={activeScreen === 'DEX'}
                    onClick={() => setScreen('DEX')}
                />
                <NavItem
                    icon={<Award size={20} />}
                    label="Leaderboard"
                    isActive={activeScreen === 'LEADERBOARD'}
                    onClick={() => setScreen('LEADERBOARD')}
                />
                <NavItem
                    icon={<Briefcase size={20} />}
                    label="Inventory"
                    isActive={activeScreen === 'INVENTORY'}
                    onClick={() => { }}
                />
            </div>

            {/* Bottom Settings */}
            <div className="w-full px-2 mt-auto">
                <NavItem
                    icon={<Settings size={20} />}
                    label="Settings"
                    isActive={activeScreen === 'SETTINGS'}
                    onClick={() => { }}
                />
            </div>

            <div className="mt-4 opacity-30">
                <img src="/assets/logo.png" className="w-6 invert" />
            </div>
        </div>
    );
};

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const NavItem = ({ icon, label, isActive, onClick }: NavItemProps) => (
    <button
        onClick={onClick}
        className={`w-full flex lg:justify-start justify-center items-center gap-3 p-3 rounded-lg transition-all duration-200 group relative
      ${isActive
                ? 'bg-indi-gold/10 text-indi-gold border border-indi-gold/20'
                : 'text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent'
            }`}
    >
        {/* Left Active Indicator */}
        {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indi-gold rounded-r"></div>}

        <div className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
            {icon}
        </div>

        <span className={`hidden lg:block font-pixel text-sm uppercase tracking-wider ${isActive ? 'font-bold' : ''}`}>
            {label}
        </span>
    </button>
);

export default Sidebar;
