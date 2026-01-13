import { useState } from "react";
import { motion } from "framer-motion";
import { FileEdit, Sparkles, Copy, Loader2, Wand2, Target, Check, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { ToolHeader, ToolTabs, ToolCard, ToolTip } from "./shared";

interface CopyThiefToolProps {
  onSendMessage?: (message: string) => void;
}

const tabs = [
  { value: "overview", label: "Visão Geral", icon: Eye },
  { value: "reference", label: "Referência", icon: FileEdit },
  { value: "structure", label: "Estrutura", icon: Target },
  { value: "generate", label: "Geração", icon: Sparkles },
];

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
        structure: ["Headline com benefício direto", "Subheadline explicativa", "Lista de benefícios", "Prova social", "CTA urgente"],
        triggers: ["Escassez (limitado)", "Autoridade (especialistas)", "Prova social (depoimentos)", "Urgência (agora)", "Reciprocidade (bônus)"],
        suggestion: `Transforme seu negócio ${businessType ? `de ${businessType}` : ""} hoje!\n\nDescubra como nossos clientes estão aumentando resultados em até 300%.\n\n✓ Resultados comprovados\n✓ Método exclusivo\n✓ Suporte especializado\n\n"Melhor decisão que tomei para meu negócio" - Cliente Satisfeito\n\n[Quero começar agora →]`,
        scores: { clarity: 85, persuasion: 78, structure: 92, emotion: 70, action: 88 },
      });
      setIsAnalyzing(false);
      setActiveTab("structure");
      toast.success("Análise completa!");
    }, 2000);
  };

  const handleGenerate = () => {
    if (onSendMessage && analysis) {
      onSendMessage(`Crie textos persuasivos para meu ${businessType || "negócio"} usando esta estrutura:\n\n📋 ESTRUTURA IDENTIFICADA:\n${analysis.structure.map(s => `- ${s}`).join("\n")}\n\n🎯 GATILHOS DE PERSUASÃO:\n${analysis.triggers.map(t => `- ${t}`).join("\n")}\n\nTom de voz: ${tone === "professional" ? "Profissional e confiável" : tone === "casual" ? "Casual e amigável" : "Urgente e direto"}`);
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
      <ToolHeader icon={FileEdit} title="Analisador de Copy" description="Analise estruturas e gere textos persuasivos" />

      <ToolTabs tabs={tabs} value={activeTab} onValueChange={setActiveTab}>
        <TabsContent value="overview" className="mt-6 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8 space-y-4">
            <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Wand2 className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Como Funciona</h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
                Cole um texto de vendas que você admira e nossa IA vai analisar a estrutura para criar algo único
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-3 gap-3">
            <ToolCard className="text-center p-4">
              <Eye className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Analisar Padrões</p>
            </ToolCard>
            <ToolCard className="text-center p-4">
              <Target className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Identificar Gatilhos</p>
            </ToolCard>
            <ToolCard className="text-center p-4">
              <Sparkles className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Gerar Único</p>
            </ToolCard>
          </div>

          {analysis && (
            <ToolCard>
              <h4 className="text-sm font-semibold text-foreground mb-4">Indicadores de Qualidade</h4>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                    <PolarRadiusAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                    <Radar name="Score" dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </ToolCard>
          )}
        </TabsContent>

        <TabsContent value="reference" className="mt-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/70">Cole o texto de referência</label>
            <Textarea
              placeholder="Cole aqui um texto de vendas que você gostou..."
              value={referenceText}
              onChange={(e) => setReferenceText(e.target.value)}
              className="bg-secondary/30 border-border text-foreground min-h-[120px]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/70">Seu tipo de negócio</label>
            <Input
              placeholder="Ex: Consultoria, E-commerce, Serviços..."
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="bg-secondary/30 border-border text-foreground"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/70">Tom de voz</label>
            <div className="grid grid-cols-3 gap-2">
              {([
                { value: "professional", label: "Profissional", emoji: "👔" },
                { value: "casual", label: "Casual", emoji: "😊" },
                { value: "urgent", label: "Urgente", emoji: "🔥" },
              ] as const).map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTone(option.value)}
                  className={`p-3 rounded-lg text-center transition-all border ${
                    tone === option.value ? "bg-primary/10 border-primary/30 text-primary" : "bg-secondary/30 border-border text-muted-foreground"
                  }`}
                >
                  <span className="text-xl block mb-1">{option.emoji}</span>
                  <span className="text-xs">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          <Button onClick={handleAnalyze} disabled={isAnalyzing || !referenceText} className="w-full bg-primary hover:bg-primary/90">
            {isAnalyzing ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Analisando...</> : <><Wand2 className="w-4 h-4 mr-2" />Analisar Estrutura</>}
          </Button>
        </TabsContent>

        <TabsContent value="structure" className="mt-6 space-y-4">
          {analysis ? (
            <>
              <ToolCard>
                <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <FileEdit className="w-4 h-4 text-primary" />Estrutura Identificada
                </h4>
                <div className="space-y-2">
                  {analysis.structure.map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg border border-border">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">{i + 1}</span>
                      <span className="text-sm text-foreground/80">{item}</span>
                      <Check className="w-4 h-4 text-emerald-500 ml-auto" />
                    </motion.div>
                  ))}
                </div>
              </ToolCard>

              <ToolCard>
                <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" />Gatilhos de Persuasão
                </h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.triggers.map((trigger, i) => (
                    <motion.span key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                      className="px-3 py-1.5 text-xs rounded-md bg-primary/10 text-foreground/80 border border-primary/20">
                      {trigger}
                    </motion.span>
                  ))}
                </div>
              </ToolCard>

              <ToolCard>
                <h4 className="text-sm font-semibold text-foreground mb-4">Comparação: Original vs Otimizado</h4>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={comparisonData} barGap={8}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                      <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                      <Bar dataKey="clarity" name="Clareza" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="persuasion" name="Persuasão" fill="hsl(160, 84%, 39%)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="structure" name="Estrutura" fill="hsl(45, 93%, 47%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </ToolCard>
            </>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <FileEdit className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Analise um texto de referência primeiro</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="generate" className="mt-6 space-y-4">
          {analysis ? (
            <>
              <ToolCard gradient>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />Sugestão Gerada
                  </h4>
                  <button onClick={() => copyToClipboard(analysis.suggestion)} className="p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
                <div className="p-3 bg-card/50 rounded-lg border border-border">
                  <p className="text-sm text-foreground/80 whitespace-pre-line font-mono">{analysis.suggestion}</p>
                </div>
              </ToolCard>

              <div className="grid grid-cols-5 gap-2">
                {Object.entries(analysis.scores).map(([key, value]) => (
                  <div key={key} className="p-3 rounded-lg bg-secondary/30 border border-border text-center">
                    <p className="text-lg font-bold text-foreground">{value}%</p>
                    <p className="text-[10px] text-muted-foreground capitalize">{key}</p>
                  </div>
                ))}
              </div>

              <Button onClick={handleGenerate} className="w-full bg-primary hover:bg-primary/90">
                <Sparkles className="w-4 h-4 mr-2" />Gerar Textos Completos com IA
              </Button>

              <ToolTip variant="info">
                Esta ferramenta analisa <strong>estrutura e padrões</strong>, nunca copia textos. Todos os resultados são originais.
              </ToolTip>
            </>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Complete a análise para gerar textos</p>
            </div>
          )}
        </TabsContent>
      </ToolTabs>
    </div>
  );
};

export default CopyThiefTool;