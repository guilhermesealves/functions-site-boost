import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Palette, PenTool, FileText, TrendingUp, Briefcase, Target, Building2, ChevronLeft, ChevronRight, Sparkles, Code2, ChevronDown, Settings, HelpCircle, LogOut, Zap, Flame, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useCredits } from "@/hooks/useCredits";
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
const aiTools: AITool[] = [{
  id: "business",
  name: "Plano de Negócio",
  description: "Estruture sua empresa",
  icon: Briefcase,
  step: 1
}, {
  id: "branding",
  name: "Branding",
  description: "Identidade da marca",
  icon: Palette,
  step: 2
}, {
  id: "logo",
  name: "Logo & Visual",
  description: "Identidade visual",
  icon: PenTool,
  step: 3
}, {
  id: "website",
  name: "Website",
  description: "Presença online",
  icon: Globe,
  step: 4
}, {
  id: "copywriter",
  name: "Copywriter",
  description: "Textos persuasivos",
  icon: FileText,
  step: 5
}, {
  id: "marketing",
  name: "Marketing",
  description: "Estratégias de growth",
  icon: TrendingUp,
  step: 6
}, {
  id: "sales",
  name: "Vendas",
  description: "Scripts e conversão",
  icon: Target,
  step: 7
}, {
  id: "dev",
  name: "Desenvolvimento",
  description: "Código profissional",
  icon: Code2,
  step: 8
}];
interface AISidebarProps {
  selectedTool: string;
  onSelectTool: (toolId: string) => void;
  onGoHome?: () => void;
  projects?: Project[];
  onSelectProject?: (project: Project) => void;
  currentProjectId?: string;
  userName?: string;
  onOpenTemplates?: () => void;
  onOpenSettings?: () => void;
}
const AISidebar = ({
  selectedTool,
  onSelectTool,
  onGoHome,
  projects = [],
  onSelectProject,
  currentProjectId,
  userName = "Usuário",
  onOpenTemplates,
  onOpenSettings
}: AISidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const {
    balance
  } = useCredits();

  // Credit calculations
  const totalCredits = balance?.total || 0;
  const maxCredits = balance?.tier === "free" ? 50 : balance?.tier === "starter" ? 200 : balance?.tier === "pro" ? 500 : 1000;
  const creditPercentage = Math.min(totalCredits / maxCredits * 100, 100);
  const isLowCredits = creditPercentage < 20;
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Você saiu da sua conta");
    navigate("/");
  };
  return <motion.div initial={{
    x: -300
  }} animate={{
    x: 0,
    width: collapsed ? 56 : 240
  }} transition={{
    duration: 0.2
  }} className="h-[calc(100vh-64px)] bg-[hsl(0,0%,4%)] border-r border-white/[0.06] flex flex-col shrink-0">
      {/* User/Workspace Selector with Dropdown */}
      {!collapsed && <div className="p-3 border-b border-white/[0.06] relative" ref={dropdownRef}>
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/[0.04] transition-colors group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white text-sm font-bold">
              {userName.charAt(0).toUpperCase()}
            </div>
            <span className="flex-1 text-left text-sm text-white font-medium truncate">
              {userName}'s Codia
            </span>
            <ChevronDown className={`w-4 h-4 text-white/40 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* User Dropdown */}
          <AnimatePresence>
            {isDropdownOpen && <motion.div initial={{
          opacity: 0,
          y: -10,
          scale: 0.95
        }} animate={{
          opacity: 1,
          y: 0,
          scale: 1
        }} exit={{
          opacity: 0,
          y: -10,
          scale: 0.95
        }} transition={{
          duration: 0.15
        }} className="absolute left-3 right-3 top-full mt-1 bg-[hsl(0,0%,8%)] border border-white/[0.08] rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50">
                {/* Credit Bar Section */}
                <div className="p-3 border-b border-white/[0.06]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Zap className={`w-4 h-4 ${isLowCredits ? "text-red-400" : "text-primary"}`} />
                      <span className="text-sm font-medium text-white">{totalCredits} créditos</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {balance?.streak && balance.streak > 0 && <div className="flex items-center gap-1 text-xs text-amber-400">
                          <Flame className="w-3 h-3" />
                          <span>{balance.streak}</span>
                        </div>}
                      {balance?.level && <div className="flex items-center gap-1 text-xs text-violet-400">
                          <Crown className="w-3 h-3" />
                          <span>Nv.{balance.level}</span>
                        </div>}
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="relative h-2 bg-white/[0.06] rounded-full overflow-hidden">
                    <motion.div initial={{
                width: 0
              }} animate={{
                width: `${creditPercentage}%`
              }} transition={{
                duration: 0.5,
                ease: "easeOut"
              }} className={`absolute inset-y-0 left-0 rounded-full ${isLowCredits ? "bg-gradient-to-r from-red-500 to-red-400" : "bg-gradient-to-r from-primary to-amber-400"}`} />
                  </div>
                  
                  <div className="flex justify-between mt-1.5">
                    <span className="text-[10px] text-white/30">{balance?.daily?.used || 0} usado hoje</span>
                    <span className="text-[10px] text-white/30 capitalize">{balance?.tier || "free"}</span>
                  </div>
                </div>
                
                <div className="p-1.5">
                  <button onClick={() => {
              setIsDropdownOpen(false);
              if (onOpenSettings) {
                onOpenSettings();
              }
            }} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors">
                    <Settings className="w-4 h-4" />
                    Configurações
                  </button>
                  <button onClick={() => {
              setIsDropdownOpen(false);
              toast.info("Suporte em breve!");
            }} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors">
                    <HelpCircle className="w-4 h-4" />
                    Suporte
                  </button>
                  <button onClick={() => {
              setIsDropdownOpen(false);
              navigate("/pricing");
            }} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors">
                    <Zap className="w-4 h-4" />
                    Comprar Créditos
                  </button>
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
                    <LogOut className="w-4 h-4" />
                    Sair
                  </button>
                </div>
              </motion.div>}
          </AnimatePresence>
        </div>}

      {/* Header */}
      

      {/* AI Tools - Clean List */}
      <div className="flex-1 overflow-y-auto py-3">
        <div className="px-2 space-y-1">
          {aiTools.map(tool => {
          const isSelected = selectedTool === tool.id;
          return <button key={tool.id} onClick={() => onSelectTool(tool.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${collapsed ? 'justify-center' : ''} ${isSelected ? "bg-orange-500/15 text-orange-400 border border-orange-500/20" : "text-white/70 hover:text-white hover:bg-white/[0.04] border border-transparent"}`}>
                <tool.icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-orange-400' : ''}`} />
                {!collapsed && <span className="flex-1 text-left">{tool.name}</span>}
              </button>;
        })}

          {/* Divider */}
          <div className="my-3 mx-3 border-t border-white/[0.06]" />

          {/* Existing Business */}
          <button onClick={() => onSelectTool("existing")} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${collapsed ? 'justify-center' : ''} ${selectedTool === "existing" ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20" : "text-white/70 hover:text-white hover:bg-white/[0.04] border border-transparent"}`}>
            <Building2 className={`w-4 h-4 shrink-0 ${selectedTool === "existing" ? 'text-emerald-400' : ''}`} />
            {!collapsed && <span>Já tenho empresa</span>}
          </button>
        </div>
      </div>

      {/* Collapse Button */}
      <div className="p-2 border-t border-white/[0.06]">
        <button onClick={() => setCollapsed(!collapsed)} className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm text-white/40 hover:text-white hover:bg-white/[0.04] transition-colors">
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {!collapsed && <span className="text-xs">Recolher</span>}
        </button>
      </div>
    </motion.div>;
};
export default AISidebar;