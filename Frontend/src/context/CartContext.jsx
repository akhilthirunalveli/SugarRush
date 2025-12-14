import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity = 1) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item._id === product._id);
            const stock = product.quantity; // Available stock from product

            if (existingItem) {
                const newQuantity = existingItem.quantity + quantity;
                if (newQuantity > stock) {
                    alert(`Sorry, you can't add more. Only ${stock} left in stock.`);
                    return prevItems;
                }
                return prevItems.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: newQuantity, stock } // Update stock in case it changed
                        : item
                );
            }

            if (quantity > stock) {
                alert(`Sorry, you can't add more. Only ${stock} left in stock.`);
                return prevItems;
            }

            // Save stock explicitly and set cart quantity
            return [...prevItems, { ...product, stock, quantity }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;

        setCartItems(prevItems =>
            prevItems.map(item => {
                if (item._id === productId) {
                    if (newQuantity > item.stock) {
                        alert(`Sorry, we only have ${item.stock} in stock.`);
                        return item;
                    }
                    return { ...item, quantity: newQuantity };
                }
                return item;
            })
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
