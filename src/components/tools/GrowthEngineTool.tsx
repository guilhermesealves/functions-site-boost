import { useState } from "react";
import { Rocket, TrendingUp, AlertCircle, CheckCircle2, ArrowRight, Loader2, Lightbulb, BarChart3, Target, Zap, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, RadialBarChart, RadialBar, Legend, PieChart, Pie, Cell } from "recharts";

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
    { name: "CTA", value: 25, color: "#8b5cf6" },
    { name: "SEO", value: 20, color: "#06b6d4" },
    { name: "Design", value: 30, color: "#10b981" },
    { name: "Conteúdo", value: 25, color: "#f59e0b" },
  ];

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
          impact: "+25% conversão",
          impactValue: 25,
          applied: false,
        },
        {
          id: "2",
          type: "text",
          priority: "high",
          title: "Melhorar título principal",
          description: "O título atual é genérico. Use benefício direto para o cliente.",
          impact: "+15% engajamento",
          impactValue: 15,
          applied: false,
        },
        {
          id: "3",
          type: "page",
          priority: "medium",
          title: "Criar página de depoimentos",
          description: "Adicione prova social com casos de sucesso reais.",
          impact: "+30% confiança",
          impactValue: 30,
          applied: false,
        },
        {
          id: "4",
          type: "feature",
          priority: "medium",
          title: "Adicionar WhatsApp flutuante",
          description: "Facilite o contato direto com visitantes.",
          impact: "+40% leads",
          impactValue: 40,
          applied: false,
        },
        {
          id: "5",
          type: "text",
          priority: "low",
          title: "Simplificar textos",
          description: "Alguns textos estão muito longos. Seja mais direto.",
          impact: "+10% leitura",
          impactValue: 10,
          applied: false,
        },
      ]);
      setOptimizationScore(68);
      setIsAnalyzing(false);
      setActiveTab("opportunities");
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
    setOptimizationScore(prev => Math.min(100, prev + 5));

    toast.success("Melhoria aplicada!");
  };

  const priorityColors = {
    high: "bg-red-500/20 text-red-400 border-red-500/30",
    medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    low: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  };

  const priorityLabels = {
    high: "Urgente",
    medium: "Importante",
    low: "Sugerido",
  };

  const typeIcons = {
    cta: Target,
    text: Lightbulb,
    page: BarChart3,
    feature: Zap,
  };

  const appliedCount = suggestions.filter(s => s.applied).length;
  const totalImpact = suggestions.filter(s => s.applied).reduce((acc, s) => acc + s.impactValue, 0);

  const scoreData = [
    { name: "Score", value: optimizationScore, fill: optimizationScore >= 70 ? "#10b981" : optimizationScore >= 40 ? "#f59e0b" : "#ef4444" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-white/[0.06]">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
          <Rocket className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Growth Engine</h2>
          <p className="text-xs text-white/50">Análise e recomendações para crescimento</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-4 bg-white/[0.02] border border-white/[0.06] p-1 rounded-xl">
          <TabsTrigger value="overview" className="text-xs data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-lg">
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="opportunities" className="text-xs data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-lg">
            Oportunidades
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="text-xs data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-lg">
            Recomendações
          </TabsTrigger>
          <TabsTrigger value="evolution" className="text-xs data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-lg">
            Evolução
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          {suggestions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12 space-y-6"
            >
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                <Rocket className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Análise de Crescimento</h3>
                <p className="text-sm text-white/50 mt-2 max-w-xs mx-auto">
                  Descubra oportunidades de melhoria e receba recomendações personalizadas para crescer
                </p>
              </div>
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                size="lg"
                className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Analisando seu site...
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Iniciar Análise Completa
                  </>
                )}
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {/* Score Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.08]">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Score de Otimização</h3>
                    <p className="text-sm text-white/50 mt-1">Baseado em {suggestions.length} fatores analisados</p>
                  </div>
                  <div className="relative w-24 h-24">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" data={scoreData} startAngle={90} endAngle={-270}>
                        <RadialBar dataKey="value" cornerRadius={10} background={{ fill: "rgba(255,255,255,0.05)" }} />
                      </RadialBarChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">{optimizationScore}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    <span className="text-xs text-red-400">Urgentes</span>
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {suggestions.filter(s => s.priority === "high" && !s.applied).length}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                    <span className="text-xs text-amber-400">Importantes</span>
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {suggestions.filter(s => s.priority === "medium" && !s.applied).length}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs text-emerald-400">Aplicadas</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{appliedCount}</p>
                </div>
              </div>

              {/* Category Distribution */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <h4 className="text-sm font-semibold text-white mb-4">Distribuição por Categoria</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0,0,0,0.8)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "8px",
                          color: "white",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-2">
                  {categoryData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-xs text-white/60">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="opportunities" className="mt-6 space-y-4">
          <AnimatePresence>
            {suggestions.map((suggestion, index) => {
              const Icon = typeIcons[suggestion.type];
              return (
                <motion.div
                  key={suggestion.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-xl border transition-all ${
                    suggestion.applied
                      ? "bg-emerald-500/5 border-emerald-500/20"
                      : "bg-white/[0.02] border-white/[0.06] hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      suggestion.applied ? "bg-emerald-500/20" : "bg-white/[0.06]"
                    }`}>
                      <Icon className={`w-5 h-5 ${suggestion.applied ? "text-emerald-400" : "text-primary"}`} />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-white">{suggestion.title}</p>
                        <span className={`px-2 py-0.5 text-[10px] rounded-full border ${priorityColors[suggestion.priority]}`}>
                          {priorityLabels[suggestion.priority]}
                        </span>
                      </div>
                      <p className="text-sm text-white/50">{suggestion.description}</p>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-full">
                          <TrendingUp className="w-3 h-3" />
                          {suggestion.impact}
                        </span>
                        {suggestion.applied ? (
                          <span className="text-xs text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" />
                            Aplicado
                          </span>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => handleApply(suggestion)}
                            className="bg-primary/20 hover:bg-primary/30 text-primary"
                          >
                            Aplicar
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {suggestions.length === 0 && (
            <div className="text-center py-12 text-white/40">
              <Rocket className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Execute uma análise para ver oportunidades</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="recommendations" className="mt-6 space-y-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20">
            <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-primary" />
              Recomendações Prioritárias
            </h4>
            <div className="space-y-3">
              {suggestions.filter(s => s.priority === "high" && !s.applied).map((s, i) => (
                <div key={s.id} className="flex items-center gap-3 p-3 bg-white/[0.04] rounded-lg">
                  <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">
                    {i + 1}
                  </span>
                  <span className="text-sm text-white/80">{s.title}</span>
                  <span className="ml-auto text-xs text-emerald-400">{s.impact}</span>
                </div>
              ))}
              {suggestions.filter(s => s.priority === "high" && !s.applied).length === 0 && (
                <p className="text-sm text-white/40 text-center py-4">
                  ✅ Todas as recomendações urgentes foram aplicadas!
                </p>
              )}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h4 className="text-sm font-semibold text-white mb-3">Impacto Estimado Total</h4>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="h-3 bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-emerald-500 transition-all duration-500"
                    style={{ width: `${Math.min(100, totalImpact)}%` }}
                  />
                </div>
              </div>
              <span className="text-xl font-bold text-emerald-400">+{totalImpact}%</span>
            </div>
            <p className="text-xs text-white/40 mt-2">
              Potencial de melhoria ao aplicar todas as recomendações
            </p>
          </div>
        </TabsContent>

        <TabsContent value="evolution" className="mt-6 space-y-4">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h4 className="text-sm font-semibold text-white mb-4">Evolução do Score</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={evolutionData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="week" stroke="rgba(255,255,255,0.3)" fontSize={11} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      color: "white",
                    }}
                  />
                  <Area type="monotone" dataKey="score" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorScore)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-xs text-emerald-400 mb-1">Melhorias Aplicadas</p>
              <p className="text-2xl font-bold text-white">{appliedCount}</p>
            </div>
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
              <p className="text-xs text-primary mb-1">Crescimento Total</p>
              <p className="text-2xl font-bold text-white">+{totalImpact}%</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {suggestions.length > 0 && (
        <Button
          variant="outline"
          onClick={handleAnalyze}
          className="w-full border-white/10 text-white/70"
        >
          <Rocket className="w-4 h-4 mr-2" />
          Nova Análise
        </Button>
      )}
    </div>
  );
};

export default GrowthEngineTool;
