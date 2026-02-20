import { Maximize, Camera } from 'lucide-react';

interface MapScreenProps {
    onShowCamera: () => void;
}

const MapScreen = ({ onShowCamera }: MapScreenProps) => {
    return (
        <div className="w-full h-full bg-[#1e293b] relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('/assets/map.png')] bg-cover bg-center opacity-40"></div>

            {/* Map UI Overlay */}
            <div className="absolute top-6 right-6 flex gap-3">
                <button className="p-3 bg-black/60 text-indi-gold border border-indi-gold/30 rounded-lg backdrop-blur hover:bg-black/80">
                    <Maximize size={20} />
                </button>
            </div>

            {/* FAB Camera */}
            <button
                onClick={onShowCamera}
                className="absolute bottom-10 right-10 w-20 h-20 bg-gradient-to-br from-indi-gold to-amber-600 rounded-full flex items-center justify-center text-indi-dark shadow-[0_0_40px_rgba(245,158,11,0.6)] border-[4px] border-white/20 transform hover:scale-110 hover:rotate-90 transition-all duration-300 group z-20"
            >
                <Camera size={32} className="text-[#0f172a] drop-shadow-md" />
            </button>

            {/* Placeholder Content */}
            <div className="text-center z-10 p-8 bg-[#fdf6e3]/90 border border-amber-900/20 rounded-xl shadow-2xl max-w-md backdrop-blur-sm">
                <h2 className="font-serif text-3xl text-amber-900 mb-2">The Known World</h2>
                <p className="font-pixel text-amber-800 text-lg tracking-wider">Map Module Initializing...</p>
                <div className="mt-6 w-full bg-amber-900/10 h-1 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-600 w-2/3 animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};

export default MapScreen;
