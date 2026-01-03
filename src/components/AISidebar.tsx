import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Home,
  Search,
  FolderOpen,
  Star,
  Compass,
  LayoutTemplate,
  BookOpen,
  Share2,
  Zap,
  ChevronDown,
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
  Clock,
  Settings,
  HelpCircle
} from "lucide-react";
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
  { id: "business", name: "Plano de Negócio", description: "Estruture sua empresa", icon: Briefcase, step: 1 },
  { id: "branding", name: "Branding", description: "Identidade da marca", icon: Palette, step: 2 },
  { id: "logo", name: "Logo & Visual", description: "Identidade visual", icon: PenTool, step: 3 },
  { id: "website", name: "Website", description: "Presença online", icon: Globe, step: 4 },
  { id: "copywriter", name: "Copywriter", description: "Textos persuasivos", icon: FileText, step: 5 },
  { id: "marketing", name: "Marketing", description: "Estratégias de growth", icon: TrendingUp, step: 6 },
  { id: "sales", name: "Vendas", description: "Scripts e conversão", icon: Target, step: 7 },
];

interface AISidebarProps {
  selectedTool: string;
  onSelectTool: (toolId: string) => void;
  onGoHome?: () => void;
  projects?: Project[];
  onSelectProject?: (project: Project) => void;
  currentProjectId?: string;
  userName?: string;
  onOpenTemplates?: () => void;
}

const AISidebar = ({ 
  selectedTool, 
  onSelectTool, 
  onGoHome, 
  projects = [],
  onSelectProject,
  currentProjectId,
  userName = "Usuário",
  onOpenTemplates
}: AISidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const recentProjects = projects.slice(0, 5);

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0, width: collapsed ? 64 : 260 }}
      transition={{ duration: 0.2 }}
      className="h-[calc(100vh-64px)] bg-[hsl(0,0%,4%)] border-r border-white/[0.06] flex flex-col shrink-0"
    >
      {/* Workspace Selector */}
      <div className="p-3 border-b border-white/[0.06]">
        <button className="w-full flex items-center gap-2.5 p-2 rounded-lg hover:bg-white/[0.04] transition-colors">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-xs">
            {userName.charAt(0).toUpperCase()}
          </div>
          {!collapsed && (
            <>
              <span className="flex-1 text-left text-sm font-medium text-white truncate">
                {userName}'s Workspace
              </span>
              <ChevronDown className="w-4 h-4 text-white/40" />
            </>
          )}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto py-2">
        {/* Navigation */}
        <div className="px-2 space-y-0.5">
          <button
            onClick={onGoHome}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              collapsed ? 'justify-center' : ''
            } text-white/60 hover:text-white hover:bg-white/[0.04]`}
          >
            <Home className="w-4 h-4 shrink-0" />
            {!collapsed && <span>Home</span>}
          </button>
          
          <button
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              collapsed ? 'justify-center' : ''
            } text-white/60 hover:text-white hover:bg-white/[0.04]`}
          >
            <Search className="w-4 h-4 shrink-0" />
            {!collapsed && (
              <>
                <span className="flex-1 text-left">Buscar</span>
                <kbd className="text-[10px] text-white/30 bg-white/[0.04] px-1.5 py-0.5 rounded">⌘K</kbd>
              </>
            )}
          </button>
        </div>

        {/* Resources */}
        {!collapsed && (
          <div className="px-2 mt-6">
            <div className="px-3 pb-2">
              <span className="text-[10px] font-semibold text-white/30 uppercase tracking-wider">
                Recursos
              </span>
            </div>
            <div className="space-y-0.5">
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/[0.04] transition-colors">
                <Compass className="w-4 h-4" />
                <span>Descobrir</span>
              </button>
              <button 
                onClick={onOpenTemplates}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/[0.04] transition-colors"
              >
                <LayoutTemplate className="w-4 h-4" />
                <span>Templates</span>
                <span className="ml-auto text-[10px] text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded">Novo</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/[0.04] transition-colors">
                <BookOpen className="w-4 h-4" />
                <span>Aprender</span>
              </button>
            </div>
          </div>
        )}

        {/* AI Tools */}
        <div className="px-2 mt-6">
          {!collapsed && (
            <div className="px-3 pb-2">
              <span className="text-[10px] font-semibold text-white/30 uppercase tracking-wider">
                Ferramentas de IA
              </span>
            </div>
          )}
          
          <div className="space-y-0.5">
            {aiTools.map((tool) => {
              const isSelected = selectedTool === tool.id;
              
              return (
                <button
                  key={tool.id}
                  onClick={() => onSelectTool(tool.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                    collapsed ? 'justify-center' : ''
                  } ${
                    isSelected
                      ? "bg-orange-500/10 text-orange-400"
                      : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="relative shrink-0">
                    <tool.icon className="w-4 h-4" />
                  </div>
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left truncate">{tool.name}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                        isSelected 
                          ? 'bg-orange-500/20 text-orange-400' 
                          : 'bg-white/[0.04] text-white/30'
                      }`}>
                        {tool.step}
                      </span>
                    </>
                  )}
                </button>
              );
            })}
          </div>

          {/* Existing Business */}
          {!collapsed && (
            <button
              onClick={() => onSelectTool("existing")}
              className={`w-full flex items-center gap-3 px-3 py-2 mt-2 rounded-lg text-sm transition-colors ${
                selectedTool === "existing"
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "text-white/60 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Já tenho empresa</span>
            </button>
          )}
        </div>

        {/* Recent Projects */}
        {!collapsed && recentProjects.length > 0 && (
          <div className="px-2 mt-6">
            <div className="px-3 pb-2 flex items-center justify-between">
              <span className="text-[10px] font-semibold text-white/30 uppercase tracking-wider">
                Recentes
              </span>
              <button className="text-[10px] text-white/40 hover:text-white">Ver todos</button>
            </div>
            {recentProjects.map((project) => (
              <button
                key={project.id}
                onClick={() => onSelectProject?.(project)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                  currentProjectId === project.id
                    ? "bg-orange-500/10 text-orange-400"
                    : "text-white/50 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{project.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Section */}
      <div className="p-2 border-t border-white/[0.06]">
        {!collapsed && (
          <>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/[0.04] transition-colors">
              <HelpCircle className="w-4 h-4" />
              <span>Ajuda & Suporte</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/[0.04] transition-colors">
              <Settings className="w-4 h-4" />
              <span>Configurações</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/[0.04] transition-colors">
              <Zap className="w-4 h-4 text-orange-400" />
              <span className="flex-1 text-left">Upgrade Pro</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                50% OFF
              </span>
            </button>
          </>
        )}
        
        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm text-white/40 hover:text-white hover:bg-white/[0.04] transition-colors mt-1"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {!collapsed && <span>Recolher</span>}
        </button>
      </div>
    </motion.div>
  );
};

export default AISidebar;
