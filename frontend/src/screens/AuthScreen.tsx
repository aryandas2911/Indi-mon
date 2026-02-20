import React, { useState, useEffect } from 'react';
import { Mail, User, Eye, EyeOff, BookOpen, Key, MoveLeft, Shield, Info, Phone, Building2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { api } from '../lib/api';
import { motion, AnimatePresence } from 'framer-motion';

const INFO_SLIDES = [
    "Mapping Bharat: Turn 500,000 undocumented sites into digital collectibles.",
    "Become a Guardian: Instead of monsters, you catch Pillars and protect history.",
    "The Lens of Truth: Use AI to verify structures and clear the Fog of War.",
    "Heritage-Dex: Discover everything from Post Offices to Legendary Rock Art.",
    "Preservation Army: Join 1.4 billion Indians mapping the soul of India."
];

const InfoCarousel = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((current) => (current + 1) % INFO_SLIDES.length);
        }, 4500);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex items-center gap-4 text-left max-w-md">
            <div className="p-3 bg-indi-gold/10 rounded-xl text-indi-gold shrink-0 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                <Info size={24} />
            </div>
            <div className="overflow-hidden h-20 flex items-center">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={index}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="font-pixel text-xl text-indi-parchment leading-snug tracking-wide"
                    >
                        {INFO_SLIDES[index]}
                    </motion.p>
                </AnimatePresence>
            </div>
        </div>
    );
};

interface AuthScreenProps {
    onAuthSuccess: () => void;
    onBack: () => void;
}

export default function AuthScreen({ onAuthSuccess, onBack }: AuthScreenProps) {
    const [mode, setMode] = useState<'LOGIN' | 'SIGNUP'>('LOGIN');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [organisation, setOrganisation] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (mode === 'LOGIN') {
                const data = await api.login({ email, password });
                if (data.error) throw new Error(data.error.message);
                
                const { error: sessError } = await supabase.auth.setSession(data.session);
                if (sessError) throw sessError;
            } else {
                const data = await api.signup({ 
                    email, 
                    password, 
                    full_name: fullName,
                    phone: phone,
                    organization: organisation
                });
                if (data.error) throw new Error(data.error.message);

                // Auto-login after signup if backend returns session, 
                // but current backend signup only returns user.
                // You might need to login manually or update backend signup.
                const loginData = await api.login({ email, password });
                if (loginData.error) throw new Error(loginData.error.message);
                
                const { error: sessError } = await supabase.auth.setSession(loginData.session);
                if (sessError) throw sessError;
            }
            onAuthSuccess();
        } catch (err: any) {
            setError(err.message || 'An error occurred during authentication');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="absolute inset-0 z-[100] flex bg-[#020617] overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-indi-gold/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Left Panel: Branding & Info */}
            <div className="flex flex-1 flex-col items-center justify-center p-12 relative z-10 border-r border-white/5 bg-gradient-to-br from-black/40 to-transparent">
                <div className="max-w-xl flex flex-col items-center text-center">
                    {/* Logo Section */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="mb-8 relative group"
                    >
                        <div className="absolute inset-0 bg-indi-gold/20 rounded-full blur-2xl animate-pulse"></div>
                        <img src="/assets/logo.png" alt="Indi-Mon" className="w-48 h-48 object-contain relative z-10 drop-shadow-[0_0_30px_rgba(245,158,11,0.3)]" />
                    </motion.div>

                    {/* Titles */}
                    <h1 className="font-serif text-[80px] text-indi-gold leading-none tracking-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] mb-4">
                        Indi-Mon
                    </h1>
                    <p className="font-serif text-2xl text-[#f5de8b] tracking-widest mb-12 opacity-80 italic">
                        The Archivist's Gateway
                    </p>

                    {/* Description Carousel */}
                    <div className="w-full bg-black/30 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl">
                        <InfoCarousel />
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-12 left-12 w-16 h-16 border-t border-l border-indi-gold/20"></div>
                <div className="absolute bottom-12 left-12 w-16 h-16 border-b border-l border-indi-gold/20"></div>
            </div>

            {/* Right Panel: Auth Modal */}
            <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative z-10 overflow-y-auto custom-scrollbar">
                {/* Mobile Heading - Hidden in standard layout */}
                <div className="hidden mb-8 flex flex-col items-center">
                    <img src="/assets/logo.png" alt="Indi-Mon" className="w-20 h-20 object-contain mb-4" />
                </div>

                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="w-full max-w-[480px] bg-[#0f172a]/80 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-[0_0_80px_rgba(0,0,0,0.6)] overflow-hidden"
                >
                    {/* Tabs */}
                    <div className="flex border-b border-white/5 relative">
                        <button
                            onClick={() => setMode('LOGIN')}
                            className={`flex-1 py-6 font-serif text-lg tracking-wider transition-all relative z-10 ${mode === 'LOGIN' ? 'text-indi-gold' : 'text-white/40 hover:text-white/60'}`}
                        >
                            Login
                        </button>
                        <div className="w-[1px] bg-white/5 my-4"></div>
                        <button
                            onClick={() => setMode('SIGNUP')}
                            className={`flex-1 py-6 font-serif text-lg tracking-wider transition-all relative z-10 ${mode === 'SIGNUP' ? 'text-indi-gold' : 'text-white/40 hover:text-white/60'}`}
                        >
                            Signup
                        </button>

                        {/* Active Tab Indicator */}
                        <motion.div
                            className="absolute bottom-0 h-[3px] bg-indi-gold shadow-[0_0_15px_rgba(245,158,11,0.6)]"
                            animate={{
                                left: mode === 'LOGIN' ? '0%' : '50%',
                                width: '50%'
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    </div>

                    <div className="p-6 md:p-8">
                        {/* Form Heading */}
                        <div className="text-center mb-6">
                            <h2 className="font-serif text-2xl md:text-3xl text-indi-gold mb-1 tracking-tight">
                                {mode === 'LOGIN' ? 'Invoke Entry' : 'The Archivist’s Registry'}
                            </h2>
                            <p className="font-serif italic text-white/40 text-xs md:text-sm">
                                {mode === 'LOGIN'
                                    ? 'Explorers must be recorded before knowledge is granted'
                                    : 'Register your presence in the great Indi-Mon record'}
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleAuth} className="space-y-3">
                            {mode === 'SIGNUP' && (
                                <>
                                    <div className="space-y-1">
                                        <label className="block font-pixel text-[10px] text-indi-gold tracking-[0.15em] uppercase opacity-80 ml-1">
                                            Full Name
                                        </label>
                                        <div className="relative group">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-indi-gold transition-colors">
                                                <User size={16} />
                                            </div>
                                            <input
                                                type="text"
                                                required
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                placeholder="Enter your full designation"
                                                className="w-full bg-[#020617]/60 border border-white/5 rounded-xl py-2.5 pl-11 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-indi-gold/40 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] transition-all text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-1">
                                            <label className="block font-pixel text-[10px] text-indi-gold tracking-[0.15em] uppercase opacity-80 ml-1">
                                                Phone
                                            </label>
                                            <div className="relative group">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-indi-gold transition-colors">
                                                    <Phone size={14} />
                                                </div>
                                                <input
                                                    type="tel"
                                                    required
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    placeholder="+91..."
                                                    className="w-full bg-[#020617]/60 border border-white/5 rounded-xl py-2.5 pl-11 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-indi-gold/40 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] transition-all text-sm"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="block font-pixel text-[10px] text-indi-gold tracking-[0.15em] uppercase opacity-80 ml-1">
                                                Organisation
                                            </label>
                                            <div className="relative group">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-indi-gold transition-colors">
                                                    <Building2 size={14} />
                                                </div>
                                                <input
                                                    type="text"
                                                    required
                                                    value={organisation}
                                                    onChange={(e) => setOrganisation(e.target.value)}
                                                    placeholder="Guild / Inst."
                                                    className="w-full bg-[#020617]/60 border border-white/5 rounded-xl py-2.5 pl-11 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-indi-gold/40 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] transition-all text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="space-y-1">
                                <label className="block font-pixel text-[10px] text-indi-gold tracking-[0.15em] uppercase opacity-80 ml-1">
                                    {mode === 'LOGIN' ? 'Email Identifier' : 'Email Address'}
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-indi-gold transition-colors">
                                        <Mail size={16} />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder={mode === 'LOGIN' ? 'Enter your recorded email' : 'archivist@indi-mon.heritage'}
                                        className="w-full bg-[#020617]/60 border border-white/5 rounded-xl py-2.5 pl-11 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-indi-gold/40 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] transition-all text-sm"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="block font-pixel text-[10px] text-indi-gold tracking-[0.15em] uppercase opacity-80 ml-1">
                                    {mode === 'LOGIN' ? 'Secret Cipher' : 'Secret Phrase'}
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-indi-gold transition-colors">
                                        <Key size={16} />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••••••"
                                        className="w-full bg-[#020617]/60 border border-white/5 rounded-xl py-2.5 pl-11 pr-11 text-white placeholder:text-white/10 focus:outline-none focus:border-indi-gold/40 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] transition-all text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            {mode === 'LOGIN' && (
                                <div className="flex items-center justify-between text-[10px] px-1">
                                    <label className="flex items-center gap-2 text-white/30 hover:text-white/50 cursor-pointer transition-colors group">
                                        <div className="w-3.5 h-3.5 rounded border border-white/10 flex items-center justify-center group-hover:border-indi-gold/40 transition-colors bg-[#020617]">
                                            <div className="w-1.5 h-1.5 rounded-sm bg-indi-gold opacity-0 group-hover:opacity-20"></div>
                                        </div>
                                        <span>Remember Explorer</span>
                                    </label>
                                    <button type="button" className="text-indi-gold/50 hover:text-indi-gold transition-colors italic underline-offset-4 hover:underline">
                                        Forgot Credential?
                                    </button>
                                </div>
                            )}

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-[10px] flex items-center gap-3"
                                >
                                    <Shield size={14} className="shrink-0" />
                                    {error}
                                </motion.div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-indi-gold py-3.5 rounded-xl font-serif text-base font-bold text-black uppercase tracking-[0.15em] hover:bg-indi-gold/90 transition-all flex items-center justify-center gap-3 shadow-[0_4px_20px_rgba(245,158,11,0.25)] hover:shadow-[0_8px_30px_rgba(245,158,11,0.4)] disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden active:scale-[0.98] mt-2"
                            >
                                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        {mode === 'LOGIN' ? (
                                            <>
                                                <Key size={18} className="stroke-[2.5]" />
                                                Seal Entry
                                            </>
                                        ) : (
                                            <>
                                                Begin the Journey
                                                <BookOpen size={18} className="stroke-[2.5]" />
                                            </>
                                        )}
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Footer Text */}
                        <div className="mt-8 text-center px-4">
                            {mode === 'LOGIN' ? (
                                <p className="text-white/20 text-xs leading-relaxed">
                                    Lost in the archives? <button className="text-white/40 hover:text-white/70 transition-colors italic underline underline-offset-4">Contact Archive Support</button>
                                </p>
                            ) : (
                                <button
                                    onClick={() => setMode('LOGIN')}
                                    className="flex items-center gap-2 mx-auto text-white/30 hover:text-white/60 transition-colors text-xs uppercase tracking-widest font-serif"
                                >
                                    <MoveLeft size={14} />
                                    Return to Gateway
                                </button>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Return Button (Only on AuthScreen) */}
                <button
                    onClick={onBack}
                    className="mt-8 flex items-center gap-2 text-white/20 hover:text-white/50 transition-colors text-xs uppercase tracking-[0.2em] font-serif"
                >
                    <MoveLeft size={16} />
                    Back to Selection
                </button>
            </div>

            {/* Footer Branding */}
            <div className="fixed bottom-6 left-3/4 -translate-x-1/2 text-center z-10 opacity-20 pointer-events-none">
                <p className="font-pixel text-[10px] tracking-[0.3em] text-white uppercase">
                    © Indimon Archive Council • Bharat • MMXXIV
                </p>
            </div>
        </div>
    );
}
