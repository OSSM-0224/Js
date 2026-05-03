import React from "react";
import { useAuth } from "../context/AuthContext";

const Cart = () => {
  const { cartItems,addToCart ,removeFromCart, decreaseQty } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0000] via-black to-[#2b0000] text-white px-6 md:px-12 py-10">
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#800000] to-[#ff4d4d] bg-clip-text text-transparent">
        Your Cart 🛒
      </h1>

      {cartItems.length === 0 ? (
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center backdrop-blur-xl bg-white/5 border border-[#800000]/30 p-10 rounded-3xl shadow-xl">
            <p className="text-gray-400 text-lg">Your cart is empty</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4 max-w-2xl mx-auto">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-white/5 border border-[#800000]/30 rounded-2xl p-4"
            >
              <img src={item.thumbnail} className="h-16 w-16 object-cover rounded-xl" />
              <div className="flex-1">
                <p className="font-semibold text-white">{item.title}</p>
                <p className="text-gray-400 text-sm">
                  ${item.price} × {item.qty} ={" "}
                  <span className="text-[#ff4d4d]">${(item.price * item.qty).toFixed(2)}</span>
                </p>
              </div>

              {/* Qty Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="w-7 h-7 rounded-full border border-[#cc2222]/50 text-[#cc2222] hover:bg-[#cc2222] hover:text-white transition text-sm cursor-pointer"
                >
                  −
                </button>
                <span className="text-white text-sm w-4 text-center">{item.qty}</span>
                <button
                  onClick={() => addToCart(item)}
                  className="w-7 h-7 rounded-full border border-[#cc2222]/50 text-[#cc2222] hover:bg-[#cc2222] hover:text-white transition text-sm cursor-pointer"
                >
                  +
                </button>
              </div>

            </div>
          ))}

          {/* Total */}
          <div className="bg-white/5 border border-[#800000]/30 rounded-2xl p-4 text-right">
            <p className="text-gray-400 text-sm">Total</p>
            <p className="text-2xl font-bold text-[#ff4d4d]">
              ${cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)}
            </p>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;