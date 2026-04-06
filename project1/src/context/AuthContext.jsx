import { createContext, useContext, useState } from "react";

let Auth = createContext();

export let AuthProvider = ({ children }) => {
  const [registeredUsers, setRegisteredUsers] = useState(
    JSON.parse(localStorage.getItem("reg users")) || [],
  );
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("log user")) || null,
  );

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };
  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0),
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Auth.Provider
      value={{
        setRegisteredUsers,
        setLoggedInUser,
        registeredUsers,
        loggedInUser,
        cartItems,
        addToCart,
        removeFromCart,
        decreaseQty,
      }}
    >
      {children}
    </Auth.Provider>
  );
};

export let useAuth = () => useContext(Auth);
