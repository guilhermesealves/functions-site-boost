import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ChevronRight } from "lucide-react";
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

const toolsConfig: Record<string, { title: string; description: string; gradient: string; icon: string }> = {
  "site-cloner": { 
    title: "Clonador de Site", 
    description: "Crie sites inspirados em referências visuais", 
    gradient: "from-violet-500 to-purple-600",
    icon: "🌐"
  },
  "zap-crm": { 
    title: "Zap E-commerce + CRM", 
    description: "Vendas e atendimento via WhatsApp", 
    gradient: "from-emerald-500 to-green-600",
    icon: "💬"
  },
  "seo": { 
    title: "SEO Programático", 
    description: "Apareça no Google automaticamente", 
    gradient: "from-blue-500 to-cyan-600",
    icon: "🔍"
  },
  "growth": { 
    title: "Growth Engine", 
    description: "Ações para crescer suas vendas", 
    gradient: "from-orange-500 to-amber-600",
    icon: "🚀"
  },
  "migrator": { 
    title: "Migrador Universal", 
    description: "Migre de outras plataformas", 
    gradient: "from-pink-500 to-rose-600",
    icon: "🔄"
  },
  "copy-thief": { 
    title: "Ladrão de Copy", 
    description: "Textos persuasivos de referência", 
    gradient: "from-red-500 to-orange-600",
    icon: "✍️"
  },
  "marketplace": { 
    title: "Hub Marketplace", 
    description: "Centralize ofertas e parceiros", 
    gradient: "from-indigo-500 to-violet-600",
    icon: "🏪"
  },
  "github-sync": { 
    title: "Sync GitHub", 
    description: "Versionamento do projeto", 
    gradient: "from-gray-600 to-slate-700",
    icon: "📂"
  },
  "sales-recovery": { 
    title: "Recuperador de Vendas", 
    description: "Recupere oportunidades perdidas", 
    gradient: "from-yellow-500 to-orange-600",
    icon: "💰"
  },
  "social-media": { 
    title: "Gerador Social Media", 
    description: "Conteúdo para redes sociais", 
    gradient: "from-pink-500 to-purple-600",
    icon: "📱"
  },
  "checklist": { 
    title: "Checklist de Status", 
    description: "Progresso do seu site", 
    gradient: "from-teal-500 to-emerald-600",
    icon: "✅"
  },
  "ai-explainer": { 
    title: "IA Explicadora", 
    description: "Tire dúvidas facilmente", 
    gradient: "from-cyan-500 to-blue-600",
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
      className="h-full bg-gradient-to-b from-[hsl(0,0%,7%)] to-[hsl(0,0%,4%)] border-l border-white/[0.06] flex flex-col"
    >
      {/* Header with Gradient */}
      <div className="relative overflow-hidden">
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient} opacity-10`} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[hsl(0,0%,7%)]" />
        
        {/* Content */}
        <div className="relative p-6 border-b border-white/[0.06]">
          <div className="flex items-start justify-between">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-start gap-4"
            >
              {/* Icon */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${config.gradient} flex items-center justify-center text-2xl shadow-lg shadow-black/20`}
              >
                {config.icon}
              </motion.div>
              
              <div>
                <motion.h2 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl font-bold text-white flex items-center gap-2"
                >
                  {config.title}
                  <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="text-sm text-white/50 mt-1"
                >
                  {config.description}
                </motion.p>
              </div>
            </motion.div>
            
            <motion.button
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.2 }}
              onClick={onClose}
              className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-200 group"
            >
              <X className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
            </motion.button>
          </div>

          {/* Breadcrumb */}
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 mt-4 text-xs text-white/40"
          >
            <span>Ferramentas</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/60">{config.title}</span>
          </motion.div>
        </div>
      </div>

      {/* Tool Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.3 }}
        className="flex-1 overflow-y-auto p-6"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTool}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {renderTool()}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="p-4 border-t border-white/[0.06] bg-[hsl(0,0%,4%)]"
      >
        <div className="flex items-center justify-between text-xs text-white/30">
          <span>Powered by Codia AI</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Online</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ToolsPanel;
