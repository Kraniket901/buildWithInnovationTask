import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  // Retrieve cart data from local storage on component mount
  const storedCart = JSON.parse(localStorage.getItem('cart')) || {};
  
  const [cart, setCart] = useState(storedCart);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    // Calculate total items whenever the cart changes
    const calculateTotalItems = () => {
      const itemsCount = Object.values(cart).reduce((acc, count) => acc + count, 0);
      setTotalItems(itemsCount);
    };

    // Update local storage whenever the cart changes
    const updateLocalStorage = () => {
      localStorage.setItem('cart', JSON.stringify(cart));
    };

    calculateTotalItems();
    updateLocalStorage();
  }, [cart]);

  const addToCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      updatedCart[productId] = (updatedCart[productId] || 0) + 1;
      return updatedCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[productId] && updatedCart[productId] > 0) {
        updatedCart[productId] -= 1;
        // Remove the item from the cart if the quantity becomes zero
        if (updatedCart[productId] === 0) {
          delete updatedCart[productId];
        }
      }
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart({});
  };

  return (
    <CartContext.Provider value={{ cart, totalItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCart };
