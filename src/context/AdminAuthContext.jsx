import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminAuthContext = createContext();

export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loginAttempts, setLoginAttempts] = useState(0);
    const [isLocked, setIsLocked] = useState(false);

    useEffect(() => {
        // Check for existing session
        const storedAdmin = localStorage.getItem('admin_session');
        const sessionTime = localStorage.getItem('admin_session_time');

        if (storedAdmin && sessionTime) {
            const currentTime = new Date().getTime();
            const fourHours = 4 * 60 * 60 * 1000;

            if (currentTime - parseInt(sessionTime) < fourHours) {
                setAdmin(JSON.parse(storedAdmin));
            } else {
                logout(); // Session expired
            }
        }

        setLoading(false);
    }, []);

    const login = async (email, password) => {
        if (isLocked) {
            throw new Error('Too many attempts. Try again later.');
        }

        if (loginAttempts >= 3) {
            setIsLocked(true);
            setTimeout(() => {
                setIsLocked(false);
                setLoginAttempts(0);
            }, 15 * 60 * 1000); // 15 minutes lock
            throw new Error('Too many attempts. Try again after 15 minutes.');
        }

        // Hardcoded credentials check
        if (email === 'godfathersid3@gmail.com' && password === 'Gy@n2024261$') {
            const adminData = {
                email: email,
                role: 'super_admin',
                name: 'Admin'
            };

            setAdmin(adminData);
            localStorage.setItem('admin_session', JSON.stringify(adminData));
            localStorage.setItem('admin_session_time', new Date().getTime().toString());
            setLoginAttempts(0);
            return Promise.resolve();
        } else {
            setLoginAttempts(prev => prev + 1);
            throw new Error('Invalid credentials');
        }
    };

    const logout = () => {
        setAdmin(null);
        localStorage.removeItem('admin_session');
        localStorage.removeItem('admin_session_time');
    };

    const value = {
        admin,
        loading,
        login,
        logout,
        isLocked
    };

    return (
        <AdminAuthContext.Provider value={value}>
            {!loading && children}
        </AdminAuthContext.Provider>
    );
};
