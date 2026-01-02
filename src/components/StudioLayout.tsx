import { useState } from "react";
import AISidebar from "./AISidebar";
import UnifiedChat from "./UnifiedChat";
import AppHeader from "./AppHeader";

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
  const userName = user?.email?.split("@")[0] || "você";

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
        />

        {/* Main Content - Chat + Preview */}
        <UnifiedChat 
          selectedTool={selectedTool}
          onSendMessage={onSendMessage}
          userName={userName}
        />
      </div>
    </div>
  );
};

export default StudioLayout;
