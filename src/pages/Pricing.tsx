import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Zap, Building2, ArrowRight, Shield, Clock, Users, Star, ChevronDown, ArrowLeft, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const plans = [
  {
    name: "Starter",
    icon: Sparkles,
    price: "0",
    period: "grátis para sempre",
    description: "Perfeito para testar e criar seu primeiro projeto",
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
    gradient: "from-slate-500/20 to-slate-600/10",
  },
  {
    name: "Pro",
    icon: Zap,
    price: "97",
    originalPrice: "197",
    period: "por mês",
    description: "Tudo que você precisa para escalar seu negócio",
    features: [
      "Sites ilimitados",
      "Domínio personalizado",
      "Páginas ilimitadas",
      "Todos os templates premium",
      "IA ilimitada para tudo",
      "Analytics avançado",
      "Suporte prioritário 24/7",
      "Sem marca d'água",
      "Exportar código fonte",
      "Integração com WhatsApp",
    ],
    cta: "Garantir Minha Vaga",
    variant: "hero" as const,
    popular: true,
    gradient: "from-orange-500 to-amber-500",
    savings: "Economize R$100/mês",
  },
  {
    name: "Enterprise",
    icon: Building2,
    price: "Sob medida",
    period: "",
    description: "Para agências e grandes operações",
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
    cta: "Falar com Especialista",
    variant: "outline" as const,
    gradient: "from-violet-500/20 to-purple-600/10",
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
    answer: "Sim! No plano anual você economiza 2 meses. Em vez de R$1.164/ano, você paga apenas R$970/ano (equivalente a R$80,83/mês)."
  },
  {
    question: "A IA realmente cria sites profissionais?",
    answer: "Absolutamente! Nossa IA foi treinada com milhares de sites premiados e segue as melhores práticas de design e conversão. Você terá um site de qualidade profissional em minutos."
  },
];

const testimonials = [
  {
    name: "Carlos Silva",
    role: "CEO, TechStart",
    content: "Em 3 meses com a Codia, triplicamos nossa geração de leads. O site ficou incrível e a IA realmente entende de marketing.",
    avatar: "C",
    rating: 5
  },
  {
    name: "Ana Beatriz",
    role: "Fundadora, Bella Cosméticos",
    content: "Nunca imaginei que poderia ter um e-commerce tão bonito sem saber programar. A Codia revolucionou meu negócio.",
    avatar: "A",
    rating: 5
  },
  {
    name: "Roberto Mendes",
    role: "Diretor, Agência Digital",
    content: "Usamos a Codia para entregar 10x mais projetos no mesmo tempo. Nossos clientes adoram os resultados.",
    avatar: "R",
    rating: 5
  },
];

const Pricing = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Free Trial Banner */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-primary via-orange-500 to-amber-500 text-white py-2.5"
      >
        <div className="container mx-auto px-4 flex items-center justify-center gap-3 text-sm">
          <Gift className="w-4 h-4" />
          <span className="font-medium">Teste grátis por 7 dias</span>
          <span className="hidden sm:inline text-white/80">• Sem cartão de crédito • Cancele quando quiser</span>
          <Button
            onClick={() => navigate("/auth")}
            size="sm"
            className="ml-4 bg-white text-primary hover:bg-white/90 text-xs h-7 px-3"
          >
            Começar grátis
          </Button>
        </div>
      </motion.div>

      {/* Back Button */}
      <div className="fixed top-14 left-4 z-50 pt-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-3 py-2 text-sm text-white/70 hover:text-white bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar</span>
        </button>
      </div>
      
      <main className="pt-36">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-orange-500/5 to-background" />
          <motion.div
            animate={{ opacity: [0.05, 0.1, 0.05], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 blur-[120px]"
          />

          <div className="container mx-auto px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              {/* Urgency Badge */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 mb-8"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span className="text-sm text-red-400 font-medium">Oferta por tempo limitado - 50% OFF no Pro</span>
              </motion.div>

              <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                Invista no seu{" "}
                <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                  sucesso digital
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                Milhares de empresas já estão usando a Codia para criar sites que <br className="hidden md:block" />
                <span className="text-white font-medium">vendem mais e convertem melhor.</span>
              </p>

              {/* Social Proof */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground mb-12">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-orange-400" />
                  <span><strong className="text-white">12.000+</strong> empresas ativas</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                  <span><strong className="text-white">4.9/5</strong> de satisfação</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-orange-400" />
                  <span>Garantia de <strong className="text-white">14 dias</strong></span>
                </div>
              </div>

              {/* Billing Toggle */}
              <div className="inline-flex items-center gap-3 p-1.5 bg-white/[0.03] border border-white/[0.08] rounded-xl mb-12">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    billingCycle === "monthly"
                      ? "bg-white/[0.1] text-white"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  Mensal
                </button>
                <button
                  onClick={() => setBillingCycle("annual")}
                  className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    billingCycle === "annual"
                      ? "bg-white/[0.1] text-white"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  Anual
                  <span className="px-2 py-0.5 text-xs bg-green-500/20 text-green-400 rounded-full">-17%</span>
                </button>
              </div>
            </motion.div>

            {/* Pricing Cards */}
            <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className={`relative rounded-3xl ${
                    plan.popular
                      ? "p-[2px] bg-gradient-to-b from-orange-400 via-orange-500/50 to-orange-600/20"
                      : "p-[1px] bg-white/[0.08]"
                  }`}
                >
                  {plan.popular && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-bold shadow-xl shadow-orange-500/30 whitespace-nowrap flex items-center gap-2"
                    >
                      <Zap className="w-4 h-4" />
                      Mais Popular
                    </motion.div>
                  )}

                  {plan.savings && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8, rotate: -12 }}
                      animate={{ opacity: 1, scale: 1, rotate: -12 }}
                      transition={{ delay: 0.6 }}
                      className="absolute -top-2 -right-2 px-3 py-1 rounded-lg bg-green-500 text-white text-xs font-bold shadow-lg"
                    >
                      {plan.savings}
                    </motion.div>
                  )}

                  <div className={`h-full rounded-3xl p-8 ${
                    plan.popular ? "bg-[hsl(0,0%,6%)]" : "bg-[hsl(0,0%,5%)]"
                  }`}>
                    {/* Plan Icon & Name */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${plan.gradient} ${
                        plan.popular ? "shadow-xl shadow-orange-500/20" : ""
                      }`}>
                        <plan.icon className={`w-7 h-7 ${plan.popular ? "text-white" : "text-orange-400"}`} />
                      </div>
                      <div>
                        <h3 className="font-display text-2xl font-bold text-white">{plan.name}</h3>
                        <p className="text-sm text-white/40">{plan.description}</p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-6 pb-6 border-b border-white/[0.06]">
                      <div className="flex items-baseline gap-2">
                        {plan.price !== "Sob medida" && (
                          <>
                            {plan.originalPrice && (
                              <span className="text-lg text-white/30 line-through">R${plan.originalPrice}</span>
                            )}
                            <span className="text-white/50 text-xl">R$</span>
                            <span className="font-display text-6xl font-bold text-white">
                              {billingCycle === "annual" && plan.price !== "0" 
                                ? Math.round(parseInt(plan.price) * 0.83)
                                : plan.price}
                            </span>
                          </>
                        )}
                        {plan.price === "Sob medida" && (
                          <span className="font-display text-3xl font-bold text-white">{plan.price}</span>
                        )}
                      </div>
                      {plan.period && (
                        <span className="text-sm text-white/40">{plan.period}</span>
                      )}
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            plan.popular ? "bg-orange-500/20" : "bg-white/[0.06]"
                          }`}>
                            <Check className={`w-3 h-3 ${plan.popular ? "text-orange-400" : "text-white/60"}`} />
                          </div>
                          <span className="text-sm text-white/70">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Button 
                      onClick={() => navigate("/auth")}
                      className={`w-full h-14 text-base font-bold rounded-xl transition-all ${
                        plan.popular 
                          ? "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-xl shadow-orange-500/30" 
                          : "bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/[0.08]"
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-8 mt-16"
            >
              {[
                { icon: Shield, text: "Garantia de 14 dias" },
                { icon: Clock, text: "Suporte 24/7" },
                { icon: Check, text: "Cancele quando quiser" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-white/50">
                  <item.icon className="w-4 h-4 text-orange-400" />
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white/[0.01]">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                O que nossos clientes dizem
              </h2>
              <p className="text-white/50">Mais de 12.000 empresas confiam na Codia</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-orange-400 fill-orange-400" />
                    ))}
                  </div>
                  <p className="text-white/70 mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{testimonial.name}</p>
                      <p className="text-white/40 text-xs">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-4">
                Como Funciona
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                Do zero ao site pronto em 3 passos
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { step: "01", title: "Descreva seu negócio", desc: "Conte para a IA sobre sua empresa, público e objetivos. Seja detalhista!" },
                { step: "02", title: "IA cria tudo para você", desc: "Logo, textos, estrutura do site - tudo é gerado automaticamente em minutos." },
                { step: "03", title: "Publique e venda", desc: "Seu site está no ar! Acompanhe métricas e comece a converter visitantes." },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-orange-400">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/50">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-white/[0.01]">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                Perguntas Frequentes
              </h2>
            </motion.div>

            <div className="max-w-2xl mx-auto space-y-3">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-xl border border-white/[0.06] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="font-medium text-white">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-white/40 transition-transform ${openFaq === index ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-5 pb-5"
                    >
                      <p className="text-white/60 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent border border-orange-500/20"
            >
              <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
                Pronto para transformar seu negócio?
              </h2>
              <p className="text-xl text-white/60 mb-8">
                Junte-se a milhares de empreendedores que já estão criando sites incríveis com a Codia.
              </p>
              <Button
                onClick={() => navigate("/auth")}
                size="lg"
                className="h-14 px-10 text-lg font-bold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl shadow-xl shadow-orange-500/30"
              >
                Começar Agora - É Grátis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <p className="text-sm text-white/40 mt-4">Sem cartão de crédito. Comece em segundos.</p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
