import { useState } from "react";
import { Share2, Instagram, Facebook, MessageCircle, Copy, Sparkles, Loader2, Calendar, Hash, Clock, TrendingUp, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

interface SocialMediaToolProps {
  onSendMessage?: (message: string) => void;
}

interface Post {
  id: string;
  platform: "instagram" | "facebook" | "whatsapp";
  content: string;
  hashtags: string[];
  scheduledFor?: string;
}

interface CalendarDay {
  day: string;
  posts: number;
  platform: string;
}

const SocialMediaTool = ({ onSendMessage }: SocialMediaToolProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [generatedCount, setGeneratedCount] = useState(0);

  const platformIcons = {
    instagram: Instagram,
    facebook: Facebook,
    whatsapp: MessageCircle,
  };

  const platformColors = {
    instagram: "#E4405F",
    facebook: "#1877F2",
    whatsapp: "#25D366",
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
          scheduledFor: "Hoje, 18:00",
        },
        {
          id: "2",
          platform: "facebook",
          content: `🚀 ${topic}\n\nVocê sabia que pode alcançar resultados incríveis com as estratégias certas?\n\nConfira como nossos clientes estão transformando seus negócios e alcançando metas que pareciam impossíveis.\n\n➡️ Clique no link da bio para saber mais!`,
          hashtags: ["marketing", "business", "growth"],
          scheduledFor: "Amanhã, 14:00",
        },
        {
          id: "3",
          platform: "whatsapp",
          content: `Olá! 👋\n\nTemos uma novidade especial sobre ${topic.toLowerCase()}!\n\nQuer saber como isso pode ajudar você? Responda com SIM e te conto tudo! 🎯`,
          hashtags: [],
          scheduledFor: "Amanhã, 10:00",
        },
      ]);
      setGeneratedCount(prev => prev + 3);
      setIsGenerating(false);
      setActiveTab("content");
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

  const calendarData: CalendarDay[] = [
    { day: "Seg", posts: 2, platform: "instagram" },
    { day: "Ter", posts: 1, platform: "facebook" },
    { day: "Qua", posts: 3, platform: "whatsapp" },
    { day: "Qui", posts: 2, platform: "instagram" },
    { day: "Sex", posts: 2, platform: "facebook" },
    { day: "Sáb", posts: 1, platform: "instagram" },
    { day: "Dom", posts: 0, platform: "" },
  ];

  const platformStats = [
    { name: "Instagram", value: 45, color: "#E4405F" },
    { name: "Facebook", value: 30, color: "#1877F2" },
    { name: "WhatsApp", value: 25, color: "#25D366" },
  ];

  const engagementData = [
    { week: "Sem 1", engajamento: 120 },
    { week: "Sem 2", engajamento: 180 },
    { week: "Sem 3", engajamento: 250 },
    { week: "Sem 4", engajamento: 320 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-white/[0.06]">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
          <Share2 className="w-5 h-5 text-pink-400" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Gerador de Conteúdo</h2>
          <p className="text-xs text-white/50">Redes sociais e planejamento</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-4 bg-white/[0.02] border border-white/[0.06] p-1 rounded-xl">
          <TabsTrigger value="overview" className="text-xs data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-400 rounded-lg">
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="platform" className="text-xs data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-400 rounded-lg">
            Plataforma
          </TabsTrigger>
          <TabsTrigger value="content" className="text-xs data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-400 rounded-lg">
            Conteúdo
          </TabsTrigger>
          <TabsTrigger value="planning" className="text-xs data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-400 rounded-lg">
            Planejamento
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-pink-500/10 to-pink-500/5 border border-pink-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-pink-400" />
                <span className="text-xs text-pink-400">Gerados</span>
              </div>
              <p className="text-2xl font-bold text-white">{generatedCount}</p>
              <p className="text-xs text-white/40 mt-1">posts</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-blue-400">Agendados</span>
              </div>
              <p className="text-2xl font-bold text-white">{posts.length}</p>
              <p className="text-xs text-white/40 mt-1">essa semana</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-emerald-400">Consistência</span>
              </div>
              <p className="text-2xl font-bold text-white">85%</p>
              <p className="text-xs text-white/40 mt-1">score</p>
            </div>
          </div>

          {/* Engagement Chart */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h4 className="text-sm font-semibold text-white mb-4">Evolução do Engajamento</h4>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="week" stroke="rgba(255,255,255,0.3)" fontSize={11} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      color: "white",
                    }}
                  />
                  <Line type="monotone" dataKey="engajamento" stroke="#ec4899" strokeWidth={2} dot={{ fill: "#ec4899" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Platform Distribution */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h4 className="text-sm font-semibold text-white mb-4">Distribuição por Plataforma</h4>
            <div className="flex items-center gap-6">
              <div className="w-32 h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={platformStats}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={50}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {platformStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-2">
                {platformStats.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-white/70">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-white">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="platform" className="mt-6 space-y-4">
          <div className="space-y-3">
            <label className="text-sm font-medium text-white/70">Sobre o que quer postar?</label>
            <Textarea
              placeholder="Ex: Lançamento do novo serviço, promoção de fim de ano..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="bg-white/[0.04] border-white/[0.08] text-white min-h-[100px]"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-white/70">Plataformas</label>
            <div className="grid grid-cols-3 gap-4">
              {(["instagram", "facebook", "whatsapp"] as const).map((platform) => {
                const Icon = platformIcons[platform];
                return (
                  <motion.div
                    key={platform}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center cursor-pointer hover:border-white/20 transition-colors"
                  >
                    <div
                      className="w-12 h-12 rounded-xl mx-auto mb-2 flex items-center justify-center"
                      style={{ backgroundColor: `${platformColors[platform]}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: platformColors[platform] }} />
                    </div>
                    <p className="text-sm text-white capitalize">{platform}</p>
                    <p className="text-xs text-white/40">
                      {platform === "instagram" ? "18h-21h" : platform === "facebook" ? "13h-16h" : "10h-12h"}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !topic}
              className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90"
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
              disabled={!topic}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Calendário
            </Button>
          </div>

          <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
            <p className="text-xs text-white/70">
              💡 <strong>Dica:</strong> Poste no Instagram entre 18h-21h, 
              Facebook entre 13h-16h, e WhatsApp entre 10h-12h.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="content" className="mt-6 space-y-4">
          <AnimatePresence>
            {posts.length > 0 ? (
              posts.map((post, index) => {
                const Icon = platformIcons[post.platform];
                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${platformColors[post.platform]}20` }}
                        >
                          <Icon className="w-4 h-4" style={{ color: platformColors[post.platform] }} />
                        </div>
                        <span className="text-sm font-medium text-white capitalize">
                          {post.platform}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {post.scheduledFor && (
                          <span className="text-xs text-white/40 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.scheduledFor}
                          </span>
                        )}
                        <button
                          onClick={() => copyPost(post)}
                          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <Copy className="w-4 h-4 text-white/50" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-black/20 rounded-lg mb-3">
                      <p className="text-sm text-white/80 whitespace-pre-line">
                        {post.content}
                      </p>
                    </div>
                    
                    {post.hashtags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {post.hashtags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs rounded-full bg-pink-500/20 text-pink-400"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })
            ) : (
              <div className="text-center py-12 text-white/40">
                <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Gere posts na aba "Plataforma"</p>
              </div>
            )}
          </AnimatePresence>
        </TabsContent>

        <TabsContent value="planning" className="mt-6 space-y-4">
          {/* Calendar View */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h4 className="text-sm font-semibold text-white mb-4">Calendário Visual</h4>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={calendarData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" fontSize={11} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      color: "white",
                    }}
                  />
                  <Bar dataKey="posts" fill="#ec4899" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weekly Schedule */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h4 className="text-sm font-semibold text-white mb-4">Agenda Semanal</h4>
            <div className="grid grid-cols-7 gap-2">
              {calendarData.map((day) => (
                <div
                  key={day.day}
                  className={`p-3 rounded-lg text-center ${
                    day.posts > 0 ? "bg-pink-500/20 border border-pink-500/30" : "bg-white/[0.03] border border-white/[0.06]"
                  }`}
                >
                  <p className="text-xs text-white/60 mb-1">{day.day}</p>
                  <p className="text-lg font-bold text-white">{day.posts}</p>
                  <p className="text-[10px] text-white/40">posts</p>
                </div>
              ))}
            </div>
          </div>

          {/* Consistency Indicator */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-white">Consistência de Conteúdo</h4>
              <span className="text-lg font-bold text-pink-400">85%</span>
            </div>
            <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                style={{ width: "85%" }}
              />
            </div>
            <p className="text-xs text-white/40 mt-2">
              Você está postando consistentemente! Continue assim.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SocialMediaTool;
