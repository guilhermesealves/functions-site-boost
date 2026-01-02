import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Globe, 
  Palette, 
  PenTool, 
  Instagram, 
  FileText, 
  MessageCircle, 
  TrendingUp, 
  Lightbulb, 
  ShoppingCart,
  Sparkles,
  ArrowRight,
  Check,
  Circle,
  Zap,
  Layers,
  Target,
  Rocket
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardProps {
  onStartWebsite: () => void;
  onOpenStudio: () => void;
  projectContext?: {
    name?: string;
    hasWebsite?: boolean;
  };
}

interface Step {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

interface Tool {
  id: string;
  name: string;
  description: string;
  whenToUse: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
  isMain?: boolean;
}

const steps: Step[] = [
  {
    id: "website",
    number: 1,
    title: "Criar o Site",
    description: "Comece com um site profissional e impactante",
    icon: Globe,
    color: "text-orange-400"
  },
  {
    id: "branding",
    number: 2,
    title: "Definir a Marca",
    description: "Crie identidade, tom de voz e posicionamento",
    icon: Palette,
    color: "text-violet-400"
  },
  {
    id: "visual",
    number: 3,
    title: "Identidade Visual",
    description: "Logo, cores e elementos visuais únicos",
    icon: PenTool,
    color: "text-pink-400"
  },
  {
    id: "content",
    number: 4,
    title: "Conteúdo & Marketing",
    description: "Textos, posts e estratégias que vendem",
    icon: TrendingUp,
    color: "text-blue-400"
  },
  {
    id: "scale",
    number: 5,
    title: "Vender & Escalar",
    description: "Scripts de venda e automações comerciais",
    icon: Rocket,
    color: "text-emerald-400"
  }
];

const tools: Tool[] = [
  {
    id: "website",
    name: "Website",
    description: "Crie sites profissionais com IA em segundos",
    whenToUse: "Primeiro passo: crie sua presença online",
    icon: Globe,
    color: "text-orange-400",
    gradient: "from-orange-500/20 to-amber-500/20",
    isMain: true
  },
  {
    id: "branding",
    name: "Branding",
    description: "Identidade de marca e posicionamento",
    whenToUse: "Defina quem você é no mercado",
    icon: Palette,
    color: "text-violet-400",
    gradient: "from-violet-500/20 to-purple-500/20"
  },
  {
    id: "logo",
    name: "Logo",
    description: "Logos profissionais e memoráveis",
    whenToUse: "Crie sua marca visual",
    icon: PenTool,
    color: "text-pink-400",
    gradient: "from-pink-500/20 to-rose-500/20"
  },
  {
    id: "social",
    name: "Social Designer",
    description: "Designs para redes sociais",
    whenToUse: "Crie conteúdo visual impactante",
    icon: Instagram,
    color: "text-orange-400",
    gradient: "from-orange-500/20 to-amber-500/20"
  },
  {
    id: "copywriter",
    name: "Copywriter",
    description: "Textos que convertem vendas",
    whenToUse: "Escreva como um profissional",
    icon: FileText,
    color: "text-emerald-400",
    gradient: "from-emerald-500/20 to-teal-500/20"
  },
  {
    id: "brandchat",
    name: "Brand Chat",
    description: "Chat com a voz da sua marca",
    whenToUse: "Automatize comunicação",
    icon: MessageCircle,
    color: "text-cyan-400",
    gradient: "from-cyan-500/20 to-sky-500/20"
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Estratégias e campanhas completas",
    whenToUse: "Planeje seu crescimento",
    icon: TrendingUp,
    color: "text-blue-400",
    gradient: "from-blue-500/20 to-indigo-500/20"
  },
  {
    id: "advisor",
    name: "Business",
    description: "Consultoria e modelo de negócio",
    whenToUse: "Valide e estruture sua empresa",
    icon: Lightbulb,
    color: "text-yellow-400",
    gradient: "from-yellow-500/20 to-orange-500/20"
  },
  {
    id: "sales",
    name: "Sales",
    description: "Scripts e automações de venda",
    whenToUse: "Feche mais negócios",
    icon: ShoppingCart,
    color: "text-red-400",
    gradient: "from-red-500/20 to-rose-500/20"
  }
];

// Simulated progress - in real app this would come from user data
const userProgress = {
  website: false,
  branding: false,
  logo: false,
  social: false,
  copywriter: false,
  brandchat: false,
  marketing: false,
  advisor: false,
  sales: false
};

const Dashboard = ({ onStartWebsite, onOpenStudio, projectContext }: DashboardProps) => {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  
  const completedSteps = Object.values(userProgress).filter(Boolean).length;
  const totalSteps = Object.keys(userProgress).length;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  // Determine next recommended action
  const getNextAction = () => {
    if (!userProgress.website) {
      return { 
        title: "Criar seu primeiro site", 
        description: "Comece agora mesmo a construir sua presença online",
        action: onStartWebsite,
        buttonText: "Criar Site",
        icon: Globe
      };
    }
    if (!userProgress.branding) {
      return { 
        title: "Definir sua marca", 
        description: "Estabeleça identidade e posicionamento únicos",
        action: onOpenStudio,
        buttonText: "Abrir Branding",
        icon: Palette
      };
    }
    return { 
      title: "Continuar construindo", 
      description: "Explore as ferramentas de IA do Studio",
      action: onOpenStudio,
      buttonText: "Abrir Studio",
      icon: Sparkles
    };
  };

  const nextAction = getNextAction();

  return (
    <div className="min-h-screen bg-[hsl(0,0%,4%)] overflow-auto">
      {/* Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        
        {/* Section 1: Overview */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-orange-300 font-medium">Estúdio de IA para Empresas</span>
          </motion.div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            Tudo que sua empresa precisa,{" "}
            <span className="text-gradient-orange">em um só lugar</span>
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/50 max-w-2xl mx-auto"
          >
            Crie, estruture e escale sua empresa com IAs especializadas. 
            Do site à primeira venda, tudo automatizado e profissional.
          </motion.p>
        </motion.section>

        {/* Section 2: How It Works - Steps */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <Layers className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Como Funciona</h2>
              <p className="text-sm text-white/40">Construa sua empresa em 5 etapas simples</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="relative group"
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-white/10 to-transparent z-0" />
                )}
                
                <div className="relative p-5 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 hover:border-white/10 transition-all duration-300 hover:bg-white/[0.02]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center ${step.color}`}>
                      <step.icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono text-white/30">0{step.number}</span>
                  </div>
                  <h3 className="font-semibold text-white mb-1 text-sm">{step.title}</h3>
                  <p className="text-xs text-white/40 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 3: Your Tools */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Suas Ferramentas</h2>
                <p className="text-sm text-white/40">IAs especializadas para cada área do negócio</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onOpenStudio}
              className="text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 gap-1"
            >
              Ver todas
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool, index) => (
              <motion.button
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + index * 0.03 }}
                onClick={tool.isMain ? onStartWebsite : onOpenStudio}
                onMouseEnter={() => setHoveredTool(tool.id)}
                onMouseLeave={() => setHoveredTool(null)}
                className={`group relative p-5 rounded-2xl text-left transition-all duration-300 hover:scale-[1.02] ${
                  tool.isMain 
                    ? "bg-gradient-to-br from-orange-500/20 to-orange-600/10 border-2 border-orange-500/30 hover:border-orange-500/50" 
                    : `bg-gradient-to-br ${tool.gradient} border border-white/5 hover:border-white/10`
                }`}
              >
                {/* Glow effect */}
                {hoveredTool === tool.id && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`absolute inset-0 rounded-2xl blur-xl bg-gradient-to-br ${tool.gradient} opacity-50`} 
                  />
                )}
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-black/40 backdrop-blur-sm flex items-center justify-center ${tool.color}`}>
                      <tool.icon className="w-5 h-5" />
                    </div>
                    {tool.isMain && (
                      <span className="px-2 py-1 text-[10px] font-medium bg-orange-500/20 text-orange-300 rounded-full">
                        PRINCIPAL
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-white mb-1">{tool.name}</h3>
                  <p className="text-xs text-white/50 mb-2">{tool.description}</p>
                  <p className="text-[10px] text-white/30 flex items-center gap-1">
                    <Target className="w-3 h-3" />
                    {tool.whenToUse}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Section 4: Next Recommended Action */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500/10 via-orange-600/5 to-transparent border border-orange-500/20 p-8">
            {/* Background glow */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-orange-500/20 rounded-full blur-3xl" />
            
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-xl shadow-orange-500/30">
                  <nextAction.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <span className="text-xs font-medium text-orange-400 uppercase tracking-wide">Próximo passo recomendado</span>
                  <h3 className="text-xl font-bold text-white mt-1">{nextAction.title}</h3>
                  <p className="text-sm text-white/50">{nextAction.description}</p>
                </div>
              </div>
              
              <Button 
                onClick={nextAction.action}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-6 text-base font-semibold rounded-xl shadow-lg shadow-orange-500/30 gap-2"
              >
                {nextAction.buttonText}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Section 5: Progress */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Progresso da Empresa</h2>
              <p className="text-sm text-white/40">Acompanhe sua evolução</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
            {/* Progress bar */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-white/60">{completedSteps} de {totalSteps} etapas concluídas</span>
              <span className="text-sm font-semibold text-orange-400">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="h-3 bg-white/5 rounded-full overflow-hidden mb-6">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, delay: 0.8 }}
                className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
              />
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {Object.entries(userProgress).map(([key, completed], index) => {
                const tool = tools.find(t => t.id === key);
                if (!tool) return null;
                
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.05 }}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                      completed ? "bg-emerald-500/10" : "bg-white/[0.02]"
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      completed 
                        ? "bg-emerald-500/20 text-emerald-400" 
                        : "bg-white/5 text-white/20"
                    }`}>
                      {completed ? <Check className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
                    </div>
                    <span className={`text-sm ${completed ? "text-white/70" : "text-white/40"}`}>
                      {tool.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Footer spacing */}
        <div className="h-10" />
      </div>
    </div>
  );
};

export default Dashboard;
