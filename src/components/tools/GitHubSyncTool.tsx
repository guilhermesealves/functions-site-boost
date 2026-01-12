import { useState } from "react";
import { GitBranch, Check, Clock, AlertCircle, ExternalLink, RefreshCw, GitCommit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Commit {
  id: string;
  message: string;
  date: string;
  author: string;
}

const GitHubSyncTool = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [commits, setCommits] = useState<Commit[]>([
    { id: "abc123", message: "Adiciona seção de contato", date: "Há 2 horas", author: "você" },
    { id: "def456", message: "Atualiza cores do tema", date: "Há 5 horas", author: "você" },
    { id: "ghi789", message: "Cria página inicial", date: "Ontem", author: "você" },
  ]);

  const handleConnect = () => {
    toast.info("Para conectar ao GitHub, use o painel de integrações do Lovable.");
    // In production, this would open the GitHub OAuth flow
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      toast.success("Sincronizado com GitHub!");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Status Card */}
      <div className={`p-4 rounded-xl border ${
        isConnected 
          ? "bg-emerald-500/10 border-emerald-500/20" 
          : "bg-white/[0.02] border-white/[0.06]"
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            isConnected ? "bg-emerald-500/20" : "bg-white/[0.06]"
          }`}>
            <GitBranch className={`w-5 h-5 ${isConnected ? "text-emerald-400" : "text-white/50"}`} />
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
            <span className="flex items-center gap-1 text-xs text-emerald-400">
              <Check className="w-3 h-3" />
              Ativo
            </span>
          )}
        </div>
      </div>

      {!isConnected ? (
        <>
          {/* Benefits */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white">Benefícios do GitHub</h3>
            <div className="space-y-2">
              {[
                { icon: GitCommit, text: "Histórico completo de alterações" },
                { icon: RefreshCw, text: "Sincronização bidirecional" },
                { icon: Clock, text: "Restaure versões anteriores" },
                { icon: ExternalLink, text: "Edite código localmente" },
              ].map((benefit, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]"
                >
                  <benefit.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm text-white/70">{benefit.text}</span>
                </div>
              ))}
            </div>
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
              Clique no botão acima para mais informações.
            </p>
          </div>
        </>
      ) : (
        <>
          {/* Repo Info */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-white">Repositório</h3>
              <a
                href="#"
                className="text-xs text-primary hover:underline flex items-center gap-1"
              >
                Abrir no GitHub
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/50">Nome:</span>
                <span className="text-white">meu-projeto</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Branch:</span>
                <span className="text-white">main</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Última sync:</span>
                <span className="text-white">Há 5 minutos</span>
              </div>
            </div>
          </div>

          {/* Commits */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Histórico</h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleSync}
                disabled={isSyncing}
                className="text-primary"
              >
                <RefreshCw className={`w-3 h-3 mr-1 ${isSyncing ? "animate-spin" : ""}`} />
                Sincronizar
              </Button>
            </div>

            <div className="space-y-2">
              {commits.map((commit) => (
                <div
                  key={commit.id}
                  className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]"
                >
                  <div className="flex items-start gap-3">
                    <GitCommit className="w-4 h-4 text-primary mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-white">{commit.message}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-white/40">{commit.date}</span>
                        <span className="text-[10px] text-white/40">•</span>
                        <span className="text-[10px] text-white/40">{commit.author}</span>
                        <span className="text-[10px] text-white/30 font-mono">{commit.id}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GitHubSyncTool;
