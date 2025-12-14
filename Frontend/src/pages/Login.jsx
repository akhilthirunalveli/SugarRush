import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import { ShoppingBag, ArrowRight } from 'lucide-react';

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] w-full flex">
            {/* Left Side - Hero/Branding */}
            <div className="hidden lg:flex w-1/2 bg-white relative items-center justify-center overflow-hidden">
                <div className="absolute inset-0 "></div>

                <div className="relative z-10 p-12 text-black max-w-lg">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-black backdrop-blur-md rounded-xl">
                            <ShoppingBag size={32} className="text-white" />
                        </div>
                        <span className="text-3xl font-bold tracking-tight">SugarRush</span>
                    </div>
                    <h2 className="text-5xl font-bold leading-tight mb-6">
                        Experience the taste of <span className="text-primary">Indian</span> sweets.
                    </h2>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        Join our exclusive community of dessert connoisseurs. Order premium handcrafted sweets delivered straight to your doorstep.
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="mb-10">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back</h3>
                        <p className="text-slate-500">Please enter your details to log in to your account.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <Input
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
                            label="Email Address"
                            placeholder="john@example.com"
                            type="email"
                        />

                        <div className="space-y-1">
                            <Input
                                value={password}
                                onChange={({ target }) => setPassword(target.value)}
                                label="Password"
                                placeholder="Min 8 Characters"
                                type="password"
                            />
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
                            className="btn-primary h-12 text-base"
                        >
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </button>

                        <div className="text-center pt-4">
                            <p className="text-sm text-slate-600">
                                Don’t have an account?{" "}
                                <button
                                    type="button"
                                    className="font-bold text-slate-900 hover:text-primary transition-colors inline-flex items-center gap-1 hover:underline cursor-pointer"
                                    onClick={() => navigate('/register')}
                                >
                                    Sign Up <ArrowRight size={14} />
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
