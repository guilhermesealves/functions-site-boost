import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, Palette, PenTool, FileText, Briefcase, Building2, 
  ChevronLeft, ChevronRight, Code2, ChevronDown, Settings, HelpCircle, 
  LogOut, Zap, Flame, Crown, Copy, MessageSquare, Search, Rocket, ArrowRightLeft,
  FileEdit, Store, GitBranch, RotateCcw, Share2, CheckSquare, HelpCircle as HelpIcon,
  Sparkles, Lock, TrendingUp, ShoppingCart, LayoutDashboard
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

// Ferramentas organizadas por categoria
const toolCategories = {
  creation: {
    label: "Criação",
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
    label: "Vendas",
    icon: ShoppingCart,
    description: "Aumente suas vendas",
    tools: [
      { id: "zap-crm", name: "Zap Commerce + CRM", description: "Vendas via WhatsApp", icon: MessageSquare, plan: "pro" as const },
      { id: "sales-recovery", name: "Recuperador de Vendas", description: "Recupere oportunidades", icon: RotateCcw, plan: "pro" as const },
      { id: "marketplace", name: "Hub Marketplace", description: "Centralize parceiros", icon: Store, plan: "enterprise" as const },
    ]
  },
  marketing: {
    label: "Marketing",
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
    label: "Gestão",
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
  starter: { label: "Free", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  pro: { label: "Pro", color: "bg-primary/20 text-primary border-primary/30" },
  enterprise: { label: "Business", color: "bg-violet-500/20 text-violet-400 border-violet-500/30" },
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
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["creation"]);
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

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Admin tem acesso a tudo, senão verifica o plano
  const canAccessTool = (toolPlan: string) => {
    if (isAdmin) return true;
    const planOrder = ["free", "starter", "pro", "enterprise"];
    const userPlanIndex = planOrder.indexOf(userPlan);
    const toolPlanIndex = planOrder.indexOf(toolPlan);
    return userPlanIndex >= toolPlanIndex || toolPlan === "starter";
  };

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0, width: collapsed ? 56 : 260 }}
      transition={{ duration: 0.2 }}
      className="h-[calc(100vh-64px)] bg-[hsl(0,0%,4%)] border-r border-border/50 flex flex-col shrink-0"
    >
      {/* User/Workspace Selector with Dropdown */}
      {!collapsed && (
        <div className="p-3 border-b border-border/50 relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary/50 transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-amber-500 flex items-center justify-center text-white text-sm font-bold">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 text-left">
              <span className="text-sm text-foreground font-medium truncate block">
                {userName}'s Codia
              </span>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-muted-foreground capitalize">{userPlan}</span>
                {isAdmin && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-destructive/20 text-destructive border border-destructive/30">Admin</span>
                )}
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* User Dropdown */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute left-3 right-3 top-full mt-1 bg-card border border-border rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50"
              >
                {/* Credit Bar Section */}
                <div className="p-3 border-b border-border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Zap className={`w-4 h-4 ${isLowCredits ? "text-destructive" : "text-primary"}`} />
                      <span className="text-sm font-medium text-foreground">{totalCredits} créditos</span>
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
                  <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${creditPercentage}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className={`absolute inset-y-0 left-0 rounded-full ${isLowCredits ? "bg-destructive" : "bg-gradient-to-r from-primary to-amber-400"}`}
                    />
                  </div>
                  
                  <div className="flex justify-between mt-1.5">
                    <span className="text-[10px] text-muted-foreground">{balance?.daily?.used || 0} usado hoje</span>
                    <span className="text-[10px] text-muted-foreground capitalize">{userPlan}</span>
                  </div>
                </div>
                
                <div className="p-1.5">
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      if (onOpenSettings) onOpenSettings();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    Configurações
                  </button>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      toast.info("Suporte em breve!");
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
                  >
                    <HelpCircle className="w-4 h-4" />
                    Suporte
                  </button>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate("/pricing");
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors"
                  >
                    <Zap className="w-4 h-4" />
                    Comprar Créditos
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
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

      {/* Tools by Category */}
      <div className="flex-1 overflow-y-auto py-3">
        <div className="px-2 space-y-1">
          {Object.entries(toolCategories).map(([categoryId, category]) => (
            <div key={categoryId} className="mb-2">
              {/* Category Header */}
              {!collapsed && (
                <button
                  onClick={() => toggleCategory(categoryId)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
                >
                  <category.icon className="w-3.5 h-3.5" />
                  <span className="flex-1 text-left">{category.label}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${expandedCategories.includes(categoryId) ? '' : '-rotate-90'}`} />
                </button>
              )}

              {/* Category Tools */}
              <AnimatePresence>
                {(collapsed || expandedCategories.includes(categoryId)) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    {category.tools.map(tool => {
                      const isSelected = selectedTool === tool.id;
                      const hasAccess = canAccessTool(tool.plan);
                      const badge = planBadges[tool.plan];
                      
                      return (
                        <button
                          key={tool.id}
                          onClick={() => {
                            // Sempre permite abrir a ferramenta para ver
                            onSelectTool(tool.id);
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all group ${collapsed ? 'justify-center' : ''} ${
                            isSelected 
                              ? "bg-primary/15 text-primary border border-primary/20" 
                              : "text-muted-foreground hover:text-foreground hover:bg-secondary/50 border border-transparent"
                          }`}
                        >
                          <tool.icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-primary' : ''}`} />
                          {!collapsed && (
                            <>
                              <div className="flex-1 text-left">
                                <span className="block text-sm">{tool.name}</span>
                              </div>
                              {!hasAccess && (
                                <Lock className="w-3 h-3 text-muted-foreground/50" />
                              )}
                              {tool.plan !== "starter" && (
                                <span className={`px-1.5 py-0.5 text-[9px] rounded border ${badge.color}`}>
                                  {badge.label}
                                </span>
                              )}
                            </>
                          )}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* Divider */}
          <div className="my-3 mx-3 border-t border-border/50" />

          {/* Existing Business */}
          <button
            onClick={() => onSelectTool("existing")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${collapsed ? 'justify-center' : ''} ${
              selectedTool === "existing"
                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50 border border-transparent"
            }`}
          >
            <Building2 className={`w-4 h-4 shrink-0 ${selectedTool === "existing" ? 'text-emerald-400' : ''}`} />
            {!collapsed && <span>Já tenho empresa</span>}
          </button>
        </div>
      </div>

      {/* Upgrade Button - Fixed at bottom */}
      {!collapsed && userPlan !== "pro" && userPlan !== "enterprise" && !isAdmin && (
        <div className="p-3 border-t border-border/50">
          <button
            onClick={() => navigate("/pricing")}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-amber-500 text-white font-medium text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
          >
            <Crown className="w-4 h-4" />
            Upgrade para PRO
          </button>
        </div>
      )}

      {/* Collapse Button */}
      <div className="p-2 border-t border-border/50">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {!collapsed && <span className="text-xs">Recolher</span>}
        </button>
      </div>
    </motion.div>
  );
};

export default AISidebar;
