import { useState } from "react";
import { Bot, SendHorizonal } from "lucide-react";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I’m your SupplyBuddy bot. How can I help?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    const botReply = getBotResponse(input);

    setMessages((prev) => [...prev, userMsg, { sender: "bot", text: botReply }]);
    setInput("");
  };

  const getBotResponse = (msg) => {
    const lower = msg.toLowerCase();

    if (lower.includes("order") || lower.includes("place")) {
      return "You can place orders on the Vendor page. Click 'Place Order' under the item.";
    }

    if (lower.includes("update stock") || lower.includes("supplier")) {
      return "Go to the Supplier Dashboard to update your inventory stock.";
    }

    if (lower.includes("hello") || lower.includes("hi")) {
      return "Hello there! 😊 How can I assist you today?";
    }

    if (lower.includes("dark") || lower.includes("theme")) {
      return "Click the 'Dark/Light' button in the navbar to toggle theme.";
    }

    return "Sorry, I didn’t understand that. Try asking about placing orders, updating stock, or switching theme.";
  };

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg flex flex-col overflow-hidden z-50">
      <div className="bg-green-600 text-white px-4 py-2 flex items-center gap-2 font-semibold">
        <Bot size={20} />
        SupplyBuddy Bot
      </div>

      <div className="flex-1 px-4 py-2 space-y-2 overflow-y-auto max-h-60 text-sm">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-md ${
              msg.sender === "user"
                ? "bg-green-100 dark:bg-green-900 text-right ml-auto max-w-[80%]"
                : "bg-gray-100 dark:bg-gray-700 text-left mr-auto max-w-[80%]"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex items-center border-t border-gray-300 dark:border-gray-600 px-3 py-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          type="text"
          placeholder="Ask something..."
          className="flex-1 text-sm px-2 py-1 bg-transparent outline-none text-gray-800 dark:text-gray-100"
        />
        <button onClick={handleSend}>
          <SendHorizonal size={18} className="text-green-600 hover:text-green-700" />
        </button>
      </div>
    </div>
  );
}



