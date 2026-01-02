import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Loader2, 
  Lightbulb, 
  ArrowUp,
  Paperclip,
  Globe,
  Palette,
  PenTool,
  FileText,
  TrendingUp,
  Briefcase,
  Target,
  Building2,
  Sparkles,
  Image,
  Mic,
  Plus
} from "lucide-react";
import PreviewPanel from "./PreviewPanel";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  placeholder: string;
  examples: string[];
  tips: string[];
}

const toolsConfig: Record<string, Tool> = {
  business: {
    id: "business",
    name: "Plano de Negócio",
    description: "Estruture seu modelo de negócio, valide sua ideia e defina estratégias de crescimento.",
    icon: Briefcase,
    placeholder: "Descreva sua ideia de negócio...",
    examples: ["Validar minha ideia de negócio", "Criar modelo de receita", "Definir público-alvo"],
    tips: [
      "Comece definindo o problema que você resolve",
      "Identifique quem são seus clientes ideais",
      "Pense em como você vai ganhar dinheiro"
    ]
  },
  branding: {
    id: "branding",
    name: "Branding",
    description: "Defina a identidade da sua marca, tom de voz, valores e posicionamento no mercado.",
    icon: Palette,
    placeholder: "Qual a personalidade da sua marca?",
    examples: ["Criar identidade de marca", "Definir tom de voz", "Posicionamento de mercado"],
    tips: [
      "Pense em 3 palavras que definem sua marca",
      "Como você quer que clientes se sintam?",
      "O que diferencia você da concorrência?"
    ]
  },
  logo: {
    id: "logo",
    name: "Logo & Visual",
    description: "Crie sua identidade visual com logo, paleta de cores e elementos gráficos.",
    icon: PenTool,
    placeholder: "Descreva o estilo visual desejado...",
    examples: ["Criar conceito de logo", "Paleta de cores", "Manual de marca"],
    tips: [
      "Logos simples são mais memoráveis",
      "Escolha cores que transmitam emoção certa",
      "Considere como ficará em tamanhos pequenos"
    ]
  },
  website: {
    id: "website",
    name: "Website",
    description: "Crie seu site profissional com design moderno e otimizado para conversão.",
    icon: Globe,
    placeholder: "Descreva o site que você imagina...",
    examples: ["Landing page moderna", "Site institucional", "Loja virtual"],
    tips: [
      "Tenha uma proposta de valor clara no topo",
      "Use CTAs claros e visíveis",
      "Mobile first - pense no celular primeiro"
    ]
  },
  copywriter: {
    id: "copywriter",
    name: "Copywriter",
    description: "Crie textos persuasivos para bio, anúncios, landing pages e muito mais.",
    icon: FileText,
    placeholder: "Que tipo de texto você precisa?",
    examples: ["Bio para Instagram", "Texto de vendas", "Headlines impactantes"],
    tips: [
      "Foque nos benefícios, não nas características",
      "Use linguagem do seu público",
      "Crie urgência e escassez quando apropriado"
    ]
  },
  marketing: {
    id: "marketing",
    name: "Marketing",
    description: "Estratégias de marketing digital, campanhas, funis de venda e growth hacking.",
    icon: TrendingUp,
    placeholder: "Qual seu objetivo de marketing?",
    examples: ["Plano de marketing digital", "Calendário de conteúdo", "Estratégia de funil"],
    tips: [
      "Comece onde seu público já está",
      "Consistência é melhor que perfeição",
      "Meça tudo e otimize baseado em dados"
    ]
  },
  sales: {
    id: "sales",
    name: "Vendas",
    description: "Scripts de venda, objeções, follow-up e técnicas de fechamento.",
    icon: Target,
    placeholder: "O que você precisa vender?",
    examples: ["Script de vendas", "Responder objeções", "Email de follow-up"],
    tips: [
      "Ouça mais do que fala",
      "Entenda a dor antes de oferecer solução",
      "Sempre tenha próximo passo definido"
    ]
  },
  existing: {
    id: "existing",
    name: "Empresa Existente",
    description: "Importe dados da sua empresa para personalizar as ferramentas de IA.",
    icon: Building2,
    placeholder: "Conte sobre sua empresa...",
    examples: ["Nome e setor da empresa", "Público-alvo atual", "Principais desafios"],
    tips: [
      "Quanto mais detalhes, melhor a personalização",
      "Inclua informações sobre sua concorrência",
      "Descreva seu diferencial competitivo"
    ]
  }
};

interface UnifiedChatProps {
  selectedTool: string;
  onSendMessage?: (message: string, toolId: string) => Promise<string>;
  userName?: string;
}

const UnifiedChat = ({ selectedTool, onSendMessage, userName = "você" }: UnifiedChatProps) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showTips, setShowTips] = useState(true);
  const [previewContent, setPreviewContent] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const tool = toolsConfig[selectedTool] || toolsConfig.business;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setMessages([]);
    setShowTips(true);
    setPreviewContent("");
  }, [selectedTool]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setShowTips(false);
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      if (onSendMessage) {
        const response = await onSendMessage(userMessage, selectedTool);
        setMessages(prev => [...prev, { role: "assistant", content: response }]);
        // Set preview content if it's a website or content response
        if (selectedTool === "website" || response.includes("<!DOCTYPE") || response.includes("<html")) {
          setPreviewContent(response);
        } else {
          setPreviewContent(response);
        }
      } else {
        setTimeout(() => {
          const demoResponse = `Analisando sua solicitação sobre: "${userMessage}"...\n\nEsta funcionalidade está sendo desenvolvida. Em breve você poderá usar a IA de ${tool.name} para criar conteúdo incrível para sua empresa.`;
          setMessages(prev => [...prev, { 
            role: "assistant", 
            content: demoResponse
          }]);
          setPreviewContent(demoResponse);
          setIsLoading(false);
        }, 1500);
        return;
      }
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Desculpe, ocorreu um erro. Tente novamente." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (example: string) => {
    setInput(example);
  };

  return (
    <div className="flex-1 flex h-[calc(100vh-64px)]">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-[hsl(0,0%,4%)]">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-6 py-8">
            <AnimatePresence mode="wait">
              {messages.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center justify-center min-h-[50vh] pt-8"
                >
                  {/* Welcome */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center mb-8"
                  >
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      Olá, {userName}!
                    </h1>
                    <p className="text-base text-white/40">
                      Como posso ajudar com <span className="text-orange-400">{tool.name}</span> hoje?
                    </p>
                  </motion.div>

                  {/* Tool Card */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="w-full max-w-xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.06] rounded-2xl p-5 mb-6"
                  >
                    <div className="flex items-start gap-4 mb-5">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                        <tool.icon className="w-6 h-6 text-orange-400" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-white mb-1">{tool.name}</h2>
                        <p className="text-white/40 text-sm">{tool.description}</p>
                      </div>
                    </div>

                    {/* Examples */}
                    <div className="flex flex-wrap gap-2">
                      {tool.examples.map((example) => (
                        <button
                          key={example}
                          onClick={() => handleExampleClick(example)}
                          className="px-3 py-2 text-sm bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.12] rounded-xl text-white/60 hover:text-white transition-all"
                        >
                          {example}
                        </button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Tips */}
                  {showTips && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="w-full max-w-xl"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="w-4 h-4 text-amber-400" />
                        <span className="text-sm font-medium text-white/60">Dicas para melhores resultados</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {tool.tips.map((tip, i) => (
                          <div 
                            key={i} 
                            className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl"
                          >
                            <p className="text-xs text-white/40">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="messages"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-5 py-6"
                >
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.role === "assistant" && (
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shrink-0">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          message.role === "user"
                            ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                            : "bg-white/[0.03] border border-white/[0.06] text-white/80"
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      </div>
                      {message.role === "user" && (
                        <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0 text-white/60 font-semibold text-sm">
                          {userName.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3"
                    >
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shrink-0">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                            <div className="w-2 h-2 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                            <div className="w-2 h-2 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                          </div>
                          <span className="text-sm text-white/40">Codia está pensando...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-white/[0.06] bg-[hsl(0,0%,5%)]">
          <div className="max-w-3xl mx-auto px-6 py-4">
            <form onSubmit={handleSubmit}>
              <div className="relative flex items-center bg-[hsl(0,0%,8%)] border border-white/[0.08] rounded-2xl focus-within:border-orange-500/30 focus-within:ring-4 focus-within:ring-orange-500/5 transition-all">
                {/* Left buttons */}
                <div className="flex items-center pl-2">
                  <button
                    type="button"
                    className="p-2 text-white/30 hover:text-white/50 rounded-lg hover:bg-white/[0.04] transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    className="p-2 text-white/30 hover:text-white/50 rounded-lg hover:bg-white/[0.04] transition-colors"
                  >
                    <Paperclip className="w-5 h-5" />
                  </button>
                </div>

                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={tool.placeholder}
                  className="flex-1 py-3.5 px-3 bg-transparent text-white placeholder:text-white/30 text-sm outline-none"
                  disabled={isLoading}
                />

                {/* Right buttons */}
                <div className="flex items-center gap-1 pr-2">
                  <button
                    type="button"
                    className="p-2 text-white/30 hover:text-white/50 rounded-lg hover:bg-white/[0.04] transition-colors"
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="w-10 h-10 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-30 disabled:hover:from-orange-500 disabled:hover:to-orange-600 flex items-center justify-center transition-all shadow-lg shadow-orange-500/20"
                  >
                    <ArrowUp className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </form>

            <p className="text-center text-[10px] text-white/20 mt-3">
              Codia pode cometer erros. Verifique informações importantes.
            </p>
          </div>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="hidden lg:block w-[45%] xl:w-[50%]">
        <PreviewPanel 
          content={previewContent}
          type={selectedTool as any}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default UnifiedChat;
