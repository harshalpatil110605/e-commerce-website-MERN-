import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Admin Login Page
 * Separate login for admin users
 */
const AdminLoginPage = () => {
    const navigate = useNavigate();
    const { adminLogin } = useAuth();

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

        const result = await adminLogin(formData.email, formData.password);

        if (result.success) {
            navigate('/admin');
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-accent-gold rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-display font-bold text-white mb-2">
                        Admin Access
                    </h1>
                    <p className="text-gray-300">Secure admin portal</p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Default Credentials Info */}
                    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800 font-semibold mb-2">
                            Default Admin Credentials:
                        </p>
                        <p className="text-xs text-blue-700">
                            Email: <span className="font-mono">admin@luxehome.com</span><br />
                            Password: <span className="font-mono">admin123</span>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Admin Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="input-field"
                                placeholder="admin@luxehome.com"
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
                            {loading ? 'Verifying...' : 'Access Admin Panel'}
                        </button>
                    </form>

                    {/* Back to Home */}
                    <div className="mt-6 text-center">
                        <button
                            onClick={() => navigate('/')}
                            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                        >
                            ← Back to Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;
