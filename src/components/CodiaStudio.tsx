import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Palette, 
  PenTool, 
  Instagram, 
  FileText, 
  MessageCircle, 
  TrendingUp, 
  Lightbulb, 
  ShoppingCart,
  ArrowLeft,
  Sparkles,
  Send,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AITool {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
  examples: string[];
}

const aiTools: AITool[] = [
  {
    id: "branding",
    name: "Branding",
    description: "Cria identidade de marca, posicionamento, tom de voz e diretrizes visuais completas para sua empresa.",
    icon: Palette,
    color: "text-violet-400",
    gradient: "from-violet-500/20 to-purple-500/20",
    examples: ["Criar identidade de marca", "Definir tom de voz", "Posicionamento de mercado"]
  },
  {
    id: "logo",
    name: "Logo",
    description: "Criação de logos profissionais, variações, conceitos e identidade visual marcante.",
    icon: PenTool,
    color: "text-pink-400",
    gradient: "from-pink-500/20 to-rose-500/20",
    examples: ["Criar conceito de logo", "Variações de marca", "Manual de aplicação"]
  },
  {
    id: "social",
    name: "Social Designer",
    description: "Criação de designs para Instagram, stories, carrosséis e conteúdos visuais de alto impacto.",
    icon: Instagram,
    color: "text-orange-400",
    gradient: "from-orange-500/20 to-amber-500/20",
    examples: ["Feed do Instagram", "Stories animados", "Carrosséis de venda"]
  },
  {
    id: "copywriter",
    name: "Copywriter",
    description: "Criação de textos para bio, anúncios, slogans, descrições e frases de impacto que convertem.",
    icon: FileText,
    color: "text-emerald-400",
    gradient: "from-emerald-500/20 to-teal-500/20",
    examples: ["Bio impactante", "Headlines de anúncio", "Descrições de produto"]
  },
  {
    id: "brandchat",
    name: "Brand Chat",
    description: "Chat inteligente que responde e escreve como a sua marca, mantendo consistência em tudo.",
    icon: MessageCircle,
    color: "text-cyan-400",
    gradient: "from-cyan-500/20 to-sky-500/20",
    examples: ["Respostas automáticas", "Tom de comunicação", "Scripts de atendimento"]
  },
  {
    id: "marketing",
    name: "Marketing Strategist",
    description: "Planejamento de marketing, campanhas, calendário de conteúdo e funil de vendas completo.",
    icon: TrendingUp,
    color: "text-blue-400",
    gradient: "from-blue-500/20 to-indigo-500/20",
    examples: ["Plano de marketing", "Calendário de conteúdo", "Estratégia de funil"]
  },
  {
    id: "advisor",
    name: "Business Advisor",
    description: "Ajuda com modelo de negócio, validação de ideias e estratégias de crescimento escalável.",
    icon: Lightbulb,
    color: "text-yellow-400",
    gradient: "from-yellow-500/20 to-orange-500/20",
    examples: ["Validar ideia", "Modelo de negócio", "Estratégia de growth"]
  },
  {
    id: "sales",
    name: "Sales Assistant",
    description: "Criação de scripts de venda, atendimento e mensagens comerciais que fecham negócios.",
    icon: ShoppingCart,
    color: "text-red-400",
    gradient: "from-red-500/20 to-rose-500/20",
    examples: ["Script de vendas", "Follow-up automático", "Mensagens de fechamento"]
  }
];

interface CodiaStudioProps {
  onBack: () => void;
  projectContext?: {
    name?: string;
    prompt?: string;
  };
}

const CodiaStudio = ({ onBack, projectContext }: CodiaStudioProps) => {
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !selectedTool) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response - you can integrate with real AI here
    setTimeout(() => {
      const assistantMessage = { 
        role: "assistant" as const, 
        content: `[${selectedTool.name}] Analisando sua solicitação sobre: "${userMessage.content}"...\n\nEsta funcionalidade está sendo desenvolvida. Em breve você poderá usar a IA de ${selectedTool.name} para criar conteúdo incrível para sua empresa.` 
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleExampleClick = (example: string) => {
    setInput(example);
  };

  return (
    <div className="min-h-screen bg-[hsl(0,0%,4%)]">
      {/* Header */}
      <header className="border-b border-white/5 bg-[hsl(0,0%,4%)] sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-2.5">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="h-8 gap-1.5 text-white/60 hover:text-white hover:bg-white/5 text-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Voltar
            </Button>
            <div className="h-5 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-semibold text-sm text-white">CODIA Studio</span>
            </div>
          </div>
          {projectContext?.name && (
            <div className="text-xs text-white/40">
              Projeto: <span className="text-orange-400">{projectContext.name}</span>
            </div>
          )}
        </div>
      </header>

      <AnimatePresence mode="wait">
        {!selectedTool ? (
          /* Tools Grid */
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-6 max-w-6xl mx-auto"
          >
            {/* Hero */}
            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 mb-4"
              >
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                <span className="text-xs text-orange-300">Ferramentas de IA para Empresas</span>
              </motion.div>
              <motion.h1
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="text-3xl md:text-4xl font-bold text-white mb-3"
              >
                CODIA <span className="text-gradient-orange">Studio</span>
              </motion.h1>
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-white/50 text-sm max-w-lg mx-auto"
              >
                Um estúdio completo de IAs especializadas para criar, estruturar e escalar sua empresa do zero.
              </motion.p>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {aiTools.map((tool, index) => (
                <motion.button
                  key={tool.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  onClick={() => {
                    setSelectedTool(tool);
                    setMessages([]);
                  }}
                  className={`group relative p-5 rounded-2xl bg-gradient-to-br ${tool.gradient} border border-white/5 hover:border-white/10 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
                >
                  {/* Glow effect */}
                  <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-gradient-to-br ${tool.gradient}`} />
                  
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-xl bg-black/40 backdrop-blur-sm flex items-center justify-center mb-4 ${tool.color}`}>
                      <tool.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">{tool.name}</h3>
                    <p className="text-xs text-white/50 leading-relaxed line-clamp-3">{tool.description}</p>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Footer info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10 text-center"
            >
              <p className="text-xs text-white/30">
                Todas as IAs utilizam os dados do seu site para manter consistência e personalização.
              </p>
            </motion.div>
          </motion.div>
        ) : (
          /* Tool Chat Interface */
          <motion.div
            key="chat"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col h-[calc(100vh-49px)]"
          >
            {/* Tool Header */}
            <div className={`px-6 py-4 border-b border-white/5 bg-gradient-to-r ${selectedTool.gradient}`}>
              <div className="max-w-3xl mx-auto flex items-center gap-4">
                <button
                  onClick={() => setSelectedTool(null)}
                  className="w-8 h-8 rounded-lg bg-black/20 hover:bg-black/30 flex items-center justify-center transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 text-white/70" />
                </button>
                <div className={`w-10 h-10 rounded-xl bg-black/30 flex items-center justify-center ${selectedTool.color}`}>
                  <selectedTool.icon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-white">{selectedTool.name}</h2>
                  <p className="text-xs text-white/50">{selectedTool.description}</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-3xl mx-auto space-y-4">
                {messages.length === 0 && (
                  <div className="text-center py-12">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedTool.gradient} flex items-center justify-center mx-auto mb-4 ${selectedTool.color}`}>
                      <selectedTool.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Como posso ajudar com {selectedTool.name}?
                    </h3>
                    <p className="text-sm text-white/40 mb-6">
                      Escolha uma sugestão ou escreva sua própria solicitação
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {selectedTool.examples.map((example) => (
                        <button
                          key={example}
                          onClick={() => handleExampleClick(example)}
                          className={`px-4 py-2 rounded-full text-xs bg-gradient-to-r ${selectedTool.gradient} border border-white/10 hover:border-white/20 text-white/80 hover:text-white transition-all`}
                        >
                          {example}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                        message.role === "user"
                          ? "bg-orange-500 text-white"
                          : `bg-gradient-to-br ${selectedTool.gradient} border border-white/10 text-white/90`
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className={`px-4 py-3 rounded-2xl bg-gradient-to-br ${selectedTool.gradient} border border-white/10`}>
                      <Loader2 className={`w-4 h-4 animate-spin ${selectedTool.color}`} />
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/5">
              <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Pergunte algo para ${selectedTool.name}...`}
                    className="w-full px-4 py-3 pr-12 rounded-xl bg-white/5 border border-white/10 focus:border-orange-500/50 text-white placeholder:text-white/30 text-sm outline-none transition-colors"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    disabled={!input.trim() || isLoading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 p-0 rounded-lg bg-orange-500 hover:bg-orange-600 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CodiaStudio;
