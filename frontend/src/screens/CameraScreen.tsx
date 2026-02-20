import { useRef, useEffect, useState } from 'react';
import { X, Zap, RefreshCw, Maximize, Camera, Check, AlertCircle, MapPin, ChevronDown } from 'lucide-react';
import { heritageSites } from '../data/heritageSites';
import { motion, AnimatePresence } from 'framer-motion';

const CameraScreen = ({ onClose }: { onClose: () => void }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const [selectedMonument, setSelectedMonument] = useState<string>('');
    const [verificationResult, setVerificationResult] = useState<'SUCCESS' | 'PENDING' | 'DENIED' | null>(null);
    const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
    const [distanceError, setDistanceError] = useState<number | null>(null);

    useEffect(() => {
        startCamera();
        captureLocation();
        return () => {
            if (stream) {
                stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
            }
        };
    }, []);

    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371; // Earth radius in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    };

    const startCamera = async () => {
        try {
            const isMobile = window.innerWidth < 768;
            const constraints = {
                video: {
                    facingMode: isMobile ? "environment" : "user",
                    width: { ideal: 1920 },
                    height: { ideal: 1080 }
                }
            };
            const newStream = await navigator.mediaDevices.getUserMedia(constraints);
            setStream(newStream);
            if (videoRef.current) {
                videoRef.current.srcObject = newStream;
            }
        } catch (err) {
            console.error("Error accessing camera:", err);
        }
    };

    const captureLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            }, (err) => {
                console.error("Location error:", err);
                // Fallback location for testing (near Red Fort)
                setLocation({ lat: 28.6562, lng: 77.2410 });
            });
        }
    };

    const takePicture = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const dataUrl = canvas.toDataURL('image/jpeg');
                setCapturedImage(dataUrl);
                if (stream) {
                    stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
                }
            }
        }
    };

    const handleVerify = () => {
        if (!location) {
            alert("No location data found. Please enable GPS.");
            return;
        }

        setIsVerifying(true);
        setDistanceError(null);
        
        setTimeout(() => {
            if (selectedMonument === 'new') {
                setVerificationResult('PENDING');
            } else {
                const site = heritageSites.find(s => s.id === selectedMonument);
                if (site) {
                    const dist = calculateDistance(
                        location.lat, 
                        location.lng, 
                        site.coordinates[1], 
                        site.coordinates[0]
                    );

                    // Threshold: 1.0 km for verification
                    if (dist <= 1.0) {
                        setVerificationResult('SUCCESS');
                    } else {
                        setDistanceError(parseFloat(dist.toFixed(2)));
                        setVerificationResult('DENIED');
                    }
                }
            }
            setIsVerifying(false);
        }, 2000);
    };

    const resetCamera = () => {
        setCapturedImage(null);
        setVerificationResult(null);
        setSelectedMonument('');
        setDistanceError(null);
        startCamera();
    };

    return (
        <div className="w-full h-full bg-black relative z-[60] flex overflow-hidden">
            {/* Live Camera Feed / Captured Image */}
            <div className="absolute inset-0 bg-slate-900">
                {!capturedImage ? (
                    <video 
                        ref={videoRef} 
                        autoPlay 
                        playsInline 
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <img src={capturedImage} className="w-full h-full object-cover" alt="Captured" />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
            </div>

            <canvas ref={canvasRef} className="hidden" />

            {/* HUD Layer */}
            <AnimatePresence>
                {!capturedImage && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 pointer-events-none p-8 flex flex-col justify-between"
                    >
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

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vh] h-[40vh] flex items-center justify-center">
                            <div className="w-full h-full border-2 border-indi-gold opacity-80 relative">
                                <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-indi-gold"></div>
                                <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-indi-gold"></div>
                                <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-indi-gold"></div>
                                <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-indi-gold"></div>
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
                        </div>

                        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-6 pointer-events-auto">
                            <button 
                                onClick={takePicture}
                                className="w-24 h-24 rounded-full border-4 border-white flex items-center justify-center relative group active:scale-95 transition-transform shadow-lg bg-black/20 backdrop-blur-sm"
                            >
                                <div className="w-20 h-20 bg-white rounded-full group-hover:bg-indi-gold transition-colors shadow-inner"></div>
                            </button>

                            <button onClick={startCamera} className="w-14 h-14 rounded-full bg-black/60 backdrop-blur text-white flex items-center justify-center border border-white/20 self-center">
                                <RefreshCw size={24} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Verification Dialog */}
            <AnimatePresence>
                {capturedImage && !verificationResult && (
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="absolute inset-x-4 bottom-10 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[480px] bg-[#fdf6e3] rounded-3xl shadow-2xl overflow-hidden border-2 border-indi-gold/50 z-[70]"
                    >
                        <div className="p-8">
                            <h3 className="font-serif text-3xl text-amber-950 mb-2">Identify Heritage</h3>
                            <p className="text-xs text-amber-900/70 font-pixel uppercase tracking-widest mb-6 flex items-center gap-2">
                                <MapPin size={12} />
                                {location ? `Coordinates Locked: ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : 'Wait for location lock...'}
                            </p>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-bold text-amber-900/50 uppercase tracking-widest mb-2">Heritage Sanctum</label>
                                    <div className="relative">
                                        <select 
                                            value={selectedMonument}
                                            onChange={(e) => setSelectedMonument(e.target.value)}
                                            className="w-full bg-white border-2 border-amber-900/10 rounded-xl px-4 py-4 text-amber-950 font-serif focus:outline-none focus:border-indi-gold transition-colors appearance-none cursor-pointer text-lg shadow-inner"
                                        >
                                            <option value="" disabled>Select the Ancestral Site...</option>
                                            {heritageSites.map(site => (
                                                <option key={site.id} value={site.id}>{site.name}</option>
                                            ))}
                                            <option value="new" className="font-bold text-amber-700">✦ Map New Discovery</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-amber-900/30">
                                            <ChevronDown size={20} />
                                        </div>
                                    </div>
                                </div>

                                {selectedMonument === 'new' && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                                        <label className="block text-[10px] font-bold text-amber-900/50 uppercase tracking-widest mb-2">Scroll Name</label>
                                        <input 
                                            type="text" 
                                            placeholder="Enter the name of this relic..."
                                            className="w-full bg-white border-2 border-amber-900/10 rounded-xl px-4 py-3 text-amber-950 font-serif focus:outline-none focus:border-indi-gold transition-colors"
                                        />
                                    </motion.div>
                                )}

                                <div className="flex gap-3">
                                    <button 
                                        onClick={resetCamera}
                                        className="flex-1 py-4 px-6 border-2 border-amber-900/10 rounded-xl text-amber-900 font-bold uppercase tracking-widest text-[10px] hover:bg-amber-900/5 transition-colors"
                                    >
                                        Reset Lens
                                    </button>
                                    <button 
                                        onClick={handleVerify}
                                        disabled={!selectedMonument || isVerifying || !location}
                                        className="flex-[2] py-4 px-6 bg-amber-950 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-xl hover:bg-black transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {isVerifying ? (
                                            <RefreshCw size={16} className="animate-spin" />
                                        ) : (
                                            <Camera size={16} />
                                        )}
                                        {isVerifying ? 'Verifying Soul...' : 'Invoke Identity'}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="h-2 bg-gradient-to-r from-transparent via-indi-gold to-transparent"></div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Result Dialog */}
            <AnimatePresence>
                {verificationResult && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 flex items-center justify-center z-[80] bg-black/80 backdrop-blur-sm p-4"
                    >
                        <div className="bg-[#fdf6e3] rounded-3xl shadow-2xl overflow-hidden border-4 border-indi-gold w-full max-w-sm">
                            <div className="p-8 text-center">
                                {verificationResult === 'SUCCESS' ? (
                                    <div className="mb-6">
                                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-500 text-green-600">
                                            <Check size={40} />
                                        </div>
                                        <h3 className="font-serif text-3xl text-amber-950">Verified Visit!</h3>
                                        <p className="text-amber-900/70 font-serif italic mt-2">The Fog of War clears. Your location matches the sacred geometry of this site.</p>
                                        <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
                                            <span className="text-[10px] font-pixel text-green-700 uppercase tracking-widest">+ 108 Heritage Points</span>
                                        </div>
                                    </div>
                                ) : verificationResult === 'DENIED' ? (
                                    <div className="mb-6">
                                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-red-500 text-red-600">
                                            <X size={40} />
                                        </div>
                                        <h3 className="font-serif text-3xl text-amber-950">Identity Mismatch</h3>
                                        <p className="text-amber-900/70 font-serif italic mt-2">The Lens of Truth reveals you are {distanceError}km away from this site. You must be present at the gates.</p>
                                        <div className="mt-6 p-4 bg-red-50 rounded-xl border border-red-200">
                                            <span className="text-[10px] font-pixel text-red-700 uppercase tracking-widest">Verification Denied: Out of Range</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mb-6">
                                        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-amber-500 text-amber-600">
                                            <AlertCircle size={40} />
                                        </div>
                                        <h3 className="font-serif text-3xl text-amber-950">New Discovery!</h3>
                                        <p className="text-amber-900/70 font-serif italic mt-2">This soul is not yet bound to our records. Sent to ASI officials for Digital Sealing.</p>
                                        <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
                                            <span className="text-[10px] font-pixel text-amber-700 uppercase tracking-widest text-left block">
                                                Status: Pending Digital Panel<br/>
                                                Registry: Under Verification
                                            </span>
                                        </div>
                                    </div>
                                )}

                                <button 
                                    onClick={verificationResult === 'DENIED' ? resetCamera : onClose}
                                    className="w-full py-4 bg-amber-950 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-black transition-colors shadow-lg"
                                >
                                    {verificationResult === 'DENIED' ? 'Try Again' : 'Return to Journey'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default CameraScreen;
