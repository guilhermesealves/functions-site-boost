import { motion } from "framer-motion";
import { 
  Briefcase, 
  ShoppingBag, 
  Utensils, 
  Heart, 
  GraduationCap, 
  Building2,
  Sparkles,
  ArrowRight,
  Globe,
  Palette,
  Dumbbell,
  Car,
  Home,
  Camera,
  Scale,
  Stethoscope,
  Plane,
  Music
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const categories = [
  {
    name: "E-commerce",
    icon: ShoppingBag,
    color: "from-blue-500 to-cyan-500",
    examples: [
      { name: "Loja de Roupas", description: "Moda feminina, masculina ou infantil" },
      { name: "Cosméticos", description: "Beleza, skincare, maquiagem" },
      { name: "Acessórios", description: "Joias, bolsas, óculos" },
      { name: "Eletrônicos", description: "Gadgets, tech, informática" },
    ]
  },
  {
    name: "Restaurantes & Food",
    icon: Utensils,
    color: "from-orange-500 to-amber-500",
    examples: [
      { name: "Restaurante Fine Dining", description: "Cardápio elegante, reservas" },
      { name: "Delivery de Comida", description: "Pedidos online, cardápio digital" },
      { name: "Cafeteria", description: "Ambiente aconchegante, menu" },
      { name: "Food Truck", description: "Localização, menu criativo" },
    ]
  },
  {
    name: "Saúde & Bem-estar",
    icon: Heart,
    color: "from-rose-500 to-pink-500",
    examples: [
      { name: "Clínica Médica", description: "Agendamento, especialidades" },
      { name: "Academia", description: "Planos, modalidades, horários" },
      { name: "Spa & Estética", description: "Tratamentos, agendamento" },
      { name: "Nutricionista", description: "Consultas, programas" },
    ]
  },
  {
    name: "Educação",
    icon: GraduationCap,
    color: "from-purple-500 to-violet-500",
    examples: [
      { name: "Curso Online", description: "Aulas, módulos, inscrição" },
      { name: "Escola de Idiomas", description: "Níveis, metodologia" },
      { name: "Coaching", description: "Mentoria, programas" },
      { name: "Escola Infantil", description: "Proposta pedagógica" },
    ]
  },
  {
    name: "Serviços Profissionais",
    icon: Briefcase,
    color: "from-emerald-500 to-teal-500",
    examples: [
      { name: "Escritório de Advocacia", description: "Áreas de atuação, contato" },
      { name: "Contabilidade", description: "Serviços, clientes" },
      { name: "Consultoria", description: "Especialidades, cases" },
      { name: "Arquitetura", description: "Portfólio, projetos" },
    ]
  },
  {
    name: "Imobiliário",
    icon: Building2,
    color: "from-amber-500 to-yellow-500",
    examples: [
      { name: "Imobiliária", description: "Listagem, busca, contato" },
      { name: "Construtora", description: "Empreendimentos, lançamentos" },
      { name: "Corretora", description: "Portfólio, avaliação" },
      { name: "Aluguel por Temporada", description: "Reservas, fotos" },
    ]
  }
];

const quickIdeas = [
  { icon: Dumbbell, name: "Personal Trainer", desc: "Treinos personalizados" },
  { icon: Camera, name: "Fotógrafo", desc: "Portfólio visual" },
  { icon: Car, name: "Oficina Mecânica", desc: "Serviços, orçamento" },
  { icon: Home, name: "Decoração", desc: "Projetos, inspirações" },
  { icon: Scale, name: "Nutricionista", desc: "Planos alimentares" },
  { icon: Stethoscope, name: "Médico", desc: "Especialidades, agenda" },
  { icon: Plane, name: "Agência de Viagens", desc: "Pacotes, destinos" },
  { icon: Music, name: "Escola de Música", desc: "Instrumentos, aulas" },
];

const Discover = () => {
  const navigate = useNavigate();

  const handleCreateSite = (type: string) => {
    navigate("/builder", { state: { prompt: `Crie um site para ${type}`, tool: "website" } });
  };

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
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span className="text-sm text-orange-400 font-medium">Inspiração & Ideias</span>
              </motion.div>

              <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
                Descubra o site{" "}
                <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                  perfeito
                </span>{" "}
                para seu negócio
              </h1>

              <p className="text-xl text-white/60 mb-8">
                Explore ideias por categoria e comece com um template otimizado para seu segmento.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Quick Ideas */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {quickIdeas.map((idea, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleCreateSite(idea.name)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-orange-500/30 hover:bg-orange-500/5 transition-all group"
                >
                  <idea.icon className="w-4 h-4 text-white/40 group-hover:text-orange-400 transition-colors" />
                  <span className="text-sm text-white/70 group-hover:text-white transition-colors">{idea.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="space-y-16">
              {categories.map((category, catIndex) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: catIndex * 0.1 }}
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}>
                      <category.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{category.name}</h2>
                      <p className="text-white/50">{category.examples.length} templates disponíveis</p>
                    </div>
                  </div>

                  {/* Examples Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {category.examples.map((example, exIndex) => (
                      <motion.div
                        key={example.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: exIndex * 0.05 }}
                        className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-orange-500/30 transition-all cursor-pointer"
                        onClick={() => handleCreateSite(example.name)}
                      >
                        {/* Preview placeholder */}
                        <div className="aspect-[4/3] rounded-xl bg-white/[0.03] border border-white/[0.04] mb-4 overflow-hidden relative">
                          <div className="absolute inset-2 bg-[hsl(0,0%,8%)] rounded-lg">
                            <div className="h-2 bg-white/[0.03] flex items-center gap-0.5 px-1.5">
                              <div className="w-1 h-1 rounded-full bg-red-400/50" />
                              <div className="w-1 h-1 rounded-full bg-yellow-400/50" />
                              <div className="w-1 h-1 rounded-full bg-green-400/50" />
                            </div>
                            <div className="p-2 space-y-1">
                              <div className="h-1 bg-orange-500/30 rounded w-1/3" />
                              <div className="h-0.5 bg-white/[0.06] rounded w-full" />
                              <div className="h-0.5 bg-white/[0.04] rounded w-2/3" />
                            </div>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                            <span className="px-4 py-2 rounded-full bg-orange-500 text-white text-sm font-medium flex items-center gap-2">
                              <Globe className="w-4 h-4" />
                              Criar este site
                            </span>
                          </div>
                        </div>

                        <h3 className="font-medium text-white mb-1 group-hover:text-orange-400 transition-colors">
                          {example.name}
                        </h3>
                        <p className="text-sm text-white/40">{example.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
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
              <Palette className="w-16 h-16 text-orange-400 mx-auto mb-6" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                Não encontrou seu segmento?
              </h2>
              <p className="text-lg text-white/60 mb-8">
                Descreva seu negócio e a IA cria um site sob medida para você.
              </p>
              <Button
                onClick={() => navigate("/builder")}
                size="lg"
                className="h-14 px-10 text-lg font-bold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl shadow-xl shadow-orange-500/30"
              >
                Criar Site Personalizado
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

export default Discover;
