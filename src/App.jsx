import { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import VendorDashboard from "./pages/VendorDashboard.jsx";
import SupplierDashboard from "./pages/SupplierDashboard.jsx";
import Landing from "./pages/Landing.jsx";
import { Toaster } from "react-hot-toast";
import ChatBot from "./components/ChatBot";
import { AnimatePresence } from "framer-motion";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors">
        {/* Navigation */}
        <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-md rounded-full px-6 py-2 flex justify-between items-center w-[90%] max-w-4xl">
          <h1 className="font-bold text-green-600 dark:text-green-400 text-lg">SupplyBuddy</h1>
          <div className="space-x-4 flex items-center text-sm">
            <Link to="/" className="hover:text-green-600 dark:hover:text-green-300">Home</Link>
            <Link to="/vendor" className="hover:text-green-600 dark:hover:text-green-300">Vendor</Link>
            <Link to="/supplier" className="hover:text-green-600 dark:hover:text-green-300">Supplier</Link>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="ml-2 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              {darkMode ? "Light" : "Dark"}
            </button>
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="pt-20 max-w-6xl mx-auto px-4">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/vendor" element={<VendorDashboard />} />
              <Route path="/supplier" element={<SupplierDashboard />} />
              <Route path="/" element={<Landing />} />
            </Routes>
          </AnimatePresence>

          {/* Footer */}
          <footer className="text-center text-sm text-gray-500 dark:text-gray-400 mt-12 pb-6">
            Built with <span className="text-red-500">❤️</span> by <span className="font-semibold">JusSagFrank</span>
          </footer>
        </div>
      </div>

      {/* Floating Chatbot Component */}
      <ChatBot />
    </>
  );
}








