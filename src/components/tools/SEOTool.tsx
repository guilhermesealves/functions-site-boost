import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Globe, Loader2, Sparkles, FileText, TrendingUp, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useToolsAI } from "@/hooks/useToolsAI";

interface SEOToolProps {
  onSendMessage?: (message: string) => void;
}

const SEOTool = ({ onSendMessage }: SEOToolProps) => {
  const [businessType, setBusinessType] = useState("");
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  
  const { execute, isLoading, result } = useToolsAI({ 
    tool: "seo",
    onComplete: () => toast.success("Conteúdo SEO gerado!")
  });

  const handleGenerate = async () => {
    if (!businessType || !keyword) {
      toast.error("Preencha o tipo de negócio e palavra-chave");
      return;
    }
    await execute("generate", { 
      businessType, 
      keyword: `${keyword}${location ? ` ${location}` : ""}` 
    });
  };

  const handleApply = () => {
    if (onSendMessage && result) {
      onSendMessage(`Aplique este conteúdo SEO otimizado ao meu site:

${result}

Integre naturalmente no layout existente, mantendo a estrutura semântica correta.`);
    }
    toast.success("Aplicando SEO...");
  };

  return (
    <div className="space-y-6">
      {/* Configuration */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 p-5 rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.02] border border-white/[0.06]"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/20">
            <Search className="w-4 h-4 text-blue-400" />
          </div>
          <h3 className="text-sm font-semibold text-white">Configurar SEO</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-white/50 mb-2 block">Tipo de Negócio</label>
            <Input
              placeholder="Ex: Consultoria de Marketing Digital"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="bg-white/[0.04] border-white/[0.08] text-white focus:border-blue-500/50 transition-colors"
            />
          </div>

          <div>
            <label className="text-xs text-white/50 mb-2 block">Palavra-chave Principal</label>
            <Input
              placeholder="Ex: marketing digital"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="bg-white/[0.04] border-white/[0.08] text-white focus:border-blue-500/50 transition-colors"
            />
          </div>

          <div>
            <label className="text-xs text-white/50 mb-2 block">Localização (opcional)</label>
            <Input
              placeholder="Ex: São Paulo, SP"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-white/[0.04] border-white/[0.08] text-white focus:border-blue-500/50 transition-colors"
            />
          </div>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg shadow-blue-500/20 h-11"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <Sparkles className="w-4 h-4 mr-2" />
          )}
          Gerar Conteúdo SEO
        </Button>
      </motion.div>

      {/* Loading State */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Gerando conteúdo SEO...</p>
                <p className="text-xs text-white/40">Otimizando para mecanismos de busca</p>
              </div>
            </div>
            <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="h-full w-1/3 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {result && !isLoading && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="space-y-4 p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20 shadow-lg shadow-blue-500/5"
          >
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <FileText className="w-4 h-4 text-blue-400" />
              </div>
              <h3 className="text-sm font-semibold text-white">Conteúdo SEO Otimizado</h3>
              <CheckCircle className="w-4 h-4 text-emerald-400 ml-auto" />
            </div>
            
            <div className="text-sm text-white/70 whitespace-pre-wrap leading-relaxed max-h-[350px] overflow-y-auto pr-2 custom-scrollbar bg-black/20 rounded-xl p-4">
              {result}
            </div>

            <Button
              onClick={handleApply}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg shadow-blue-500/20 h-12 text-base font-semibold"
            >
              <Globe className="w-5 h-5 mr-2" />
              Aplicar ao Site
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tips */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20"
      >
        <p className="text-xs text-blue-200/80">
          💡 <strong>Dica:</strong> Use palavras-chave específicas do seu nicho para melhores resultados. 
          Inclua a localização se seu negócio for local.
        </p>
      </motion.div>
    </div>
  );
};

export default SEOTool;
