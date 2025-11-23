import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config/api';

/**
 * Auth Context
 * Manages user authentication state
 */

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is logged in on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('luxehome_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // Login function
    const login = async (email, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, {
                email: email.toLowerCase(),
                password
            });

            if (response.data.success) {
                const userData = response.data.data;
                setUser(userData);
                localStorage.setItem('luxehome_user', JSON.stringify(userData));
                return { success: true, user: userData };
            }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    // Admin login function
    const adminLogin = async (email, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/admin/login`, {
                email,
                password
            });

            if (response.data.success) {
                const userData = response.data.data;
                setUser(userData);
                localStorage.setItem('luxehome_user', JSON.stringify(userData));
                return { success: true, user: userData };
            }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Admin login failed'
            };
        }
    };

    // Signup function
    const signup = async (name, email, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
                name,
                email: email.toLowerCase(),
                password
            });

            if (response.data.success) {
                const userData = response.data.data;
                setUser(userData);
                localStorage.setItem('luxehome_user', JSON.stringify(userData));
                return { success: true, user: userData };
            }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Signup failed'
            };
        }
    };

    // Logout function
    const logout = () => {
        setUser(null);
        localStorage.removeItem('luxehome_user');
    };

    // Check if user is admin
    const isAdmin = () => {
        return user?.role === 'admin';
    };

    // Check if user is logged in
    const isLoggedIn = () => {
        return user !== null;
    };

    const value = {
        user,
        loading,
        login,
        adminLogin,
        signup,
        logout,
        isAdmin,
        isLoggedIn
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
