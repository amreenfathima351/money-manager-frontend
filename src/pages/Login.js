import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await authService.login({ email, password });
            login(data, data.token);
            toast.success('Welcome back!');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen auth-bg px-4">
            <div className="w-full max-w-md p-8 glass rounded-3xl shadow-2xl relative overflow-hidden group">
                {/* Decorative background glow */}

                <div className="text-center mb-10">
                    
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Welcome Back</h1>
                    <p className="text-slate-500 mt-3 font-medium text-lg">
                        Sign in to <span className="text-blue-600 font-bold">Money Manager</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2.5 ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="email"
                                className="input-field pl-12 py-3"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2.5 ml-1">
                            <label className="block text-sm font-bold text-slate-700">Password</label>
                            <Link to="/forgot-password" core className="text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline">
                                Forgot password?
                            </Link>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="input-field pl-12 pr-12 py-3"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full btn-primary py-4 text-lg font-bold flex items-center justify-center border-none mt-4"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex items-center gap-3">
                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white" />
                                <span>Signing in...</span>
                            </div>
                        ) : 'Sign In'}
                    </button>
                </form>

                <div className="mt-10 text-center">
                    <p className="text-slate-600 font-medium">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-blue-600 font-extrabold hover:underline">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
