import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Zap, Building2, ArrowRight, Shield, Clock, ChevronDown, ArrowLeft, Package, Coins, Gift, Rocket, Crown, Star, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

interface CreditPackage {
  id: string;
  name: string;
  slug: string;
  credits: number;
  price: number;
  price_per_credit: number;
  bonus: number | null;
  savings: number | null;
  badge: string | null;
  highlight: string | null;
  popular: boolean | null;
}

interface Bundle {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  categories: any;
  original_cost: number;
  bundle_cost: number;
  savings: number;
  market_value: number | null;
  badge: string | null;
  popular: boolean | null;
}

const plans = [
  {
    name: "Starter",
    icon: Sparkles,
    price: "0",
    period: "grátis para sempre",
    description: "Ideal para começar",
    features: [
      "5 créditos diários",
      "1 site ativo",
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
      "50 créditos diários",
      "Sites ilimitados",
      "Domínio personalizado",
      "Todos os templates premium",
      "IA ilimitada",
      "Analytics avançado",
      "Suporte prioritário 24/7",
      "Sem marca d'água",
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
      "Créditos ilimitados",
      "Tudo do Pro incluído",
      "API dedicada",
      "SLA 99.9% garantido",
      "Gerente de conta",
      "Integrações customizadas",
      "Treinamento da equipe",
      "White-label",
    ],
    cta: "Falar com Especialista",
    variant: "outline" as const,
  },
];

const faqs = [
  {
    question: "Como funciona o sistema de créditos?",
    answer: "Créditos são usados para gerar conteúdo com IA. Cada geração consome créditos baseado na complexidade. Usuários gratuitos recebem 5 créditos diários, que renovam automaticamente."
  },
  {
    question: "Posso cancelar a qualquer momento?",
    answer: "Sim! Não há contratos de fidelidade. Você pode cancelar seu plano Pro ou Enterprise a qualquer momento, sem multas ou taxas escondidas."
  },
  {
    question: "O que acontece com meus créditos comprados se eu cancelar?",
    answer: "Créditos comprados nunca expiram e continuam disponíveis mesmo após cancelar a assinatura."
  },
  {
    question: "Vocês oferecem desconto para pagamento anual?",
    answer: "Sim! No plano anual você economiza 2 meses. Em vez de R$1.164/ano, você paga apenas R$970/ano."
  },
  {
    question: "Como funciona o programa de indicação?",
    answer: "Indique amigos e ganhe 5 créditos para cada indicação que criar uma conta verificada. Seu amigo também ganha 15 créditos de bônus!"
  },
];

const Pricing = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [packages, setPackages] = useState<CreditPackage[]>([]);
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [loadingPackages, setLoadingPackages] = useState(true);

  useEffect(() => {
    loadPackagesAndBundles();
  }, []);

  const loadPackagesAndBundles = async () => {
    try {
      const [packagesRes, bundlesRes] = await Promise.all([
        supabase.from("credit_packages").select("*").eq("active", true).order("price", { ascending: true }),
        supabase.from("bundles").select("*").eq("active", true).order("bundle_cost", { ascending: true })
      ]);

      if (packagesRes.data) setPackages(packagesRes.data);
      if (bundlesRes.data) setBundles(bundlesRes.data);
    } catch (error) {
      console.error("Error loading packages:", error);
    } finally {
      setLoadingPackages(false);
    }
  };

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

        {/* Credit Packages Section */}
        <section className="py-16 border-t border-border">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-4">
                <Coins className="w-4 h-4" />
                <span className="text-sm font-medium">Pacotes de Créditos</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                Compre Créditos Avulsos
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Precisa de mais créditos? Compre pacotes avulsos que nunca expiram.
              </p>
            </motion.div>

            {loadingPackages ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-48 bg-card/50 border border-border rounded-xl animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                {packages.map((pkg, index) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className={`relative rounded-xl p-5 border transition-all hover:border-primary/30 ${
                      pkg.popular 
                        ? "bg-gradient-to-b from-primary/10 to-card border-primary/30" 
                        : "bg-card/50 border-border"
                    }`}
                  >
                    {pkg.badge && (
                      <div className="absolute -top-2 right-3 px-2 py-0.5 bg-primary text-primary-foreground text-[10px] font-medium rounded-full">
                        {pkg.badge}
                      </div>
                    )}

                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        pkg.popular ? "bg-primary/20" : "bg-secondary"
                      }`}>
                        <Coins className={`w-5 h-5 ${pkg.popular ? "text-primary" : "text-muted-foreground"}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-sm">{pkg.name}</h3>
                        <p className="text-xs text-muted-foreground">{pkg.credits} créditos</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-muted-foreground text-sm">R$</span>
                        <span className="text-2xl font-bold text-foreground">{pkg.price.toFixed(0)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        R${pkg.price_per_credit.toFixed(2)} por crédito
                      </p>
                      {pkg.bonus && pkg.bonus > 0 && (
                        <p className="text-xs text-primary mt-1">
                          +{pkg.bonus} créditos bônus!
                        </p>
                      )}
                    </div>

                    <Button 
                      onClick={() => navigate("/auth")}
                      size="sm"
                      className={`w-full ${
                        pkg.popular 
                          ? "bg-primary hover:bg-primary/90" 
                          : "bg-secondary hover:bg-secondary/80"
                      }`}
                    >
                      Comprar
                    </Button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Bundles Section */}
        {bundles.length > 0 && (
          <section className="py-16 border-t border-border bg-secondary/20">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-500 rounded-full mb-4">
                  <Package className="w-4 h-4" />
                  <span className="text-sm font-medium">Bundles Especiais</span>
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Pacotes Completos
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Economize com nossos bundles que combinam múltiplas ferramentas.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {bundles.map((bundle, index) => (
                  <motion.div
                    key={bundle.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative rounded-xl p-6 border transition-all hover:border-amber-500/30 ${
                      bundle.popular 
                        ? "bg-gradient-to-b from-amber-500/10 to-card border-amber-500/30" 
                        : "bg-card border-border"
                    }`}
                  >
                    {bundle.badge && (
                      <div className="absolute -top-2 right-4 px-3 py-1 bg-amber-500 text-black text-xs font-medium rounded-full">
                        {bundle.badge}
                      </div>
                    )}

                    <div className="mb-4">
                      <h3 className="font-semibold text-foreground text-lg mb-1">{bundle.name}</h3>
                      <p className="text-sm text-muted-foreground">{bundle.description}</p>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm text-muted-foreground line-through">R${bundle.original_cost}</span>
                        <span className="text-2xl font-bold text-foreground">R${bundle.bundle_cost}</span>
                      </div>
                      <p className="text-sm text-emerald-500 font-medium">
                        Economia de R${bundle.savings}
                      </p>
                    </div>

                    <Button 
                      onClick={() => navigate("/auth")}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-black"
                    >
                      Adquirir Bundle
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Features Comparison */}
        <section className="py-16 border-t border-border">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                Por que escolher a Codia?
              </h2>
              <p className="text-muted-foreground">Vantagens exclusivas para nossos usuários</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { icon: Rocket, title: "IA Avançada", desc: "Modelos de última geração para criações profissionais" },
                { icon: Crown, title: "Gamificação", desc: "Ganhe XP, suba de nível e desbloqueie conquistas" },
                { icon: Gift, title: "Bônus Diários", desc: "Créditos gratuitos renovados automaticamente" },
                { icon: Users, title: "Indicações", desc: "Ganhe créditos convidando amigos" },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="p-5 rounded-xl bg-card/50 border border-border hover:border-primary/30 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
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