import { useState } from "react";
import { CheckSquare, Check, AlertCircle, TrendingUp, Trophy, Target, Clock, Zap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, RadialBarChart, RadialBar } from "recharts";

interface ChecklistItem {
  id: string;
  category: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
}

const ChecklistTool = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [items, setItems] = useState<ChecklistItem[]>([
    { id: "1", category: "Essencial", title: "Página inicial criada", description: "Hero, sobre, serviços e contato", completed: true, priority: "high" },
    { id: "2", category: "Essencial", title: "Logo adicionada", description: "Identidade visual do negócio", completed: true, priority: "high" },
    { id: "3", category: "Essencial", title: "Informações de contato", description: "Telefone, email e endereço", completed: true, priority: "high" },
    { id: "4", category: "Essencial", title: "Botão de WhatsApp", description: "Facilitar contato direto", completed: false, priority: "high" },
    { id: "5", category: "SEO", title: "Meta título configurado", description: "Título otimizado para buscas", completed: true, priority: "medium" },
    { id: "6", category: "SEO", title: "Meta descrição", description: "Descrição para Google", completed: false, priority: "medium" },
    { id: "7", category: "SEO", title: "Imagens otimizadas", description: "Alt text e compressão", completed: false, priority: "medium" },
    { id: "8", category: "Marketing", title: "Redes sociais vinculadas", description: "Links para Instagram, Facebook", completed: false, priority: "low" },
    { id: "9", category: "Marketing", title: "Google Analytics", description: "Rastreamento de visitas", completed: false, priority: "low" },
    { id: "10", category: "Marketing", title: "Pixel do Facebook", description: "Remarketing e anúncios", completed: false, priority: "low" },
    { id: "11", category: "Conversão", title: "Formulário de contato", description: "Captura de leads", completed: true, priority: "medium" },
    { id: "12", category: "Conversão", title: "CTA visível", description: "Chamada para ação clara", completed: false, priority: "high" },
  ]);

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const completedCount = items.filter(i => i.completed).length;
  const totalCount = items.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  const categories = [...new Set(items.map(i => i.category))];
  
  const priorityColors = {
    high: { bg: "bg-red-500/20", text: "text-red-400", border: "border-red-500/30" },
    medium: { bg: "bg-amber-500/20", text: "text-amber-400", border: "border-amber-500/30" },
    low: { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500/30" },
  };

  const priorityLabels = {
    high: "Alta",
    medium: "Média",
    low: "Baixa",
  };

  const getProgressColor = () => {
    if (percentage >= 80) return "#10b981";
    if (percentage >= 50) return "#f59e0b";
    return "#ef4444";
  };

  const categoryData = categories.map(cat => {
    const catItems = items.filter(i => i.category === cat);
    const catCompleted = catItems.filter(i => i.completed).length;
    return {
      name: cat,
      value: catCompleted,
      total: catItems.length,
      percentage: Math.round((catCompleted / catItems.length) * 100),
    };
  });

  const priorityData = (["high", "medium", "low"] as const).map(priority => {
    const priorityItems = items.filter(i => i.priority === priority);
    const completed = priorityItems.filter(i => i.completed).length;
    return {
      name: priorityLabels[priority],
      completed,
      total: priorityItems.length,
      pending: priorityItems.length - completed,
    };
  });

  const progressData = [
    { name: "Progresso", value: percentage, fill: getProgressColor() }
  ];

  const COLORS = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-white/[0.06]">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
          <CheckSquare className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Checklist de Status</h2>
          <p className="text-xs text-white/50">Acompanhe o progresso do seu site</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-4 bg-white/[0.02] border border-white/[0.06] p-1 rounded-xl">
          <TabsTrigger value="overview" className="text-xs data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400 rounded-lg">
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="completed" className="text-xs data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400 rounded-lg">
            Configurado
          </TabsTrigger>
          <TabsTrigger value="pending" className="text-xs data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400 rounded-lg">
            Pendente
          </TabsTrigger>
          <TabsTrigger value="progress" className="text-xs data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400 rounded-lg">
            Progresso
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          {/* Main Progress */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.08]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Progresso do Site</h3>
                <p className="text-sm text-white/50 mt-1">{completedCount} de {totalCount} itens concluídos</p>
              </div>
              <div className="relative w-24 h-24">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" data={progressData} startAngle={90} endAngle={-270}>
                    <RadialBar dataKey="value" cornerRadius={10} background={{ fill: "rgba(255,255,255,0.05)" }} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{percentage}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Priority Stats */}
          <div className="grid grid-cols-3 gap-4">
            {priorityData.map((priority, index) => (
              <div
                key={priority.name}
                className={`p-4 rounded-xl ${
                  index === 0 ? "bg-red-500/10 border border-red-500/20" :
                  index === 1 ? "bg-amber-500/10 border border-amber-500/20" :
                  "bg-blue-500/10 border border-blue-500/20"
                }`}
              >
                <p className={`text-xs mb-1 ${
                  index === 0 ? "text-red-400" :
                  index === 1 ? "text-amber-400" :
                  "text-blue-400"
                }`}>
                  {priority.name}
                </p>
                <p className="text-2xl font-bold text-white">{priority.completed}/{priority.total}</p>
                <p className="text-xs text-white/40">{priority.pending} pendentes</p>
              </div>
            ))}
          </div>

          {/* Category Progress */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h4 className="text-sm font-semibold text-white mb-4">Progresso por Categoria</h4>
            <div className="space-y-3">
              {categoryData.map((cat, index) => (
                <div key={cat.name} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/70">{cat.name}</span>
                    <span className="text-xs text-white/50">{cat.value}/{cat.total}</span>
                  </div>
                  <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.percentage}%` }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6 space-y-4">
          <AnimatePresence>
            {items.filter(i => i.completed).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => toggleItem(item.id)}
                className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 cursor-pointer hover:border-emerald-500/40 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-white/70 line-through">{item.title}</p>
                      <span className={`px-2 py-0.5 text-[10px] rounded-full ${priorityColors[item.priority].bg} ${priorityColors[item.priority].text}`}>
                        {priorityLabels[item.priority]}
                      </span>
                    </div>
                    <p className="text-xs text-white/40 mt-1">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {items.filter(i => i.completed).length === 0 && (
            <div className="text-center py-12 text-white/40">
              <Trophy className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Nenhum item concluído ainda</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="pending" className="mt-6 space-y-4">
          {categories.map((category) => {
            const categoryItems = items.filter(i => i.category === category && !i.completed);
            if (categoryItems.length === 0) return null;

            return (
              <div key={category} className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-primary" />
                  <h4 className="text-sm font-medium text-white/70">{category}</h4>
                  <span className="text-xs text-white/40">({categoryItems.length} pendentes)</span>
                </div>
                
                <AnimatePresence>
                  {categoryItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => toggleItem(item.id)}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-primary/30 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full border-2 border-white/20 shrink-0 hover:border-primary transition-colors" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-white">{item.title}</p>
                            {item.priority === "high" && (
                              <AlertCircle className="w-4 h-4 text-red-400" />
                            )}
                            <span className={`px-2 py-0.5 text-[10px] rounded-full border ${priorityColors[item.priority].bg} ${priorityColors[item.priority].text} ${priorityColors[item.priority].border}`}>
                              {priorityLabels[item.priority]}
                            </span>
                          </div>
                          <p className="text-xs text-white/40 mt-1">{item.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            );
          })}

          {items.filter(i => !i.completed).length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-4">
                <Trophy className="w-8 h-8 text-emerald-400" />
              </div>
              <p className="text-lg font-semibold text-white">Parabéns!</p>
              <p className="text-sm text-white/50 mt-1">Todos os itens foram concluídos 🚀</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="progress" className="mt-6 space-y-4">
          {/* Visual Progress Indicators */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h4 className="text-sm font-semibold text-white mb-4">Indicadores Visuais</h4>
            <div className="flex items-center gap-6">
              <div className="w-40 h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Concluído", value: completedCount, color: "#10b981" },
                        { name: "Pendente", value: totalCount - completedCount, color: "rgba(255,255,255,0.1)" },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      <Cell fill="#10b981" />
                      <Cell fill="rgba(255,255,255,0.1)" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-emerald-500" />
                  <span className="text-sm text-white/70">Concluído</span>
                  <span className="text-sm font-medium text-white ml-auto">{completedCount}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-white/10" />
                  <span className="text-sm text-white/70">Pendente</span>
                  <span className="text-sm font-medium text-white ml-auto">{totalCount - completedCount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          {percentage === 100 ? (
            <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 text-center">
              <Trophy className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <p className="text-lg font-semibold text-white">Site 100% Configurado!</p>
              <p className="text-sm text-white/50 mt-1">Parabéns, seu site está pronto para decolar 🚀</p>
            </div>
          ) : (
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-white">Dica de Priorização</p>
                  <p className="text-xs text-white/50 mt-1">
                    Complete os itens de <strong className="text-red-400">alta prioridade</strong> primeiro 
                    para ter um site funcional rapidamente.
                  </p>
                </div>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChecklistTool;
