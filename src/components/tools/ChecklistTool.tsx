import { useState } from "react";
import { CheckSquare, Check, AlertCircle, Trophy, Target, Zap, Eye, Clock, BarChart3 } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ToolHeader, ToolTabs, ToolCard, ToolStat, ToolTip } from "./shared";

interface ChecklistItem {
  id: string;
  category: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
}

const tabs = [
  { value: "overview", label: "Visão Geral", icon: Eye },
  { value: "completed", label: "Configurado", icon: Check },
  { value: "pending", label: "Pendente", icon: Clock },
  { value: "progress", label: "Progresso", icon: BarChart3 },
];

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

  const toggleItem = (id: string) => setItems(items.map(item => item.id === id ? { ...item, completed: !item.completed } : item));

  const completedCount = items.filter(i => i.completed).length;
  const totalCount = items.length;
  const percentage = Math.round((completedCount / totalCount) * 100);
  const categories = [...new Set(items.map(i => i.category))];

  const priorityColors = {
    high: { bg: "bg-red-500/10", text: "text-red-500", border: "border-red-500/20" },
    medium: { bg: "bg-amber-500/10", text: "text-amber-500", border: "border-amber-500/20" },
    low: { bg: "bg-blue-500/10", text: "text-blue-500", border: "border-blue-500/20" },
  };

  const priorityLabels = { high: "Alta", medium: "Média", low: "Baixa" };

  const priorityData = (["high", "medium", "low"] as const).map(priority => {
    const priorityItems = items.filter(i => i.priority === priority);
    return { name: priorityLabels[priority], completed: priorityItems.filter(i => i.completed).length, total: priorityItems.length, pending: priorityItems.length - priorityItems.filter(i => i.completed).length };
  });

  const categoryData = categories.map(cat => {
    const catItems = items.filter(i => i.category === cat);
    return { name: cat, value: catItems.filter(i => i.completed).length, total: catItems.length, percentage: Math.round((catItems.filter(i => i.completed).length / catItems.length) * 100) };
  });

  return (
    <div className="space-y-6">
      <ToolHeader icon={CheckSquare} title="Checklist de Status" description="Acompanhe o progresso do seu site" stat={{ value: `${percentage}%`, label: "Concluído" }} />

      <ToolTabs tabs={tabs} value={activeTab} onValueChange={setActiveTab}>
        <TabsContent value="overview" className="mt-6 space-y-6">
          <ToolCard gradient>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-foreground">Progresso do Site</h3>
                <p className="text-sm text-muted-foreground mt-1">{completedCount} de {totalCount} itens concluídos</p>
              </div>
              <div className="w-20 h-20 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={[{ value: percentage }, { value: 100 - percentage }]} cx="50%" cy="50%" innerRadius={28} outerRadius={38} startAngle={90} endAngle={-270} dataKey="value">
                      <Cell fill="hsl(var(--primary))" />
                      <Cell fill="hsl(var(--secondary))" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-foreground">{percentage}%</span>
                </div>
              </div>
            </div>
          </ToolCard>

          <div className="grid grid-cols-3 gap-3">
            <ToolStat icon={AlertCircle} label="Alta" value={`${priorityData[0].completed}/${priorityData[0].total}`} variant="danger" />
            <ToolStat icon={Target} label="Média" value={`${priorityData[1].completed}/${priorityData[1].total}`} variant="warning" />
            <ToolStat icon={Zap} label="Baixa" value={`${priorityData[2].completed}/${priorityData[2].total}`} />
          </div>

          <ToolCard>
            <h4 className="text-sm font-semibold text-foreground mb-4">Progresso por Categoria</h4>
            <div className="space-y-3">
              {categoryData.map((cat, index) => (
                <div key={cat.name} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground/70">{cat.name}</span>
                    <span className="text-xs text-muted-foreground">{cat.value}/{cat.total}</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${cat.percentage}%` }} transition={{ duration: 0.5, delay: index * 0.1 }} className="h-full bg-primary rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </ToolCard>
        </TabsContent>

        <TabsContent value="completed" className="mt-6 space-y-3">
          <AnimatePresence>
            {items.filter(i => i.completed).map((item, index) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                <ToolCard hover className="border-emerald-500/20 bg-emerald-500/5" onClick={() => toggleItem(item.id)}>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-foreground/70 line-through">{item.title}</p>
                        <span className={`px-2 py-0.5 text-[10px] rounded-full ${priorityColors[item.priority].bg} ${priorityColors[item.priority].text}`}>{priorityLabels[item.priority]}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                    </div>
                  </div>
                </ToolCard>
              </motion.div>
            ))}
          </AnimatePresence>
          {items.filter(i => i.completed).length === 0 && (
            <div className="text-center py-12 text-muted-foreground"><Trophy className="w-12 h-12 mx-auto mb-3 opacity-30" /><p>Nenhum item concluído ainda</p></div>
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
                  <h4 className="text-sm font-medium text-foreground/70">{category}</h4>
                  <span className="text-xs text-muted-foreground">({categoryItems.length} pendentes)</span>
                </div>
                <AnimatePresence>
                  {categoryItems.map((item, index) => (
                    <motion.div key={item.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
                      <ToolCard hover onClick={() => toggleItem(item.id)}>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full border-2 border-border shrink-0 hover:border-primary transition-colors" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-foreground">{item.title}</p>
                              {item.priority === "high" && <AlertCircle className="w-4 h-4 text-red-500" />}
                              <span className={`px-2 py-0.5 text-[10px] rounded-full border ${priorityColors[item.priority].bg} ${priorityColors[item.priority].text} ${priorityColors[item.priority].border}`}>{priorityLabels[item.priority]}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                          </div>
                        </div>
                      </ToolCard>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            );
          })}
          {items.filter(i => !i.completed).length === 0 && (
            <div className="text-center py-12">
              <div className="w-14 h-14 mx-auto rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                <Trophy className="w-7 h-7 text-emerald-500" />
              </div>
              <p className="text-base font-semibold text-foreground">Parabéns!</p>
              <p className="text-sm text-muted-foreground mt-1">Todos os itens foram concluídos 🚀</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="progress" className="mt-6 space-y-4">
          <ToolCard>
            <h4 className="text-sm font-semibold text-foreground mb-4">Indicadores Visuais</h4>
            <div className="flex items-center gap-6">
              <div className="w-32 h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={[{ name: "Concluído", value: completedCount }, { name: "Pendente", value: totalCount - completedCount }]} cx="50%" cy="50%" innerRadius={40} outerRadius={55} paddingAngle={5} dataKey="value">
                      <Cell fill="hsl(160, 84%, 39%)" />
                      <Cell fill="hsl(var(--secondary))" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-sm text-foreground/70">Concluído</span>
                  <span className="text-sm font-medium text-foreground ml-auto">{completedCount}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-secondary" />
                  <span className="text-sm text-foreground/70">Pendente</span>
                  <span className="text-sm font-medium text-foreground ml-auto">{totalCount - completedCount}</span>
                </div>
              </div>
            </div>
          </ToolCard>

          {percentage === 100 ? (
            <ToolCard gradient className="text-center border-emerald-500/20">
              <Trophy className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
              <p className="text-base font-semibold text-foreground">Site 100% Configurado!</p>
              <p className="text-sm text-muted-foreground mt-1">Parabéns, seu site está pronto para decolar 🚀</p>
            </ToolCard>
          ) : (
            <ToolTip>
              Complete os itens de <strong className="text-red-500">alta prioridade</strong> primeiro para ter um site funcional rapidamente.
            </ToolTip>
          )}
        </TabsContent>
      </ToolTabs>
    </div>
  );
};

export default ChecklistTool;