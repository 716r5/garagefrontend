import { useContext, createContext, useState, useEffect } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
    // Security: Add validation when loading from localStorage to prevent data corruption
    const loadSafeNumber = (key, defaultValue = 0) => {
        try {
            const value = JSON.parse(localStorage.getItem(key));
            return typeof value === 'number' && !isNaN(value) && isFinite(value) && value >= 0 ? value : defaultValue;
        } catch (e) {
            console.error(`Error loading ${key} from localStorage:`, e);
            return defaultValue;
        }
    };

    const loadSafeArray = (key, defaultValue = []) => {
        try {
            const value = JSON.parse(localStorage.getItem(key));
            return Array.isArray(value) ? value : defaultValue;
        } catch (e) {
            console.error(`Error loading ${key} from localStorage:`, e);
            return defaultValue;
        }
    };

    const [userCredits, setUserCredits] = useState(() => loadSafeNumber("userCredits", 0));
    const [cartCount, setCartCount] = useState(() => loadSafeNumber("cartCount", 0));
    const [cartItems, setCartItems] = useState(() => loadSafeArray("cartItems", []));

    useEffect(() => {
        if (userCredits !== null && userCredits !== undefined) {
            localStorage.setItem("userCredits", JSON.stringify(userCredits));
        } else {
            localStorage.removeItem("userCredits");
        }
    }, [userCredits]);

    useEffect(() => {
        if (cartCount !== null && cartCount !== undefined) {
            localStorage.setItem("cartCount", JSON.stringify(cartCount));
        } else {
            localStorage.removeItem("cartCount");
        }
    }, [cartCount]);

    useEffect(() => {
        if (cartItems && cartItems.length > 0) {
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        } else {
            localStorage.removeItem("cartItems");
        }
    }, [cartItems]);

    const setCredits = (credits) => {
        setUserCredits(credits);
    };

    const setCart = (count, items) => {
        setCartCount(count);
        setCartItems(items);
    };

    const clearCart = () => {
        setUserCredits(0);
        setCartCount(0);
        setCartItems([]);
        localStorage.removeItem("userCredits");
        localStorage.removeItem("cartCount");
        localStorage.removeItem("cartItems");
    };

    return (
    <CartContext.Provider value = {{ userCredits, cartCount, cartItems, setCredits, setCart, clearCart }}>
        {children}
    </CartContext.Provider>
    )
};

export default CartProvider;

export const useCart = () => {
    return useContext(CartContext);
}