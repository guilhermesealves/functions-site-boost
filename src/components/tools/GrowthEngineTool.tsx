import { useState } from "react";
import { Rocket, TrendingUp, AlertCircle, CheckCircle2, ArrowRight, Loader2, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface GrowthEngineToolProps {
  onSendMessage?: (message: string) => void;
}

interface Suggestion {
  id: string;
  type: "cta" | "text" | "page" | "feature";
  priority: "high" | "medium" | "low";
  title: string;
  description: string;
  impact: string;
  applied: boolean;
}

const GrowthEngineTool = ({ onSendMessage }: GrowthEngineToolProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const handleAnalyze = () => {
    setIsAnalyzing(true);

    setTimeout(() => {
      setSuggestions([
        {
          id: "1",
          type: "cta",
          priority: "high",
          title: "Adicionar CTA no Hero",
          description: "Seu hero section não tem um botão de ação claro. Adicione um CTA visível.",
          impact: "+25% conversão estimada",
          applied: false,
        },
        {
          id: "2",
          type: "text",
          priority: "high",
          title: "Melhorar título principal",
          description: "O título atual é genérico. Use benefício direto para o cliente.",
          impact: "+15% engajamento",
          applied: false,
        },
        {
          id: "3",
          type: "page",
          priority: "medium",
          title: "Criar página de depoimentos",
          description: "Adicione prova social com casos de sucesso reais.",
          impact: "+30% confiança",
          applied: false,
        },
        {
          id: "4",
          type: "feature",
          priority: "medium",
          title: "Adicionar WhatsApp flutuante",
          description: "Facilite o contato direto com visitantes.",
          impact: "+40% leads",
          applied: false,
        },
        {
          id: "5",
          type: "text",
          priority: "low",
          title: "Simplificar textos",
          description: "Alguns textos estão muito longos. Seja mais direto.",
          impact: "+10% leitura",
          applied: false,
        },
      ]);
      setIsAnalyzing(false);
      toast.success("Análise completa!");
    }, 2500);
  };

  const handleApply = (suggestion: Suggestion) => {
    if (onSendMessage) {
      onSendMessage(`Aplique esta melhoria no site: ${suggestion.title}

Descrição: ${suggestion.description}

Impacto esperado: ${suggestion.impact}`);
    }

    setSuggestions(suggestions.map(s => 
      s.id === suggestion.id ? { ...s, applied: true } : s
    ));

    toast.success("Melhoria aplicada!");
  };

  const priorityColors = {
    high: "bg-red-500/20 text-red-400 border-red-500/30",
    medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    low: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  };

  const priorityLabels = {
    high: "Alta",
    medium: "Média",
    low: "Baixa",
  };

  const typeIcons = {
    cta: "🎯",
    text: "✍️",
    page: "📄",
    feature: "⚡",
  };

  return (
    <div className="space-y-6">
      {/* Analyze Button */}
      {suggestions.length === 0 && (
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/20 flex items-center justify-center">
            <Rocket className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Growth Engine</h3>
            <p className="text-sm text-white/50 mt-1">
              Analise seu site e receba sugestões práticas para crescer
            </p>
          </div>
          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="bg-primary hover:bg-primary/90"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Analisando...
              </>
            ) : (
              <>
                <TrendingUp className="w-4 h-4 mr-2" />
                Analisar Meu Site
              </>
            )}
          </Button>
        </div>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-center">
              <p className="text-2xl font-bold text-red-400">
                {suggestions.filter(s => s.priority === "high" && !s.applied).length}
              </p>
              <p className="text-xs text-white/40">Urgentes</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
              <p className="text-2xl font-bold text-amber-400">
                {suggestions.filter(s => s.priority === "medium" && !s.applied).length}
              </p>
              <p className="text-xs text-white/40">Importantes</p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
              <p className="text-2xl font-bold text-emerald-400">
                {suggestions.filter(s => s.applied).length}
              </p>
              <p className="text-xs text-white/40">Aplicadas</p>
            </div>
          </div>

          {/* Suggestions List */}
          <div className="space-y-3">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className={`p-4 rounded-xl border transition-all ${
                  suggestion.applied
                    ? "bg-emerald-500/5 border-emerald-500/20"
                    : "bg-white/[0.02] border-white/[0.06] hover:border-primary/30"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl">{typeIcons[suggestion.type]}</span>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-white">{suggestion.title}</p>
                      <span className={`px-2 py-0.5 text-[10px] rounded-full border ${priorityColors[suggestion.priority]}`}>
                        {priorityLabels[suggestion.priority]}
                      </span>
                    </div>
                    <p className="text-sm text-white/50">{suggestion.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-emerald-400 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {suggestion.impact}
                      </span>
                      {suggestion.applied ? (
                        <span className="text-xs text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Aplicado
                        </span>
                      ) : (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleApply(suggestion)}
                          className="text-primary hover:text-primary/80"
                        >
                          Aplicar
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            onClick={handleAnalyze}
            className="w-full border-white/10 text-white/70"
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            Analisar Novamente
          </Button>
        </div>
      )}
    </div>
  );
};

export default GrowthEngineTool;
