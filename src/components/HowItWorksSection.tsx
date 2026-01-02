import { motion } from "framer-motion";
import { MessageSquare, Wand2, Globe2 } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Descreva sua ideia",
    description: "Conte para a Functions o que você precisa. Pode ser em português, do seu jeito.",
  },
  {
    icon: Wand2,
    step: "02",
    title: "A IA cria para você",
    description: "Nossa inteligência artificial transforma sua descrição em um site profissional.",
  },
  {
    icon: Globe2,
    step: "03",
    title: "Publique online",
    description: "Com um clique, seu site está no ar. Compartilhe com o mundo!",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="como-funciona" className="py-24 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-[120px]" />

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
            Como <span className="text-gradient-orange">funciona</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Em apenas 3 passos simples, você terá seu site no ar.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative text-center"
            >
              {/* Step Icon */}
              <div className="relative inline-flex mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-orange flex items-center justify-center glow-orange">
                  <step.icon className="w-10 h-10 text-primary-foreground" />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center text-sm font-bold text-primary">
                  {step.step}
                </span>
              </div>

              <h3 className="font-display text-2xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground max-w-xs mx-auto">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
