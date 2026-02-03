import { useState } from 'react';
import GameContainer from './components/layout/GameContainer';
import ProfileScreen from './screens/ProfileScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import HeritageDexScreen from './screens/HeritageDexScreen';
import CameraScreen from './screens/CameraScreen';
import InfoScreen from './screens/InfoScreen';
import { Scroll, Award, User, Compass, Camera } from 'lucide-react';

export default function App() {
  const [screen, setScreen] = useState<'LANDING' | 'MAP' | 'DEX' | 'LEADERBOARD' | 'PROFILE'>('LANDING');
  const [showCamera, setShowCamera] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const renderScreen = () => {
    switch (screen) {
      case 'PROFILE': return <ProfileScreen />;
      case 'LEADERBOARD': return <LeaderboardScreen />;
      case 'DEX': return <div onClick={() => setShowInfo(true)}><HeritageDexScreen /></div>; // Hack to demo Info screen logic (click anywhere in dex)
      case 'MAP': return (
        <div className="w-full h-full bg-[#eaddcf] relative flex items-center justify-center">
          <div className="absolute inset-0 opacity-30 bg-[url('/assets/map.png')] bg-cover bg-center grayscale mix-blend-multiply"></div>
          <div className="text-center z-10 p-6 bg-[#fdf6e3]/90 border border-amber-900/20 rounded shadow-xl">
            <h2 className="font-serif text-2xl text-amber-900 mb-2">The Known World</h2>
            <p className="font-pixel text-amber-800 text-lg">Map Module Initializing...</p>
            <div className="mt-4 flex gap-2 justify-center">
              <span className="w-2 h-2 bg-amber-600 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-amber-600 rounded-full animate-bounce delay-75"></span>
              <span className="w-2 h-2 bg-amber-600 rounded-full animate-bounce delay-150"></span>
            </div>
          </div>
        </div>
      );
      default: return null;
    }
  };

  return (
    <GameContainer>
      {/* Full Screen Overlays */}
      {showCamera && (
        <div className="absolute inset-0 z-50">
          <CameraScreen onClose={() => setShowCamera(false)} />
        </div>
      )}

      {showInfo && (
        <div className="absolute inset-0 z-40">
          <InfoScreen onBack={() => setShowInfo(false)} />
        </div>
      )}

      {screen === 'LANDING' ? (
        <div className="w-full h-full flex flex-col items-center justify-center text-white relative bg-[#020617] overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('/assets/map.png')] bg-cover bg-center pointer-events-none animate-pulse-slow"></div>

          <div className="w-32 h-32 mb-6 rounded-full bg-gradient-to-b from-orange-500 to-green-600 p-1 shadow-[0_0_40px_rgba(245,158,11,0.4)] relative animate-spin-slow">
            <div className="w-full h-full bg-[#0f172a] rounded-full flex items-center justify-center border-4 border-indi-gold">
              <span className="text-4xl">🛕</span>
            </div>
            <div className="absolute top-1/2 left-0 w-full h-1 bg-indi-dark/50"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 rounded-full border-2 border-white"></div>
          </div>

          <div className="z-10 bg-black/40 p-8 rounded-2xl backdrop-blur-md border border-indi-gold/30 text-center mx-6 shadow-2xl">
            <h1 className="font-serif text-5xl text-indi-gold mb-2 tracking-wide drop-shadow-[0_2px_0_rgba(0,0,0,1)]">Indi-Mon</h1>
            <p className="font-pixel text-xl mb-8 text-indi-parchment/90 tracking-widest">Gotta Map 'Em All!</p>

            <button
              onClick={() => setScreen('PROFILE')}
              className="group relative px-8 py-3 bg-gradient-to-r from-indi-gold to-amber-500 text-black font-bold text-lg rounded-full shadow-[0_0_20px_rgba(245,158,11,0.5)] active:scale-95 transition-all hover:scale-105"
            >
              <span className="font-serif tracking-wide relative z-10">Start Journey</span>
            </button>
          </div>

          <div className="absolute bottom-8 text-[10px] text-white/30 font-pixel uppercase tracking-widest">
            v0.1.0 Alpha Build
          </div>
        </div>
      ) : (
        <>
          {renderScreen()}

          {/* Bottom Nav */}
          {!showInfo && !showCamera && (
            <div className="absolute bottom-6 left-4 right-4 bg-[#0f172a]/95 backdrop-blur-xl border border-white/10 rounded-2xl px-1 py-2 flex justify-between items-center shadow-2xl z-30">
              <NavButton icon={<Compass size={22} />} label="Map" active={screen === 'MAP'} onClick={() => setScreen('MAP')} />
              <NavButton icon={<Scroll size={22} />} label="Grantha" active={screen === 'DEX'} onClick={() => setScreen('DEX')} />

              <div className="relative -top-7 mx-2">
                <button
                  onClick={() => setShowCamera(true)}
                  className="w-16 h-16 bg-gradient-to-b from-indi-gold to-amber-600 rounded-full flex items-center justify-center text-indi-dark shadow-[0_0_25px_rgba(245,158,11,0.5)] border-[5px] border-[#0f172a] transform active:scale-95 transition-transform group"
                >
                  <Camera size={28} className="text-[#0f172a] group-hover:scale-110 transition-transform" />
                </button>
              </div>

              <NavButton icon={<Award size={22} />} label="Rank" active={screen === 'LEADERBOARD'} onClick={() => setScreen('LEADERBOARD')} />
              <NavButton icon={<User size={22} />} label="Profile" active={screen === 'PROFILE'} onClick={() => setScreen('PROFILE')} />
            </div>
          )}
        </>
      )}
    </GameContainer>
  );
}

const NavButton = ({ icon, label, active, onClick }: any) => (
  <button onClick={onClick} className={`flex flex-col items-center justify-center gap-1 w-14 h-12 transition-all rounded-xl ${active ? 'text-indi-gold bg-indi-gold/5' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}>
    {icon}
    <span className={`text-[8px] font-bold uppercase tracking-widest ${active ? 'opacity-100' : 'opacity-0'} transition-opacity absolute -bottom-2`}>{label}</span>
  </button>
);
