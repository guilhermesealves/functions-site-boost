import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  ChevronDown,
  ChevronRight,
  Plus,
  Settings,
  LogOut,
  HelpCircle,
  Zap,
  Flame,
  Crown,
  Building2,
  Briefcase,
  Palette,
  PenTool,
  Globe,
  FileText,
  Code,
  MessageSquare,
  TrendingUp,
  Search as SearchIcon,
  Link as LinkIcon,
  ShoppingCart,
  Target,
  Sparkles,
  Copy,
  Share2,
  Lock,
  Compass,
  LayoutTemplate,
  GraduationCap,
  PanelLeftClose,
  PanelLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import CodiaLogo from "./CodiaLogo";
import { useCredits } from "@/hooks/useCredits";
import { useStore } from "@/hooks/useStore";

interface MainSidebarProps {
  userName?: string;
  onNavigate?: (section: string) => void;
  onOpenTemplates?: () => void;
  onOpenSettings?: () => void;
  currentSection?: string;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  onNewProject?: () => void;
}

interface NavSection {
  id: string;
  label: string;
  items: {
    id: string;
    label: string;
    icon: React.ElementType;
    locked?: boolean;
    tier?: "Pro" | "Business";
  }[];
}

const toolSections: NavSection[] = [
  {
    id: "creation",
    label: "CRIAÇÃO",
    items: [
      { id: "business", label: "Plano de Negócio", icon: Briefcase },
      { id: "branding", label: "Branding", icon: Palette },
      { id: "logo", label: "Logo & Visual", icon: PenTool },
      { id: "website", label: "Website", icon: Globe },
      { id: "copywriter", label: "Copywriter", icon: FileText },
      { id: "development", label: "Desenvolvimento", icon: Code, locked: true, tier: "Pro" },
    ]
  },
  {
    id: "sales",
    label: "VENDAS",
    items: [
      { id: "zap-commerce", label: "Zap Commerce + CRM", icon: MessageSquare, locked: true, tier: "Pro" },
      { id: "sales-recovery", label: "Recuperador de Vendas", icon: TrendingUp, locked: true, tier: "Pro" },
      { id: "marketplace", label: "Hub Marketplace", icon: ShoppingCart, locked: true, tier: "Business" },
    ]
  },
  {
    id: "marketing",
    label: "MARKETING",
    items: [
      { id: "seo", label: "SEO Programático", icon: SearchIcon, locked: true, tier: "Pro" },
      { id: "growth", label: "Growth Engine", icon: Target, locked: true, tier: "Pro" },
      { id: "copy-thief", label: "Ladrão de Copy", icon: Copy, locked: true, tier: "Pro" },
      { id: "social", label: "Gerador Social", icon: Share2, locked: true, tier: "Pro" },
    ]
  },
  {
    id: "management",
    label: "GESTÃO",
    items: [
      { id: "cloner", label: "Clonador de Site", icon: LinkIcon, locked: true, tier: "Pro" },
      { id: "migrator", label: "Migrador", icon: Sparkles, locked: true, tier: "Pro" },
    ]
  }
];

const resourceItems = [
  { id: "discover", label: "Descobrir", icon: Compass },
  { id: "templates", label: "Templates", icon: LayoutTemplate },
  { id: "docs", label: "Documentação", icon: GraduationCap },
  { id: "referral", label: "Indicar", icon: Share2, badge: "+10" },
];

const MainSidebar = ({ 
  userName = "Usuário", 
  onNavigate, 
  onOpenTemplates,
  onOpenSettings,
  currentSection = "home",
  collapsed = false,
  onToggleCollapse,
  onNewProject
}: MainSidebarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(["creation"]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { balance } = useCredits();
  const { store, hasStore } = useStore();
  
  const totalCredits = balance?.total || 0;
  const maxCredits = balance?.tier === "free" ? 50 : balance?.tier === "starter" ? 200 : balance?.tier === "pro" ? 500 : 1000;
  const creditPercentage = Math.min((totalCredits / maxCredits) * 100, 100);
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
    toast.success("Sessão encerrada");
    navigate("/");
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleItemClick = (id: string, action?: () => void) => {
    if (action) {
      action();
    } else if (id === "discover") {
      navigate("/discover");
    } else if (id === "docs") {
      navigate("/learn");
    } else if (id === "templates") {
      onOpenTemplates?.();
    } else {
      onNavigate?.(id);
    }
  };

  if (collapsed) {
    return (
      <motion.aside
        initial={{ width: 72 }}
        animate={{ width: 72 }}
        className="h-screen sticky top-0 bg-[#020202] border-r border-white/[0.04] flex flex-col"
      >
        <div className="p-4 flex justify-center">
          <button
            onClick={onToggleCollapse}
            className="p-2.5 rounded-xl hover:bg-white/[0.04] text-white/40 hover:text-white transition-colors"
          >
            <PanelLeft className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1">
          <button
            onClick={() => handleItemClick("home")}
            className={`w-full p-3 rounded-xl flex items-center justify-center transition-colors ${
              currentSection === "home"
                ? "bg-primary/10 text-primary"
                : "text-white/40 hover:text-white hover:bg-white/[0.04]"
            }`}
            title="Início"
          >
            <Home className="w-5 h-5" />
          </button>
        </nav>
      </motion.aside>
    );
  }

  return (
    <motion.aside
      initial={{ width: 280 }}
      animate={{ width: 280 }}
      className="h-screen sticky top-0 bg-[#020202] border-r border-white/[0.04] flex flex-col"
    >
      {/* Header with Logo */}
      <div className="p-4 flex items-center justify-between">
        <CodiaLogo size="md" animated />
        <button
          onClick={onToggleCollapse}
          className="p-2 rounded-xl hover:bg-white/[0.04] text-white/30 hover:text-white transition-colors"
        >
          <PanelLeftClose className="w-4 h-4" />
        </button>
      </div>

      {/* User/Account Selector */}
      <div className="px-3 pb-3 relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/[0.03] transition-colors group"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center text-black text-sm font-bold">
            {userName.charAt(0).toUpperCase()}
          </div>
          <span className="flex-1 text-left text-sm text-white font-medium truncate">
            {userName}'s Codia
          </span>
          <ChevronDown className={`w-4 h-4 text-white/30 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* User Dropdown */}
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.12 }}
              className="absolute left-3 right-3 top-full mt-1 bg-[#0a0a0a] border border-white/[0.06] rounded-xl shadow-2xl shadow-black/80 overflow-hidden z-50"
            >
              {/* Credits */}
              <div className="p-4 border-b border-white/[0.04]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Zap className={`w-4 h-4 ${isLowCredits ? "text-red-400" : "text-primary"}`} />
                    <span className="text-sm font-semibold text-white">{totalCredits} créditos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {balance?.streak && balance.streak > 0 && (
                      <div className="flex items-center gap-1 text-xs text-orange-400">
                        <Flame className="w-3 h-3" />
                        <span>{balance.streak}</span>
                      </div>
                    )}
                    {balance?.level && (
                      <div className="flex items-center gap-1 text-xs text-purple-400">
                        <Crown className="w-3 h-3" />
                        <span>Lv.{balance.level}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="relative h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${creditPercentage}%` }}
                    transition={{ duration: 0.5 }}
                    className={`absolute inset-y-0 left-0 rounded-full ${
                      isLowCredits ? "bg-red-500" : "bg-gradient-to-r from-primary to-orange-400"
                    }`}
                  />
                </div>
              </div>
              
              <div className="p-1.5">
                <button
                  onClick={() => { setIsDropdownOpen(false); onOpenSettings?.(); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/[0.03] rounded-lg transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Configurações
                </button>
                <button
                  onClick={() => { setIsDropdownOpen(false); toast.info("Suporte em breve"); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/[0.03] rounded-lg transition-colors"
                >
                  <HelpCircle className="w-4 h-4" />
                  Suporte
                </button>
                <button
                  onClick={() => { setIsDropdownOpen(false); navigate("/pricing"); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors"
                >
                  <Zap className="w-4 h-4" />
                  Comprar Créditos
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* New Project Button - Premium Orange */}
      <div className="px-3 pb-4">
        <motion.button
          onClick={onNewProject}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-black font-bold text-sm transition-all glow-orange"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Projeto</span>
        </motion.button>
      </div>

      {/* My Company */}
      {hasStore && (
        <div className="px-3 pb-3">
          <button
            onClick={() => onNavigate?.("my-company")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
              currentSection === "my-company"
                ? "bg-primary/10 text-primary border border-primary/20"
                : "text-white/50 hover:text-white hover:bg-white/[0.03]"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span className="truncate">{store?.name || "Minha Empresa"}</span>
          </button>
        </div>
      )}

      {/* Scrollable Nav */}
      <nav className="flex-1 overflow-y-auto px-3 pb-3">
        {/* Home */}
        <button
          onClick={() => handleItemClick("home")}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm mb-4 transition-colors ${
            currentSection === "home"
              ? "bg-primary/10 text-white font-semibold"
              : "text-white/50 hover:text-white hover:bg-white/[0.03]"
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Início</span>
        </button>

        {/* Tool Sections - Collapsible */}
        {toolSections.map((section) => (
          <div key={section.id} className="mb-3">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between px-3 py-2 text-[11px] font-semibold text-white/30 uppercase tracking-wider hover:text-white/50 transition-colors"
            >
              <span>{section.label}</span>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${
                expandedSections.includes(section.id) ? 'rotate-90' : ''
              }`} />
            </button>
            
            <AnimatePresence>
              {expandedSections.includes(section.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-0.5 mt-1">
                    {section.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => !item.locked && handleItemClick(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                          item.locked 
                            ? "text-white/20 cursor-default"
                            : currentSection === item.id
                              ? "bg-primary/10 text-white font-medium"
                              : "text-white/50 hover:text-white hover:bg-white/[0.03]"
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span className="flex-1 text-left truncate">{item.label}</span>
                        {item.locked && item.tier && (
                          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-semibold">
                            <Lock className="w-2.5 h-2.5" />
                            {item.tier}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {/* Resources Section */}
        <div className="mt-6 pt-4 border-t border-white/[0.04]">
          <p className="px-3 py-2 text-[11px] font-semibold text-white/30 uppercase tracking-wider">
            RECURSOS
          </p>
          <div className="space-y-0.5">
            {resourceItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id, item.id === "templates" ? onOpenTemplates : undefined)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/[0.03] transition-colors"
              >
                <item.icon className="w-4 h-4" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Footer - Upgrade */}
      {balance?.tier !== "pro" && balance?.tier !== "enterprise" && (
        <div className="p-3 border-t border-white/[0.04]">
          <button 
            onClick={() => navigate("/pricing")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm bg-primary/10 hover:bg-primary/20 text-primary font-medium transition-colors"
          >
            <Zap className="w-4 h-4" />
            <span className="flex-1 text-left">Assinar Pro</span>
            <span className="text-primary/60">→</span>
          </button>
        </div>
      )}
    </motion.aside>
  );
};

export default MainSidebar;