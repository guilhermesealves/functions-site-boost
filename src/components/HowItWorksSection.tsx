import { motion } from "framer-motion";
import { 
  Globe, 
  Palette, 
  PenTool, 
  TrendingUp, 
  Rocket,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    icon: Globe,
    number: "01",
    title: "Criar o Site",
    description: "Comece com um site profissional e impactante criado por IA em segundos.",
    color: "text-orange-400",
    gradient: "from-orange-500 to-amber-500"
  },
  {
    icon: Palette,
    number: "02",
    title: "Definir a Marca",
    description: "Crie identidade de marca, tom de voz e posicionamento único no mercado.",
    color: "text-violet-400",
    gradient: "from-violet-500 to-purple-500"
  },
  {
    icon: PenTool,
    number: "03",
    title: "Identidade Visual",
    description: "Logo profissional, cores e elementos visuais que marcam sua empresa.",
    color: "text-pink-400",
    gradient: "from-pink-500 to-rose-500"
  },
  {
    icon: TrendingUp,
    number: "04",
    title: "Conteúdo & Marketing",
    description: "Textos que vendem, posts para redes sociais e estratégias de crescimento.",
    color: "text-blue-400",
    gradient: "from-blue-500 to-indigo-500"
  },
  {
    icon: Rocket,
    number: "05",
    title: "Vender & Escalar",
    description: "Scripts de venda, automações comerciais e ferramentas para crescer.",
    color: "text-emerald-400",
    gradient: "from-emerald-500 to-teal-500"
  },
];

const HowItWorksSection = () => {
  const navigate = useNavigate();

  return (
    <section id="como-funciona" className="py-24 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-violet-500/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Jornada Completa</span>
          </motion.div>
          
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Crie sua empresa em{" "}
            <span className="text-gradient-orange">5 etapas</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Do primeiro site à primeira venda. Tudo com IAs especializadas que trabalham para você.
          </p>
        </motion.div>

        {/* Steps - Timeline Style */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical connecting line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-violet-500/50 to-emerald-500/50 hidden md:block" />
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-violet-500/50 to-emerald-500/50 md:hidden" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex items-start gap-6 mb-12 last:mb-0 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Step number indicator */}
              <div className="absolute left-8 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full bg-background border-2 border-primary z-10 hidden md:flex items-center justify-center">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.gradient}`} />
              </div>
              
              {/* Mobile indicator */}
              <div className="absolute left-8 w-4 h-4 -translate-x-1/2 rounded-full bg-background border-2 border-primary z-10 md:hidden flex items-center justify-center">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.gradient}`} />
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block md:w-1/2" />

              {/* Content Card */}
              <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-card/80 to-card/40 border border-border/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                      <step.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-mono ${step.color}`}>PASSO {step.number}</span>
                      </div>
                      <h3 className="font-display text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <Button 
            onClick={() => navigate("/builder")}
            className="bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-lg shadow-primary/30 gap-2"
          >
            Começar Agora
            <ArrowRight className="w-5 h-5" />
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Grátis para começar. Sem cartão de crédito.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
