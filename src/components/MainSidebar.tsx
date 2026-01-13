import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  Search, 
  FolderOpen, 
  Star,
  Users, 
  Compass, 
  LayoutTemplate, 
  GraduationCap,
  Share2,
  Zap,
  ChevronDown,
  PanelLeftClose,
  PanelLeft,
  Plus,
  Settings,
  LogOut,
  HelpCircle,
  Flame,
  Crown,
  Building2
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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { balance } = useCredits();
  const { store, hasStore } = useStore();
  
  // Credit calculations
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

  const mainNavItems = [
    { id: "home", label: "Início", icon: Home, shortcut: "" },
    { id: "search", label: "Buscar", icon: Search, shortcut: "Ctrl+K" },
  ];

  const projectItems = [
    { id: "all-projects", label: "Projetos", icon: FolderOpen },
    { id: "starred", label: "Favoritos", icon: Star },
    { id: "shared", label: "Compartilhados", icon: Users },
  ];

  const resourceItems = [
    { id: "discover", label: "Descobrir", icon: Compass },
    { id: "templates", label: "Templates", icon: LayoutTemplate, action: onOpenTemplates },
    { id: "learn", label: "Documentação", icon: GraduationCap },
  ];

  const handleItemClick = (id: string, action?: () => void) => {
    if (action) {
      action();
    } else if (id === "search") {
      toast.info("Busca disponível em breve");
    } else if (id === "discover") {
      navigate("/discover");
    } else if (id === "learn") {
      navigate("/learn");
    } else {
      onNavigate?.(id);
    }
  };

  if (collapsed) {
    return (
      <motion.aside
        initial={{ width: 60 }}
        animate={{ width: 60 }}
        className="h-screen sticky top-0 bg-[hsl(0,0%,6%)] border-r border-white/[0.06] flex flex-col"
      >
        {/* Collapsed Header */}
        <div className="p-3 flex justify-center">
          <button
            onClick={onToggleCollapse}
            className="p-2 rounded-lg hover:bg-white/[0.04] text-white/60 hover:text-white transition-colors"
          >
            <PanelLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Collapsed Nav */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {mainNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`w-full p-3 rounded-lg flex items-center justify-center transition-colors ${
                currentSection === item.id
                  ? "bg-white/[0.08] text-white"
                  : "text-white/50 hover:text-white hover:bg-white/[0.04]"
              }`}
              title={item.label}
            >
              <item.icon className="w-5 h-5" />
            </button>
          ))}
        </nav>
      </motion.aside>
    );
  }

  return (
    <motion.aside
      initial={{ width: 260 }}
      animate={{ width: 260 }}
      className="h-screen sticky top-0 bg-[hsl(0,0%,6%)] border-r border-white/[0.06] flex flex-col"
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-white/[0.04]">
        <CodiaLogo size="md" animated />
        <button
          onClick={onToggleCollapse}
          className="p-2 rounded-lg hover:bg-white/[0.04] text-white/40 hover:text-white transition-colors"
        >
          <PanelLeftClose className="w-4 h-4" />
        </button>
      </div>

      {/* User/Workspace Selector with Dropdown */}
      <div className="p-3 relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/[0.04] transition-colors group"
        >
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
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute left-3 right-3 top-full mt-1 bg-[hsl(0,0%,8%)] border border-white/[0.08] rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50"
            >
              {/* Credit Bar Section */}
              <div className="p-3 border-b border-white/[0.06]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Zap className={`w-4 h-4 ${isLowCredits ? "text-red-400" : "text-primary"}`} />
                    <span className="text-sm font-medium text-white">{totalCredits} créditos</span>
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
                <div className="relative h-2 bg-white/[0.06] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${creditPercentage}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`absolute inset-y-0 left-0 rounded-full ${
                      isLowCredits 
                        ? "bg-gradient-to-r from-red-500 to-red-400" 
                        : "bg-gradient-to-r from-primary to-amber-400"
                    }`}
                  />
                </div>
                
                <div className="flex justify-between mt-1.5">
                  <span className="text-[10px] text-white/30">{balance?.daily?.used || 0} usado hoje</span>
                  <span className="text-[10px] text-white/30 capitalize">{balance?.tier || "free"}</span>
                </div>
              </div>
              
              <div className="p-1.5">
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    if (onOpenSettings) {
                      onOpenSettings();
                    }
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Configurações
                </button>
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    toast.info("Suporte em breve!");
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors"
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
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* My Company Section */}
      {hasStore && (
        <div className="px-3 mb-2">
          <button
            onClick={() => onNavigate?.("my-company")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
              currentSection === "my-company"
                ? "bg-primary/15 text-primary border border-primary/20"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50 border border-transparent"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span className="flex-1 text-left truncate">{store?.name || "Minha Empresa"}</span>
          </button>
        </div>
      )}

      {/* Create New Project Button */}
      <div className="px-3 mb-2">
        <button
          onClick={onNewProject}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-medium transition-all shadow-lg shadow-primary/20"
        >
          <Plus className="w-4 h-4" />
          <span>Novo projeto</span>
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-2">
        {/* Primary Nav */}
        <div className="space-y-0.5 mb-6">
          {mainNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                currentSection === item.id
                  ? "bg-white/[0.08] text-white"
                  : "text-white/60 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.shortcut && (
                <span className="text-xs text-white/30">{item.shortcut}</span>
              )}
            </button>
          ))}
        </div>

        {/* Projects Section */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-white/30 uppercase tracking-wider px-3 mb-2">
            Projetos
          </h3>
          <div className="space-y-0.5">
            {projectItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  currentSection === item.id
                    ? "bg-white/[0.08] text-white"
                    : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Resources Section */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-white/30 uppercase tracking-wider px-3 mb-2">
            Recursos
          </h3>
          <div className="space-y-0.5">
            {resourceItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id, item.action)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  currentSection === item.id
                    ? "bg-white/[0.08] text-white"
                    : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Footer Actions */}
      <div className="p-3 border-t border-white/[0.04] space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors">
          <Share2 className="w-4 h-4" />
          <span className="flex-1 text-left">Indicar</span>
          <span className="text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded">+10</span>
        </button>
        
        {balance?.tier !== "pro" && balance?.tier !== "enterprise" && (
          <button 
            onClick={() => navigate("/pricing")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            <Zap className="w-4 h-4" />
            <span className="flex-1 text-left">Assinar Pro</span>
            <span className="text-primary/70">→</span>
          </button>
        )}
      </div>
    </motion.aside>
  );
};

export default MainSidebar;
