import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Globe, 
  Star, 
  MoreHorizontal, 
  FolderOpen, 
  Clock,
  Search,
  Grid,
  List,
  Plus,
  Palette
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  name: string;
  type: string;
  status: "active" | "draft" | "published";
  updatedAt: string;
  starred: boolean;
  prompt?: string;
  code?: string | null;
}

interface AllProjectsProps {
  projects?: Project[];
  onSelectProject?: (project: Project) => void;
  onNewProject?: () => void;
}

const statusColors = {
  active: "bg-blue-500/20 text-blue-400",
  draft: "bg-yellow-500/20 text-yellow-400",
  published: "bg-green-500/20 text-green-400",
};

const statusLabels = {
  active: "Em andamento",
  draft: "Rascunho",
  published: "Publicado",
};

const AllProjects = ({ onSelectProject, onNewProject }: AllProjectsProps) => {
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });

      if (!error && data) {
        const formattedProjects: Project[] = data.map((p) => ({
          id: p.id,
          name: p.name,
          type: p.code ? "Website" : "Projeto",
          status: p.code ? "published" : "draft",
          updatedAt: formatDate(p.updated_at),
          starred: false,
          prompt: p.prompt,
          code: p.code
        }));
        setUserProjects(formattedProjects);
      }
      setLoading(false);
    };

    loadProjects();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return "Agora";
    if (diffHours < 24) return `Há ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
    if (diffDays === 1) return "Ontem";
    if (diffDays < 7) return `${diffDays} dias atrás`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} semana${diffDays >= 14 ? 's' : ''} atrás`;
    return `${Math.floor(diffDays / 30)} mês${diffDays >= 60 ? 'es' : ''} atrás`;
  };

  const projects = userProjects;
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filter, setFilter] = useState<"all" | "active" | "draft" | "published">("all");

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || project.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex-1 overflow-auto bg-[hsl(0,0%,4%)]">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Todos os Projetos
            </h1>
            <p className="text-white/50">
              {filteredProjects.length} projeto(s) encontrado(s)
            </p>
          </div>
          <Button
            onClick={onNewProject}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium"
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Projeto
          </Button>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 mb-6"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar projetos..."
              className="w-full h-10 pl-10 pr-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder:text-white/30 text-sm outline-none focus:border-orange-500/30"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2">
            {(["all", "active", "draft", "published"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === f
                    ? "bg-white/[0.08] text-white"
                    : "text-white/50 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {f === "all" ? "Todos" : statusLabels[f]}
              </button>
            ))}
          </div>

          {/* View Mode */}
          <div className="flex items-center gap-1 p-1 bg-white/[0.03] rounded-lg">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded ${viewMode === "grid" ? "bg-white/[0.08] text-white" : "text-white/40"}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded ${viewMode === "list" ? "bg-white/[0.08] text-white" : "text-white/40"}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Projects Grid/List */}
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <FolderOpen className="w-16 h-16 text-white/10 mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Nenhum projeto encontrado</h3>
            <p className="text-white/40 mb-6">Tente ajustar os filtros ou criar um novo projeto</p>
            <Button
              onClick={onNewProject}
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Criar Primeiro Projeto
            </Button>
          </motion.div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onSelectProject?.(project)}
                className="group p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all cursor-pointer"
              >
                {/* Preview */}
                <div className="aspect-video rounded-xl bg-[hsl(0,0%,6%)] border border-white/[0.04] mb-4 overflow-hidden relative">
                  <div className="absolute inset-2 bg-[hsl(0,0%,8%)] rounded-lg">
                    <div className="h-2.5 bg-white/[0.03] flex items-center gap-1 px-1.5">
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

                  {/* Favorite button */}
                  <button 
                    className={`absolute top-2 right-2 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                      project.starred 
                        ? 'bg-amber-500/20 text-amber-400' 
                        : 'bg-black/30 text-white/40 opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <Star className={`w-4 h-4 ${project.starred ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Info */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-5 h-5 rounded bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                        <Globe className="w-3 h-3 text-white" />
                      </div>
                      <h3 className="font-medium text-white text-sm truncate">{project.name}</h3>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/40">
                      <span className={`px-2 py-0.5 rounded-full ${statusColors[project.status]}`}>
                        {statusLabels[project.status]}
                      </span>
                      <span>•</span>
                      <span>{project.updatedAt}</span>
                    </div>
                  </div>
                  <button className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/[0.06] opacity-0 group-hover:opacity-100 transition-all">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => onSelectProject?.(project)}
                className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-white text-sm truncate">{project.name}</h3>
                  <p className="text-xs text-white/40">{project.type}</p>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs ${statusColors[project.status]}`}>
                  {statusLabels[project.status]}
                </span>

                <div className="flex items-center gap-2 text-xs text-white/30">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{project.updatedAt}</span>
                </div>

                <button 
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    project.starred ? 'text-amber-400' : 'text-white/20 hover:text-white/60'
                  }`}
                >
                  <Star className={`w-4 h-4 ${project.starred ? 'fill-current' : ''}`} />
                </button>

                <button className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/[0.06] opacity-0 group-hover:opacity-100 transition-all">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProjects;
