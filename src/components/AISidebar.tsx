import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, Palette, PenTool, FileText, Briefcase, Building2, 
  ChevronLeft, ChevronRight, Code2, ChevronDown, Settings, HelpCircle, 
  LogOut, Zap, Flame, Crown, Copy, MessageSquare, Search, Rocket, ArrowRightLeft,
  FileEdit, Store, GitBranch, RotateCcw, Share2, CheckSquare, HelpCircle as HelpIcon,
  Sparkles, TrendingUp, ShoppingCart, LayoutDashboard, PanelLeftClose, ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useCredits } from "@/hooks/useCredits";
import { useUserRole } from "@/hooks/useUserRole";
import CodiaLogo from "./CodiaLogo";

interface AITool {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  category: "creation" | "sales" | "marketing" | "management";
  plan: "starter" | "pro" | "enterprise";
}

interface Project {
  id: string;
  name: string;
  prompt: string;
  code: string | null;
  created_at: string;
}

// Ferramentas organizadas por categoria - Todas visíveis sem lock
const toolCategories = {
  creation: {
    label: "CRIAÇÃO",
    icon: Sparkles,
    description: "Crie seu negócio do zero",
    tools: [
      { id: "business", name: "Plano de Negócio", description: "Estruture sua empresa", icon: Briefcase, plan: "starter" as const },
      { id: "branding", name: "Branding", description: "Identidade da marca", icon: Palette, plan: "starter" as const },
      { id: "logo", name: "Logo & Visual", description: "Identidade visual", icon: PenTool, plan: "starter" as const },
      { id: "website", name: "Website", description: "Presença online", icon: Globe, plan: "starter" as const },
      { id: "copywriter", name: "Copywriter", description: "Textos persuasivos", icon: FileText, plan: "starter" as const },
      { id: "dev", name: "Desenvolvimento", description: "Código profissional", icon: Code2, plan: "pro" as const },
    ]
  },
  sales: {
    label: "VENDAS",
    icon: ShoppingCart,
    description: "Aumente suas vendas",
    tools: [
      { id: "zap-crm", name: "Zap Commerce + CRM", description: "Vendas via WhatsApp", icon: MessageSquare, plan: "pro" as const },
      { id: "sales-recovery", name: "Recuperador de Vendas", description: "Recupere oportunidades", icon: RotateCcw, plan: "pro" as const },
      { id: "marketplace", name: "Hub Marketplace", description: "Centralize parceiros", icon: Store, plan: "enterprise" as const },
    ]
  },
  marketing: {
    label: "MARKETING",
    icon: TrendingUp,
    description: "Cresça seu alcance",
    tools: [
      { id: "seo", name: "SEO Programático", description: "Apareça no Google", icon: Search, plan: "pro" as const },
      { id: "growth", name: "Growth Engine", description: "Ações de crescimento", icon: Rocket, plan: "pro" as const },
      { id: "copy-thief", name: "Ladrão de Copy", description: "Textos de referência", icon: FileEdit, plan: "pro" as const },
      { id: "social-media", name: "Gerador Social", description: "Conteúdo para redes", icon: Share2, plan: "pro" as const },
    ]
  },
  management: {
    label: "GESTÃO",
    icon: LayoutDashboard,
    description: "Gerencie tudo",
    tools: [
      { id: "site-cloner", name: "Clonador de Site", description: "Inspiração visual", icon: Copy, plan: "pro" as const },
      { id: "migrator", name: "Migrador Universal", description: "Migre plataformas", icon: ArrowRightLeft, plan: "pro" as const },
      { id: "github-sync", name: "Sync GitHub", description: "Versionamento", icon: GitBranch, plan: "pro" as const },
      { id: "checklist", name: "Checklist Status", description: "Progresso do site", icon: CheckSquare, plan: "starter" as const },
      { id: "ai-explainer", name: "IA Explicadora", description: "Tire dúvidas", icon: HelpIcon, plan: "starter" as const },
    ]
  }
};

const planBadges = {
  starter: { label: "Free", color: "bg-emerald-600/20 text-emerald-300 border-emerald-500/30" },
  pro: { label: "Pro", color: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
  enterprise: { label: "Business", color: "bg-violet-500/20 text-violet-300 border-violet-500/30" },
};

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
  const { balance } = useCredits();
  const { isAdmin } = useUserRole();

  // Credit calculations
  const totalCredits = balance?.total || 0;
  const maxCredits = balance?.tier === "free" ? 50 : balance?.tier === "starter" ? 200 : balance?.tier === "pro" ? 500 : 1000;
  const creditPercentage = Math.min(totalCredits / maxCredits * 100, 100);
  const isLowCredits = creditPercentage < 20;
  const userPlan = balance?.tier || "free";

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

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0, width: collapsed ? 56 : 260 }}
      transition={{ duration: 0.2 }}
      className="h-full min-h-0 bg-sidebar border-r border-sidebar-border flex flex-col shrink-0"
    >
      {/* Back Button */}
      {!collapsed && (
        <div className="p-3 border-b border-sidebar-border">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-3 py-2 text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent rounded-lg transition-colors w-full"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>
        </div>
      )}

      {/* User/Workspace Selector with Dropdown */}
      {!collapsed && (
        <div className="p-3 border-b border-sidebar-border relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-sidebar-accent transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sidebar-primary to-emerald-400 flex items-center justify-center text-sidebar-foreground text-sm font-bold shrink-0">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 text-left min-w-0">
              <span className="text-sm text-sidebar-foreground font-medium truncate block">
                {userName}'s Codia
              </span>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-sidebar-foreground/60 capitalize">{userPlan}</span>
                {isAdmin && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">Admin</span>
                )}
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-sidebar-foreground/60 transition-transform shrink-0 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* User Dropdown */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute left-3 right-3 top-full mt-1 bg-sidebar-accent border border-sidebar-border rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50"
              >
                {/* Credit Bar Section */}
                <div className="p-3 border-b border-sidebar-border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Zap className={`w-4 h-4 ${isLowCredits ? "text-red-400" : "text-sidebar-primary"}`} />
                      <span className="text-sm font-medium text-sidebar-foreground">{totalCredits} créditos</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {balance?.streak && balance.streak > 0 && (
                        <div className="flex items-center gap-1 text-xs text-amber-400">
                          <Flame className="w-3 h-3" />
                          <span>{balance.streak}</span>
                        </div>
                      )}
                      {balance?.level && (
                        <div className="flex items-center gap-1 text-xs text-violet-400">
                          <Crown className="w-3 h-3" />
                          <span>Nv.{balance.level}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="relative h-2 bg-sidebar-border rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${creditPercentage}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className={`absolute inset-y-0 left-0 rounded-full ${isLowCredits ? "bg-red-500" : "bg-gradient-to-r from-sidebar-primary to-emerald-400"}`}
                    />
                  </div>
                  
                  <div className="flex justify-between mt-1.5">
                    <span className="text-[10px] text-sidebar-foreground/50">{balance?.daily?.used || 0} usado hoje</span>
                    <span className="text-[10px] text-sidebar-foreground/50 capitalize">{userPlan}</span>
                  </div>
                </div>
                
                <div className="p-1.5">
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      if (onOpenSettings) onOpenSettings();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-border rounded-lg transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    Configurações
                  </button>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      toast.info("Suporte em breve!");
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-border rounded-lg transition-colors"
                  >
                    <HelpCircle className="w-4 h-4" />
                    Suporte
                  </button>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate("/pricing");
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-sidebar-primary hover:bg-sidebar-border rounded-lg transition-colors"
                  >
                    <Zap className="w-4 h-4" />
                    Comprar Créditos
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:bg-sidebar-border rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sair
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Tools by Category - All expanded, no collapsible */}
      <div className="flex-1 overflow-y-auto py-3">
        <div className="px-2 space-y-1">
          {Object.entries(toolCategories).map(([categoryId, category]) => (
            <div key={categoryId} className="mb-2">
              {/* Category Header - Static, no dropdown */}
              {!collapsed && (
                <div className="flex items-center gap-2 px-3 py-2 text-[11px] font-semibold text-sidebar-foreground/50 uppercase tracking-wider">
                  <category.icon className="w-3.5 h-3.5" />
                  <span className="flex-1 text-left">{category.label}</span>
                  <ChevronRight className="w-3 h-3 rotate-90" />
                </div>
              )}

              {/* Category Tools - Always visible */}
              <div className="space-y-0.5">
                {category.tools.map(tool => {
                  const isSelected = selectedTool === tool.id;
                  const badge = planBadges[tool.plan];
                  
                  return (
                    <button
                      key={tool.id}
                      onClick={() => onSelectTool(tool.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all group ${collapsed ? 'justify-center' : ''} ${
                        isSelected 
                          ? "bg-sidebar-primary/20 text-sidebar-primary border border-sidebar-primary/30" 
                          : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent border border-transparent"
                      }`}
                    >
                      <tool.icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-sidebar-primary' : ''}`} />
                      {!collapsed && (
                        <>
                          <div className="flex-1 text-left min-w-0">
                            <span className="block text-sm truncate">{tool.name}</span>
                          </div>
                          {tool.plan !== "starter" && (
                            <span className={`px-1.5 py-0.5 text-[9px] rounded border shrink-0 ${badge.color}`}>
                              {badge.label}
                            </span>
                          )}
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Divider */}
          <div className="my-3 mx-3 border-t border-sidebar-border" />

          {/* Existing Business */}
          <button
            onClick={() => onSelectTool("existing")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${collapsed ? 'justify-center' : ''} ${
              selectedTool === "existing"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent border border-transparent"
            }`}
          >
            <Building2 className={`w-4 h-4 shrink-0 ${selectedTool === "existing" ? 'text-emerald-300' : ''}`} />
            {!collapsed && <span>Já tenho empresa</span>}
          </button>
        </div>
      </div>

      {/* Upgrade Button - Fixed at bottom */}
      {!collapsed && userPlan !== "pro" && userPlan !== "enterprise" && !isAdmin && (
        <div className="p-3 border-t border-sidebar-border">
          <button
            onClick={() => navigate("/pricing")}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-sidebar-primary to-emerald-500 text-sidebar-foreground font-medium text-sm hover:opacity-90 transition-opacity shadow-lg shadow-sidebar-primary/25"
          >
            <Crown className="w-4 h-4" />
            Upgrade para PRO
          </button>
        </div>
      )}

      {/* Collapse Button */}
      <div className="p-2 border-t border-sidebar-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors ${collapsed ? 'justify-center' : ''}`}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <PanelLeftClose className="w-4 h-4" />
              <span>Recolher</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default AISidebar;
