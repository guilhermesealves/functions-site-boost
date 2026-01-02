import { useState } from "react";
import { motion } from "framer-motion";
import AISidebar from "./AISidebar";
import UnifiedChat from "./UnifiedChat";

interface StudioLayoutProps {
  onGoHome?: () => void;
  initialTool?: string;
  onSendMessage?: (message: string, toolId: string) => Promise<string>;
}

const StudioLayout = ({ onGoHome, initialTool = "business", onSendMessage }: StudioLayoutProps) => {
  const [selectedTool, setSelectedTool] = useState(initialTool);

  return (
    <div className="min-h-screen flex bg-[hsl(0,0%,4%)]">
      {/* Sidebar */}
      <AISidebar 
        selectedTool={selectedTool}
        onSelectTool={setSelectedTool}
        onGoHome={onGoHome}
      />

      {/* Main Content - Chat */}
      <UnifiedChat 
        selectedTool={selectedTool}
        onSendMessage={onSendMessage}
      />
    </div>
  );
};

export default StudioLayout;
