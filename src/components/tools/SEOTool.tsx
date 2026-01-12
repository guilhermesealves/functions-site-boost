import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Globe, Loader2, Sparkles, FileText, TrendingUp, CheckCircle,
  Info, LayoutGrid, FileCode, BarChart3, Target, Zap, Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useToolsAI } from "@/hooks/useToolsAI";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, AreaChart, Area
} from "recharts";

interface SEOToolProps {
  onSendMessage?: (message: string) => void;
}

interface GeneratedPage {
  id: string;
  title: string;
  slug: string;
  status: "pending" | "generated" | "indexed";
}

const growthData = [
  { month: "Jan", pages: 5 },
  { month: "Fev", pages: 12 },
  { month: "Mar", pages: 25 },
  { month: "Abr", pages: 45 },
  { month: "Mai", pages: 78 },
  { month: "Jun", pages: 120 },
];

const seoIndicators = [
  { name: "Títulos", score: 92, max: 100 },
  { name: "Descrições", score: 85, max: 100 },
  { name: "Cobertura", score: 78, max: 100 },
  { name: "Velocidade", score: 95, max: 100 },
];

const SEOTool = ({ onSendMessage }: SEOToolProps) => {
  const [businessType, setBusinessType] = useState("");
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [generatedPages, setGeneratedPages] = useState<GeneratedPage[]>([]);
  
  const { execute, isLoading, result } = useToolsAI({ 
    tool: "seo",
    onComplete: () => {
      toast.success("Conteúdo SEO gerado!");
      setGeneratedPages([
        { id: "1", title: `${businessType} em ${location || "Brasil"}`, slug: `/${keyword.toLowerCase().replace(/\s/g, "-")}`, status: "generated" },
        { id: "2", title: `Melhores ${keyword} - Guia Completo`, slug: `/melhores-${keyword.toLowerCase().replace(/\s/g, "-")}`, status: "generated" },
        { id: "3", title: `${keyword} - Preços e Serviços`, slug: `/${keyword.toLowerCase().replace(/\s/g, "-")}-precos`, status: "pending" },
        { id: "4", title: `Como escolher ${keyword}`, slug: `/como-escolher-${keyword.toLowerCase().replace(/\s/g, "-")}`, status: "pending" },
      ]);
      setActiveTab("results");
    }
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

  const totalPages = generatedPages.length;
  const indexedPages = generatedPages.filter(p => p.status === "indexed").length;
  const avgScore = Math.round(seoIndicators.reduce((acc, i) => acc + i.score, 0) / seoIndicators.length);

  const statusColors = {
    pending: "bg-white/20 text-white/60",
    generated: "bg-blue-500/20 text-blue-400",
    indexed: "bg-emerald-500/20 text-emerald-400"
  };

  const statusLabels = {
    pending: "Pendente",
    generated: "Gerado",
    indexed: "Indexado"
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 pb-4 border-b border-white/10">
        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/30 to-cyan-500/20">
          <Search className="w-6 h-6 text-blue-400" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-white">SEO Programático</h2>
          <p className="text-sm text-white/50">Gere páginas otimizadas automaticamente</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-blue-400">{totalPages}</p>
          <p className="text-xs text-white/40">Páginas</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 bg-white/[0.04] border border-white/[0.08] p-1 rounded-xl">
          <TabsTrigger value="overview" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-white/60 text-xs rounded-lg">
            <Info className="w-3 h-3 mr-1" />
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="structure" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-white/60 text-xs rounded-lg">
            <LayoutGrid className="w-3 h-3 mr-1" />
            Estrutura
          </TabsTrigger>
          <TabsTrigger value="content" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-white/60 text-xs rounded-lg">
            <FileCode className="w-3 h-3 mr-1" />
            Conteúdo
          </TabsTrigger>
          <TabsTrigger value="results" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-white/60 text-xs rounded-lg">
            <BarChart3 className="w-3 h-3 mr-1" />
            Resultados
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Páginas Geradas", value: totalPages, icon: FileText, color: "text-blue-400" },
              { label: "Indexadas", value: indexedPages, icon: CheckCircle, color: "text-emerald-400" },
              { label: "Score SEO", value: `${avgScore}%`, icon: Target, color: "text-amber-400" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]"
              >
                <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-white/40">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Growth Chart */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
            <h4 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              Crescimento de Páginas Indexáveis
            </h4>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="colorPages" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} axisLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} axisLine={false} />
                <Tooltip 
                  contentStyle={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  labelStyle={{ color: 'white' }}
                />
                <Area type="monotone" dataKey="pages" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorPages)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* SEO Indicators */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
            <h4 className="text-sm font-medium text-white mb-4">Indicadores de SEO</h4>
            <div className="space-y-3">
              {seoIndicators.map((indicator, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/60">{indicator.name}</span>
                    <span className="text-white font-medium">{indicator.score}%</span>
                  </div>
                  <Progress value={indicator.score} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Structure Tab */}
        <TabsContent value="structure" className="mt-6 space-y-6">
          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <LayoutGrid className="w-4 h-4 text-blue-400" />
              </div>
              <h4 className="text-sm font-medium text-white">Configurar Geração</h4>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-white/50 mb-2 block">Tipo de Negócio</label>
                <Input
                  placeholder="Ex: Consultoria de Marketing Digital"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="bg-white/[0.04] border-white/[0.08] text-white focus:border-blue-500/50 h-12"
                />
              </div>

              <div>
                <label className="text-xs text-white/50 mb-2 block">Palavra-chave Principal</label>
                <Input
                  placeholder="Ex: marketing digital"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="bg-white/[0.04] border-white/[0.08] text-white focus:border-blue-500/50 h-12"
                />
              </div>

              <div>
                <label className="text-xs text-white/50 mb-2 block">Localização (opcional)</label>
                <Input
                  placeholder="Ex: São Paulo, SP"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-white/[0.04] border-white/[0.08] text-white focus:border-blue-500/50 h-12"
                />
              </div>
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg shadow-blue-500/20 h-12"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Sparkles className="w-4 h-4 mr-2" />
            )}
            Gerar Páginas SEO
          </Button>

          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Gerando conteúdo SEO...</p>
                    <p className="text-xs text-white/40">Otimizando para mecanismos de busca</p>
                  </div>
                </div>
                <Progress value={60} className="h-2" />
              </motion.div>
            )}
          </AnimatePresence>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content" className="mt-6 space-y-6">
          {result ? (
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20">
              <div className="flex items-center gap-2 mb-4">
                <FileCode className="w-5 h-5 text-blue-400" />
                <h4 className="text-sm font-semibold text-white">Conteúdo Gerado</h4>
                <CheckCircle className="w-4 h-4 text-emerald-400 ml-auto" />
              </div>
              <div className="text-sm text-white/70 whitespace-pre-wrap leading-relaxed max-h-[350px] overflow-y-auto pr-2 bg-black/20 rounded-xl p-4">
                {result}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <FileCode className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/40">Configure e gere o conteúdo na aba Estrutura</p>
            </div>
          )}
        </TabsContent>

        {/* Results Tab */}
        <TabsContent value="results" className="mt-6 space-y-6">
          {generatedPages.length > 0 ? (
            <>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-white">Páginas Geradas</h4>
                  <span className="text-xs text-white/40">{generatedPages.length} páginas</span>
                </div>
                <Progress value={(generatedPages.filter(p => p.status !== "pending").length / generatedPages.length) * 100} className="h-2" />
              </div>

              <div className="space-y-2">
                {generatedPages.map((page, i) => (
                  <motion.div
                    key={page.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-center gap-3"
                  >
                    <FileText className="w-5 h-5 text-blue-400 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{page.title}</p>
                      <p className="text-xs text-white/40 truncate">{page.slug}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-lg shrink-0 ${statusColors[page.status]}`}>
                      {statusLabels[page.status]}
                    </span>
                  </motion.div>
                ))}
              </div>

              <Button
                onClick={handleApply}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 h-12"
              >
                <Globe className="w-5 h-5 mr-2" />
                Aplicar ao Site
              </Button>
            </>
          ) : (
            <div className="text-center py-12">
              <BarChart3 className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/40">Gere páginas para ver os resultados</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Tip */}
      <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
        <p className="text-xs text-blue-200/80">
          💡 <strong>Dica:</strong> Use palavras-chave específicas do seu nicho para melhores resultados. 
          Inclua a localização se seu negócio for local.
        </p>
      </div>
    </div>
  );
};

export default SEOTool;
