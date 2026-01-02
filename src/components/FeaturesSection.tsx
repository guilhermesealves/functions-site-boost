import { motion } from "framer-motion";
import { Zap, Palette, Globe, Shield, Code, Rocket } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Ultra Rápido",
    description: "Crie um site completo em menos de 5 minutos. Nossa IA trabalha na velocidade dos seus pensamentos.",
  },
  {
    icon: Palette,
    title: "Design Profissional",
    description: "Templates modernos e personalizáveis. Cada site é único e feito sob medida para você.",
  },
  {
    icon: Globe,
    title: "100% em Português",
    description: "Desenvolvido por brasileiros, para brasileiros. Suporte completo em português.",
  },
  {
    icon: Shield,
    title: "Seguro & Confiável",
    description: "Seus dados estão protegidos. Infraestrutura robusta com backups automáticos.",
  },
  {
    icon: Code,
    title: "Sem Código",
    description: "Não precisa saber programar. A IA cuida de toda a parte técnica para você.",
  },
  {
    icon: Rocket,
    title: "SEO Otimizado",
    description: "Sites otimizados para aparecer no Google. Aumente sua visibilidade online.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="recursos" className="py-24 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-dark" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Por que escolher a{" "}
            <span className="text-gradient-orange">Functions</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Recursos poderosos que tornam a criação de sites simples e acessível para todos.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
