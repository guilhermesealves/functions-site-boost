import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Globe, 
  Palette, 
  PenTool, 
  FileText, 
  TrendingUp, 
  Briefcase,
  Target,
  Building2,
  ArrowRight,
  Play,
  ChevronRight,
  Zap
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
  step: number;
}

const tools: Tool[] = [
  { id: "business", name: "Plano de Negócio", description: "Estruture sua empresa", icon: Briefcase, step: 1 },
  { id: "branding", name: "Branding", description: "Identidade da marca", icon: Palette, step: 2 },
  { id: "logo", name: "Logo & Visual", description: "Identidade visual", icon: PenTool, step: 3 },
  { id: "website", name: "Website", description: "Presença online", icon: Globe, step: 4 },
  { id: "copywriter", name: "Copywriter", description: "Textos persuasivos", icon: FileText, step: 5 },
  { id: "marketing", name: "Marketing", description: "Estratégias de growth", icon: TrendingUp, step: 6 },
  { id: "sales", name: "Vendas", description: "Scripts e conversão", icon: Target, step: 7 },
];

const Dashboard = ({ onStartWebsite, onOpenStudio }: DashboardProps) => {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  return (
    <div className="flex-1 overflow-auto">
      {/* Subtle grid background */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />
      
      {/* Ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-orange-500/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        
        {/* Hero Section */}
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
            <Zap className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-orange-300 font-medium">Bem-vindo ao Codia</span>
          </motion.div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight leading-tight"
          >
            O que vamos criar hoje?
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base text-white/40 max-w-xl mx-auto mb-8"
          >
            Escolha uma ferramenta ou siga a jornada completa de criação da sua empresa.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Button 
              onClick={() => onOpenStudio("business")}
              className="h-12 px-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-xl shadow-orange-500/25 gap-2"
            >
              <Play className="w-4 h-4" />
              Iniciar Jornada Completa
            </Button>
            <Button 
              variant="outline"
              onClick={() => onOpenStudio("existing")}
              className="h-12 px-6 bg-white/[0.03] border-white/10 hover:bg-white/[0.06] text-white font-medium rounded-xl gap-2"
            >
              <Building2 className="w-4 h-4" />
              Já tenho empresa
            </Button>
          </motion.div>
        </motion.section>

        {/* Journey Steps */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold text-white mb-1">Sua Jornada Empreendedora</h2>
            <p className="text-sm text-white/40">Siga o passo a passo ou vá direto ao que você precisa</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {tools.map((tool, index) => (
              <motion.button
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + index * 0.05 }}
                onClick={() => onOpenStudio(tool.id)}
                onMouseEnter={() => setHoveredTool(tool.id)}
                onMouseLeave={() => setHoveredTool(null)}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-orange-500/20 hover:bg-white/[0.04] text-center transition-all duration-300"
              >
                {/* Step number */}
                <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white/40">{tool.step}</span>
                </div>

                {/* Hover glow */}
                {hoveredTool === tool.id && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/10 to-amber-500/5 pointer-events-none"
                  />
                )}
                
                <div className="relative">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-white/[0.04] flex items-center justify-center mb-3 group-hover:bg-gradient-to-br group-hover:from-orange-500/20 group-hover:to-amber-500/10 transition-all">
                    <tool.icon className="w-6 h-6 text-white/60 group-hover:text-orange-400 transition-colors" />
                  </div>
                  <h3 className="font-medium text-white text-sm mb-0.5">{tool.name}</h3>
                  <p className="text-[11px] text-white/30">{tool.description}</p>
                </div>

                {/* Arrow */}
                {index < tools.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ChevronRight className="w-4 h-4 text-white/10" />
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Stats */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 pt-10 border-t border-white/[0.04]"
        >
          <div className="flex items-center justify-center gap-12 md:gap-20">
            {[
              { value: "10k+", label: "Empresas criadas" },
              { value: "50k+", label: "Projetos gerados" },
              { value: "99%", label: "Satisfação" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-[10px] text-white/25 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.section>

      </div>
    </div>
  );
};

export default Dashboard;
