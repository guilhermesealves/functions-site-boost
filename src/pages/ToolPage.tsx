import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, MessageSquare, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const toolInfo: Record<string, { name: string; description: string; locked?: boolean; tier?: string }> = {
  "business": { name: "Plano de Negócio", description: "Crie um canvas estratégico para validar sua ideia de negócio" },
  "branding": { name: "Branding", description: "Defina a identidade visual e verbal da sua marca" },
  "logo": { name: "Logo & Visual", description: "Gere logotipos profissionais com IA" },
  "website": { name: "Website", description: "Crie sites modernos e responsivos" },
  "copywriter": { name: "Copywriter", description: "Textos persuasivos que convertem" },
  "development": { name: "Desenvolvimento", description: "Código e automações avançadas", locked: true, tier: "Pro" },
  "zap-commerce": { name: "Zap Commerce + CRM", description: "Venda pelo WhatsApp com IA", locked: true, tier: "Pro" },
  "sales-recovery": { name: "Recuperador de Vendas", description: "Recupere carrinhos abandonados", locked: true, tier: "Pro" },
  "marketplace": { name: "Hub Marketplace", description: "Integre com marketplaces", locked: true, tier: "Business" },
  "seo": { name: "SEO Programático", description: "Otimize para buscadores automaticamente", locked: true, tier: "Pro" },
  "growth": { name: "Growth Engine", description: "Análises e sugestões de crescimento", locked: true, tier: "Pro" },
  "copy-thief": { name: "Ladrão de Copy", description: "Analise copies da concorrência", locked: true, tier: "Pro" },
  "social": { name: "Gerador Social", description: "Crie conteúdo para redes sociais", locked: true, tier: "Pro" },
  "cloner": { name: "Clonador de Site", description: "Clone estruturas de sites", locked: true, tier: "Pro" },
  "migrator": { name: "Migrador", description: "Migre de outras plataformas", locked: true, tier: "Pro" },
};

const ToolPage = () => {
  const { toolId } = useParams();
  const navigate = useNavigate();
  const tool = toolInfo[toolId || ""] || { name: "Ferramenta", description: "Em construção" };

  if (tool.locked) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">{tool.name}</h1>
          <p className="text-muted-foreground mb-6">{tool.description}</p>
          <div className="p-4 rounded-xl bg-card border border-border mb-6">
            <p className="text-sm text-muted-foreground">
              Esta ferramenta requer o plano <span className="text-primary font-semibold">{tool.tier}</span>
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Button 
              onClick={() => navigate("/pricing")}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Ver Planos
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate("/builder")}
              className="w-full gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao Dashboard
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Chat Side */}
      <div className="w-2/5 border-r border-border p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/builder")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">{tool.name}</h1>
            <p className="text-sm text-muted-foreground">{tool.description}</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
            <MessageSquare className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Chat com IA</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Descreva o que você quer criar e a IA vai ajudar
          </p>
          <div className="w-full max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder={`Descreva o que você quer...`}
                className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40"
              />
              <Button 
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary hover:bg-primary/90"
              >
                <Sparkles className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Side */}
      <div className="flex-1 p-6 bg-muted/20">
        <div className="h-full rounded-2xl border border-border bg-card flex items-center justify-center">
          <div className="text-center">
            <Sparkles className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">O preview aparecerá aqui</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolPage;
