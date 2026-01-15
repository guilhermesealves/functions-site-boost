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
  const [expandedSections, setExpandedSections] = useState<string[]>(["overview"]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { balance } = useCredits();
  const { hasStore } = useStore();
  
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
        className="h-screen sticky top-0 bg-[#f9f8f4] border-r border-[#e8e4d5] flex flex-col"
      >
        <div className="p-4 flex justify-center">
          <button
            onClick={onToggleCollapse}
            className="p-2.5 rounded-xl hover:bg-[#e8e4d5] text-[#135215]/60 hover:text-[#135215] transition-colors"
          >
            <PanelLeft className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1">
          <button
            onClick={() => handleItemClick("home")}
            className={`w-full p-3 rounded-xl flex items-center justify-center transition-colors ${
              currentSection === "home"
                ? "bg-[rgba(19,82,21,0.08)] text-[#135215]"
                : "text-[#135215]/60 hover:text-[#135215] hover:bg-[#e8e4d5]"
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
      className="h-screen sticky top-0 bg-[#f9f8f4] border-r border-[#e8e4d5] flex flex-col"
    >
      {/* Header with Logo */}
      <div className="p-4 flex items-center justify-between">
        <CodiaLogo size="md" animated />
        <button
          onClick={onToggleCollapse}
          className="p-2 rounded-xl hover:bg-[#e8e4d5] text-[#135215]/60 hover:text-[#135215] transition-colors"
        >
          <PanelLeftClose className="w-4 h-4" />
        </button>
      </div>

      {/* User/Account Selector */}
      <div className="px-3 pb-3 relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#e8e4d5]/50 transition-colors group"
        >
          <div className="w-8 h-8 rounded-xl bg-[#135215] flex items-center justify-center text-white text-sm font-bold">
            {userName.charAt(0).toUpperCase()}
          </div>
          <span className="flex-1 text-left text-sm text-[#135215] font-medium truncate">
            {userName}'s Codia
          </span>
          <ChevronDown className={`w-4 h-4 text-[#135215]/60 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* User Dropdown */}
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.12 }}
              className="absolute left-3 right-3 top-full mt-1 bg-white border border-[#e8e4d5] rounded-xl shadow-lg overflow-hidden z-50"
            >
              {/* Credits */}
              <div className="p-4 border-b border-[#e8e4d5]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Zap className={`w-4 h-4 ${isLowCredits ? "text-red-500" : "text-[#135215]"}`} />
                    <span className="text-sm font-semibold text-[#135215]">{totalCredits} créditos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {balance?.streak && balance.streak > 0 && (
                      <div className="flex items-center gap-1 text-xs text-orange-500">
                        <Flame className="w-3 h-3" />
                        <span>{balance.streak}</span>
                      </div>
                    )}
                    {balance?.level && (
                      <div className="flex items-center gap-1 text-xs text-purple-500">
                        <Crown className="w-3 h-3" />
                        <span>Lv.{balance.level}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="relative h-1.5 bg-[#e8e4d5] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${creditPercentage}%` }}
                    transition={{ duration: 0.5 }}
                    className={`absolute inset-y-0 left-0 rounded-full ${
                      isLowCredits ? "bg-red-500" : "bg-[#135215]"
                    }`}
                  />
                </div>
              </div>
              
              <div className="p-1.5">
                <button
                  onClick={() => { setIsDropdownOpen(false); onOpenSettings?.(); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-[#135215]/70 hover:text-[#135215] hover:bg-[#e8e4d5] rounded-lg transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Configurações
                </button>
                <button
                  onClick={() => { setIsDropdownOpen(false); toast.info("Suporte em breve"); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-[#135215]/70 hover:text-[#135215] hover:bg-[#e8e4d5] rounded-lg transition-colors"
                >
                  <HelpCircle className="w-4 h-4" />
                  Suporte
                </button>
                <button
                  onClick={() => { setIsDropdownOpen(false); navigate("/pricing"); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-[#135215] hover:bg-[rgba(19,82,21,0.08)] rounded-lg transition-colors"
                >
                  <Zap className="w-4 h-4" />
                  Comprar Créditos
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* New Project Button - Premium Green with Glow */}
      <div className="px-3 pb-4">
        <motion.button
          onClick={onNewProject}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#135215] hover:bg-[#0f4010] text-white font-bold text-sm transition-all shadow-[0_0_15px_rgba(19,82,21,0.3)] hover:shadow-[0_0_20px_rgba(19,82,21,0.4)]"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Projeto / Criar Empresa</span>
        </motion.button>
      </div>

      {/* Scrollable Nav */}
      <nav className="flex-1 overflow-y-auto px-3 pb-3">
        {/* Overview Section - Shopify style - only when user has store */}
        {hasStore && (
          <div className="mb-3">
            <button
              onClick={() => toggleSection("overview")}
              className="w-full flex items-center justify-between px-3 py-2 text-[11px] font-semibold text-[#135215]/60 uppercase tracking-wider hover:text-[#135215]/80 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Home className="w-3.5 h-3.5" />
                <span>VISÃO GERAL</span>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${
                expandedSections.includes("overview") ? 'rotate-90' : ''
              }`} />
            </button>
            
            <AnimatePresence>
              {expandedSections.includes("overview") && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-0.5 mt-1">
                    {overviewItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleItemClick(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                          currentSection === item.id
                            ? "bg-[rgba(19,82,21,0.08)] text-[#135215] font-medium"
                            : "text-[#135215]/70 hover:text-[#135215] hover:bg-[#e8e4d5]"
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span className="flex-1 text-left truncate">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* AI Assistant Section */}
        <div className="mb-3 p-3 rounded-xl bg-[rgba(19,82,21,0.05)] border border-[rgba(19,82,21,0.15)]">
          <div className="flex items-center gap-2 mb-2">
            <Bot className="w-4 h-4 text-[#135215]" />
            <span className="text-xs font-semibold text-[#135215] uppercase tracking-wider">IA Assistente</span>
          </div>
          <p className="text-xs text-[#135215]/60 mb-3">
            Deixe a IA gerenciar sua loja automaticamente
          </p>
          <button className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-[#135215] hover:bg-[#0f4010] text-white text-sm font-semibold transition-all shadow-[0_0_10px_rgba(19,82,21,0.25)] hover:shadow-[0_0_15px_rgba(19,82,21,0.35)]">
            <Sparkles className="w-4 h-4" />
            Ativar IA
          </button>
        </div>

        {/* Resources Section */}
        <div className="mt-6 pt-4 border-t border-[#e8e4d5]">
          <p className="px-3 py-2 text-[11px] font-semibold text-[#135215]/60 uppercase tracking-wider">
            RECURSOS
          </p>
          <div className="space-y-0.5">
            {resourceItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id, item.id === "templates" ? onOpenTemplates : undefined)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#135215]/70 hover:text-[#135215] hover:bg-[#e8e4d5] transition-colors"
              >
                <item.icon className="w-4 h-4" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.id === "referral" && (
                  <span className="text-[10px] font-semibold text-[#135215] bg-[rgba(19,82,21,0.1)] px-1.5 py-0.5 rounded">
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
        <div className="p-3 border-t border-[#e8e4d5]">
          <button 
            onClick={() => navigate("/pricing")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm bg-[rgba(19,82,21,0.08)] hover:bg-[rgba(19,82,21,0.12)] text-[#135215] font-medium transition-colors"
          >
            <Zap className="w-4 h-4" />
            <span className="flex-1 text-left">Assinar Pro</span>
            <span className="text-[#135215]/60">→</span>
          </button>
        </div>
      )}
    </motion.aside>
  );
};

export default MainSidebar;
