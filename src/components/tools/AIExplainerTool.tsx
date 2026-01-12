import { useState } from "react";
import { HelpCircle, Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

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

const AIExplainerTool = ({ onSendMessage }: AIExplainerToolProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Olá! 👋 Sou a IA Explicadora. Posso te ajudar a entender qualquer ferramenta ou termo do painel. O que você gostaria de saber?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

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

    // Simulate AI response
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
    }, 1500);
  };

  const handleAskMain = () => {
    if (onSendMessage) {
      onSendMessage(messages[messages.length - 2]?.content || "Preciso de ajuda");
    }
    toast.success("Pergunta enviada ao assistente principal!");
  };

  return (
    <div className="flex flex-col h-[500px]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              message.role === "user" 
                ? "bg-primary" 
                : "bg-white/[0.06]"
            }`}>
              {message.role === "user" ? (
                <User className="w-4 h-4 text-white" />
              ) : (
                <Bot className="w-4 h-4 text-primary" />
              )}
            </div>
            <div className={`max-w-[80%] p-3 rounded-xl ${
              message.role === "user"
                ? "bg-primary text-white"
                : "bg-white/[0.04] border border-white/[0.06] text-white/80"
            }`}>
              <p className="text-sm whitespace-pre-line">{message.content}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div className="bg-white/[0.04] border border-white/[0.06] p-3 rounded-xl">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Questions */}
      <div className="mb-3">
        <p className="text-xs text-white/40 mb-2">Perguntas frequentes:</p>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.slice(0, 3).map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="px-3 py-1.5 text-xs rounded-full bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08] transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
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
          className="bg-primary hover:bg-primary/90"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default AIExplainerTool;
