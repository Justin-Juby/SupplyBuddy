import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hey there 👋 I’m SupplyBuddy Bot — here to help vendors & suppliers. Ask me anything like ‘Where can I find garlic?’ or ‘How to buy tomatoes?’ 😄",
    },
  ]);
  const [input, setInput] = useState("");

  const getBotReply = (userMsg) => {
    const msg = userMsg.toLowerCase();

    // Simple greetings
    if (/^(hi|hello|hey)\b/.test(msg)) return "Hey! What can I help you with today? 🤗";
    if (/thank(s| you)/.test(msg)) return "Aww, you’re welcome! 😄";
    if (/ok(ay)?|cool|nice/.test(msg)) return "Cool cool 😎 Let me know if you need anything else!";

    // Asking about where items are
    if (/where.*(tomato|potato|chili|garlic)/.test(msg))
      return "You can find that item in the Vendor Inventory. Just hit 'Explore Inventory' on the homepage! 🛒";

    if (/where.*(they|items|ingredients)/.test(msg))
      return "All items are listed under 'Vendor Inventory'. Go check it out! 👀";

    // Buying or ordering
    if (/how.*(buy|order|get)/.test(msg))
      return "Just click 'Place Order' next to the item you want. It’ll show up in your recent orders. Easy peasy! ✅";

    // Asking about specific items
    if (/\b(tomato|potato|chili|garlic)\b/.test(msg))
      return `Yes, ${msg.match(/\b(tomato|potato|chili|garlic)\b/)[0]} is in stock! ✅ Check inventory to place an order.`;

    // Cart-related
    if (/cart/.test(msg)) return "Your cart icon is floating on the Vendor page. Add items and click to view orders 🛒";

    // Supplier-related
    if (/upload|supplier|stock/.test(msg))
      return "Suppliers can update stock in real-time from the Supplier Dashboard 📦";

    // Default fallback
    return "Hmm... I didn’t get that 😅 Try asking about items, how to buy, or supplier updates!";
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    const botResponse = getBotReply(userText);

    setMessages((prev) => [
      ...prev,
      { from: "user", text: userText },
      { from: "bot", text: botResponse },
    ]);
    setInput("");
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
          <div className="p-3 font-semibold bg-green-600 text-white text-center">SupplyBuddy Chat</div>
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
              placeholder="Ask something..."
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
