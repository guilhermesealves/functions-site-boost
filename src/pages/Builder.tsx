import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import Dashboard from "@/components/Dashboard";
import StudioLayout from "@/components/StudioLayout";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

interface Project {
  id: string;
  name: string;
  prompt: string;
  code: string | null;
  created_at: string;
}

type ViewMode = "dashboard" | "studio";

const Builder = () => {
  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("dashboard");
  const [initialTool, setInitialTool] = useState("business");
  const navigate = useNavigate();
  const location = useLocation();
  const initialPromptProcessed = useRef(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setTimeout(() => loadProjects(), 0);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setTimeout(() => loadProjects(), 0);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const state = location.state as { prompt?: string; tool?: string } | null;
    if (state?.prompt && !initialPromptProcessed.current) {
      initialPromptProcessed.current = true;
      if (state.tool) setInitialTool(state.tool);
      setViewMode("studio");
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const loadProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("updated_at", { ascending: false });
    
    if (!error && data) {
      setProjects(data);
    }
  };

  const handleSelectProject = (project: Project) => {
    setCurrentProject(project);
    toast.success(`Projeto "${project.name}" carregado`);
  };

  const handleNewProject = () => {
    setCurrentProject(null);
    setInitialTool("business");
    setViewMode("studio");
  };

  const handleSendMessage = async (message: string, toolId: string): Promise<string> => {
    if (toolId === "website") {
      try {
        const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-site`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ prompt: message }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Erro ao gerar site");
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error("Erro ao ler resposta");

        const decoder = new TextDecoder();
        let buffer = "";
        let assistantContent = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          
          let newlineIndex: number;
          while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
            let line = buffer.slice(0, newlineIndex);
            buffer = buffer.slice(newlineIndex + 1);

            if (line.endsWith("\r")) line = line.slice(0, -1);
            if (line.startsWith(":") || line.trim() === "") continue;
            if (!line.startsWith("data: ")) continue;

            const jsonStr = line.slice(6).trim();
            if (jsonStr === "[DONE]") break;

            try {
              const parsed = JSON.parse(jsonStr);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                assistantContent += content;
              }
            } catch {
              buffer = line + "\n" + buffer;
              break;
            }
          }
        }
        
        return assistantContent || "Site gerado com sucesso!";
      } catch (error: any) {
        console.error("Error:", error);
        throw new Error(error.message || "Erro ao gerar site");
      }
    }

    return `Esta funcionalidade está sendo desenvolvida. Em breve você poderá usar a IA de ${toolId} para criar conteúdo incrível.`;
  };

  const userName = user?.email?.split("@")[0] || "você";

  // Show Dashboard
  if (viewMode === "dashboard") {
    return (
      <div className="min-h-screen flex flex-col bg-[hsl(0,0%,4%)]">
        <AppHeader 
          user={user} 
          onNewProject={handleNewProject}
        />
        <Dashboard 
          onStartWebsite={() => {
            setInitialTool("website");
            setViewMode("studio");
          }}
          onOpenStudio={(toolId) => {
            if (toolId) setInitialTool(toolId);
            setViewMode("studio");
          }}
          projectContext={currentProject ? { name: currentProject.name, hasWebsite: !!currentProject.code } : undefined}
          projects={projects}
          userName={userName}
        />
        <Footer />
      </div>
    );
  }

  // Show Studio Layout
  return (
    <StudioLayout 
      onGoHome={() => setViewMode("dashboard")}
      initialTool={initialTool}
      onSendMessage={handleSendMessage}
      user={user}
      projects={projects}
      onSelectProject={handleSelectProject}
      currentProjectId={currentProject?.id}
      onNewProject={handleNewProject}
    />
  );
};

export default Builder;
