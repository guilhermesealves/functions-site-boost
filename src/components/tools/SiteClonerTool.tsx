import { useState } from "react";
import { Globe, Copy, Loader2, Sparkles, Layout, Palette, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface SiteClonerToolProps {
  onSendMessage?: (message: string) => void;
}

const SiteClonerTool = ({ onSendMessage }: SiteClonerToolProps) => {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<{
    layout: string;
    colors: string[];
    sections: string[];
  } | null>(null);

  const handleAnalyze = async () => {
    if (!url) {
      toast.error("Insira uma URL para analisar");
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis (in production, this would call an edge function)
    setTimeout(() => {
      setAnalysis({
        layout: "Layout moderno com hero section, features grid e CTA",
        colors: ["#FF6B00", "#1A1A1A", "#FFFFFF", "#F5F5F5"],
        sections: ["Hero Banner", "Sobre Nós", "Serviços", "Depoimentos", "Contato", "Footer"]
      });
      setIsAnalyzing(false);
      toast.success("Site analisado com sucesso!");
    }, 2000);
  };

  const handleGenerate = () => {
    if (onSendMessage) {
      onSendMessage(`Crie um site inspirado em ${url} com as seguintes características:
- Layout: ${analysis?.layout}
- Seções: ${analysis?.sections.join(", ")}
- Cores predominantes: ${analysis?.colors.join(", ")}

Por favor, crie uma versão original e profissional mantendo a estrutura visual.`);
    }
    toast.success("Gerando site...");
  };

  return (
    <div className="space-y-6">
      {/* URL Input */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-white/70">URL do site de referência</label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <Input
              placeholder="https://exemplo.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="pl-10 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/30"
            />
          </div>
          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="bg-primary hover:bg-primary/90"
          >
            {isAnalyzing ? (
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

      {/* Features */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: Layout, label: "Estrutura Visual", desc: "Layout e hierarquia" },
          { icon: Palette, label: "Cores", desc: "Paleta adaptável" },
          { icon: Type, label: "Tipografia", desc: "Fontes e estilos" },
          { icon: Sparkles, label: "Elementos", desc: "Blocos e seções" },
        ].map((feature, i) => (
          <div
            key={i}
            className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-primary/30 transition-colors"
          >
            <feature.icon className="w-5 h-5 text-primary mb-2" />
            <p className="text-sm font-medium text-white">{feature.label}</p>
            <p className="text-xs text-white/40">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-4 p-4 rounded-xl bg-white/[0.02] border border-primary/20">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Análise Completa
          </h3>
          
          <div className="space-y-3">
            <div>
              <p className="text-xs text-white/40 mb-1">Layout Detectado</p>
              <p className="text-sm text-white/80">{analysis.layout}</p>
            </div>
            
            <div>
              <p className="text-xs text-white/40 mb-2">Cores Principais</p>
              <div className="flex gap-2">
                {analysis.colors.map((color, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-lg border border-white/10"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-xs text-white/40 mb-2">Seções Identificadas</p>
              <div className="flex flex-wrap gap-2">
                {analysis.sections.map((section, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs rounded-lg bg-white/[0.06] text-white/70"
                  >
                    {section}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            className="w-full bg-primary hover:bg-primary/90"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Gerar Site Inspirado
          </Button>
        </div>
      )}

      {/* Info */}
      <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
        <p className="text-xs text-amber-200/80">
          ⚠️ Esta ferramenta cria versões <strong>originais</strong> inspiradas em referências. 
          Nunca copia conteúdos protegidos ou marcas registradas.
        </p>
      </div>
    </div>
  );
};

export default SiteClonerTool;
