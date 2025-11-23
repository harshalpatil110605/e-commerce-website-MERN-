import { Link } from 'react-router-dom';

/**
 * Order Success Page
 * Shown after successful order placement
 */
const OrderSuccessPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center max-w-2xl mx-auto px-4">
                {/* Success Icon */}
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                    <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                {/* Success Message */}
                <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
                    Order Placed Successfully!
                </h1>

                <p className="text-xl text-gray-600 mb-8">
                    Thank you for your purchase. Your order has been received and is being processed.
                </p>

                <div className="bg-white rounded-2xl shadow-soft p-8 mb-8">
                    <p className="text-gray-600 mb-4">
                        You will receive an email confirmation shortly with your order details and tracking information.
                    </p>
                    <p className="text-gray-600">
                        If you have any questions, please don't hesitate to contact our customer service team.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/" className="btn-primary text-center">
                        Back to Home
                    </Link>
                    <Link to="/shop" className="btn-secondary text-center">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccessPage;
