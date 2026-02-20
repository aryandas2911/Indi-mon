import { Share2, X, MapPin, Users, MessageSquare, Plus, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import type { HeritageSite } from '../data/heritageSites';

interface InfoScreenProps {
    site: HeritageSite;
    onBack: () => void;
}

const InfoScreen = ({ site, onBack }: InfoScreenProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full h-full flex items-center justify-center bg-black/80 backdrop-blur-md p-8 pt-12"
            onClick={onBack}
        >
            {/* Modal Container */}
            <div
                className="w-full h-full max-w-7xl bg-[#0f172a] rounded-3xl overflow-hidden shadow-2xl flex border border-white/10 relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button onClick={onBack} className="absolute top-6 right-6 z-50 p-2.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-white/10 transition-all hover:rotate-90">
                    <X size={24} />
                </button>

                {/* Left: Visuals & Core Info */}
                <div className="w-5/12 h-full bg-black relative flex flex-col">
                    <div className="flex-1 relative overflow-hidden">
                        <img src={site.image || "/assets/temple.jpg"} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent"></div>

                        <div className="absolute top-8 left-8 flex flex-col gap-2">
                            {site.status === 'Verified' ? (
                                <span className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 border border-green-500/40 text-green-400 text-[10px] font-bold uppercase tracking-widest rounded-full backdrop-blur-md">
                                    <CheckCircle2 size={12} />
                                    Verified Site
                                </span>
                            ) : (
                                <span className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 border border-blue-500/40 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-full backdrop-blur-md">
                                    <AlertCircle size={12} />
                                    Discovery Pending
                                </span>
                            )}
                            {site.isRare && (
                                <span className="w-fit px-3 py-1.5 bg-amber-500/20 border border-amber-500/40 text-amber-500 text-[10px] font-bold uppercase tracking-widest rounded-full backdrop-blur-md">
                                    Legendary Rare
                                </span>
                            )}
                        </div>

                        <div className="absolute bottom-8 left-8 right-8">
                            <span className="text-indi-gold font-pixel text-xs uppercase tracking-[0.3em] mb-3 block">{site.region} ARCHIVES</span>
                            <h1 className="font-serif text-5xl text-white leading-tight drop-shadow-2xl mb-4">{site.name}</h1>

                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2 text-slate-300">
                                    <MapPin size={16} className="text-indi-gold" />
                                    <span className="font-pixel text-xs opacity-80">
                                        Lat: {site.coordinates[1].toFixed(4)}, Lng: {site.coordinates[0].toFixed(4)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-300">
                                    <Clock size={16} className="text-indi-gold" />
                                    <span className="font-pixel text-xs opacity-80">Logged: {site.discoveredOn || 'Ancient Era'}</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-300">
                                    <Users size={16} className="text-indi-gold" />
                                    <span className="font-pixel text-xs opacity-80">{site.visitorCount?.toLocaleString() || 0} Guardians Visited</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Detailed Info & Community */}
                <div className="w-7/12 h-full flex flex-col bg-[#0b101b] relative">
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-12 pb-24">
                        {/* Summary Section */}
                        <section className="mb-10">
                            <h3 className="font-serif text-xl text-slate-200 mb-6 flex items-center gap-3">
                                <span className="w-1 h-6 bg-indi-gold rounded-full"></span>
                                Chronicler's Note
                            </h3>
                            <p className="text-slate-400 leading-relaxed font-serif text-lg italic border-l-2 border-slate-700/50 pl-8 py-2 mb-6">
                                "{site.description}"
                            </p>
                            
                            {site.history && (
                                <div className="mt-8">
                                    <h4 className="text-indi-gold font-pixel text-[10px] uppercase tracking-widest mb-3">Significance</h4>
                                    <p className="text-slate-300 font-serif leading-relaxed">
                                        {site.history}
                                    </p>
                                </div>
                            )}

                            {site.activities && site.activities.length > 0 && (
                                <div className="mt-8">
                                    <h4 className="text-indi-gold font-pixel text-[10px] uppercase tracking-widest mb-3">Rituals & Endeavors</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {site.activities.map((activity, i) => (
                                            <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-slate-400 font-serif">
                                                {activity}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </section>

                        {/* Community Reviews Section */}
                        <section className="mb-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-serif text-xl text-slate-200 flex items-center gap-3">
                                    <MessageSquare size={20} className="text-indi-gold" />
                                    Traveler Observations
                                </h3>
                                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                                    {site.comments?.length || 0} Entries Found
                                </span>
                            </div>

                            <div className="space-y-6">
                                {site.comments && site.comments.length > 0 ? (
                                    site.comments.map((comment) => (
                                        <div key={comment.id} className="bg-white/5 border border-white/5 rounded-2xl p-6 transition-all hover:bg-white/10">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-slate-800 overflow-hidden border border-white/10">
                                                        {comment.avatar ? (
                                                            <img src={comment.avatar} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-slate-500 font-bold">
                                                                {comment.user.charAt(0)}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-bold text-slate-200">{comment.user}</h4>
                                                        <span className="text-[10px] text-slate-500 uppercase">{comment.date}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                                {comment.text}
                                            </p>
                                            {comment.image && (
                                                <div className="rounded-xl overflow-hidden border border-white/10 h-32 w-48">
                                                    <img src={comment.image} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-12 flex flex-col items-center justify-center text-slate-600 border-2 border-dashed border-white/5 rounded-2xl">
                                        <MessageSquare size={32} className="mb-4 opacity-20" />
                                        <p className="font-serif italic text-lg opacity-40">No observations recorded yet</p>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Bottom Action Bar (Fixed) */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#0b101b] via-[#0b101b] to-transparent border-t border-white/5 flex gap-4 z-20">
                        <button className="flex-2 flex-[2] py-4 bg-indi-gold hover:bg-amber-400 text-black rounded-2xl font-bold text-sm uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1">
                            <Plus size={18} />
                            Add Observation
                        </button>
                        <button className="flex-1 py-4 bg-[#1e293b] hover:bg-[#28354b] text-slate-300 rounded-2xl border border-white/10 flex items-center justify-center gap-3 transition-all hover:text-white">
                            <Share2 size={18} />
                            Share
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default InfoScreen;
