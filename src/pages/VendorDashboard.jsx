import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

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

  const filteredMaterials = materials.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <motion.h2
        className="text-3xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Vendor Inventory
      </motion.h2>

      <div className="mb-6 text-center">
        <input
          type="text"
          placeholder="Search ingredients..."
          className="w-full md:w-1/2 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMaterials.map((item) => (
          <motion.div
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-40 w-full object-cover"
            />
            <div className="p-5 space-y-3">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-green-600 dark:text-green-400">{item.price}</p>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                In Stock
              </div>

              {/* Order Button */}
              <button
                onClick={() => alert(`✅ Order placed for ${item.name}!`)}
                className="mt-2 w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                Place Order
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}






