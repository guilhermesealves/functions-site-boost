import { motion } from "framer-motion";
import { Sparkles, Download } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  content: string;
  role: "user" | "assistant";
  userName?: string;
  isStreaming?: boolean;
  imageUrl?: string;
}

const ChatMessage = ({ content, role, userName = "U", isStreaming = false, imageUrl }: ChatMessageProps) => {
  const handleDownload = () => {
    if (!imageUrl) return;
    
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `codia-logo-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (role === "user") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-3 justify-end"
      >
        <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <p className="text-sm leading-relaxed">{content}</p>
        </div>
        <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0 text-white/60 font-semibold text-sm">
          {userName.charAt(0).toUpperCase()}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-3"
    >
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shrink-0">
        <Sparkles className="w-4 h-4 text-white" />
      </div>
      <div className="flex-1 max-w-[85%]">
        <div className="bg-[hsl(0,0%,8%)] border border-white/[0.08] rounded-2xl overflow-hidden">
          {/* Response header */}
          <div className="px-4 py-2.5 border-b border-white/[0.06] flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-400" />
            <span className="text-xs font-medium text-white/60">Codia</span>
            {isStreaming && (
              <span className="text-xs text-orange-400 animate-pulse ml-auto">Gerando...</span>
            )}
          </div>
          
          {/* Image display if present */}
          {imageUrl && (
            <div className="p-4 border-b border-white/[0.06]">
              <div className="relative group">
                <img 
                  src={imageUrl} 
                  alt="Logo gerada" 
                  className="w-full max-w-md mx-auto rounded-xl shadow-2xl"
                />
                <button
                  onClick={handleDownload}
                  className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black/80 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
          
          {/* Response content with markdown */}
          <div className="p-4 prose prose-invert prose-sm max-w-none 
            prose-headings:text-white prose-headings:font-semibold prose-headings:mb-2 prose-headings:mt-4
            prose-h1:text-lg prose-h2:text-base prose-h3:text-sm
            prose-p:text-white/80 prose-p:leading-relaxed prose-p:my-2
            prose-ul:my-2 prose-ul:space-y-1 prose-ol:my-2 prose-ol:space-y-1
            prose-li:text-white/80 prose-li:marker:text-orange-400
            prose-strong:text-white prose-strong:font-semibold
            prose-em:text-orange-300
            prose-code:text-orange-300 prose-code:bg-white/[0.05] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-blockquote:border-l-orange-400 prose-blockquote:bg-white/[0.02] prose-blockquote:py-1 prose-blockquote:pl-4
            prose-hr:border-white/[0.08]"
          >
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
