import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface BrandVoice {
  archetype: {
    name: string;
    description: string;
  };
  tone_of_voice: {
    style: string;
    characteristics: string[];
    do: string[];
    dont: string[];
  };
  mission: string;
  vision: string;
  values: string[];
  personality_traits: string[];
  chatbot_system_prompt: string;
}

export const BrandingTool = () => {
  const [brandName, setBrandName] = useState("");
  const [niche, setNiche] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [brandVoice, setBrandVoice] = useState<BrandVoice | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleGenerate = async () => {
    if (!brandName.trim()) {
      toast.error("Informe o nome da marca");
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
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/branding`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            brandName: brandName.trim(),
            niche: niche.trim() || undefined,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao gerar branding");
      }

      setBrandVoice(data.brandVoice);
      setShowModal(true);
      toast.success("Identidade verbal gerada e salva!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao gerar branding");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Gerador de Identidade Verbal</h3>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="brandName">Nome da Marca *</Label>
          <Input
            id="brandName"
            placeholder="Ex: Bella Moda"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="niche">Nicho (opcional)</Label>
          <Input
            id="niche"
            placeholder="Ex: Moda feminina"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
          />
        </div>

        <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Gerando Identidade...
            </>
          ) : (
            "Gerar Identidade Verbal"
          )}
        </Button>

        <p className="text-xs text-muted-foreground">
          A identidade será salva e usada como base para o chatbot de vendas
        </p>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-3xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Identidade Verbal - {brandName}
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="h-[60vh]">
            {brandVoice && (
              <div className="space-y-4">
                {/* Archetype */}
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">🎭 Arquétipo da Marca</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2">
                    <p className="font-semibold text-primary">{brandVoice.archetype?.name}</p>
                    <p className="text-sm text-muted-foreground">{brandVoice.archetype?.description}</p>
                  </CardContent>
                </Card>

                {/* Mission & Vision */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">🎯 Missão</CardTitle>
                    </CardHeader>
                    <CardContent className="py-2">
                      <p className="text-sm">{brandVoice.mission}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">🔭 Visão</CardTitle>
                    </CardHeader>
                    <CardContent className="py-2">
                      <p className="text-sm">{brandVoice.vision}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Values */}
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">💎 Valores</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2">
                    <div className="flex flex-wrap gap-2">
                      {brandVoice.values?.map((value, i) => (
                        <Badge key={i} variant="secondary">{value}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Tone of Voice */}
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">🗣️ Tom de Voz: {brandVoice.tone_of_voice?.style}</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 space-y-3">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Características:</p>
                      <div className="flex flex-wrap gap-1">
                        {brandVoice.tone_of_voice?.characteristics?.map((c, i) => (
                          <Badge key={i} variant="outline" className="text-xs">{c}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs font-medium text-green-600 mb-1">✅ Fazer:</p>
                        <ul className="text-xs space-y-1">
                          {brandVoice.tone_of_voice?.do?.map((item, i) => (
                            <li key={i}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-red-600 mb-1">❌ Evitar:</p>
                        <ul className="text-xs space-y-1">
                          {brandVoice.tone_of_voice?.dont?.map((item, i) => (
                            <li key={i}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Personality */}
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">✨ Personalidade</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2">
                    <div className="flex flex-wrap gap-2">
                      {brandVoice.personality_traits?.map((trait, i) => (
                        <Badge key={i}>{trait}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Chatbot Prompt */}
                <Card className="border-primary/50">
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">🤖 Prompt do Chatbot (Salvo automaticamente)</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2">
                    <p className="text-xs bg-muted p-3 rounded-md font-mono whitespace-pre-wrap">
                      {brandVoice.chatbot_system_prompt}
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};
