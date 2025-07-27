import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hey there 👋 I’m your SupplyBuddy Bot. Need help with inventory, ordering, or just wanna vibe? Ask away! 😄",
    },
  ]);
  const [input, setInput] = useState("");

  const getBotReply = (userMsg) => {
    const msg = userMsg.toLowerCase();

    // Greetings
    if (/^(hi|hello|hey)\b/.test(msg)) return "Hey hey! 👋 What’s up?";
    if (/thank(s| you)/.test(msg)) return "Aww, you’re welcome bestie 🫶";
    if (/ok(ay)?|cool|nice/.test(msg)) return "Cool cool 😎 Let’s keep it rollin’!";

    // Farewells
    if (/bye|see ya|goodbye|peace/.test(msg)) return "Catch ya later! 👋 Stay spicy like our chilies 🌶️";
    
    // GenZ Reacts
    if (/lol|lmao|haha|rofl/.test(msg)) return "😂 You crack me up fr";

    // Ordering questions
    if (/how.*(buy|order|get)/.test(msg))
      return "Just click 'Place Order' next to any item in the Vendor Dashboard! 🛒 It’s that simple.";

    // Where are items
    if (/where.*(tomato|potato|chili|garlic)/.test(msg))
      return "Head over to Vendor Inventory — they’re chillin’ right there! 🥔🍅";

    if (/where.*(items|inventory|ingredients)/.test(msg))
      return "All stocked items are visible in the Vendor page 📦";

    // Specific item mentions
    if (/\b(tomato|potato|chili|garlic)\b/.test(msg)) {
      const item = msg.match(/\b(tomato|potato|chili|garlic)\b/)[0];
      return `Yep, ${item} is totally in stock 🔥 Check the Vendor Inventory to grab it!`;
    }

    // Supplier related
    if (/upload|supplier|stock/.test(msg))
      return "Suppliers can update or upload items in their dashboard. Real-time stock, baby! 📈";

    // Cart
    if (/cart/.test(msg))
      return "Click on the 🛒 cart bubble on the Vendor page to see what you’ve added! Don’t overstock 😉";

    // Fallback — witty GenZ-style
    const fallbackReplies = [
      "Woah 😵 that flew right over my processor...",
      "Uhhh... English please? Or Binary? 😅",
      "Sorry bestie, I’m not that smart yet... but I’m learning 💻📚",
      "I lowkey didn’t get that 😬 Try asking about items, orders or stock!"
    ];

    return fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
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
