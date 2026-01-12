import { useState } from "react";
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

const toolsConfig: Record<string, { title: string; description: string }> = {
  "site-cloner": { title: "Clonador de Site", description: "Crie sites inspirados em referências visuais" },
  "zap-crm": { title: "Zap E-commerce + CRM", description: "Vendas e atendimento via WhatsApp" },
  "seo": { title: "SEO Programático", description: "Apareça no Google automaticamente" },
  "growth": { title: "Growth Engine", description: "Ações para crescer suas vendas" },
  "migrator": { title: "Migrador Universal", description: "Migre de outras plataformas" },
  "copy-thief": { title: "Ladrão de Copy", description: "Textos persuasivos de referência" },
  "marketplace": { title: "Hub Marketplace", description: "Centralize ofertas e parceiros" },
  "github-sync": { title: "Sync GitHub", description: "Versionamento do projeto" },
  "sales-recovery": { title: "Recuperador de Vendas", description: "Recupere oportunidades perdidas" },
  "social-media": { title: "Gerador Social Media", description: "Conteúdo para redes sociais" },
  "checklist": { title: "Checklist de Status", description: "Progresso do seu site" },
  "ai-explainer": { title: "IA Explicadora", description: "Tire dúvidas facilmente" },
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
      className="h-full bg-[hsl(0,0%,6%)] border-l border-white/[0.06] flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">{config.title}</h2>
          <p className="text-sm text-white/50">{config.description}</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-white/[0.06] transition-colors"
        >
          <X className="w-5 h-5 text-white/50" />
        </button>
      </div>

      {/* Tool Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {renderTool()}
      </div>
    </motion.div>
  );
};

export default ToolsPanel;
