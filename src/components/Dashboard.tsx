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
  Play,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardProps {
  onStartWebsite: () => void;
  onOpenStudio: (toolId?: string) => void;
  projectContext?: {
    name?: string;
    hasWebsite?: boolean;
  };
}

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  iconBg: string;
  isMain?: boolean;
}

const tools: Tool[] = [
  {
    id: "website",
    name: "Website Builder",
    description: "Crie sites profissionais com IA",
    icon: Globe,
    gradient: "from-orange-500 via-orange-400 to-amber-400",
    iconBg: "bg-gradient-to-br from-orange-500 to-amber-500",
    isMain: true
  },
  {
    id: "branding",
    name: "Branding",
    description: "Identidade e posicionamento",
    icon: Palette,
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    iconBg: "bg-gradient-to-br from-violet-500 to-purple-600"
  },
  {
    id: "logo",
    name: "Logo Design",
    description: "Logos memoráveis",
    icon: PenTool,
    gradient: "from-pink-500 via-rose-500 to-red-400",
    iconBg: "bg-gradient-to-br from-pink-500 to-rose-500"
  },
  {
    id: "social",
    name: "Social Media",
    description: "Designs para redes",
    icon: Instagram,
    gradient: "from-fuchsia-500 via-pink-500 to-orange-400",
    iconBg: "bg-gradient-to-br from-fuchsia-500 to-pink-500"
  },
  {
    id: "copywriter",
    name: "Copywriter",
    description: "Textos que vendem",
    icon: FileText,
    gradient: "from-emerald-500 via-teal-500 to-cyan-400",
    iconBg: "bg-gradient-to-br from-emerald-500 to-teal-500"
  },
  {
    id: "brandchat",
    name: "Brand Chat",
    description: "Chat inteligente",
    icon: MessageCircle,
    gradient: "from-cyan-500 via-sky-500 to-blue-400",
    iconBg: "bg-gradient-to-br from-cyan-500 to-sky-500"
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Estratégias de growth",
    icon: TrendingUp,
    gradient: "from-blue-500 via-indigo-500 to-violet-400",
    iconBg: "bg-gradient-to-br from-blue-500 to-indigo-500"
  },
  {
    id: "advisor",
    name: "Business",
    description: "Modelo de negócio",
    icon: Lightbulb,
    gradient: "from-amber-500 via-yellow-500 to-orange-400",
    iconBg: "bg-gradient-to-br from-amber-500 to-yellow-500"
  },
  {
    id: "sales",
    name: "Sales",
    description: "Scripts de venda",
    icon: ShoppingCart,
    gradient: "from-red-500 via-rose-500 to-pink-400",
    iconBg: "bg-gradient-to-br from-red-500 to-rose-500"
  }
];

const steps = [
  { number: "01", title: "Site", description: "Presença online" },
  { number: "02", title: "Marca", description: "Identidade única" },
  { number: "03", title: "Visual", description: "Logo & design" },
  { number: "04", title: "Conteúdo", description: "Marketing" },
  { number: "05", title: "Vendas", description: "Escalar" },
];

const Dashboard = ({ onStartWebsite, onOpenStudio }: DashboardProps) => {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[hsl(0,0%,3%)] overflow-auto">
      {/* Subtle grid background */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/8 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-xs text-white/70 font-medium tracking-wide uppercase">Plataforma de IA</span>
          </motion.div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight"
          >
            Crie sua empresa
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 bg-clip-text text-transparent">
              com inteligência artificial
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/40 max-w-xl mx-auto mb-10"
          >
            Do primeiro site à primeira venda. Ferramentas especializadas para cada etapa do seu negócio.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="flex items-center justify-center gap-4"
          >
            <Button 
              onClick={onStartWebsite}
              className="h-12 px-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/25 gap-2 text-base"
            >
              <Play className="w-4 h-4" />
              Começar agora
            </Button>
            <Button 
              variant="outline"
              onClick={() => onOpenStudio()}
              className="h-12 px-8 bg-white/5 border-white/10 hover:bg-white/10 text-white font-medium rounded-xl gap-2"
            >
              Ver ferramentas
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </motion.section>

        {/* Journey Steps - Horizontal */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-20"
        >
          <div className="flex items-center justify-between p-1 rounded-2xl bg-white/[0.02] border border-white/5">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex-1 flex items-center gap-3 px-4 py-4">
                  <span className="text-2xl font-bold bg-gradient-to-b from-white/20 to-white/5 bg-clip-text text-transparent">
                    {step.number}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{step.title}</p>
                    <p className="text-xs text-white/30">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-white/10 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </motion.section>

        {/* Main CTA Card */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-16"
        >
          <motion.button
            onClick={onStartWebsite}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500/20 via-orange-600/10 to-transparent p-[1px] group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/40 via-orange-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative rounded-[23px] bg-[hsl(0,0%,5%)] p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-2xl shadow-orange-500/30">
                    <Globe className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 text-[10px] font-semibold bg-orange-500/20 text-orange-400 rounded uppercase tracking-wider">
                        Recomendado
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
                      Criar seu Website
                    </h2>
                    <p className="text-white/50">
                      Comece com um site profissional criado por IA em segundos
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm text-white/60">Grátis para começar</span>
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-orange-500/30">
                    <ArrowRight className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </motion.button>
        </motion.section>

        {/* Tools Grid */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Ferramentas de IA</h2>
              <p className="text-white/40">Cada área do seu negócio, uma IA especializada</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {tools.filter(t => !t.isMain).map((tool, index) => (
              <motion.button
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + index * 0.03 }}
                onClick={() => onOpenStudio(tool.id)}
                onMouseEnter={() => setHoveredTool(tool.id)}
                onMouseLeave={() => setHoveredTool(null)}
                whileHover={{ y: -4 }}
                className="group relative p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 text-left transition-all duration-300"
              >
                {/* Hover glow */}
                {hoveredTool === tool.id && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tool.gradient} opacity-5 blur-xl`} 
                  />
                )}
                
                <div className="relative">
                  <div className={`w-11 h-11 rounded-xl ${tool.iconBg} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    <tool.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-0.5 text-sm">{tool.name}</h3>
                  <p className="text-xs text-white/40">{tool.description}</p>
                </div>

                {/* Arrow indicator */}
                <div className="absolute top-5 right-5 w-6 h-6 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-3 h-3 text-white/60" />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Bottom Stats */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-20 pt-12 border-t border-white/5"
        >
          <div className="flex items-center justify-center gap-12 md:gap-20">
            {[
              { value: "10k+", label: "Empresas criadas" },
              { value: "50k+", label: "Projetos gerados" },
              { value: "99%", label: "Satisfação" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-white/30 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.section>

      </div>
    </div>
  );
};

export default Dashboard;
