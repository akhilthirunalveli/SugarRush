import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch {
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(
        localStorage.getItem('token')
    );
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token) {
            const decoded = parseJwt(token);
            setUser(decoded);
            localStorage.setItem('token', token);
        } else {
            setUser(null);
            localStorage.removeItem('token');
        }
    }, [token]);

    const login = async (email, password) => {
        const res = await api.post('/auth/login', {
            email,
            password,
        });
        setToken(res.data.token);
    };

    const register = async (email, password, role) => {
        const res = await api.post('/auth/register', {
            email,
            password,
            role,
        });
        setToken(res.data.token);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
