import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Home,
  Search,
  FolderOpen,
  Star,
  Users,
  Compass,
  LayoutTemplate,
  BookOpen,
  Share2,
  Zap,
  ChevronDown,
  Settings,
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
  Clock
} from "lucide-react";
import { Button } from "./ui/button";
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
}

const AISidebar = ({ 
  selectedTool, 
  onSelectTool, 
  onGoHome, 
  projects = [],
  onSelectProject,
  currentProjectId,
  userName = "Usuário"
}: AISidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const recentProjects = projects.slice(0, 5);

  const menuItems = [
    { id: "home", name: "Home", icon: Home, onClick: onGoHome },
    { id: "search", name: "Buscar", icon: Search, shortcut: "Ctrl+K" },
  ];

  const projectMenuItems = [
    { id: "all", name: "Todos os projetos", icon: FolderOpen },
    { id: "starred", name: "Favoritos", icon: Star },
    { id: "shared", name: "Compartilhados", icon: Users },
  ];

  const resourceMenuItems = [
    { id: "discover", name: "Descobrir", icon: Compass },
    { id: "templates", name: "Templates", icon: LayoutTemplate },
    { id: "learn", name: "Aprender", icon: BookOpen },
  ];

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0, width: collapsed ? 72 : 280 }}
      transition={{ duration: 0.2 }}
      className="h-[calc(100vh-64px)] bg-[hsl(0,0%,5%)] border-r border-white/[0.06] flex flex-col shrink-0"
    >
      {/* User/Workspace Header */}
      <div className="p-3 border-b border-white/[0.06]">
        <button className="w-full flex items-center gap-2.5 p-2 rounded-lg hover:bg-white/[0.04] transition-colors">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
            {userName.charAt(0).toUpperCase()}
          </div>
          {!collapsed && (
            <>
              <span className="flex-1 text-left text-sm font-medium text-white truncate">
                {userName}'s Codia
              </span>
              <ChevronDown className="w-4 h-4 text-white/40" />
            </>
          )}
        </button>
      </div>

      {/* Main Menu */}
      <div className="flex-1 overflow-y-auto">
        {/* Navigation */}
        <div className="p-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={item.onClick}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                collapsed ? 'justify-center' : ''
              } text-white/60 hover:text-white hover:bg-white/[0.04]`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">{item.name}</span>
                  {item.shortcut && (
                    <span className="text-[10px] text-white/30 bg-white/[0.04] px-1.5 py-0.5 rounded">
                      {item.shortcut}
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
        </div>

        {/* Projects Section */}
        {!collapsed && (
          <div className="px-2 pt-4">
            <div className="px-3 pb-2">
              <span className="text-[10px] font-semibold text-white/30 uppercase tracking-wider">
                Projetos
              </span>
            </div>
            {projectMenuItems.map((item) => (
              <button
                key={item.id}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/[0.04] transition-colors"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        )}

        {/* Resources Section */}
        {!collapsed && (
          <div className="px-2 pt-4">
            <div className="px-3 pb-2">
              <span className="text-[10px] font-semibold text-white/30 uppercase tracking-wider">
                Recursos
              </span>
            </div>
            {resourceMenuItems.map((item) => (
              <button
                key={item.id}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/[0.04] transition-colors"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        )}

        {/* AI Tools Section */}
        <div className="px-2 pt-6">
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
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    collapsed ? 'justify-center' : ''
                  } ${
                    isSelected
                      ? "bg-orange-500/10 text-orange-400 border-l-2 border-orange-500"
                      : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="relative">
                    <tool.icon className="w-4 h-4 shrink-0" />
                    {!collapsed && isSelected && (
                      <span className="absolute -top-1 -left-1 w-3 h-3 bg-orange-500 rounded-full text-[8px] text-white flex items-center justify-center font-bold">
                        {tool.step}
                      </span>
                    )}
                  </div>
                  {!collapsed && (
                    <span className="flex-1 text-left truncate">{tool.name}</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Existing Business Option */}
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
          <div className="px-2 pt-6">
            <div className="px-3 pb-2">
              <span className="text-[10px] font-semibold text-white/30 uppercase tracking-wider">
                Recentes
              </span>
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
              <Share2 className="w-4 h-4" />
              <span className="flex-1 text-left">Compartilhar Codia</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                Ganhe créditos
              </span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/[0.04] transition-colors">
              <Zap className="w-4 h-4 text-orange-400" />
              <span className="flex-1 text-left">Upgrade para Pro</span>
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
