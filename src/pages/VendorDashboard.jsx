import { useState, useEffect } from "react";
import { CheckCircle, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

import tomatoImg from "../assets/tomatoes.jpg";
import potatoImg from "../assets/potatoes.jpg";
import chiliImg from "../assets/green-chilies.jpg";
import garlicImg from "../assets/garlic.jpg";

const materials = [
  { id: 1, name: "Tomatoes", price: "₹25/kg", image: tomatoImg },
  { id: 2, name: "Potatoes", price: "₹18/kg", image: potatoImg },
  { id: 3, name: "Green Chilies", price: "₹60/kg", image: chiliImg },
  { id: 4, name: "Garlic", price: "₹200/kg", image: garlicImg },
];

export default function VendorDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const vendorName = "Justin Juby";

  const filteredMaterials = materials.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const placeOrder = (item) => {
    const qty = quantities[item.id] || 1;
    const newOrder = {
      itemName: item.name,
      quantity: qty,
      vendorName,
      createdAt: new Date().toISOString(),
    };

    toast.success(`✅ Ordered ${qty} kg of ${item.name}`);
    setOrders((prev) => [newOrder, ...prev]);
    setCart((prev) => [...prev, newOrder]);
  };

  const handleQuantityChange = (id, value) => {
    const qty = Math.max(1, parseInt(value) || 1);
    setQuantities((prev) => ({ ...prev, [id]: qty }));
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

      {/* 🔍 Search Bar */}
      <div className="mb-6 text-center">
        <input
          type="text"
          placeholder="Search ingredients..."
          className="w-full md:w-1/2 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* 🛒 Cart Preview */}
      <div className="text-right mb-6">
        <button
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 shadow transition"
          onClick={() => setShowCart(!showCart)}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          View Cart ({cart.length})
        </button>
      </div>

      {showCart && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-3">🛒 Your Cart</h3>
          {cart.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No items in cart.</p>
          ) : (
            <ul className="space-y-2">
              {cart.map((order, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-md"
                >
                  <span>
                    {order.itemName} — {order.quantity} kg
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-300">
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
      )}

      {/* 🧱 Inventory Grid */}
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
              <p className="text-green-600 dark:text-green-400 font-medium">{item.price}</p>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-300">
                <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                In Stock
              </div>
              <input
                type="number"
                min="1"
                value={quantities[item.id] || 1}
                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                className="w-full mt-2 px-2 py-1 border rounded-md text-sm dark:bg-gray-800 dark:text-white dark:border-gray-600"
                placeholder="Quantity in kg"
              />
              <button
                onClick={() => placeOrder(item)}
                className="mt-3 w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md shadow hover:shadow-green-400/40 transition-all"
              >
                Place Order
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 📜 Order History */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
        <h3 className="text-xl font-semibold mb-4">Your Recent Orders</h3>
        {orders.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No orders yet.</p>
        ) : (
          <ul className="space-y-2">
            {orders.map((order, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-md"
              >
                <span>
                  {order.itemName} — {order.quantity} kg
                </span>
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
    </div>
  );
}









