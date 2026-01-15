import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Zap, Building2 } from "lucide-react";

const plans = [
  {
    name: "Starter",
    icon: Sparkles,
    price: "0",
    period: "grátis para sempre",
    description: "Ideal para experimentar e projetos pessoais",
    features: [
      "1 site ativo",
      "Subdomínio functions.app",
      "5 páginas por site",
      "Templates básicos",
      "Suporte por email",
    ],
    cta: "Começar Grátis",
    variant: "outline" as const,
  },
  {
    name: "Pro",
    icon: Zap,
    price: "49",
    period: "por mês",
    description: "Para profissionais e pequenas empresas",
    features: [
      "Sites ilimitados",
      "Domínio personalizado",
      "Páginas ilimitadas",
      "Todos os templates",
      "Analytics avançado",
      "Suporte prioritário 24/7",
      "Sem marca d'água",
      "Exportar código fonte",
    ],
    cta: "Assinar Pro",
    variant: "hero" as const,
    popular: true,
  },
  {
    name: "Enterprise",
    icon: Building2,
    price: "Sob consulta",
    period: "",
    description: "Para grandes empresas e agências",
    features: [
      "Tudo do Pro incluído",
      "API dedicada",
      "SLA 99.9% garantido",
      "Gerente de conta dedicado",
      "Integrações customizadas",
      "Treinamento da equipe",
      "White-label disponível",
      "Faturamento customizado",
    ],
    cta: "Falar com Vendas",
    variant: "outline" as const,
  },
];

const PricingSection = () => {
  return (
    <section id="precos" className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <motion.div
        animate={{ opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/10 blur-[150px]"
      />

      <div className="container mx-auto px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-4"
          >
            Preços Simples
          </motion.span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Escolha o plano{" "}
            <span className="text-gradient-orange">ideal para você</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comece grátis, sem cartão de crédito. Upgrade quando precisar.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={`relative rounded-2xl p-1 ${
                plan.popular
                  ? "bg-gradient-to-b from-primary via-primary/50 to-primary/20"
                  : "bg-border/50"
              }`}
            >
              {plan.popular && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/30 whitespace-nowrap"
                >
                  ⚡ Mais Popular
                </motion.div>
              )}

              <div className={`h-full rounded-xl p-8 ${
                plan.popular ? "bg-card" : "bg-card/80"
              }`}>
                {/* Plan Icon & Name */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    plan.popular 
                      ? "bg-gradient-orange shadow-lg shadow-primary/30" 
                      : "bg-secondary"
                  }`}>
                    <plan.icon className={`w-6 h-6 ${
                      plan.popular ? "text-primary-foreground" : "text-primary"
                    }`} />
                  </div>
                  <h3 className="font-display text-2xl font-bold">{plan.name}</h3>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    {plan.price !== "Sob consulta" && (
                      <span className="text-muted-foreground text-lg">R$</span>
                    )}
                    <span className="font-display text-5xl font-bold">
                      {plan.price === "Sob consulta" ? "" : plan.price}
                    </span>
                    {plan.price === "Sob consulta" && (
                      <span className="font-display text-2xl font-bold">{plan.price}</span>
                    )}
                  </div>
                  {plan.period && (
                    <span className="text-sm text-muted-foreground">{plan.period}</span>
                  )}
                </div>

                <p className="text-muted-foreground mb-6 min-h-[48px]">
                  {plan.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        plan.popular ? "bg-primary/20" : "bg-secondary"
                      }`}>
                        <Check className={`w-3 h-3 ${
                          plan.popular ? "text-primary" : "text-muted-foreground"
                        }`} />
                      </div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button 
                  variant={plan.variant}
                  className={`w-full h-12 text-base font-semibold ${
                    plan.popular ? "shadow-lg shadow-primary/30" : ""
                  }`}
                >
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-8 mt-16 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-primary" />
            <span>Cancele quando quiser</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-primary" />
            <span>Sem taxa de setup</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-primary" />
            <span>Suporte em português</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-primary" />
            <span>Garantia de 14 dias</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
