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
  Lock,
  Compass,
  LayoutTemplate,
  GraduationCap,
  PanelLeftClose,
  PanelLeft,
  Store,
  Package,
  ClipboardList,
  Users,
  Percent,
  BarChart3,
  Paintbrush,
  CreditCard,
  Bot,
  Globe,
  Sparkles,
  Share2
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

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

// Overview items - Shopify style
const overviewItems: NavItem[] = [
  { id: "my-site", label: "Meu Site", icon: Globe },
  { id: "my-store", label: "Minha Loja", icon: Store },
  { id: "products", label: "Produtos", icon: Package },
  { id: "orders", label: "Pedidos", icon: ClipboardList },
  { id: "customers", label: "Clientes", icon: Users },
  { id: "discounts", label: "Descontos", icon: Percent },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "customize", label: "Personalizar", icon: Paintbrush },
  { id: "plan", label: "Plano", icon: CreditCard },
  { id: "settings", label: "Configurações", icon: Settings },
];

const resourceItems: NavItem[] = [
  { id: "discover", label: "Descobrir", icon: Compass },
  { id: "templates", label: "Templates", icon: LayoutTemplate },
  { id: "docs", label: "Documentação", icon: GraduationCap },
  { id: "referral", label: "Indicar", icon: Share2 },
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
  const [expandedSections, setExpandedSections] = useState<string[]>(["overview", "creation", "sales", "marketing", "management"]);
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
    } else if (id === "settings") {
      navigate("/settings");
    } else if (id === "plan") {
      navigate("/plan");
    } else if (id === "my-site") {
      navigate("/my-site");
    } else if (id === "my-store") {
      navigate("/my-store");
    } else if (id === "products") {
      navigate("/store/products");
    } else if (id === "orders") {
      navigate("/store/orders");
    } else if (id === "customers") {
      navigate("/store/customers");
    } else if (id === "discounts") {
      navigate("/store/discounts");
    } else if (id === "analytics") {
      navigate("/analytics");
    } else if (id === "customize") {
      navigate("/customize");
    }
  };

  // Collapsed state
  if (collapsed) {
    return (
      <motion.aside
        initial={{ width: 72 }}
        animate={{ width: 72 }}
        className="h-screen sticky top-0 bg-[#0f0f0f] border-r border-border/50 flex flex-col"
      >
        <div className="p-4 flex justify-center">
          <button
            onClick={onToggleCollapse}
            className="p-2.5 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
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
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
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
      className="h-screen sticky top-0 bg-[#0f0f0f] border-r border-border/50 flex flex-col"
    >
      {/* Header with Logo */}
      <div className="p-4 flex items-center justify-between">
        <CodiaLogo size="md" animated />
        <button
          onClick={onToggleCollapse}
          className="p-2 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
        >
          <PanelLeftClose className="w-4 h-4" />
        </button>
      </div>

      {/* User/Account Selector */}
      <div className="px-3 pb-3 relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-secondary/50 transition-colors group"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center text-primary-foreground text-sm font-bold">
            {userName.charAt(0).toUpperCase()}
          </div>
          <span className="flex-1 text-left text-sm text-foreground font-medium truncate">
            {userName}'s Codia
          </span>
          <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* User Dropdown */}
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.12 }}
              className="absolute left-3 right-3 top-full mt-1 bg-card border border-border rounded-xl shadow-2xl shadow-black/80 overflow-hidden z-50"
            >
              {/* Credits */}
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Zap className={`w-4 h-4 ${isLowCredits ? "text-destructive" : "text-primary"}`} />
                    <span className="text-sm font-semibold text-foreground">{totalCredits} créditos</span>
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
                
                <div className="relative h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${creditPercentage}%` }}
                    transition={{ duration: 0.5 }}
                    className={`absolute inset-y-0 left-0 rounded-full ${
                      isLowCredits ? "bg-destructive" : "bg-gradient-to-r from-primary to-orange-400"
                    }`}
                  />
                </div>
              </div>
              
              <div className="p-1.5">
                <button
                  onClick={() => { setIsDropdownOpen(false); onOpenSettings?.(); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Configurações
                </button>
                <button
                  onClick={() => { setIsDropdownOpen(false); toast.info("Suporte em breve"); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
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

      {/* New Project Button - Premium Orange with Glow */}
      <div className="px-3 pb-4">
        <motion.button
          onClick={onNewProject}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm transition-all glow-orange"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Projeto / Criar Empresa</span>
        </motion.button>
      </div>

      {/* Scrollable Nav */}
      <nav className="flex-1 overflow-y-auto px-3 pb-3 scrollbar-thin">
        {/* Overview Section - Shopify style - only when user has store */}
        {hasStore && (
          <div className="mb-2">
            <button
              onClick={() => toggleSection("overview")}
              className="w-full flex items-center justify-between px-2 py-2 text-xs font-medium text-muted-foreground/70 uppercase tracking-wide hover:text-muted-foreground transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5" />
                <span>Visão Geral</span>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${
                expandedSections.includes("overview") ? 'rotate-90' : ''
              }`} />
            </button>
            
            <AnimatePresence initial={false}>
              {expandedSections.includes("overview") && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-0.5 mt-0.5 pl-1">
                    {overviewItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleItemClick(item.id)}
                        className={`w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg text-sm transition-all ${
                          currentSection === item.id
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span className="truncate">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Resources Section */}
        <div className="mt-4 pt-3 border-t border-border/50">
          <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground/70 uppercase tracking-wide">
            Recursos
          </p>
          <div className="space-y-0.5 pl-1">
            {resourceItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id, item.id === "templates" ? onOpenTemplates : undefined)}
                className="w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
              >
                <item.icon className="w-4 h-4" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.id === "referral" && (
                  <span className="text-[10px] font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
                    +10
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Footer - Upgrade */}
      {balance?.tier !== "pro" && balance?.tier !== "enterprise" && (
        <div className="p-3 border-t border-border">
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
