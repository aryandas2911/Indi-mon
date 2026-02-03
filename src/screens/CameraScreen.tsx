import React, { useEffect, useRef } from 'react';
import { X, Camera, Zap, RefreshCw } from 'lucide-react';

const CameraScreen = ({ onClose }: { onClose: () => void }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        //   .then(stream => {
        //     if (videoRef.current) videoRef.current.srcObject = stream;
        //   })
        //   .catch(err => console.error("Camera access denied", err));
        // Commented out to prevent permission request in preview/iframe without user interaction context
    }, []);

    return (
        <div className="w-full h-full bg-black relative z-[60] flex flex-col">
            {/* Live Camera Feed Placeholder */}
            <div className="absolute inset-0 bg-slate-800">
                {/* Fallback Image if camera off */}
                <img src="/assets/temple.jpg" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
            </div>

            {/* HUD Overlay */}
            <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6">
                {/* Top Bar */}
                <div className="flex justify-between items-start pointer-events-auto">
                    <button onClick={onClose} className="w-10 h-10 rounded-full bg-black/40 backdrop-blur text-white flex items-center justify-center border border-white/20">
                        <X size={20} />
                    </button>
                    <div className="bg-black/50 backdrop-blur px-4 py-1 rounded-full border border-indi-gold/30">
                        <span className="text-indi-gold font-pixel text-sm tracking-widest uppercase">Heritage Scanner Active</span>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur text-white flex items-center justify-center border border-white/20">
                        <Zap size={20} />
                    </button>
                </div>

                {/* Reticle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-indi-gold/50 rounded-lg flex items-center justify-center">
                    <div className="w-60 h-60 border-2 border-indi-gold rounded-lg opacity-80 relative">
                        {/* Corners */}
                        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-indi-gold"></div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-indi-gold"></div>
                        <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-indi-gold"></div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-indi-gold"></div>

                        {/* Center Crosshair */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-indi-gold rounded-full shadow-[0_0_10px_orange]"></div>
                    </div>

                    {/* Parsing Text */}
                    <div className="absolute top-full mt-4 text-center">
                        <p className="text-white/80 font-pixel text-xs bg-black/50 px-2 py-1 rounded">Align Structure within Reticle</p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex justify-between items-center w-full mb-8 pointer-events-auto">
                    <div className="w-12 h-12 rounded-lg bg-black/40 border border-white/20">
                        <img src="/assets/temple.jpg" className="w-full h-full object-cover rounded-lg opacity-50" />
                    </div>

                    {/* Shutter Button */}
                    <button className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center relative group active:scale-95 transition-transform">
                        <div className="w-16 h-16 bg-white rounded-full group-hover:bg-indi-gold transition-colors"></div>
                    </button>

                    <button className="w-12 h-12 rounded-full bg-black/40 border border-white/20 flex items-center justify-center text-white">
                        <RefreshCw size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CameraScreen;
