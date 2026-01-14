import { useState } from "react";
import { motion } from "framer-motion";
import { 
  LogOut, 
  Settings, 
  ChevronDown,
  Zap,
  User
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
    <header className="h-16 border-b border-white/[0.04] bg-black sticky top-0 z-50">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left - Logo only - ultra minimal */}
        <CodiaLogo size="md" />

        {/* Right - User only */}
        <div className="flex items-center">
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/[0.03] transition-colors"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center text-black font-bold text-sm">
                  {userInitial}
                </div>
                <span className="hidden md:block text-sm text-white/70 font-medium max-w-[120px] truncate">
                  {userName}
                </span>
                <ChevronDown className="w-4 h-4 text-white/30" />
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
                    className="absolute right-0 top-14 w-56 bg-[#0a0a0a] border border-white/[0.06] rounded-xl shadow-2xl shadow-black/80 z-50 overflow-hidden"
                  >
                    <div className="p-3 border-b border-white/[0.04]">
                      <p className="text-sm font-medium text-white truncate">{userName}</p>
                      <p className="text-xs text-white/30 truncate">{user.email}</p>
                    </div>
                    
                    <div className="p-1.5">
                      <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/[0.03] rounded-lg transition-colors">
                        <User className="w-4 h-4" />
                        Perfil
                      </button>
                      <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/[0.03] rounded-lg transition-colors">
                        <Settings className="w-4 h-4" />
                        Configurações
                      </button>
                      <button 
                        onClick={() => { setShowUserMenu(false); navigate("/pricing"); }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      >
                        <Zap className="w-4 h-4" />
                        Comprar Créditos
                      </button>
                    </div>
                    
                    <div className="p-1.5 border-t border-white/[0.04]">
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
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
            <button 
              onClick={() => navigate("/auth")}
              className="px-4 py-2 text-sm text-white/70 hover:text-white font-medium transition-colors"
            >
              Entrar
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;