import { motion } from 'framer-motion';
import { Sparkles, Heart, Sun, Moon, Wind, Flower2, Leaf, MapPin, Phone, Mail, Instagram, Facebook, Youtube, Clock, Users, Award, CheckCircle, Star } from 'lucide-react';

const YogaComplete = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const classes = [
    {
      icon: Sun,
      title: 'Hatha Yoga',
      description: 'Prática equilibrada focando em posturas, respiração e meditação para iniciantes e avançados',
      time: 'Seg, Qua, Sex - 7h às 8h30',
      level: 'Todos os níveis',
      color: 'from-amber-400 to-orange-400'
    },
    {
      icon: Wind,
      title: 'Vinyasa Flow',
      description: 'Sequências dinâmicas sincronizadas com a respiração para força e flexibilidade',
      time: 'Ter, Qui - 18h às 19h30',
      level: 'Intermediário',
      color: 'from-cyan-400 to-blue-400'
    },
    {
      icon: Moon,
      title: 'Yin Yoga',
      description: 'Posturas suaves e prolongadas para relaxamento profundo e alongamento',
      time: 'Sábados - 9h às 10h30',
      level: 'Todos os níveis',
      color: 'from-purple-400 to-indigo-400'
    },
    {
      icon: Sparkles,
      title: 'Meditação Guiada',
      description: 'Práticas de mindfulness para clareza mental e paz interior',
      time: 'Terças - 19h30 às 20h30',
      level: 'Iniciantes',
      color: 'from-pink-400 to-rose-400'
    },
    {
      icon: Heart,
      title: 'Yoga Terapêutico',
      description: 'Sessões personalizadas para recuperação, alívio de dores e bem-estar',
      time: 'Agendamento individual',
      level: 'Personalizado',
      color: 'from-green-400 to-emerald-400'
    },
    {
      icon: Flower2,
      title: 'Pranayama',
      description: 'Técnicas avançadas de respiração para vitalidade e equilíbrio energético',
      time: 'Quintas - 7h às 8h',
      level: 'Intermediário',
      color: 'from-violet-400 to-purple-400'
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: 'Saúde Física',
      description: 'Melhora da flexibilidade, força e postura corporal'
    },
    {
      icon: Sparkles,
      title: 'Paz Mental',
      description: 'Redução do estresse e ansiedade do dia a dia'
    },
    {
      icon: Wind,
      title: 'Energia Vital',
      description: 'Aumento da vitalidade e disposição'
    },
    {
      icon: Sun,
      title: 'Equilíbrio',
      description: 'Harmonização entre corpo, mente e espírito'
    }
  ];

  const plans = [
    {
      name: 'Namaste',
      price: '149',
      period: 'mensal',
      features: [
        '8 aulas por mês',
        'Acesso a Hatha e Yin',
        'Mat yoga incluso',
        'Chá e frutas após aula',
        'Grupo WhatsApp'
      ],
      popular: false
    },
    {
      name: 'Shanti',
      price: '249',
      period: 'mensal',
      features: [
        'Aulas ilimitadas',
        'Todas as modalidades',
        'Kit completo yoga',
        'Workshop mensal grátis',
        '1 aula particular/mês',
        'Desconto loja parceira'
      ],
      popular: true
    },
    {
      name: 'Zen',
      price: '399',
      period: 'mensal',
      features: [
        'Tudo do Shanti',
        '4 aulas particulares/mês',
        'Massagem relaxante',
        'Consultoria nutricional',
        'Acesso 24h meditação guiada',
        'Retiro anual incluso'
      ],
      popular: false
    }
  ];

  const testimonials = [
    {
      name: 'Beatriz Santos',
      role: 'Praticante há 3 anos',
      content: 'O yoga transformou minha vida completamente. Encontrei paz, saúde e uma comunidade incrível. Este espaço é mágico!',
      rating: 5,
      avatar: '🧘‍♀️'
    },
    {
      name: 'Pedro Oliveira',
      role: 'Hatha Yoga',
      content: 'Comecei totalmente duro e sem flexibilidade. Hoje me sinto renovado física e mentalmente. Instrutores maravilhosos!',
      rating: 5,
      avatar: '🕉️'
    },
    {
      name: 'Carolina Lima',
      role: 'Meditação',
      content: 'As aulas de meditação me ajudaram a lidar com ansiedade. O ambiente acolhedor faz toda diferença.',
      rating: 5,
      avatar: '🌸'
    }
  ];

  const stats = [
    { number: '10+', label: 'Anos de Experiência' },
    { number: '500+', label: 'Alunos Ativos' },
    { number: '30+', label: 'Aulas/Semana' },
    { number: '99%', label: 'Satisfação' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-purple-50 text-gray-900 overflow-hidden">
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
            className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-amber-300 to-orange-300 rounded-full filter blur-[150px] opacity-30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full filter blur-[150px] opacity-30"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
          <motion.div variants={fadeInUp} className="text-center max-w-4xl mx-auto">
            <motion.div 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-purple-100 border border-amber-200 rounded-full px-5 py-2 mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <Flower2 className="w-5 h-5 text-amber-600" />
              <span className="text-sm font-semibold bg-gradient-to-r from-amber-700 to-purple-700 bg-clip-text text-transparent">
                Estúdio Premiado de Yoga & Meditação
              </span>
            </motion.div>

            <h1 className="text-6xl md:text-7xl font-light mb-8 leading-tight">
              Encontre Sua
              <span className="block mt-2 font-bold bg-gradient-to-r from-amber-600 via-orange-500 to-purple-600 bg-clip-text text-transparent">
                Paz Interior
              </span>
            </h1>

            <p className="text-2xl text-gray-600 mb-12 leading-relaxed font-light max-w-3xl mx-auto">
              Pratique yoga em um ambiente acolhedor e transforme seu corpo, mente e espírito através de técnicas milenares adaptadas ao mundo moderno
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-16">
              <motion.button
                className="px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-semibold text-lg shadow-2xl shadow-amber-500/30 flex items-center gap-2"
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(245, 158, 11, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="w-5 h-5" />
                Aula Experimental Grátis
              </motion.button>
              
              <motion.button
                className="px-10 py-5 border-2 border-amber-300 text-amber-700 rounded-full font-semibold text-lg hover:bg-amber-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Horários
              </motion.button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <div className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-1/4 right-1/4 text-6xl opacity-20"
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          🧘‍♀️
        </motion.div>
        <motion.div
          className="absolute bottom-1/3 left-1/4 text-6xl opacity-20"
          animate={{
            y: [20, -20, 20],
            rotate: [360, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          🕉️
        </motion.div>
      </motion.section>

      {/* Benefits Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Benefícios do <span className="bg-gradient-to-r from-amber-600 to-purple-600 bg-clip-text text-transparent">Yoga</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Uma prática milenar com benefícios científicamente comprovados
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center"
              >
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-amber-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <benefit.icon className="w-10 h-10 text-amber-600" />
                </motion.div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Classes Section */}
      <section className="py-32 px-6 bg-gradient-to-b from-white to-amber-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              className="inline-block mb-4"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Leaf className="w-16 h-16 text-amber-600 mx-auto" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Nossas <span className="bg-gradient-to-r from-amber-600 to-purple-600 bg-clip-text text-transparent">Aulas</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Diversas modalidades para todos os níveis e objetivos
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {classes.map((classItem, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-amber-100"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${classItem.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <classItem.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-3">{classItem.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{classItem.description}</p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>{classItem.time}</span>
                  </div>
                  <div className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">
                    {classItem.level}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Escolha Seu <span className="bg-gradient-to-r from-amber-600 to-purple-600 bg-clip-text text-transparent">Plano</span>
            </h2>
            <p className="text-xl text-gray-600">
              Invista no seu bem-estar com flexibilidade
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
                whileHover={{ y: -10 }}
                className={`relative p-8 rounded-3xl backdrop-blur-sm ${
                  plan.popular
                    ? 'bg-gradient-to-br from-amber-100 to-purple-100 border-2 border-amber-400 shadow-2xl shadow-amber-500/30 scale-105'
                    : 'bg-gray-50 border border-gray-200'
                }`}
              >
                {plan.popular && (
                  <motion.div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-sm font-bold shadow-lg"
                    animate={{ y: [-2, 2, -2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    MAIS POPULAR
                  </motion.div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-5xl font-black bg-gradient-to-r from-amber-600 to-purple-600 bg-clip-text text-transparent">
                      R$ {plan.price}
                    </span>
                  </div>
                  <span className="text-gray-600">por {plan.period}</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  className={`w-full py-4 rounded-full font-bold text-lg transition-colors ${
                    plan.popular
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/50'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  }`}
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

      {/* Testimonials */}
      <section className="py-32 px-6 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Histórias de <span className="bg-gradient-to-r from-amber-600 to-purple-600 bg-clip-text text-transparent">Transformação</span>
            </h2>
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
                className="bg-white p-8 rounded-3xl shadow-lg border border-amber-100"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-purple-400 flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden bg-gradient-to-br from-amber-600 via-orange-500 to-purple-600 text-white">
        <div className="absolute inset-0 opacity-20">
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
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Flower2 className="w-24 h-24 mx-auto" />
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Sua Jornada Começa Aqui
          </h2>

          <p className="text-2xl mb-12 opacity-95">
            Ganhe sua primeira aula gratuitamente e descubra o poder transformador do yoga
          </p>

          <motion.button
            className="px-12 py-6 bg-white text-amber-700 rounded-full font-bold text-xl shadow-2xl inline-flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Agendar Aula Grátis
            <Sparkles className="w-6 h-6" />
          </motion.button>

          <p className="mt-6 text-sm opacity-90">
            Sem compromisso • Todos os níveis bem-vindos
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Flower2 className="w-8 h-8 text-amber-500" />
                <span className="text-2xl font-bold">Zen<span className="text-amber-500">Flow</span></span>
              </div>
              <p className="text-gray-400 mb-4 text-sm">
                Estúdio de Yoga & Meditação desde 2014
              </p>
              <div className="flex gap-4">
                <motion.a href="#" whileHover={{ scale: 1.2, y: -2 }} className="text-gray-400 hover:text-amber-500 transition-colors">
                  <Instagram className="w-6 h-6" />
                </motion.a>
                <motion.a href="#" whileHover={{ scale: 1.2, y: -2 }} className="text-gray-400 hover:text-amber-500 transition-colors">
                  <Facebook className="w-6 h-6" />
                </motion.a>
                <motion.a href="#" whileHover={{ scale: 1.2, y: -2 }} className="text-gray-400 hover:text-amber-500 transition-colors">
                  <Youtube className="w-6 h-6" />
                </motion.a>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">Horários</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Seg - Sex: 6h às 21h</li>
                <li>Sábados: 8h às 14h</li>
                <li>Domingos: 9h às 12h</li>
                <li className="text-amber-500 font-semibold mt-3">
                  Aulas de manhã, tarde e noite
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Modalidades</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>• Hatha Yoga</li>
                <li>• Vinyasa Flow</li>
                <li>• Yin Yoga</li>
                <li>• Meditação</li>
                <li>• Pranayama</li>
                <li>• Yoga Terapêutico</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Contato</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-500 mt-0.5" />
                  <span>Rua Harmonia, 500<br />Vila Madalena</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-500" />
                  (11) 97777-7777
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-500" />
                  namaste@zenflow.com
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>&copy; 2026 ZenFlow Yoga Studio. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default YogaComplete;
