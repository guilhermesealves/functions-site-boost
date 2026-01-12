import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MessageSquare, Users, Phone, Tag, Check, Settings, Zap, 
  TrendingUp, Clock, UserPlus, Info, Bot, BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from "recharts";

interface ZapCRMToolProps {
  onSendMessage?: (message: string) => void;
}

interface Lead {
  id: string;
  name: string;
  phone: string;
  interest: string;
  status: "new" | "talking" | "customer";
  date: string;
}

const conversationData = [
  { day: "Seg", conversas: 12 },
  { day: "Ter", conversas: 19 },
  { day: "Qua", conversas: 15 },
  { day: "Qui", conversas: 28 },
  { day: "Sex", conversas: 35 },
  { day: "Sáb", conversas: 22 },
  { day: "Dom", conversas: 8 },
];

const leadsStatusData = [
  { name: "Novos", value: 45, color: "#3B82F6" },
  { name: "Em conversa", value: 30, color: "#F59E0B" },
  { name: "Clientes", value: 25, color: "#10B981" },
];

const timelineData = [
  { time: "09:00", atendimentos: 5 },
  { time: "10:00", atendimentos: 12 },
  { time: "11:00", atendimentos: 18 },
  { time: "12:00", atendimentos: 8 },
  { time: "14:00", atendimentos: 22 },
  { time: "15:00", atendimentos: 28 },
  { time: "16:00", atendimentos: 15 },
  { time: "17:00", atendimentos: 10 },
];

const ZapCRMTool = ({ onSendMessage }: ZapCRMToolProps) => {
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("Olá! 👋 Como posso ajudar você hoje?");
  const [isConnected, setIsConnected] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([
    { id: "1", name: "Maria Silva", phone: "11999999999", interest: "Consultoria", status: "new", date: "Hoje, 14:30" },
    { id: "2", name: "João Santos", phone: "11888888888", interest: "Website", status: "talking", date: "Hoje, 12:15" },
    { id: "3", name: "Ana Costa", phone: "11777777777", interest: "Logo", status: "customer", date: "Ontem, 16:45" },
    { id: "4", name: "Pedro Oliveira", phone: "11666666666", interest: "App", status: "new", date: "Hoje, 10:20" },
    { id: "5", name: "Carla Mendes", phone: "11555555555", interest: "E-commerce", status: "talking", date: "Ontem, 09:00" },
  ]);
  const [activeTab, setActiveTab] = useState("overview");

  const handleConnect = () => {
    if (!whatsappNumber) {
      toast.error("Insira o número do WhatsApp");
      return;
    }
    setIsConnected(true);
    toast.success("WhatsApp conectado com sucesso!");
    if (onSendMessage) {
      onSendMessage(`Configure um botão de WhatsApp no site com:
- Número: ${whatsappNumber}
- Mensagem de boas-vindas: "${welcomeMessage}"
- Posição: Canto inferior direito
- Estilo: Botão flutuante verde com ícone do WhatsApp`);
    }
  };

  const updateLeadStatus = (leadId: string, status: Lead["status"]) => {
    setLeads(leads.map(lead => 
      lead.id === leadId ? { ...lead, status } : lead
    ));
    toast.success("Status atualizado!");
  };

  const statusColors = {
    new: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    talking: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    customer: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  };

  const statusLabels = {
    new: "Novo",
    talking: "Em conversa",
    customer: "Cliente",
  };

  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === "new").length;
  const talkingLeads = leads.filter(l => l.status === "talking").length;
  const customerLeads = leads.filter(l => l.status === "customer").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 pb-4 border-b border-white/10">
        <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/30 to-green-500/20">
          <MessageSquare className="w-6 h-6 text-emerald-400" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-white">WhatsApp Commerce + CRM</h2>
          <p className="text-sm text-white/50">Gestão completa de atendimento e leads</p>
        </div>
        <div className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 ${
          isConnected ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-white/40"
        }`}>
          <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-emerald-400 animate-pulse" : "bg-white/40"}`} />
          {isConnected ? "Conectado" : "Desconectado"}
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 bg-white/[0.04] border border-white/[0.08] p-1 rounded-xl">
          <TabsTrigger value="overview" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white text-white/60 text-xs rounded-lg">
            <Info className="w-3 h-3 mr-1" />
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="connection" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white text-white/60 text-xs rounded-lg">
            <Settings className="w-3 h-3 mr-1" />
            Conexão
          </TabsTrigger>
          <TabsTrigger value="automation" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white text-white/60 text-xs rounded-lg">
            <Bot className="w-3 h-3 mr-1" />
            Automação
          </TabsTrigger>
          <TabsTrigger value="clients" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white text-white/60 text-xs rounded-lg">
            <Users className="w-3 h-3 mr-1" />
            Clientes
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "Total Leads", value: totalLeads, icon: Users, color: "text-white", bg: "from-white/10 to-white/5" },
              { label: "Novos", value: newLeads, icon: UserPlus, color: "text-blue-400", bg: "from-blue-500/20 to-blue-500/5" },
              { label: "Em Conversa", value: talkingLeads, icon: MessageSquare, color: "text-amber-400", bg: "from-amber-500/20 to-amber-500/5" },
              { label: "Clientes", value: customerLeads, icon: Check, color: "text-emerald-400", bg: "from-emerald-500/20 to-emerald-500/5" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-4 rounded-xl bg-gradient-to-br ${stat.bg} border border-white/[0.08]`}
              >
                <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-white/40">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Conversations Chart */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <h4 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                Conversas Iniciadas
              </h4>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={conversationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} axisLine={false} />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    labelStyle={{ color: 'white' }}
                  />
                  <Bar dataKey="conversas" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Leads by Status */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <h4 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Leads por Status
              </h4>
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie
                    data={leadsStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {leadsStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-2">
                {leadsStatusData.map((item, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-white/50">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
            <h4 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              Linha do Tempo de Atendimentos
            </h4>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} axisLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} axisLine={false} />
                <Tooltip 
                  contentStyle={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  labelStyle={{ color: 'white' }}
                />
                <Line type="monotone" dataKey="atendimentos" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        {/* Connection Tab */}
        <TabsContent value="connection" className="mt-6 space-y-6">
          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20">
                <Phone className="w-4 h-4 text-emerald-400" />
              </div>
              <h4 className="text-sm font-medium text-white">Configurar WhatsApp</h4>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-white/50 mb-2 block">Número do WhatsApp</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <Input
                    placeholder="5511999999999"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    className="pl-10 bg-white/[0.04] border-white/[0.08] text-white h-12"
                  />
                </div>
                <p className="text-xs text-white/40 mt-1">Inclua código do país (55 para Brasil)</p>
              </div>

              <div>
                <label className="text-xs text-white/50 mb-2 block">Mensagem de Boas-Vindas</label>
                <Textarea
                  placeholder="Olá! Como posso ajudar?"
                  value={welcomeMessage}
                  onChange={(e) => setWelcomeMessage(e.target.value)}
                  className="bg-white/[0.04] border-white/[0.08] text-white min-h-[100px]"
                />
              </div>

              <Button 
                onClick={handleConnect} 
                className="w-full bg-emerald-600 hover:bg-emerald-700 h-12"
                disabled={isConnected}
              >
                {isConnected ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Conectado
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Conectar WhatsApp
                  </>
                )}
              </Button>
            </div>
          </div>

          {isConnected && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
            >
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-400" />
                <div>
                  <p className="text-sm font-medium text-white">WhatsApp ativo</p>
                  <p className="text-xs text-white/50">+{whatsappNumber}</p>
                </div>
              </div>
            </motion.div>
          )}
        </TabsContent>

        {/* Automation Tab */}
        <TabsContent value="automation" className="mt-6 space-y-6">
          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
            <h4 className="text-sm font-medium text-white mb-4">Mensagens Automáticas</h4>
            <div className="space-y-3">
              {[
                { trigger: "Primeira mensagem", message: welcomeMessage, active: true },
                { trigger: "Após 5 minutos", message: "Posso ajudar com mais alguma informação?", active: true },
                { trigger: "Horário comercial", message: "Nosso horário é de 9h às 18h", active: false },
              ].map((auto, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl border ${auto.active ? "bg-emerald-500/10 border-emerald-500/20" : "bg-white/[0.02] border-white/[0.06]"}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-white/70">{auto.trigger}</span>
                    <div className={`w-8 h-4 rounded-full ${auto.active ? "bg-emerald-500" : "bg-white/20"} flex items-center ${auto.active ? "justify-end" : "justify-start"} px-0.5`}>
                      <div className="w-3 h-3 rounded-full bg-white" />
                    </div>
                  </div>
                  <p className="text-sm text-white/60">{auto.message}</p>
                </div>
              ))}
            </div>
          </div>

          <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
            <Bot className="w-4 h-4 mr-2" />
            Configurar Automações
          </Button>
        </TabsContent>

        {/* Clients Tab */}
        <TabsContent value="clients" className="mt-6 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Novos", count: newLeads, color: "text-blue-400 bg-blue-500/20" },
              { label: "Em conversa", count: talkingLeads, color: "text-amber-400 bg-amber-500/20" },
              { label: "Clientes", count: customerLeads, color: "text-emerald-400 bg-emerald-500/20" },
            ].map((stat, i) => (
              <div key={i} className={`p-3 rounded-xl ${stat.color.split(' ')[1]} border border-white/[0.08] text-center`}>
                <p className={`text-2xl font-bold ${stat.color.split(' ')[0]}`}>{stat.count}</p>
                <p className="text-xs text-white/40">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Leads List */}
          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
            {leads.map((lead) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">{lead.name}</p>
                    <p className="text-sm text-white/50">{lead.phone}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs rounded-lg border ${statusColors[lead.status]}`}>
                      {statusLabels[lead.status]}
                    </span>
                    <p className="text-xs text-white/30 mt-1">{lead.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-3 h-3 text-white/30" />
                  <span className="text-sm text-white/60">{lead.interest}</span>
                </div>
                <div className="flex gap-2">
                  {(["new", "talking", "customer"] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => updateLeadStatus(lead.id, status)}
                      className={`flex-1 py-1.5 text-xs rounded-lg transition-colors ${
                        lead.status === status
                          ? statusColors[status]
                          : "bg-white/[0.04] text-white/40 hover:text-white/60"
                      }`}
                    >
                      {statusLabels[status]}
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ZapCRMTool;
