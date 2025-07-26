// src/pages/Landing.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="relative isolate min-h-[80vh] flex items-center justify-center text-center px-4">
      {/* Gradient Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 opacity-30 blur-[120px] rounded-full animate-pulse"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-md p-10 rounded-xl shadow-lg max-w-2xl"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          Welcome to SupplyBuddy
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
          Helping Indian street food vendors source fresh, affordable ingredients from trusted suppliers.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/vendor"
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition font-medium"
          >
            Vendor Dashboard
          </Link>
          <Link
            to="/supplier"
            className="px-6 py-3 border border-green-600 text-green-600 dark:text-green-400 rounded-md hover:bg-green-100 dark:hover:bg-green-900 transition font-medium"
          >
            Supplier Dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  );
}




