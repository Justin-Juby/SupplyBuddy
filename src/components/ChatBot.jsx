import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Heya 👋 I’m your buddy! What’s up?" },
  ]);
  const [input, setInput] = useState("");

  const getBotReply = (msg) => {
    const text = msg.toLowerCase();

    if (text.includes("hello") || text.includes("hi")) {
      return "Hey there! 👋 Need help with something?";
    } else if (text.includes("order")) {
      return "You can place an order by hitting that green 'Place Order' button 🚀";
    } else if (text.includes("supplier")) {
      return "Suppliers can update or upload inventory on their dashboard 💼";
    } else if (text.includes("how are you")) {
      return "I’m living my best digital life 😎 What about you?";
    } else if (["ok", "okay", "k", "cool", "nice", "fine", "hmm"].includes(text)) {
      return "Gotcha ✅";
    } else if (text.includes("thanks") || text.includes("thank you")) {
      return "Aww, you're welcome! 💚";
    } else if (text.includes("bug") || text.includes("error") || text.includes("not working")) {
      return "Yikes 😬 If something's off, just refresh or double-check your steps!";
    } else if (text.includes("feature") || text.includes("add")) {
      return "Got ideas? I’m all ears 👂 Tell me more!";
    } else if (text.includes("bye")) {
      return "Catch you later! 👋";
    } else {
      return "Oops 😅 I’m not that smart yet. Try rephrasing?";
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    const botMsg = { from: "bot", text: getBotReply(input) };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-40 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden flex flex-col">
          <div className="p-3 font-semibold bg-green-600 text-white text-center">SupplyBuddy 🤖</div>
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
