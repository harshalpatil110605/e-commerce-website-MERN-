import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminLoginPage from './pages/AdminLoginPage';
import OrderHistoryPage from './pages/OrderHistoryPage';

/**
 * Protected Route for Admin
 * Redirects to admin login if not authenticated as admin
 */
const ProtectedAdminRoute = ({ children }) => {
    const { user, isAdmin } = useAuth();

    if (!user) {
        return <Navigate to="/admin/login" replace />;
    }

    if (!isAdmin()) {
        return <Navigate to="/" replace />;
    }

    return children;
};

/**
 * Main App Component
 * Sets up routing and global providers
 */
function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <div className="flex flex-col min-h-screen">
                        <Navbar />

                        <main className="flex-grow">
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/shop" element={<ShopPage />} />
                                <Route path="/product/:id" element={<ProductDetailPage />} />
                                <Route path="/cart" element={<CartPage />} />
                                <Route path="/checkout" element={<CheckoutPage />} />
                                <Route path="/order-success" element={<OrderSuccessPage />} />
                                <Route path="/orders" element={<OrderHistoryPage />} />
                                <Route path="/about" element={<AboutPage />} />
                                <Route path="/contact" element={<ContactPage />} />

                                {/* Auth Routes */}
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/signup" element={<SignupPage />} />
                                <Route path="/admin/login" element={<AdminLoginPage />} />

                                {/* Protected Admin Route */}
                                <Route
                                    path="/admin"
                                    element={
                                        <ProtectedAdminRoute>
                                            <AdminPage />
                                        </ProtectedAdminRoute>
                                    }
                                />
                            </Routes>
                        </main>

                        <Footer />
                    </div>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;

