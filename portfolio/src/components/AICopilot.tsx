import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bot, User, Send, X, Sparkles, AlertCircle, RotateCcw, ArrowRight } from "lucide-react";
import { ChatMessage } from "../types";

interface AICopilotProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUGGESTED_PROMPTS = [
  "What is Athul's primary tech stack?",
  "Tell me about Academix Hub.",
  "What did Athul achieve in Kho-Kho?",
  "What projects did he build at TECHWINGSYS?",
  "Is Athul ready to relocate and start working?"
];

export default function AICopilot({ isOpen, onClose }: AICopilotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi there! I am Athul's AI Twin. Ask me anything about my full-stack internships, technical skills, academic projects, or CBSE Kho-Kho championship! How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      role: "user",
      content: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      if (!response.ok) {
        throw new Error("Failed to get response from AI");
      }

      const data = await response.json();
      
      const botMsg: ChatMessage = {
        id: Math.random().toString(),
        role: "assistant",
        content: data.text || "I was unable to formulate a response. Please try again.",
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error(err);
      setError("Unable to connect to Athul's AI Twin. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Hi there! I am Athul's AI Twin. Ask me anything about my full-stack internships, technical skills, academic projects, or CBSE Kho-Kho championship! How can I help you today?",
        timestamp: new Date()
      }
    ]);
    setError(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            id="copilot-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#121c2c]/40 backdrop-blur-xs z-50"
          />

          {/* Chat Drawer */}
          <motion.div
            id="copilot-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] bg-[#faf9f5] border-l-2 border-[#121c2c] shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div id="copilot-header" className="p-5 border-b-2 border-[#121c2c] flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#136c5b]/10 rounded-full text-[#136c5b] border border-[#136c5b]/20">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[#121c2c] font-display font-extrabold flex items-center gap-1.5 text-sm uppercase tracking-wide">
                    Athul's AI Twin <Sparkles className="w-3.5 h-3.5 text-[#e09e1b] fill-[#e09e1b]" />
                  </h3>
                  <p className="text-[11px] text-[#5c6874] font-mono">Recruiter Copilot • powered by Gemini</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  id="reset-chat-btn"
                  onClick={handleReset}
                  className="p-2 hover:bg-[#faf9f5] rounded-full text-[#5c6874] hover:text-[#121c2c] border border-transparent hover:border-[#dfdab8] transition-all"
                  title="Reset Conversation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  id="close-chat-btn"
                  onClick={onClose}
                  className="p-2 hover:bg-[#faf9f5] rounded-full text-[#5c6874] hover:text-[#121c2c] border border-transparent hover:border-[#dfdab8] transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Message Area */}
            <div id="copilot-messages" className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#fcfbf7] scrollbar-thin">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role !== "user" && (
                    <div className="w-8 h-8 rounded-full bg-[#136c5b]/10 border border-[#136c5b]/20 flex items-center justify-center text-[#136c5b] shrink-0">
                      <Bot className="w-4.5 h-4.5" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] rounded-[1.5rem] px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#136c5b] text-white rounded-tr-none shadow-xs font-medium"
                        : "bg-white border-2 border-[#121c2c] text-[#121c2c] rounded-tl-none shadow-xs"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.content}</p>
                    <span className={`block text-[9px] mt-1.5 text-right ${msg.role === "user" ? "text-white/60" : "text-[#5c6874] font-mono"}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-[#dfdac8] border border-[#121c2c] flex items-center justify-center text-[#121c2c] shrink-0 font-display font-bold text-xs uppercase">
                      HR
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-[#136c5b]/10 border border-[#136c5b]/20 flex items-center justify-center text-[#136c5b] shrink-0">
                    <Bot className="w-4.5 h-4.5" />
                  </div>
                  <div className="bg-white border-2 border-[#121c2c] rounded-[1.5rem] rounded-tl-none px-4 py-3.5 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-[#136c5b] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2.5 h-2.5 bg-[#e09e1b] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2.5 h-2.5 bg-[#136c5b] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              {error && (
                <div className="flex items-center gap-2.5 p-3.5 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 text-xs font-medium">
                  <AlertCircle className="w-4.5 h-4.5 shrink-0 text-red-600" />
                  <p>{error}</p>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length === 1 && (
              <div id="copilot-suggestions" className="px-5 py-4 bg-white border-t-2 border-[#121c2c]">
                <p className="text-[10px] uppercase tracking-wider text-[#5c6874] mb-2.5 font-mono font-bold">Suggested Questions</p>
                <div className="flex flex-col gap-2">
                  {SUGGESTED_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(prompt)}
                      className="text-xs text-[#121c2c] hover:text-[#136c5b] bg-[#faf9f5] hover:bg-[#f2eede] border-2 border-[#121c2c] rounded-xl px-3 py-2 transition-all text-left flex items-center justify-between font-display font-bold cursor-pointer shadow-xs active:scale-98"
                    >
                      <span>{prompt}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#136c5b]" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form
              id="copilot-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="p-4 border-t-2 border-[#121c2c] bg-white flex items-center gap-2"
            >
              <input
                id="copilot-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me about Athul..."
                className="flex-1 bg-[#faf9f5] border-2 border-[#121c2c] rounded-xl px-4 py-2.5 text-sm text-[#121c2c] focus:outline-none focus:bg-white transition-all placeholder:text-[#5c6874]"
                disabled={isLoading}
              />
              <button
                id="copilot-send-btn"
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-3 bg-[#136c5b] hover:bg-[#0f5446] disabled:bg-[#dfdac8] disabled:text-[#5c6874] text-white rounded-xl transition-all shadow-md cursor-pointer active:scale-95 shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
