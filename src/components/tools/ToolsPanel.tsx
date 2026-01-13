import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
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

const toolsConfig: Record<string, { title: string; description: string; icon: string }> = {
  "site-cloner": { 
    title: "Clonador de Site", 
    description: "Crie sites inspirados em referências visuais", 
    icon: "🌐"
  },
  "zap-crm": { 
    title: "Zap E-commerce + CRM", 
    description: "Vendas e atendimento via WhatsApp", 
    icon: "💬"
  },
  "seo": { 
    title: "SEO Programático", 
    description: "Apareça no Google automaticamente", 
    icon: "🔍"
  },
  "growth": { 
    title: "Growth Engine", 
    description: "Ações para crescer suas vendas", 
    icon: "🚀"
  },
  "migrator": { 
    title: "Migrador Universal", 
    description: "Migre de outras plataformas", 
    icon: "🔄"
  },
  "copy-thief": { 
    title: "Ladrão de Copy", 
    description: "Textos persuasivos de referência", 
    icon: "✍️"
  },
  "marketplace": { 
    title: "Hub Marketplace", 
    description: "Centralize ofertas e parceiros", 
    icon: "🏪"
  },
  "github-sync": { 
    title: "Sync GitHub", 
    description: "Versionamento do projeto", 
    icon: "📂"
  },
  "sales-recovery": { 
    title: "Recuperador de Vendas", 
    description: "Recupere oportunidades perdidas", 
    icon: "💰"
  },
  "social-media": { 
    title: "Gerador Social Media", 
    description: "Conteúdo para redes sociais", 
    icon: "📱"
  },
  "checklist": { 
    title: "Checklist de Status", 
    description: "Progresso do seu site", 
    icon: "✅"
  },
  "ai-explainer": { 
    title: "IA Explicadora", 
    description: "Tire dúvidas facilmente", 
    icon: "🤖"
  },
};

const ToolsPanel = ({ selectedTool, onClose, onSendMessage }: ToolsPanelProps) => {
  const config = toolsConfig[selectedTool];
  
  if (!config) return null;

  const renderTool = () => {
    switch (selectedTool) {
      case "site-cloner":
        return <SiteClonerTool onSendMessage={onSendMessage} />;
      case "zap-crm":
        return <ZapCRMTool onSendMessage={onSendMessage} />;
      case "seo":
        return <SEOTool onSendMessage={onSendMessage} />;
      case "growth":
        return <GrowthEngineTool onSendMessage={onSendMessage} />;
      case "migrator":
        return <MigratorTool onSendMessage={onSendMessage} />;
      case "copy-thief":
        return <CopyThiefTool onSendMessage={onSendMessage} />;
      case "marketplace":
        return <MarketplaceTool onSendMessage={onSendMessage} />;
      case "github-sync":
        return <GitHubSyncTool />;
      case "sales-recovery":
        return <SalesRecoveryTool onSendMessage={onSendMessage} />;
      case "social-media":
        return <SocialMediaTool onSendMessage={onSendMessage} />;
      case "checklist":
        return <ChecklistTool />;
      case "ai-explainer":
        return <AIExplainerTool onSendMessage={onSendMessage} />;
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