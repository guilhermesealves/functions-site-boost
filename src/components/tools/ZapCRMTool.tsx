import { useState } from "react";
import { MessageSquare, Plus, Users, Phone, Tag, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface SiteClonerToolProps {
  onSendMessage?: (message: string) => void;
}

interface Lead {
  id: string;
  name: string;
  phone: string;
  interest: string;
  status: "new" | "talking" | "customer";
}

const ZapCRMTool = ({ onSendMessage }: SiteClonerToolProps) => {
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("Olá! 👋 Como posso ajudar você hoje?");
  const [leads, setLeads] = useState<Lead[]>([
    { id: "1", name: "Maria Silva", phone: "11999999999", interest: "Consultoria", status: "new" },
    { id: "2", name: "João Santos", phone: "11888888888", interest: "Website", status: "talking" },
    { id: "3", name: "Ana Costa", phone: "11777777777", interest: "Logo", status: "customer" },
  ]);
  const [activeTab, setActiveTab] = useState<"config" | "leads">("config");

  const handleSaveConfig = () => {
    toast.success("Configurações do WhatsApp salvas!");
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

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-white/[0.04] rounded-xl">
        <button
          onClick={() => setActiveTab("config")}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "config" 
              ? "bg-primary text-white" 
              : "text-white/60 hover:text-white"
          }`}
        >
          <MessageSquare className="w-4 h-4 inline mr-2" />
          Configurar
        </button>
        <button
          onClick={() => setActiveTab("leads")}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "leads" 
              ? "bg-primary text-white" 
              : "text-white/60 hover:text-white"
          }`}
        >
          <Users className="w-4 h-4 inline mr-2" />
          Leads ({leads.length})
        </button>
      </div>

      {activeTab === "config" ? (
        <div className="space-y-4">
          {/* WhatsApp Number */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">Número do WhatsApp</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <Input
                placeholder="5511999999999"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="pl-10 bg-white/[0.04] border-white/[0.08] text-white"
              />
            </div>
            <p className="text-xs text-white/40">Inclua código do país (55 para Brasil)</p>
          </div>

          {/* Welcome Message */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">Mensagem de Boas-Vindas</label>
            <Textarea
              placeholder="Olá! Como posso ajudar?"
              value={welcomeMessage}
              onChange={(e) => setWelcomeMessage(e.target.value)}
              className="bg-white/[0.04] border-white/[0.08] text-white min-h-[100px]"
            />
          </div>

          {/* Quick Messages Templates */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">Mensagens Rápidas</label>
            <div className="space-y-2">
              {[
                "Obrigado pelo interesse! Em breve retornaremos.",
                "Posso enviar mais informações por aqui mesmo?",
                "Qual o melhor horário para conversarmos?",
              ].map((msg, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] text-sm text-white/70 hover:border-primary/30 cursor-pointer transition-colors"
                  onClick={() => setWelcomeMessage(msg)}
                >
                  {msg}
                </div>
              ))}
            </div>
          </div>

          <Button onClick={handleSaveConfig} className="w-full bg-emerald-600 hover:bg-emerald-700">
            <MessageSquare className="w-4 h-4 mr-2" />
            Adicionar ao Site
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Novos", count: leads.filter(l => l.status === "new").length, color: "text-blue-400" },
              { label: "Em conversa", count: leads.filter(l => l.status === "talking").length, color: "text-amber-400" },
              { label: "Clientes", count: leads.filter(l => l.status === "customer").length, color: "text-emerald-400" },
            ].map((stat, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.count}</p>
                <p className="text-xs text-white/40">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Leads List */}
          <div className="space-y-2">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">{lead.name}</p>
                    <p className="text-sm text-white/50">{lead.phone}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-lg border ${statusColors[lead.status]}`}>
                    {statusLabels[lead.status]}
                  </span>
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
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ZapCRMTool;
