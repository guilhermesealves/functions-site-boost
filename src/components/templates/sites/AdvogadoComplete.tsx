import { motion } from "framer-motion";
import { Scale, Shield, Award, Users, Phone, Mail, MapPin, ArrowRight, CheckCircle } from "lucide-react";

const AdvogadoComplete = () => {
  const services = [
    { title: "Direito Civil", desc: "Contratos, família, sucessões e responsabilidade civil", icon: Scale },
    { title: "Direito Trabalhista", desc: "Defesa de trabalhadores e empresas em questões laborais", icon: Users },
    { title: "Direito Empresarial", desc: "Consultoria e contencioso para empresas", icon: Shield },
    { title: "Direito Imobiliário", desc: "Compra, venda, locação e regularização de imóveis", icon: Award },
  ];

  const stats = [
    { number: "500+", label: "Casos de Sucesso" },
    { number: "15", label: "Anos de Experiência" },
    { number: "98%", label: "Satisfação" },
    { number: "24h", label: "Resposta Rápida" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg">Silva & Associados</span>
              <div className="text-xs text-amber-500">Advocacia</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Início</a>
            <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Áreas de Atuação</a>
            <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Sobre</a>
            <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Contato</a>
          </nav>
          <button className="px-5 py-2.5 bg-amber-500 text-black text-sm font-semibold rounded-lg hover:bg-amber-400 transition-colors">
            Consulta Gratuita
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="min-h-screen flex items-center relative pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[150px]" />
        
        <div className="max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6">
              <Shield className="w-4 h-4 text-amber-500" />
              <span className="text-sm text-amber-500 font-medium">Advocacia de Excelência</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Defendemos seus{" "}
              <span className="text-amber-500">direitos</span>{" "}
              com excelência
            </h1>
            
            <p className="text-lg text-white/60 mb-8 leading-relaxed">
              Mais de 15 anos de experiência em advocacia, oferecendo soluções jurídicas 
              personalizadas para pessoas físicas e empresas.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 transition-all flex items-center gap-2">
                Agendar Consulta
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 border border-white/20 text-white font-medium rounded-lg hover:bg-white/5 transition-all">
                Falar no WhatsApp
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="p-6 bg-white/5 border border-white/10 rounded-2xl text-center"
                >
                  <div className="text-3xl font-bold text-amber-500 mb-1">{stat.number}</div>
                  <div className="text-sm text-white/50">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-amber-500 font-medium">Áreas de Atuação</span>
            <h2 className="text-4xl font-bold mt-2 mb-4">
              Especialidades Jurídicas
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Atuamos em diversas áreas do direito com foco em resultados
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-amber-500/30 transition-all group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:bg-amber-500/20 transition-colors">
                  <service.icon className="w-7 h-7 text-amber-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-white/50">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-amber-500 font-medium">Por Que Nos Escolher</span>
              <h2 className="text-4xl font-bold mt-2 mb-6">
                Compromisso com a justiça e com você
              </h2>
              <div className="space-y-4">
                {[
                  "Atendimento personalizado e humanizado",
                  "Equipe altamente qualificada e atualizada",
                  "Transparência em todas as etapas do processo",
                  "Resultados comprovados em casos complexos",
                  "Primeira consulta gratuita e sem compromisso",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span className="text-white/70">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 rounded-3xl"
            >
              <h3 className="text-2xl font-bold mb-4">Consulta Gratuita</h3>
              <p className="text-white/60 mb-6">
                Agende uma conversa sem compromisso para analisarmos seu caso
              </p>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Seu nome"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-amber-500 outline-none transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Seu telefone"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-amber-500 outline-none transition-colors"
                />
                <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-amber-500 outline-none transition-colors text-white/50">
                  <option>Selecione a área</option>
                  <option>Direito Civil</option>
                  <option>Direito Trabalhista</option>
                  <option>Direito Empresarial</option>
                  <option>Direito Imobiliário</option>
                </select>
                <button className="w-full py-4 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 transition-colors">
                  Solicitar Consulta
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-14 h-14 rounded-xl bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="font-semibold mb-2">Telefone</h3>
              <p className="text-white/50">(11) 3333-4444</p>
            </div>
            <div className="p-6">
              <div className="w-14 h-14 rounded-xl bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-white/50">contato@silvaadvocacia.com</p>
            </div>
            <div className="p-6">
              <div className="w-14 h-14 rounded-xl bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="font-semibold mb-2">Endereço</h3>
              <p className="text-white/50">Av. Paulista, 1000 - São Paulo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 text-center text-white/40 text-sm">
          © 2024 Silva & Associados Advocacia. Todos os direitos reservados. OAB/SP 123.456
        </div>
      </footer>
    </div>
  );
};

export default AdvogadoComplete;
