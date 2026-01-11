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
  Plus,
  Code2,
  Trash2
} from "lucide-react";
import PreviewPanel from "./PreviewPanel";
import DevSummary from "./DevSummary";
import TypingEffect from "./TypingEffect";
import ChatMessage from "./ChatMessage";

interface Message {
  role: "user" | "assistant";
  content: string;
  imageUrl?: string;
  toolOrigin?: string; // De qual ferramenta veio (para conectar com dev)
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
  hasPreview: boolean; // Define se a ferramenta tem preview
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
    ],
    hasPreview: false
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
    ],
    hasPreview: false
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
    ],
    hasPreview: true
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
    ],
    hasPreview: true
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
    ],
    hasPreview: false
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
    ],
    hasPreview: false
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
    ],
    hasPreview: false
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
    ],
    hasPreview: false
  },
  dev: {
    id: "dev",
    name: "Desenvolvimento",
    description: "Código profissional, soluções técnicas e arquitetura de sistemas.",
    icon: Code2,
    placeholder: "O que você precisa desenvolver?",
    examples: ["Componente React", "API REST", "Função TypeScript"],
    tips: [
      "Seja específico sobre tecnologias",
      "Descreva o problema que quer resolver",
      "Mencione restrições e requisitos"
    ],
    typingTexts: [
      "um componente React moderno...",
      "uma API REST completa...",
      "uma função TypeScript...",
      "uma integração com API..."
    ],
    hasPreview: false
  }
};

import { Template } from "./templates/TemplatesData";
import AcademiaComplete from "./templates/sites/AcademiaComplete";
import PsicologoComplete from "./templates/sites/PsicologoComplete";
import YogaComplete from "./templates/sites/YogaComplete";
import RestauranteComplete from "./templates/sites/RestauranteComplete";
import CafeteriaComplete from "./templates/sites/CafeteriaComplete";
import PizzariaComplete from "./templates/sites/PizzariaComplete";
import PsicologoCinematic from "./templates/sites/PsicologoCinematic";

interface UnifiedChatProps {
  selectedTool: string;
  onSendMessage?: (message: string, toolId: string) => Promise<string>;
  userName?: string;
  onToolChange?: (toolId: string) => void;
  activeTemplate?: Template | null;
}

const STORAGE_KEY = "codia_chat_history";

const UnifiedChat = ({ selectedTool, onSendMessage, userName = "você", onToolChange, activeTemplate }: UnifiedChatProps) => {
  const [input, setInput] = useState("");
  const [messagesPerTool, setMessagesPerTool] = useState<Record<string, Message[]>>(() => {
    // Carregar do localStorage ao iniciar
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showTips, setShowTips] = useState(true);
  const [previewContent, setPreviewContent] = useState<string>(activeTemplate?.previewHtml || "");
  const [streamingContent, setStreamingContent] = useState("");
  const [showReactComponent, setShowReactComponent] = useState(false);

  // Mapeamento de componentes React
  const reactComponents: Record<string, React.ComponentType> = {
    "AcademiaComplete": AcademiaComplete,
    "PsicologoComplete": PsicologoComplete,
    "YogaComplete": YogaComplete,
    "RestauranteComplete": RestauranteComplete,
    "CafeteriaComplete": CafeteriaComplete,
    "PizzariaComplete": PizzariaComplete,
    "PsicologoCinematic": PsicologoCinematic
  };
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const tool = toolsConfig[selectedTool] || toolsConfig.business;
  const messages = messagesPerTool[selectedTool] || [];

  // Load template preview when activeTemplate changes
  useEffect(() => {
    if (activeTemplate?.previewHtml) {
      // Verifica se é um componente React
      if (activeTemplate.previewHtml.startsWith("REACT_COMPONENT:")) {
        setShowReactComponent(true);
      } else {
        setShowReactComponent(false);
        setPreviewContent(activeTemplate.previewHtml);
      }
    }
  }, [activeTemplate]);

  // Salvar no localStorage sempre que mensagens mudarem
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messagesPerTool));
    } catch (e) {
      console.error("Erro ao salvar histórico:", e);
    }
  }, [messagesPerTool]);


  // Helper to update messages for current tool
  const setMessages = (updater: Message[] | ((prev: Message[]) => Message[])) => {
    setMessagesPerTool(prev => ({
      ...prev,
      [selectedTool]: typeof updater === 'function' ? updater(prev[selectedTool] || []) : updater
    }));
  };

  // Adicionar mensagem ao Desenvolvimento (conectar ferramentas)
  const addToDevHistory = (message: Message, fromTool: string) => {
    const devMessage: Message = {
      ...message,
      toolOrigin: fromTool,
      content: `📁 **Criado em ${toolsConfig[fromTool]?.name || fromTool}**\n\n${message.content}`
    };
    setMessagesPerTool(prev => ({
      ...prev,
      dev: [...(prev.dev || []), devMessage]
    }));
  };

  // Detectar qual IA usar baseado no conteúdo do prompt
  const detectToolFromPrompt = (text: string): string | null => {
    const lowerText = text.toLowerCase();
    
    // Keywords para cada ferramenta
    const toolKeywords: Record<string, string[]> = {
      logo: ["logo", "logotipo", "logomarca", "marca visual", "identidade visual", "criar logo", "design de logo"],
      website: ["site", "website", "landing page", "página web", "loja virtual", "ecommerce", "e-commerce", "portfólio", "portfolio"],
      branding: ["branding", "marca", "identidade", "tom de voz", "posicionamento"],
      copywriter: ["copy", "texto", "redação", "bio", "headline", "título", "descrição", "slogan"],
      marketing: ["marketing", "campanha", "funil", "anúncio", "ads", "instagram", "facebook", "tráfego"],
      sales: ["vendas", "vender", "script", "objeção", "follow-up", "pitch", "conversão"],
      business: ["negócio", "empresa", "startup", "plano de negócio", "modelo de negócio", "receita"],
      dev: ["código", "programar", "desenvolver", "api", "função", "componente", "react", "typescript"]
    };

    for (const [tool, keywords] of Object.entries(toolKeywords)) {
      for (const keyword of keywords) {
        if (lowerText.includes(keyword)) {
          return tool;
        }
      }
    }

    return null;
  };

  // Limpar conversa da ferramenta atual
  const handleClearChat = () => {
    setMessagesPerTool(prev => ({
      ...prev,
      [selectedTool]: []
    }));
    setShowTips(true);
    setPreviewContent("");
    setStreamingContent("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingContent]);

  useEffect(() => {
    // Atualiza dicas quando muda de ferramenta
    setShowTips(messages.length === 0);
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

  const handleLogoGeneration = async (userMessage: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-logo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          prompt: userMessage,
          style: "modern"
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao gerar logo");
      }

      const data = await response.json();
      return data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
      throw new Error(errorMessage);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    
    // Detectar e mudar para a IA correspondente se necessário
    const detectedTool = detectToolFromPrompt(userMessage);
    if (detectedTool && detectedTool !== selectedTool && onToolChange) {
      onToolChange(detectedTool);
      // Pequeno delay para garantir que a mudança de ferramenta seja processada
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    const currentTool = detectedTool || selectedTool;
    
    setInput("");
    setShowTips(false);
    setMessagesPerTool(prev => ({
      ...prev,
      [currentTool]: [...(prev[currentTool] || []), { role: "user", content: userMessage }]
    }));
    setIsLoading(true);

    try {
      // Logo tool - generate image directly
      if (currentTool === "logo") {
        const logoData = await handleLogoGeneration(userMessage);
        const logoMessage: Message = { 
          role: "assistant", 
          content: `✨ **Logo Gerada com Sucesso!**\n\nSua logo foi criada com base no conceito: "${userMessage}"`,
          imageUrl: logoData.imageUrl
        };
        setMessagesPerTool(prev => ({
          ...prev,
          [currentTool]: [...(prev[currentTool] || []), logoMessage]
        }));
        setPreviewContent(logoData.imageUrl);
        // Salvar no Desenvolvimento
        addToDevHistory(logoMessage, "logo");
      } 
      // Website tool - use generator
      else if (currentTool === "website" && onSendMessage) {
        const response = await onSendMessage(userMessage, currentTool);
        
        // Extrair apenas o HTML do response para o preview
        const htmlMatch = response.match(/```html([\s\S]*?)```/i);
        const htmlContent = htmlMatch ? htmlMatch[1].trim() : response;
        
        // Mensagem amigável para o chat
        const chatMessage = `✅ **Site gerado com sucesso!**\n\nSeu site foi criado com base na descrição: "${userMessage}"\n\nConfira o preview ao lado para visualizar o resultado.`;
        
        const websiteMessage: Message = { role: "assistant", content: chatMessage };
        setMessagesPerTool(prev => ({
          ...prev,
          [currentTool]: [...(prev[currentTool] || []), websiteMessage]
        }));
        // Só passa o HTML limpo para o preview
        setPreviewContent(htmlContent);
        // Salvar no Desenvolvimento
        addToDevHistory(websiteMessage, "website");
      }
      // Other tools - use streaming AI
      else {
        const response = await handleStreamingAI(userMessage);
        setMessagesPerTool(prev => ({
          ...prev,
          [currentTool]: [...(prev[currentTool] || []), { role: "assistant", content: response }]
        }));
        setPreviewContent(response);
      }
      
      setStreamingContent("");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: `❌ Desculpe, ocorreu um erro: ${errorMessage}` 
      }]);
      setStreamingContent("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (example: string) => {
    setInput(example);
  };

  // Se for a aba de Desenvolvimento, mostrar o resumo em vez do chat
  if (selectedTool === "dev") {
    return <DevSummary userName={userName} />;
  }

  // Layout para ferramentas visuais (chat menor, preview maior)
  const isVisualTool = tool.hasPreview;

  return (
    <div className="flex-1 flex h-[calc(100vh-56px)]">
      {/* Chat Area */}
      <div className={`flex flex-col bg-[hsl(0,0%,5%)] ${
        isVisualTool ? "w-[35%] min-w-[320px] max-w-[480px]" : "flex-1"
      }`}>
        <div className="flex-1 overflow-y-auto">
          <div className={`mx-auto px-4 py-6 ${isVisualTool ? "max-w-full" : "max-w-3xl px-6 py-8"}`}>
            <AnimatePresence mode="wait">
              {messages.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`flex flex-col items-center justify-center ${isVisualTool ? "min-h-[30vh] pt-4" : "min-h-[50vh] pt-8"}`}
                >
                  {/* Welcome */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center mb-6"
                  >
                    <h1 className={`font-bold text-white mb-2 ${isVisualTool ? "text-xl" : "text-2xl md:text-3xl mb-3"}`}>
                      Olá, {userName}!
                    </h1>
                    <p className={`text-white/50 ${isVisualTool ? "text-sm" : "text-base"}`}>
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
                    className={`w-full bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 mb-4 ${isVisualTool ? "" : "max-w-xl p-5 mb-6"}`}
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <div className={`rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 ${isVisualTool ? "w-10 h-10" : "w-12 h-12"}`}>
                        <tool.icon className={`text-orange-400 ${isVisualTool ? "w-5 h-5" : "w-6 h-6"}`} />
                      </div>
                      <div>
                        <h2 className={`font-semibold text-white mb-1 ${isVisualTool ? "text-base" : "text-lg"}`}>{tool.name}</h2>
                        <p className={`text-white/40 ${isVisualTool ? "text-xs" : "text-sm"}`}>{tool.description}</p>
                      </div>
                    </div>

                    {/* Examples */}
                    <div className="flex flex-wrap gap-2">
                      {tool.examples.map((example) => (
                        <button
                          key={example}
                          onClick={() => handleExampleClick(example)}
                          className={`bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.12] rounded-xl text-white/60 hover:text-white transition-all ${isVisualTool ? "px-2 py-1.5 text-xs" : "px-3 py-2 text-sm"}`}
                        >
                          {example}
                        </button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Tips - Hide for visual tools to save space */}
                  {showTips && !isVisualTool && (
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
                  className={`space-y-4 ${isVisualTool ? "py-4" : "space-y-5 py-6"}`}
                >
                  {messages.map((message, index) => (
                    <ChatMessage
                      key={index}
                      content={message.content}
                      role={message.role}
                      userName={userName}
                      imageUrl={message.imageUrl}
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
                      <div className={`rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shrink-0 ${isVisualTool ? "w-8 h-8" : "w-9 h-9"}`}>
                        <Sparkles className={`text-white ${isVisualTool ? "w-3.5 h-3.5" : "w-4 h-4"}`} />
                      </div>
                      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                            <div className="w-2 h-2 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                            <div className="w-2 h-2 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                          </div>
                          <span className={`text-white/40 ${isVisualTool ? "text-xs" : "text-sm"}`}>Codia está pensando...</span>
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
          <div className={`mx-auto px-4 py-3 ${isVisualTool ? "" : "max-w-3xl px-6 py-4"}`}>
            {/* Clear chat button - show only when there are messages */}
            {messages.length > 0 && (
              <div className="flex justify-end mb-2">
                <button
                  type="button"
                  onClick={handleClearChat}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Limpar
                </button>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className={`relative flex items-center bg-[hsl(0,0%,8%)] border border-white/[0.08] focus-within:border-orange-500/30 focus-within:ring-4 focus-within:ring-orange-500/5 transition-all ${isVisualTool ? "rounded-xl" : "rounded-2xl"}`}>
                {/* Left buttons */}
                <div className="flex items-center pl-2">
                  <button
                    type="button"
                    className="p-2 text-white/30 hover:text-white/50 rounded-lg hover:bg-white/[0.04] transition-colors"
                  >
                    <Plus className={isVisualTool ? "w-4 h-4" : "w-5 h-5"} />
                  </button>
                  {!isVisualTool && (
                    <button
                      type="button"
                      className="p-2 text-white/30 hover:text-white/50 rounded-lg hover:bg-white/[0.04] transition-colors"
                    >
                      <Paperclip className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={tool.placeholder}
                  className={`flex-1 bg-transparent text-white placeholder:text-white/30 outline-none ${isVisualTool ? "py-2.5 px-2 text-sm" : "py-3.5 px-3 text-sm"}`}
                  disabled={isLoading}
                />

                {/* Right buttons */}
                <div className="flex items-center gap-1 pr-2">
                  {!isVisualTool && (
                    <button
                      type="button"
                      className="p-2 text-white/30 hover:text-white/50 rounded-lg hover:bg-white/[0.04] transition-colors"
                    >
                      <Mic className="w-5 h-5" />
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className={`rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-30 disabled:hover:from-orange-500 disabled:hover:to-orange-600 flex items-center justify-center transition-all shadow-lg shadow-orange-500/20 ${isVisualTool ? "w-8 h-8" : "w-10 h-10"}`}
                  >
                    <ArrowUp className={isVisualTool ? "w-4 h-4 text-white" : "w-5 h-5 text-white"} />
                  </button>
                </div>
              </div>
            </form>

            <p className={`text-center text-white/20 mt-2 ${isVisualTool ? "text-[9px]" : "text-[10px] mt-3"}`}>
              Codia pode cometer erros. Verifique informações importantes.
            </p>
          </div>
        </div>
      </div>

      {/* Preview Panel - Only for visual tools (larger now) */}
      {tool.hasPreview && (
        <div className="flex-1 border-l border-white/[0.06]">
          <PreviewPanel 
            content={previewContent || streamingContent}
            type={selectedTool as any}
            isLoading={isLoading}
            reactComponent={
              showReactComponent && activeTemplate?.previewHtml
                ? reactComponents[activeTemplate.previewHtml.replace("REACT_COMPONENT:", "")]
                : null
            }
          />
        </div>
      )}
    </div>
  );
};

export default UnifiedChat;
