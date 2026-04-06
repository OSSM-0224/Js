import React from "react";

const Cart = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="text-center backdrop-blur-xl bg-white/10 border border-white/20 p-10 rounded-3xl shadow-xl">
        
        <h1 className="text-3xl font-bold mb-4">
          Your Cart 🛒
        </h1>

        <p className="text-gray-400">
          Your cart is empty
        </p>

      </div>
    </div>
  );
};

export default Cart;