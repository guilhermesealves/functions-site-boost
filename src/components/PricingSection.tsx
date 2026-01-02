import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Gratuito",
    price: "R$ 0",
    period: "/mês",
    description: "Perfeito para começar",
    features: [
      "1 site ativo",
      "Subdomínio functions.app",
      "5 páginas por site",
      "Suporte por email",
    ],
    cta: "Começar Grátis",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "R$ 49",
    period: "/mês",
    description: "Para profissionais e negócios",
    features: [
      "Sites ilimitados",
      "Domínio personalizado",
      "Páginas ilimitadas",
      "Suporte prioritário",
      "Analytics avançado",
      "Sem marca d'água",
    ],
    cta: "Assinar Pro",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Sob consulta",
    period: "",
    description: "Para grandes empresas",
    features: [
      "Tudo do Pro",
      "API dedicada",
      "SLA garantido",
      "Gerente de conta",
      "Integrações customizadas",
      "Treinamento da equipe",
    ],
    cta: "Falar com Vendas",
    highlighted: false,
  },
];

const PricingSection = () => {
  return (
    <section id="precos" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Planos para cada{" "}
            <span className="text-gradient-orange">necessidade</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comece grátis e evolua conforme seu negócio cresce.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 ${
                plan.highlighted
                  ? "bg-gradient-orange glow-orange-intense scale-105"
                  : "bg-card border border-border"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-background text-primary text-sm font-semibold">
                  Mais Popular
                </div>
              )}

              <h3 className={`font-display text-2xl font-bold mb-2 ${
                plan.highlighted ? "text-primary-foreground" : ""
              }`}>
                {plan.name}
              </h3>
              
              <div className={`mb-4 ${plan.highlighted ? "text-primary-foreground" : ""}`}>
                <span className="font-display text-4xl font-bold">{plan.price}</span>
                <span className="text-sm opacity-80">{plan.period}</span>
              </div>

              <p className={`mb-6 ${
                plan.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"
              }`}>
                {plan.description}
              </p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className={`flex items-center gap-2 ${
                    plan.highlighted ? "text-primary-foreground" : ""
                  }`}>
                    <Check className={`w-5 h-5 ${
                      plan.highlighted ? "text-primary-foreground" : "text-primary"
                    }`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={plan.highlighted ? "secondary" : "hero"}
                className="w-full"
                size="lg"
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
