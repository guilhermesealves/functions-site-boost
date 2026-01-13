import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Loader2, Download, Copy, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CanvasData {
  key_partners: string[];
  key_activities: string[];
  key_resources: string[];
  value_propositions: string[];
  customer_relationships: string[];
  channels: string[];
  customer_segments: string[];
  cost_structure: string[];
  revenue_streams: string[];
}

export const BusinessPlanTool = () => {
  const [niche, setNiche] = useState("");
  const [capital, setCapital] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [canvas, setCanvas] = useState<CanvasData | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleGenerate = async () => {
    if (!niche.trim()) {
      toast.error("Informe o nicho de mercado");
      return;
    }

    setIsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Você precisa estar logado");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/business-plan`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            niche: niche.trim(),
            initialCapital: capital ? parseFloat(capital) : undefined,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao gerar plano");
      }

      setCanvas(data.canvas);
      setShowModal(true);
      toast.success("Plano de negócio gerado com sucesso!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao gerar plano");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (canvas) {
      navigator.clipboard.writeText(JSON.stringify(canvas, null, 2));
      toast.success("Canvas copiado para a área de transferência!");
    }
  };

  const downloadJSON = () => {
    if (canvas) {
      const blob = new Blob([JSON.stringify(canvas, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `business-canvas-${niche.replace(/\s+/g, "-")}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const sectionLabels: Record<keyof CanvasData, string> = {
    key_partners: "🤝 Parceiros-Chave",
    key_activities: "⚡ Atividades-Chave",
    key_resources: "🔧 Recursos-Chave",
    value_propositions: "💎 Proposta de Valor",
    customer_relationships: "❤️ Relacionamento",
    channels: "📢 Canais",
    customer_segments: "👥 Segmentos de Clientes",
    cost_structure: "💰 Estrutura de Custos",
    revenue_streams: "💵 Fontes de Receita",
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Briefcase className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Gerador de Plano de Negócio</h3>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="niche">Nicho de Mercado *</Label>
          <Input
            id="niche"
            placeholder="Ex: Moda feminina sustentável"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="capital">Capital Inicial (opcional)</Label>
          <Input
            id="capital"
            type="number"
            placeholder="Ex: 50000"
            value={capital}
            onChange={(e) => setCapital(e.target.value)}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Informe o valor em reais para sugestões mais personalizadas
          </p>
        </div>

        <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Gerando Canvas...
            </>
          ) : (
            "Gerar Business Model Canvas"
          )}
        </Button>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Business Model Canvas - {niche}
            </DialogTitle>
          </DialogHeader>

          <div className="flex gap-2 mb-4">
            <Button variant="outline" size="sm" onClick={copyToClipboard}>
              <Copy className="h-4 w-4 mr-2" />
              Copiar JSON
            </Button>
            <Button variant="outline" size="sm" onClick={downloadJSON}>
              <Download className="h-4 w-4 mr-2" />
              Baixar JSON
            </Button>
          </div>

          <ScrollArea className="h-[60vh]">
            {canvas && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {(Object.keys(sectionLabels) as Array<keyof CanvasData>).map((key) => (
                  <Card key={key} className="bg-muted/50">
                    <CardHeader className="py-2 px-3">
                      <CardTitle className="text-sm font-medium">
                        {sectionLabels[key]}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="py-2 px-3">
                      <ul className="text-xs space-y-1">
                        {canvas[key]?.map((item, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="text-primary">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};
