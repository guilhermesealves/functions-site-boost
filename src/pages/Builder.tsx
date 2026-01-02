import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Send, Sparkles, LogOut, Code, Eye, Loader2, Copy, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Builder = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCode, setShowCode] = useState(true);
  const [copied, setCopied] = useState(false);
  const [user, setUser] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const extractCode = (content: string): string | null => {
    const codeMatch = content.match(/```(?:html|jsx|tsx)?\n?([\s\S]*?)```/);
    return codeMatch ? codeMatch[1].trim() : null;
  };

  const copyCode = () => {
    const lastAssistant = messages.filter(m => m.role === "assistant").pop();
    if (lastAssistant) {
      const code = extractCode(lastAssistant.content);
      if (code) {
        navigator.clipboard.writeText(code);
        setCopied(true);
        toast.success("Código copiado!");
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    let assistantContent = "";

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-site`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ prompt: input }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao gerar site");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("Erro ao ler resposta");

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        
        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                  return prev.map((m, i) => 
                    i === prev.length - 1 ? { ...m, content: assistantContent } : m
                  );
                }
                return [...prev, { role: "assistant", content: assistantContent }];
              });
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "Erro ao gerar site");
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "Desculpe, ocorreu um erro. Tente novamente." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const lastAssistantMessage = messages.filter(m => m.role === "assistant").pop();
  const generatedCode = lastAssistantMessage ? extractCode(lastAssistantMessage.content) : null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-orange flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-primary-foreground font-display font-bold text-xl">F</span>
            </div>
            <div>
              <span className="font-display font-bold text-lg">Functions</span>
              <span className="text-xs text-muted-foreground ml-2">Builder</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user && (
              <span className="text-sm text-muted-foreground hidden sm:block">
                {user.email}
              </span>
            )}
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sair</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Chat Panel */}
        <div className="w-full lg:w-1/2 flex flex-col border-r border-border/50">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 rounded-2xl bg-gradient-orange flex items-center justify-center mb-6 shadow-xl shadow-primary/30"
                >
                  <Sparkles className="w-10 h-10 text-primary-foreground" />
                </motion.div>
                <h2 className="font-display text-2xl font-bold mb-2">
                  Descreva seu site
                </h2>
                <p className="text-muted-foreground max-w-md">
                  Diga o que você precisa e a IA vai criar o código para você. 
                  Seja específico para melhores resultados!
                </p>
                <div className="flex flex-wrap gap-2 mt-6 justify-center">
                  {["Landing page moderna", "Portfolio criativo", "Blog minimalista"].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setInput(suggestion)}
                      className="px-4 py-2 text-sm bg-secondary/50 hover:bg-secondary rounded-full border border-border transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary/50 border border-border"
                    }`}
                  >
                    <div className="prose prose-sm prose-invert max-w-none whitespace-pre-wrap">
                      {message.content}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-secondary/50 border border-border rounded-2xl px-4 py-3 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">Gerando código...</span>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-border/50">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Descreva o site que você quer criar..."
                className="flex-1 px-4 py-3 bg-secondary/30 border border-border rounded-xl focus:outline-none focus:border-primary/50 transition-colors"
                disabled={isLoading}
              />
              <Button type="submit" variant="hero" disabled={isLoading || !input.trim()}>
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </form>
        </div>

        {/* Preview Panel */}
        <div className="hidden lg:flex flex-1 flex-col bg-[hsl(0,0%,3%)]">
          {/* Preview Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            <div className="flex items-center gap-2">
              <Button
                variant={showCode ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setShowCode(true)}
                className="gap-2"
              >
                <Code className="w-4 h-4" />
                Código
              </Button>
              <Button
                variant={!showCode ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setShowCode(false)}
                className="gap-2"
              >
                <Eye className="w-4 h-4" />
                Preview
              </Button>
            </div>

            {generatedCode && (
              <Button variant="ghost" size="sm" onClick={copyCode} className="gap-2">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copiado!" : "Copiar"}
              </Button>
            )}
          </div>

          {/* Preview Content */}
          <div className="flex-1 overflow-auto p-4">
            {!generatedCode ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-xl bg-secondary/50 flex items-center justify-center mb-4">
                  <Code className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">
                  O código gerado aparecerá aqui
                </p>
              </div>
            ) : showCode ? (
              <pre className="text-sm font-mono text-muted-foreground bg-secondary/30 rounded-xl p-4 overflow-auto">
                <code>{generatedCode}</code>
              </pre>
            ) : (
              <div className="bg-white rounded-xl overflow-hidden h-full">
                <iframe
                  srcDoc={generatedCode}
                  className="w-full h-full border-0"
                  title="Preview"
                  sandbox="allow-scripts"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
