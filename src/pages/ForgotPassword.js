import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { authService } from '../services/api';
import { ArrowLeft, Mail } from 'lucide-react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [resetToken, setResetToken] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await authService.forgotPassword(email);
            toast.success('Reset instruction generated!');
            if (data.token) {
                setResetToken(data.token);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to request reset');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-bg min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <div className="glass p-8 rounded-3xl relative">
                    <Link to="/login" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to login
                    </Link>

                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Forgot Password?</h1>
                        <p className="text-slate-500 mt-2 font-medium">No worries, we'll send you reset instructions.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="email"
                                    className="input-field pl-12"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full btn-primary h-12 flex items-center justify-center space-x-2"
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white" />
                            ) : (
                                <span>Reset Password</span>
                            )}
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
