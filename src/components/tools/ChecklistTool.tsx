import { useState, useEffect } from "react";
import { CheckSquare, Check, Circle, AlertCircle, TrendingUp } from "lucide-react";

interface ChecklistItem {
  id: string;
  category: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
}

const ChecklistTool = () => {
  const [items, setItems] = useState<ChecklistItem[]>([
    // Essenciais
    { id: "1", category: "Essencial", title: "Página inicial criada", description: "Hero, sobre, serviços e contato", completed: true, priority: "high" },
    { id: "2", category: "Essencial", title: "Logo adicionada", description: "Identidade visual do negócio", completed: true, priority: "high" },
    { id: "3", category: "Essencial", title: "Informações de contato", description: "Telefone, email e endereço", completed: true, priority: "high" },
    { id: "4", category: "Essencial", title: "Botão de WhatsApp", description: "Facilitar contato direto", completed: false, priority: "high" },
    
    // SEO
    { id: "5", category: "SEO", title: "Meta título configurado", description: "Título otimizado para buscas", completed: true, priority: "medium" },
    { id: "6", category: "SEO", title: "Meta descrição", description: "Descrição para Google", completed: false, priority: "medium" },
    { id: "7", category: "SEO", title: "Imagens otimizadas", description: "Alt text e compressão", completed: false, priority: "medium" },
    
    // Marketing
    { id: "8", category: "Marketing", title: "Redes sociais vinculadas", description: "Links para Instagram, Facebook", completed: false, priority: "low" },
    { id: "9", category: "Marketing", title: "Google Analytics", description: "Rastreamento de visitas", completed: false, priority: "low" },
    { id: "10", category: "Marketing", title: "Pixel do Facebook", description: "Remarketing e anúncios", completed: false, priority: "low" },
    
    // Conversão
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
    high: "text-red-400",
    medium: "text-amber-400",
    low: "text-blue-400",
  };

  const getProgressColor = () => {
    if (percentage >= 80) return "from-emerald-500 to-emerald-400";
    if (percentage >= 50) return "from-amber-500 to-amber-400";
    return "from-red-500 to-red-400";
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white">Progresso do Site</h3>
          <span className="text-2xl font-bold text-white">{percentage}%</span>
        </div>
        
        {/* Progress Bar */}
        <div className="h-3 bg-white/[0.06] rounded-full overflow-hidden mb-3">
          <div
            className={`h-full bg-gradient-to-r ${getProgressColor()} transition-all duration-500`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="flex justify-between text-xs text-white/50">
          <span>{completedCount} de {totalCount} concluídos</span>
          <span>{totalCount - completedCount} pendentes</span>
        </div>
      </div>

      {/* Stats by Priority */}
      <div className="grid grid-cols-3 gap-3">
        {(["high", "medium", "low"] as const).map((priority) => {
          const priorityItems = items.filter(i => i.priority === priority);
          const completed = priorityItems.filter(i => i.completed).length;
          return (
            <div
              key={priority}
              className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center"
            >
              <div className={`text-lg font-bold ${priorityColors[priority]}`}>
                {completed}/{priorityItems.length}
              </div>
              <p className="text-[10px] text-white/40 capitalize">
                {priority === "high" ? "Alta" : priority === "medium" ? "Média" : "Baixa"}
              </p>
            </div>
          );
        })}
      </div>

      {/* Checklist by Category */}
      <div className="space-y-4">
        {categories.map((category) => {
          const categoryItems = items.filter(i => i.category === category);
          const categoryCompleted = categoryItems.filter(i => i.completed).length;
          
          return (
            <div key={category} className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-white/70">{category}</h4>
                <span className="text-xs text-white/40">
                  {categoryCompleted}/{categoryItems.length}
                </span>
              </div>
              
              <div className="space-y-1">
                {categoryItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      item.completed
                        ? "bg-emerald-500/10 border border-emerald-500/20"
                        : "bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        item.completed
                          ? "bg-emerald-500"
                          : "border border-white/20"
                      }`}>
                        {item.completed && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className={`text-sm font-medium ${
                            item.completed ? "text-white/50 line-through" : "text-white"
                          }`}>
                            {item.title}
                          </p>
                          {!item.completed && item.priority === "high" && (
                            <AlertCircle className="w-3 h-3 text-red-400" />
                          )}
                        </div>
                        <p className="text-xs text-white/40">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      {percentage === 100 ? (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
          <CheckSquare className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
          <p className="text-sm font-semibold text-white">Site 100% Configurado!</p>
          <p className="text-xs text-white/50 mt-1">Parabéns, seu site está pronto para decolar 🚀</p>
        </div>
      ) : (
        <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
          <p className="text-xs text-white/70 flex items-start gap-2">
            <TrendingUp className="w-4 h-4 shrink-0 text-primary mt-0.5" />
            Complete os itens de <strong>alta prioridade</strong> primeiro para ter um site funcional rapidamente.
          </p>
        </div>
      )}
    </div>
  );
};

export default ChecklistTool;
