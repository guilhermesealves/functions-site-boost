import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Zap, Building2, ArrowRight, Shield, Clock, Users, Star, ChevronDown, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const plans = [
  {
    name: "Starter",
    icon: Sparkles,
    price: "0",
    period: "grátis para sempre",
    description: "Ideal para começar",
    features: [
      "1 site ativo",
      "Subdomínio codia.app",
      "5 páginas por site",
      "Templates básicos",
      "IA para textos (limitado)",
      "Suporte por email",
    ],
    cta: "Começar Grátis",
    variant: "outline" as const,
  },
  {
    name: "Pro",
    icon: Zap,
    price: "97",
    originalPrice: "197",
    period: "/mês",
    description: "Para escalar seu negócio",
    features: [
      "Sites ilimitados",
      "Domínio personalizado",
      "Páginas ilimitadas",
      "Todos os templates premium",
      "IA ilimitada",
      "Analytics avançado",
      "Suporte prioritário 24/7",
      "Sem marca d'água",
      "Exportar código fonte",
      "Integração WhatsApp",
    ],
    cta: "Começar Agora",
    variant: "hero" as const,
    popular: true,
  },
  {
    name: "Enterprise",
    icon: Building2,
    price: "Sob consulta",
    period: "",
    description: "Para grandes operações",
    features: [
      "Tudo do Pro incluído",
      "API dedicada",
      "SLA 99.9% garantido",
      "Gerente de conta",
      "Integrações customizadas",
      "Treinamento da equipe",
      "White-label",
      "Faturamento customizado",
    ],
    cta: "Falar com Especialista",
    variant: "outline" as const,
  },
];

const faqs = [
  {
    question: "Como funciona o período de teste?",
    answer: "Você pode começar gratuitamente no plano Starter sem precisar de cartão de crédito. Teste todas as funcionalidades básicas e faça upgrade quando estiver pronto."
  },
  {
    question: "Posso cancelar a qualquer momento?",
    answer: "Sim! Não há contratos de fidelidade. Você pode cancelar seu plano Pro ou Enterprise a qualquer momento, sem multas ou taxas escondidas."
  },
  {
    question: "O que acontece com meus sites se eu cancelar?",
    answer: "Seus sites continuam funcionando por 30 dias após o cancelamento. Você pode exportar todo seu código antes de encerrar."
  },
  {
    question: "Vocês oferecem desconto para pagamento anual?",
    answer: "Sim! No plano anual você economiza 2 meses. Em vez de R$1.164/ano, você paga apenas R$970/ano."
  },
];

const Pricing = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Back Button */}
      <div className="fixed top-20 left-4 z-50">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground bg-card/80 hover:bg-card backdrop-blur-sm border border-border rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar</span>
        </button>
      </div>
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

          <div className="container mx-auto px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Planos e Preços
              </h1>

              <p className="text-lg text-muted-foreground mb-8">
                Escolha o plano ideal para o seu negócio. Sem surpresas, sem taxas escondidas.
              </p>

              {/* Billing Toggle */}
              <div className="inline-flex items-center gap-3 p-1 bg-secondary/50 border border-border rounded-xl">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    billingCycle === "monthly"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Mensal
                </button>
                <button
                  onClick={() => setBillingCycle("annual")}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    billingCycle === "annual"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Anual
                  <span className="px-2 py-0.5 text-xs bg-primary/20 text-primary rounded-full">-17%</span>
                </button>
              </div>
            </motion.div>

            {/* Pricing Cards */}
            <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`relative rounded-2xl ${
                    plan.popular
                      ? "p-[1px] bg-gradient-to-b from-primary to-primary/30"
                      : "border border-border"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                      Mais Popular
                    </div>
                  )}

                  <div className={`h-full rounded-2xl p-6 ${
                    plan.popular ? "bg-card" : "bg-card/50"
                  }`}>
                    {/* Plan Header */}
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          plan.popular 
                            ? "bg-primary/20" 
                            : "bg-secondary"
                        }`}>
                          <plan.icon className={`w-5 h-5 ${plan.popular ? "text-primary" : "text-muted-foreground"}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{plan.name}</h3>
                          <p className="text-xs text-muted-foreground">{plan.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-6 pb-6 border-b border-border">
                      <div className="flex items-baseline gap-1">
                        {plan.price !== "Sob consulta" ? (
                          <>
                            {plan.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through mr-2">R${plan.originalPrice}</span>
                            )}
                            <span className="text-muted-foreground">R$</span>
                            <span className="text-4xl font-bold text-foreground">
                              {billingCycle === "annual" && plan.price !== "0" 
                                ? Math.round(parseInt(plan.price) * 0.83)
                                : plan.price}
                            </span>
                            <span className="text-muted-foreground text-sm">{plan.period}</span>
                          </>
                        ) : (
                          <span className="text-2xl font-semibold text-foreground">{plan.price}</span>
                        )}
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            plan.popular ? "bg-primary/20" : "bg-secondary"
                          }`}>
                            <Check className={`w-2.5 h-2.5 ${plan.popular ? "text-primary" : "text-muted-foreground"}`} />
                          </div>
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Button 
                      onClick={() => navigate("/auth")}
                      className={`w-full h-11 text-sm font-medium rounded-xl transition-all ${
                        plan.popular 
                          ? "bg-primary hover:bg-primary/90 text-primary-foreground" 
                          : "bg-secondary hover:bg-secondary/80 text-foreground border border-border"
                      }`}
                    >
                      {plan.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-8 mt-12"
            >
              {[
                { icon: Shield, text: "Garantia de 14 dias" },
                { icon: Clock, text: "Suporte 24/7" },
                { icon: Check, text: "Cancele quando quiser" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <item.icon className="w-4 h-4 text-primary" />
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 border-t border-border">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                Perguntas Frequentes
              </h2>
              <p className="text-muted-foreground">Tire suas dúvidas sobre nossos planos</p>
            </motion.div>

            <div className="max-w-2xl mx-auto space-y-3">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="border border-border rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/30 transition-colors"
                  >
                    <span className="font-medium text-foreground text-sm">{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`} />
                  </button>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 pb-4"
                    >
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 border-t border-border">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-xl mx-auto"
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Pronto para começar?
              </h2>
              <p className="text-muted-foreground mb-8">
                Junte-se a milhares de empresas que já estão usando a Codia.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button 
                  onClick={() => navigate("/auth")}
                  className="h-11 px-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
                >
                  Começar Grátis
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate("/auth")}
                  className="h-11 px-6 rounded-xl"
                >
                  Falar com Especialista
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
