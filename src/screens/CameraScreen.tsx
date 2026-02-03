import { X, Zap, RefreshCw, Maximize, FileText } from 'lucide-react';

const CameraScreen = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className="w-full h-full bg-black relative z-[60] flex overflow-hidden">
            {/* Live Camera Feed (Full Landscape) */}
            <div className="absolute inset-0 bg-slate-900">
                <img src="/assets/temple.jpg" className="w-full h-full object-cover opacity-80 scale-105" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
            </div>

            {/* HUD Layer */}
            <div className="absolute inset-0 pointer-events-none p-8 flex flex-col justify-between">
                {/* Top Bar */}
                <div className="flex justify-between items-start pointer-events-auto">
                    <div className="flex gap-4">
                        <button onClick={onClose} className="w-12 h-12 rounded-full bg-black/60 backdrop-blur text-white flex items-center justify-center border border-white/20 hover:bg-red-500/80 transition-colors">
                            <X size={24} />
                        </button>
                        <div className="h-12 px-6 flex items-center bg-black/60 backdrop-blur rounded-full border border-indi-gold/50">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-3"></div>
                            <span className="text-indi-gold font-pixel text-sm tracking-widest uppercase">Heritage Scanner Active</span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button className="w-12 h-12 rounded-full bg-black/60 backdrop-blur text-white flex items-center justify-center border border-white/20">
                            <Zap size={20} />
                        </button>
                        <button className="w-12 h-12 rounded-full bg-black/60 backdrop-blur text-white flex items-center justify-center border border-white/20">
                            <Maximize size={20} />
                        </button>
                    </div>
                </div>

                {/* Central Reticle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vh] h-[40vh] border border-white/30 rounded-lg flex items-center justify-center pointer-events-none">
                    <div className="w-full h-full border-2 border-indi-gold opacity-80 relative">
                        {/* Corners */}
                        <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-indi-gold"></div>
                        <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-indi-gold"></div>
                        <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-indi-gold"></div>
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-indi-gold"></div>

                        {/* Grid & Crosshair */}
                        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-20">
                            <div className="border-r border-b border-indi-gold"></div>
                            <div className="border-r border-b border-indi-gold"></div>
                            <div className="border-b border-indi-gold"></div>
                            <div className="border-r border-b border-indi-gold"></div>
                            <div className="border-r border-b border-indi-gold flex items-center justify-center">
                                <div className="w-2 h-2 bg-indi-gold rounded-full shadow-[0_0_10px_orange]"></div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute top-full mt-4 text-center bg-black/60 px-4 py-2 rounded backdrop-blur-md border border-white/10">
                        <p className="text-white font-pixel text-sm tracking-widest text-shadow">Align Structure within Reticle</p>
                    </div>
                </div>

                {/* Bottom Bar / Right Actions */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-6 pointer-events-auto">
                    <button className="w-24 h-24 rounded-full border-4 border-white flex items-center justify-center relative group active:scale-95 transition-transform shadow-lg bg-black/20 backdrop-blur-sm">
                        <div className="w-20 h-20 bg-white rounded-full group-hover:bg-indi-gold transition-colors shadow-inner"></div>
                    </button>

                    <button className="w-14 h-14 rounded-full bg-black/60 backdrop-blur text-white flex items-center justify-center border border-white/20 self-center">
                        <RefreshCw size={24} />
                    </button>
                </div>

                {/* Gallery Preview (Bottom Left) */}
                <div className="pointer-events-auto absolute bottom-8 left-8">
                    <div className="w-16 h-16 rounded-lg bg-black/40 border-2 border-white/20 overflow-hidden relative group cursor-pointer hover:border-indi-gold">
                        <img src="/assets/temple (2).jpg" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <FileText size={20} className="text-white shadow-black drop-shadow-md" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CameraScreen;
