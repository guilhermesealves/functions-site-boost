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

interface Tool {
  id: string;
  name: string;
  icon: React.ElementType;
  gradient: string;
  iconColor: string;
}

// Tools with orange border style - no fill, just outline
const tools: Tool[] = [
  { id: "business", name: "Plano de Negócio", icon: Briefcase, gradient: "border-primary", iconColor: "text-primary" },
  { id: "branding", name: "Branding", icon: Palette, gradient: "border-primary", iconColor: "text-primary" },
  { id: "logo", name: "Logo & Visual", icon: PenTool, gradient: "border-primary", iconColor: "text-primary" },
  { id: "website", name: "Website", icon: Globe, gradient: "border-primary", iconColor: "text-primary" },
  { id: "copywriter", name: "Copywriter", icon: FileText, gradient: "border-primary", iconColor: "text-primary" },
  { id: "marketing", name: "Marketing", icon: TrendingUp, gradient: "border-primary", iconColor: "text-primary" },
  { id: "sales", name: "Vendas", icon: Target, gradient: "border-primary", iconColor: "text-primary" },
];

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
    <div className="flex-1 overflow-x-hidden overflow-y-auto relative min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10" />
      
      {/* Animated glow orbs */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.06, 0.12, 0.06],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-primary/30 blur-[150px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.04, 0.08, 0.04],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-violet-500/20 blur-[120px] pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Main centered content */}
        <div className="flex-1 flex flex-col items-center justify-start px-6 pt-16">
          
          {/* Welcome text */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-semibold text-foreground mb-3 italic"
          >
            Vamos criar algo, {userName}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground mb-8"
          >
            Peça para a Codia criar{" "}
            <TypingEffect 
              texts={typingTexts}
              className="text-primary"
            />
          </motion.p>

          {/* Main Input - Clean design without dividers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="w-full max-w-2xl mb-12"
          >
            <form onSubmit={handleSubmit}>
              <div className="relative bg-card border border-border rounded-2xl p-4 focus-within:border-primary/30 transition-all shadow-lg shadow-black/20">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Descreva o que você quer criar..."
                  className="w-full bg-transparent text-foreground text-lg placeholder:text-muted-foreground/50 outline-none mb-3"
                />
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      <Paperclip className="w-4 h-4" />
                      <span>Anexar</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowTemplates(true)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      <LayoutTemplate className="w-4 h-4" />
                      <span>Templates</span>
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Mic className="w-5 h-5" />
                    </button>
                    <button
                      type="submit"
                      className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center text-primary-foreground transition-all"
                    >
                      <ArrowUp className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </motion.div>

          {/* Quick Tools - Ferramentas IAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-4xl"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              {/* Animated Infinity Symbol */}
              <motion.span 
                className="text-lg text-primary font-light"
                animate={{
                  textShadow: [
                    "0 0 4px hsl(24, 100%, 55%)",
                    "0 0 12px hsl(24, 100%, 55%)",
                    "0 0 4px hsl(24, 100%, 55%)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                ∞
              </motion.span>
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Ferramentas IAs
              </h2>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              {tools.map((tool, index) => (
                <motion.button
                  key={tool.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25 + index * 0.03 }}
                  onClick={() => onOpenStudio(tool.id)}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border/50 hover:border-primary/50 bg-card/50 backdrop-blur-sm transition-all group min-w-[100px] hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className={`w-12 h-12 rounded-xl ${tool.gradient} border-2 bg-transparent flex items-center justify-center`}>
                    <tool.icon className={`w-6 h-6 ${tool.iconColor}`} />
                  </div>
                  <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors text-center">
                    {tool.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="px-6 py-8 mt-auto"
        >
          <div className="max-w-5xl mx-auto">
            {/* Tabs and Browse All */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-1 p-1 bg-secondary/30 rounded-xl border border-border">
                <button 
                  onClick={() => setActiveTab("recent")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === "recent" 
                      ? 'bg-card text-foreground shadow-sm' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Visualizados recentemente
                </button>
                <button 
                  onClick={() => setActiveTab("projects")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === "projects" 
                      ? 'bg-card text-foreground shadow-sm' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Meus projetos
                </button>
                <button 
                  onClick={() => setShowTemplates(true)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-2 transition-all"
                >
                  Templates
                  <span className="text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded">Novo</span>
                </button>
              </div>
              
              <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
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
                  transition={{ delay: 0.35 + index * 0.05 }}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-white/20 transition-all cursor-pointer hover:shadow-lg hover:shadow-black/20"
                >
                  {/* Preview area */}
                  <div className="h-28 bg-secondary/30 relative">
                    <div className="absolute inset-2 bg-card rounded-lg border border-border overflow-hidden">
                      <div className="h-3 bg-secondary/50 flex items-center gap-1 px-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-destructive/50" />
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/50" />
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400/50" />
                      </div>
                      <div className="p-2 space-y-1">
                        <div className="h-2 bg-gradient-to-r from-violet-500/40 to-purple-500/40 rounded w-1/2" />
                        <div className="h-1.5 bg-secondary rounded w-full" />
                        <div className="h-1.5 bg-secondary/50 rounded w-3/4" />
                      </div>
                    </div>

                    {/* Star button */}
                    <button 
                      className={`absolute top-1.5 right-1.5 w-6 h-6 rounded-md flex items-center justify-center transition-all ${
                        project.starred 
                          ? 'bg-amber-500/20 text-amber-400' 
                          : 'bg-black/30 text-muted-foreground opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      <Star className={`w-3 h-3 ${project.starred ? 'fill-current' : ''}`} />
                    </button>

                    {/* More button */}
                    <button className="absolute top-1.5 right-8 w-6 h-6 rounded-md bg-black/30 flex items-center justify-center text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-foreground transition-all">
                      <MoreHorizontal className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <h3 className="font-medium text-foreground text-sm truncate mb-0.5">{project.name}</h3>
                    <div className="text-xs text-muted-foreground">
                      {project.updatedAt}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* New Project Card */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => onOpenStudio("business")}
                className="h-full min-h-[160px] flex flex-col items-center justify-center gap-2 border border-dashed border-border rounded-xl hover:border-white/20 hover:bg-card/50 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-secondary group-hover:bg-gradient-to-br group-hover:from-violet-600 group-hover:to-purple-700 flex items-center justify-center transition-all">
                  <Plus className="w-5 h-5 text-muted-foreground group-hover:text-white transition-colors" />
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-foreground">Criar novo</span>
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
