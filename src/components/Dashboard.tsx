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
  Sparkles,
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
    // Redirect to /builder with template loaded
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
    <div className="flex-1 overflow-auto relative">
      {/* Background - Same as Home */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10" />
      
      {/* Animated glow orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[150px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.03, 0.08, 0.03],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-orange-500/15 blur-[120px] pointer-events-none"
      />

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.01] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(24, 100%, 50%) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(24, 100%, 50%) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Seu 2025 Codia está aqui</span>
            <span className="text-muted-foreground">→</span>
          </motion.div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight"
          >
            Olá, {userName}!
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground mb-8"
          >
            Peça para a Codia criar{" "}
            <TypingEffect 
              texts={typingTexts}
              className="text-primary"
            />
          </motion.p>
          
          {/* Main Input */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="max-w-2xl mx-auto"
          >
            <form onSubmit={handleSubmit}>
              <div className="relative bg-card border border-border rounded-2xl p-4 focus-within:border-primary/30 focus-within:ring-4 focus-within:ring-primary/5 transition-all shadow-lg">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Descreva o que você quer criar..."
                  className="w-full bg-transparent text-foreground text-lg placeholder:text-muted-foreground/50 outline-none mb-4"
                />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      <Paperclip className="w-4 h-4" />
                      <span className="hidden sm:inline">Anexar</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowTemplates(true)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      <LayoutTemplate className="w-4 h-4" />
                      <span className="hidden sm:inline">Templates</span>
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                    >
                      <Mic className="w-5 h-5" />
                    </button>
                    <button
                      type="submit"
                      className="w-10 h-10 rounded-full bg-gradient-orange hover:opacity-90 flex items-center justify-center text-white transition-all shadow-lg shadow-primary/30"
                    >
                      <ArrowUp className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.section>

        {/* Quick Tools - Moved up */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Acesso Rápido
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {tools.map((tool, index) => (
              <motion.button
                key={tool.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 + index * 0.03 }}
                onClick={() => onOpenStudio(tool.id)}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card/50 border border-border hover:border-primary/30 hover:bg-card transition-all group"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity`}>
                  <tool.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors text-center">
                  {tool.name}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Projects Section - Moved down */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          {/* Tabs */}
          <div className="flex items-center gap-1 mb-6 p-1 bg-secondary/30 rounded-xl w-fit border border-border">
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

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + index * 0.05 }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group relative bg-card/50 border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all cursor-pointer"
              >
                {/* Preview area */}
                <div className="h-36 bg-secondary/30 relative">
                  {/* Fake preview content */}
                  <div className="absolute inset-3 bg-card rounded-lg border border-border overflow-hidden">
                    <div className="h-3 bg-secondary/50 flex items-center gap-1 px-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-destructive/50" />
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/50" />
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400/50" />
                    </div>
                    <div className="p-2 space-y-1.5">
                      <div className="h-2 bg-primary/20 rounded w-1/2" />
                      <div className="h-1.5 bg-secondary rounded w-full" />
                      <div className="h-1.5 bg-secondary/50 rounded w-3/4" />
                    </div>
                  </div>

                  {/* Star button */}
                  <button 
                    className={`absolute top-2 right-2 w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                      project.starred 
                        ? 'bg-amber-500/20 text-amber-400' 
                        : 'bg-black/30 text-muted-foreground opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${project.starred ? 'fill-current' : ''}`} />
                  </button>

                  {/* More button */}
                  <button className="absolute top-2 right-10 w-7 h-7 rounded-lg bg-black/30 flex items-center justify-center text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-foreground transition-all">
                    <MoreHorizontal className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-4 h-4 rounded bg-gradient-orange flex items-center justify-center">
                      <Globe className="w-2.5 h-2.5 text-white" />
                    </div>
                    <h3 className="font-medium text-foreground text-sm truncate">{project.name}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
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
              transition={{ delay: 0.6 }}
              onClick={() => onOpenStudio("business")}
              className="h-full min-h-[180px] flex flex-col items-center justify-center gap-3 bg-card/30 border border-dashed border-border rounded-2xl hover:border-primary/30 hover:bg-primary/5 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-secondary group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                <Plus className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <span className="text-sm text-muted-foreground group-hover:text-foreground">Criar novo projeto</span>
            </motion.button>
          </div>

          {/* Browse All */}
          <div className="flex justify-end mt-4">
            <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
              Ver todos
              <span>→</span>
            </button>
          </div>
        </motion.section>

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
