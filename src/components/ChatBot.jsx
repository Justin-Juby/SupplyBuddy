import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Yo! I’m your buddy 🤖 Ask me anything!" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    const reply = generateReply(input.toLowerCase());
    const botMessage = { from: "bot", text: reply };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  };

  const generateReply = (msg) => {
    // Greeting
    if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
      return "Hey there! 👋 Need help finding something?";
    }

    // Thanks
    if (msg.includes("thanks") || msg.includes("thank you")) {
      return "No problem! Glad to help 😎";
    }

    // Buy or Get
    if (msg.includes("buy") || msg.includes("get") || msg.includes("order")) {
      const item = extractItem(msg);
      return item
        ? `You can place an order for ${item} directly from the Vendor Dashboard!`
        : "Just click on any item in the Vendor Dashboard to place an order ✅";
    }

    // In stock / inventory
    if (msg.includes("stock") || msg.includes("available") || msg.includes("inventory")) {
      return "We currently have Tomatoes 🍅, Potatoes 🥔, Garlic 🧄, and Green Chilies 🌶️ in stock!";
    }

    // Usage help
    if (msg.includes("how to") || msg.includes("use") || msg.includes("help")) {
      return "Just explore the Vendor or Supplier Dashboard, click on items to order or update stock. Easy peasy! 💡";
    }

    // Fallback
    return "Oops, I'm still learning 🤖 Try asking about items, stock, or how to order!";
  };

  const extractItem = (msg) => {
    const keywords = ["tomatoes", "potatoes", "garlic", "green chilies"];
    return keywords.find((item) => msg.includes(item.toLowerCase()));
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-40 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden flex flex-col">
          <div className="p-3 font-semibold bg-green-600 text-white text-center">
            Chat Assistant
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-md max-w-[75%] ${
                  msg.from === "user"
                    ? "bg-green-100 dark:bg-green-800 ml-auto text-right"
                    : "bg-gray-100 dark:bg-gray-700 text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex border-t border-gray-200 dark:border-gray-700">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 text-sm bg-transparent outline-none dark:text-white"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="px-4 text-green-600 dark:text-green-400 font-semibold"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
