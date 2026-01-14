import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  MessageSquare, 
  Sparkles, 
  Plus, 
  Paperclip, 
  Mic, 
  ArrowUp,
  Lightbulb,
  Briefcase,
  Palette,
  PenTool,
  Globe,
  FileText,
  Code2,
  RotateCcw,
  Store,
  Search,
  Rocket,
  FileEdit,
  Share2,
  Copy,
  ArrowRightLeft,
  Crown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AISidebar from "@/components/AISidebar";
import CreditDisplay from "@/components/CreditDisplay";
import TypingEffect from "@/components/TypingEffect";
import { supabase } from "@/integrations/supabase/client";

const toolInfo: Record<string, { 
  name: string; 
  description: string; 
  icon: React.ElementType;
  placeholder: string;
  tips: string[];
  actions: string[];
}> = {
  "business": { 
    name: "Plano de Negócio", 
    description: "Estruture seu modelo de negócio, valide sua ideia e defina estratégias de crescimento.",
    icon: Briefcase,
    placeholder: "Descreva sua ideia de negócio...",
    tips: ["Comece definindo o problema que você resolve", "Identifique quem são seus clientes ideais", "Pense em como você vai ganhar dinheiro"],
    actions: ["Validar minha ideia de negócio", "Criar modelo de receita", "Definir público-alvo"]
  },
  "branding": { 
    name: "Branding", 
    description: "Defina a identidade visual e verbal da sua marca.",
    icon: Palette,
    placeholder: "Descreva a personalidade da sua marca...",
    tips: ["Defina os valores da sua marca", "Pense no tom de voz ideal", "Escolha cores que representem sua identidade"],
    actions: ["Criar identidade verbal", "Definir paleta de cores", "Criar tom de voz"]
  },
  "logo": { 
    name: "Logo & Visual", 
    description: "Gere logotipos profissionais com IA.",
    icon: PenTool,
    placeholder: "Descreva como você imagina seu logo...",
    tips: ["Seja específico sobre o estilo desejado", "Mencione cores preferidas", "Descreva símbolos ou elementos importantes"],
    actions: ["Gerar logo moderno", "Criar variações", "Exportar em alta resolução"]
  },
  "website": { 
    name: "Website", 
    description: "Crie sites modernos e responsivos.",
    icon: Globe,
    placeholder: "Descreva o site que você quer criar...",
    tips: ["Defina o objetivo principal do site", "Pense nas páginas essenciais", "Considere seu público-alvo"],
    actions: ["Criar landing page", "Site institucional", "E-commerce completo"]
  },
  "copywriter": { 
    name: "Copywriter", 
    description: "Textos persuasivos que convertem.",
    icon: FileText,
    placeholder: "O que você precisa escrever?",
    tips: ["Defina o objetivo do texto", "Conheça seu público", "Inclua um call-to-action claro"],
    actions: ["Escrever headline", "Criar copy de vendas", "Descrição de produto"]
  },
  "dev": { 
    name: "Desenvolvimento", 
    description: "Código e automações avançadas.",
    icon: Code2,
    placeholder: "Descreva a funcionalidade que precisa...",
    tips: ["Seja específico sobre a tecnologia", "Descreva o fluxo esperado", "Mencione integrações necessárias"],
    actions: ["Criar API", "Automatizar processo", "Integrar sistemas"]
  },
  "zap-crm": { 
    name: "Zap Commerce + CRM", 
    description: "Venda pelo WhatsApp com IA.",
    icon: MessageSquare,
    placeholder: "Configure seu atendimento automatizado...",
    tips: ["Defina horários de atendimento", "Crie respostas automáticas", "Configure catálogo de produtos"],
    actions: ["Configurar chatbot", "Criar funil de vendas", "Integrar catálogo"]
  },
  "sales-recovery": { 
    name: "Recuperador de Vendas", 
    description: "Recupere carrinhos abandonados.",
    icon: RotateCcw,
    placeholder: "Configure sua estratégia de recuperação...",
    tips: ["Defina tempo de espera", "Personalize mensagens", "Ofereça incentivos"],
    actions: ["Ativar recuperação", "Criar sequência", "Ver métricas"]
  },
  "marketplace": { 
    name: "Hub Marketplace", 
    description: "Integre com marketplaces.",
    icon: Store,
    placeholder: "Conecte suas lojas em marketplaces...",
    tips: ["Sincronize estoque", "Unifique pedidos", "Automatize preços"],
    actions: ["Conectar Mercado Livre", "Integrar Shopee", "Sincronizar produtos"]
  },
  "seo": { 
    name: "SEO Programático", 
    description: "Otimize para buscadores automaticamente.",
    icon: Search,
    placeholder: "Defina suas palavras-chave principais...",
    tips: ["Pesquise termos relevantes", "Analise concorrência", "Crie conteúdo otimizado"],
    actions: ["Analisar SEO atual", "Gerar páginas otimizadas", "Criar meta tags"]
  },
  "growth": { 
    name: "Growth Engine", 
    description: "Análises e sugestões de crescimento.",
    icon: Rocket,
    placeholder: "Qual é sua meta de crescimento?",
    tips: ["Defina métricas-chave", "Analise funis", "Teste hipóteses"],
    actions: ["Analisar métricas", "Criar experimento", "Ver oportunidades"]
  },
  "copy-thief": { 
    name: "Ladrão de Copy", 
    description: "Analise copies da concorrência.",
    icon: FileEdit,
    placeholder: "Cole a URL ou texto para analisar...",
    tips: ["Estude os melhores", "Identifique padrões", "Adapte para seu contexto"],
    actions: ["Analisar landing page", "Extrair estrutura", "Gerar versão própria"]
  },
  "social-media": { 
    name: "Gerador Social", 
    description: "Crie conteúdo para redes sociais.",
    icon: Share2,
    placeholder: "Qual conteúdo você quer criar?",
    tips: ["Defina a plataforma", "Considere seu público", "Use formatos que engajam"],
    actions: ["Post para Instagram", "Carrossel educativo", "Vídeo para Reels"]
  },
  "site-cloner": { 
    name: "Clonador de Site", 
    description: "Clone estruturas de sites.",
    icon: Copy,
    placeholder: "Cole a URL do site para clonar...",
    tips: ["Escolha referências de qualidade", "Adapte para sua marca", "Mantenha a originalidade"],
    actions: ["Clonar estrutura", "Extrair design", "Gerar versão própria"]
  },
  "migrator": { 
    name: "Migrador Universal", 
    description: "Migre de outras plataformas.",
    icon: ArrowRightLeft,
    placeholder: "De qual plataforma você está migrando?",
    tips: ["Faça backup dos dados", "Mapeie campos", "Teste a migração"],
    actions: ["Migrar do Wix", "Importar do Shopify", "Transferir dados"]
  },
};

const ToolPage = () => {
  const { toolId } = useParams();
  const navigate = useNavigate();
  const [selectedTool, setSelectedTool] = useState(toolId || "business");
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("você");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email) {
        setUserName(data.user.email.split("@")[0]);
      }
    });
  }, []);

  useEffect(() => {
    if (toolId && toolId !== selectedTool) {
      setSelectedTool(toolId);
    }
  }, [toolId]);

  const tool = toolInfo[selectedTool] || toolInfo["business"];
  const ToolIcon = tool.icon;

  const handleToolChange = (newToolId: string) => {
    setSelectedTool(newToolId);
    navigate(`/tools/${newToolId}`, { replace: true });
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    // Handle message send
    setMessage("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header - Clean minimal */}
      <header className="h-14 border-b border-border flex items-center px-4 gap-4 bg-background shrink-0">
        <button
          onClick={() => navigate("/builder")}
          className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar</span>
        </button>
        
        <button
          className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-primary/10 text-primary"
        >
          <ToolIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Ferramentas</span>
        </button>

        <div className="flex-1" />
        
        <CreditDisplay compact />
        
        <div className="text-sm text-muted-foreground hidden md:block">
          Ferramenta: <span className="text-primary font-medium">{tool.name}</span>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <AISidebar 
          selectedTool={selectedTool}
          onSelectTool={handleToolChange}
          onGoHome={() => navigate("/builder")}
          userName={userName}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Content Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-3xl mx-auto px-6 py-12">
              {/* Greeting */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
              >
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  Olá, <span className="text-primary">{userName}!</span>
                </h1>
                <p className="text-muted-foreground">
                  Peça para a Codia criar{" "}
                  <TypingEffect 
                    texts={[`um ${tool.name.toLowerCase()}`, "algo incrível", "sua visão"]}
                    className="text-primary"
                  />
                </p>
              </motion.div>

              {/* Tool Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 mb-8"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <ToolIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-1">{tool.name}</h2>
                    <p className="text-muted-foreground text-sm">{tool.description}</p>
                  </div>
                </div>

                {/* Quick Actions - Softer buttons */}
                <div className="flex flex-wrap gap-2">
                  {tool.actions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => setMessage(action)}
                      className="px-4 py-2.5 rounded-xl border border-border bg-secondary/30 hover:bg-secondary/60 text-sm text-foreground transition-all hover:border-primary/30"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Tips Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Dicas para melhores resultados</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {tool.tips.map((tip, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-card border border-border text-sm text-muted-foreground"
                    >
                      {tip}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Input Area - Fixed at bottom */}
          <div className="border-t border-border bg-background p-4">
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-card border border-border focus-within:border-primary/40 transition-colors">
                  <button className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                    <Plus className="w-5 h-5" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder={tool.placeholder}
                    className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none text-sm"
                  />
                  
                  <button className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                    <Mic className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="p-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-all glow-primary"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <p className="text-center text-[11px] text-muted-foreground/60 mt-3">
                Codia pode cometer erros. Verifique informações importantes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolPage;