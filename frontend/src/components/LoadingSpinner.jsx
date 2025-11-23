/**
 * Loading Spinner Component
 * Shows a premium loading animation
 */
const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-8 h-8 bg-accent-gold rounded-full animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingSpinner;
