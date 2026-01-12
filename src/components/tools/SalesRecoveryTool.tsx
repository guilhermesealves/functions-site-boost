import { useState } from "react";
import { RotateCcw, User, ShoppingCart, Clock, Send, MessageSquare, Percent, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

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
}

const SalesRecoveryTool = ({ onSendMessage }: SalesRecoveryToolProps) => {
  const [users, setUsers] = useState<AbandonedUser[]>([
    { id: "1", name: "Carlos Silva", email: "carlos@email.com", action: "Carrinho abandonado", abandonedAt: "Há 2 horas", value: 299, recovered: false },
    { id: "2", name: "Ana Souza", email: "ana@email.com", action: "Formulário incompleto", abandonedAt: "Há 5 horas", value: 0, recovered: false },
    { id: "3", name: "Pedro Lima", email: "pedro@email.com", action: "Carrinho abandonado", abandonedAt: "Ontem", value: 450, recovered: true },
  ]);

  const [reminderMessage, setReminderMessage] = useState(
    "Olá! 👋 Notamos que você deixou algo para trás. Volte e finalize sua compra com 10% de desconto usando o código VOLTE10!"
  );

  const handleSendReminder = (user: AbandonedUser) => {
    toast.success(`Lembrete enviado para ${user.name}`);
    setUsers(users.map(u => 
      u.id === user.id ? { ...u, recovered: true } : u
    ));
  };

  const handleSendToAll = () => {
    const pending = users.filter(u => !u.recovered);
    toast.success(`Lembrete enviado para ${pending.length} usuários`);
    setUsers(users.map(u => ({ ...u, recovered: true })));
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
  const recoveryRate = Math.round((users.filter(u => u.recovered).length / users.length) * 100);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-center">
          <ShoppingCart className="w-5 h-5 text-red-400 mx-auto mb-1" />
          <p className="text-lg font-bold text-white">{totalPending}</p>
          <p className="text-[10px] text-white/40">Pendentes</p>
        </div>
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
          <Percent className="w-5 h-5 text-amber-400 mx-auto mb-1" />
          <p className="text-lg font-bold text-white">R$ {totalValue}</p>
          <p className="text-[10px] text-white/40">Em risco</p>
        </div>
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
          <TrendingUp className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
          <p className="text-lg font-bold text-white">{recoveryRate}%</p>
          <p className="text-[10px] text-white/40">Recuperados</p>
        </div>
      </div>

      {/* Reminder Message */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/70">Mensagem de Lembrete</label>
        <Textarea
          value={reminderMessage}
          onChange={(e) => setReminderMessage(e.target.value)}
          className="bg-white/[0.04] border-white/[0.08] text-white min-h-[80px]"
        />
      </div>

      {/* Users List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Usuários Abandonados</h3>
          <Button
            size="sm"
            onClick={handleSendToAll}
            disabled={totalPending === 0}
            className="bg-primary hover:bg-primary/90"
          >
            <Send className="w-3 h-3 mr-1" />
            Enviar para Todos
          </Button>
        </div>

        <div className="space-y-2">
          {users.map((user) => (
            <div
              key={user.id}
              className={`p-4 rounded-xl border transition-all ${
                user.recovered
                  ? "bg-emerald-500/5 border-emerald-500/20"
                  : "bg-white/[0.02] border-white/[0.06]"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    user.recovered ? "bg-emerald-500/20" : "bg-white/[0.06]"
                  }`}>
                    <User className={`w-4 h-4 ${user.recovered ? "text-emerald-400" : "text-white/50"}`} />
                  </div>
                  <div>
                    <p className="font-medium text-white">{user.name}</p>
                    <p className="text-xs text-white/50">{user.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-amber-400">{user.action}</span>
                      <span className="text-xs text-white/30">•</span>
                      <span className="text-xs text-white/40 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {user.abandonedAt}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {user.value > 0 && (
                    <p className="font-semibold text-white">R$ {user.value}</p>
                  )}
                  {user.recovered ? (
                    <span className="text-xs text-emerald-400">Recuperado</span>
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
            </div>
          ))}
        </div>
      </div>

      <Button
        onClick={handleSetupRecovery}
        className="w-full bg-primary hover:bg-primary/90"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        Configurar Recuperação Automática
      </Button>
    </div>
  );
};

export default SalesRecoveryTool;
