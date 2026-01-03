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
import TypingEffect from "./TypingEffect";
import ChatMessage from "./ChatMessage";

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
  typingTexts: string[];
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
    ],
    typingTexts: [
      "um plano de negócio para minha startup...",
      "validar minha ideia de produto...",
      "definir meu modelo de receita...",
      "analisar meu mercado-alvo..."
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
    ],
    typingTexts: [
      "uma identidade de marca moderna...",
      "um tom de voz profissional...",
      "uma marca feminina e elegante...",
      "uma marca masculina e forte..."
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
    ],
    typingTexts: [
      "um logo minimalista e moderno...",
      "uma identidade visual premium...",
      "conceito de logo para tech...",
      "paleta de cores sofisticada..."
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
    ],
    typingTexts: [
      "uma landing page moderna...",
      "um site para minha empresa...",
      "uma loja virtual elegante...",
      "um portfólio profissional..."
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
    ],
    typingTexts: [
      "uma bio impactante para Instagram...",
      "headlines que convertem...",
      "textos de vendas persuasivos...",
      "descrição de produto..."
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
    ],
    typingTexts: [
      "um plano de marketing digital...",
      "calendário de conteúdo mensal...",
      "estratégia de funil de vendas...",
      "campanhas para Instagram..."
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
    ],
    typingTexts: [
      "um script de vendas eficaz...",
      "respostas para objeções...",
      "sequência de follow-up...",
      "pitch de elevador..."
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
    ],
    typingTexts: [
      "analisar minha empresa atual...",
      "otimizar meus processos...",
      "escalar meu negócio...",
      "melhorar minha conversão..."
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
  const [streamingContent, setStreamingContent] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const tool = toolsConfig[selectedTool] || toolsConfig.business;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingContent]);

  useEffect(() => {
    setMessages([]);
    setShowTips(true);
    setPreviewContent("");
    setStreamingContent("");
  }, [selectedTool]);

  const handleStreamingAI = async (userMessage: string) => {
    setStreamingContent("");
    
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-ai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
          toolId: selectedTool
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao conectar com a IA");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("Erro ao ler resposta");

      const decoder = new TextDecoder();
      let buffer = "";
      let fullContent = "";

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
              fullContent += content;
              setStreamingContent(fullContent);
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
      
      return fullContent;
    } catch (error: any) {
      console.error("Streaming error:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setShowTips(false);
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      let response: string;
      
      if (selectedTool === "website" && onSendMessage) {
        // Use website generator for website tool
        response = await onSendMessage(userMessage, selectedTool);
      } else {
        // Use streaming AI for other tools
        response = await handleStreamingAI(userMessage);
      }
      
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
      setStreamingContent("");
      setPreviewContent(response);
    } catch (error: any) {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: `Desculpe, ocorreu um erro: ${error.message}` 
      }]);
      setStreamingContent("");
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
      <div className="flex-1 flex flex-col bg-[hsl(0,0%,5%)]">
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
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      Olá, {userName}!
                    </h1>
                    <p className="text-base text-white/50">
                      Peça para a Codia criar{" "}
                      <TypingEffect 
                        texts={tool.typingTexts}
                        className="text-orange-400"
                      />
                    </p>
                  </motion.div>

                  {/* Tool Card */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="w-full max-w-xl bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 mb-6"
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
                    <ChatMessage
                      key={index}
                      content={message.content}
                      role={message.role}
                      userName={userName}
                    />
                  ))}

                  {/* Streaming content */}
                  {streamingContent && (
                    <ChatMessage
                      content={streamingContent}
                      role="assistant"
                      userName={userName}
                      isStreaming={true}
                    />
                  )}

                  {isLoading && !streamingContent && (
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
        <div className="border-t border-white/[0.06] bg-[hsl(0,0%,4%)]">
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
          content={previewContent || streamingContent}
          type={selectedTool as any}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default UnifiedChat;
