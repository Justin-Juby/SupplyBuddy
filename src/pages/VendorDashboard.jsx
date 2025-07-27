import { useState, useEffect } from "react";
import { CheckCircle, ShoppingCart, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

import tomatoImg from "../assets/tomatoes.jpg";
import potatoImg from "../assets/potatoes.jpg";
import chiliImg from "../assets/green-chilies.jpg";
import garlicImg from "../assets/garlic.jpg";

const materials = [
  { id: 1, name: "Tomatoes", price: 25, image: tomatoImg },
  { id: 2, name: "Potatoes", price: 18, image: potatoImg },
  { id: 3, name: "Green Chilies", price: 60, image: chiliImg },
  { id: 4, name: "Garlic", price: 200, image: garlicImg },
];

export default function VendorDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const vendorName = "Justin Juby";

  const filteredMaterials = materials.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const placeOrder = (itemName) => {
    const newOrder = {
      itemName,
      quantity: 1,
      vendorName,
      createdAt: new Date().toISOString(),
    };
    setOrders([newOrder, ...orders]);
    toast.success(`✅ Order placed for ${itemName}`);
  };

  const addToCart = (item) => {
    const exists = cart.find((c) => c.id === item.id);
    if (exists) {
      const updatedCart = cart.map((c) =>
        c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    toast.success(`${item.name} added to cart`);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handlePlaceAllOrders = () => {
    const newOrders = cart.map((item) => ({
      itemName: item.name,
      quantity: item.quantity,
      vendorName,
      createdAt: new Date().toISOString(),
    }));
    setOrders([...newOrders, ...orders]);
    toast.success(`✅ ${newOrders.length} orders placed`);
    setCart([]);
    setShowCart(false);
  };

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <motion.h2
        className="text-3xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Vendor Inventory
      </motion.h2>

      {/* 🔍 Search */}
      <div className="mb-6 text-center">
        <input
          type="text"
          placeholder="Search ingredients..."
          className="w-full md:w-1/2 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* 🧺 Inventory Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {filteredMaterials.map((item) => (
          <motion.div
            key={item.id}
            className="rounded-xl p-3 bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 shadow-md hover:shadow-green-400/30 transition-transform transform hover:scale-105"
            whileHover={{ rotate: [0, 1, -1, 0], transition: { duration: 0.3 } }}
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-40 w-full object-cover rounded-lg mb-3"
            />
            <div className="space-y-2 px-2">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.name}</h3>
              <p className="text-green-600 dark:text-green-400 font-medium">₹{item.price}/kg</p>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-300">
                <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                In Stock
              </div>
              <div className="flex space-x-2 mt-3">
                <button
                  onClick={() => addToCart(item)}
                  className="w-1/2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => placeOrder(item.name)}
                  className="w-1/2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition"
                >
                  Order Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🧾 Order History */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
        <h3 className="text-xl font-semibold mb-4">Your Recent Orders</h3>
        {orders.filter((o) => o.vendorName === vendorName).length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No orders yet.</p>
        ) : (
          <ul className="space-y-2">
            {orders
              .filter((o) => o.vendorName === vendorName)
              .map((order, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-md"
                >
                  <span>{order.itemName} (x{order.quantity || 1})</span>
                  <span className="text-sm text-gray-500 dark:text-gray-300">
                    {new Date(order.createdAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                </li>
              ))}
          </ul>
        )}
      </div>

      {/* 🛒 Floating Cart Button */}
      <div className="fixed top-6 right-6 z-50 flex items-center space-x-2">
        <button
          onClick={() => setShowCart(!showCart)}
          className="relative flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-full shadow-lg transition"
        >
          <ShoppingCart className="mr-2" />
          Cart
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 animate-pulse text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
              {cart.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          )}
        </button>
      </div>

      {/* 🧺 Cart Panel */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed top-20 right-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 w-80 shadow-xl z-50"
          >
            <h4 className="text-lg font-bold mb-3">Cart</h4>
            {cart.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">Your cart is empty</p>
            ) : (
              <ul className="space-y-3 mb-4">
                {cart.map((item) => (
                  <li key={item.id} className="flex justify-between items-center">
                    <span>{item.name} x{item.quantity}</span>
                    <Trash2
                      className="h-4 w-4 text-red-500 cursor-pointer"
                      onClick={() => removeFromCart(item.id)}
                    />
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={handlePlaceAllOrders}
              disabled={cart.length === 0}
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            >
              Place All Orders
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}









