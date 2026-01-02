import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles, Paperclip, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ChatInputProps {
  onSubmit?: (message: string) => void;
  placeholder?: string;
}

const placeholderTexts = [
  "Landing page para minha startup de tecnologia...",
  "E-commerce moderno para loja de roupas...",
  "Portfolio profissional para designer...",
  "Blog minimalista sobre viagens...",
  "Site institucional para escritório de advocacia...",
];

const ChatInput = ({ onSubmit, placeholder }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (message) return; // Don't animate if user is typing

    const currentText = placeholderTexts[currentPlaceholderIndex];
    let charIndex = 0;
    let isDeleting = false;
    let timeout: NodeJS.Timeout;

    const type = () => {
      if (!isDeleting) {
        if (charIndex <= currentText.length) {
          setTypingText(currentText.slice(0, charIndex));
          charIndex++;
          timeout = setTimeout(type, 50 + Math.random() * 30);
        } else {
          timeout = setTimeout(() => {
            isDeleting = true;
            type();
          }, 2000);
        }
      } else {
        if (charIndex > 0) {
          charIndex--;
          setTypingText(currentText.slice(0, charIndex));
          timeout = setTimeout(type, 30);
        } else {
          isDeleting = false;
          setCurrentPlaceholderIndex((prev) => (prev + 1) % placeholderTexts.length);
        }
      }
    };

    type();

    return () => clearTimeout(timeout);
  }, [currentPlaceholderIndex, message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      if (onSubmit) {
        onSubmit(message);
      }
      // Navigate to auth/builder with the message
      navigate("/auth", { state: { prompt: message } });
    }
  };

  const suggestions = [
    "Landing page para startup",
    "Portfolio profissional",
    "E-commerce moderno",
    "Blog pessoal"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full"
    >
      <form onSubmit={handleSubmit}>
        <motion.div
          animate={{
            boxShadow: isFocused 
              ? "0 0 0 2px hsl(24, 100%, 50%), 0 25px 50px -12px rgba(255, 120, 0, 0.25)" 
              : "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
          }}
          transition={{ duration: 0.2 }}
          className="relative bg-card rounded-2xl border border-border overflow-hidden"
        >
          {/* Input area */}
          <div className="flex items-start gap-3 p-4">
            <motion.div
              animate={{ rotate: isFocused ? 360 : 0 }}
              transition={{ duration: 0.5 }}
              className="mt-1"
            >
              <Sparkles className="w-5 h-5 text-primary" />
            </motion.div>
            <div className="flex-1 relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder=""
                rows={3}
                className="w-full bg-transparent text-foreground resize-none outline-none text-lg relative z-10"
              />
              {!message && (
                <div className="absolute top-0 left-0 text-muted-foreground text-lg pointer-events-none">
                  {typingText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="inline-block w-0.5 h-5 bg-primary ml-0.5 align-middle"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Actions bar */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-secondary/30">
            <div className="flex items-center gap-2">
              <Button type="button" variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <Paperclip className="w-4 h-4" />
              </Button>
              <Button type="button" variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <Mic className="w-4 h-4" />
              </Button>
            </div>
            <Button 
              type="submit" 
              variant="hero" 
              size="sm"
              disabled={!message.trim()}
              className="gap-2"
            >
              Criar Site
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </form>

      {/* Suggestions */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap items-center gap-2 mt-4"
      >
        <span className="text-sm text-muted-foreground">Tente:</span>
        {suggestions.map((suggestion, index) => (
          <motion.button
            key={suggestion}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMessage(suggestion)}
            type="button"
            className="px-3 py-1.5 text-sm bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground rounded-full border border-border transition-colors"
          >
            {suggestion}
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ChatInput;
