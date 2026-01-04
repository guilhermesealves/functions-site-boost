import { useState } from "react";
import AISidebar from "./AISidebar";
import UnifiedChat from "./UnifiedChat";
import AppHeader from "./AppHeader";
import TemplatesModal from "./templates/TemplatesModal";
import { Template } from "./templates/TemplatesData";
import { toast } from "sonner";

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
}

const StudioLayout = ({ 
  onGoHome, 
  initialTool = "business", 
  onSendMessage,
  user,
  projects = [],
  onSelectProject,
  currentProjectId,
  onNewProject
}: StudioLayoutProps) => {
  const [selectedTool, setSelectedTool] = useState(initialTool);
  const [showTemplates, setShowTemplates] = useState(false);
  const userName = user?.email?.split("@")[0] || "você";

  const handleSelectTemplate = (template: Template) => {
    toast.success(`Template "${template.name}" selecionado!`);
    setShowTemplates(false);
    setSelectedTool("website");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[hsl(0,0%,4%)]">
      {/* Global Header */}
      <AppHeader 
        user={user} 
        onNewProject={onNewProject}
        showNewButton={!!onNewProject}
      />

      {/* Content */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <AISidebar 
          selectedTool={selectedTool}
          onSelectTool={setSelectedTool}
          onGoHome={onGoHome}
          projects={projects}
          onSelectProject={onSelectProject}
          currentProjectId={currentProjectId}
          userName={userName}
          onOpenTemplates={() => setShowTemplates(true)}
        />

        {/* Main Content - Chat + Preview */}
        <UnifiedChat 
          selectedTool={selectedTool}
          onSendMessage={onSendMessage}
          userName={userName}
          onToolChange={setSelectedTool}
        />
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
