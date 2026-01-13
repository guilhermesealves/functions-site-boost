import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCredits } from "@/hooks/useCredits";
import { useUserRole } from "@/hooks/useUserRole";
import SiteClonerTool from "./SiteClonerTool";
import ZapCRMTool from "./ZapCRMTool";
import SEOTool from "./SEOTool";
import GrowthEngineTool from "./GrowthEngineTool";
import MigratorTool from "./MigratorTool";
import CopyThiefTool from "./CopyThiefTool";
import MarketplaceTool from "./MarketplaceTool";
import GitHubSyncTool from "./GitHubSyncTool";
import SalesRecoveryTool from "./SalesRecoveryTool";
import SocialMediaTool from "./SocialMediaTool";
import ChecklistTool from "./ChecklistTool";
import AIExplainerTool from "./AIExplainerTool";

interface ToolsPanelProps {
  selectedTool: string;
  onClose: () => void;
  onSendMessage?: (message: string) => void;
}

// Tool config with required plan
const toolsConfig: Record<string, { title: string; description: string; icon: string; plan: "starter" | "pro" | "enterprise" }> = {
  "site-cloner": { 
    title: "Clonador de Site", 
    description: "Crie sites inspirados em referências visuais", 
    icon: "🌐",
    plan: "pro"
  },
  "zap-crm": { 
    title: "Zap E-commerce + CRM", 
    description: "Vendas e atendimento via WhatsApp", 
    icon: "💬",
    plan: "pro"
  },
  "seo": { 
    title: "SEO Programático", 
    description: "Apareça no Google automaticamente", 
    icon: "🔍",
    plan: "pro"
  },
  "growth": { 
    title: "Growth Engine", 
    description: "Ações para crescer suas vendas", 
    icon: "🚀",
    plan: "pro"
  },
  "migrator": { 
    title: "Migrador Universal", 
    description: "Migre de outras plataformas", 
    icon: "🔄",
    plan: "pro"
  },
  "copy-thief": { 
    title: "Ladrão de Copy", 
    description: "Textos persuasivos de referência", 
    icon: "✍️",
    plan: "pro"
  },
  "marketplace": { 
    title: "Hub Marketplace", 
    description: "Centralize ofertas e parceiros", 
    icon: "🏪",
    plan: "enterprise"
  },
  "github-sync": { 
    title: "Sync GitHub", 
    description: "Versionamento do projeto", 
    icon: "📂",
    plan: "pro"
  },
  "sales-recovery": { 
    title: "Recuperador de Vendas", 
    description: "Recupere oportunidades perdidas", 
    icon: "💰",
    plan: "pro"
  },
  "social-media": { 
    title: "Gerador Social Media", 
    description: "Conteúdo para redes sociais", 
    icon: "📱",
    plan: "pro"
  },
  "checklist": { 
    title: "Checklist de Status", 
    description: "Progresso do seu site", 
    icon: "✅",
    plan: "starter"
  },
  "ai-explainer": { 
    title: "IA Explicadora", 
    description: "Tire dúvidas facilmente", 
    icon: "🤖",
    plan: "starter"
  },
};

const planBadges = {
  starter: { label: "Free", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  pro: { label: "Pro", color: "bg-primary/20 text-primary border-primary/30" },
  enterprise: { label: "Business", color: "bg-violet-500/20 text-violet-400 border-violet-500/30" },
};

const ToolsPanel = ({ selectedTool, onClose, onSendMessage }: ToolsPanelProps) => {
  const navigate = useNavigate();
  const { balance } = useCredits();
  const { isAdmin } = useUserRole();
  const config = toolsConfig[selectedTool];
  const userPlan = balance?.tier || "free";
  
  if (!config) return null;

  // Check access
  const canAccessTool = () => {
    if (isAdmin) return true;
    const planOrder = ["free", "starter", "pro", "enterprise"];
    const userPlanIndex = planOrder.indexOf(userPlan);
    const toolPlanIndex = planOrder.indexOf(config.plan);
    return userPlanIndex >= toolPlanIndex || config.plan === "starter";
  };

  const hasAccess = canAccessTool();
  const badge = planBadges[config.plan];

  // Wrapper that redirects to pricing when blocked
  const handleBlockedAction = () => {
    navigate("/pricing");
  };

  // Wrapper for onSendMessage that checks access
  const wrappedSendMessage = hasAccess 
    ? onSendMessage 
    : () => handleBlockedAction();

  const renderTool = () => {
    switch (selectedTool) {
      case "site-cloner":
        return <SiteClonerTool onSendMessage={wrappedSendMessage} />;
      case "zap-crm":
        return <ZapCRMTool onSendMessage={wrappedSendMessage} />;
      case "seo":
        return <SEOTool onSendMessage={wrappedSendMessage} />;
      case "growth":
        return <GrowthEngineTool onSendMessage={wrappedSendMessage} />;
      case "migrator":
        return <MigratorTool onSendMessage={wrappedSendMessage} />;
      case "copy-thief":
        return <CopyThiefTool onSendMessage={wrappedSendMessage} />;
      case "marketplace":
        return <MarketplaceTool onSendMessage={wrappedSendMessage} />;
      case "github-sync":
        return <GitHubSyncTool />;
      case "sales-recovery":
        return <SalesRecoveryTool onSendMessage={wrappedSendMessage} />;
      case "social-media":
        return <SocialMediaTool onSendMessage={wrappedSendMessage} />;
      case "checklist":
        return <ChecklistTool />;
      case "ai-explainer":
        return <AIExplainerTool onSendMessage={wrappedSendMessage} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="h-full bg-background border-l border-border flex flex-col relative"
    >
      {/* Close Button - Floating */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-secondary/80 hover:bg-secondary border border-border hover:border-primary/20 transition-all duration-200"
      >
        <X className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
      </button>

      {/* Locked Overlay */}
      {!hasAccess && (
        <div className="absolute inset-0 z-20 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center p-8">
          <div className="text-center max-w-sm">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Ferramenta {badge.label}
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Esta ferramenta está disponível no plano {badge.label}. Faça upgrade para desbloquear todas as funcionalidades.
            </p>
            <button
              onClick={() => navigate("/pricing")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-amber-500 text-white font-medium hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
            >
              <Crown className="w-4 h-4" />
              Ver Planos
            </button>
          </div>
        </div>
      )}

      {/* Tool Content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTool}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {renderTool()}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ToolsPanel;
