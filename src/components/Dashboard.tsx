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
  ArrowUp,
  Paperclip,
  Plus,
  Mic,
  Clock,
  Star,
  MoreHorizontal,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardProps {
  onStartWebsite: () => void;
  onOpenStudio: (toolId?: string) => void;
  projectContext?: {
    name?: string;
    hasWebsite?: boolean;
  };
  projects?: any[];
  userName?: string;
}

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  step: number;
  color: string;
}

const tools: Tool[] = [
  { id: "business", name: "Plano de Negócio", description: "Estruture sua empresa", icon: Briefcase, step: 1, color: "from-blue-500 to-cyan-500" },
  { id: "branding", name: "Branding", description: "Identidade da marca", icon: Palette, step: 2, color: "from-purple-500 to-pink-500" },
  { id: "logo", name: "Logo & Visual", description: "Identidade visual", icon: PenTool, step: 3, color: "from-orange-500 to-amber-500" },
  { id: "website", name: "Website", description: "Presença online", icon: Globe, step: 4, color: "from-emerald-500 to-teal-500" },
  { id: "copywriter", name: "Copywriter", description: "Textos persuasivos", icon: FileText, step: 5, color: "from-rose-500 to-red-500" },
  { id: "marketing", name: "Marketing", description: "Estratégias de growth", icon: TrendingUp, step: 6, color: "from-violet-500 to-indigo-500" },
  { id: "sales", name: "Vendas", description: "Scripts e conversão", icon: Target, step: 7, color: "from-amber-500 to-yellow-500" },
];

const Dashboard = ({ onStartWebsite, onOpenStudio, projects = [], userName = "você" }: DashboardProps) => {
  const [input, setInput] = useState("");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onOpenStudio("business");
    }
  };

  // Mock projects for display
  const displayProjects = projects.length > 0 ? projects : [
    { id: "1", name: "E-commerce Fashion", type: "Website", updatedAt: "Há 2 horas", starred: true },
    { id: "2", name: "App de Delivery", type: "Plano de Negócio", updatedAt: "Ontem", starred: false },
    { id: "3", name: "Marca de Cosméticos", type: "Branding", updatedAt: "3 dias atrás", starred: true },
  ];

  return (
    <div className="flex-1 overflow-auto relative">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient orb top right */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px]">
          <div className="absolute top-20 right-20 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute top-40 right-40 w-24 h-24 bg-cyan-500/20 rounded-full blur-2xl" />
          <div className="absolute top-10 right-60 w-16 h-16 bg-emerald-500/30 rounded-full blur-xl" />
          {/* Confetti-like lines */}
          <svg className="absolute top-0 right-0 w-full h-full opacity-40" viewBox="0 0 400 400">
            {[...Array(30)].map((_, i) => (
              <motion.line
                key={i}
                x1={200 + Math.random() * 150}
                y1={50 + Math.random() * 200}
                x2={200 + Math.random() * 150 + 20}
                y2={50 + Math.random() * 200 + 40}
                stroke={['#3B82F6', '#10B981', '#6366F1', '#F59E0B', '#EC4899'][i % 5]}
                strokeWidth={2}
                strokeLinecap="round"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 0.6, pathLength: 1 }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
              />
            ))}
          </svg>
        </div>
        {/* Gradient orb bottom left */}
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px]">
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-40 left-40 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl" />
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-orange-300 font-medium">Seu 2025 Codia está aqui</span>
            <span className="text-white/60">→</span>
          </motion.div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight"
          >
            Pronto para criar, {userName}?
          </motion.h1>
          
          {/* Main Input */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <form onSubmit={handleSubmit}>
              <div className="relative bg-[hsl(0,0%,10%)] border border-white/[0.08] rounded-2xl p-4 focus-within:border-white/20 transition-colors">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Peça a Codia para criar um"
                  className="w-full bg-transparent text-white text-lg placeholder:text-white/40 outline-none mb-4"
                />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white/60 hover:text-white text-sm transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white/60 hover:text-white text-sm transition-colors"
                    >
                      <Paperclip className="w-4 h-4" />
                      <span>Anexar</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white/60 hover:text-white text-sm transition-colors"
                    >
                      <Palette className="w-4 h-4" />
                      <span>Tema</span>
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white/60 hover:text-white text-sm transition-colors border border-white/[0.06]"
                    >
                      💬 Chat
                    </button>
                    <button
                      type="button"
                      className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.04] transition-colors"
                    >
                      <Mic className="w-5 h-5" />
                    </button>
                    <button
                      type="submit"
                      className="w-10 h-10 rounded-full bg-white/[0.06] hover:bg-white/[0.1] flex items-center justify-center text-white/60 hover:text-white transition-colors border border-white/[0.08]"
                    >
                      <ArrowUp className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          {/* Tabs */}
          <div className="flex items-center gap-1 mb-6 p-1 bg-white/[0.03] rounded-xl w-fit">
            <button className="px-4 py-2 rounded-lg text-sm font-medium bg-white/[0.08] text-white">
              Visualizados recentemente
            </button>
            <button className="px-4 py-2 rounded-lg text-sm font-medium text-white/50 hover:text-white hover:bg-white/[0.04] transition-colors">
              Meus projetos
            </button>
            <button className="px-4 py-2 rounded-lg text-sm font-medium text-white/50 hover:text-white hover:bg-white/[0.04] transition-colors">
              Templates
            </button>
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + index * 0.05 }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group relative bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.12] transition-all cursor-pointer"
              >
                {/* Preview area */}
                <div className="h-40 bg-gradient-to-br from-[hsl(0,0%,8%)] to-[hsl(0,0%,6%)] relative">
                  {/* Fake preview content */}
                  <div className="absolute inset-4 bg-[hsl(0,0%,10%)] rounded-lg border border-white/[0.04] overflow-hidden">
                    <div className="h-3 bg-white/[0.03] flex items-center gap-1 px-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400/50" />
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/50" />
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400/50" />
                    </div>
                    <div className="p-2 space-y-1.5">
                      <div className="h-2 bg-orange-500/20 rounded w-1/2" />
                      <div className="h-1.5 bg-white/[0.04] rounded w-full" />
                      <div className="h-1.5 bg-white/[0.03] rounded w-3/4" />
                    </div>
                  </div>

                  {/* Star button */}
                  <button 
                    className={`absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                      project.starred 
                        ? 'bg-amber-500/20 text-amber-400' 
                        : 'bg-black/20 text-white/40 opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <Star className={`w-4 h-4 ${project.starred ? 'fill-current' : ''}`} />
                  </button>

                  {/* More button */}
                  <button className="absolute top-3 right-12 w-8 h-8 rounded-lg bg-black/20 flex items-center justify-center text-white/40 opacity-0 group-hover:opacity-100 hover:text-white transition-all">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-4 h-4 rounded bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                      <Globe className="w-2.5 h-2.5 text-white" />
                    </div>
                    <h3 className="font-medium text-white text-sm truncate">{project.name}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/40">
                    <span>{project.type}</span>
                    <span>•</span>
                    <span>{project.updatedAt}</span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* New Project Card */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={() => onOpenStudio("business")}
              className="h-full min-h-[200px] flex flex-col items-center justify-center gap-3 bg-white/[0.02] border border-dashed border-white/[0.08] rounded-2xl hover:border-orange-500/30 hover:bg-orange-500/5 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/[0.04] group-hover:bg-orange-500/20 flex items-center justify-center transition-colors">
                <Plus className="w-6 h-6 text-white/40 group-hover:text-orange-400 transition-colors" />
              </div>
              <span className="text-sm text-white/40 group-hover:text-white/60">Criar novo projeto</span>
            </motion.button>
          </div>

          {/* Browse All */}
          <div className="flex justify-end mt-4">
            <button className="text-sm text-white/50 hover:text-white flex items-center gap-1 transition-colors">
              Ver todos
              <span>→</span>
            </button>
          </div>
        </motion.section>

        {/* Quick Tools */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">
            Acesso Rápido
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {tools.map((tool, index) => (
              <motion.button
                key={tool.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45 + index * 0.03 }}
                onClick={() => onOpenStudio(tool.id)}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.1] hover:bg-white/[0.04] transition-all group"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity`}>
                  <tool.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs text-white/60 group-hover:text-white transition-colors text-center">
                  {tool.name}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.section>

      </div>
    </div>
  );
};

export default Dashboard;
