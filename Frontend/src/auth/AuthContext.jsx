import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => {
        return localStorage.getItem('token');
    });

    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem('token')
    );

    // Sync token with localStorage
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            setIsAuthenticated(true);
        } else {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
        }
    }, [token]);

    // LOGIN
    const login = async (email, password) => {
        try {
            const res = await api.post('/auth/login', {
                email,
                password,
            });

            setToken(res.data.token);
        } catch (err) {
            throw err; // let UI handle error message
        }
    };

    // REGISTER
    const register = async (email, password, role) => {
        try {
            const res = await api.post('/auth/register', {
                email,
                password,
                role,
            });

            setToken(res.data.token);
        } catch (err) {
            throw err; // let UI handle error message
        }
    };

    // LOGOUT
    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                isAuthenticated,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }

    return context;
};
