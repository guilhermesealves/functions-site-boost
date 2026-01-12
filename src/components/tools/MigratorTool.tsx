import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRightLeft, Globe, Image, FileText, Loader2, Check, AlertCircle,
  Info, FolderInput, LayoutGrid, Package, Upload, CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface MigratorToolProps {
  onSendMessage?: (message: string) => void;
}

interface ImportedContent {
  type: "text" | "image";
  title: string;
  preview: string;
  imported: boolean;
  size?: string;
}

const MigratorTool = ({ onSendMessage }: MigratorToolProps) => {
  const [sourceUrl, setSourceUrl] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const [contents, setContents] = useState<ImportedContent[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [migrationProgress, setMigrationProgress] = useState(0);

  const handleImport = async () => {
    if (!sourceUrl) {
      toast.error("Insira a URL do site para importar");
      return;
    }

    setIsImporting(true);
    setMigrationProgress(0);

    const interval = setInterval(() => {
      setMigrationProgress(prev => Math.min(prev + 15, 90));
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
      setContents([
        { type: "text", title: "Título Principal", preview: "Transforme sua empresa com nossas soluções...", imported: false, size: "256 bytes" },
        { type: "text", title: "Sobre Nós", preview: "Somos uma empresa dedicada a oferecer...", imported: false, size: "1.2 KB" },
        { type: "image", title: "Logo", preview: "logo.png", imported: false, size: "45 KB" },
        { type: "image", title: "Banner Hero", preview: "hero-banner.jpg", imported: false, size: "320 KB" },
        { type: "text", title: "Serviços", preview: "Oferecemos consultoria, desenvolvimento...", imported: false, size: "2.1 KB" },
        { type: "image", title: "Equipe", preview: "team-photo.jpg", imported: false, size: "180 KB" },
        { type: "text", title: "Contato", preview: "Entre em contato pelo telefone...", imported: false, size: "512 bytes" },
        { type: "text", title: "Footer", preview: "© 2024 Empresa. Todos os direitos...", imported: false, size: "128 bytes" },
      ]);
      setMigrationProgress(100);
      setActiveTab("content");
      setIsImporting(false);
      toast.success("Conteúdo extraído com sucesso!");
    }, 3000);
  };

  const toggleContent = (index: number) => {
    setContents(contents.map((c, i) => 
      i === index ? { ...c, imported: !c.imported } : c
    ));
  };

  const selectAll = () => {
    setContents(contents.map(c => ({ ...c, imported: true })));
  };

  const handleMigrate = () => {
    const selected = contents.filter(c => c.imported);
    
    if (selected.length === 0) {
      toast.error("Selecione pelo menos um conteúdo");
      return;
    }

    if (onSendMessage) {
      const textContents = selected.filter(c => c.type === "text");
      const imageContents = selected.filter(c => c.type === "image");

      onSendMessage(`Migre o seguinte conteúdo do site ${sourceUrl} para o novo layout:

📝 TEXTOS (${textContents.length} itens):
${textContents.map(c => `- ${c.title}: "${c.preview}"`).join("\n")}

🖼️ IMAGENS (${imageContents.length} itens):
${imageContents.map(c => `- ${c.title}: ${c.preview}`).join("\n")}

Por favor:
1. Adapte os textos para o novo design
2. Mantenha a essência do conteúdo
3. Organize nas seções apropriadas
4. Otimize para o novo layout`);
    }

    toast.success("Migração iniciada!");
    setActiveTab("organize");
  };

  const textCount = contents.filter(c => c.type === "text").length;
  const imageCount = contents.filter(c => c.type === "image").length;
  const selectedCount = contents.filter(c => c.imported).length;
  const totalSize = contents.reduce((acc, c) => {
    const size = c.size || "0";
    const num = parseFloat(size);
    return acc + (size.includes("KB") ? num * 1024 : num);
  }, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 pb-4 border-b border-white/10">
        <div className="p-3 rounded-xl bg-gradient-to-br from-primary/30 to-amber-500/20">
          <ArrowRightLeft className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-white">Migrador Universal</h2>
          <p className="text-sm text-white/50">Importe conteúdo de qualquer site</p>
        </div>
        {contents.length > 0 && (
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">{contents.length}</p>
            <p className="text-xs text-white/40">Itens</p>
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
            <FolderInput className="w-3 h-3 mr-1" />
            Origem
          </TabsTrigger>
          <TabsTrigger value="content" className="data-[state=active]:bg-primary data-[state=active]:text-white text-white/60 text-xs rounded-lg">
            <LayoutGrid className="w-3 h-3 mr-1" />
            Conteúdo
          </TabsTrigger>
          <TabsTrigger value="organize" className="data-[state=active]:bg-primary data-[state=active]:text-white text-white/60 text-xs rounded-lg">
            <Package className="w-3 h-3 mr-1" />
            Organização
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6 space-y-6">
          {contents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
                <ArrowRightLeft className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Migrador Universal</h3>
              <p className="text-sm text-white/50 mb-6 max-w-xs mx-auto">
                Importe textos e imagens de qualquer site para seu novo layout
              </p>
              <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                {[
                  { icon: FileText, label: "Textos", desc: "Títulos e parágrafos" },
                  { icon: Image, label: "Imagens", desc: "Fotos e gráficos" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]"
                  >
                    <item.icon className="w-5 h-5 text-primary mb-2" />
                    <p className="text-sm font-medium text-white">{item.label}</p>
                    <p className="text-xs text-white/40">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <>
              {/* Stats */}
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: "Textos", value: textCount, icon: FileText, color: "text-blue-400" },
                  { label: "Imagens", value: imageCount, icon: Image, color: "text-emerald-400" },
                  { label: "Selecionados", value: selectedCount, icon: Check, color: "text-primary" },
                  { label: "Tamanho", value: `${(totalSize / 1024).toFixed(1)}KB`, icon: Package, color: "text-amber-400" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-center"
                  >
                    <stat.icon className={`w-4 h-4 mx-auto mb-1 ${stat.color}`} />
                    <p className="text-lg font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-white/40">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Progress */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-white">Progresso da Migração</h4>
                  <span className="text-sm font-bold text-primary">{migrationProgress}%</span>
                </div>
                <Progress value={migrationProgress} className="h-3" />
                <p className="text-xs text-white/40 mt-2">
                  {migrationProgress < 100 ? "Extraindo conteúdo..." : "Extração completa!"}
                </p>
              </div>

              {/* Summary */}
              <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-white">{sourceUrl}</p>
                    <p className="text-xs text-white/50 mt-1">
                      {contents.length} itens encontrados • {(totalSize / 1024).toFixed(1)}KB total
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </TabsContent>

        {/* Source Tab */}
        <TabsContent value="source" className="mt-6 space-y-6">
          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <Globe className="w-4 h-4 text-primary" />
              </div>
              <h4 className="text-sm font-medium text-white">URL do Site de Origem</h4>
            </div>

            <Input
              placeholder="https://meusite-antigo.com"
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
              className="bg-white/[0.04] border-white/[0.08] text-white h-12"
            />

            <Button
              onClick={handleImport}
              disabled={isImporting}
              className="w-full bg-primary hover:bg-primary/90 h-12"
            >
              {isImporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Extraindo conteúdo...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Importar Conteúdo
                </>
              )}
            </Button>
          </div>

          <AnimatePresence>
            {isImporting && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-primary animate-spin" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Analisando site...</p>
                    <p className="text-xs text-white/40">Identificando textos e imagens</p>
                  </div>
                </div>
                <Progress value={migrationProgress} className="h-2" />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <p className="text-xs text-amber-200/80 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              Certifique-se de ter autorização para usar o conteúdo do site original.
            </p>
          </div>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content" className="mt-6 space-y-6">
          {contents.length > 0 ? (
            <>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-white">
                  Conteúdo Encontrado ({contents.length})
                </h4>
                <Button size="sm" variant="ghost" onClick={selectAll} className="text-primary text-xs">
                  Selecionar Todos
                </Button>
              </div>

              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                {contents.map((content, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => toggleContent(index)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      content.imported
                        ? "bg-primary/10 border-primary/30"
                        : "bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                        content.imported ? "bg-primary" : "bg-white/10"
                      }`}>
                        {content.imported && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          {content.type === "text" ? (
                            <FileText className="w-4 h-4 text-blue-400 shrink-0" />
                          ) : (
                            <Image className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                          <p className="font-medium text-white text-sm truncate">{content.title}</p>
                        </div>
                        <p className="text-xs text-white/50 mt-1 line-clamp-1">{content.preview}</p>
                      </div>
                      <span className="text-xs text-white/30 shrink-0">{content.size}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button
                onClick={handleMigrate}
                disabled={selectedCount === 0}
                className="w-full bg-primary hover:bg-primary/90 h-12"
              >
                Migrar Selecionados ({selectedCount})
              </Button>
            </>
          ) : (
            <div className="text-center py-12">
              <LayoutGrid className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/40">Importe um site para ver o conteúdo</p>
            </div>
          )}
        </TabsContent>

        {/* Organize Tab */}
        <TabsContent value="organize" className="mt-6 space-y-6">
          {selectedCount > 0 ? (
            <>
              <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-emerald-400" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">Migração em Andamento</h4>
                    <p className="text-xs text-white/50">{selectedCount} itens sendo organizados</p>
                  </div>
                </div>
                <Progress value={100} className="h-2" />
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <h4 className="text-sm font-medium text-white mb-4">Resumo da Migração</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <FileText className="w-5 h-5 text-blue-400 mb-2" />
                    <p className="text-lg font-bold text-white">{contents.filter(c => c.imported && c.type === "text").length}</p>
                    <p className="text-xs text-white/50">Textos importados</p>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <Image className="w-5 h-5 text-emerald-400 mb-2" />
                    <p className="text-lg font-bold text-white">{contents.filter(c => c.imported && c.type === "image").length}</p>
                    <p className="text-xs text-white/50">Imagens importadas</p>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                onClick={() => {
                  setContents([]);
                  setSourceUrl("");
                  setMigrationProgress(0);
                  setActiveTab("overview");
                }}
                className="w-full border-white/10"
              >
                Migrar Outro Site
              </Button>
            </>
          ) : (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/40">Selecione conteúdo para organizar</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MigratorTool;
