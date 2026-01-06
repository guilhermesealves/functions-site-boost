import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import Dashboard from "@/components/Dashboard";
import StudioLayout from "@/components/StudioLayout";
import MainSidebar from "@/components/MainSidebar";
import AllProjects from "@/components/AllProjects";
import Footer from "@/components/Footer";
import TemplatesModal from "@/components/templates/TemplatesModal";
import { Template } from "@/components/templates/TemplatesData";
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
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("dashboard");
  const [initialTool, setInitialTool] = useState("business");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [currentSection, setCurrentSection] = useState("home");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const initialPromptProcessed = useRef(false);

  // Proper auth state management with session storage
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        setTimeout(() => loadProjects(), 0);
      } else if (event === "SIGNED_OUT") {
        navigate("/auth");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        setTimeout(() => loadProjects(), 0);
      } else {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Handle template selection from navigation state
  useEffect(() => {
    const state = location.state as { prompt?: string; tool?: string; selectedTemplate?: Template } | null;
    
    if (state?.selectedTemplate && !initialPromptProcessed.current) {
      initialPromptProcessed.current = true;
      setSelectedTemplate(state.selectedTemplate);
      setInitialTool("website");
      setViewMode("studio");
      window.history.replaceState({}, document.title);
    } else if (state?.prompt && !initialPromptProcessed.current) {
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
    setSelectedTemplate(null);
    setInitialTool("business");
    setViewMode("studio");
  };

  const handleSelectTemplate = (template: Template) => {
    toast.success(`Template "${template.name}" selecionado!`);
    setShowTemplates(false);
    setSelectedTemplate(template);
    setInitialTool("website");
    setViewMode("studio");
  };

  const handleSidebarNavigate = (section: string) => {
    setCurrentSection(section);
    if (section === "home") {
      setViewMode("dashboard");
    }
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

  // Show Dashboard with Main Sidebar
  if (viewMode === "dashboard") {
    return (
      <div className="min-h-screen flex bg-[hsl(0,0%,4%)]">
        <MainSidebar 
          userName={userName}
          onNavigate={handleSidebarNavigate}
          onOpenTemplates={() => setShowTemplates(true)}
          currentSection={currentSection}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          onNewProject={handleNewProject}
        />
        <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            {currentSection === "all-projects" || currentSection === "starred" || currentSection === "shared" ? (
              <AllProjects 
                onNewProject={handleNewProject}
                onSelectProject={(project: any) => {
                  handleSelectProject(project);
                  setViewMode("studio");
                }}
              />
            ) : (
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
            )}
          </div>
          <Footer />
        </div>

        <TemplatesModal 
          isOpen={showTemplates}
          onClose={() => setShowTemplates(false)}
          onSelectTemplate={handleSelectTemplate}
        />
      </div>
    );
  }

  // Show Studio Layout
  return (
    <StudioLayout 
      onGoHome={() => {
        setViewMode("dashboard");
        setSelectedTemplate(null);
      }}
      initialTool={initialTool}
      onSendMessage={handleSendMessage}
      user={user}
      projects={projects}
      onSelectProject={handleSelectProject}
      currentProjectId={currentProject?.id}
      onNewProject={handleNewProject}
      selectedTemplate={selectedTemplate}
    />
  );
};

export default Builder;
