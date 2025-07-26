import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const initialInventory = [
  { id: 1, name: "Tomatoes", quantity: 100, unit: "kg" },
  { id: 2, name: "Potatoes", quantity: 150, unit: "kg" },
  { id: 3, name: "Garlic", quantity: 50, unit: "kg" },
  { id: 4, name: "Green Chilies", quantity: 30, unit: "kg" },
];

export default function SupplierDashboard() {
  const [inventory, setInventory] = useState(initialInventory);

  const updateStock = (id) => {
    const updated = inventory.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 10 } // Increment by 10 for example
        : item
    );
    setInventory(updated);
    toast.success("✅ Stock updated!");
  };

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <motion.h2
        className="text-3xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Supplier Inventory
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {inventory.map((item) => (
          <motion.div
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition p-5 space-y-3"
            whileHover={{ scale: 1.03 }}
          >
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Quantity:{" "}
              <span className="font-medium text-green-600 dark:text-green-400">
                {item.quantity} {item.unit}
              </span>
            </p>
            <button
              onClick={() => updateStock(item.id)}
              className="mt-2 w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Update Stock
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}




