import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Send, Sparkles, LogOut, Code, Eye, Loader2, Copy, Check, Save, FolderOpen, Plus, X, ArrowUp } from "lucide-react";
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
  const [showCode, setShowCode] = useState(false);
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

  const getCleanMessage = (content: string): string => {
    // Remove code blocks and return only the text explanation
    return content.replace(/```(?:html|jsx|tsx|css|javascript|js)?\n?[\s\S]*?```/g, "").trim();
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
  const userName = user?.email?.split("@")[0] || "você";

  return (
    <div className="min-h-screen bg-[hsl(0,0%,4%)] flex flex-col">
      {/* Header */}
      <header className="border-b border-white/5 bg-[hsl(0,0%,4%)] sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-2.5">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">F</span>
              </div>
            </a>

            <div className="h-5 w-px bg-white/10" />

            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={newProject}
                className="h-8 gap-1.5 text-white/60 hover:text-white hover:bg-white/5 text-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                Novo
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowProjects(!showProjects)}
                className="h-8 gap-1.5 text-white/60 hover:text-white hover:bg-white/5 text-xs"
              >
                <FolderOpen className="w-3.5 h-3.5" />
                Projetos
                {projects.length > 0 && (
                  <span className="w-4 h-4 rounded-full bg-orange-500/20 text-orange-400 text-[10px] flex items-center justify-center">
                    {projects.length}
                  </span>
                )}
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {generatedCode && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={saveProject}
                className="h-8 gap-1.5 text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 text-xs"
              >
                <Save className="w-3.5 h-3.5" />
                Salvar
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout} 
              className="h-8 w-8 p-0 text-white/40 hover:text-white hover:bg-white/5"
            >
              <LogOut className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Projects Sidebar */}
      <AnimatePresence>
        {showProjects && (
          <motion.div
            initial={{ x: -280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }}
            className="fixed left-0 top-[49px] bottom-0 w-64 bg-[hsl(0,0%,6%)] border-r border-white/5 z-40 overflow-y-auto"
          >
            <div className="p-3">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-sm text-white/90">Seus Projetos</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowProjects(false)} className="h-7 w-7 p-0 text-white/40">
                  <X className="w-3.5 h-3.5" />
                </Button>
              </div>
              {projects.length === 0 ? (
                <p className="text-xs text-white/40 text-center py-6">
                  Nenhum projeto salvo
                </p>
              ) : (
                <div className="space-y-1.5">
                  {projects.map((project) => (
                    <button
                      key={project.id}
                      onClick={() => loadProject(project)}
                      className={`w-full text-left p-2.5 rounded-lg transition-colors ${
                        currentProject?.id === project.id
                          ? "bg-orange-500/10 border border-orange-500/20"
                          : "bg-white/[0.02] border border-transparent hover:bg-white/[0.04]"
                      }`}
                    >
                      <p className="font-medium text-xs text-white/80 truncate">{project.name}</p>
                      <p className="text-[10px] text-white/40 truncate mt-0.5">{project.prompt}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content - Chat 35% / Preview 65% */}
      <div className="flex-1 flex">
        {/* Chat Panel - Compact */}
        <div className="w-full lg:w-[35%] flex flex-col border-r border-white/5 bg-[hsl(0,0%,4%)]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center px-4">
                <motion.div
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center mb-4 shadow-xl shadow-orange-500/20"
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </motion.div>
                <h2 className="text-lg font-semibold text-white mb-1">
                  Olá, {userName}!
                </h2>
                <p className="text-white/50 text-xs max-w-[200px] leading-relaxed">
                  Descreva o site dos seus sonhos e eu vou criá-lo para você.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-4 justify-center max-w-[280px]">
                  {["Landing page moderna", "Portfolio criativo", "Loja virtual"].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setInput(suggestion)}
                      className="px-2.5 py-1 text-[10px] bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-white/60 hover:text-white transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <AnimatePresence>
              {messages.map((message, index) => {
                const cleanMsg = message.role === "assistant" ? getCleanMessage(message.content) : message.content;
                if (!cleanMsg) return null; // Skip if no text content
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-xl px-3 py-2 ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                          : "bg-white/5 border border-white/10 text-white/80"
                      }`}
                    >
                      <p className="text-xs leading-relaxed whitespace-pre-wrap">
                        {cleanMsg}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                  <span className="text-xs text-white/50">Criando magia...</span>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input - Compact Lovable style */}
          <div className="p-3 bg-[hsl(0,0%,4%)]">
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Descreva seu site..."
                className="w-full px-4 py-3 pr-12 bg-[hsl(0,0%,8%)] border border-white/10 rounded-xl focus:outline-none focus:border-orange-500/50 transition-colors text-sm text-white placeholder:text-white/30"
                disabled={isLoading}
              />
              <button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-white/10 hover:bg-orange-500 disabled:opacity-30 disabled:hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <ArrowUp className="w-4 h-4 text-white" />
              </button>
            </form>
          </div>
        </div>

        {/* Preview Panel - Larger */}
        <div className="hidden lg:flex flex-1 flex-col bg-gradient-to-br from-[hsl(0,0%,6%)] via-[hsl(0,0%,4%)] to-[hsl(280,50%,8%)]">
          {/* Preview Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/5">
            <div className="flex items-center gap-1 bg-white/5 rounded-lg p-0.5">
              <button
                onClick={() => setShowCode(false)}
                className={`px-3 py-1.5 text-xs rounded-md transition-colors flex items-center gap-1.5 ${
                  !showCode ? "bg-white/10 text-white" : "text-white/50 hover:text-white/70"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                Preview
              </button>
              <button
                onClick={() => setShowCode(true)}
                className={`px-3 py-1.5 text-xs rounded-md transition-colors flex items-center gap-1.5 ${
                  showCode ? "bg-white/10 text-white" : "text-white/50 hover:text-white/70"
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                Código
              </button>
            </div>

            {generatedCode && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={copyCode} 
                className="h-7 gap-1.5 text-white/50 hover:text-white text-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copiado!" : "Copiar"}
              </Button>
            )}
          </div>

          {/* Preview Content */}
          <div className="flex-1 overflow-auto p-4">
            {!generatedCode ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-pink-500/20 blur-3xl rounded-full" />
                  <div className="relative w-20 h-20 rounded-2xl bg-white/5 backdrop-blur border border-white/10 flex items-center justify-center mb-6">
                    <Eye className="w-8 h-8 text-white/30" />
                  </div>
                </div>
                <p className="text-white/40 text-sm font-medium">
                  Seu site aparecerá aqui
                </p>
                <p className="text-white/20 text-xs mt-1">
                  Descreva o que você quer criar
                </p>
              </div>
            ) : showCode ? (
              <div className="h-full">
                <pre className="text-xs font-mono rounded-xl overflow-auto bg-[hsl(0,0%,8%)] border border-white/5 h-full">
                  <code ref={codeRef} className="language-markup block p-4 text-white/80">
                    {generatedCode}
                  </code>
                </pre>
              </div>
            ) : (
              <div className="h-full">
                <div className="bg-white rounded-xl overflow-hidden h-full shadow-2xl shadow-black/50">
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
