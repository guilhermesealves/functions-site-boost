import { motion } from 'framer-motion';
import { UtensilsCrossed, ChefHat, Wine, Star, Clock, MapPin, Phone, Mail, Instagram, Facebook, Award, Sparkles, Heart, Users, Calendar, Gift, DollarSign, Check } from 'lucide-react';

const RestauranteComplete = () => {
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

  const menu = [
    {
      category: 'Entradas',
      items: [
        { name: 'Carpaccio de Filé Mignon', description: 'Lâminas finas com rúcula, lascas de parmesão e molho trufado', price: 'R$ 68' },
        { name: 'Burrata com Tomates Confit', description: 'Queijo burrata artesanal, tomates assados e pesto de manjericão', price: 'R$ 54' },
        { name: 'Tártaro de Salmão', description: 'Salmão fresco com alcaparras, cebola roxa e torradas artesanais', price: 'R$ 72' }
      ]
    },
    {
      category: 'Pratos Principais',
      items: [
        { name: 'Filé Wellington', description: 'Filé mignon envolto em massa folhada com foie gras e cogumelos', price: 'R$ 185' },
        { name: 'Risoto de Trufas Negras', description: 'Arroz arbóreo cremoso com lascas de trufas negras importadas', price: 'R$ 148' },
        { name: 'Polvo Grelhado', description: 'Polvo maçaricado com purê de batata-doce e redução de vinho tinto', price: 'R$ 165' }
      ]
    },
    {
      category: 'Sobremesas',
      items: [
        { name: 'Petit Gâteau', description: 'Bolo de chocolate quente com sorvete de baunilha e calda de framboesa', price: 'R$ 38' },
        { name: 'Crème Brûlée', description: 'Creme de baunilha com açúcar caramelizado e frutas vermelhas', price: 'R$ 32' },
        { name: 'Cheesecake Premium', description: 'Cheesecake new york com cobertura de frutas vermelhas', price: 'R$ 36' }
      ]
    }
  ];

  const features = [
    {
      icon: ChefHat,
      title: 'Chef Premiado',
      description: 'Experiência gastronômica internacional com 3 estrelas Michelin',
      color: 'from-amber-500 to-orange-500'
    },
    {
      icon: Wine,
      title: 'Adega Exclusiva',
      description: 'Mais de 500 rótulos selecionados dos melhores vinhedos',
      color: 'from-red-500 to-rose-500'
    },
    {
      icon: UtensilsCrossed,
      title: 'Menu Degustação',
      description: 'Experiência completa com 7 tempos harmonizados',
      color: 'from-yellow-500 to-amber-500'
    },
    {
      icon: Users,
      title: 'Eventos Privativos',
      description: 'Espaço exclusivo para celebrações e eventos corporativos',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const testimonials = [
    {
      name: 'Ricardo Almeida',
      role: 'Crítico Gastronômico',
      content: 'Sem dúvida o melhor restaurante da cidade. Cada prato é uma obra de arte que combina técnica impecável com sabores surpreendentes.',
      rating: 5,
      avatar: '👨‍🍳'
    },
    {
      name: 'Patricia Mendes',
      role: 'Cliente VIP',
      content: 'Ambiente sofisticado, atendimento impecável e uma experiência gastronômica inesquecível. Vale cada centavo!',
      rating: 5,
      avatar: '🍷'
    },
    {
      name: 'Fernando Costa',
      role: 'Empresário',
      content: 'Meu lugar favorito para eventos corporativos e jantares especiais. A equipe sempre supera expectativas.',
      rating: 5,
      avatar: '⭐'
    }
  ];

  const awards = [
    { icon: Award, text: '3 Estrelas Michelin' },
    { icon: Star, text: 'Melhor da Cidade 2025' },
    { icon: Gift, text: 'Wine Spectator Award' },
    { icon: Sparkles, text: 'Trip Advisor Excellence' }
  ];

  const stats = [
    { number: '3★', label: 'Michelin' },
    { number: '20+', label: 'Anos' },
    { number: '500+', label: 'Vinhos' },
    { number: '4.9', label: 'Avaliação' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white overflow-hidden">
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
            className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full filter blur-[150px] opacity-20"
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
            className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-red-600 to-rose-600 rounded-full filter blur-[150px] opacity-20"
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

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
          <motion.div variants={fadeInUp}>
            <motion.div 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-900/40 to-orange-900/40 border border-amber-700/30 rounded-full px-5 py-2 mb-8 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
            >
              <Award className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-semibold text-amber-300">
                3 Estrelas Michelin • Premiado Internacionalmente
              </span>
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-light mb-6 leading-tight tracking-wide">
              ALTA
              <span className="block mt-2 font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                GASTRONOMIA
              </span>
            </h1>

            <p className="text-2xl text-gray-400 mb-12 leading-relaxed max-w-3xl mx-auto font-light">
              Uma experiência culinária única onde cada prato conta uma história de paixão, técnica e sabores extraordinários
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-16">
              <motion.button
                className="px-10 py-5 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full font-semibold text-lg shadow-2xl shadow-amber-600/50 flex items-center gap-2"
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(217, 119, 6, 0.6)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Calendar className="w-5 h-5" />
                Reservar Mesa
              </motion.button>
              
              <motion.button
                className="px-10 py-5 border-2 border-amber-700/50 rounded-full font-semibold text-lg hover:bg-amber-900/20 transition-colors backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <UtensilsCrossed className="w-5 h-5 inline mr-2" />
                Ver Menu Completo
              </motion.button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Floating Award Badges */}
        <div className="absolute bottom-10 left-0 right-0">
          <div className="flex justify-center gap-8 flex-wrap px-6">
            {awards.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.2 }}
                whileHover={{ y: -5 }}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-900/40 to-orange-900/40 border border-amber-700/30 rounded-full px-4 py-2 backdrop-blur-sm"
              >
                <award.icon className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-medium text-amber-300">{award.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-32 px-6 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              EXPERIÊNCIA <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">EXCLUSIVA</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Cada detalhe pensado para proporcionar momentos inesquecíveis
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="text-center group"
              >
                <motion.div
                  className={`w-24 h-24 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl`}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className="w-12 h-12 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-amber-950/10 to-black" />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              className="inline-block mb-6"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <ChefHat className="w-20 h-20 text-amber-500 mx-auto" />
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              MENU <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">DEGUSTAÇÃO</span>
            </h2>
            <p className="text-xl text-gray-400">
              Uma seleção dos nossos pratos mais aclamados
            </p>
          </motion.div>

          <div className="space-y-16">
            {menu.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: sectionIndex * 0.2 }}
              >
                <h3 className="text-3xl font-bold mb-8 text-amber-400 text-center">{section.category}</h3>
                <div className="space-y-6">
                  {section.items.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      whileHover={{ x: 10 }}
                      className="bg-gradient-to-r from-amber-950/20 to-transparent p-6 rounded-2xl border border-amber-900/20 hover:border-amber-700/40 transition-all backdrop-blur-sm"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <h4 className="text-xl font-bold mb-2">{item.name}</h4>
                          <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                        </div>
                        <div className="text-2xl font-bold text-amber-400 flex-shrink-0">
                          {item.price}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <motion.button
              className="px-12 py-5 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full font-bold text-lg shadow-2xl shadow-amber-600/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Menu Completo
            </motion.button>
            <p className="mt-4 text-gray-500 text-sm">
              Menu degustação completo (7 tempos): R$ 450 por pessoa
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              O QUE DIZEM <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">NOSSOS CLIENTES</span>
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
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-amber-950/30 to-orange-950/30 p-8 rounded-3xl border border-amber-900/30 backdrop-blur-sm"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center text-3xl shadow-lg">
                    {testimonial.avatar}
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
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/30 via-orange-900/30 to-amber-900/30" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIi8+PC9nPjwvc3ZnPg==')] opacity-30" />

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
            <Wine className="w-24 h-24 text-amber-500 mx-auto" />
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            RESERVE SUA <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">EXPERIÊNCIA</span>
          </h2>

          <p className="text-2xl text-gray-400 mb-12">
            Garanta sua mesa e prepare-se para uma noite inesquecível
          </p>

          <motion.button
            className="px-12 py-6 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full font-bold text-xl shadow-2xl shadow-amber-600/50 inline-flex items-center gap-3"
            whileHover={{ scale: 1.05, boxShadow: "0 25px 80px rgba(217, 119, 6, 0.7)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Calendar className="w-6 h-6" />
            Fazer Reserva
          </motion.button>

          <p className="mt-8 text-gray-500 text-sm">
            Funcionamento: Terça a Sábado, 19h às 23h • Domingo, 12h às 16h
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-amber-900/20 py-16 px-6 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ChefHat className="w-8 h-8 text-amber-500" />
                <span className="text-2xl font-bold">Le <span className="text-amber-500">Gourmet</span></span>
              </div>
              <p className="text-gray-400 mb-4 text-sm">
                Alta gastronomia francesa com toque contemporâneo
              </p>
              <div className="flex gap-4">
                <motion.a href="#" whileHover={{ scale: 1.2, y: -2 }} className="text-gray-400 hover:text-amber-500 transition-colors">
                  <Instagram className="w-6 h-6" />
                </motion.a>
                <motion.a href="#" whileHover={{ scale: 1.2, y: -2 }} className="text-gray-400 hover:text-amber-500 transition-colors">
                  <Facebook className="w-6 h-6" />
                </motion.a>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-amber-400">Horários</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-500" />
                  Ter - Sáb: 19h às 23h
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-500" />
                  Domingos: 12h às 16h
                </li>
                <li className="text-amber-400 font-semibold mt-3">
                  Fechado às segundas
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-amber-400">Serviços</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-amber-500" />
                  Menu Degustação
                </li>
                <li className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-amber-500" />
                  Eventos Privativos
                </li>
                <li className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-amber-500" />
                  Adega Exclusiva
                </li>
                <li className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-amber-500" />
                  Sommelier Profissional
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-amber-400">Contato</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-500 mt-0.5" />
                  <span>Av. Gourmet, 1500<br/>Jardins</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-500" />
                  (11) 93333-3333
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-500" />
                  reservas@legourmet.com
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-amber-900/20 text-center text-gray-500 text-sm">
            <p>&copy; 2026 Le Gourmet Restaurant. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RestauranteComplete;
