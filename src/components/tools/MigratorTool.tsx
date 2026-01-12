import { useState } from "react";
import { ArrowRightLeft, Globe, Image, FileText, Loader2, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface MigratorToolProps {
  onSendMessage?: (message: string) => void;
}

interface ImportedContent {
  type: "text" | "image";
  title: string;
  preview: string;
  imported: boolean;
}

const MigratorTool = ({ onSendMessage }: MigratorToolProps) => {
  const [sourceUrl, setSourceUrl] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const [contents, setContents] = useState<ImportedContent[]>([]);
  const [step, setStep] = useState<"input" | "review" | "complete">("input");

  const handleImport = async () => {
    if (!sourceUrl) {
      toast.error("Insira a URL do site para importar");
      return;
    }

    setIsImporting(true);

    // Simulate content extraction
    setTimeout(() => {
      setContents([
        { type: "text", title: "Título Principal", preview: "Transforme sua empresa com nossas soluções...", imported: false },
        { type: "text", title: "Sobre Nós", preview: "Somos uma empresa dedicada a oferecer...", imported: false },
        { type: "image", title: "Logo", preview: "logo.png (120x40px)", imported: false },
        { type: "image", title: "Banner Hero", preview: "hero-banner.jpg (1920x800px)", imported: false },
        { type: "text", title: "Serviços", preview: "Oferecemos consultoria, desenvolvimento...", imported: false },
        { type: "text", title: "Contato", preview: "Entre em contato pelo telefone...", imported: false },
      ]);
      setStep("review");
      setIsImporting(false);
      toast.success("Conteúdo extraído!");
    }, 2500);
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

📝 TEXTOS:
${textContents.map(c => `- ${c.title}: "${c.preview}"`).join("\n")}

🖼️ IMAGENS:
${imageContents.map(c => `- ${c.title}: ${c.preview}`).join("\n")}

Por favor:
1. Adapte os textos para o novo design
2. Mantenha a essência do conteúdo
3. Organize nas seções apropriadas
4. Otimize para o novo layout`);
    }

    setStep("complete");
    toast.success("Migração iniciada!");
  };

  return (
    <div className="space-y-6">
      {step === "input" && (
        <>
          {/* Header */}
          <div className="text-center py-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/20 flex items-center justify-center mb-4">
              <ArrowRightLeft className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-white">Migrador Universal</h3>
            <p className="text-sm text-white/50 mt-1">
              Importe conteúdo de qualquer site para o novo layout
            </p>
          </div>

          {/* URL Input */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-white/70">URL do site antigo</label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <Input
                placeholder="https://meusite-antigo.com"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                className="pl-10 bg-white/[0.04] border-white/[0.08] text-white"
              />
            </div>
          </div>

          {/* What will be imported */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-white/70">O que será importado:</p>
            <div className="grid grid-cols-2 gap-3">
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
          </div>

          <Button
            onClick={handleImport}
            disabled={isImporting}
            className="w-full bg-primary hover:bg-primary/90"
          >
            {isImporting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Extraindo conteúdo...
              </>
            ) : (
              <>
                <ArrowRightLeft className="w-4 h-4 mr-2" />
                Importar Conteúdo
              </>
            )}
          </Button>
        </>
      )}

      {step === "review" && (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">
              Conteúdo Encontrado ({contents.length})
            </h3>
            <Button size="sm" variant="ghost" onClick={selectAll} className="text-primary">
              Selecionar Todos
            </Button>
          </div>

          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {contents.map((content, index) => (
              <div
                key={index}
                onClick={() => toggleContent(index)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  content.imported
                    ? "bg-primary/10 border-primary/30"
                    : "bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center ${
                    content.imported ? "bg-primary" : "bg-white/10"
                  }`}>
                    {content.imported && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {content.type === "text" ? (
                        <FileText className="w-4 h-4 text-blue-400" />
                      ) : (
                        <Image className="w-4 h-4 text-emerald-400" />
                      )}
                      <p className="font-medium text-white text-sm">{content.title}</p>
                    </div>
                    <p className="text-xs text-white/50 mt-1 line-clamp-1">{content.preview}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setStep("input")}
              className="flex-1 border-white/10"
            >
              Voltar
            </Button>
            <Button
              onClick={handleMigrate}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Migrar Selecionados ({contents.filter(c => c.imported).length})
            </Button>
          </div>
        </>
      )}

      {step === "complete" && (
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center">
            <Check className="w-8 h-8 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Migração Iniciada!</h3>
            <p className="text-sm text-white/50 mt-1">
              O conteúdo está sendo adaptado ao novo layout
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setStep("input");
              setContents([]);
              setSourceUrl("");
            }}
            className="border-white/10"
          >
            Migrar Outro Site
          </Button>
        </div>
      )}

      {/* Warning */}
      <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
        <p className="text-xs text-amber-200/80 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          Certifique-se de ter autorização para usar o conteúdo do site original.
        </p>
      </div>
    </div>
  );
};

export default MigratorTool;
