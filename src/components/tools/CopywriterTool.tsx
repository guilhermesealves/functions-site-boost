import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Loader2, Copy, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";

const contentTypes = [
  { value: "blog", label: "📝 Artigo de Blog" },
  { value: "email", label: "📧 Email Marketing" },
  { value: "sobre-nos", label: "🏢 Sobre Nós" },
  { value: "politica-privacidade", label: "🔒 Política de Privacidade" },
  { value: "termos-uso", label: "📋 Termos de Uso" },
  { value: "descricao-produto", label: "🛍️ Descrição de Produto" },
  { value: "anuncio", label: "📢 Texto para Anúncio" },
];

const toneOptions = [
  { value: "profissional", label: "Profissional" },
  { value: "amigavel", label: "Amigável" },
  { value: "formal", label: "Formal" },
  { value: "descontraido", label: "Descontraído" },
  { value: "persuasivo", label: "Persuasivo" },
  { value: "informativo", label: "Informativo" },
];

export const CopywriterTool = () => {
  const [contentType, setContentType] = useState("");
  const [topic, setTopic] = useState("");
  const [brandName, setBrandName] = useState("");
  const [tone, setTone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleGenerate = async () => {
    if (!contentType) {
      toast.error("Selecione o tipo de conteúdo");
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
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/copywriter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            contentType,
            topic: topic.trim() || undefined,
            brandName: brandName.trim() || undefined,
            tone: tone || undefined,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao gerar conteúdo");
      }

      setGeneratedContent(data.content);
      setShowModal(true);
      toast.success("Conteúdo gerado com sucesso!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao gerar conteúdo");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    toast.success("Conteúdo copiado para a área de transferência!");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Gerador de Textos</h3>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="contentType">Tipo de Conteúdo *</Label>
          <Select value={contentType} onValueChange={setContentType}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              {contentTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="topic">Tema/Assunto (opcional)</Label>
          <Input
            id="topic"
            placeholder="Ex: Lançamento de nova coleção"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="brandName">Nome da Marca (opcional)</Label>
          <Input
            id="brandName"
            placeholder="Será usado da identidade verbal se não preenchido"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="tone">Tom de Voz (opcional)</Label>
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger>
              <SelectValue placeholder="Usar tom da identidade verbal" />
            </SelectTrigger>
            <SelectContent>
              {toneOptions.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Gerando Conteúdo...
            </>
          ) : (
            "Gerar Texto"
          )}
        </Button>

        <p className="text-xs text-muted-foreground">
          Se você já gerou uma identidade verbal, o tom de voz será usado automaticamente
        </p>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-3xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Conteúdo Gerado
            </DialogTitle>
          </DialogHeader>

          <div className="flex gap-2 mb-4">
            <Button variant="outline" size="sm" onClick={copyToClipboard}>
              <Copy className="h-4 w-4 mr-2" />
              Copiar Texto
            </Button>
          </div>

          <ScrollArea className="h-[60vh]">
            <Card>
              <CardContent className="p-4 prose prose-sm max-w-none dark:prose-invert">
                <ReactMarkdown>{generatedContent}</ReactMarkdown>
              </CardContent>
            </Card>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};
