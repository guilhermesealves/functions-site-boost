import { useState } from "react";
import { FileEdit, Sparkles, Copy, Loader2, Wand2, Target, TrendingUp, BarChart3, Check, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

interface CopyThiefToolProps {
  onSendMessage?: (message: string) => void;
}

const CopyThiefTool = ({ onSendMessage }: CopyThiefToolProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [referenceText, setReferenceText] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [tone, setTone] = useState<"professional" | "casual" | "urgent">("professional");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<{
    structure: string[];
    triggers: string[];
    suggestion: string;
    scores: { clarity: number; persuasion: number; structure: number; emotion: number; action: number };
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
          "Reciprocidade (bônus)",
        ],
        suggestion: `Transforme seu negócio ${businessType ? `de ${businessType}` : ""} hoje!

Descubra como nossos clientes estão aumentando resultados em até 300%.

✓ Resultados comprovados
✓ Método exclusivo
✓ Suporte especializado

"Melhor decisão que tomei para meu negócio" - Cliente Satisfeito

[Quero começar agora →]`,
        scores: {
          clarity: 85,
          persuasion: 78,
          structure: 92,
          emotion: 70,
          action: 88,
        },
      });
      setIsAnalyzing(false);
      setActiveTab("structure");
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

  const radarData = analysis ? [
    { subject: "Clareza", A: analysis.scores.clarity },
    { subject: "Persuasão", A: analysis.scores.persuasion },
    { subject: "Estrutura", A: analysis.scores.structure },
    { subject: "Emoção", A: analysis.scores.emotion },
    { subject: "Ação", A: analysis.scores.action },
  ] : [];

  const comparisonData = [
    { name: "Original", clarity: 65, persuasion: 55, structure: 70 },
    { name: "Otimizado", clarity: 92, persuasion: 88, structure: 95 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-white/[0.06]">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
          <FileEdit className="w-5 h-5 text-amber-400" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Analisador de Copy</h2>
          <p className="text-xs text-white/50">Analise estruturas e gere textos persuasivos</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-4 bg-white/[0.02] border border-white/[0.06] p-1 rounded-xl">
          <TabsTrigger value="overview" className="text-xs data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-400 rounded-lg">
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="reference" className="text-xs data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-400 rounded-lg">
            Referência
          </TabsTrigger>
          <TabsTrigger value="structure" className="text-xs data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-400 rounded-lg">
            Estrutura
          </TabsTrigger>
          <TabsTrigger value="generate" className="text-xs data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-400 rounded-lg">
            Geração
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8 space-y-4"
          >
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
              <Wand2 className="w-8 h-8 text-amber-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Como Funciona</h3>
              <p className="text-sm text-white/50 mt-2 max-w-sm mx-auto">
                Cole um texto de vendas que você admira e nossa IA vai analisar a estrutura para criar algo único
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
              <Eye className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-xs text-white/60">Analisar Padrões</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
              <Target className="w-6 h-6 text-amber-400 mx-auto mb-2" />
              <p className="text-xs text-white/60">Identificar Gatilhos</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
              <Sparkles className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
              <p className="text-xs text-white/60">Gerar Único</p>
            </div>
          </div>

          {analysis && (
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h4 className="text-sm font-semibold text-white mb-4">Indicadores de Qualidade</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 11 }} />
                    <PolarRadiusAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} />
                    <Radar name="Score" dataKey="A" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="reference" className="mt-6 space-y-4">
          <div className="space-y-3">
            <label className="text-sm font-medium text-white/70">
              Cole o texto de referência
            </label>
            <Textarea
              placeholder="Cole aqui um texto de vendas que você gostou..."
              value={referenceText}
              onChange={(e) => setReferenceText(e.target.value)}
              className="bg-white/[0.04] border-white/[0.08] text-white min-h-[150px]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">Seu tipo de negócio</label>
            <Input
              placeholder="Ex: Consultoria, E-commerce, Serviços..."
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="bg-white/[0.04] border-white/[0.08] text-white"
            />
          </div>

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
                  className={`p-4 rounded-xl text-center transition-all ${
                    tone === option.value
                      ? "bg-amber-500/20 border-amber-500/40 text-amber-400"
                      : "bg-white/[0.02] border-white/[0.06] text-white/60"
                  } border`}
                >
                  <span className="text-2xl block mb-2">{option.emoji}</span>
                  <span className="text-xs">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !referenceText}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-90"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Analisando estrutura...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 mr-2" />
                Analisar Estrutura
              </>
            )}
          </Button>
        </TabsContent>

        <TabsContent value="structure" className="mt-6 space-y-4">
          {analysis ? (
            <>
              {/* Structure */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <FileEdit className="w-4 h-4 text-amber-400" />
                  Estrutura Identificada
                </h4>
                <div className="space-y-2">
                  {analysis.structure.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-white/[0.03] rounded-lg"
                    >
                      <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center font-bold">
                        {i + 1}
                      </span>
                      <span className="text-sm text-white/80">{item}</span>
                      <Check className="w-4 h-4 text-emerald-400 ml-auto" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Triggers */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <Target className="w-4 h-4 text-red-400" />
                  Gatilhos de Persuasão
                </h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.triggers.map((trigger, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="px-3 py-2 text-xs rounded-lg bg-gradient-to-r from-red-500/20 to-orange-500/20 text-white/80 border border-red-500/20"
                    >
                      {trigger}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Comparison Chart */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <h4 className="text-sm font-semibold text-white mb-4">Comparação: Original vs Otimizado</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={comparisonData} barGap={8}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={11} />
                      <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0,0,0,0.8)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "8px",
                          color: "white",
                        }}
                      />
                      <Bar dataKey="clarity" name="Clareza" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="persuasion" name="Persuasão" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="structure" name="Estrutura" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-white/40">
              <FileEdit className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Analise um texto de referência primeiro</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="generate" className="mt-6 space-y-4">
          {analysis ? (
            <>
              {/* Generated Suggestion */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Sugestão Gerada
                  </h4>
                  <button
                    onClick={() => copyToClipboard(analysis.suggestion)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <Copy className="w-4 h-4 text-white/50" />
                  </button>
                </div>
                <div className="p-4 bg-black/20 rounded-lg">
                  <p className="text-sm text-white/80 whitespace-pre-line font-mono">{analysis.suggestion}</p>
                </div>
              </div>

              {/* Score Summary */}
              <div className="grid grid-cols-5 gap-2">
                {Object.entries(analysis.scores).map(([key, value]) => (
                  <div key={key} className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] text-center">
                    <p className="text-lg font-bold text-white">{value}%</p>
                    <p className="text-[10px] text-white/40 capitalize">{key}</p>
                  </div>
                ))}
              </div>

              <Button
                onClick={handleGenerate}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-90"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Gerar Textos Completos com IA
              </Button>

              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="text-xs text-blue-200/80">
                  ℹ️ Esta ferramenta analisa <strong>estrutura e padrões</strong>, 
                  nunca copia textos. Todos os resultados são originais.
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-white/40">
              <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Complete a análise para gerar textos</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CopyThiefTool;
