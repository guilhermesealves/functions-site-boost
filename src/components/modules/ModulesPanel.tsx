import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Package, Check, Lock, ChevronRight, Zap, 
  Search, Filter, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { modules, moduleCategories, Module } from "./ModulesData";
import { useCredits } from "@/hooks/useCredits";

interface ModulesPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const planBadges = {
  starter: { label: "Free", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  pro: { label: "Pro", color: "bg-primary/20 text-primary border-primary/30" },
  enterprise: { label: "Business", color: "bg-violet-500/20 text-violet-400 border-violet-500/30" },
};

const statusBadges = {
  active: { label: "Ativo", color: "bg-emerald-500/20 text-emerald-400" },
  inactive: { label: "Inativo", color: "bg-secondary text-muted-foreground" },
  coming_soon: { label: "Em breve", color: "bg-amber-500/20 text-amber-400" },
};

const ModulesPanel = ({ isOpen, onClose }: ModulesPanelProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModules, setActiveModules] = useState<string[]>(["payments", "products", "orders", "shipping"]);
  const navigate = useNavigate();
  const { balance } = useCredits();

  const userPlan = balance?.tier || "free";

  const canAccessModule = (modulePlan: string) => {
    const planOrder = ["free", "starter", "pro", "enterprise"];
    const userPlanIndex = planOrder.indexOf(userPlan);
    const modulePlanIndex = planOrder.indexOf(modulePlan);
    return userPlanIndex >= modulePlanIndex || modulePlan === "starter";
  };

  const toggleModule = (moduleId: string, modulePlan: string, status: string) => {
    if (status === "coming_soon") {
      toast.info("Este módulo estará disponível em breve!");
      return;
    }

    if (!canAccessModule(modulePlan)) {
      toast.error(`Disponível no plano ${planBadges[modulePlan as keyof typeof planBadges].label}`);
      navigate("/pricing");
      return;
    }

    setActiveModules(prev => 
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
    
    const isActivating = !activeModules.includes(moduleId);
    toast.success(isActivating ? "Módulo ativado!" : "Módulo desativado");
  };

  const filteredModules = modules.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || m.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="bg-background border border-border rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Módulos & Plugins</h2>
                <p className="text-sm text-muted-foreground">Ative funcionalidades para seu negócio</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Search & Filters */}
          <div className="p-4 border-b border-border flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar módulos..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary/50 border-border"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              {moduleCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                  className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                    selectedCategory === cat.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-secondary/50 text-muted-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active Modules Count */}
          <div className="px-6 py-3 bg-primary/5 border-b border-primary/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {activeModules.length} módulos ativos
                </span>
              </div>
              <span className="text-xs text-muted-foreground capitalize">
                Plano: {userPlan}
              </span>
            </div>
          </div>

          {/* Modules Grid */}
          <div className="p-6 overflow-y-auto max-h-[50vh]">
            <div className="grid grid-cols-2 gap-4">
              {filteredModules.map((module, index) => {
                const isActive = activeModules.includes(module.id);
                const hasAccess = canAccessModule(module.plan);
                const planBadge = planBadges[module.plan];
                const statusBadge = statusBadges[module.status];

                return (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => toggleModule(module.id, module.plan, module.status)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all group ${
                      isActive
                        ? "bg-primary/10 border-primary/30"
                        : module.status === "coming_soon"
                          ? "bg-secondary/30 border-border/50 opacity-70"
                          : "bg-card/50 border-border hover:border-primary/30"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isActive ? "bg-primary/20" : "bg-secondary"}`}>
                          <module.icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">{module.name}</h3>
                          <p className="text-xs text-muted-foreground">{module.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {module.status === "coming_soon" ? (
                          <span className={`px-2 py-1 text-[10px] rounded ${statusBadge.color}`}>
                            {statusBadge.label}
                          </span>
                        ) : !hasAccess ? (
                          <Lock className="w-4 h-4 text-muted-foreground" />
                        ) : isActive ? (
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <Check className="w-3 h-3 text-primary-foreground" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full border-2 border-border group-hover:border-primary/50 transition-colors" />
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {module.features.slice(0, 2).map((feature, i) => (
                          <span key={i} className="px-2 py-0.5 text-[10px] rounded bg-secondary text-muted-foreground">
                            {feature}
                          </span>
                        ))}
                        {module.features.length > 2 && (
                          <span className="px-2 py-0.5 text-[10px] rounded bg-secondary text-muted-foreground">
                            +{module.features.length - 2}
                          </span>
                        )}
                      </div>
                      <span className={`px-2 py-0.5 text-[9px] rounded border ${planBadge.color}`}>
                        {planBadge.label}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border flex items-center justify-between bg-card/50">
            <p className="text-xs text-muted-foreground">
              Módulos são ativados instantaneamente
            </p>
            <Button onClick={onClose} className="bg-primary hover:bg-primary/90">
              <Check className="w-4 h-4 mr-2" />
              Concluir
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModulesPanel;
