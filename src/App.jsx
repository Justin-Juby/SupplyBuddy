import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import VendorDashboard from "./pages/VendorDashboard.jsx";
import SupplierDashboard from "./pages/SupplierDashboard.jsx";
import Landing from "./pages/Landing.jsx";
import { Toaster } from "react-hot-toast";
import ChatBot from "./components/ChatBot";
import { AnimatePresence } from "framer-motion";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const location = useLocation();

  // Apply dark mode on mount
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Custom cursor animation
  useEffect(() => {
    const handleMouseMove = (e) => {
      const cursor = document.getElementById("custom-cursor");
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* 🔥 Cursor */}
      <div
        id="custom-cursor"
        className="pointer-events-none fixed z-[9999] w-4 h-4 rounded-full bg-green-400 mix-blend-difference opacity-90 transition-transform duration-150"
      ></div>

      {/* 🔔 Toasts */}
      <Toaster position="bottom-center" reverseOrder={false} />

      {/* 🧭 Main UI */}
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors">
        {/* Navigation Bar */}
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

        {/* Page Transitions & Routes */}
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

      {/* 🤖 ChatBot */}
      <ChatBot />
    </>
  );
}














