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
  ArrowUp,
  Paperclip,
  Plus,
  Mic,
  Star,
  MoreHorizontal,
  MessageSquare,
  LayoutTemplate
} from "lucide-react";
import TypingEffect from "./TypingEffect";
import TemplatesModal from "./templates/TemplatesModal";
import { Template } from "./templates/TemplatesData";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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

const typingTexts = [
  "um plano de negócio completo...",
  "uma marca profissional...",
  "um site moderno e elegante...",
  "textos que convertem...",
  "estratégias de marketing..."
];

const Dashboard = ({ onStartWebsite, onOpenStudio, projects = [], userName = "você" }: DashboardProps) => {
  const [input, setInput] = useState("");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"recent" | "projects" | "templates">("recent");
  const [showTemplates, setShowTemplates] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onOpenStudio("business");
    }
  };

  const handleSelectTemplate = (template: Template) => {
    toast.success(`Template "${template.name}" selecionado!`);
    setShowTemplates(false);
    navigate("/builder", { 
      state: { 
        selectedTemplate: template,
        tool: "website"
      }
    });
  };

  // Mock projects for display
  const displayProjects = projects.length > 0 ? projects : [
    { id: "1", name: "E-commerce Fashion", type: "Website", updatedAt: "Há 2 horas", starred: true },
    { id: "2", name: "App de Delivery", type: "Plano de Negócio", updatedAt: "Ontem", starred: false },
    { id: "3", name: "Marca de Cosméticos", type: "Branding", updatedAt: "3 dias atrás", starred: true },
  ];

  return (
    <div className="flex-1 overflow-auto relative min-h-screen">
      {/* Lovable-style gradient background */}
      <div className="absolute inset-0 bg-[#0D0D0F]" />
      
      {/* Main gradient - purple/pink/orange blend */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 40%, 
              rgba(139, 92, 246, 0.3) 0%,
              rgba(236, 72, 153, 0.25) 30%,
              rgba(251, 146, 60, 0.2) 50%,
              transparent 70%
            )
          `
        }}
      />
      
      {/* Animated glow layers */}
      <motion.div
        animate={{
          opacity: [0.4, 0.6, 0.4],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px]"
        style={{
          background: `radial-gradient(ellipse at center, rgba(139, 92, 246, 0.4) 0%, transparent 60%)`,
          filter: 'blur(60px)',
        }}
      />
      <motion.div
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1.05, 1, 1.05],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px]"
        style={{
          background: `radial-gradient(ellipse at center, rgba(236, 72, 153, 0.35) 0%, transparent 60%)`,
          filter: 'blur(80px)',
        }}
      />
      <motion.div
        animate={{
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px]"
        style={{
          background: `radial-gradient(ellipse at center, rgba(251, 146, 60, 0.3) 0%, transparent 60%)`,
          filter: 'blur(100px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Main centered content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 pt-8 pb-4">
          
          {/* Welcome text */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-semibold text-white mb-8 italic"
          >
            Vamos criar algo, {userName}
          </motion.h1>

          {/* Main Input - Lovable style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full max-w-2xl"
          >
            <form onSubmit={handleSubmit}>
              <div className="relative bg-[#1A1A1F] border border-[#2A2A32] rounded-2xl overflow-hidden shadow-2xl">
                {/* Input area */}
                <div className="p-4 pb-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Peça a Codia para criar um protótipo..."
                    className="w-full bg-transparent text-white/90 text-base placeholder:text-white/40 outline-none"
                  />
                </div>
                
                {/* Bottom bar with buttons */}
                <div className="flex items-center justify-between px-4 pb-4">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-white/10 text-white/50 hover:text-white/80 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white/90 text-sm transition-colors"
                    >
                      <Paperclip className="w-4 h-4" />
                      <span>Anexar</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowTemplates(true)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white/90 text-sm transition-colors"
                    >
                      <LayoutTemplate className="w-4 h-4" />
                      <span>Theme</span>
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 text-white/70 hover:bg-white/15 text-sm transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Chat</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-white/10 text-white/50 hover:text-white/80 transition-colors"
                    >
                      <Mic className="w-5 h-5" />
                    </button>
                    <button
                      type="submit"
                      className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Bottom Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#0D0D0F]/80 backdrop-blur-xl border-t border-white/5 px-6 py-6"
        >
          <div className="max-w-5xl mx-auto">
            {/* Tabs and Browse All */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl">
                <button 
                  onClick={() => setActiveTab("recent")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === "recent" 
                      ? 'bg-white/10 text-white' 
                      : 'text-white/50 hover:text-white/70'
                  }`}
                >
                  Visualizados recentemente
                </button>
                <button 
                  onClick={() => setActiveTab("projects")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === "projects" 
                      ? 'bg-white/10 text-white' 
                      : 'text-white/50 hover:text-white/70'
                  }`}
                >
                  Meus projetos
                </button>
                <button 
                  onClick={() => setShowTemplates(true)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white/50 hover:text-white/70 transition-all"
                >
                  Templates
                </button>
              </div>
              
              <button className="text-sm text-white/50 hover:text-white/70 flex items-center gap-1 transition-colors">
                Ver todos
                <span>→</span>
              </button>
            </div>

            {/* Project Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {displayProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className="group relative bg-[#1A1A1F] border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all cursor-pointer"
                >
                  {/* Preview area */}
                  <div className="h-28 bg-[#12121A] relative">
                    <div className="absolute inset-2 bg-[#1A1A1F] rounded-lg border border-white/5 overflow-hidden">
                      <div className="h-3 bg-white/5 flex items-center gap-1 px-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400/50" />
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/50" />
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400/50" />
                      </div>
                      <div className="p-2 space-y-1">
                        <div className="h-2 bg-primary/30 rounded w-1/2" />
                        <div className="h-1.5 bg-white/10 rounded w-full" />
                        <div className="h-1.5 bg-white/5 rounded w-3/4" />
                      </div>
                    </div>

                    {/* Star button */}
                    <button 
                      className={`absolute top-1.5 right-1.5 w-6 h-6 rounded-md flex items-center justify-center transition-all ${
                        project.starred 
                          ? 'bg-amber-500/20 text-amber-400' 
                          : 'bg-black/40 text-white/40 opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      <Star className={`w-3 h-3 ${project.starred ? 'fill-current' : ''}`} />
                    </button>

                    {/* More button */}
                    <button className="absolute top-1.5 right-8 w-6 h-6 rounded-md bg-black/40 flex items-center justify-center text-white/40 opacity-0 group-hover:opacity-100 hover:text-white/60 transition-all">
                      <MoreHorizontal className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <h3 className="font-medium text-white/90 text-sm truncate mb-0.5">{project.name}</h3>
                    <div className="text-xs text-white/40">
                      {project.updatedAt}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* New Project Card */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                onClick={() => onOpenStudio("business")}
                className="h-full min-h-[160px] flex flex-col items-center justify-center gap-2 bg-[#1A1A1F]/50 border border-dashed border-white/10 rounded-xl hover:border-white/20 hover:bg-[#1A1A1F] transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-white/10 flex items-center justify-center transition-colors">
                  <Plus className="w-5 h-5 text-white/40 group-hover:text-white/60 transition-colors" />
                </div>
                <span className="text-sm text-white/40 group-hover:text-white/60">Criar novo</span>
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
