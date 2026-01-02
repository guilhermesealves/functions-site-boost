import { motion } from "framer-motion";
import { 
  Globe, 
  Palette, 
  PenTool, 
  Megaphone, 
  TrendingUp, 
  Briefcase,
  Target,
  MessageSquare,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface AITool {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
}

const aiTools: AITool[] = [
  {
    id: "website",
    name: "Website",
    description: "Crie sites profissionais",
    icon: Globe,
    color: "text-orange-400",
    gradient: "from-orange-500 to-amber-500"
  },
  {
    id: "branding",
    name: "Branding",
    description: "Defina sua marca",
    icon: Palette,
    color: "text-violet-400",
    gradient: "from-violet-500 to-purple-500"
  },
  {
    id: "logo",
    name: "Logo",
    description: "Crie identidade visual",
    icon: PenTool,
    color: "text-pink-400",
    gradient: "from-pink-500 to-rose-500"
  },
  {
    id: "copywriter",
    name: "Copywriter",
    description: "Textos que vendem",
    icon: MessageSquare,
    color: "text-blue-400",
    gradient: "from-blue-500 to-indigo-500"
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Estratégias de crescimento",
    icon: Megaphone,
    color: "text-emerald-400",
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    id: "business",
    name: "Business",
    description: "Planejamento empresarial",
    icon: Briefcase,
    color: "text-amber-400",
    gradient: "from-amber-500 to-yellow-500"
  },
  {
    id: "sales",
    name: "Sales",
    description: "Scripts e vendas",
    icon: Target,
    color: "text-red-400",
    gradient: "from-red-500 to-rose-500"
  },
];

interface AISidebarProps {
  selectedTool: string;
  onSelectTool: (toolId: string) => void;
}

const AISidebar = ({ selectedTool, onSelectTool }: AISidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.div
      initial={{ x: -280 }}
      animate={{ x: 0, width: collapsed ? 60 : 220 }}
      transition={{ duration: 0.2 }}
      className="h-full bg-[hsl(0,0%,5%)] border-r border-white/5 flex flex-col shrink-0"
    >
      {/* Header */}
      <div className="p-3 border-b border-white/5 flex items-center justify-between">
        {!collapsed && (
          <span className="text-xs font-medium text-white/60 uppercase tracking-wider">
            IAs
          </span>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="h-7 w-7 p-0 text-white/40 hover:text-white hover:bg-white/5 ml-auto"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Tools */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {aiTools.map((tool) => {
          const isSelected = selectedTool === tool.id;
          
          return (
            <motion.button
              key={tool.id}
              onClick={() => onSelectTool(tool.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all ${
                isSelected
                  ? "bg-gradient-to-r " + tool.gradient + " shadow-lg"
                  : "hover:bg-white/5"
              }`}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                isSelected 
                  ? "bg-white/20" 
                  : `bg-gradient-to-br ${tool.gradient} bg-opacity-20`
              }`}>
                <tool.icon className={`w-5 h-5 ${isSelected ? "text-white" : tool.color}`} />
              </div>
              
              {!collapsed && (
                <div className="text-left min-w-0">
                  <p className={`font-medium text-sm truncate ${
                    isSelected ? "text-white" : "text-white/80"
                  }`}>
                    {tool.name}
                  </p>
                  <p className={`text-[10px] truncate ${
                    isSelected ? "text-white/70" : "text-white/40"
                  }`}>
                    {tool.description}
                  </p>
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default AISidebar;
