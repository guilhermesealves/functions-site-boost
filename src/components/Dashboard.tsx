import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowUp,
  Paperclip,
  LayoutTemplate,
  Mic,
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

const typingTexts = [
  "seu império digital do zero...",
  "uma marca de milhões...",
  "o próximo unicórnio...",
  "sua visão em realidade..."
];

const suggestionChips = [
  "E-commerce moderno",
  "Marca de cosméticos",
  "Landing page startup",
  "Blog minimalista"
];

const Dashboard = ({ onStartWebsite, onOpenStudio, projects = [], userName = "você" }: DashboardProps) => {
  const [input, setInput] = useState("");
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
    <div className="flex-1 overflow-x-hidden overflow-y-auto relative min-h-screen bg-background bg-grain">
      {/* Animated background orbs */}
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
        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-start px-6 pt-16 lg:pt-24">
          
          {/* Giant welcome text */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-foreground text-center mb-4 tracking-tight leading-tight"
          >
            Vamos construir seu império{" "}
            <span className="text-gradient-orange">milionário</span>,
            <br />
            <span className="text-primary">{userName}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-muted-foreground mb-8 text-center"
          >
            Descreva sua empresa e deixe a IA criar{" "}
            <TypingEffect 
              texts={typingTexts}
              className="text-primary font-medium"
            />
          </motion.p>

          {/* Giant Input - Central prompt */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full max-w-3xl mb-6"
          >
            <form onSubmit={handleSubmit}>
              <div className="relative bg-[#1a1a1a]/80 border border-[#2a2a2a] rounded-2xl p-5 focus-within:border-primary/50 focus-within:glow-orange transition-all duration-300 backdrop-blur-sm shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Descreva sua empresa/loja... Ex: E-commerce de moda com IA gerenciando tudo"
                  className="w-full bg-transparent text-foreground text-lg placeholder:text-muted-foreground/60 outline-none mb-5 font-medium tracking-wide"
                />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-[#252525] text-muted-foreground hover:text-foreground text-sm transition-all"
                    >
                      <Paperclip className="w-4 h-4" />
                      <span className="hidden sm:inline">Anexar</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowTemplates(true)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-[#252525] text-muted-foreground hover:text-foreground text-sm transition-all"
                    >
                      <LayoutTemplate className="w-4 h-4" />
                      <span className="hidden sm:inline">Templates</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-[#252525] text-muted-foreground hover:text-foreground text-sm transition-all"
                    >
                      <Mic className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-12 h-12 rounded-xl bg-primary hover:bg-primary/90 flex items-center justify-center text-primary-foreground font-bold transition-all glow-orange hover:scale-105 shadow-[0_0_20px_rgba(255,107,0,0.4)]"
                  >
                    <ArrowUp className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </form>
          </motion.div>

          {/* Suggestion Chips */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {suggestionChips.map((chip, index) => (
              <motion.button
                key={chip}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary))" }}
                onClick={() => setInput(chip)}
                className="px-5 py-2.5 rounded-full border border-primary/30 text-muted-foreground hover:text-primary text-sm font-medium transition-all hover:glow-orange hover:bg-primary/5"
              >
                {chip}
              </motion.button>
            ))}
          </motion.div>

        </div>

        {/* Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="px-6 py-12 border-t border-border"
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">
                Projetos Recentes
              </h2>
              <button className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
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
                  transition={{ delay: 0.9 + index * 0.05 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all cursor-pointer hover:glow-orange"
                >
                  {/* Preview area */}
                  <div className="h-32 bg-gradient-to-br from-muted to-transparent relative">
                    <div className="absolute inset-3 bg-background/50 rounded-xl border border-border/50 overflow-hidden backdrop-blur-sm">
                      <div className="h-4 bg-muted flex items-center gap-1.5 px-3">
                        <div className="w-2 h-2 rounded-full bg-destructive/50" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                        <div className="w-2 h-2 rounded-full bg-green-500/50" />
                      </div>
                      <div className="p-3 space-y-2">
                        <div className="h-2 bg-primary/30 rounded w-1/2" />
                        <div className="h-1.5 bg-muted rounded w-full" />
                        <div className="h-1.5 bg-muted/50 rounded w-3/4" />
                      </div>
                    </div>

                    {/* Star button */}
                    <button className={`absolute top-2 right-2 w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                      project.starred 
                        ? "bg-primary/20 text-primary" 
                        : "bg-background/40 text-muted-foreground opacity-0 group-hover:opacity-100"
                    }`}>
                      <Star className={`w-3.5 h-3.5 ${project.starred ? 'fill-current' : ''}`} />
                    </button>

                    <button className="absolute top-2 right-10 w-7 h-7 rounded-lg bg-background/40 flex items-center justify-center text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-foreground transition-all">
                      <MoreHorizontal className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-foreground truncate mb-1">{project.name}</h3>
                    <p className="text-xs text-muted-foreground">{project.updatedAt}</p>
                  </div>
                </motion.div>
              ))}

              {/* New Project Card */}
              <motion.button
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                onClick={() => onOpenStudio("business")}
                whileHover={{ scale: 1.02, y: -2 }}
                className="h-full min-h-[200px] flex flex-col items-center justify-center gap-3 border border-dashed border-border rounded-2xl hover:border-primary/40 hover:bg-primary/5 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-muted group-hover:bg-primary/20 flex items-center justify-center transition-all group-hover:glow-orange">
                  <Plus className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-primary font-medium">Criar novo</span>
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
