import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles, Paperclip, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  onSubmit?: (message: string) => void;
  placeholder?: string;
}

const ChatInput = ({ onSubmit, placeholder = "Descreva o site que você quer criar..." }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && onSubmit) {
      onSubmit(message);
      setMessage("");
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
      className="w-full max-w-3xl mx-auto"
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
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder}
              rows={3}
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground resize-none outline-none text-lg"
            />
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
        className="flex flex-wrap items-center justify-center gap-2 mt-4"
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
