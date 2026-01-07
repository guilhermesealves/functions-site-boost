import { motion } from 'framer-motion';
import { Dumbbell, Flame, Heart, Target, Users, Award, Clock, MapPin, Mail, Phone, Instagram, Facebook, Youtube, ChevronRight, CheckCircle, Star, TrendingUp, Zap } from 'lucide-react';

const AcademiaComplete = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const services = [
    {
      icon: Dumbbell,
      title: 'Musculação',
      description: 'Equipamentos de última geração e treinos personalizados para máximos resultados',
      color: 'from-red-500 to-orange-500'
    },
    {
      icon: Heart,
      title: 'Cardio Intenso',
      description: 'Aulas dinâmicas de cardio para queimar calorias e melhorar condicionamento',
      color: 'from-pink-500 to-red-500'
    },
    {
      icon: Users,
      title: 'Aulas Coletivas',
      description: 'Treinos em grupo motivadores com instrutores qualificados',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Target,
      title: 'Personal Trainer',
      description: 'Acompanhamento individual para alcançar suas metas específicas',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Zap,
      title: 'HIIT & Funcional',
      description: 'Treinos de alta intensidade para transformação corporal acelerada',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: TrendingUp,
      title: 'Avaliação Física',
      description: 'Análise completa com bioimpedância e acompanhamento de evolução',
      color: 'from-red-500 to-pink-500'
    }
  ];

  const plans = [
    {
      name: 'Basic',
      price: '89,90',
      features: ['Acesso à musculação', '2 aulas coletivas/semana', 'Treino personalizado', 'App de treinos', 'Vestiário com armários'],
      popular: false
    },
    {
      name: 'Premium',
      price: '149,90',
      features: ['Tudo do Basic', 'Aulas coletivas ilimitadas', 'Avaliação física mensal', 'Nutricionista online', 'Área de relaxamento', 'Toalha inclusa'],
      popular: true
    },
    {
      name: 'Black',
      price: '229,90',
      features: ['Tudo do Premium', '2 sessões Personal/mês', 'Massagem relaxante', 'Acesso 24h', 'Convidado grátis 2x/mês', 'Consultoria nutricional presencial'],
      popular: false
    }
  ];

  const testimonials = [
    {
      name: 'Marina Silva',
      role: 'Perdi 15kg',
      content: 'Em 6 meses transformei completamente meu corpo e minha autoestima. A equipe é incrível!',
      rating: 5,
      image: '🏆'
    },
    {
      name: 'Carlos Eduardo',
      role: 'Ganhou 8kg de massa',
      content: 'Melhor academia da região! Equipamentos top e profissionais extremamente qualificados.',
      rating: 5,
      image: '💪'
    },
    {
      name: 'Ana Paula',
      role: 'Definição muscular',
      content: 'As aulas coletivas são viciantes! Ambiente motivador e resultados surpreendentes.',
      rating: 5,
      image: '⚡'
    }
  ];

  const stats = [
    { number: '5000+', label: 'Alunos Ativos' },
    { number: '15', label: 'Anos de Experiência' },
    { number: '98%', label: 'Satisfação' },
    { number: '24/7', label: 'Acesso Premium' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden">
      {/* Hero Section */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-20 right-20 w-96 h-96 bg-red-600 rounded-full filter blur-[120px] opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-20 left-20 w-96 h-96 bg-orange-600 rounded-full filter blur-[120px] opacity-20"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeInUp}>
            <motion.div 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-600/30 rounded-full px-4 py-2 mb-6 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
            >
              <Flame className="w-4 h-4 text-red-500" />
              <span className="text-sm font-semibold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                #1 Academia da Região
              </span>
            </motion.div>

            <h1 className="text-6xl md:text-7xl font-black mb-6 leading-none">
              TRANSFORME
              <br />
              <span className="bg-gradient-to-r from-red-500 via-orange-500 to-red-600 bg-clip-text text-transparent">
                SEU CORPO
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-8 leading-relaxed max-w-lg">
              Atinja seus objetivos com treinos personalizados, equipamentos de ponta e uma equipe de profissionais dedicados ao seu sucesso.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-full font-bold text-lg shadow-lg shadow-red-500/50 flex items-center gap-2 group"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(239, 68, 68, 0.6)" }}
                whileTap={{ scale: 0.95 }}
              >
                Começar Agora
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                className="px-8 py-4 border-2 border-gray-700 rounded-full font-bold text-lg hover:border-red-600 transition-colors backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Agendar Visita
              </motion.button>
            </div>

            <div className="grid grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <div className="text-3xl font-black bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="relative"
          >
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl opacity-30 blur-2xl"
              animate={{
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden border border-gray-800 shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center text-8xl">
                💪
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent p-8 flex items-end">
                <div>
                  <div className="text-sm text-gray-400 mb-2">Próxima Aula</div>
                  <div className="text-2xl font-bold">HIIT Extreme - 18:00</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              className="inline-block mb-4"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Dumbbell className="w-16 h-16 text-red-500 mx-auto" />
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              NOSSOS <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">SERVIÇOS</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Oferecemos uma experiência completa para você alcançar seus objetivos
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
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
                className="group relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border border-gray-800 hover:border-red-600/50 transition-all duration-300 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed">{service.description}</p>

                <motion.div
                  className="mt-6 flex items-center text-red-500 font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ x: 5 }}
                >
                  Saiba mais <ChevronRight className="w-4 h-4 ml-1" />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 px-6 relative bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              PLANOS <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">PERFEITOS</span>
            </h2>
            <p className="text-xl text-gray-400">
              Escolha o plano ideal para sua jornada fitness
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`relative p-8 rounded-3xl backdrop-blur-sm ${
                  plan.popular
                    ? 'bg-gradient-to-br from-red-900/50 to-orange-900/50 border-2 border-red-500 shadow-2xl shadow-red-500/50'
                    : 'bg-gray-900/50 border border-gray-800'
                }`}
              >
                {plan.popular && (
                  <motion.div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-red-600 to-orange-600 rounded-full text-sm font-bold shadow-lg"
                    animate={{ y: [-2, 2, -2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    MAIS POPULAR
                  </motion.div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-black bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                      R$ {plan.price}
                    </span>
                    <span className="text-gray-500">/mês</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  className={`w-full py-4 rounded-full font-bold text-lg ${
                    plan.popular
                      ? 'bg-gradient-to-r from-red-600 to-orange-600 shadow-lg shadow-red-500/50'
                      : 'bg-gray-800 hover:bg-gray-700'
                  } transition-colors`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Começar Agora
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              HISTÓRIAS DE <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">SUCESSO</span>
            </h2>
            <p className="text-xl text-gray-400">
              Veja o que nossos alunos têm a dizer
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
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border border-gray-800 hover:border-red-600/50 transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center text-2xl">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIi8+PC9nPjwvc3ZnPg==')] opacity-30" />
        
        <motion.div
          className="relative z-10 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block mb-6"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Award className="w-20 h-20 text-yellow-500 mx-auto" />
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-black mb-6">
            PRONTO PARA A <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">TRANSFORMAÇÃO?</span>
          </h2>

          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Ganhe 7 dias grátis para experimentar todos os nossos serviços sem compromisso
          </p>

          <motion.button
            className="px-12 py-6 bg-gradient-to-r from-red-600 to-orange-600 rounded-full font-bold text-xl shadow-2xl shadow-red-500/50 inline-flex items-center gap-3"
            whileHover={{ scale: 1.05, boxShadow: "0 25px 80px rgba(239, 68, 68, 0.6)" }}
            whileTap={{ scale: 0.95 }}
          >
            Começar Minha Transformação
            <Flame className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Dumbbell className="w-8 h-8 text-red-500" />
                <span className="text-2xl font-black">FIT<span className="text-red-500">GYM</span></span>
              </div>
              <p className="text-gray-400 mb-4">
                Transformando vidas através do fitness desde 2009
              </p>
              <div className="flex gap-4">
                <motion.a href="#" whileHover={{ scale: 1.2, y: -2 }} className="text-gray-400 hover:text-red-500 transition-colors">
                  <Instagram className="w-6 h-6" />
                </motion.a>
                <motion.a href="#" whileHover={{ scale: 1.2, y: -2 }} className="text-gray-400 hover:text-red-500 transition-colors">
                  <Facebook className="w-6 h-6" />
                </motion.a>
                <motion.a href="#" whileHover={{ scale: 1.2, y: -2 }} className="text-gray-400 hover:text-red-500 transition-colors">
                  <Youtube className="w-6 h-6" />
                </motion.a>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">Horários</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Seg - Sex: 06h às 23h</li>
                <li>Sábados: 08h às 20h</li>
                <li>Domingos: 08h às 14h</li>
                <li className="text-red-500 font-semibold">Acesso 24h (Plano Black)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Serviços</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Musculação</li>
                <li>Aulas Coletivas</li>
                <li>Personal Trainer</li>
                <li>Avaliação Física</li>
                <li>Nutrição</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Contato</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-500" />
                  Av. Principal, 1000
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-red-500" />
                  (11) 9999-9999
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-red-500" />
                  contato@fitgym.com
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>&copy; 2026 FitGym. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AcademiaComplete;
