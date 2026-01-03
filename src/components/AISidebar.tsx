import { useState } from "react";
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
  Sparkles,
  Code2
} from "lucide-react";

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
  { id: "dev", name: "Desenvolvimento", description: "Código profissional", icon: Code2, step: 8 },
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

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0, width: collapsed ? 56 : 240 }}
      transition={{ duration: 0.2 }}
      className="h-[calc(100vh-64px)] bg-[hsl(0,0%,4%)] border-r border-white/[0.06] flex flex-col shrink-0"
    >
      {/* Header */}
      <div className="p-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2 px-2">
          <Sparkles className="w-5 h-5 text-orange-400" />
          {!collapsed && (
            <span className="text-sm font-semibold text-white">Ferramentas IA</span>
          )}
        </div>
      </div>

      {/* AI Tools - Clean List */}
      <div className="flex-1 overflow-y-auto py-3">
        <div className="px-2 space-y-1">
          {aiTools.map((tool) => {
            const isSelected = selectedTool === tool.id;
            
            return (
              <button
                key={tool.id}
                onClick={() => onSelectTool(tool.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                  collapsed ? 'justify-center' : ''
                } ${
                  isSelected
                    ? "bg-orange-500/15 text-orange-400 border border-orange-500/20"
                    : "text-white/70 hover:text-white hover:bg-white/[0.04] border border-transparent"
                }`}
              >
                <tool.icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-orange-400' : ''}`} />
                {!collapsed && (
                  <span className="flex-1 text-left">{tool.name}</span>
                )}
              </button>
            );
          })}

          {/* Divider */}
          <div className="my-3 mx-3 border-t border-white/[0.06]" />

          {/* Existing Business */}
          <button
            onClick={() => onSelectTool("existing")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
              collapsed ? 'justify-center' : ''
            } ${
              selectedTool === "existing"
                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                : "text-white/70 hover:text-white hover:bg-white/[0.04] border border-transparent"
            }`}
          >
            <Building2 className={`w-4 h-4 shrink-0 ${selectedTool === "existing" ? 'text-emerald-400' : ''}`} />
            {!collapsed && <span>Já tenho empresa</span>}
          </button>
        </div>
      </div>

      {/* Collapse Button */}
      <div className="p-2 border-t border-white/[0.06]">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm text-white/40 hover:text-white hover:bg-white/[0.04] transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {!collapsed && <span className="text-xs">Recolher</span>}
        </button>
      </div>
    </motion.div>
  );
};

export default AISidebar;
