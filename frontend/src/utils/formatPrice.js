/**
 * Utility Functions
 */

/**
 * Format price in Indian Rupees
 * Converts dollar amount to rupees (1 USD = 83 INR approx)
 * @param {number} dollarPrice - Price in dollars
 * @returns {string} - Formatted price in rupees
 */
export const formatPrice = (dollarPrice) => {
    const rupees = dollarPrice * 83; // 1 USD = 83 INR
    return `₹${rupees.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
};

/**
 * Get rupee value from dollar price
 * @param {number} dollarPrice - Price in dollars
 * @returns {number} - Price in rupees
 */
export const toRupees = (dollarPrice) => {
    return dollarPrice * 83;
};
