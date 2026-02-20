import { useRef, useEffect, useState } from 'react';
import { Maximize, Camera, Home, MapPin } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { heritageSites } from '../data/heritageSites';
import type { HeritageSite } from '../data/heritageSites';

interface MapScreenProps {
    onShowCamera: () => void;
}

const MapScreen = ({ onShowCamera }: MapScreenProps) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [selectedSite, setSelectedSite] = useState<HeritageSite | null>(null);
    const [mapLoaded, setMapLoaded] = useState(false);

    // Initialize Mapbox token
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || '';

    useEffect(() => {
        if (!mapContainer.current || map.current) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/dark-v11', // A premium dark theme
            center: [76.4590, 15.3350], // Initial center (Hampi)
            zoom: 13,
            pitch: 45,
            bearing: -17.6,
            antialias: true
        });

        map.current.on('load', () => {
            setMapLoaded(true);
            
            // Add 3D buildings layer for premium look
            const layers = map.current?.getStyle().layers;
            const labelLayerId = layers?.find(
                (layer) => layer.type === 'symbol' && layer.layout?.['text-field']
            )?.id;

            map.current?.addLayer(
                {
                    'id': 'add-3d-buildings',
                    'source': 'composite',
                    'source-layer': 'building',
                    'filter': ['==', 'extrude', 'true'],
                    'type': 'fill-extrusion',
                    'minzoom': 15,
                    'paint': {
                        'fill-extrusion-color': '#aaa',
                        'fill-extrusion-height': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            15,
                            0,
                            15.05,
                            ['get', 'height']
                        ],
                        'fill-extrusion-base': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            15,
                            0,
                            15.05,
                            ['get', 'min_height']
                        ],
                        'fill-extrusion-opacity': 0.6
                    }
                },
                labelLayerId
            );

            // Add markers for heritage sites
            heritageSites.forEach((site) => {
                // Create a custom marker element
                const el = document.createElement('div');
                el.className = 'custom-marker';
                el.style.width = '40px';
                el.style.height = '40px';
                el.style.borderRadius = '50%';
                el.style.backgroundColor = 'rgba(245, 158, 11, 0.2)';
                el.style.border = '2px solid #f59e0b';
                el.style.display = 'flex';
                el.style.alignItems = 'center';
                el.style.justifyContent = 'center';
                el.style.cursor = 'pointer';
                el.style.boxShadow = '0 0 15px rgba(245, 158, 11, 0.4)';
                el.style.transition = 'all 0.3s ease';

                // Add icon based on category
                let iconHtml = '';
                if (site.category === 'temple') {
                    iconHtml = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><path d="M12 2l10 10H2L12 2z"/><rect x="4" y="12" width="16" height="10"/></svg>`;
                } else if (site.category === 'fort') {
                    iconHtml = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><path d="M3 21v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4M17 21v-4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v4M3 11V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5M3 11h18M3 11l2 2m16-2l-2 2M12 4v4M12 11l-2 2m4-2l-2 2"/></svg>`;
                } else {
                    iconHtml = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>`;
                }
                el.innerHTML = iconHtml;

                el.addEventListener('mouseenter', () => {
                    el.style.transform = 'scale(1.2)';
                    el.style.backgroundColor = 'rgba(245, 158, 11, 0.4)';
                });

                el.addEventListener('mouseleave', () => {
                    el.style.transform = 'scale(1)';
                    el.style.backgroundColor = 'rgba(245, 158, 11, 0.2)';
                });

                el.addEventListener('click', () => {
                    setSelectedSite(site);
                    map.current?.flyTo({
                        center: site.coordinates,
                        zoom: 16,
                        speed: 1.2,
                        curve: 1.42,
                        essential: true
                    });
                });

                new mapboxgl.Marker(el)
                    .setLngLat(site.coordinates)
                    .addTo(map.current!);
            });
        });

        return () => {
            map.current?.remove();
            map.current = null;
        };
    }, []);

    const resetView = () => {
        map.current?.flyTo({
            center: [76.4590, 15.3350],
            zoom: 13,
            pitch: 45,
            bearing: -17.6,
            essential: true
        });
        setSelectedSite(null);
    };

    return (
        <div className="w-full h-full relative overflow-hidden bg-slate-950">
            {/* Map Container */}
            <div ref={mapContainer} className="w-full h-full" />

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
                <button className="p-3 bg-black/60 text-indi-gold border border-indi-gold/30 rounded-lg backdrop-blur hover:bg-black/80 transition-colors group">
                    <Maximize size={20} className="group-hover:scale-110 transition-transform" />
                </button>
            </div>

            {/* Active Site Legend - Bottom Left */}
            <div className="absolute bottom-10 left-10 z-20 max-w-xs transition-all duration-500">
                {selectedSite ? (
                    <div className="p-6 bg-black/80 border border-indi-gold/30 rounded-2xl backdrop-blur-xl shadow-2xl animate-in slide-in-from-bottom-10 fade-in">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-indi-gold/10 rounded-lg text-indi-gold">
                                <MapPin size={18} />
                            </div>
                            <h3 className="font-serif text-xl text-indi-gold tracking-wide">{selectedSite.name}</h3>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed mb-4 font-sans italic">
                            "{selectedSite.description}"
                        </p>
                        <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.2em] text-slate-500 font-pixel">
                            <span>{selectedSite.category}</span>
                            <span className="text-indi-gold">Coordinates Locked</span>
                        </div>
                    </div>
                ) : (
                    <div className="p-6 bg-black/40 border border-white/5 rounded-2xl backdrop-blur-md shadow-xl">
                        <h3 className="font-serif text-lg text-slate-300 tracking-widest uppercase mb-1">Explorer Mode</h3>
                        <p className="font-pixel text-slate-500 text-xs tracking-wider">Tap a relic to focus the lens</p>
                    </div>
                )}
            </div>

            {/* FAB Camera */}
            <button
                onClick={onShowCamera}
                className="absolute bottom-10 right-10 w-20 h-20 bg-gradient-to-br from-indi-gold to-amber-600 rounded-full flex items-center justify-center text-indi-dark shadow-[0_0_40px_rgba(245,158,11,0.6)] border-[4px] border-white/20 transform hover:scale-110 hover:rotate-90 transition-all duration-300 group z-20"
            >
                <Camera size={32} className="text-[#0f172a] drop-shadow-md" />
            </button>

            {/* Map Loading State */}
            {!mapLoaded && (
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
