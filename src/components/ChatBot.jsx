import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const inventoryItems = ["tomatoes", "potatoes", "garlic", "green chilies"];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hey hey 👋 I'm SupplyBuddy's chat pal. Ask me anything about ingredients or ordering!",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    const botMsg = { from: "bot", text: generateReply(input) };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  const generateReply = (msg) => {
  const lower = msg.toLowerCase();

  const casualReplies = [
    "Cool cool 😎",
    "Alrighty then!",
    "Bet! 🙌",
    "No worries ✌️",
    "You're all set 💯",
    "Sounds good 🤙",
    "Okay okay 🫡",
    "Haha gotchu 👌"
  ];

  // Greetings
  if (/(hello|hi|hey|yo|sup|what's up)/.test(lower)) {
    return "Hey hey 👋 Need help finding something?";
  }

  // Gratitude or casual confirmations
  if (
    /(thank you|thanks|cool|awesome|ok|okay|fine|nice|great|alright|got it|k|hmm|huh|hmm ok|okey)/.test(lower)
  ) {
    return casualReplies[Math.floor(Math.random() * casualReplies.length)];
  }

  // How to use / Help intent
  if (/(how to|use|help|what can you do|instructions|guide)/.test(lower)) {
    return "You can browse ingredients in the Vendor Dashboard or update stock in the Supplier view 💼";
  }

  // Buy/order intent
  if (/(buy|get|order|place|need|want)/.test(lower)) {
    const found = extractItem(lower);
    return found
      ? `Just click "Place Order" for ${capitalize(found)} in the Vendor Dashboard 🚀`
      : "Click any item card on the Vendor Dashboard to place an order! 💸";
  }

  // Direct item check
  const found = extractItem(lower);
  if (found) {
    return `✅ ${capitalize(found)} is currently in stock and ready to order from the Vendor Dashboard!`;
  }

  // Inventory overview
  if (/(stock|inventory|available|have|show)/.test(lower)) {
    return `Right now, we've got: ${inventoryItems.map(capitalize).join(", ")} 📦`;
  }

  // Fallback
  return "Hmm 🤔 I didn’t catch that. Try asking about ingredients or how to order!";
};


  const extractItem = (msg) => {
    return inventoryItems.find((item) => msg.includes(item));
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <>
      {/* Toggle Chat Button */}
      <button
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-40 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden flex flex-col">
          <div className="p-3 font-semibold bg-green-600 text-white text-center">💬 Chat Assistant</div>

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
              placeholder="Type something..."
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
