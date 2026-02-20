import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { Session, User } from '@supabase/supabase-js';

export interface UserProfile {
    id: string;
    full_name: string | null;
    phone: string | null;
    organization: string | null;
    email: string | null;
}

export const useAuth = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', userId)
                .maybeSingle();

            if (error) {
                console.warn('Error fetching profile:', error.message);
                return;
            }
            setProfile(data);
        } catch (error) {
            console.error('Unexpected error fetching profile:', error);
        }
    };

    useEffect(() => {
        // Initial session fetch
        const initializeAuth = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                setSession(session);
                setUser(session?.user ?? null);
                if (session?.user) {
                    fetchProfile(session.user.id);
                }
            } catch (error) {
                console.error('Error fetching session:', error);
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);

            if (session?.user) {
                fetchProfile(session.user.id);
            } else {
                setProfile(null);
            }

            setLoading(false);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return { session, user, profile, loading, refreshProfile: () => user && fetchProfile(user.id) };
};
