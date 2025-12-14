import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { LogOut, ShoppingBag, User } from 'lucide-react';


const Navbar = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-xl border-b border-slate-100 z-50 transition-all duration-300">
            <div className="w-full px-10">
                <div className="flex justify-between items-center h-16">
                    {/* Brand */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="p-2 bg-black text-white rounded-lg cursor-pointer transition-colors">
                            <ShoppingBag size={20} className="stroke-2" />
                        </div>
                        <span className="text-xl font-bold text-slate-900 tracking-tight cursor-pointer transition-colors">
                            SugarRush
                        </span>
                    </Link>

                    {/* Actions */}
                    <div className="flex items-center">
                        {user ? (
                            <div className="flex items-center ">
                                <button
                                    onClick={onLogout}
                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full cursor-pointer transition-all duration-200"
                                    title="Logout"
                                >
                                    <LogOut size={20} className="stroke-[1.5]" />
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-all duration-200"
                                title="Login"
                            >
                                <User size={20} className="stroke-[1.5]" />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
