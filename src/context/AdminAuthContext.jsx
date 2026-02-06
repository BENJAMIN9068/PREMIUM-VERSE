import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminAuthContext = createContext();

export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loginAttempts, setLoginAttempts] = useState(0);
    const [isLocked, setIsLocked] = useState(false);

    // Idle Timer Logic
    useEffect(() => {
        let idleTimer;
        const IDLE_TIMEOUT = 15 * 60 * 1000; // 15 minutes

        const resetTimer = () => {
            if (admin) {
                clearTimeout(idleTimer);
                idleTimer = setTimeout(() => {
                    console.log('Admin session timed out due to inactivity');
                    logout();
                }, IDLE_TIMEOUT);
            }
        };

        // Events to detect activity
        const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];

        if (admin) {
            events.forEach(event => document.addEventListener(event, resetTimer));
            resetTimer(); // Start timer initially
        }

        return () => {
            clearTimeout(idleTimer);
            events.forEach(event => document.removeEventListener(event, resetTimer));
        };
    }, [admin]);

    useEffect(() => {
        // Check for existing session in sessionStorage (NOT localStorage)
        const storedAdmin = sessionStorage.getItem('admin_session');

        if (storedAdmin) {
            try {
                setAdmin(JSON.parse(storedAdmin));
            } catch (e) {
                sessionStorage.removeItem('admin_session');
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
                name: 'Admin',
                loginTime: new Date().getTime()
            };

            setAdmin(adminData);
            // Use sessionStorage so it clears when tab/browser closes
            sessionStorage.setItem('admin_session', JSON.stringify(adminData));
            setLoginAttempts(0);
            return Promise.resolve();
        } else {
            setLoginAttempts(prev => prev + 1);
            throw new Error('Invalid credentials');
        }
    };

    const logout = () => {
        setAdmin(null);
        sessionStorage.removeItem('admin_session');
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
