import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("foodCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("foodCart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.code === product.code);

      if (existingItem) {
        return prev.map((item) =>
          item.code === product.code
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productCode) => {
    setCartItems((prev) => prev.filter((item) => item.code !== productCode));
  };

  const updateQuantity = (productCode, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productCode);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.code === productCode ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const isInCart = (productCode) => {
    return cartItems.some((item) => item.code === productCode);
  };

  const getItemQuantity = (productCode) => {
    const item = cartItems.find((item) => item.code === productCode);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        isInCart,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
