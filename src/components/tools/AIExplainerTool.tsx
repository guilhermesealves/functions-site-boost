import { useState } from "react";
import { HelpCircle, Send, Bot, User, Sparkles, Book, CheckCircle2, MessageSquare, Lightbulb, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface AIExplainerToolProps {
  onSendMessage?: (message: string) => void;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const quickQuestions = [
  "O que é SEO e por que é importante?",
  "Como funciona o Clonador de Site?",
  "Para que serve o CRM do WhatsApp?",
  "Como aumentar minhas vendas?",
  "O que são CTAs?",
  "Como aparecer no Google?",
];

const helpTopics = [
  { icon: Book, title: "Primeiros Passos", description: "Como começar seu projeto", count: 5 },
  { icon: Sparkles, title: "Ferramentas", description: "Como usar cada ferramenta", count: 12 },
  { icon: MessageSquare, title: "Marketing", description: "Dicas de marketing digital", count: 8 },
  { icon: Lightbulb, title: "Dicas Avançadas", description: "Recursos para experts", count: 6 },
];

const AIExplainerTool = ({ onSendMessage }: AIExplainerToolProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Olá! 👋 Sou a IA Explicadora. Posso te ajudar a entender qualquer ferramenta ou termo do painel. O que você gostaria de saber?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [resolvedQuestions, setResolvedQuestions] = useState(1);

  const handleSend = (question?: string) => {
    const text = question || input;
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };

    setMessages([...messages, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let response = "";

      if (text.toLowerCase().includes("seo")) {
        response = "**SEO (Search Engine Optimization)** é um conjunto de técnicas para fazer seu site aparecer nos primeiros resultados do Google.\n\n📌 **Por que é importante?**\n- Traz visitantes gratuitamente\n- Aumenta sua credibilidade\n- Funciona 24 horas por dia\n\n💡 **Dica:** Use a ferramenta SEO Programático para criar páginas otimizadas automaticamente!";
      } else if (text.toLowerCase().includes("clonador")) {
        response = "O **Clonador de Site** analisa a estrutura visual de sites que você admira e cria uma versão original inspirada neles.\n\n📌 **Como funciona:**\n1. Cole a URL do site de referência\n2. A IA analisa layout, cores e seções\n3. Gera uma versão adaptada para seu negócio\n\n⚠️ Nunca copiamos conteúdo, apenas nos inspiramos na estrutura!";
      } else if (text.toLowerCase().includes("crm") || text.toLowerCase().includes("whatsapp")) {
        response = "O **Zap E-commerce + CRM** transforma seu WhatsApp em uma ferramenta profissional de vendas.\n\n📌 **Funcionalidades:**\n- Botão de WhatsApp no site\n- Mensagens automáticas\n- Lista organizada de clientes\n- Status: Novo → Em conversa → Cliente\n\n💡 Isso ajuda você a não perder nenhuma oportunidade de venda!";
      } else if (text.toLowerCase().includes("vendas") || text.toLowerCase().includes("vender")) {
        response = "Para **aumentar suas vendas**, siga estes passos:\n\n1️⃣ **Tenha um CTA claro** - Botão visível de ação\n2️⃣ **Use prova social** - Depoimentos de clientes\n3️⃣ **WhatsApp acessível** - Facilite o contato\n4️⃣ **Textos persuasivos** - Use o Ladrão de Copy\n5️⃣ **Recupere abandonos** - Recuperador de Vendas\n\n💡 Use o Growth Engine para análise personalizada!";
      } else if (text.toLowerCase().includes("cta")) {
        response = "**CTA (Call to Action)** é um botão ou texto que convida o visitante a tomar uma ação.\n\n📌 **Exemplos de CTAs:**\n- \"Fale Conosco\"\n- \"Comprar Agora\"\n- \"Solicitar Orçamento\"\n- \"Quero Saber Mais\"\n\n💡 **Dica:** Um bom CTA é curto, direto e usa verbos de ação!";
      } else if (text.toLowerCase().includes("google") || text.toLowerCase().includes("aparecer")) {
        response = "Para **aparecer no Google**, você precisa:\n\n1️⃣ **SEO bem feito** - Títulos e descrições otimizados\n2️⃣ **Conteúdo relevante** - Textos sobre seu negócio\n3️⃣ **Site rápido** - Carregamento em menos de 3 segundos\n4️⃣ **Mobile friendly** - Funcionar bem no celular\n5️⃣ **Múltiplas páginas** - Uma para cada serviço\n\n💡 Use o SEO Programático para automatizar isso!";
      } else {
        response = `Entendi sua dúvida sobre "${text}".\n\nPara uma resposta mais completa e personalizada, posso enviar essa pergunta para nosso assistente principal. Deseja que eu faça isso?`;
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
      setResolvedQuestions(prev => prev + 1);
    }, 1500);
  };

  const handleAskMain = () => {
    if (onSendMessage) {
      onSendMessage(messages[messages.length - 2]?.content || "Preciso de ajuda");
    }
    toast.success("Pergunta enviada ao assistente principal!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-white/[0.06]">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center">
          <HelpCircle className="w-5 h-5 text-violet-400" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Assistente de Explicação</h2>
          <p className="text-xs text-white/50">Tire suas dúvidas sobre o painel</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-4 bg-white/[0.02] border border-white/[0.06] p-1 rounded-xl">
          <TabsTrigger value="overview" className="text-xs data-[state=active]:bg-violet-500/20 data-[state=active]:text-violet-400 rounded-lg">
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="help" className="text-xs data-[state=active]:bg-violet-500/20 data-[state=active]:text-violet-400 rounded-lg">
            Ajuda
          </TabsTrigger>
          <TabsTrigger value="chat" className="text-xs data-[state=active]:bg-violet-500/20 data-[state=active]:text-violet-400 rounded-lg">
            Passo a Passo
          </TabsTrigger>
          <TabsTrigger value="support" className="text-xs data-[state=active]:bg-violet-500/20 data-[state=active]:text-violet-400 rounded-lg">
            Suporte
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-violet-500/10 to-violet-500/5 border border-violet-500/20">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-violet-400" />
                <span className="text-xs text-violet-400">Resolvidas</span>
              </div>
              <p className="text-2xl font-bold text-white">{resolvedQuestions}</p>
              <p className="text-xs text-white/40 mt-1">dúvidas</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Book className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-blue-400">Artigos</span>
              </div>
              <p className="text-2xl font-bold text-white">31</p>
              <p className="text-xs text-white/40 mt-1">disponíveis</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-emerald-400">Taxa</span>
              </div>
              <p className="text-2xl font-bold text-white">98%</p>
              <p className="text-xs text-white/40 mt-1">satisfação</p>
            </div>
          </div>

          {/* Help Topics */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white">Tópicos de Ajuda</h4>
            <div className="grid grid-cols-2 gap-3">
              {helpTopics.map((topic, index) => (
                <motion.div
                  key={topic.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-violet-500/30 cursor-pointer transition-colors"
                  onClick={() => setActiveTab("help")}
                >
                  <topic.icon className="w-6 h-6 text-violet-400 mb-2" />
                  <p className="text-sm font-medium text-white">{topic.title}</p>
                  <p className="text-xs text-white/40 mt-1">{topic.description}</p>
                  <p className="text-xs text-violet-400 mt-2">{topic.count} artigos</p>
                </motion.div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="help" className="mt-6 space-y-4">
          {/* Quick Questions */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white">Perguntas Frequentes</h4>
            <AnimatePresence>
              {quickQuestions.map((question, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => { handleSend(question); setActiveTab("chat"); }}
                  className="w-full p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-violet-500/30 text-left transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-violet-400" />
                    <span className="text-sm text-white/80">{question}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-violet-400 transition-colors" />
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </TabsContent>

        <TabsContent value="chat" className="mt-6">
          <div className="flex flex-col h-[400px]">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      message.role === "user" 
                        ? "bg-primary" 
                        : "bg-gradient-to-br from-violet-500/20 to-purple-500/20"
                    }`}>
                      {message.role === "user" ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-violet-400" />
                      )}
                    </div>
                    <div className={`max-w-[80%] p-4 rounded-xl ${
                      message.role === "user"
                        ? "bg-primary text-white"
                        : "bg-white/[0.04] border border-white/[0.06] text-white/80"
                    }`}>
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-violet-400" />
                  </div>
                  <div className="bg-white/[0.04] border border-white/[0.06] p-4 rounded-xl">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                      <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Digite sua dúvida..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="bg-white/[0.04] border-white/[0.08] text-white"
              />
              <Button
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-r from-violet-500 to-purple-500 hover:opacity-90"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="support" className="mt-6 space-y-4">
          <div className="p-6 rounded-xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20 text-center">
            <MessageSquare className="w-12 h-12 text-violet-400 mx-auto mb-3" />
            <h4 className="text-lg font-semibold text-white">Precisa de mais ajuda?</h4>
            <p className="text-sm text-white/50 mt-2 max-w-sm mx-auto">
              Se sua dúvida não foi respondida, envie para o assistente principal
            </p>
            <Button
              onClick={handleAskMain}
              className="mt-4 bg-gradient-to-r from-violet-500 to-purple-500 hover:opacity-90"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Falar com Assistente Principal
            </Button>
          </div>

          {/* Resolved Stats */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h4 className="text-sm font-semibold text-white mb-3">Histórico de Interações</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-white/[0.03] rounded-lg">
                <span className="text-sm text-white/60">Dúvidas resolvidas</span>
                <span className="text-sm font-medium text-emerald-400">{resolvedQuestions}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/[0.03] rounded-lg">
                <span className="text-sm text-white/60">Taxa de resolução</span>
                <span className="text-sm font-medium text-emerald-400">98%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/[0.03] rounded-lg">
                <span className="text-sm text-white/60">Tempo médio de resposta</span>
                <span className="text-sm font-medium text-white">~2s</span>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIExplainerTool;
