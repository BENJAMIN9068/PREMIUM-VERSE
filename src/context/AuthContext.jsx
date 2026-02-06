import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for existing session in localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    }, []);

    // Regular email/password login
    const login = (email, password) => {
        const userData = {
            id: 'user-' + Date.now(),
            name: email.split('@')[0],
            email: email,
            phone: '',
            isAddressComplete: false,
            authProvider: 'email'
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return Promise.resolve(userData);
    };

    // Google OAuth login
    const loginWithGoogle = (googleCredential) => {
        return new Promise((resolve, reject) => {
            try {
                // Decode JWT token from Google
                const payload = decodeJwt(googleCredential);

                const userData = {
                    id: 'google-' + payload.sub,
                    name: payload.name || payload.email.split('@')[0],
                    email: payload.email,
                    picture: payload.picture,
                    phone: '',
                    isAddressComplete: false,
                    authProvider: 'google',
                    googleId: payload.sub
                };

                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
                resolve(userData);
            } catch (error) {
                console.error('Google login error:', error);
                reject(error);
            }
        });
    };

    // Simple JWT decoder (no external library needed for client)
    const decodeJwt = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch (e) {
            console.error('JWT decode error:', e);
            return {};
        }
    };

    // Signup
    const signup = (userData) => {
        const newUser = {
            ...userData,
            id: 'user-' + Date.now(),
            authProvider: 'email'
        };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        return Promise.resolve(newUser);
    };

    // Logout
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    // Update address
    const updateAddress = (address) => {
        const updatedUser = { ...user, address, isAddressComplete: true };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    const value = {
        user,
        loading,
        login,
        loginWithGoogle,
        signup,
        logout,
        updateAddress
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
