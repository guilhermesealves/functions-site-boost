import { useState } from "react";
import { Search, FileText, Globe, TrendingUp, Plus, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface SEOToolProps {
  onSendMessage?: (message: string) => void;
}

interface SEOPage {
  id: string;
  title: string;
  slug: string;
  keyword: string;
  description: string;
  status: "draft" | "published";
}

const SEOTool = ({ onSendMessage }: SEOToolProps) => {
  const [businessType, setBusinessType] = useState("");
  const [location, setLocation] = useState("");
  const [keywords, setKeywords] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [pages, setPages] = useState<SEOPage[]>([]);

  const handleGenerate = async () => {
    if (!businessType || !keywords) {
      toast.error("Preencha o tipo de negócio e palavras-chave");
      return;
    }

    setIsGenerating(true);

    // Simulate page generation
    setTimeout(() => {
      const keywordList = keywords.split(",").map(k => k.trim());
      const generatedPages: SEOPage[] = keywordList.map((keyword, i) => ({
        id: `page-${i}`,
        title: `${businessType} - ${keyword}${location ? ` em ${location}` : ""}`,
        slug: keyword.toLowerCase().replace(/\s+/g, "-"),
        keyword,
        description: `Encontre os melhores serviços de ${keyword} para seu negócio. ${businessType} especializado com qualidade garantida.`,
        status: "draft",
      }));

      setPages(generatedPages);
      setIsGenerating(false);
      toast.success(`${generatedPages.length} páginas geradas!`);
    }, 2000);
  };

  const handlePublish = (pageId: string) => {
    setPages(pages.map(p => 
      p.id === pageId ? { ...p, status: "published" as const } : p
    ));
    toast.success("Página publicada!");
  };

  const handleGenerateAll = () => {
    if (onSendMessage && pages.length > 0) {
      onSendMessage(`Crie ${pages.length} páginas SEO otimizadas para o meu site:

${pages.map(p => `
📄 Página: ${p.title}
- URL: /${p.slug}
- Palavra-chave: ${p.keyword}
- Meta descrição: ${p.description}
`).join("\n")}

Cada página deve ter:
- H1 com a palavra-chave
- Conteúdo original e relevante
- Meta tags otimizadas
- Estrutura semântica (H2, H3)
- Call-to-action`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Configuration */}
      <div className="space-y-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Search className="w-4 h-4 text-primary" />
          Configurar SEO
        </h3>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-white/50 mb-1 block">Tipo de Negócio</label>
            <Input
              placeholder="Ex: Consultoria de Marketing"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="bg-white/[0.04] border-white/[0.08] text-white"
            />
          </div>

          <div>
            <label className="text-xs text-white/50 mb-1 block">Localização (opcional)</label>
            <Input
              placeholder="Ex: São Paulo, SP"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-white/[0.04] border-white/[0.08] text-white"
            />
          </div>

          <div>
            <label className="text-xs text-white/50 mb-1 block">Palavras-chave (separadas por vírgula)</label>
            <Textarea
              placeholder="marketing digital, gestão de redes sociais, consultoria empresarial..."
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="bg-white/[0.04] border-white/[0.08] text-white min-h-[80px]"
            />
          </div>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full bg-primary hover:bg-primary/90"
        >
          {isGenerating ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <Sparkles className="w-4 h-4 mr-2" />
          )}
          Gerar Páginas SEO
        </Button>
      </div>

      {/* Generated Pages */}
      {pages.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">
              Páginas Geradas ({pages.length})
            </h3>
            <Button
              size="sm"
              onClick={handleGenerateAll}
              className="bg-primary hover:bg-primary/90"
            >
              <Globe className="w-3 h-3 mr-1" />
              Criar Todas
            </Button>
          </div>

          <div className="space-y-2">
            {pages.map((page) => (
              <div
                key={page.id}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-white text-sm">{page.title}</p>
                    <p className="text-xs text-primary">/{page.slug}</p>
                  </div>
                  <span className={`px-2 py-0.5 text-[10px] rounded-full ${
                    page.status === "published" 
                      ? "bg-emerald-500/20 text-emerald-400" 
                      : "bg-white/10 text-white/50"
                  }`}>
                    {page.status === "published" ? "Publicada" : "Rascunho"}
                  </span>
                </div>
                <p className="text-xs text-white/50 line-clamp-2">{page.description}</p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 text-[10px] rounded bg-blue-500/20 text-blue-400">
                    {page.keyword}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
        <p className="text-xs text-white/70">
          💡 <strong>Dica:</strong> Crie páginas específicas para cada serviço ou produto. 
          Quanto mais páginas otimizadas, maior a chance de aparecer no Google.
        </p>
      </div>
    </div>
  );
};

export default SEOTool;
