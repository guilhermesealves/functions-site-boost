import { motion } from 'framer-motion';
import { Coffee, Croissant, MapPin, Phone, Mail, Instagram, Facebook, Clock, Heart, Sparkles, Award, Star, Cake, Cookie, Sandwich, ChevronRight, Check } from 'lucide-react';

const CafeteriaComplete = () => {
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
      category: '☕ Cafés Especiais',
      items: [
        { name: 'Espresso Artesanal', description: 'Blend exclusivo da casa, extraído na temperatura perfeita', price: 'R$ 8' },
        { name: 'Cappuccino Cremoso', description: 'Espresso com leite vaporizado e arte latte', price: 'R$ 12' },
        { name: 'Mocha Belga', description: 'Café premium com chocolate belga e chantilly', price: 'R$ 15' },
        { name: 'Cold Brew', description: 'Café extraído a frio por 12h, suave e refrescante', price: 'R$ 14' }
      ]
    },
    {
      category: '🥐 Pães & Croissants',
      items: [
        { name: 'Croissant Francês', description: 'Folhado artesanal amanteigado e crocante', price: 'R$ 9' },
        { name: 'Pain au Chocolat', description: 'Croissant recheado com chocolate belga', price: 'R$ 11' },
        { name: 'Pão de Queijo Mineiro', description: 'Receita tradicional, quentinho e sequinho', price: 'R$ 7' },
        { name: 'Pão na Chapa', description: 'Pão francês tostado na manteiga', price: 'R$ 6' }
      ]
    },
    {
      category: '🍰 Doces & Bolos',
      items: [
        { name: 'Bolo de Chocolate', description: 'Bolo úmido com ganache cremosa', price: 'R$ 12' },
        { name: 'Cheesecake de Frutas Vermelhas', description: 'Cremoso e equilibrado', price: 'R$ 16' },
        { name: 'Brownie com Sorvete', description: 'Quentinho com sorvete de baunilha', price: 'R$ 14' },
        { name: 'Cookies Artesanais', description: 'Chocolate chips ou nuts (3 unidades)', price: 'R$ 10' }
      ]
    }
  ];

  const features = [
    {
      icon: Coffee,
      title: 'Grãos Selecionados',
      description: 'Cafés premium de fazendas certificadas',
      color: 'from-amber-600 to-orange-600'
    },
    {
      icon: Croissant,
      title: 'Feito na Hora',
      description: 'Pães e doces fresquinhos saindo do forno',
      color: 'from-orange-600 to-red-500'
    },
    {
      icon: Heart,
      title: 'Ambiente Acolhedor',
      description: 'Espaço perfeito para trabalhar ou relaxar',
      color: 'from-pink-600 to-rose-600'
    },
    {
      icon: Award,
      title: 'Baristas Profissionais',
      description: 'Equipe treinada e apaixonada por café',
      color: 'from-red-600 to-orange-600'
    }
  ];

  const testimonials = [
    {
      name: 'Mariana Silva',
      role: 'Cliente Regular',
      content: 'Meu refúgio matinal! O cappuccino é perfeito e os croissants são os melhores da cidade. Ambiente super aconchegante!',
      rating: 5,
      avatar: '☕'
    },
    {
      name: 'João Pedro',
      role: 'Home Office',
      content: 'Trabalho aqui quase todos os dias. WiFi rápido, café delicioso e um ambiente que inspira produtividade.',
      rating: 5,
      avatar: '💼'
    },
    {
      name: 'Ana Carolina',
      role: 'Food Blogger',
      content: 'Descobri este lugar e virou meu favorito! Os doces são incríveis e o atendimento é sempre caloroso.',
      rating: 5,
      avatar: '🧁'
    }
  ];

  const highlights = [
    { icon: Coffee, text: 'Café Premium' },
    { icon: Croissant, text: 'Pães Artesanais' },
    { icon: Cake, text: 'Doces Caseiros' },
    { icon: Heart, text: 'Wi-Fi Grátis' }
  ];

  const stats = [
    { number: '100%', label: 'Artesanal' },
    { number: '8+', label: 'Anos' },
    { number: '4.9★', label: 'Avaliação' },
    { number: '50+', label: 'Receitas' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-amber-50 to-white text-gray-900">
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
            className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-orange-300 to-amber-300 rounded-full filter blur-[120px] opacity-40"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-pink-300 to-rose-300 rounded-full filter blur-[120px] opacity-40"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
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
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-orange-200 rounded-full px-5 py-2 mb-8 shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <Award className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-semibold bg-gradient-to-r from-orange-700 to-amber-700 bg-clip-text text-transparent">
                Eleita Melhor Cafeteria do Bairro 2025
              </span>
            </motion.div>

            <motion.div
              className="mb-8"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Coffee className="w-24 h-24 text-orange-600 mx-auto" />
            </motion.div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Onde Cada Xícara
              <span className="block mt-2 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
                Conta uma História
              </span>
            </h1>

            <p className="text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              Cafés especiais, pães artesanais e doces irresistíveis em um ambiente acolhedor que aquece o coração
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-16">
              <motion.button
                className="px-10 py-5 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-full font-bold text-lg shadow-xl shadow-orange-500/30 flex items-center gap-2"
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(234, 88, 12, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Coffee className="w-5 h-5" />
                Ver Cardápio Completo
              </motion.button>
              
              <motion.button
                className="px-10 py-5 border-2 border-orange-300 text-orange-700 rounded-full font-bold text-lg hover:bg-orange-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MapPin className="w-5 h-5 inline mr-2" />
                Como Chegar
              </motion.button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-5 py-3 shadow-lg border border-orange-200"
                >
                  <highlight.icon className="w-5 h-5 text-orange-600" />
                  <span className="font-semibold text-gray-700">{highlight.text}</span>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <div className="text-4xl font-black bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
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
          className="absolute top-1/4 right-1/4 text-7xl opacity-20"
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ☕
        </motion.div>
        <motion.div
          className="absolute bottom-1/3 left-1/4 text-7xl opacity-20"
          animate={{
            y: [20, -20, 20],
            rotate: [0, -15, 15, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🥐
        </motion.div>
      </motion.section>

      {/* Features */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold mb-6">
              Por Que Nos <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Escolher?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Cada detalhe pensado para proporcionar a melhor experiência
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
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
                  className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-shadow`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <feature.icon className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu */}
      <section className="py-32 px-6 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              className="inline-block mb-6"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Cookie className="w-20 h-20 text-orange-600 mx-auto" />
            </motion.div>
            <h2 className="text-5xl font-bold mb-6">
              Nosso <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Cardápio</span>
            </h2>
            <p className="text-xl text-gray-600">
              Preparado com carinho e ingredientes selecionados
            </p>
          </motion.div>

          <div className="space-y-12">
            {menu.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: sectionIndex * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-xl border border-orange-100"
              >
                <h3 className="text-3xl font-bold mb-6 text-orange-600">{section.category}</h3>
                <div className="space-y-4">
                  {section.items.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      whileHover={{ x: 5 }}
                      className="flex justify-between items-start gap-4 p-4 rounded-xl hover:bg-orange-50 transition-colors"
                    >
                      <div className="flex-1">
                        <h4 className="text-lg font-bold mb-1 text-gray-900">{item.name}</h4>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                      <div className="text-2xl font-black text-orange-600 flex-shrink-0">
                        {item.price}
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
              className="px-12 py-5 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-full font-bold text-lg shadow-2xl shadow-orange-500/30 inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Cardápio Completo
              <ChevronRight className="w-5 h-5" />
            </motion.button>
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
            <h2 className="text-5xl font-bold mb-6">
              Nossos <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Clientes</span>
            </h2>
            <p className="text-xl text-gray-600">
              Veja o que as pessoas estão dizendo sobre nós
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
                className="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-3xl border border-orange-200 shadow-lg"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-orange-500 text-orange-500" />
                  ))}
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-600 to-amber-600 flex items-center justify-center text-3xl shadow-lg">
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

      {/* CTA */}
      <section className="py-32 px-6 bg-gradient-to-br from-orange-600 via-amber-600 to-orange-600 text-white relative overflow-hidden">
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
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Croissant className="w-24 h-24 mx-auto" />
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Venha Tomar um Café Conosco!
          </h2>

          <p className="text-2xl mb-12 opacity-95">
            Estamos esperando você com um sorriso no rosto e café quentinho
          </p>

          <motion.button
            className="px-12 py-6 bg-white text-orange-700 rounded-full font-bold text-xl shadow-2xl inline-flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MapPin className="w-6 h-6" />
            Ver Localização
          </motion.button>

          <p className="mt-8 text-sm opacity-90">
            Segunda a Sexta: 7h às 20h • Sábados e Domingos: 8h às 18h
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Coffee className="w-8 h-8 text-orange-500" />
                <span className="text-2xl font-bold">Café<span className="text-orange-500">House</span></span>
              </div>
              <p className="text-gray-400 mb-4 text-sm">
                Cafeteria artesanal com amor desde 2016
              </p>
              <div className="flex gap-4">
                <motion.a href="#" whileHover={{ scale: 1.2, y: -2 }} className="text-gray-400 hover:text-orange-500 transition-colors">
                  <Instagram className="w-6 h-6" />
                </motion.a>
                <motion.a href="#" whileHover={{ scale: 1.2, y: -2 }} className="text-gray-400 hover:text-orange-500 transition-colors">
                  <Facebook className="w-6 h-6" />
                </motion.a>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-orange-400">Horários</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-500" />
                  Seg - Sex: 7h às 20h
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-500" />
                  Sáb - Dom: 8h às 18h
                </li>
                <li className="text-orange-400 font-semibold mt-3">
                  Sempre aberto para você!
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-orange-400">Destaques</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-orange-500" />
                  Cafés Especiais
                </li>
                <li className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-orange-500" />
                  Pães Artesanais
                </li>
                <li className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-orange-500" />
                  Wi-Fi Gratuito
                </li>
                <li className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-orange-500" />
                  Espaço Pet Friendly
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-orange-400">Contato</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-orange-500 mt-0.5" />
                  <span>Rua do Café, 123<br/>Centro</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-orange-500" />
                  (11) 94444-4444
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-orange-500" />
                  ola@cafehouse.com
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>&copy; 2026 CaféHouse. Feito com ❤️ e muito café.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CafeteriaComplete;
