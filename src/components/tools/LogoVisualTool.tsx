import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Image, Loader2, Download, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
}

const logoStyles = [
  { value: "minimalista", label: "Minimalista" },
  { value: "moderno", label: "Moderno" },
  { value: "vintage", label: "Vintage/Retrô" },
  { value: "elegante", label: "Elegante/Luxo" },
  { value: "divertido", label: "Divertido/Playful" },
  { value: "corporativo", label: "Corporativo" },
  { value: "artesanal", label: "Artesanal" },
  { value: "tecnologico", label: "Tecnológico" },
];

export const LogoVisualTool = () => {
  const [brandName, setBrandName] = useState("");
  const [style, setStyle] = useState("");
  const [niche, setNiche] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    logoUrl: string;
    colorPalette: ThemeConfig;
  } | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleGenerate = async () => {
    if (!brandName.trim() || !style) {
      toast.error("Preencha o nome da marca e escolha um estilo");
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
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/logo-visual`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            brandName: brandName.trim(),
            style,
            niche: niche.trim() || undefined,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao gerar logo");
      }

      setResult({
        logoUrl: data.logoUrl,
        colorPalette: data.colorPalette,
      });
      setShowModal(true);
      toast.success("Logo e paleta de cores gerados!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao gerar logo");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadLogo = () => {
    if (result?.logoUrl) {
      const a = document.createElement("a");
      a.href = result.logoUrl;
      a.download = `logo-${brandName.replace(/\s+/g, "-")}.png`;
      a.target = "_blank";
      a.click();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Image className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Gerador de Logo & Visual</h3>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="brandName">Nome da Marca *</Label>
          <Input
            id="brandName"
            placeholder="Ex: Tech Solutions"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="style">Estilo do Logo *</Label>
          <Select value={style} onValueChange={setStyle}>
            <SelectTrigger>
              <SelectValue placeholder="Escolha um estilo" />
            </SelectTrigger>
            <SelectContent>
              {logoStyles.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="niche">Nicho (opcional)</Label>
          <Input
            id="niche"
            placeholder="Ex: Tecnologia, Moda, Alimentação"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
          />
        </div>

        <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Gerando Logo e Paleta...
            </>
          ) : (
            "Gerar Logo com DALL-E 3"
          )}
        </Button>

        <p className="text-xs text-muted-foreground">
          O logo será salvo no Storage e as cores aplicadas ao seu site automaticamente
        </p>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Logo & Paleta de Cores - {brandName}
            </DialogTitle>
          </DialogHeader>

          {result && (
            <div className="space-y-4">
              {/* Logo Preview */}
              <Card>
                <CardContent className="p-4 flex flex-col items-center gap-4">
                  <img
                    src={result.logoUrl}
                    alt={`Logo ${brandName}`}
                    className="max-w-[300px] max-h-[300px] object-contain rounded-lg shadow-lg"
                  />
                  <Button onClick={downloadLogo} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Baixar Logo
                  </Button>
                </CardContent>
              </Card>

              {/* Color Palette */}
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-3">🎨 Paleta de Cores (aplicada ao site)</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {Object.entries(result.colorPalette).map(([name, color]) => (
                      <div key={name} className="text-center">
                        <div
                          className="w-full h-16 rounded-lg shadow-md mb-2"
                          style={{ backgroundColor: color }}
                        />
                        <p className="text-xs font-mono">{color}</p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {name.replace(/([A-Z])/g, " $1").trim()}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <p className="text-xs text-muted-foreground text-center">
                ✅ Logo salvo no Storage • ✅ Cores aplicadas ao theme_config
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
