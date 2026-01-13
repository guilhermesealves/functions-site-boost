import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Rocket, TrendingUp, AlertCircle, CheckCircle2, ArrowRight, Loader2, 
  Lightbulb, BarChart3, Target, Zap, Info, Eye, LineChart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { 
  LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell 
} from "recharts";
import { ToolHeader, ToolTabs, ToolCard, ToolStat, ToolTip } from "./shared";

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
  impactValue: number;
  applied: boolean;
}

const tabs = [
  { value: "overview", label: "Visão Geral", icon: Info },
  { value: "opportunities", label: "Oportunidades", icon: Eye },
  { value: "recommendations", label: "Recomendações", icon: Lightbulb },
  { value: "evolution", label: "Evolução", icon: LineChart },
];

const GrowthEngineTool = ({ onSendMessage }: GrowthEngineToolProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [optimizationScore, setOptimizationScore] = useState(0);

  const evolutionData = [
    { week: "Sem 1", score: 35 },
    { week: "Sem 2", score: 42 },
    { week: "Sem 3", score: 58 },
    { week: "Sem 4", score: 72 },
    { week: "Atual", score: 85 },
  ];

  const categoryData = [
    { name: "CTA", value: 25, color: "hsl(var(--primary))" },
    { name: "SEO", value: 20, color: "hsl(160, 84%, 39%)" },
    { name: "Design", value: 30, color: "hsl(45, 93%, 47%)" },
    { name: "Conteúdo", value: 25, color: "hsl(0, 84%, 60%)" },
  ];

  const handleAnalyze = () => {
    setIsAnalyzing(true);

    setTimeout(() => {
      setSuggestions([
        { id: "1", type: "cta", priority: "high", title: "Adicionar CTA no Hero", description: "Seu hero section não tem um botão de ação claro.", impact: "+25% conversão", impactValue: 25, applied: false },
        { id: "2", type: "text", priority: "high", title: "Melhorar título principal", description: "O título atual é genérico. Use benefício direto.", impact: "+15% engajamento", impactValue: 15, applied: false },
        { id: "3", type: "page", priority: "medium", title: "Criar página de depoimentos", description: "Adicione prova social com casos reais.", impact: "+30% confiança", impactValue: 30, applied: false },
        { id: "4", type: "feature", priority: "medium", title: "Adicionar WhatsApp flutuante", description: "Facilite o contato direto.", impact: "+40% leads", impactValue: 40, applied: false },
        { id: "5", type: "text", priority: "low", title: "Simplificar textos", description: "Alguns textos estão muito longos.", impact: "+10% leitura", impactValue: 10, applied: false },
      ]);
      setOptimizationScore(68);
      setIsAnalyzing(false);
      setActiveTab("opportunities");
      toast.success("Análise completa!");
    }, 2500);
  };

  const handleApply = (suggestion: Suggestion) => {
    if (onSendMessage) {
      onSendMessage(`Aplique esta melhoria no site: ${suggestion.title}\n\nDescrição: ${suggestion.description}\n\nImpacto esperado: ${suggestion.impact}`);
    }
    setSuggestions(suggestions.map(s => s.id === suggestion.id ? { ...s, applied: true } : s));
    setOptimizationScore(prev => Math.min(100, prev + 5));
    toast.success("Melhoria aplicada!");
  };

  const priorityColors = {
    high: "bg-red-500/10 text-red-500 border-red-500/20",
    medium: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    low: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  };

  const priorityLabels = { high: "Urgente", medium: "Importante", low: "Sugerido" };

  const typeIcons = { cta: Target, text: Lightbulb, page: BarChart3, feature: Zap };

  const appliedCount = suggestions.filter(s => s.applied).length;
  const totalImpact = suggestions.filter(s => s.applied).reduce((acc, s) => acc + s.impactValue, 0);

  return (
    <div className="space-y-6">
      <ToolHeader 
        icon={Rocket}
        title="Growth Engine"
        description="Análise e recomendações para crescimento"
        stat={optimizationScore > 0 ? { value: `${optimizationScore}%`, label: "Score" } : undefined}
      />

      <ToolTabs tabs={tabs} value={activeTab} onValueChange={setActiveTab}>
        <TabsContent value="overview" className="mt-6 space-y-6">
          {suggestions.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-10 space-y-6">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Rocket className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Análise de Crescimento</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
                  Descubra oportunidades de melhoria e receba recomendações personalizadas
                </p>
              </div>
              <Button onClick={handleAnalyze} disabled={isAnalyzing} className="bg-primary hover:bg-primary/90">
                {isAnalyzing ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Analisando...</> : <><TrendingUp className="w-4 h-4 mr-2" />Iniciar Análise</>}
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-3">
                <ToolStat icon={AlertCircle} label="Urgentes" value={suggestions.filter(s => s.priority === "high" && !s.applied).length} variant="danger" />
                <ToolStat icon={Lightbulb} label="Importantes" value={suggestions.filter(s => s.priority === "medium" && !s.applied).length} variant="warning" />
                <ToolStat icon={CheckCircle2} label="Aplicadas" value={appliedCount} variant="success" />
              </div>

              <ToolCard>
                <h4 className="text-sm font-semibold text-foreground mb-4">Distribuição por Categoria</h4>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={categoryData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value">
                        {categoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", color: "hsl(var(--foreground))" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-2">
                  {categoryData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-xs text-muted-foreground">{item.name}</span>
                    </div>
                  ))}
                </div>
              </ToolCard>
            </div>
          )}
        </TabsContent>

        <TabsContent value="opportunities" className="mt-6 space-y-3">
          {suggestions.map((suggestion, index) => {
            const Icon = typeIcons[suggestion.type];
            return (
              <motion.div key={suggestion.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
                <ToolCard hover className={suggestion.applied ? "border-emerald-500/20 bg-emerald-500/5" : ""}>
                  <div className="flex items-start gap-4">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${suggestion.applied ? "bg-emerald-500/10" : "bg-primary/10"}`}>
                      <Icon className={`w-4 h-4 ${suggestion.applied ? "text-emerald-500" : "text-primary"}`} />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-foreground text-sm">{suggestion.title}</p>
                        <span className={`px-2 py-0.5 text-[10px] rounded-full border ${priorityColors[suggestion.priority]}`}>
                          {priorityLabels[suggestion.priority]}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{suggestion.description}</p>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs text-emerald-500 flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-md">
                          <TrendingUp className="w-3 h-3" />{suggestion.impact}
                        </span>
                        {suggestion.applied ? (
                          <span className="text-xs text-emerald-500 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" />Aplicado</span>
                        ) : (
                          <Button size="sm" onClick={() => handleApply(suggestion)} className="bg-primary/10 hover:bg-primary/20 text-primary h-7 text-xs">
                            Aplicar<ArrowRight className="w-3 h-3 ml-1" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </ToolCard>
              </motion.div>
            );
          })}
          {suggestions.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Rocket className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Execute uma análise para ver oportunidades</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="recommendations" className="mt-6 space-y-4">
          <ToolCard gradient>
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-primary" />Recomendações Prioritárias
            </h4>
            <div className="space-y-2">
              {suggestions.filter(s => s.priority === "high" && !s.applied).map((s, i) => (
                <div key={s.id} className="flex items-center gap-3 p-3 bg-card/50 rounded-lg border border-border">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">{i + 1}</span>
                  <span className="text-sm text-foreground/80">{s.title}</span>
                  <span className="ml-auto text-xs text-emerald-500">{s.impact}</span>
                </div>
              ))}
              {suggestions.filter(s => s.priority === "high" && !s.applied).length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">✅ Todas as recomendações urgentes foram aplicadas!</p>
              )}
            </div>
          </ToolCard>

          <ToolCard>
            <h4 className="text-sm font-semibold text-foreground mb-3">Impacto Estimado Total</h4>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-3 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all duration-500" style={{ width: `${Math.min(100, totalImpact)}%` }} />
              </div>
              <span className="text-lg font-bold text-emerald-500">+{totalImpact}%</span>
            </div>
          </ToolCard>
        </TabsContent>

        <TabsContent value="evolution" className="mt-6 space-y-4">
          <ToolCard>
            <h4 className="text-sm font-semibold text-foreground mb-4">Evolução do Score</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={evolutionData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="week" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                  <Area type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ToolCard>

          <ToolTip>
            Continue aplicando melhorias para aumentar seu score e maximizar o potencial de crescimento do seu site.
          </ToolTip>
        </TabsContent>
      </ToolTabs>
    </div>
  );
};

export default GrowthEngineTool;