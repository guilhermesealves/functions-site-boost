import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  ChevronRight, 
  ChevronLeft,
  LayoutDashboard,
  Building2,
  Eye,
  Wrench,
  HelpCircle,
  CheckCircle
} from "lucide-react";

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const tutorialSteps: TutorialStep[] = [
  {
    id: "dashboard",
    title: "Painel de Ferramentas",
    description: "Acesse todas as ferramentas de IA organizadas por categoria: Criação, Vendas, Marketing e Gestão. Cada ferramenta foi projetada para resolver problemas específicos do seu negócio.",
    icon: LayoutDashboard
  },
  {
    id: "company",
    title: "Minha Empresa",
    description: "Cadastre sua empresa para personalizar a experiência. As ferramentas usarão as informações da sua marca para gerar conteúdo mais relevante.",
    icon: Building2
  },
  {
    id: "plans",
    title: "Planos e Modo Preview",
    description: "No plano Free você pode visualizar todas as ferramentas em modo preview. Para utilizar as funcionalidades completas, considere assinar o plano Pro.",
    icon: Eye
  },
  {
    id: "tools",
    title: "Uso das Ferramentas",
    description: "Selecione uma ferramenta no menu lateral. Cada ferramenta possui um formulário específico para entrada de dados e gera resultados automaticamente com IA.",
    icon: Wrench
  },
  {
    id: "help",
    title: "Suporte",
    description: "Precisa de ajuda? Acesse a ferramenta 'IA Explicadora' para tirar dúvidas ou entre em contato através do menu de configurações.",
    icon: HelpCircle
  }
];

interface TutorialModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

const TutorialModal = ({ isOpen, onComplete }: TutorialModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const step = tutorialSteps[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === tutorialSteps.length - 1;
  const progress = ((currentStep + 1) / tutorialSteps.length) * 100;

  const handleNext = () => {
    if (isLast) {
      onComplete();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-secondary">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-primary"
            />
          </div>

          {/* Skip button */}
          <button
            onClick={onComplete}
            className="absolute top-4 right-4 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="p-8 pt-12">
            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-6">
              {tutorialSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep 
                      ? "bg-primary" 
                      : index < currentStep 
                        ? "bg-primary/50" 
                        : "bg-secondary"
                  }`}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>

                {/* Title */}
                <h2 className="text-2xl font-semibold text-foreground mb-3">
                  {step.title}
                </h2>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="px-8 pb-8 flex items-center justify-between">
            <button
              onClick={onComplete}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Pular tutorial
            </button>

            <div className="flex items-center gap-3">
              {!isFirst && (
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Anterior
                </button>
              )}
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                {isLast ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Concluir
                  </>
                ) : (
                  <>
                    Próximo
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TutorialModal;
