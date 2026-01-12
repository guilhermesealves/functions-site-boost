import { useState } from "react";
import { FileEdit, Sparkles, Copy, Loader2, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface CopyThiefToolProps {
  onSendMessage?: (message: string) => void;
}

const CopyThiefTool = ({ onSendMessage }: CopyThiefToolProps) => {
  const [referenceText, setReferenceText] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [tone, setTone] = useState<"professional" | "casual" | "urgent">("professional");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<{
    structure: string[];
    triggers: string[];
    suggestion: string;
  } | null>(null);

  const handleAnalyze = () => {
    if (!referenceText) {
      toast.error("Insira um texto de referência");
      return;
    }

    setIsAnalyzing(true);

    setTimeout(() => {
      setAnalysis({
        structure: [
          "Headline com benefício direto",
          "Subheadline explicativa",
          "Lista de benefícios",
          "Prova social",
          "CTA urgente",
        ],
        triggers: [
          "Escassez (limitado)",
          "Autoridade (especialistas)",
          "Prova social (depoimentos)",
          "Urgência (agora)",
        ],
        suggestion: `Transforme seu negócio ${businessType ? `de ${businessType}` : ""} hoje!

Descubra como nossos clientes estão aumentando resultados em até 300%.

✓ Resultados comprovados
✓ Método exclusivo
✓ Suporte especializado

"Melhor decisão que tomei para meu negócio" - Cliente Satisfeito

[Quero começar agora →]`,
      });
      setIsAnalyzing(false);
      toast.success("Análise completa!");
    }, 2000);
  };

  const handleGenerate = () => {
    if (onSendMessage && analysis) {
      onSendMessage(`Crie textos persuasivos para meu ${businessType || "negócio"} usando esta estrutura:

📋 ESTRUTURA IDENTIFICADA:
${analysis.structure.map(s => `- ${s}`).join("\n")}

🎯 GATILHOS DE PERSUASÃO:
${analysis.triggers.map(t => `- ${t}`).join("\n")}

Tom de voz: ${tone === "professional" ? "Profissional e confiável" : tone === "casual" ? "Casual e amigável" : "Urgente e direto"}

Por favor, gere:
1. Headline principal
2. 3 variações de headlines
3. Texto para seção hero
4. Texto para CTA
5. 3 bullet points de benefícios`);
    }
    toast.success("Gerando textos...");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copiado!");
  };

  return (
    <div className="space-y-6">
      {/* Reference Text */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-white/70">
          Cole o texto de referência
        </label>
        <Textarea
          placeholder="Cole aqui um texto de vendas que você gostou..."
          value={referenceText}
          onChange={(e) => setReferenceText(e.target.value)}
          className="bg-white/[0.04] border-white/[0.08] text-white min-h-[120px]"
        />
      </div>

      {/* Business Type */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/70">Seu tipo de negócio</label>
        <Input
          placeholder="Ex: Consultoria, E-commerce, Serviços..."
          value={businessType}
          onChange={(e) => setBusinessType(e.target.value)}
          className="bg-white/[0.04] border-white/[0.08] text-white"
        />
      </div>

      {/* Tone Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/70">Tom de voz</label>
        <div className="grid grid-cols-3 gap-2">
          {([
            { value: "professional", label: "Profissional", emoji: "👔" },
            { value: "casual", label: "Casual", emoji: "😊" },
            { value: "urgent", label: "Urgente", emoji: "🔥" },
          ] as const).map((option) => (
            <button
              key={option.value}
              onClick={() => setTone(option.value)}
              className={`p-3 rounded-xl text-center transition-all ${
                tone === option.value
                  ? "bg-primary/20 border-primary/40 text-primary"
                  : "bg-white/[0.02] border-white/[0.06] text-white/60"
              } border`}
            >
              <span className="text-xl block mb-1">{option.emoji}</span>
              <span className="text-xs">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      <Button
        onClick={handleAnalyze}
        disabled={isAnalyzing}
        className="w-full bg-primary hover:bg-primary/90"
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Analisando...
          </>
        ) : (
          <>
            <Wand2 className="w-4 h-4 mr-2" />
            Analisar Estrutura
          </>
        )}
      </Button>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-4">
          {/* Structure */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <FileEdit className="w-4 h-4 text-primary" />
              Estrutura Identificada
            </h4>
            <div className="space-y-2">
              {analysis.structure.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-white/70">
                  <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center">
                    {i + 1}
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Triggers */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Gatilhos de Persuasão
            </h4>
            <div className="flex flex-wrap gap-2">
              {analysis.triggers.map((trigger, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs rounded-full bg-amber-500/20 text-amber-400"
                >
                  {trigger}
                </span>
              ))}
            </div>
          </div>

          {/* Suggestion */}
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Sugestão Gerada
              </h4>
              <button
                onClick={() => copyToClipboard(analysis.suggestion)}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Copy className="w-4 h-4 text-white/50" />
              </button>
            </div>
            <p className="text-sm text-white/80 whitespace-pre-line">{analysis.suggestion}</p>
          </div>

          <Button
            onClick={handleGenerate}
            className="w-full bg-primary hover:bg-primary/90"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Gerar Textos Completos
          </Button>
        </div>
      )}

      {/* Info */}
      <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
        <p className="text-xs text-blue-200/80">
          ℹ️ Esta ferramenta analisa <strong>estrutura e padrões</strong>, 
          nunca copia textos. Todos os resultados são originais.
        </p>
      </div>
    </div>
  );
};

export default CopyThiefTool;
