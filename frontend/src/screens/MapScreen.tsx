import { useRef, useEffect, useState } from 'react';
import { Camera, Home, MapPin, X } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { heritageSites } from '../data/heritageSites';
import type { HeritageSite } from '../data/heritageSites';

interface MapScreenProps {
    onShowCamera: () => void;
}

const MapScreen = ({ onShowCamera }: MapScreenProps) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<L.Map | null>(null);
    const [selectedSite, setSelectedSite] = useState<HeritageSite | null>(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

    useEffect(() => {
        // Request user location
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation([position.coords.latitude, position.coords.longitude]);
                },
                () => {
                    // Default to Delhi if permission denied
                    setUserLocation([28.6139, 77.2090]);
                }
            );
        } else {
            setUserLocation([28.6139, 77.2090]);
        }
    }, []);

    useEffect(() => {
        if (!mapContainer.current || map.current || !userLocation) return;

        // Initialize Leaflet map
        map.current = L.map(mapContainer.current, {
            center: userLocation,
            zoom: 13,
            zoomControl: false,
            attributionControl: false
        });

        // Add CartoDB Dark Matter tile layer
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 19
        }).addTo(map.current);

        // Add user location marker
        const userIcon = L.divIcon({
            className: 'user-location-marker',
            html: `
                <div class="user-marker" style="
                    width: 20px; 
                    height: 20px; 
                    border-radius: 50%; 
                    background-color: #3b82f6; 
                    border: 3px solid white; 
                    box-shadow: 0 0 10px rgba(59, 130, 246, 0.8);
                    animation: pulse 2s infinite;
                "></div>
                <style>
                    @keyframes pulse {
                        0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
                        70% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
                        100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
                    }
                </style>
            `,
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });

        L.marker(userLocation, { icon: userIcon }).addTo(map.current);

        setMapLoaded(true);

        // Add markers for heritage sites
        heritageSites.forEach((site) => {
            const latlng: L.LatLngExpression = [site.coordinates[1], site.coordinates[0]];

            const statusColor = site.status === 'Verified' ? '#f59e0b' : 
                               site.status === 'Pending' ? '#fbbf24' : '#94a3b8';

            const icon = L.divIcon({
                className: 'custom-div-icon',
                html: `
                    <div class="marker-disk" style="
                        width: 100%; height: 100%;
                        background-color: ${statusColor}33;
                        border: 1px solid ${statusColor}aa;
                        border-radius: 50%; display: flex;
                        align-items: center; justify-content: center;
                        backdrop-filter: blur(4px); transition: all 0.3s;
                    ">
                        ${getIconHtml(site.category, statusColor)}
                    </div>
                `,
                iconSize: [40, 40],
                iconAnchor: [20, 20]
            });

            const marker = L.marker(latlng, { icon }).addTo(map.current!);

            marker.on('mouseover', (e: L.LeafletMouseEvent) => {
                const el = e.target.getElement()?.querySelector('.marker-disk') as HTMLElement;
                if (el) {
                    el.style.transform = 'scale(1.2)';
                    el.style.backgroundColor = `${statusColor}66`;
                }
            });

            marker.on('mouseout', (e: L.LeafletMouseEvent) => {
                const el = e.target.getElement()?.querySelector('.marker-disk') as HTMLElement;
                if (el) {
                    el.style.transform = 'scale(1)';
                    el.style.backgroundColor = `${statusColor}33`;
                }
            });

            marker.on('click', () => {
                setSelectedSite(site);
                map.current?.flyTo(latlng, 16, {
                    duration: 1.5,
                    easeLinearity: 0.25
                });
            });
        });

        return () => {
            map.current?.remove();
            map.current = null;
        };
    }, [userLocation]);

    const getIconHtml = (category: string, color: string) => {
        if (category === 'temple') {
            return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><path d="M12 2l10 10H2L12 2z"/><rect x="4" y="12" width="16" height="10"/></svg>`;
        } else if (category === 'fort') {
            return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><path d="M3 21v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4M17 21v-4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v4M3 11V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5M3 11h18M3 11l2 2m16-2l-2 2M12 4v4M12 11l-2 2m4-2l-2 2"/></svg>`;
        } else {
            return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>`;
        }
    };

    const resetView = () => {
        if (userLocation) {
            map.current?.flyTo(userLocation, 13, {
                duration: 1.5
            });
            setSelectedSite(null);
        }
    };

    return (
        <div className="w-full h-full relative overflow-hidden bg-slate-950">
            {/* Map Container */}
            <div ref={mapContainer} className="w-full h-full z-0" />

            {/* Premium Overlay Filter */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0b101b]/40 via-transparent to-transparent z-10" />

            {/* Map UI Overlay */}
            <div className="absolute top-6 right-6 flex flex-col gap-3 z-20">
                <button 
                    onClick={resetView}
                    className="p-3 bg-black/60 text-indi-gold border border-indi-gold/30 rounded-lg backdrop-blur hover:bg-black/80 transition-colors group"
                    title="Reset View"
                >
                    <Home size={20} className="group-hover:scale-110 transition-transform" />
                </button>
                
            </div>

            {/* Active Site Detailed Info Card */}
            <div className={`absolute bottom-6 left-6 right-20 md:right-auto md:max-w-md z-30 transition-all duration-500 transform ${selectedSite ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
                {selectedSite && (
                    <div className="bg-[#fdf6e3] rounded-2xl overflow-hidden text-slate-900 shadow-2xl relative group border-2 border-indi-gold/30">
                        {/* Close button */}
                        <button 
                            onClick={() => setSelectedSite(null)}
                            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-black/10 hover:bg-black/20 rounded-full transition-colors z-10"
                        >
                            <X size={16} />
                        </button>

                        <div className="p-5 flex flex-col md:flex-row gap-5">
                            {/* Image area */}
                            <div className="w-full md:w-32 h-32 bg-slate-200 rounded-xl shrink-0 overflow-hidden border border-amber-900/20 shadow-inner">
                                <img src={selectedSite.image} className="w-full h-full object-cover sepia-[.2]" alt={selectedSite.name} />
                            </div>

                            {/* Content area */}
                            <div className="flex-1 min-w-0 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-1">
                                         <h3 className="font-serif text-2xl leading-tight text-amber-950 truncate">{selectedSite.name}</h3>
                                         <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ml-2 shrink-0 ${
                                             selectedSite.status === 'Verified' ? 'bg-green-600 text-white' : 
                                             selectedSite.status === 'Pending' ? 'bg-amber-500 text-white' : 
                                             'bg-slate-500 text-white'
                                         }`}>
                                             {selectedSite.status.toUpperCase()}
                                         </span>
                                     </div>
                                     
                                     {/* Coordinates & Region label */}
                                     <div className="flex items-center justify-between text-[10px] text-amber-900/60 font-pixel mb-2">
                                         <div className="flex items-center gap-1.5">
                                             <MapPin size={10} />
                                             <span>{selectedSite.coordinates[1].toFixed(4)}, {selectedSite.coordinates[0].toFixed(4)}</span>
                                         </div>
                                         <span className="bg-amber-900/10 px-1.5 rounded">{selectedSite.region}</span>
                                     </div>

                                     <p className="text-xs text-amber-950 leading-relaxed font-serif line-clamp-2 md:line-clamp-3 mb-2">
                                         {selectedSite.description}
                                     </p>
                                 </div>
                            </div>
                        </div>

                        {/* Extended Info Section */}
                        <div className="px-5 pb-5 border-t border-amber-900/10 pt-3">
                            <div className="mb-3">
                                <h4 className="text-[10px] font-pixel text-amber-800/70 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                                    <span className="w-4 h-[1px] bg-amber-800/30"></span> 
                                    {selectedSite.status === 'Undiscovered' ? 'Ancient Rumor' : 'Significance'} 
                                    <span className="w-full h-[1px] bg-amber-800/30"></span>
                                </h4>
                                <p className="text-[11px] text-amber-900 leading-snug font-serif italic">
                                    {selectedSite.history || selectedSite.teaser || "History lost to the sands of time..."}
                                </p>
                            </div>

                            {selectedSite.activities && selectedSite.activities.length > 0 && (
                                <div>
                                    <h4 className="text-[10px] font-pixel text-amber-800/70 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                                        <span className="w-4 h-[1px] bg-amber-800/30"></span> Nearby Rituals <span className="w-full h-[1px] bg-amber-800/30"></span>
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedSite.activities.map((activity, i) => (
                                            <span key={i} className="text-[9px] font-bold bg-amber-900/5 text-amber-800 px-2 py-1 rounded-md border border-amber-900/10">
                                                {activity}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {selectedSite.discoveredOn && (
                                <div className="mt-3 text-[9px] font-pixel text-amber-900/40 text-right uppercase tracking-tighter">
                                    Logged on {selectedSite.discoveredOn}
                                </div>
                            )}
                        </div>

                        {/* Royal Seal decoration */}
                        {selectedSite.isRare && (
                            <div className="absolute bottom-16 right-4 w-16 h-16 rounded-full border-2 border-amber-800/20 text-[9px] text-amber-900/30 flex items-center justify-center font-bold uppercase -rotate-12 border-dashed pointer-events-none">
                                Royal Seal
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Empty State Explorer Mode - only show when nothing selected */}
            {!selectedSite && (
                <div className="absolute bottom-10 left-10 z-20 transition-all duration-500">
                    <div className="p-6 bg-black/40 border border-white/5 rounded-2xl backdrop-blur-md shadow-xl animate-in fade-in">
                        <h3 className="font-serif text-lg text-slate-300 tracking-widest uppercase mb-1">Explorer Mode</h3>
                        <p className="font-pixel text-slate-500 text-xs tracking-wider">Tap a relic to focus the lens</p>
                    </div>
                </div>
            )}

            {/* FAB Camera */}
            <button
                onClick={onShowCamera}
                className="absolute bottom-10 right-10 w-20 h-20 bg-gradient-to-br from-indi-gold to-amber-600 rounded-full flex items-center justify-center text-indi-dark shadow-[0_0_40px_rgba(245,158,11,0.6)] border-[4px] border-white/20 transform hover:scale-110 hover:rotate-90 transition-all duration-300 group z-20"
            >
                <Camera size={32} className="text-[#0f172a] drop-shadow-md" />
            </button>

            {/* Map Loading State */}
            {(!mapLoaded || !userLocation) && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950">
                    <div className="text-center p-8 bg-[#131b2e]/90 border border-indi-gold/20 rounded-xl shadow-2xl max-w-md backdrop-blur-sm">
                        <h2 className="font-serif text-3xl text-indi-gold mb-2">The Ancient Scrolls</h2>
                        <p className="font-pixel text-slate-400 text-lg tracking-wider animate-pulse">Unrolling Map Data...</p>
                        <div className="mt-6 w-full bg-indi-gold/10 h-1 rounded-full overflow-hidden">
                            <div className="h-full bg-indi-gold w-2/3 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MapScreen;
