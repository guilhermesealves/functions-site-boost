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
  Home,
  Search
} from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface AITool {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  step: number;
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
  hasExistingBusiness?: boolean;
}

const AISidebar = ({ selectedTool, onSelectTool, onGoHome, hasExistingBusiness = false }: AISidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.div
      initial={{ x: -280 }}
      animate={{ x: 0, width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.2 }}
      className="h-full bg-[hsl(0,0%,4%)] border-r border-white/[0.06] flex flex-col shrink-0"
    >
      {/* Logo & Toggle */}
      <div className="p-4 flex items-center justify-between border-b border-white/[0.06]">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white text-lg">Codia</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className={`h-8 w-8 p-0 text-white/40 hover:text-white hover:bg-white/5 ${collapsed ? 'mx-auto' : ''}`}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Home Button */}
      {onGoHome && (
        <div className="p-3">
          <Button
            variant="ghost"
            onClick={onGoHome}
            className={`w-full flex items-center gap-3 h-10 text-white/60 hover:text-white hover:bg-white/5 ${collapsed ? 'justify-center px-0' : 'justify-start px-3'}`}
          >
            <Home className="w-4 h-4 shrink-0" />
            {!collapsed && <span className="text-sm">Início</span>}
          </Button>
        </div>
      )}

      {/* Section Title */}
      {!collapsed && (
        <div className="px-4 py-3">
          <p className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.15em]">
            Jornada da Empresa
          </p>
        </div>
      )}

      {/* Tools */}
      <div className="flex-1 overflow-y-auto px-3 space-y-1">
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
                  ? "bg-white/[0.08] border border-white/[0.1]"
                  : "hover:bg-white/[0.04] border border-transparent"
              }`}
            >
              {/* Step indicator */}
              <div className="relative shrink-0">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  isSelected 
                    ? "bg-gradient-to-br from-orange-500 to-amber-500" 
                    : "bg-white/[0.06]"
                }`}>
                  <tool.icon className={`w-5 h-5 ${isSelected ? "text-white" : "text-white/60"}`} />
                </div>
                {!collapsed && (
                  <span className={`absolute -top-1 -left-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                    isSelected 
                      ? "bg-orange-500 text-white" 
                      : "bg-white/[0.08] text-white/40"
                  }`}>
                    {tool.step}
                  </span>
                )}
              </div>
              
              {!collapsed && (
                <div className="text-left min-w-0 flex-1">
                  <p className={`font-medium text-sm truncate ${
                    isSelected ? "text-white" : "text-white/80"
                  }`}>
                    {tool.name}
                  </p>
                  <p className={`text-[11px] truncate ${
                    isSelected ? "text-white/60" : "text-white/40"
                  }`}>
                    {tool.description}
                  </p>
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Bottom Section - Already have business option */}
      {!collapsed && (
        <div className="p-4 border-t border-white/[0.06]">
          <button
            onClick={() => onSelectTool("existing")}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
              selectedTool === "existing"
                ? "bg-emerald-500/10 border border-emerald-500/20"
                : "bg-white/[0.03] hover:bg-white/[0.05] border border-transparent"
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              selectedTool === "existing"
                ? "bg-gradient-to-br from-emerald-500 to-teal-500"
                : "bg-white/[0.06]"
            }`}>
              <Building2 className={`w-5 h-5 ${selectedTool === "existing" ? "text-white" : "text-white/60"}`} />
            </div>
            <div className="text-left">
              <p className={`font-medium text-sm ${selectedTool === "existing" ? "text-emerald-400" : "text-white/80"}`}>
                Já tenho empresa
              </p>
              <p className="text-[11px] text-white/40">
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
