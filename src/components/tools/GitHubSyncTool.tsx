import { useState } from "react";
import { GitBranch, Check, Clock, ExternalLink, RefreshCw, GitCommit, GitMerge, AlertCircle, CheckCircle2, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

interface Commit {
  id: string;
  message: string;
  date: string;
  author: string;
  branch: string;
  additions: number;
  deletions: number;
}

const GitHubSyncTool = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isConnected, setIsConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [commits, setCommits] = useState<Commit[]>([
    { id: "abc123", message: "Adiciona seção de contato", date: "Há 2 horas", author: "você", branch: "main", additions: 45, deletions: 12 },
    { id: "def456", message: "Atualiza cores do tema", date: "Há 5 horas", author: "você", branch: "main", additions: 23, deletions: 18 },
    { id: "ghi789", message: "Cria página inicial", date: "Ontem", author: "você", branch: "main", additions: 156, deletions: 0 },
    { id: "jkl012", message: "Adiciona header responsivo", date: "2 dias atrás", author: "você", branch: "main", additions: 78, deletions: 22 },
    { id: "mno345", message: "Setup inicial do projeto", date: "3 dias atrás", author: "você", branch: "main", additions: 320, deletions: 0 },
  ]);

  const handleConnect = () => {
    toast.info("Para conectar ao GitHub, use o painel de integrações do Lovable.");
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      toast.success("Sincronizado com GitHub!");
    }, 2000);
  };

  const activityData = [
    { day: "Seg", commits: 3 },
    { day: "Ter", commits: 5 },
    { day: "Qua", commits: 2 },
    { day: "Qui", commits: 7 },
    { day: "Sex", commits: 4 },
    { day: "Sáb", commits: 1 },
    { day: "Dom", commits: 0 },
  ];

  const changesData = [
    { commit: "abc123", additions: 45, deletions: 12 },
    { commit: "def456", additions: 23, deletions: 18 },
    { commit: "ghi789", additions: 156, deletions: 0 },
    { commit: "jkl012", additions: 78, deletions: 22 },
  ];

  const totalAdditions = commits.reduce((acc, c) => acc + c.additions, 0);
  const totalDeletions = commits.reduce((acc, c) => acc + c.deletions, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-white/[0.06]">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
          <GitBranch className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Sincronização GitHub</h2>
          <p className="text-xs text-white/50">Controle de versão e histórico</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-4 bg-white/[0.02] border border-white/[0.06] p-1 rounded-xl">
          <TabsTrigger value="overview" className="text-xs data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-lg">
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="connection" className="text-xs data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-lg">
            Conexão
          </TabsTrigger>
          <TabsTrigger value="history" className="text-xs data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-lg">
            Versionamento
          </TabsTrigger>
          <TabsTrigger value="control" className="text-xs data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-lg">
            Controle
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          {/* Status Card */}
          <div className={`p-4 rounded-xl border ${
            isConnected 
              ? "bg-emerald-500/10 border-emerald-500/20" 
              : "bg-white/[0.02] border-white/[0.06]"
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                isConnected ? "bg-emerald-500/20" : "bg-white/[0.06]"
              }`}>
                <GitBranch className={`w-6 h-6 ${isConnected ? "text-emerald-400" : "text-white/50"}`} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-white">
                  {isConnected ? "Conectado ao GitHub" : "GitHub não conectado"}
                </p>
                <p className="text-xs text-white/50">
                  {isConnected ? "Sincronização automática ativa" : "Conecte para versionar seu código"}
                </p>
              </div>
              {isConnected && (
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-xs text-emerald-400">
                  <Check className="w-3 h-3" />
                  Ativo
                </span>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center gap-2 mb-2">
                <GitCommit className="w-4 h-4 text-primary" />
                <span className="text-xs text-white/60">Commits</span>
              </div>
              <p className="text-2xl font-bold text-white">{commits.length}</p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-emerald-400">Adições</span>
              </div>
              <p className="text-2xl font-bold text-emerald-400">+{totalAdditions}</p>
            </div>
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-red-400">Remoções</span>
              </div>
              <p className="text-2xl font-bold text-red-400">-{totalDeletions}</p>
            </div>
          </div>

          {/* Activity Chart */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h4 className="text-sm font-semibold text-white mb-4">Atividade Semanal</h4>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
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
                  <Bar dataKey="commits" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="connection" className="mt-6 space-y-4">
          {!isConnected ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8 space-y-4"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  <GitBranch className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Conecte ao GitHub</h3>
                  <p className="text-sm text-white/50 mt-2">
                    Mantenha seu código seguro e versionado
                  </p>
                </div>
              </motion.div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-white">Benefícios</h3>
                {[
                  { icon: GitCommit, text: "Histórico completo de alterações" },
                  { icon: RefreshCw, text: "Sincronização bidirecional" },
                  { icon: Clock, text: "Restaure versões anteriores" },
                  { icon: ExternalLink, text: "Edite código localmente" },
                ].map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                      <benefit.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm text-white/70">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>

              <Button
                onClick={handleConnect}
                className="w-full bg-[#24292e] hover:bg-[#24292e]/90"
              >
                <GitBranch className="w-4 h-4 mr-2" />
                Conectar GitHub
              </Button>

              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="text-xs text-blue-200/80">
                  ℹ️ A conexão com GitHub é feita através das configurações do Lovable.
                </p>
              </div>
            </>
          ) : (
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white">Repositório Conectado</h3>
                <a
                  href="#"
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  Abrir no GitHub
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between p-3 bg-white/[0.03] rounded-lg">
                  <span className="text-sm text-white/50">Nome:</span>
                  <span className="text-sm text-white font-medium">meu-projeto</span>
                </div>
                <div className="flex justify-between p-3 bg-white/[0.03] rounded-lg">
                  <span className="text-sm text-white/50">Branch:</span>
                  <span className="text-sm text-white font-medium flex items-center gap-2">
                    <GitBranch className="w-3 h-3" /> main
                  </span>
                </div>
                <div className="flex justify-between p-3 bg-white/[0.03] rounded-lg">
                  <span className="text-sm text-white/50">Última sync:</span>
                  <span className="text-sm text-white font-medium">Há 5 minutos</span>
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="history" className="mt-6 space-y-4">
          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10" />
            <AnimatePresence>
              {commits.map((commit, index) => (
                <motion.div
                  key={commit.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative pl-10 pb-4"
                >
                  <div className="absolute left-2 top-1 w-4 h-4 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-primary/30 transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-white">{commit.message}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-white/40 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {commit.date}
                          </span>
                          <span className="text-xs text-white/40">{commit.author}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-emerald-400">+{commit.additions}</span>
                        <span className="text-xs text-red-400">-{commit.deletions}</span>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-[10px] text-white/30 font-mono bg-white/[0.04] px-2 py-0.5 rounded">
                        {commit.id}
                      </span>
                      <span className="text-[10px] text-white/30 flex items-center gap-1">
                        <GitBranch className="w-2.5 h-2.5" />
                        {commit.branch}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </TabsContent>

        <TabsContent value="control" className="mt-6 space-y-4">
          {/* Sync Status */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-white">Status de Sincronização</h4>
              <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/20 text-xs text-emerald-400">
                <Activity className="w-3 h-3" />
                Em dia
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-white/70">Todos os commits sincronizados</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-white/70">Sem conflitos pendentes</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-white/70">Branch principal atualizada</span>
              </div>
            </div>
          </div>

          {/* Changes Chart */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h4 className="text-sm font-semibold text-white mb-4">Histórico de Alterações</h4>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={changesData}>
                  <defs>
                    <linearGradient id="colorAdditions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorDeletions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="commit" stroke="rgba(255,255,255,0.3)" fontSize={10} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      color: "white",
                    }}
                  />
                  <Area type="monotone" dataKey="additions" stroke="#10b981" fill="url(#colorAdditions)" strokeWidth={2} />
                  <Area type="monotone" dataKey="deletions" stroke="#ef4444" fill="url(#colorDeletions)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <Button
            onClick={handleSync}
            disabled={isSyncing}
            className="w-full bg-[#24292e] hover:bg-[#24292e]/90"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isSyncing ? "animate-spin" : ""}`} />
            {isSyncing ? "Sincronizando..." : "Sincronizar Agora"}
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GitHubSyncTool;
