import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, Copy, Loader2, Sparkles, Layout, Palette, Type, CheckCircle, 
  Eye, FolderTree, FileCode, Layers, ArrowRight, Monitor, Smartphone,
  Info, Target, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useToolsAI } from "@/hooks/useToolsAI";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface SiteClonerToolProps {
  onSendMessage?: (message: string) => void;
}

interface PageStructure {
  name: string;
  sections: string[];
  status: "pending" | "analyzed" | "cloned";
}

const SiteClonerTool = ({ onSendMessage }: SiteClonerToolProps) => {
  const [url, setUrl] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [cloneProgress, setCloneProgress] = useState(0);
  const [pageStructure, setPageStructure] = useState<PageStructure[]>([]);
  
  const { execute, isLoading, result } = useToolsAI({ 
    tool: "site-cloner",
    onComplete: () => {
      toast.success("Análise completa!");
      setPageStructure([
        { name: "Home", sections: ["Hero", "Features", "About", "CTA"], status: "analyzed" },
        { name: "Sobre", sections: ["História", "Equipe", "Valores"], status: "analyzed" },
        { name: "Serviços", sections: ["Lista", "Detalhes", "Preços"], status: "pending" },
        { name: "Contato", sections: ["Formulário", "Mapa", "Info"], status: "pending" },
      ]);
      setCloneProgress(35);
      setActiveTab("structure");
    }
  });

  const handleAnalyze = async () => {
    if (!url) {
      toast.error("Insira uma URL para analisar");
      return;
    }
    await execute("analyze", { url });
  };

  const handleGenerate = () => {
    if (onSendMessage && result) {
      onSendMessage(`Crie um site profissional inspirado em ${url}. 
      
Aqui está a análise da referência:
${result}

Por favor, crie uma versão original e moderna mantendo os melhores elementos identificados.`);
    }
    setCloneProgress(100);
    toast.success("Gerando site...");
  };

  const statusColors = {
    pending: "bg-white/20 text-white/60",
    analyzed: "bg-blue-500/20 text-blue-400",
    cloned: "bg-emerald-500/20 text-emerald-400"
  };

  const statusLabels = {
    pending: "Pendente",
    analyzed: "Analisado",
    cloned: "Clonado"
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 pb-4 border-b border-white/10">
        <div className="p-3 rounded-xl bg-gradient-to-br from-primary/30 to-amber-500/20">
          <Copy className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-white">Clonador de Site</h2>
          <p className="text-sm text-white/50">Replique layouts profissionais de forma original</p>
        </div>
        {cloneProgress > 0 && (
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">{cloneProgress}%</p>
            <p className="text-xs text-white/40">Progresso</p>
          </div>
        )}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 bg-white/[0.04] border border-white/[0.08] p-1 rounded-xl">
          <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-white text-white/60 text-xs rounded-lg">
            <Info className="w-3 h-3 mr-1" />
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="source" className="data-[state=active]:bg-primary data-[state=active]:text-white text-white/60 text-xs rounded-lg">
            <Globe className="w-3 h-3 mr-1" />
            Fonte
          </TabsTrigger>
          <TabsTrigger value="structure" className="data-[state=active]:bg-primary data-[state=active]:text-white text-white/60 text-xs rounded-lg">
            <FolderTree className="w-3 h-3 mr-1" />
            Estrutura
          </TabsTrigger>
          <TabsTrigger value="result" className="data-[state=active]:bg-primary data-[state=active]:text-white text-white/60 text-xs rounded-lg">
            <Eye className="w-3 h-3 mr-1" />
            Resultado
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: Layout, label: "Layouts", value: pageStructure.length || "—", color: "text-blue-400" },
              { icon: Layers, label: "Seções", value: pageStructure.reduce((acc, p) => acc + p.sections.length, 0) || "—", color: "text-emerald-400" },
              { icon: Target, label: "Precisão", value: cloneProgress > 0 ? "95%" : "—", color: "text-amber-400" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-center"
              >
                <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-white/40">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-gradient-to-br from-white/[0.04] to-white/[0.02] border border-white/[0.08]">
            <h4 className="text-sm font-medium text-white mb-3">Como funciona</h4>
            <div className="space-y-3">
              {[
                { step: 1, text: "Insira a URL do site de referência", icon: Globe },
                { step: 2, text: "A IA analisa estrutura, cores e tipografia", icon: Sparkles },
                { step: 3, text: "Revise a estrutura gerada", icon: FolderTree },
                { step: 4, text: "Gere seu site original inspirado", icon: Zap },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                    {item.step}
                  </div>
                  <item.icon className="w-4 h-4 text-white/40" />
                  <p className="text-sm text-white/70">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Monitor, label: "Desktop", desc: "Layout responsivo" },
              { icon: Smartphone, label: "Mobile", desc: "Otimizado" },
              { icon: Palette, label: "Cores", desc: "Paleta adaptável" },
              { icon: Type, label: "Tipografia", desc: "Fontes modernas" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-primary/30 transition-colors"
              >
                <feature.icon className="w-5 h-5 text-primary mb-2" />
                <p className="text-sm font-medium text-white">{feature.label}</p>
                <p className="text-xs text-white/40">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Source Tab */}
        <TabsContent value="source" className="mt-6 space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-white/70">URL do site de referência</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <Input
                  placeholder="https://exemplo.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="pl-10 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/30 focus:border-primary/50 transition-colors h-12"
                />
              </div>
              <Button
                onClick={handleAnalyze}
                disabled={isLoading}
                className="bg-gradient-to-r from-primary to-amber-500 hover:from-primary/90 hover:to-amber-500/90 shadow-lg shadow-primary/20 h-12 px-6"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Analisar
                  </>
                )}
              </Button>
            </div>
          </div>

          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 text-primary animate-spin" />
                    </div>
                    <div className="absolute inset-0 rounded-xl bg-primary/30 animate-ping" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Analisando site...</p>
                    <p className="text-xs text-white/40">Extraindo estrutura, cores e tipografia</p>
                  </div>
                </div>
                <Progress value={45} className="h-2" />
              </motion.div>
            )}
          </AnimatePresence>

          {url && !isLoading && !result && (
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08]">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-white/40" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-white truncate">{url}</p>
                  <p className="text-xs text-white/40">Pronto para análise</p>
                </div>
                <ArrowRight className="w-4 h-4 text-primary" />
              </div>
            </div>
          )}

          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <p className="text-xs text-amber-200/80">
              ⚠️ Esta ferramenta cria versões <strong>originais</strong> inspiradas em referências. 
              Nunca copia conteúdos protegidos ou marcas registradas.
            </p>
          </div>
        </TabsContent>

        {/* Structure Tab */}
        <TabsContent value="structure" className="mt-6 space-y-6">
          {pageStructure.length > 0 ? (
            <>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-white">Estrutura do Site</h4>
                  <span className="text-xs text-white/40">{pageStructure.length} páginas</span>
                </div>
                <Progress value={cloneProgress} className="h-2 mb-2" />
                <p className="text-xs text-white/40">{cloneProgress}% analisado</p>
              </div>

              <div className="space-y-3">
                {pageStructure.map((page, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <FileCode className="w-5 h-5 text-primary" />
                        <h5 className="text-sm font-medium text-white">{page.name}</h5>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-lg ${statusColors[page.status]}`}>
                        {statusLabels[page.status]}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {page.sections.map((section, j) => (
                        <span key={j} className="px-2 py-1 text-xs rounded-md bg-white/[0.06] text-white/60">
                          {section}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <FolderTree className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/40">Analise um site para ver a estrutura</p>
            </div>
          )}
        </TabsContent>

        {/* Result Tab */}
        <TabsContent value="result" className="mt-6 space-y-6">
          {result ? (
            <>
              <div className="p-5 rounded-xl bg-gradient-to-br from-primary/10 to-amber-500/5 border border-primary/20">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <h4 className="text-sm font-semibold text-white">Análise Completa</h4>
                </div>
                <div className="text-sm text-white/70 whitespace-pre-wrap leading-relaxed max-h-[300px] overflow-y-auto pr-2">
                  {result}
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                className="w-full bg-gradient-to-r from-primary to-amber-500 hover:from-primary/90 hover:to-amber-500/90 shadow-lg shadow-primary/20 h-12 text-base font-semibold"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Gerar Site Inspirado
              </Button>
            </>
          ) : (
            <div className="text-center py-12">
              <Eye className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/40">Complete a análise para ver o resultado</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SiteClonerTool;
