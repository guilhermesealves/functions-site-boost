import { motion } from 'framer-motion';
import { Brain, Heart, MessageCircle, Shield, Users, Sparkles, Phone, Mail, MapPin, Clock, CheckCircle, Star, Calendar, Video, User, Smile, Sun, Moon, Cloud } from 'lucide-react';

const PsicologoComplete = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const services = [
    {
      icon: Brain,
      title: 'Terapia Individual',
      description: 'Sessões personalizadas focadas em seu bem-estar emocional e desenvolvimento pessoal',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: Users,
      title: 'Terapia de Casal',
      description: 'Fortaleça relacionamentos com técnicas baseadas em evidências científicas',
      color: 'from-pink-500 to-purple-500'
    },
    {
      icon: Heart,
      title: 'Ansiedade & Depressão',
      description: 'Tratamento especializado para transtornos de humor e ansiedade',
      color: 'from-blue-500 to-purple-500'
    },
    {
      icon: Sparkles,
      title: 'Autoconhecimento',
      description: 'Jornada de descoberta pessoal e crescimento emocional sustentável',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: MessageCircle,
      title: 'Terapia Online',
      description: 'Atendimento remoto com a mesma qualidade e sigilo do presencial',
      color: 'from-violet-500 to-purple-500'
    },
    {
      icon: Shield,
      title: 'Trauma & EMDR',
      description: 'Técnicas avançadas para processamento e superação de traumas',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const approach = [
    {
      icon: Sun,
      title: 'Acolhimento',
      description: 'Ambiente seguro e livre de julgamentos para sua jornada'
    },
    {
      icon: Cloud,
      title: 'Escuta Ativa',
      description: 'Compreensão profunda das suas necessidades únicas'
    },
    {
      icon: Smile,
      title: 'Ferramentas Práticas',
      description: 'Estratégias aplicáveis ao seu dia a dia'
    },
    {
      icon: Moon,
      title: 'Sigilo Absoluto',
      description: 'Confidencialidade garantida em todas as sessões'
    }
  ];

  const testimonials = [
    {
      name: 'Ana Carolina',
      role: 'Paciente há 1 ano',
      content: 'Encontrei não apenas uma profissional excepcional, mas uma pessoa que realmente se importa. Minha vida mudou completamente.',
      rating: 5,
      avatar: '💜'
    },
    {
      name: 'Roberto Mendes',
      role: 'Terapia de Casal',
      content: 'Salvou nosso relacionamento. As técnicas e a empatia fizeram toda a diferença. Recomendo de coração!',
      rating: 5,
      avatar: '💙'
    },
    {
      name: 'Juliana Costa',
      role: 'Ansiedade',
      content: 'Aprendi a lidar com minha ansiedade de forma saudável. Finalmente tenho controle sobre minha vida novamente.',
      rating: 5,
      avatar: '🌸'
    }
  ];

  const faqs = [
    {
      q: 'Como funciona a primeira sessão?',
      a: 'A primeira sessão é um momento de acolhimento onde conversaremos sobre suas necessidades, expectativas e construiremos juntos um plano terapêutico personalizado.'
    },
    {
      q: 'Quanto tempo dura o tratamento?',
      a: 'Cada pessoa é única. Alguns casos podem ser resolvidos em poucos meses, outros requerem acompanhamento mais longo. Você sempre terá autonomia nas suas escolhas.'
    },
    {
      q: 'As sessões online são eficazes?',
      a: 'Sim! Estudos comprovam que a terapia online tem a mesma eficácia que o atendimento presencial, oferecendo mais comodidade e flexibilidade.'
    },
    {
      q: 'Vocês atendem plano de saúde?',
      a: 'Sim, trabalhamos com os principais convênios. Entre em contato para verificar se atendemos o seu plano específico.'
    }
  ];

  const stats = [
    { number: '15+', label: 'Anos de Experiência' },
    { number: '2000+', label: 'Vidas Transformadas' },
    { number: '98%', label: 'Satisfação' },
    { number: '24h', label: 'Resposta' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-indigo-50 text-gray-900 overflow-hidden">
      {/* Hero Section */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-20 right-20 w-96 h-96 bg-purple-400 rounded-full filter blur-[120px] opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-400 rounded-full filter blur-[120px] opacity-20"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-16 items-center">
          <motion.div variants={fadeInUp}>
            <motion.div 
              className="inline-flex items-center gap-2 bg-purple-100 border border-purple-200 rounded-full px-4 py-2 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold text-purple-700">
                CRP 06/12345 - Psicóloga Clínica
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-gray-900">
              Um Espaço Seguro Para
              <span className="block bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Sua Transformação
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Terapia humanizada e baseada em evidências para ajudá-lo a superar desafios, encontrar equilíbrio emocional e viver com mais leveza.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-bold text-lg shadow-xl shadow-purple-500/30 flex items-center gap-2"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(147, 51, 234, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Calendar className="w-5 h-5" />
                Agendar Consulta
              </motion.button>
              
              <motion.button
                className="px-8 py-4 border-2 border-purple-300 text-purple-700 rounded-full font-bold text-lg hover:bg-purple-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Video className="w-5 h-5 inline mr-2" />
                Conhecer Online
              </motion.button>
            </div>

            <div className="grid grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="relative"
          >
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-3xl opacity-20 blur-2xl"
              animate={{
                opacity: [0.15, 0.3, 0.15],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <div className="relative aspect-[3/4] bg-gradient-to-br from-purple-100 to-indigo-100 rounded-3xl overflow-hidden shadow-2xl border border-purple-200">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Brain className="w-32 h-32 text-purple-400 mx-auto mb-6" />
                  </motion.div>
                  <div className="space-y-4">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                      <p className="text-sm font-medium text-gray-700">
                        "Sua mente merece cuidado e atenção"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Approach Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Minha <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Abordagem</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trabalho com Terapia Cognitivo-Comportamental (TCC) e técnicas humanizadas
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {approach.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <item.icon className="w-10 h-10 text-purple-600" />
                </motion.div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 px-6 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Como Posso <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Ajudar</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Especialidades desenvolvidas ao longo de anos de prática clínica
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-100"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Vidas <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Transformadas</span>
            </h2>
            <p className="text-xl text-gray-600">
              Depoimentos reais de quem encontrou o caminho para o bem-estar
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-3xl border border-purple-200"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Dúvidas <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Frequentes</span>
            </h2>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-purple-100"
              >
                <h3 className="text-lg font-bold mb-3 text-gray-900">{faq.q}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIi8+PC9nPjwvc3ZnPg==')] " />
        </div>

        <motion.div
          className="relative z-10 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block mb-6"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart className="w-20 h-20 mx-auto" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Dê o Primeiro Passo Para Uma Vida Mais Leve
          </h2>

          <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
            Agende sua primeira sessão e descubra como a terapia pode transformar sua vida
          </p>

          <motion.button
            className="px-12 py-6 bg-white text-purple-700 rounded-full font-bold text-xl shadow-2xl inline-flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Calendar className="w-6 h-6" />
            Agendar Primeira Sessão
          </motion.button>

          <p className="mt-6 text-sm opacity-75">
            Primeira consulta com desconto especial • Atendimento presencial e online
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-8 h-8 text-purple-400" />
                <span className="text-xl font-bold">Dra. Ana <span className="text-purple-400">Silva</span></span>
              </div>
              <p className="text-gray-400 mb-4">
                Psicóloga Clínica CRP 06/12345
              </p>
              <p className="text-gray-400 text-sm">
                Especialista em TCC, EMDR e Terapia Humanizada
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Horários</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-400" />
                  Seg - Sex: 08h às 20h
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-400" />
                  Sábados: 09h às 14h
                </li>
                <li className="text-purple-400 font-semibold mt-4">
                  Atendimento Online Disponível
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Especialidades</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>• Ansiedade e Depressão</li>
                <li>• Terapia de Casal</li>
                <li>• Autoconhecimento</li>
                <li>• Trauma e EMDR</li>
                <li>• Síndrome do Pânico</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Contato</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-purple-400 mt-0.5" />
                  <span>Av. Paulista, 1000<br/>Conjunto 805</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-purple-400" />
                  (11) 98888-8888
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-purple-400" />
                  contato@psicologa.com
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>&copy; 2026 Dra. Ana Silva - Psicologia. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PsicologoComplete;
