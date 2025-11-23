import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * User Login Page
 */
const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = await login(formData.email, formData.password);

        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-gray-600">Sign in to your account</p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-2xl shadow-soft p-8">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="input-field"
                                placeholder="you@example.com"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength={6}
                                className="input-field"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-gray-900 font-semibold hover:text-accent-gold transition-colors">
                                Sign up
                            </Link>
                        </p>
                    </div>

                    {/* Admin Login Link */}
                    <div className="mt-4 text-center">
                        <Link to="/admin/login" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                            Admin Login →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
