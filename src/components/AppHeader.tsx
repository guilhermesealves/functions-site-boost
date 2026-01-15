import { useState } from "react";
import { motion } from "framer-motion";
import { 
  LogOut, 
  Settings, 
  ChevronDown,
  Zap,
  User,
  Search,
  Command
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import CodiaLogo from "./CodiaLogo";
import { useCredits } from "@/hooks/useCredits";

interface AppHeaderProps {
  user?: any;
  onNewProject?: () => void;
  showNewButton?: boolean;
}

const AppHeader = ({ user, onNewProject, showNewButton = true }: AppHeaderProps) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const { balance } = useCredits();
  const totalCredits = balance?.total || 0;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Sessão encerrada");
    navigate("/");
  };

  const userName = user?.email?.split("@")[0] || "Usuário";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <header className="h-16 border-b border-[#e8e4d5] bg-[#ebe7d8] sticky top-0 z-50">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left - Logo */}
        <CodiaLogo size="md" />

        {/* Center - Global Search */}
        <button 
          className="hidden md:flex items-center gap-3 px-4 py-2 bg-[#f0ede0] hover:bg-[#e8e4d5] border border-[#e8e4d5] rounded-xl text-sm text-[#135215]/60 transition-colors"
          onClick={() => toast.info("Busca global em breve")}
        >
          <Search className="w-4 h-4" />
          <span>Pesquisar...</span>
          <div className="flex items-center gap-1 px-1.5 py-0.5 bg-[#e8e4d5] rounded text-xs text-[#135215]/70">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </button>

        {/* Right - Credits & User */}
        <div className="flex items-center gap-4">
          {/* Credits Display */}
          {user && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#f0ede0] border border-[#e8e4d5]">
              <Zap className="w-4 h-4 text-[#135215]" />
              <span className="text-sm font-medium text-[#135215]">{totalCredits} créditos</span>
            </div>
          )}

          {/* User Dropdown */}
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#e8e4d5] transition-colors"
              >
                <div className="w-8 h-8 rounded-xl bg-[#135215] flex items-center justify-center text-white font-bold text-sm">
                  {userInitial}
                </div>
                <span className="hidden md:block text-sm text-[#135215] font-medium max-w-[120px] truncate">
                  {userName}
                </span>
                <ChevronDown className="w-4 h-4 text-[#135215]/60" />
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
                    className="absolute right-0 top-14 w-56 bg-white border border-[#e8e4d5] rounded-xl shadow-lg z-50 overflow-hidden"
                  >
                    <div className="p-3 border-b border-[#e8e4d5]">
                      <p className="text-sm font-medium text-[#135215] truncate">{userName}</p>
                      <p className="text-xs text-[#135215]/60 truncate">{user.email}</p>
                    </div>
                    
                    <div className="p-1.5">
                      <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-[#135215]/70 hover:text-[#135215] hover:bg-[#e8e4d5] rounded-lg transition-colors">
                        <User className="w-4 h-4" />
                        Perfil
                      </button>
                      <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-[#135215]/70 hover:text-[#135215] hover:bg-[#e8e4d5] rounded-lg transition-colors">
                        <Settings className="w-4 h-4" />
                        Configurações
                      </button>
                      <button 
                        onClick={() => { setShowUserMenu(false); navigate("/pricing"); }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-[#135215] hover:bg-[rgba(19,82,21,0.08)] rounded-lg transition-colors"
                      >
                        <Zap className="w-4 h-4" />
                        Comprar Créditos
                      </button>
                    </div>
                    
                    <div className="p-1.5 border-t border-[#e8e4d5]">
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
              className="px-4 py-2 text-sm text-[#135215]/70 hover:text-[#135215] font-medium transition-colors"
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
