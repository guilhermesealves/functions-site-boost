import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, Copy, Loader2, Sparkles, Layout, CheckCircle, 
  Eye, FolderTree, FileCode, Layers, ArrowRight,
  Info, Target, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useToolsAI } from "@/hooks/useToolsAI";
import { TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ToolHeader, ToolTabs, ToolCard, ToolStat, ToolTip } from "./shared";

interface SiteClonerToolProps {
  onSendMessage?: (message: string) => void;
}

interface PageStructure {
  name: string;
  sections: string[];
  status: "pending" | "analyzed" | "cloned";
}

const tabs = [
  { value: "overview", label: "Visão Geral", icon: Info },
  { value: "source", label: "Fonte", icon: Globe },
  { value: "structure", label: "Estrutura", icon: FolderTree },
  { value: "result", label: "Resultado", icon: Eye },
];

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
    pending: "bg-muted text-muted-foreground",
    analyzed: "bg-primary/20 text-primary",
    cloned: "bg-emerald-500/20 text-emerald-500"
  };

  const statusLabels = {
    pending: "Pendente",
    analyzed: "Analisado",
    cloned: "Clonado"
  };

  return (
    <div className="space-y-6">
      <ToolHeader 
        icon={Copy}
        title="Clonador de Site"
        description="Replique layouts profissionais de forma original"
        stat={cloneProgress > 0 ? { value: `${cloneProgress}%`, label: "Progresso" } : undefined}
      />

      <ToolTabs tabs={tabs} value={activeTab} onValueChange={setActiveTab}>
        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid grid-cols-3 gap-3">
            <ToolStat icon={Layout} label="Layouts" value={pageStructure.length || "—"} />
            <ToolStat icon={Layers} label="Seções" value={pageStructure.reduce((acc, p) => acc + p.sections.length, 0) || "—"} />
            <ToolStat icon={Target} label="Precisão" value={cloneProgress > 0 ? "95%" : "—"} />
          </div>

          <ToolCard>
            <h4 className="text-sm font-medium text-foreground mb-4">Como funciona</h4>
            <div className="space-y-3">
              {[
                { step: 1, text: "Insira a URL do site de referência", icon: Globe },
                { step: 2, text: "A IA analisa estrutura, cores e tipografia", icon: Sparkles },
                { step: 3, text: "Revise a estrutura gerada", icon: FolderTree },
                { step: 4, text: "Gere seu site original inspirado", icon: Zap },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                    {item.step}
                  </div>
                  <item.icon className="w-4 h-4 text-muted-foreground" />
                  <p className="text-sm text-foreground/70">{item.text}</p>
                </div>
              ))}
            </div>
          </ToolCard>
        </TabsContent>

        <TabsContent value="source" className="mt-6 space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground/70">URL do site de referência</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="https://exemplo.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="pl-10 bg-secondary/30 border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 h-11"
                />
              </div>
              <Button
                onClick={handleAnalyze}
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90 h-11 px-6"
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
              >
                <ToolCard>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Loader2 className="w-5 h-5 text-primary animate-spin" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Analisando site...</p>
                      <p className="text-xs text-muted-foreground">Extraindo estrutura, cores e tipografia</p>
                    </div>
                  </div>
                  <Progress value={45} className="h-2" />
                </ToolCard>
              </motion.div>
            )}
          </AnimatePresence>

          {url && !isLoading && !result && (
            <ToolCard>
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground truncate">{url}</p>
                  <p className="text-xs text-muted-foreground">Pronto para análise</p>
                </div>
                <ArrowRight className="w-4 h-4 text-primary" />
              </div>
            </ToolCard>
          )}

          <ToolTip variant="warning">
            Esta ferramenta cria versões <strong>originais</strong> inspiradas em referências. 
            Nunca copia conteúdos protegidos ou marcas registradas.
          </ToolTip>
        </TabsContent>

        <TabsContent value="structure" className="mt-6 space-y-6">
          {pageStructure.length > 0 ? (
            <>
              <ToolCard>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-foreground">Estrutura do Site</h4>
                  <span className="text-xs text-muted-foreground">{pageStructure.length} páginas</span>
                </div>
                <Progress value={cloneProgress} className="h-2 mb-2" />
                <p className="text-xs text-muted-foreground">{cloneProgress}% analisado</p>
              </ToolCard>

              <div className="space-y-3">
                {pageStructure.map((page, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <ToolCard>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <FileCode className="w-5 h-5 text-primary" />
                          <h5 className="text-sm font-medium text-foreground">{page.name}</h5>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-md ${statusColors[page.status]}`}>
                          {statusLabels[page.status]}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {page.sections.map((section, j) => (
                          <span key={j} className="px-2 py-1 text-xs rounded-md bg-secondary/50 text-muted-foreground">
                            {section}
                          </span>
                        ))}
                      </div>
                    </ToolCard>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <FolderTree className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">Analise um site para ver a estrutura</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="result" className="mt-6 space-y-6">
          {result ? (
            <>
              <ToolCard gradient>
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <h4 className="text-sm font-semibold text-foreground">Análise Completa</h4>
                </div>
                <div className="text-sm text-foreground/70 whitespace-pre-wrap leading-relaxed max-h-[300px] overflow-y-auto pr-2">
                  {result}
                </div>
              </ToolCard>

              <Button
                onClick={handleGenerate}
                className="w-full bg-primary hover:bg-primary/90 h-11"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Gerar Site Inspirado
              </Button>
            </>
          ) : (
            <div className="text-center py-12">
              <Eye className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">Complete a análise para ver o resultado</p>
            </div>
          )}
        </TabsContent>
      </ToolTabs>
    </div>
  );
};

export default SiteClonerTool;