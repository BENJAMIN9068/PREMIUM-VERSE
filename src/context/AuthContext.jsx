import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock check for existing session
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // In a real app, verify credentials against API/DB
        // For now, mock a successful login user object
        const userData = {
            id: 'mock-user-id',
            name: 'Demo User',
            email: email,
            phone: '+91 9876543210',
            isAddressComplete: true // Assume address is complete for login demo for now, or fetch from DB
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return Promise.resolve();
    };

    const signup = (userData) => {
        // Mock signup
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return Promise.resolve();
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const updateAddress = (address) => {
        const updatedUser = { ...user, address, isAddressComplete: true };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    const value = {
        user,
        loading,
        login,
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
