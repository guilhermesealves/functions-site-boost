import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Rocket, Building2, Globe, Package, ChevronRight, Check, 
  Sparkles, ArrowRight, Store, Briefcase, ShoppingBag, 
  Palette, Users, Laptop, Coffee, Heart, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface OnboardingFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: OnboardingData) => void;
}

interface OnboardingData {
  businessType: string;
  businessName: string;
  niche: string;
  objective: string;
  hasWebsite: boolean;
}

const businessTypes = [
  { id: "ecommerce", name: "E-commerce", description: "Loja online de produtos", icon: ShoppingBag },
  { id: "services", name: "Serviços", description: "Consultoria, freelancer", icon: Briefcase },
  { id: "saas", name: "SaaS / App", description: "Software ou aplicativo", icon: Laptop },
  { id: "restaurant", name: "Restaurante", description: "Delivery e cardápio", icon: Coffee },
  { id: "health", name: "Saúde & Bem-estar", description: "Clínicas, academias", icon: Heart },
  { id: "other", name: "Outro", description: "Outro tipo de negócio", icon: Building2 },
];

const niches = [
  "Moda & Vestuário", "Tecnologia", "Alimentação", "Beleza", "Educação",
  "Fitness", "Pet Shop", "Decoração", "Automotivo", "Saúde", "Outro"
];

const objectives = [
  { id: "sell", label: "Vender produtos online", icon: Store },
  { id: "leads", label: "Gerar leads e contatos", icon: Users },
  { id: "brand", label: "Criar presença de marca", icon: Palette },
  { id: "all", label: "Tudo acima", icon: Rocket },
];

const OnboardingFlow = ({ isOpen, onClose, onComplete }: OnboardingFlowProps) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    businessType: "",
    businessName: "",
    niche: "",
    objective: "",
    hasWebsite: false,
  });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const canProceed = () => {
    switch (step) {
      case 1: return !!data.businessType;
      case 2: return !!data.businessName && !!data.niche;
      case 3: return !!data.objective;
      case 4: return true;
      default: return false;
    }
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(data);
      toast.success("Configuração concluída! Vamos criar seu negócio.");
      onClose();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-background border border-border rounded-2xl w-full max-w-2xl overflow-hidden"
        >
          {/* Progress Bar */}
          <div className="h-1 bg-secondary">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                  <Rocket className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Configure seu negócio</h2>
                  <p className="text-sm text-muted-foreground">Passo {step} de {totalSteps}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i + 1 <= step ? "bg-primary" : "bg-secondary"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 min-h-[400px]">
            <AnimatePresence mode="wait">
              {/* Step 1: Business Type */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Qual tipo de negócio você tem?
                    </h3>
                    <p className="text-muted-foreground">
                      Isso nos ajuda a personalizar sua experiência
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {businessTypes.map(type => (
                      <button
                        key={type.id}
                        onClick={() => setData({ ...data, businessType: type.id })}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          data.businessType === type.id
                            ? "bg-primary/10 border-primary/30"
                            : "bg-card/50 border-border hover:border-primary/30"
                        }`}
                      >
                        <type.icon className={`w-6 h-6 mb-2 ${
                          data.businessType === type.id ? "text-primary" : "text-muted-foreground"
                        }`} />
                        <p className="font-medium text-foreground">{type.name}</p>
                        <p className="text-xs text-muted-foreground">{type.description}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Business Details */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Conte-nos sobre seu negócio
                    </h3>
                    <p className="text-muted-foreground">
                      Essas informações personalizam as IAs para você
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Nome do negócio
                      </label>
                      <Input
                        placeholder="Ex: Minha Loja Incrível"
                        value={data.businessName}
                        onChange={e => setData({ ...data, businessName: e.target.value })}
                        className="bg-secondary/50 border-border h-12"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Nicho de mercado
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {niches.map(niche => (
                          <button
                            key={niche}
                            onClick={() => setData({ ...data, niche })}
                            className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                              data.niche === niche
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-secondary/50 text-muted-foreground border-border hover:border-primary/50"
                            }`}
                          >
                            {niche}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Objective */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Qual seu principal objetivo?
                    </h3>
                    <p className="text-muted-foreground">
                      Vamos focar no que mais importa para você
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {objectives.map(obj => (
                      <button
                        key={obj.id}
                        onClick={() => setData({ ...data, objective: obj.id })}
                        className={`p-5 rounded-xl border text-center transition-all ${
                          data.objective === obj.id
                            ? "bg-primary/10 border-primary/30"
                            : "bg-card/50 border-border hover:border-primary/30"
                        }`}
                      >
                        <obj.icon className={`w-8 h-8 mx-auto mb-3 ${
                          data.objective === obj.id ? "text-primary" : "text-muted-foreground"
                        }`} />
                        <p className="font-medium text-foreground">{obj.label}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 4: Summary */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Tudo pronto!
                    </h3>
                    <p className="text-muted-foreground">
                      Revise suas informações e comece a criar
                    </p>
                  </div>

                  <div className="bg-card/50 border border-border rounded-xl p-5 space-y-4">
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">Tipo de negócio</span>
                      <span className="text-sm font-medium text-foreground capitalize">
                        {businessTypes.find(t => t.id === data.businessType)?.name || "-"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">Nome</span>
                      <span className="text-sm font-medium text-foreground">{data.businessName || "-"}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">Nicho</span>
                      <span className="text-sm font-medium text-foreground">{data.niche || "-"}</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-muted-foreground">Objetivo</span>
                      <span className="text-sm font-medium text-foreground">
                        {objectives.find(o => o.id === data.objective)?.label || "-"}
                      </span>
                    </div>
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Próximos passos</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          A IA vai usar essas informações para criar seu plano de negócio, 
                          branding, site e muito mais de forma personalizada.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={step === 1 ? onClose : handleBack}
              className="text-muted-foreground hover:text-foreground"
            >
              {step === 1 ? "Pular" : "Voltar"}
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-primary hover:bg-primary/90"
            >
              {step === totalSteps ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Concluir
                </>
              ) : (
                <>
                  Continuar
                  <ChevronRight className="w-4 h-4 ml-1" />
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OnboardingFlow;
