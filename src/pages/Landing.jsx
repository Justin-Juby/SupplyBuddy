import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Landing() {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [0, 1], [10, -10]);
  const rotateY = useTransform(mouseX, [0, 1], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (card) {
        card.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [mouseX, mouseY]);

  return (
    <div className="relative flex items-center justify-center h-[90vh] overflow-hidden bg-gradient-to-br from-gray-50 to-green-100 dark:from-gray-900 dark:to-gray-800">
      {/* Glowing Background Blobs */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 bg-green-400 opacity-30 rounded-full filter blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.25, 0.35, 0.25] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/2 -right-40 w-96 h-96 bg-purple-500 opacity-30 rounded-full filter blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 w-72 h-72 bg-pink-400 opacity-20 rounded-full filter blur-3xl"
        animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      {/* Hero Card */}
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY }}
        className="relative z-10 backdrop-blur-lg bg-white/20 dark:bg-gray-800/30 shadow-2xl rounded-3xl px-10 py-16 text-center max-w-2xl border border-white/30 dark:border-white/10 transform-gpu"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight drop-shadow">
          Welcome to <span className="text-green-600 dark:text-green-400">SupplyBuddy</span>
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 italic">
          India’s smartest way to source street food ingredients — reliable, fast & vendor-friendly.
        </p>
        <motion.a
          href="/vendor"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="inline-block px-6 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md transition"
        >
          Explore Inventory
        </motion.a>
      </motion.div>
    </div>
  );
}









