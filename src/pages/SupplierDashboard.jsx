import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function SupplierDashboard() {
  const [inventory, setInventory] = useState([
    { id: 1, name: "Tomatoes", quantity: 100, unit: "kg" },
    { id: 2, name: "Potatoes", quantity: 150, unit: "kg" },
    { id: 3, name: "Garlic", quantity: 50, unit: "kg" },
    { id: 4, name: "Green Chilies", quantity: 30, unit: "kg" },
  ]);

  const [newItem, setNewItem] = useState({ name: "", quantity: "", unit: "kg" });

  const updateStock = (id) => {
    const updated = inventory.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 10 } : item
    );
    setInventory(updated);
    toast.success("✅ Stock updated!");
  };

  const uploadItem = () => {
    if (!newItem.name || !newItem.quantity) {
      toast.error("❌ Fill all fields!");
      return;
    }
    const newEntry = {
      id: Date.now(),
      ...newItem,
      quantity: parseInt(newItem.quantity),
    };
    setInventory((prev) => [...prev, newEntry]);
    toast.success(`✅ ${newItem.name} uploaded!`);
    setNewItem({ name: "", quantity: "", unit: "kg" });
  };

  const deleteItem = (id) => {
    setInventory((prev) => prev.filter((item) => item.id !== id));
    toast.success("🗑️ Item deleted!");
  };

  return (
    <div className="px-4 py-10 max-w-6xl mx-auto">
      <motion.h2
        className="text-3xl font-bold text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Supplier Inventory
      </motion.h2>

      {/* Upload Form */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md mb-8 max-w-md mx-auto space-y-4">
        <h3 className="text-lg font-semibold text-center">Upload New Item</h3>
        <input
          type="text"
          placeholder="Item name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
        />
        <select
          value={newItem.unit}
          onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
        >
          <option value="kg">kg</option>
          <option value="litres">litres</option>
          <option value="units">units</option>
        </select>
        <button
          onClick={uploadItem}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Upload Item
        </button>
      </div>

      {/* Inventory Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {inventory.map((item) => (
          <motion.div
            key={item.id}
            className="rounded-xl p-4 bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 shadow-md hover:shadow-green-400/30 transition-transform transform hover:scale-105"
            whileHover={{ rotate: [0, 1, -1, 0], transition: { duration: 0.3 } }}
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{item.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Quantity:{" "}
              <span className="font-bold text-green-600 dark:text-green-400">
                {item.quantity} {item.unit}
              </span>
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => updateStock(item.id)}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition shadow"
              >
                Update
              </button>
              <button
                onClick={() => deleteItem(item.id)}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition shadow"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}





