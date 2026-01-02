import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  User, 
  LogOut, 
  Settings, 
  ChevronDown,
  Bell,
  Search,
  Plus
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import CodiaLogo from "./CodiaLogo";

interface AppHeaderProps {
  user?: any;
  onNewProject?: () => void;
  showNewButton?: boolean;
}

const AppHeader = ({ user, onNewProject, showNewButton = true }: AppHeaderProps) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Sessão encerrada");
    navigate("/");
  };

  const userName = user?.email?.split("@")[0] || "Usuário";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <header className="h-16 border-b border-white/[0.06] bg-[hsl(0,0%,4%)] sticky top-0 z-50">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Left - Logo */}
        <div className="flex items-center gap-6">
          <CodiaLogo />
          
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-white/[0.03] border border-white/[0.06] rounded-xl w-64">
            <Search className="w-4 h-4 text-white/30" />
            <input 
              type="text" 
              placeholder="Buscar projetos..." 
              className="bg-transparent text-sm text-white placeholder:text-white/30 outline-none flex-1"
            />
            <kbd className="hidden lg:flex text-[10px] text-white/20 bg-white/[0.04] px-1.5 py-0.5 rounded">⌘K</kbd>
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-3">
          {showNewButton && onNewProject && (
            <Button 
              onClick={onNewProject}
              size="sm"
              className="h-9 gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-lg shadow-lg shadow-orange-500/20"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Novo Projeto</span>
            </Button>
          )}

          {/* Notifications */}
          <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors">
            <Bell className="w-4 h-4" />
          </button>

          {/* User Menu */}
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/[0.04] transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-semibold text-sm">
                  {userInitial}
                </div>
                <span className="hidden md:block text-sm text-white/80 max-w-[100px] truncate">
                  {userName}
                </span>
                <ChevronDown className="w-4 h-4 text-white/40" />
              </button>

              {showUserMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowUserMenu(false)} 
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute right-0 top-12 w-56 bg-[hsl(0,0%,8%)] border border-white/[0.08] rounded-xl shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="p-3 border-b border-white/[0.06]">
                      <p className="text-sm font-medium text-white truncate">{userName}</p>
                      <p className="text-xs text-white/40 truncate">{user.email}</p>
                    </div>
                    <div className="p-1.5">
                      <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors">
                        <User className="w-4 h-4" />
                        Meu Perfil
                      </button>
                      <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors">
                        <Settings className="w-4 h-4" />
                        Configurações
                      </button>
                    </div>
                    <div className="p-1.5 border-t border-white/[0.06]">
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sair
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </div>
          ) : (
            <Button 
              onClick={() => navigate("/auth")}
              size="sm"
              className="h-9 bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/[0.08] rounded-lg"
            >
              Entrar
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
