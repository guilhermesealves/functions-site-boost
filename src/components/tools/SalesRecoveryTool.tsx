import { useState } from "react";
import { RotateCcw, User, ShoppingCart, Clock, Send, MessageSquare, Percent, TrendingUp, AlertTriangle, CheckCircle2, DollarSign, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts";

interface SalesRecoveryToolProps {
  onSendMessage?: (message: string) => void;
}

interface AbandonedUser {
  id: string;
  name: string;
  email: string;
  action: string;
  abandonedAt: string;
  value: number;
  recovered: boolean;
  attempts: number;
}

const SalesRecoveryTool = ({ onSendMessage }: SalesRecoveryToolProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState<AbandonedUser[]>([
    { id: "1", name: "Carlos Silva", email: "carlos@email.com", action: "Carrinho abandonado", abandonedAt: "Há 2 horas", value: 299, recovered: false, attempts: 0 },
    { id: "2", name: "Ana Souza", email: "ana@email.com", action: "Formulário incompleto", abandonedAt: "Há 5 horas", value: 0, recovered: false, attempts: 1 },
    { id: "3", name: "Pedro Lima", email: "pedro@email.com", action: "Carrinho abandonado", abandonedAt: "Ontem", value: 450, recovered: true, attempts: 2 },
    { id: "4", name: "Maria Santos", email: "maria@email.com", action: "Checkout abandonado", abandonedAt: "Há 3 horas", value: 189, recovered: false, attempts: 0 },
    { id: "5", name: "João Costa", email: "joao@email.com", action: "Carrinho abandonado", abandonedAt: "2 dias atrás", value: 520, recovered: true, attempts: 1 },
  ]);

  const [reminderMessage, setReminderMessage] = useState(
    "Olá! 👋 Notamos que você deixou algo para trás. Volte e finalize sua compra com 10% de desconto usando o código VOLTE10!"
  );

  const handleSendReminder = (user: AbandonedUser) => {
    toast.success(`Lembrete enviado para ${user.name}`);
    setUsers(users.map(u => 
      u.id === user.id ? { ...u, recovered: true, attempts: u.attempts + 1 } : u
    ));
  };

  const handleSendToAll = () => {
    const pending = users.filter(u => !u.recovered);
    toast.success(`Lembrete enviado para ${pending.length} usuários`);
    setUsers(users.map(u => ({ ...u, recovered: true, attempts: u.attempts + 1 })));
  };

  const handleSetupRecovery = () => {
    if (onSendMessage) {
      onSendMessage(`Configure um sistema de recuperação de vendas no site:

1. RASTREAMENTO:
   - Detectar carrinhos abandonados após 30 min
   - Identificar formulários não finalizados
   - Registrar página de saída

2. AUTOMAÇÃO:
   - Popup de saída com oferta especial
   - Email automático após 2 horas
   - WhatsApp após 24 horas (se permitido)

3. INCENTIVOS:
   - Cupom de desconto: VOLTE10 (10% off)
   - Frete grátis para compras acima de R$100
   - Urgência: "Oferta válida por 24h"

4. MENSAGEM PADRÃO:
"${reminderMessage}"`);
    }
    toast.success("Configurando recuperação...");
  };

  const totalPending = users.filter(u => !u.recovered).length;
  const totalValue = users.filter(u => !u.recovered).reduce((acc, u) => acc + u.value, 0);
  const recoveredValue = users.filter(u => u.recovered).reduce((acc, u) => acc + u.value, 0);
  const recoveryRate = Math.round((users.filter(u => u.recovered).length / users.length) * 100);

  const abandonmentData = [
    { name: "Carrinho", value: users.filter(u => u.action.includes("Carrinho")).length, color: "#ef4444" },
    { name: "Checkout", value: users.filter(u => u.action.includes("Checkout")).length, color: "#f59e0b" },
    { name: "Formulário", value: users.filter(u => u.action.includes("Formulário")).length, color: "#8b5cf6" },
  ];

  const recoveryTrendData = [
    { day: "Seg", abandonados: 12, recuperados: 4 },
    { day: "Ter", abandonados: 8, recuperados: 5 },
    { day: "Qua", abandonados: 15, recuperados: 8 },
    { day: "Qui", abandonados: 10, recuperados: 7 },
    { day: "Sex", abandonados: 18, recuperados: 12 },
    { day: "Sáb", abandonados: 5, recuperados: 3 },
    { day: "Dom", abandonados: 3, recuperados: 2 },
  ];

  const conversionData = [
    { stage: "Enviados", value: 45 },
    { stage: "Abertos", value: 32 },
    { stage: "Clicados", value: 18 },
    { stage: "Convertidos", value: 8 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-white/[0.06]">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center">
          <RotateCcw className="w-5 h-5 text-red-400" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Recuperação de Vendas</h2>
          <p className="text-xs text-white/50">Recupere carrinhos e vendas perdidas</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-4 bg-white/[0.02] border border-white/[0.06] p-1 rounded-xl">
          <TabsTrigger value="overview" className="text-xs data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400 rounded-lg">
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="detection" className="text-xs data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400 rounded-lg">
            Detecção
          </TabsTrigger>
          <TabsTrigger value="automation" className="text-xs data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400 rounded-lg">
            Automação
          </TabsTrigger>
          <TabsTrigger value="results" className="text-xs data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400 rounded-lg">
            Resultados
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20">
              <div className="flex items-center gap-2 mb-2">
                <ShoppingCart className="w-4 h-4 text-red-400" />
                <span className="text-xs text-red-400">Pendentes</span>
              </div>
              <p className="text-2xl font-bold text-white">{totalPending}</p>
              <p className="text-xs text-white/40 mt-1">carrinhos</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-amber-400" />
                <span className="text-xs text-amber-400">Em Risco</span>
              </div>
              <p className="text-2xl font-bold text-white">R$ {totalValue.toLocaleString()}</p>
              <p className="text-xs text-white/40 mt-1">valor</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-emerald-400">Taxa</span>
              </div>
              <p className="text-2xl font-bold text-white">{recoveryRate}%</p>
              <p className="text-xs text-white/40 mt-1">recuperados</p>
            </div>
          </div>

          {/* Abandonment Types */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h4 className="text-sm font-semibold text-white mb-4">Tipos de Abandono</h4>
            <div className="flex items-center gap-6">
              <div className="w-32 h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={abandonmentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={50}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {abandonmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-2">
                {abandonmentData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-white/70">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recovery Trend */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h4 className="text-sm font-semibold text-white mb-4">Tendência Semanal</h4>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={recoveryTrendData}>
                  <defs>
                    <linearGradient id="colorAbandoned" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorRecovered" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" fontSize={11} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      color: "white",
                    }}
                  />
                  <Area type="monotone" dataKey="abandonados" stroke="#ef4444" fill="url(#colorAbandoned)" strokeWidth={2} />
                  <Area type="monotone" dataKey="recuperados" stroke="#10b981" fill="url(#colorRecovered)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="detection" className="mt-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-white">Usuários Detectados</h3>
            <Button
              size="sm"
              onClick={handleSendToAll}
              disabled={totalPending === 0}
              className="bg-red-500 hover:bg-red-600"
            >
              <Send className="w-3 h-3 mr-1" />
              Enviar para Todos
            </Button>
          </div>

          <AnimatePresence>
            {users.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-xl border transition-all ${
                  user.recovered
                    ? "bg-emerald-500/5 border-emerald-500/20"
                    : "bg-white/[0.02] border-white/[0.06]"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      user.recovered ? "bg-emerald-500/20" : "bg-white/[0.06]"
                    }`}>
                      <User className={`w-5 h-5 ${user.recovered ? "text-emerald-400" : "text-white/50"}`} />
                    </div>
                    <div>
                      <p className="font-medium text-white">{user.name}</p>
                      <p className="text-xs text-white/50">{user.email}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          user.action.includes("Carrinho") ? "bg-red-500/20 text-red-400" :
                          user.action.includes("Checkout") ? "bg-amber-500/20 text-amber-400" :
                          "bg-purple-500/20 text-purple-400"
                        }`}>
                          {user.action}
                        </span>
                        <span className="text-xs text-white/40 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {user.abandonedAt}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {user.value > 0 && (
                      <p className="text-lg font-semibold text-white">R$ {user.value}</p>
                    )}
                    {user.recovered ? (
                      <span className="text-xs text-emerald-400 flex items-center gap-1 justify-end">
                        <CheckCircle2 className="w-3 h-3" />
                        Recuperado
                      </span>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleSendReminder(user)}
                        className="text-primary hover:text-primary/80 mt-1"
                      >
                        <MessageSquare className="w-3 h-3 mr-1" />
                        Lembrar
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </TabsContent>

        <TabsContent value="automation" className="mt-6 space-y-4">
          <div className="space-y-3">
            <label className="text-sm font-medium text-white/70">Mensagem de Recuperação</label>
            <Textarea
              value={reminderMessage}
              onChange={(e) => setReminderMessage(e.target.value)}
              className="bg-white/[0.04] border-white/[0.08] text-white min-h-[100px]"
            />
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h4 className="text-sm font-semibold text-white mb-4">Fluxo de Automação</h4>
            <div className="space-y-3">
              {[
                { time: "30 min", action: "Popup de saída", icon: AlertTriangle, color: "text-amber-400" },
                { time: "2 horas", action: "Email automático", icon: Mail, color: "text-blue-400" },
                { time: "24 horas", action: "WhatsApp", icon: MessageSquare, color: "text-emerald-400" },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-3 bg-white/[0.03] rounded-lg"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center">
                    <step.icon className={`w-4 h-4 ${step.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white">{step.action}</p>
                    <p className="text-xs text-white/40">Após {step.time}</p>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </motion.div>
              ))}
            </div>
          </div>

          <Button
            onClick={handleSetupRecovery}
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-90"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Configurar Automação Completa
          </Button>
        </TabsContent>

        <TabsContent value="results" className="mt-6 space-y-4">
          {/* Conversion Funnel */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h4 className="text-sm font-semibold text-white mb-4">Funil de Conversão</h4>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={conversionData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis type="number" stroke="rgba(255,255,255,0.3)" fontSize={11} />
                  <YAxis dataKey="stage" type="category" stroke="rgba(255,255,255,0.3)" fontSize={11} width={80} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      color: "white",
                    }}
                  />
                  <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Results Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-xs text-emerald-400 mb-1">Valor Recuperado</p>
              <p className="text-2xl font-bold text-white">R$ {recoveredValue.toLocaleString()}</p>
              <p className="text-xs text-white/40 mt-1">este mês</p>
            </div>
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
              <p className="text-xs text-primary mb-1">Taxa de Sucesso</p>
              <p className="text-2xl font-bold text-white">{recoveryRate}%</p>
              <p className="text-xs text-white/40 mt-1">dos abandonos</p>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h4 className="text-sm font-semibold text-white mb-3">Métricas de Desempenho</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">Mensagens Enviadas</span>
                <span className="text-sm font-medium text-white">45</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">Taxa de Abertura</span>
                <span className="text-sm font-medium text-emerald-400">71%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">Taxa de Conversão</span>
                <span className="text-sm font-medium text-emerald-400">18%</span>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalesRecoveryTool;
