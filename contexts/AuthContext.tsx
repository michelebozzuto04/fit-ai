import { router } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';

type AuthContextType = {
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if user is already authenticated
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            // Check AsyncStorage or your auth provider
            // const token = await AsyncStorage.getItem('authToken');
            // setIsAuthenticated(!!token);

            // For now, simulate check
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Auth check failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        // Implement your login logic
        setIsAuthenticated(true);
        router.replace('/(tabs)/home');
    };

    const signup = async (name: string, email: string, password: string) => {
        // Implement your signup logic
        setIsAuthenticated(true);
        router.replace('/(tabs)/home');
    };

    const logout = () => {
        setIsAuthenticated(false);
        router.replace('/(auth)/login');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};