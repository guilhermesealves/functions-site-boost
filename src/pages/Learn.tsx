import { motion } from "framer-motion";
import { 
  Play, 
  BookOpen, 
  Lightbulb, 
  Rocket, 
  CheckCircle2, 
  Clock,
  ArrowRight,
  Globe,
  PenTool,
  TrendingUp,
  FileText,
  Palette
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const steps = [
  {
    number: "01",
    title: "Crie sua conta grátis",
    description: "Em segundos você já está dentro. Sem cartão de crédito, sem complicação.",
    icon: Rocket,
    color: "from-blue-500 to-cyan-500"
  },
  {
    number: "02", 
    title: "Descreva seu negócio",
    description: "Conte para a IA sobre sua empresa: o que faz, quem é seu público, seus objetivos. Quanto mais detalhes, melhor!",
    icon: FileText,
    color: "from-purple-500 to-pink-500"
  },
  {
    number: "03",
    title: "IA cria seu branding",
    description: "A Codia gera sua identidade visual: logo, cores, tom de voz. Tudo alinhado com seu negócio.",
    icon: Palette,
    color: "from-orange-500 to-amber-500"
  },
  {
    number: "04",
    title: "Seu site é gerado",
    description: "Em minutos, você tem um site completo, responsivo, otimizado para SEO e pronto para converter.",
    icon: Globe,
    color: "from-emerald-500 to-teal-500"
  },
  {
    number: "05",
    title: "Personalize e publique",
    description: "Ajuste textos, imagens e cores se quiser. Quando estiver satisfeito, publique com um clique!",
    icon: PenTool,
    color: "from-rose-500 to-red-500"
  },
  {
    number: "06",
    title: "Acompanhe e cresça",
    description: "Use o marketing IA para criar conteúdo, campanhas e escalar seu negócio automaticamente.",
    icon: TrendingUp,
    color: "from-violet-500 to-indigo-500"
  }
];

const features = [
  {
    icon: Globe,
    title: "Website IA",
    description: "Crie sites profissionais descrevendo o que você precisa. A IA entende e constrói para você."
  },
  {
    icon: PenTool,
    title: "Logo & Branding",
    description: "Gere logos únicas e toda identidade visual da sua marca em poucos cliques."
  },
  {
    icon: FileText,
    title: "Copywriter IA",
    description: "Textos persuasivos para bio, anúncios, landing pages - a IA escreve como um profissional."
  },
  {
    icon: TrendingUp,
    title: "Marketing IA",
    description: "Estratégias, calendários de conteúdo, campanhas - tudo pensado para seu público."
  }
];

const videos = [
  {
    title: "Primeiros passos na Codia",
    duration: "3:45",
    thumbnail: "🎬",
    description: "Aprenda a criar sua conta e navegar pela plataforma"
  },
  {
    title: "Criando seu primeiro site",
    duration: "8:20",
    thumbnail: "🌐",
    description: "Passo a passo para criar um site do zero com IA"
  },
  {
    title: "Gerando uma logo profissional",
    duration: "5:15",
    thumbnail: "🎨",
    description: "Como usar a IA para criar logos incríveis"
  },
  {
    title: "Marketing com IA",
    duration: "6:30",
    thumbnail: "📈",
    description: "Estratégias de marketing automatizadas"
  }
];

const Learn = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24">
        {/* Hero */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-orange-500/5 to-background" />
          <motion.div
            animate={{ opacity: [0.03, 0.08, 0.03] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 blur-[100px]"
          />

          <div className="container mx-auto px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6"
              >
                <BookOpen className="w-4 h-4 text-orange-400" />
                <span className="text-sm text-orange-400 font-medium">Central de Aprendizado</span>
              </motion.div>

              <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
                Aprenda a usar a{" "}
                <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                  Codia
                </span>
              </h1>

              <p className="text-xl text-white/60 mb-8">
                Tutoriais simples e diretos para você dominar todas as ferramentas e criar projetos incríveis.
              </p>

              <Button
                onClick={() => navigate("/auth")}
                size="lg"
                className="h-14 px-8 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-xl"
              >
                Começar Agora
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* How It Works - Timeline */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-4">
                Passo a Passo
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                Como a Codia funciona
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto">
                Do zero ao site publicado em minutos. Veja como é simples criar seu negócio digital.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex items-start gap-6 mb-12 last:mb-0"
                >
                  {/* Timeline line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-[39px] top-20 w-0.5 h-full bg-gradient-to-b from-white/10 to-transparent" />
                  )}

                  {/* Icon */}
                  <div className={`relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shrink-0 shadow-lg`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-bold text-orange-400">{step.number}</span>
                      <h3 className="text-xl font-bold text-white">{step.title}</h3>
                    </div>
                    <p className="text-white/60 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Overview */}
        <section className="py-20 bg-white/[0.01]">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                Ferramentas disponíveis
              </h2>
              <p className="text-white/50">Tudo que você precisa para criar e escalar seu negócio</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-orange-500/20 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-orange-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-white/50">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Tutorials */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-4">
                <Play className="w-4 h-4" />
                Vídeo Tutoriais
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                Aprenda assistindo
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {videos.map((video, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="aspect-video rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center mb-4 group-hover:border-orange-500/30 transition-colors relative overflow-hidden">
                    <span className="text-5xl">{video.thumbnail}</span>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center">
                        <Play className="w-6 h-6 text-white fill-white" />
                      </div>
                    </div>
                  </div>
                  <h3 className="font-medium text-white mb-1 group-hover:text-orange-400 transition-colors">{video.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-white/40">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{video.duration}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="py-20 bg-white/[0.01]">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <Lightbulb className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                  Dicas para melhores resultados
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Seja específico ao descrever seu negócio - quanto mais detalhes, melhor o resultado",
                  "Use referências visuais quando possível - mencione estilos que você gosta",
                  "Teste diferentes prompts - a IA aprende com cada interação",
                  "Revise e personalize - a IA cria a base, você adiciona seu toque pessoal",
                  "Exporte e integre - use o código gerado em qualquer plataforma",
                  "Acompanhe métricas - use os dados para otimizar conversões"
                ].map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    <span className="text-white/70">{tip}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent border border-orange-500/20"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                Pronto para começar?
              </h2>
              <p className="text-lg text-white/60 mb-8">
                Crie sua conta grátis e comece a construir seu negócio digital agora mesmo.
              </p>
              <Button
                onClick={() => navigate("/auth")}
                size="lg"
                className="h-14 px-10 text-lg font-bold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl shadow-xl shadow-orange-500/30"
              >
                Começar Grátis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Learn;
