"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { getUserProfile } from '@/services/authentication';

interface AuthContextType {
    user: any; // Itt tároljuk a felhasználó adatait (név, email)
    login: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    //Amikor az oldal betölt, megnézzük, van-e elmentett token
    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                try {
                    const profileData = await getUserProfile(token);
                    setUser(profileData);
                } catch (error) {
                    logout();
                }
            }
            setLoading(false);
        };
        initAuth();
    }, []);

    //Bejelentkezés funkció
    const login = async (accessToken: string, refreshToken: string) => {
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        
        // Lekérjük a felhasználó adatait rögtön a login után
        const profileData = await getUserProfile(accessToken);
        setUser(profileData);
    };

    //Kijelentkezés funkció
    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
        router.push('/bejelentkezes');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};