import { motion } from "framer-motion";
import { Calculator, FileText, PieChart, TrendingUp, Shield, Clock, Phone, Mail, CheckCircle, ArrowRight } from "lucide-react";

const ContadorComplete = () => {
  const services = [
    { title: "Contabilidade Empresarial", desc: "Gestão contábil completa para sua empresa", icon: Calculator },
    { title: "Declaração de IR", desc: "Imposto de renda pessoa física e jurídica", icon: FileText },
    { title: "Planejamento Tributário", desc: "Redução legal da carga tributária", icon: PieChart },
    { title: "Consultoria Financeira", desc: "Análise e orientação para seu negócio", icon: TrendingUp },
  ];

  const plans = [
    { name: "Básico", price: "R$ 299", features: ["MEI e Simples Nacional", "Emissão de NF", "Suporte por email", "Relatórios mensais"] },
    { name: "Profissional", price: "R$ 599", popular: true, features: ["Lucro Presumido", "Folha de pagamento", "Suporte prioritário", "Consultoria mensal", "Planejamento tributário"] },
    { name: "Empresarial", price: "R$ 999", features: ["Lucro Real", "Todos os serviços", "Contador dedicado", "Reuniões semanais", "Auditoria fiscal"] },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">ContaFácil</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">Início</a>
            <a href="#" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">Serviços</a>
            <a href="#" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">Planos</a>
            <a href="#" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">Contato</a>
          </nav>
          <button className="px-5 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors">
            Fale Conosco
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="min-h-screen flex items-center relative pt-20 bg-gradient-to-br from-emerald-50 to-white">
        <div className="absolute top-20 right-0 w-96 h-96 bg-emerald-200 rounded-full blur-[150px] opacity-50" />
        
        <div className="max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full mb-6">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span className="text-sm text-emerald-700 font-medium">Contabilidade Digital</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gray-900">
              Sua contabilidade{" "}
              <span className="text-emerald-600">simples e digital</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Soluções contábeis completas para empresas e profissionais. 
              Deixe a burocracia conosco e foque no crescimento do seu negócio.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-all flex items-center gap-2">
                Começar Agora
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all">
                Ver Planos
              </button>
            </div>

            <div className="flex items-center gap-6 mt-10">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span className="text-gray-600">100% Digital</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span className="text-gray-600">Suporte Especializado</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span className="text-gray-600">Preços Acessíveis</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="p-8 bg-white rounded-3xl shadow-2xl shadow-emerald-100/50 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-900">Simulador de Economia</h3>
                <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">Beta</span>
              </div>
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-sm text-gray-500 mb-1">Faturamento Mensal</div>
                  <div className="text-2xl font-bold text-gray-900">R$ 50.000,00</div>
                </div>
                <div className="p-4 bg-emerald-50 rounded-xl">
                  <div className="text-sm text-emerald-600 mb-1">Economia Potencial</div>
                  <div className="text-3xl font-bold text-emerald-600">R$ 2.450/mês</div>
                </div>
              </div>
              <button className="w-full py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors">
                Calcular Minha Economia
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-emerald-600 font-medium">Nossos Serviços</span>
            <h2 className="text-4xl font-bold mt-2 mb-4 text-gray-900">
              Soluções Completas
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Tudo que sua empresa precisa em um só lugar
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-all group cursor-pointer border border-transparent hover:border-emerald-200"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4 group-hover:bg-emerald-600 transition-colors">
                  <service.icon className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{service.title}</h3>
                <p className="text-gray-500 text-sm">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-emerald-600 font-medium">Planos</span>
            <h2 className="text-4xl font-bold mt-2 mb-4 text-gray-900">
              Escolha o Ideal para Você
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-8 rounded-3xl ${plan.popular ? 'bg-emerald-600 text-white' : 'bg-white border border-gray-200'}`}
              >
                {plan.popular && (
                  <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-medium rounded-full mb-4">
                    Mais Popular
                  </span>
                )}
                <h3 className={`text-xl font-semibold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.price}
                  </span>
                  <span className={plan.popular ? 'text-white/70' : 'text-gray-500'}>/mês</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckCircle className={`w-5 h-5 ${plan.popular ? 'text-white' : 'text-emerald-600'}`} />
                      <span className={plan.popular ? 'text-white/90' : 'text-gray-600'}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 font-medium rounded-lg transition-colors ${
                  plan.popular 
                    ? 'bg-white text-emerald-600 hover:bg-gray-100' 
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}>
                  Contratar Plano
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-emerald-600 rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Pronto para Começar?</h2>
            <p className="text-emerald-100 mb-8 max-w-xl mx-auto">
              Fale com nossos especialistas e descubra como podemos ajudar seu negócio
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <span>(11) 4444-5555</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <span>contato@contafacil.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>Seg-Sex 9h-18h</span>
              </div>
            </div>
            <button className="px-8 py-4 bg-white text-emerald-600 font-semibold rounded-lg hover:shadow-xl transition-all">
              Agendar Reunião
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-500 text-sm">
          © 2024 ContaFácil - Contabilidade Digital. Todos os direitos reservados. CRC/SP 2SP000000/O-0
        </div>
      </footer>
    </div>
  );
};

export default ContadorComplete;
