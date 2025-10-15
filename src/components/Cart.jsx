import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useCart } from "../context/CartContext";
import {
  formatProductName,
  formatBrand,
  getProductImage,
} from "../utils/formatters";

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } =
    useCart();

  const toggleCart = () => setIsOpen(!isOpen);

  const cartTotal = getCartTotal();

  const modalContent = isOpen ? (
    <div className="fixed inset-0 z-[100]">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn"
        onClick={toggleCart}
      />

      <div className="absolute right-0 top-0 bottom-0 w-full sm:w-96 bg-white shadow-2xl flex flex-col animate-slideInRight">
        <div className="flex-shrink-0 flex items-center justify-between p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold">Shopping Cart</h2>
          </div>
          <button
            onClick={toggleCart}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="w-12 h-12 text-blue-400" />
              </div>
              <p className="text-gray-800 font-bold text-lg mb-2">
                Your cart is empty
              </p>
              <p className="text-gray-600 text-sm">
                Add some products to get started! 🛒
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.code}
                  className="bg-white rounded-xl p-4 flex gap-4 shadow-md hover:shadow-lg transition-shadow border border-gray-200"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-200">
                    <img
                      src={getProductImage(item)}
                      alt={formatProductName(item)}
                      className="max-w-full max-h-full object-contain p-2"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/80x80?text=No+Image";
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                      {formatProductName(item)}
                    </h3>
                    <p className="text-xs text-gray-600 mb-3">
                      {formatBrand(item.brands)}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                        <button
                          onClick={() =>
                            updateQuantity(item.code, item.quantity - 1)
                          }
                          className="w-7 h-7 rounded-md bg-white border border-gray-300 flex items-center justify-center hover:bg-blue-50 hover:border-blue-400 transition-all"
                        >
                          <Minus className="w-3 h-3 text-gray-700" />
                        </button>
                        <span className="w-10 text-center font-bold text-sm text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.code, item.quantity + 1)
                          }
                          className="w-7 h-7 rounded-md bg-white border border-gray-300 flex items-center justify-center hover:bg-blue-50 hover:border-blue-400 transition-all"
                        >
                          <Plus className="w-3 h-3 text-gray-700" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.code)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="flex-shrink-0 border-t-2 border-gray-200 p-6 space-y-4 bg-white">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
              <span className="text-gray-800 font-semibold">Total Items:</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {cartTotal}
              </span>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  alert("Checkout functionality coming soon!");
                }}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Proceed to Checkout 🛍️
              </button>
              <button
                onClick={clearCart}
                className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-semibold border-2 border-gray-200 hover:border-gray-300"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        onClick={toggleCart}
        className="relative p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200 hover:border-purple-400 hover:shadow-lg transition-all transform hover:scale-105"
      >
        <ShoppingCart className="w-6 h-6 text-blue-600" />
        {cartTotal > 0 && (
          <span className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full text-xs font-bold flex items-center justify-center shadow-lg animate-pulse">
            {cartTotal}
          </span>
        )}
      </button>

      {modalContent && createPortal(modalContent, document.body)}
    </>
  );
};

export default Cart;
