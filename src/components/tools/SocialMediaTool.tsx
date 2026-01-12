import { useState } from "react";
import { Share2, Instagram, Facebook, MessageCircle, Copy, Sparkles, Loader2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface SocialMediaToolProps {
  onSendMessage?: (message: string) => void;
}

interface Post {
  id: string;
  platform: "instagram" | "facebook" | "whatsapp";
  content: string;
  hashtags: string[];
}

const SocialMediaTool = ({ onSendMessage }: SocialMediaToolProps) => {
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const platformIcons = {
    instagram: Instagram,
    facebook: Facebook,
    whatsapp: MessageCircle,
  };

  const platformColors = {
    instagram: "text-pink-400",
    facebook: "text-blue-400",
    whatsapp: "text-emerald-400",
  };

  const handleGenerate = () => {
    if (!topic) {
      toast.error("Descreva o tema do conteúdo");
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      setPosts([
        {
          id: "1",
          platform: "instagram",
          content: `✨ ${topic}\n\nDescubra como transformar sua rotina com nossas soluções exclusivas!\n\n🔥 Resultados comprovados\n💡 Método inovador\n🎯 Atendimento personalizado\n\nComente "QUERO" para saber mais! 👇`,
          hashtags: ["empreendedorismo", "sucesso", "negocios", "resultados"],
        },
        {
          id: "2",
          platform: "facebook",
          content: `🚀 ${topic}\n\nVocê sabia que pode alcançar resultados incríveis com as estratégias certas?\n\nConfira como nossos clientes estão transformando seus negócios e alcançando metas que pareciam impossíveis.\n\n➡️ Clique no link da bio para saber mais!`,
          hashtags: ["marketing", "business", "growth"],
        },
        {
          id: "3",
          platform: "whatsapp",
          content: `Olá! 👋\n\nTemos uma novidade especial sobre ${topic.toLowerCase()}!\n\nQuer saber como isso pode ajudar você? Responda com SIM e te conto tudo! 🎯`,
          hashtags: [],
        },
      ]);
      setIsGenerating(false);
      toast.success("Posts gerados!");
    }, 2000);
  };

  const copyPost = (post: Post) => {
    const text = post.content + (post.hashtags.length ? "\n\n" + post.hashtags.map(h => `#${h}`).join(" ") : "");
    navigator.clipboard.writeText(text);
    toast.success("Copiado!");
  };

  const handleGenerateCalendar = () => {
    if (onSendMessage) {
      onSendMessage(`Crie um calendário de conteúdo semanal para redes sociais sobre: ${topic}

Inclua:
- 7 dias de posts (segunda a domingo)
- Formato para cada rede (Instagram, Facebook, WhatsApp)
- Melhores horários para postar
- Hashtags relevantes
- Tipos de conteúdo variados (dicas, cases, bastidores, promoções)
- Sugestões de imagens/vídeos`);
    }
    toast.success("Gerando calendário...");
  };

  return (
    <div className="space-y-6">
      {/* Topic Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/70">Sobre o que quer postar?</label>
        <Textarea
          placeholder="Ex: Lançamento do novo serviço de consultoria, promoção de fim de ano..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="bg-white/[0.04] border-white/[0.08] text-white min-h-[80px]"
        />
      </div>

      {/* Platform Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/70">Plataformas</label>
        <div className="grid grid-cols-3 gap-3">
          {(["instagram", "facebook", "whatsapp"] as const).map((platform) => {
            const Icon = platformIcons[platform];
            return (
              <div
                key={platform}
                className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center"
              >
                <Icon className={`w-6 h-6 mx-auto mb-1 ${platformColors[platform]}`} />
                <p className="text-xs text-white/70 capitalize">{platform}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="flex-1 bg-primary hover:bg-primary/90"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Gerando...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Gerar Posts
            </>
          )}
        </Button>
        <Button
          onClick={handleGenerateCalendar}
          variant="outline"
          className="border-white/10"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Calendário
        </Button>
      </div>

      {/* Generated Posts */}
      {posts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-white">Posts Gerados</h3>
          
          <div className="space-y-3">
            {posts.map((post) => {
              const Icon = platformIcons[post.platform];
              return (
                <div
                  key={post.id}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-5 h-5 ${platformColors[post.platform]}`} />
                      <span className="text-sm font-medium text-white capitalize">
                        {post.platform}
                      </span>
                    </div>
                    <button
                      onClick={() => copyPost(post)}
                      className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <Copy className="w-4 h-4 text-white/50" />
                    </button>
                  </div>
                  
                  <p className="text-sm text-white/80 whitespace-pre-line mb-3">
                    {post.content}
                  </p>
                  
                  {post.hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {post.hashtags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs text-primary"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
        <p className="text-xs text-white/70">
          💡 <strong>Dica:</strong> Poste no Instagram entre 18h-21h, 
          Facebook entre 13h-16h, e WhatsApp entre 10h-12h para maior engajamento.
        </p>
      </div>
    </div>
  );
};

export default SocialMediaTool;
