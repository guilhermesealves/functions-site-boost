import { useState } from "react";
import { motion } from "framer-motion";
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
  PanelLeft
} from "lucide-react";
import CodiaLogo from "./CodiaLogo";

interface MainSidebarProps {
  userName?: string;
  onNavigate?: (section: string) => void;
  onOpenTemplates?: () => void;
  currentSection?: string;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const MainSidebar = ({ 
  userName = "Usuário", 
  onNavigate, 
  onOpenTemplates,
  currentSection = "home",
  collapsed = false,
  onToggleCollapse
}: MainSidebarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const mainNavItems = [
    { id: "home", label: "Home", icon: Home, shortcut: "" },
    { id: "search", label: "Buscar", icon: Search, shortcut: "Ctrl+K" },
  ];

  const projectItems = [
    { id: "all-projects", label: "Todos os projetos", icon: FolderOpen },
    { id: "starred", label: "Favoritos", icon: Star },
    { id: "shared", label: "Compartilhados comigo", icon: Users },
  ];

  const resourceItems = [
    { id: "discover", label: "Descobrir", icon: Compass },
    { id: "templates", label: "Templates", icon: LayoutTemplate, action: onOpenTemplates },
    { id: "learn", label: "Aprender", icon: GraduationCap },
  ];

  const handleItemClick = (id: string, action?: () => void) => {
    if (action) {
      action();
    } else {
      onNavigate?.(id);
    }
  };

  if (collapsed) {
    return (
      <motion.aside
        initial={{ width: 60 }}
        animate={{ width: 60 }}
        className="h-full bg-[hsl(0,0%,6%)] border-r border-white/[0.06] flex flex-col"
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
      className="h-full bg-[hsl(0,0%,6%)] border-r border-white/[0.06] flex flex-col"
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-white/[0.04]">
        <CodiaLogo size="md" />
        <button
          onClick={onToggleCollapse}
          className="p-2 rounded-lg hover:bg-white/[0.04] text-white/40 hover:text-white transition-colors"
        >
          <PanelLeftClose className="w-4 h-4" />
        </button>
      </div>

      {/* Workspace Selector */}
      <div className="p-3">
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
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/[0.04] transition-colors">
          <Share2 className="w-4 h-4" />
          <span className="flex-1 text-left">Compartilhar Codia</span>
          <span className="text-[10px] text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded">+10</span>
        </button>
        
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-400 hover:from-orange-500/20 hover:to-amber-500/20 transition-colors">
          <Zap className="w-4 h-4" />
          <span className="flex-1 text-left">Upgrade para Pro</span>
          <span className="text-orange-300">→</span>
        </button>
      </div>
    </motion.aside>
  );
};

export default MainSidebar;
