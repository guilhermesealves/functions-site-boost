import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  bannerLayout: string;
}

export const WebsiteThemeTool = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig | null>(null);

  const handleRegenerate = async () => {
    setIsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Você precisa estar logado");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/regenerate-theme`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({}),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao regenerar tema");
      }

      setCurrentTheme(data.themeConfig);
      toast.success("Tema atualizado com sucesso!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao regenerar tema");
    } finally {
      setIsLoading(false);
    }
  };

  const layoutLabels: Record<string, string> = {
    centered: "Centralizado",
    "left-aligned": "Alinhado à Esquerda",
    "right-aligned": "Alinhado à Direita",
    split: "Dividido",
    overlay: "Sobreposição",
    minimal: "Minimalista",
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <RefreshCw className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Regenerador de Tema</h3>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Gere um novo visual aleatório para o seu site mantendo todos os seus produtos e conteúdos intactos.
        </p>

        <Button onClick={handleRegenerate} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Regenerando Tema...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Regenerar Tema do Site
            </>
          )}
        </Button>

        {currentTheme && (
          <Card className="border-green-500/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="font-medium text-sm">Novo Tema Aplicado</span>
              </div>

              {/* Color Preview */}
              <div className="flex gap-2 mb-3">
                <div
                  className="w-8 h-8 rounded-full shadow-md"
                  style={{ backgroundColor: currentTheme.primaryColor }}
                  title="Cor Primária"
                />
                <div
                  className="w-8 h-8 rounded-full shadow-md"
                  style={{ backgroundColor: currentTheme.secondaryColor }}
                  title="Cor Secundária"
                />
                <div
                  className="w-8 h-8 rounded-full shadow-md"
                  style={{ backgroundColor: currentTheme.accentColor }}
                  title="Cor de Destaque"
                />
              </div>

              <div className="text-xs space-y-1 text-muted-foreground">
                <p>
                  <span className="font-medium">Fonte:</span> {currentTheme.fontFamily}
                </p>
                <p>
                  <span className="font-medium">Layout do Banner:</span>{" "}
                  {layoutLabels[currentTheme.bannerLayout] || currentTheme.bannerLayout}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="bg-muted/50 p-3 rounded-lg">
          <h4 className="text-sm font-medium mb-2">💡 O que será alterado:</h4>
          <ul className="text-xs space-y-1 text-muted-foreground">
            <li>• Paleta de cores (primária, secundária, destaque)</li>
            <li>• Fonte do site</li>
            <li>• Layout do banner principal</li>
          </ul>
        </div>

        <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/30">
          <h4 className="text-sm font-medium mb-2 text-green-600">✅ O que será mantido:</h4>
          <ul className="text-xs space-y-1 text-muted-foreground">
            <li>• Todos os seus produtos</li>
            <li>• Textos e conteúdos</li>
            <li>• Páginas criadas</li>
            <li>• Configurações de pagamento</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
