import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, PanelLeftOpen } from "lucide-react";
import AISidebar from "./AISidebar";
import UnifiedChat from "./UnifiedChat";
import TemplatesModal from "./templates/TemplatesModal";
import { Template } from "./templates/TemplatesData";
import { toast } from "sonner";
import CreditDisplay from "./CreditDisplay";
import EmailVerificationBanner from "./EmailVerificationBanner";

interface Project {
  id: string;
  name: string;
  prompt: string;
  code: string | null;
  created_at: string;
}

interface StudioLayoutProps {
  onGoHome?: () => void;
  initialTool?: string;
  onSendMessage?: (message: string, toolId: string) => Promise<string>;
  user?: any;
  projects?: Project[];
  onSelectProject?: (project: Project) => void;
  currentProjectId?: string;
  onNewProject?: () => void;
  selectedTemplate?: Template | null;
}

const StudioLayout = ({ 
  onGoHome, 
  initialTool = "business", 
  onSendMessage,
  user,
  projects = [],
  onSelectProject,
  currentProjectId,
  onNewProject,
  selectedTemplate: initialTemplate
}: StudioLayoutProps) => {
  const [selectedTool, setSelectedTool] = useState(initialTool);
  const [showTemplates, setShowTemplates] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState<Template | null>(initialTemplate || null);
  const userName = user?.email?.split("@")[0] || "você";

  // Update activeTemplate when initialTemplate changes
  useEffect(() => {
    if (initialTemplate) {
      setActiveTemplate(initialTemplate);
    }
  }, [initialTemplate]);

  const handleSelectTemplate = (template: Template) => {
    toast.success(`Template "${template.name}" selecionado!`);
    setShowTemplates(false);
    setActiveTemplate(template);
    setSelectedTool("website");
  };

  // Ferramentas que mostram preview (sidebar fica oculta por padrão)
  const isVisualTool = ["website", "logo"].includes(selectedTool);

  return (
    <div className="min-h-screen flex flex-col bg-[hsl(0,0%,4%)]">
      {/* Email Verification Banner */}
      <EmailVerificationBanner />
      {/* Header with Back Button and Credit Display */}
      <header className="h-14 border-b border-white/[0.06] flex items-center px-4 gap-4 bg-[hsl(0,0%,4%)]">
        <button
          onClick={onGoHome}
          className="flex items-center gap-2 px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar</span>
        </button>
        
        {/* Toggle Sidebar Button */}
        <button
          onClick={() => setSidebarVisible(!sidebarVisible)}
          className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
            sidebarVisible 
              ? "text-primary bg-primary/10" 
              : "text-white/70 hover:text-white hover:bg-white/[0.04]"
          }`}
        >
          <PanelLeftOpen className="w-4 h-4" />
          <span className="hidden sm:inline">Ferramentas</span>
        </button>

        <div className="flex-1" />
        
        {/* Credit Display */}
        <CreditDisplay compact />
        
        {/* Current Tool Indicator */}
        <div className="text-sm text-white/50">
          Ferramenta: <span className="text-primary font-medium">{
            selectedTool === "business" ? "Plano de Negócio" :
            selectedTool === "branding" ? "Branding" :
            selectedTool === "logo" ? "Logo & Visual" :
            selectedTool === "website" ? "Website" :
            selectedTool === "copywriter" ? "Copywriter" :
            selectedTool === "marketing" ? "Marketing" :
            selectedTool === "sales" ? "Vendas" :
            selectedTool === "dev" ? "Desenvolvimento" :
            "IA"
          }</span>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Animated */}
        <AnimatePresence>
          {sidebarVisible && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 240, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden shrink-0"
            >
              <AISidebar 
                selectedTool={selectedTool}
                onSelectTool={(tool) => {
                  setSelectedTool(tool);
                  // Pode fechar sidebar automaticamente em ferramentas visuais
                  // if (["website", "logo"].includes(tool)) {
                  //   setSidebarVisible(false);
                  // }
                }}
                onGoHome={onGoHome}
                projects={projects}
                onSelectProject={onSelectProject}
                currentProjectId={currentProjectId}
                userName={userName}
                onOpenTemplates={() => setShowTemplates(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content - Chat + Preview */}
        <div className="flex-1 overflow-hidden">
          <UnifiedChat 
            selectedTool={selectedTool}
            onSendMessage={onSendMessage}
            userName={userName}
            onToolChange={setSelectedTool}
            activeTemplate={activeTemplate}
          />
        </div>
      </div>

      {/* Templates Modal */}
      <TemplatesModal 
        isOpen={showTemplates}
        onClose={() => setShowTemplates(false)}
        onSelectTemplate={handleSelectTemplate}
      />
    </div>
  );
};

export default StudioLayout;
