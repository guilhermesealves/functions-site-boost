import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Send, Sparkles, LogOut, Code, Eye, Loader2, Copy, Check, Save, FolderOpen, Plus, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Project {
  id: string;
  name: string;
  prompt: string;
  code: string | null;
  created_at: string;
}

const Builder = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCode, setShowCode] = useState(true);
  const [copied, setCopied] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [showProjects, setShowProjects] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [projectName, setProjectName] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        setTimeout(() => loadProjects(), 0);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [messages, showCode]);

  const loadProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("updated_at", { ascending: false });
    
    if (!error && data) {
      setProjects(data);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const extractCode = (content: string): string | null => {
    const codeMatch = content.match(/```(?:html|jsx|tsx|css|javascript|js)?\n?([\s\S]*?)```/);
    return codeMatch ? codeMatch[1].trim() : null;
  };

  const formatMessage = (content: string): string => {
    // Remove code blocks for display in chat
    return content.replace(/```(?:html|jsx|tsx|css|javascript|js)?\n?[\s\S]*?```/g, "[Código gerado - veja no painel →]");
  };

  const copyCode = () => {
    const lastAssistant = messages.filter(m => m.role === "assistant").pop();
    if (lastAssistant) {
      const code = extractCode(lastAssistant.content);
      if (code) {
        navigator.clipboard.writeText(code);
        setCopied(true);
        toast.success("Código copiado!");
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const saveProject = async () => {
    if (!user) return;

    const lastAssistant = messages.filter(m => m.role === "assistant").pop();
    const code = lastAssistant ? extractCode(lastAssistant.content) : null;
    const firstUserMessage = messages.find(m => m.role === "user");

    if (!firstUserMessage) {
      toast.error("Nada para salvar ainda");
      return;
    }

    const name = projectName || `Projeto ${new Date().toLocaleDateString("pt-BR")}`;

    if (currentProject) {
      const { error } = await supabase
        .from("projects")
        .update({ code, name })
        .eq("id", currentProject.id);

      if (error) {
        toast.error("Erro ao atualizar projeto");
      } else {
        toast.success("Projeto atualizado!");
        loadProjects();
      }
    } else {
      const { data, error } = await supabase
        .from("projects")
        .insert({
          user_id: user.id,
          name,
          prompt: firstUserMessage.content,
          code,
        })
        .select()
        .single();

      if (error) {
        toast.error("Erro ao salvar projeto");
      } else {
        toast.success("Projeto salvo!");
        setCurrentProject(data);
        loadProjects();
      }
    }
  };

  const loadProject = (project: Project) => {
    setCurrentProject(project);
    setProjectName(project.name);
    setMessages([
      { role: "user", content: project.prompt },
      ...(project.code ? [{ role: "assistant" as const, content: "```html\n" + project.code + "\n```" }] : []),
    ]);
    setShowProjects(false);
  };

  const newProject = () => {
    setCurrentProject(null);
    setProjectName("");
    setMessages([]);
    setInput("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    let assistantContent = "";

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-site`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ prompt: input }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao gerar site");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("Erro ao ler resposta");

      const decoder = new TextDecoder();
      let buffer = "";

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
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                  return prev.map((m, i) => 
                    i === prev.length - 1 ? { ...m, content: assistantContent } : m
                  );
                }
                return [...prev, { role: "assistant", content: assistantContent }];
              });
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "Erro ao gerar site");
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "Desculpe, ocorreu um erro. Tente novamente." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const lastAssistantMessage = messages.filter(m => m.role === "assistant").pop();
  const generatedCode = lastAssistantMessage ? extractCode(lastAssistantMessage.content) : null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/30 bg-[hsl(0,0%,3%)] sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-orange flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-primary-foreground font-display font-bold text-lg">F</span>
              </div>
              <span className="font-display font-bold text-lg hidden sm:block">Functions</span>
            </a>

            <div className="h-6 w-px bg-border/50 hidden sm:block" />

            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={newProject}
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Novo</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowProjects(!showProjects)}
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <FolderOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Projetos</span>
                {projects.length > 0 && (
                  <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center">
                    {projects.length}
                  </span>
                )}
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {generatedCode && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={saveProject}
                className="gap-2 border-primary/30 text-primary hover:bg-primary/10"
              >
                <Save className="w-4 h-4" />
                <span className="hidden sm:inline">Salvar</span>
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2 text-muted-foreground">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Projects Sidebar */}
      <AnimatePresence>
        {showProjects && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="fixed left-0 top-[57px] bottom-0 w-72 bg-[hsl(0,0%,3%)] border-r border-border/30 z-40 overflow-y-auto"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Seus Projetos</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowProjects(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              {projects.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Nenhum projeto salvo ainda
                </p>
              ) : (
                <div className="space-y-2">
                  {projects.map((project) => (
                    <button
                      key={project.id}
                      onClick={() => loadProject(project)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        currentProject?.id === project.id
                          ? "bg-primary/10 border-primary/30"
                          : "bg-secondary/30 border-border/30 hover:bg-secondary/50"
                      }`}
                    >
                      <p className="font-medium text-sm truncate">{project.name}</p>
                      <p className="text-xs text-muted-foreground truncate mt-1">{project.prompt}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Chat Panel */}
        <div className="w-full lg:w-1/2 flex flex-col border-r border-border/30">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-16 h-16 rounded-2xl bg-gradient-orange flex items-center justify-center mb-6 shadow-xl shadow-primary/30"
                >
                  <Sparkles className="w-8 h-8 text-primary-foreground" />
                </motion.div>
                <h2 className="font-display text-xl font-bold mb-2">
                  Descreva seu site
                </h2>
                <p className="text-muted-foreground text-sm max-w-sm">
                  Diga o que você precisa e a IA vai gerar o código. Seja específico!
                </p>
                <div className="flex flex-wrap gap-2 mt-6 justify-center">
                  {["Landing page moderna", "Portfolio criativo", "Blog minimalista"].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setInput(suggestion)}
                      className="px-3 py-1.5 text-xs bg-secondary/50 hover:bg-secondary rounded-full border border-border transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[90%] rounded-2xl px-4 py-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary/30 border border-border/50"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">
                      {message.role === "assistant" ? formatMessage(message.content) : message.content}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-secondary/30 border border-border/50 rounded-2xl px-4 py-3 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">Gerando código...</span>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border/30 bg-[hsl(0,0%,3%)]">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Descreva o site que você quer criar..."
                className="flex-1 px-4 py-3 bg-secondary/30 border border-border/50 rounded-xl focus:outline-none focus:border-primary/50 transition-colors text-sm"
                disabled={isLoading}
              />
              <Button type="submit" variant="hero" disabled={isLoading || !input.trim()} className="px-4">
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="hidden lg:flex flex-1 flex-col bg-[hsl(0,0%,2%)]">
          {/* Preview Header */}
          <div className="flex items-center justify-between p-3 border-b border-border/30 bg-[hsl(0,0%,3%)]">
            <div className="flex items-center gap-1 bg-secondary/30 rounded-lg p-1">
              <button
                onClick={() => setShowCode(true)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  showCode ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Code className="w-4 h-4 inline mr-1.5" />
                Código
              </button>
              <button
                onClick={() => setShowCode(false)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  !showCode ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Eye className="w-4 h-4 inline mr-1.5" />
                Preview
              </button>
            </div>

            {generatedCode && (
              <Button variant="ghost" size="sm" onClick={copyCode} className="gap-2 text-muted-foreground">
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copiado!" : "Copiar"}
              </Button>
            )}
          </div>

          {/* Preview Content */}
          <div className="flex-1 overflow-auto">
            {!generatedCode ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="w-14 h-14 rounded-xl bg-secondary/30 flex items-center justify-center mb-4">
                  <Code className="w-7 h-7 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-sm">
                  O código gerado aparecerá aqui
                </p>
              </div>
            ) : showCode ? (
              <div className="p-4">
                <pre className="text-sm font-mono rounded-xl overflow-auto bg-[hsl(0,0%,6%)] border border-border/30">
                  <code ref={codeRef} className="language-markup block p-4">
                    {generatedCode}
                  </code>
                </pre>
              </div>
            ) : (
              <div className="h-full p-4">
                <div className="bg-white rounded-xl overflow-hidden h-full shadow-2xl">
                  <iframe
                    srcDoc={generatedCode}
                    className="w-full h-full border-0"
                    title="Preview"
                    sandbox="allow-scripts"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
