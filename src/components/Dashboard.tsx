import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Briefcase,
  Palette,
  PenTool,
  Globe,
  FileText,
  Code,
  MessageSquare,
  TrendingUp,
  Search as SearchIcon,
  Link as LinkIcon,
  ShoppingCart,
  Target,
  Sparkles,
  Copy,
  Share2,
  ArrowUp,
  Paperclip,
  LayoutTemplate,
  Mic,
  Lock,
  Star,
  MoreHorizontal,
  Plus
} from "lucide-react";
import TypingEffect from "./TypingEffect";
import TemplatesModal from "./templates/TemplatesModal";
import { Template } from "./templates/TemplatesData";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useCredits } from "@/hooks/useCredits";

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
  locked?: boolean;
  tier?: "Pro" | "Business";
}

const mainTools: Tool[] = [
  { id: "business", name: "Plano de Negócio", description: "Canvas estratégico completo", icon: Briefcase },
  { id: "branding", name: "Branding", description: "Identidade visual profissional", icon: Palette },
  { id: "logo", name: "Logo & Visual", description: "Logotipos em alta resolução", icon: PenTool },
  { id: "website", name: "Website", description: "Sites modernos e responsivos", icon: Globe },
  { id: "copywriter", name: "Copywriter", description: "Textos que convertem vendas", icon: FileText },
  { id: "development", name: "Desenvolvimento", description: "Código e automações", icon: Code, locked: true, tier: "Pro" },
];

const typingTexts = [
  "um império digital do zero...",
  "uma marca de bilhões...",
  "o próximo unicórnio...",
  "sua visão em realidade..."
];

const suggestionChips = [
  "Landing page para startup",
  "Portfólio profissional",
  "E-commerce moderno",
  "Blog minimalista"
];

const Dashboard = ({ onStartWebsite, onOpenStudio, projects = [], userName = "você" }: DashboardProps) => {
  const [input, setInput] = useState("");
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const navigate = useNavigate();
  const { balance } = useCredits();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onOpenStudio("business");
    }
  };

  const handleSelectTemplate = (template: Template) => {
    toast.success(`Template "${template.name}" selecionado`);
    setShowTemplates(false);
    navigate("/builder", { 
      state: { selectedTemplate: template, tool: "website" }
    });
  };

  const displayProjects = projects.length > 0 ? projects : [
    { id: "1", name: "E-commerce Fashion", type: "Website", updatedAt: "Há 2 horas", starred: true },
    { id: "2", name: "App de Delivery", type: "Plano de Negócio", updatedAt: "Ontem", starred: false },
    { id: "3", name: "Marca de Cosméticos", type: "Branding", updatedAt: "3 dias atrás", starred: true },
  ];

  return (
    <div className="flex-1 overflow-x-hidden overflow-y-auto relative min-h-screen bg-black bg-grain">
      {/* Subtle animated background orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.03, 0.06, 0.03],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-0 right-0 w-[800px] h-[800px] rounded-full bg-primary/30 blur-[200px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.02, 0.04, 0.02],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="fixed bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[180px] pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Hero Section - Centered */}
        <div className="flex-1 flex flex-col items-center justify-start px-6 pt-20 lg:pt-28">
          
          {/* Giant welcome text - Tesla style */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white text-center mb-4 tracking-tight"
          >
            Vamos criar algo{" "}
            <span className="text-gradient-orange">revolucionário</span>,
            <br />
            <span className="text-primary">{userName}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/50 mb-10 text-center"
          >
            Peça para a Codia criar{" "}
            <TypingEffect 
              texts={typingTexts}
              className="text-primary font-medium"
            />
          </motion.p>

          {/* Giant Input - Clean Tesla style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full max-w-3xl mb-8"
          >
            <form onSubmit={handleSubmit}>
              <div className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-5 focus-within:border-primary/40 focus-within:glow-orange transition-all duration-300">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Descreva sua visão de império... Ex: E-commerce de luxo sustentável global"
                  className="w-full bg-transparent text-white text-lg placeholder:text-white/30 outline-none mb-4 font-medium"
                />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-white/5 text-white/40 hover:text-white/70 text-sm transition-all"
                    >
                      <Paperclip className="w-4 h-4" />
                      <span className="hidden sm:inline">Anexar</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowTemplates(true)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-white/5 text-white/40 hover:text-white/70 text-sm transition-all"
                    >
                      <LayoutTemplate className="w-4 h-4" />
                      <span className="hidden sm:inline">Templates</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-white/5 text-white/40 hover:text-white/70 text-sm transition-all"
                    >
                      <Mic className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-12 h-12 rounded-xl bg-primary hover:bg-primary/90 flex items-center justify-center text-black font-bold transition-all hover:glow-orange hover:scale-105"
                  >
                    <ArrowUp className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </form>
          </motion.div>

          {/* Suggestion Chips - Orange outline style */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {suggestionChips.map((chip, index) => (
              <motion.button
                key={chip}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                whileHover={{ scale: 1.05, borderColor: "hsl(24, 100%, 50%)" }}
                onClick={() => setInput(chip)}
                className="px-5 py-2.5 rounded-full border border-primary/30 text-white/70 hover:text-primary text-sm font-medium transition-all hover:glow-orange hover:bg-primary/5"
              >
                {chip}
              </motion.button>
            ))}
          </motion.div>

          {/* Tools Grid - Large cards with lots of whitespace */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="w-full max-w-6xl mb-20"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mainTools.map((tool, index) => (
                <motion.button
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  onClick={() => !tool.locked && onOpenStudio(tool.id)}
                  onMouseEnter={() => setHoveredTool(tool.id)}
                  onMouseLeave={() => setHoveredTool(null)}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative group p-8 rounded-2xl border transition-all duration-300 text-left ${
                    tool.locked 
                      ? "bg-[#050505] border-white/5 cursor-default" 
                      : "bg-[#0a0a0a] border-white/10 hover:border-primary/40 hover:glow-orange"
                  }`}
                >
                  {/* Lock badge for Pro tools */}
                  {tool.locked && tool.tier && (
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
                      <Lock className="w-3 h-3 text-primary" />
                      <span className="text-xs font-semibold text-primary">{tool.tier}</span>
                    </div>
                  )}

                  {/* Icon with glow effect */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 ${
                    tool.locked 
                      ? "bg-white/5" 
                      : "bg-primary/10 group-hover:bg-primary/20 group-hover:glow-orange"
                  }`}>
                    <tool.icon className={`w-7 h-7 ${tool.locked ? "text-white/30" : "text-primary"}`} />
                  </div>

                  {/* Title */}
                  <h3 className={`text-xl font-bold mb-2 ${tool.locked ? "text-white/40" : "text-white"}`}>
                    {tool.name}
                  </h3>

                  {/* Description */}
                  <p className={`text-sm ${tool.locked ? "text-white/20" : "text-white/50"}`}>
                    {tool.description}
                  </p>

                  {/* Hover action */}
                  {!tool.locked && (
                    <div className="mt-6 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm font-semibold">Iniciar</span>
                      <ArrowUp className="w-4 h-4 rotate-45" />
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Projects Section - Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="px-6 py-12 border-t border-white/5"
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">
                Impérios em Construção
              </h2>
              <button className="text-sm text-white/40 hover:text-primary transition-colors flex items-center gap-2">
                Ver todos
                <ArrowUp className="w-4 h-4 rotate-45" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {displayProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.05 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="group relative bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:border-primary/30 transition-all cursor-pointer hover:glow-orange"
                >
                  {/* Preview area */}
                  <div className="h-32 bg-gradient-to-br from-white/5 to-transparent relative">
                    <div className="absolute inset-3 bg-black/50 rounded-xl border border-white/5 overflow-hidden backdrop-blur-sm">
                      <div className="h-4 bg-white/5 flex items-center gap-1.5 px-3">
                        <div className="w-2 h-2 rounded-full bg-red-500/50" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                        <div className="w-2 h-2 rounded-full bg-green-500/50" />
                      </div>
                      <div className="p-3 space-y-2">
                        <div className="h-2 bg-primary/30 rounded w-1/2" />
                        <div className="h-1.5 bg-white/10 rounded w-full" />
                        <div className="h-1.5 bg-white/5 rounded w-3/4" />
                      </div>
                    </div>

                    {/* Star button */}
                    <button className={`absolute top-2 right-2 w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                      project.starred 
                        ? "bg-primary/20 text-primary" 
                        : "bg-black/40 text-white/30 opacity-0 group-hover:opacity-100"
                    }`}>
                      <Star className={`w-3.5 h-3.5 ${project.starred ? 'fill-current' : ''}`} />
                    </button>

                    <button className="absolute top-2 right-10 w-7 h-7 rounded-lg bg-black/40 flex items-center justify-center text-white/30 opacity-0 group-hover:opacity-100 hover:text-white transition-all">
                      <MoreHorizontal className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-white truncate mb-1">{project.name}</h3>
                    <p className="text-xs text-white/30">{project.updatedAt}</p>
                  </div>
                </motion.div>
              ))}

              {/* New Project Card */}
              <motion.button
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.95 }}
                onClick={() => onOpenStudio("business")}
                whileHover={{ scale: 1.02, y: -2 }}
                className="h-full min-h-[200px] flex flex-col items-center justify-center gap-3 border border-dashed border-white/10 rounded-2xl hover:border-primary/40 hover:bg-primary/5 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 group-hover:bg-primary/20 flex items-center justify-center transition-all group-hover:glow-orange">
                  <Plus className="w-6 h-6 text-white/30 group-hover:text-primary transition-colors" />
                </div>
                <span className="text-sm text-white/30 group-hover:text-primary font-medium">Criar novo</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Templates Modal */}
      <TemplatesModal 
        isOpen={showTemplates}
        onClose={() => setShowTemplates(false)}
        onSelectTemplate={handleSelectTemplate}
      />
    </div>
  );
};

export default Dashboard;