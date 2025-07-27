import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-[9999] w-5 h-5 rounded-full bg-green-500 mix-blend-difference transition-transform duration-150 ease-out"
      style={{
        transform: `translate3d(${pos.x - 10}px, ${pos.y - 10}px, 0)`
      }}
    />
  );
}

