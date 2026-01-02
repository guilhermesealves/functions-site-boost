import { motion } from "framer-motion";
import { 
  Globe, 
  Palette, 
  PenTool, 
  FileText, 
  TrendingUp, 
  Briefcase,
  Target,
  Building2,
  ChevronLeft,
  ChevronRight,
  FolderOpen,
  Clock,
  Star
} from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import CodiaLogo from "./CodiaLogo";

interface AITool {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  step: number;
}

interface Project {
  id: string;
  name: string;
  prompt: string;
  code: string | null;
  created_at: string;
}

// Ordem lógica para criar uma empresa
const aiTools: AITool[] = [
  {
    id: "business",
    name: "Plano de Negócio",
    description: "Estruture sua empresa",
    icon: Briefcase,
    step: 1
  },
  {
    id: "branding",
    name: "Branding",
    description: "Identidade da marca",
    icon: Palette,
    step: 2
  },
  {
    id: "logo",
    name: "Logo & Visual",
    description: "Identidade visual",
    icon: PenTool,
    step: 3
  },
  {
    id: "website",
    name: "Website",
    description: "Presença online",
    icon: Globe,
    step: 4
  },
  {
    id: "copywriter",
    name: "Copywriter",
    description: "Textos persuasivos",
    icon: FileText,
    step: 5
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Estratégias de growth",
    icon: TrendingUp,
    step: 6
  },
  {
    id: "sales",
    name: "Vendas",
    description: "Scripts e conversão",
    icon: Target,
    step: 7
  },
];

interface AISidebarProps {
  selectedTool: string;
  onSelectTool: (toolId: string) => void;
  onGoHome?: () => void;
  projects?: Project[];
  onSelectProject?: (project: Project) => void;
  currentProjectId?: string;
}

const AISidebar = ({ 
  selectedTool, 
  onSelectTool, 
  onGoHome, 
  projects = [],
  onSelectProject,
  currentProjectId 
}: AISidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [showProjects, setShowProjects] = useState(false);

  const recentProjects = projects.slice(0, 5);

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0, width: collapsed ? 72 : 280 }}
      transition={{ duration: 0.2 }}
      className="h-[calc(100vh-64px)] bg-[hsl(0,0%,5%)] border-r border-white/[0.06] flex flex-col shrink-0"
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-white/[0.06]">
        {!collapsed && (
          <button 
            onClick={onGoHome}
            className="text-xs font-semibold text-white/40 uppercase tracking-[0.15em] hover:text-white/60 transition-colors"
          >
            ← Dashboard
          </button>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className={`h-8 w-8 p-0 text-white/40 hover:text-white hover:bg-white/[0.04] ${collapsed ? 'mx-auto' : ''}`}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Projects Section */}
      {!collapsed && recentProjects.length > 0 && (
        <div className="px-3 pt-4">
          <button 
            onClick={() => setShowProjects(!showProjects)}
            className="w-full flex items-center justify-between px-2 py-2 text-xs font-semibold text-white/40 uppercase tracking-wider hover:text-white/60 transition-colors"
          >
            <span className="flex items-center gap-2">
              <FolderOpen className="w-3.5 h-3.5" />
              Projetos Recentes
            </span>
            <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showProjects ? 'rotate-90' : ''}`} />
          </button>
          
          {showProjects && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="space-y-1 mt-1"
            >
              {recentProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => onSelectProject?.(project)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all ${
                    currentProjectId === project.id 
                      ? "bg-orange-500/10 border border-orange-500/20" 
                      : "hover:bg-white/[0.04] border border-transparent"
                  }`}
                >
                  <Clock className="w-3.5 h-3.5 text-white/30 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className={`text-xs font-medium truncate ${
                      currentProjectId === project.id ? "text-orange-400" : "text-white/70"
                    }`}>
                      {project.name}
                    </p>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </div>
      )}

      {/* Section Title */}
      {!collapsed && (
        <div className="px-4 pt-6 pb-2">
          <p className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.15em]">
            Ferramentas de IA
          </p>
        </div>
      )}

      {/* Tools */}
      <div className="flex-1 overflow-y-auto px-3 space-y-1 pb-4">
        {aiTools.map((tool) => {
          const isSelected = selectedTool === tool.id;
          
          return (
            <motion.button
              key={tool.id}
              onClick={() => onSelectTool(tool.id)}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center gap-3 rounded-xl transition-all duration-200 ${
                collapsed ? 'p-3 justify-center' : 'p-3'
              } ${
                isSelected
                  ? "bg-gradient-to-r from-orange-500/10 to-amber-500/5 border border-orange-500/20"
                  : "hover:bg-white/[0.03] border border-transparent"
              }`}
            >
              {/* Icon */}
              <div className="relative shrink-0">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  isSelected 
                    ? "bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-500/20" 
                    : "bg-white/[0.04]"
                }`}>
                  <tool.icon className={`w-5 h-5 ${isSelected ? "text-white" : "text-white/50"}`} />
                </div>
                {!collapsed && (
                  <span className={`absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                    isSelected 
                      ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30" 
                      : "bg-white/[0.06] text-white/30"
                  }`}>
                    {tool.step}
                  </span>
                )}
              </div>
              
              {!collapsed && (
                <div className="text-left min-w-0 flex-1">
                  <p className={`font-medium text-sm truncate ${
                    isSelected ? "text-white" : "text-white/70"
                  }`}>
                    {tool.name}
                  </p>
                  <p className={`text-[11px] truncate ${
                    isSelected ? "text-orange-300/60" : "text-white/30"
                  }`}>
                    {tool.description}
                  </p>
                </div>
              )}

              {isSelected && !collapsed && (
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Bottom Section */}
      {!collapsed && (
        <div className="p-3 border-t border-white/[0.06]">
          <button
            onClick={() => onSelectTool("existing")}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
              selectedTool === "existing"
                ? "bg-emerald-500/10 border border-emerald-500/20"
                : "bg-white/[0.02] hover:bg-white/[0.04] border border-transparent"
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              selectedTool === "existing"
                ? "bg-gradient-to-br from-emerald-500 to-teal-500"
                : "bg-white/[0.04]"
            }`}>
              <Building2 className={`w-5 h-5 ${selectedTool === "existing" ? "text-white" : "text-white/50"}`} />
            </div>
            <div className="text-left">
              <p className={`font-medium text-sm ${selectedTool === "existing" ? "text-emerald-400" : "text-white/70"}`}>
                Já tenho empresa
              </p>
              <p className="text-[11px] text-white/30">
                Importar dados existentes
              </p>
            </div>
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default AISidebar;
