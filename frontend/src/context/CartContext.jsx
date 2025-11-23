import { createContext, useContext, useState, useEffect } from 'react';

/**
 * Cart Context
 * Manages shopping cart state across the application
 * Persists cart data in localStorage
 */

// Create context
const CartContext = createContext();

// Custom hook to use cart context
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
    // Initialize cart from localStorage or empty array
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('luxehome_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('luxehome_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    /**
     * Add item to cart
     * If item already exists, increase quantity
     */
    const addToCart = (product, quantity = 1) => {
        setCartItems(prevItems => {
            // Check if product already in cart
            const existingItem = prevItems.find(item => item._id === product._id);

            if (existingItem) {
                // Update quantity of existing item
                return prevItems.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                // Add new item to cart
                return [...prevItems, { ...product, quantity }];
            }
        });
    };

    /**
     * Remove item from cart completely
     */
    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
    };

    /**
     * Update quantity of item in cart
     */
    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setCartItems(prevItems =>
            prevItems.map(item =>
                item._id === productId ? { ...item, quantity } : item
            )
        );
    };

    /**
     * Clear entire cart
     */
    const clearCart = () => {
        setCartItems([]);
    };

    /**
     * Get total number of items in cart
     */
    const getCartCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    /**
     * Get total price of all items in cart
     */
    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    /**
     * Check if product is in cart
     */
    const isInCart = (productId) => {
        return cartItems.some(item => item._id === productId);
    };

    // Context value
    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartCount,
        getCartTotal,
        isInCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
