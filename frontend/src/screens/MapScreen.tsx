import { useRef, useEffect, useState } from 'react';
import { Camera, Home, MapPin, X, Users, Search, ShoppingBag, Hotel, Utensils, Tent, Zap } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { HeritageSite, POI } from '../data/heritageSites';

interface MapScreenProps {
    sites: HeritageSite[];
    onShowCamera: () => void;
}

const MapScreen = ({ sites, onShowCamera }: MapScreenProps) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<L.Map | null>(null);
    const [selectedSite, setSelectedSite] = useState<HeritageSite | null>(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [nearbyPOIs, setNearbyPOIs] = useState<POI[]>([]);
    const [poiMarkers, setPoiMarkers] = useState<L.LayerGroup | null>(null);
    const [siteMarkers, setSiteMarkers] = useState<L.LayerGroup | null>(null);


    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation([position.coords.latitude, position.coords.longitude]);
                },
                () => {
                    setUserLocation([28.6139, 77.2090]);
                }
            );
        } else {
            setUserLocation([28.6139, 77.2090]);
        }
    }, []);

    // Initialize Map
    useEffect(() => {
        if (!mapContainer.current || map.current || !userLocation) return;

        map.current = L.map(mapContainer.current, {
            center: userLocation,
            zoom: 13,
            zoomControl: false,
            attributionControl: false
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 19
        }).addTo(map.current);

        // Layer group for POI markers
        const poiGroup = L.layerGroup().addTo(map.current);
        setPoiMarkers(poiGroup);

        // Layer group for Site markers
        const siteGroup = L.layerGroup().addTo(map.current);
        setSiteMarkers(siteGroup);

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
            `,
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });

        L.marker(userLocation, { icon: userIcon }).addTo(map.current);
        setMapLoaded(true);

        return () => {
            map.current?.remove();
            map.current = null;
        };
    }, [userLocation]);

    // Handle site markers separately so they update when 'sites' prop changes
    useEffect(() => {
        if (!map.current || !siteMarkers) return;

        // Clear existing site markers
        siteMarkers.clearLayers();

        // Add markers for heritage sites
        const uniqueSites = sites.filter((site, index, self) =>
            index === self.findIndex((s) => s.id === site.id)
        );

        uniqueSites.forEach((site: HeritageSite) => {
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

            const marker = L.marker(latlng, { icon }).addTo(siteMarkers);

            marker.on('click', () => {
                setSelectedSite(site);
                setNearbyPOIs([]);
                poiMarkers?.clearLayers();
                map.current?.flyTo(latlng, 16, { duration: 1.5 });
            });
        });
    }, [sites, mapLoaded, siteMarkers]);

    // Handle showing POIs on map
    const handleDiscoverNearby = () => {
        if (!selectedSite || !selectedSite.nearby || !map.current || !poiMarkers) return;

        setNearbyPOIs(selectedSite.nearby);
        poiMarkers.clearLayers();

        selectedSite.nearby.forEach(poi => {
            const poiIcon = L.divIcon({
                className: 'poi-marker',
                html: `
                    <div style="
                        width: 30px; height: 30px;
                        background-color: #0f172a;
                        border: 2px solid ${getPoiColor(poi.type)};
                        border-radius: 8px; display: flex;
                        align-items: center; justify-content: center;
                        color: ${getPoiColor(poi.type)};
                        box-shadow: 0 0 15px ${getPoiColor(poi.type)}44;
                        animation: bounce 0.5s ease-out;
                    ">
                        ${getPoiIconSvg(poi.type)}
                    </div>
                `,
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            });

            const marker = L.marker([poi.coordinates[1], poi.coordinates[0]], { icon: poiIcon })
                .addTo(poiMarkers);

            marker.bindTooltip(poi.name, {
                permanent: false,
                direction: 'top',
                className: 'poi-tooltip'
            });
        });

        // Fit bounds to show POIs
        const groupBounds = L.featureGroup(selectedSite.nearby.map(p => L.marker([p.coordinates[1], p.coordinates[0]]))).getBounds();
        map.current.fitBounds(groupBounds, { padding: [50, 50] });
    };

    const getPoiColor = (type: string) => {
        switch (type) {
            case 'shop': return '#f43f5e';
            case 'hotel': return '#3b82f6';
            case 'restaurant': return '#22c55e';
            case 'activity': return '#f59e0b';
            default: return '#94a3b8';
        }
    };

    const getPoiIconSvg = (type: string) => {
        if (type === 'shop') return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>';
        if (type === 'hotel') return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 14V2"/><path d="M17 14V2"/><path d="M3 2v20"/><path d="M21 2v20"/><path d="M7 7h10"/><path d="M7 11h10"/><path d="M7 18h10"/></svg>';
        if (type === 'restaurant') return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Z"/><path d="M18 15v7"/></svg>';
        return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 10.19a1.1 1.1 0 0 1 1.21.36l2.43 2.92c.3.35.26.88-.1 1.2s-.88.26-1.21-.1l-2.43-2.92a1.1 1.1 0 0 1 .1-1.46Z"/><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"/><path d="M12 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/><path d="M16.5 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/><path d="M9.5 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/><path d="M12 18a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/></svg>';
    };

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
            map.current?.flyTo(userLocation, 13, { duration: 1.5 });
            setSelectedSite(null);
            setNearbyPOIs([]);
            poiMarkers?.clearLayers();
        }
    };

    return (
        <div className="w-full h-full relative overflow-hidden bg-slate-950">
            {/* Map Container */}
            <div ref={mapContainer} className="w-full h-full z-0" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0b101b]/40 via-transparent to-transparent z-10" />

            {/* Map UI Overlay */}
            <div className="absolute top-6 right-6 flex flex-col gap-3 z-20">
                <button
                    onClick={resetView}
                    className="p-3 bg-black/60 text-indi-gold border border-indi-gold/30 rounded-lg backdrop-blur hover:bg-black/80 transition-colors group"
                >
                    <Home size={20} className="group-hover:scale-110 transition-transform" />
                </button>
            </div>

            {/* Active Site Detailed Info Card */}
            <div className={`absolute bottom-6 left-6 right-20 md:right-auto md:max-w-md z-30 transition-all duration-500 transform ${selectedSite ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
                {selectedSite && (
                    <div className="bg-[#fdf6e3] rounded-2xl overflow-hidden text-slate-900 shadow-2xl relative group border-2 border-indi-gold/30">
                        {/* Close button */}
                        <button onClick={() => { setSelectedSite(null); setNearbyPOIs([]); poiMarkers?.clearLayers(); }} className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-black/10 hover:bg-black/20 rounded-full transition-colors z-10">
                            <X size={16} />
                        </button>

                        <div className="p-5 flex flex-col md:flex-row gap-5">
                            <div className="w-full md:w-32 h-32 bg-slate-200 rounded-xl shrink-0 overflow-hidden border border-amber-900/20 shadow-inner">
                                <img src={selectedSite.image} className="w-full h-full object-cover sepia-[.2]" alt={selectedSite.name} />
                            </div>

                            <div className="flex-1 min-w-0 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-serif text-2xl leading-tight text-amber-950 truncate">{selectedSite.name}</h3>
                                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ml-2 shrink-0 ${selectedSite.status === 'Verified' ? 'bg-green-600 text-white' :
                                            selectedSite.status === 'Pending' ? 'bg-amber-500 text-white' :
                                                'bg-slate-500 text-white'
                                            }`}>
                                            {selectedSite.status.toUpperCase()}
                                        </span>
                                    </div>

                                    {/* Coordinates, Region & Visitors */}
                                    <div className="flex items-center justify-between text-[10px] text-amber-900/60 font-pixel mb-3">
                                        <div className="flex items-center gap-1.5">
                                            <MapPin size={10} />
                                            <span>{selectedSite.coordinates?.[1]?.toFixed(4)}, {selectedSite.coordinates?.[0]?.toFixed(4)}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="flex items-center gap-1">
                                                <Users size={10} />
                                                {selectedSite.visitorCount?.toLocaleString() || 0}
                                            </span>
                                            <span className="bg-amber-900/10 px-1.5 rounded">{selectedSite.region}</span>
                                        </div>
                                    </div>

                                    {/* Guardian Visitors Section */}
                                    <div className="flex items-center justify-between mb-3 border-y border-amber-900/5 py-2">
                                        <div className="flex items-center gap-2">
                                            <div className="flex -space-x-1.5">
                                                {[1, 2, 3].map(i => (
                                                    <div key={i} className="w-5 h-5 rounded-full border-2 border-[#fdf6e3] bg-amber-900/10 overflow-hidden">
                                                        <img src="/assets/profile-pic (1).jpg" className="w-full h-full object-cover opacity-60" />
                                                    </div>
                                                ))}
                                            </div>
                                            <span className="text-[9px] font-pixel text-amber-900/60">
                                                {selectedSite.visitorCount?.toLocaleString() || 0} Visitors
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-xs text-amber-950 leading-relaxed font-serif line-clamp-2 mb-2">
                                        {selectedSite.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="px-5 pb-5 pt-0">
                            {selectedSite.nearby && selectedSite.nearby.length > 0 && (
                                <button
                                    onClick={handleDiscoverNearby}
                                    className="w-full py-3 bg-amber-900/5 border border-amber-900/10 rounded-xl flex items-center justify-center gap-2 hover:bg-amber-900/10 transition-all group"
                                >
                                    <Search size={14} className="text-amber-800" />
                                    <span className="font-pixel text-[10px] text-amber-900 uppercase tracking-widest">Nearby Rituals</span>
                                </button>
                            )}

                            {nearbyPOIs.length > 0 && (
                                <div className="mt-4 space-y-2 animate-in slide-in-from-bottom-2 duration-500">
                                    <h4 className="text-[9px] font-pixel text-amber-800/60 uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <Zap size={10} fill="currentColor" /> Ancient Rituals Detected
                                    </h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {nearbyPOIs.slice(0, 4).map(poi => (
                                            <div
                                                key={poi.id}
                                                onClick={() => map.current?.flyTo([poi.coordinates[1], poi.coordinates[0]], 17)}
                                                className="p-2.5 bg-white/40 rounded-lg border border-amber-900/5 flex items-center gap-2 cursor-pointer hover:bg-white/60 transition-colors"
                                            >
                                                <div className="text-amber-700">
                                                    {poi.type === 'shop' && <ShoppingBag size={12} />}
                                                    {poi.type === 'hotel' && <Hotel size={12} />}
                                                    {poi.type === 'restaurant' && <Utensils size={12} />}
                                                    {poi.type === 'activity' && <Tent size={12} />}
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="text-[10px] font-serif font-bold text-amber-900 truncate">{poi.name}</div>
                                                    <div className="text-[8px] font-pixel text-amber-900/40">{poi.distance}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {selectedSite.isRare && (
                            <div className="absolute top-16 right-[-10px] px-3 py-1 bg-indi-gold text-white text-[8px] font-pixel uppercase rotate-90 origin-right rounded-b">
                                Royal Discovery
                            </div>
                        )}
                    </div>
                )}
            </div>

            {!selectedSite && (
                <div className="absolute bottom-10 left-10 z-20">
                    <div className="p-6 bg-black/40 border border-white/5 rounded-2xl backdrop-blur-md shadow-xl">
                        <h3 className="font-serif text-lg text-slate-300 tracking-widest uppercase mb-1">Explorer Mode</h3>
                        <p className="font-pixel text-slate-500 text-xs tracking-wider">Scroll through ancient chronicles</p>
                    </div>
                </div>
            )}

            {/* FAB Camera */}
            <button
                onClick={onShowCamera}
                className="absolute bottom-10 right-10 w-20 h-20 bg-gradient-to-br from-indi-gold to-amber-600 rounded-full flex items-center justify-center text-indi-dark shadow-[0_0_40px_rgba(245,158,11,0.6)] border-[4px] border-white/20 z-20"
            >
                <Camera size={32} className="text-[#0f172a]" />
            </button>

            {/* Map Loading State */}
            {(!mapLoaded || !userLocation) && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950">
                    <div className="text-center p-8 bg-[#131b2e]/90 border border-indi-gold/20 rounded-xl shadow-2xl max-w-md backdrop-blur-sm">
                        <h2 className="font-serif text-3xl text-indi-gold mb-2">The Ancient Scrolls</h2>
                        <p className="font-pixel text-slate-400 text-lg tracking-wider animate-pulse">Unrolling Map Data...</p>
                    </div>
                </div>
            )}
            <style>{`
                .poi-tooltip {
                    background-color: #0f172a !important;
                    color: #fff !important;
                    border: 1px solid #f59e0b !important;
                    border-radius: 4px !important;
                    font-family: serif !important;
                    padding: 4px 8px !important;
                    font-size: 10px !important;
                }
                @keyframes bounce {
                    0% { transform: scale(0); opacity: 0; }
                    50% { transform: scale(1.2); }
                    100% { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default MapScreen;
