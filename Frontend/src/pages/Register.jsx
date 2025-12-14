import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import Input from '../components/Input';
import { ShoppingBag, ArrowRight } from 'lucide-react';

function Register() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            await axios.post('/auth/register', { email, password, role });
            // After register, redirect to login
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] w-full flex">
            {/* Left Side - Hero/Branding */}
            <div className="hidden lg:flex w-1/2 bg-white relative items-center justify-center overflow-hidden">

                <div className="relative z-10 p-12 text-black max-w-lg">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-black backdrop-blur-md rounded-xl">
                            <ShoppingBag size={32} className="text-white" />
                        </div>
                        <span className="text-3xl font-bold tracking-tight">SugarRush</span>
                    </div>
                    <h2 className="text-5xl font-bold leading-tight mb-6">
                        Start your <span className="text-primary">sweet</span> journey.
                    </h2>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        Create an account to unlock exclusive offers, track your orders, and save your favorite treats.
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="mb-10">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Create Account</h3>
                        <p className="text-slate-500">Enter your details to register.</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-5">
                        <Input
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
                            label="Email Address"
                            placeholder="john@example.com"
                            type="email"
                        />

                        <Input
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                            label="Password"
                            placeholder="Min 8 Characters"
                            type="password"
                        />

                        <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-slate-700">
                                I want to join as a
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setRole('user')}
                                    className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${role === 'user'
                                        ? 'bg-slate-900 text-white border-slate-900 '
                                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50 cursor-pointer'
                                        }`}
                                >
                                    Customer
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole('admin')}
                                    className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${role === 'admin'
                                        ? 'bg-slate-900 text-white border-slate-900'
                                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50 cursor-pointer'
                                        }`}
                                >
                                    Admin
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary h-12 text-base mt-2"
                        >
                            {isLoading ? 'Creating Account...' : 'Sign Up'}
                        </button>

                        <div className="text-center pt-4">
                            <p className="text-sm text-slate-600">
                                Already have an account?{" "}
                                <button
                                    type="button"
                                    className="font-bold text-slate-900 hover:text-primary transition-colors inline-flex items-center gap-1 hover:underline cursor-pointer"
                                    onClick={() => navigate('/login')}
                                >
                                    Sign In <ArrowRight size={14} />
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
