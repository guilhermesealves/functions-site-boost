import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Copy, Loader2, Sparkles, Layout, Palette, Type, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useToolsAI } from "@/hooks/useToolsAI";

interface SiteClonerToolProps {
  onSendMessage?: (message: string) => void;
}

const SiteClonerTool = ({ onSendMessage }: SiteClonerToolProps) => {
  const [url, setUrl] = useState("");
  const { execute, isLoading, result } = useToolsAI({ 
    tool: "site-cloner",
    onComplete: () => toast.success("Análise completa!")
  });

  const handleAnalyze = async () => {
    if (!url) {
      toast.error("Insira uma URL para analisar");
      return;
    }
    await execute("analyze", { url });
  };

  const handleGenerate = () => {
    if (onSendMessage && result) {
      onSendMessage(`Crie um site profissional inspirado em ${url}. 
      
Aqui está a análise da referência:
${result}

Por favor, crie uma versão original e moderna mantendo os melhores elementos identificados.`);
    }
    toast.success("Gerando site...");
  };

  const features = [
    { icon: Layout, label: "Estrutura Visual", desc: "Layout e hierarquia", delay: 0.1 },
    { icon: Palette, label: "Cores", desc: "Paleta adaptável", delay: 0.15 },
    { icon: Type, label: "Tipografia", desc: "Fontes e estilos", delay: 0.2 },
    { icon: Sparkles, label: "Elementos", desc: "Blocos e seções", delay: 0.25 },
  ];

  return (
    <div className="space-y-6">
      {/* URL Input */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        <label className="text-sm font-medium text-white/70">URL do site de referência</label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <Input
              placeholder="https://exemplo.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="pl-10 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/30 focus:border-primary/50 transition-colors"
            />
          </div>
          <Button
            onClick={handleAnalyze}
            disabled={isLoading}
            className="bg-gradient-to-r from-primary to-amber-500 hover:from-primary/90 hover:to-amber-500/90 shadow-lg shadow-primary/20"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Analisar
              </>
            )}
          </Button>
        </div>
      </motion.div>

      {/* Features */}
      <div className="grid grid-cols-2 gap-3">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: feature.delay }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-primary/30 hover:bg-white/[0.04] transition-all duration-300 cursor-pointer group"
          >
            <feature.icon className="w-5 h-5 text-primary mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-medium text-white">{feature.label}</p>
            <p className="text-xs text-white/40">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Analysis Results */}
      <AnimatePresence>
        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="space-y-4 p-5 rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.02] border border-primary/20 shadow-lg shadow-primary/5"
          >
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/20">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-white">Análise Completa</h3>
              <CheckCircle className="w-4 h-4 text-emerald-400 ml-auto" />
            </div>
            
            <div className="prose prose-invert prose-sm max-w-none">
              <div className="text-sm text-white/70 whitespace-pre-wrap leading-relaxed max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {result}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                onClick={handleGenerate}
                className="w-full bg-gradient-to-r from-primary to-amber-500 hover:from-primary/90 hover:to-amber-500/90 shadow-lg shadow-primary/20 h-12 text-base font-semibold"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Gerar Site Inspirado
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading State */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Loader2 className="w-5 h-5 text-primary animate-spin" />
                </div>
                <div className="absolute inset-0 rounded-xl bg-primary/30 animate-ping" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Analisando site...</p>
                <p className="text-xs text-white/40">Isso pode levar alguns segundos</p>
              </div>
            </div>
            <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="h-full w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20"
      >
        <p className="text-xs text-amber-200/80">
          ⚠️ Esta ferramenta cria versões <strong>originais</strong> inspiradas em referências. 
          Nunca copia conteúdos protegidos ou marcas registradas.
        </p>
      </motion.div>
    </div>
  );
};

export default SiteClonerTool;
