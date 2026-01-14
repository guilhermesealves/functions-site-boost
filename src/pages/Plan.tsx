import { motion } from "framer-motion";
import { Check, Zap, Crown, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const plans = [
  {
    name: "Free",
    price: "R$ 0",
    period: "/mês",
    description: "Para começar sua jornada",
    icon: Zap,
    features: [
      "5 créditos iniciais",
      "Website simples",
      "Branding básico",
      "IA Assistente limitada",
      "Suporte por email",
    ],
    buttonText: "Plano Atual",
    current: true,
    popular: false,
  },
  {
    name: "Pro",
    price: "R$ 99",
    period: "/mês",
    description: "Para empreendedores sérios",
    icon: Crown,
    features: [
      "Créditos ilimitados básicos",
      "Todas ferramentas de CRIAÇÃO",
      "Ferramentas de VENDAS e MARKETING",
      "IA Assistente completa",
      "Suporte prioritário",
      "Analytics avançado",
    ],
    buttonText: "Assinar Pro",
    current: false,
    popular: true,
  },
  {
    name: "Business",
    price: "R$ 299",
    period: "/mês",
    description: "Para escalar seu negócio",
    icon: Building2,
    features: [
      "Tudo do Pro",
      "Hub Marketplace",
      "Growth Engine completo",
      "Analytics premium",
      "Gerente IA dedicado",
      "Customizações premium",
      "API Access",
    ],
    buttonText: "Assinar Business",
    current: false,
    popular: false,
  },
];

const Plan = () => {
  const handleSubscribe = (planName: string) => {
    toast.success(`Redirecionando para pagamento do plano ${planName}...`);
  };

  return (
    <div className="min-h-screen bg-background p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-4">
            Escolha seu <span className="text-primary">Plano</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Desbloqueie todo o potencial da Codia e acelere o crescimento do seu negócio
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-6 rounded-2xl border-2 transition-colors ${
                plan.popular
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  Mais Popular
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2.5 rounded-xl ${plan.popular ? "bg-primary/20" : "bg-muted"}`}>
                  <plan.icon className={`w-5 h-5 ${plan.popular ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
              </div>

              <div className="mb-4">
                <span className="text-4xl font-extrabold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>

              <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => !plan.current && handleSubscribe(plan.name)}
                className={`w-full ${
                  plan.current
                    ? "bg-muted text-muted-foreground cursor-default"
                    : plan.popular
                      ? "bg-primary hover:bg-primary/90"
                      : "bg-secondary hover:bg-secondary/80 text-foreground"
                }`}
                disabled={plan.current}
              >
                {plan.buttonText}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            Tem dúvidas? Entre em contato com nosso{" "}
            <button className="text-primary hover:underline">suporte</button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Plan;
