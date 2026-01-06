import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Bell, Shield, Palette, CreditCard, LogOut, ChevronRight, Camera, Mail, Phone, MapPin, Globe } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Tab = "profile" | "notifications" | "security" | "appearance" | "billing";

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [user, setUser] = useState<any>(null);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setEmail(user.email || "");
        setDisplayName(user.user_metadata?.full_name || user.email?.split("@")[0] || "");
      }
    };
    if (isOpen) {
      getUser();
    }
  }, [isOpen]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Você saiu da sua conta");
    onClose();
    navigate("/");
  };

  const handleSaveProfile = () => {
    toast.success("Perfil atualizado com sucesso!");
  };

  const tabs = [
    { id: "profile" as Tab, label: "Perfil", icon: User },
    { id: "notifications" as Tab, label: "Notificações", icon: Bell },
    { id: "security" as Tab, label: "Segurança", icon: Shield },
    { id: "appearance" as Tab, label: "Aparência", icon: Palette },
    { id: "billing" as Tab, label: "Planos e Cobrança", icon: CreditCard },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-4xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
          style={{ maxHeight: "85vh" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">Configurações</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <div className="flex" style={{ height: "calc(85vh - 80px)" }}>
            {/* Sidebar */}
            <div className="w-56 border-r border-border p-4 overflow-y-auto">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      activeTab === tab.id
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t border-border">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sair da conta</span>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">Informações do Perfil</h3>
                    <p className="text-sm text-muted-foreground">Atualize suas informações pessoais</p>
                  </div>

                  {/* Avatar */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center text-white text-2xl font-bold">
                        {displayName.charAt(0).toUpperCase()}
                      </div>
                      <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary/90 transition-colors">
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{displayName}</h4>
                      <p className="text-sm text-muted-foreground">{email}</p>
                    </div>
                  </div>

                  {/* Form */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Nome completo
                      </label>
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="w-full px-4 py-2.5 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                        placeholder="Seu nome"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        E-mail
                      </label>
                      <input
                        type="email"
                        value={email}
                        disabled
                        className="w-full px-4 py-2.5 bg-secondary/50 border border-border rounded-lg text-muted-foreground cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Telefone
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2.5 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        <Globe className="w-4 h-4 inline mr-2" />
                        Site
                      </label>
                      <input
                        type="url"
                        className="w-full px-4 py-2.5 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                        placeholder="https://seusite.com"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSaveProfile}
                    className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors"
                  >
                    Salvar alterações
                  </button>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">Notificações</h3>
                    <p className="text-sm text-muted-foreground">Configure como você deseja receber notificações</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-foreground">Notificações por e-mail</h4>
                        <p className="text-sm text-muted-foreground">Receba atualizações importantes por e-mail</p>
                      </div>
                      <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-foreground">Notificações push</h4>
                        <p className="text-sm text-muted-foreground">Receba alertas em tempo real no navegador</p>
                      </div>
                      <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-foreground">Novidades e dicas</h4>
                        <p className="text-sm text-muted-foreground">Receba novidades sobre recursos e dicas</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">Segurança</h3>
                    <p className="text-sm text-muted-foreground">Gerencie suas configurações de segurança</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg cursor-pointer hover:bg-secondary transition-colors">
                      <div>
                        <h4 className="font-medium text-foreground">Alterar senha</h4>
                        <p className="text-sm text-muted-foreground">Atualize sua senha de acesso</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg cursor-pointer hover:bg-secondary transition-colors">
                      <div>
                        <h4 className="font-medium text-foreground">Autenticação de dois fatores</h4>
                        <p className="text-sm text-muted-foreground">Adicione uma camada extra de segurança</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg cursor-pointer hover:bg-secondary transition-colors">
                      <div>
                        <h4 className="font-medium text-foreground">Dispositivos conectados</h4>
                        <p className="text-sm text-muted-foreground">Veja e gerencie seus dispositivos</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Tab */}
              {activeTab === "appearance" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">Aparência</h3>
                    <p className="text-sm text-muted-foreground">Personalize a aparência do aplicativo</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-foreground">Modo escuro</h4>
                        <p className="text-sm text-muted-foreground">Use o tema escuro (recomendado)</p>
                      </div>
                      <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                    </div>

                    <div>
                      <h4 className="font-medium text-foreground mb-3">Cor de destaque</h4>
                      <div className="flex gap-3">
                        {["#f97316", "#ef4444", "#8b5cf6", "#3b82f6", "#22c55e", "#ec4899"].map((color) => (
                          <button
                            key={color}
                            className="w-10 h-10 rounded-full border-2 border-transparent hover:border-white/50 transition-colors"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Billing Tab */}
              {activeTab === "billing" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">Planos e Cobrança</h3>
                    <p className="text-sm text-muted-foreground">Gerencie seu plano e informações de pagamento</p>
                  </div>

                  {/* Current Plan */}
                  <div className="p-5 bg-gradient-to-r from-primary/10 to-orange-500/10 border border-primary/20 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-xs font-semibold text-primary uppercase tracking-wide">Plano Atual</span>
                        <h4 className="text-xl font-bold text-foreground">Gratuito</h4>
                      </div>
                      <button
                        onClick={() => {
                          onClose();
                          navigate("/pricing");
                        }}
                        className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        Fazer upgrade
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Você está usando o plano gratuito. Faça upgrade para desbloquear todos os recursos.
                    </p>
                  </div>

                  {/* Usage */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">Uso atual</h4>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Projetos</span>
                          <span className="text-foreground">1 de 1</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: "100%" }} />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Créditos IA</span>
                          <span className="text-foreground">8 de 10</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: "80%" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SettingsModal;
