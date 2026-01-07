import { motion } from 'framer-motion';
import { Pizza, Flame, Clock, MapPin, Phone, Mail, Instagram, Facebook, Bike, Star, ChefHat, Heart, Check, ShoppingBag, Truck, Award } from 'lucide-react';

const PizzariaComplete = () => {
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

  const pizzas = [
    {
      name: 'Margherita Clássica',
      description: 'Molho de tomate caseiro, mozzarella di buffala, manjericão fresco e azeite extra virgem',
      price: 'R$ 45',
      popular: false,
      emoji: '🍃'
    },
    {
      name: 'Pepperoni Suprema',
      description: 'Generosas fatias de pepperoni italiano, mozzarella e orégano',
      price: 'R$ 52',
      popular: true,
      emoji: '🔥'
    },
    {
      name: 'Quattro Formaggi',
      description: 'Mozzarella, gorgonzola, parmesão e provolone',
      price: 'R$ 58',
      popular: false,
      emoji: '🧀'
    },
    {
      name: 'Calabresa Especial',
      description: 'Calabresa artesanal, cebola roxa, azeitonas pretas e pimenta biquinho',
      price: 'R$ 48',
      popular: true,
      emoji: '🌶️'
    },
    {
      name: 'Frango Catupiry',
      description: 'Peito de frango desfiado, catupiry original e milho verde',
      price: 'R$ 50',
      popular: false,
      emoji: '🐔'
    },
    {
      name: 'Portuguesa Premium',
      description: 'Presunto, mozzarella, ovo, cebola, azeitona, ervilha e pimentão',
      price: 'R$ 54',
      popular: false,
      emoji: '🥚'
    },
    {
      name: 'Vegetariana',
      description: 'Rúcula, tomate seco, palmito, champignon e parmesão',
      price: 'R$ 46',
      popular: false,
      emoji: '🥗'
    },
    {
      name: 'Bacon com Cheddar',
      description: 'Bacon crocante, cheddar cremoso, cebola caramelizada',
      price: 'R$ 56',
      popular: true,
      emoji: '🥓'
    }
  ];

  const features = [
    {
      icon: Flame,
      title: 'Forno a Lenha',
      description: 'Massa crocante e saborosa assada na temperatura perfeita',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: ChefHat,
      title: 'Receita Italiana',
      description: 'Receitas tradicionais passadas por gerações',
      color: 'from-red-500 to-rose-500'
    },
    {
      icon: Truck,
      title: 'Delivery Rápido',
      description: 'Entrega em até 40 minutos quentinha na sua casa',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Heart,
      title: 'Ingredientes Frescos',
      description: 'Selecionamos os melhores ingredientes diariamente',
      color: 'from-red-500 to-pink-500'
    }
  ];

  const testimonials = [
    {
      name: 'Lucas Fernandes',
      role: 'Cliente Fiel',
      content: 'Melhor pizza da cidade, sem dúvidas! A massa é perfeita, crocante por fora e macia por dentro. Peço toda semana!',
      rating: 5,
      avatar: '🍕'
    },
    {
      name: 'Camila Rodrigues',
      role: 'Delivery',
      content: 'Sempre chega quentinha e no tempo prometido. A pepperoni suprema é viciante! Atendimento nota 10.',
      rating: 5,
      avatar: '❤️'
    },
    {
      name: 'Rafael Santos',
      role: 'Família',
      content: 'Lugar favorito da família! Ambiente aconchegante, pizza deliciosa e preço justo. Recomendo demais!',
      rating: 5,
      avatar: '⭐'
    }
  ];

  const combos = [
    {
      name: 'Combo Individual',
      items: ['1 Pizza Média', '1 Refri 1L'],
      price: 'R$ 65',
      savings: 'Economize R$ 12'
    },
    {
      name: 'Combo Casal',
      items: ['1 Pizza Grande', '2 Refris 1L', '1 Borda Recheada'],
      price: 'R$ 95',
      savings: 'Economize R$ 20',
      popular: true
    },
    {
      name: 'Combo Família',
      items: ['2 Pizzas Grandes', '3 Refris 2L', '2 Bordas', '1 Sobremesa'],
      price: 'R$ 165',
      savings: 'Economize R$ 35'
    }
  ];

  const stats = [
    { number: '15k+', label: 'Pizzas/Mês' },
    { number: '12', label: 'Anos' },
    { number: '4.8★', label: 'Avaliação' },
    { number: '< 40min', label: 'Entrega' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-950 via-orange-950 to-black text-white overflow-hidden">
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
            className="absolute top-20 right-20 w-[600px] h-[600px] bg-gradient-to-br from-orange-600 to-red-600 rounded-full filter blur-[150px] opacity-30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-20 left-20 w-[600px] h-[600px] bg-gradient-to-br from-yellow-600 to-orange-600 rounded-full filter blur-[150px] opacity-30"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
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
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-900/50 to-red-900/50 border border-orange-700/50 rounded-full px-5 py-2 mb-8 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
            >
              <Award className="w-5 h-5 text-orange-400" />
              <span className="text-sm font-semibold text-orange-300">
                🏆 Eleita Melhor Pizzaria 2025
              </span>
            </motion.div>

            <motion.div
              className="mb-8"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <Pizza className="w-32 h-32 text-orange-500 mx-auto drop-shadow-2xl" />
            </motion.div>

            <h1 className="text-7xl md:text-8xl font-black mb-6 leading-none">
              PIZZA
              <span className="block mt-2 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 bg-clip-text text-transparent">
                AUTÊNTICA
              </span>
            </h1>

            <p className="text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto font-medium">
              Massa artesanal, forno a lenha e ingredientes selecionados. A verdadeira pizza italiana agora pertinho de você!
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-16">
              <motion.button
                className="px-12 py-6 bg-gradient-to-r from-orange-600 to-red-600 rounded-full font-black text-xl shadow-2xl shadow-orange-600/50 flex items-center gap-3"
                whileHover={{ scale: 1.05, boxShadow: "0 25px 80px rgba(234, 88, 12, 0.7)" }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBag className="w-6 h-6" />
                PEDIR AGORA
              </motion.button>
              
              <motion.button
                className="px-12 py-6 border-3 border-orange-500 rounded-full font-black text-xl hover:bg-orange-900/30 transition-colors backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Pizza className="w-6 h-6 inline mr-2" />
                VER CARDÁPIO
              </motion.button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <div className="text-5xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400 font-semibold">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Floating Pizza Emojis */}
        {['🍕', '🔥', '🧀', '🌶️', '🍃'].map((emoji, index) => (
          <motion.div
            key={index}
            className="absolute text-6xl opacity-20"
            style={{
              top: `${20 + index * 15}%`,
              left: `${10 + index * 20}%`
            }}
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 360],
            }}
            transition={{
              duration: 6 + index * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </motion.section>

      {/* Features */}
      <section className="py-32 px-6 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              O QUE NOS TORNA <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">ESPECIAIS</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Tradição italiana com o sabor que você merece
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
                whileHover={{ y: -10, scale: 1.05 }}
                className="text-center group"
              >
                <motion.div
                  className={`w-24 h-24 bg-gradient-to-br ${feature.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:shadow-orange-500/50 transition-shadow`}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className="w-12 h-12 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu de Pizzas */}
      <section className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/20 to-black" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              className="inline-block mb-6"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <Flame className="w-24 h-24 text-orange-500 mx-auto" />
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              NOSSAS <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">PIZZAS</span>
            </h2>
            <p className="text-xl text-gray-400">
              Direto do forno a lenha para sua mesa
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {pizzas.map((pizza, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`relative bg-gradient-to-br from-orange-950/50 to-red-950/50 p-6 rounded-3xl border-2 backdrop-blur-sm ${
                  pizza.popular ? 'border-orange-500 shadow-2xl shadow-orange-500/30' : 'border-orange-900/30'
                }`}
              >
                {pizza.popular && (
                  <motion.div
                    className="absolute -top-3 right-4 px-4 py-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-full text-xs font-black shadow-lg"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🔥 POPULAR
                  </motion.div>
                )}

                <div className="text-5xl mb-4 text-center">{pizza.emoji}</div>
                <h3 className="text-xl font-bold mb-2 text-center">{pizza.name}</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed text-center min-h-[60px]">{pizza.description}</p>
                <div className="text-3xl font-black text-orange-500 text-center mb-4">{pizza.price}</div>
                
                <motion.button
                  className="w-full py-3 bg-gradient-to-r from-orange-600 to-red-600 rounded-full font-bold hover:shadow-lg hover:shadow-orange-500/50 transition-shadow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Adicionar
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Combos */}
      <section className="py-32 px-6 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              COMBOS <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">IRRESISTÍVEIS</span>
            </h2>
            <p className="text-xl text-gray-400">
              Economize pedindo nossos combos especiais
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {combos.map((combo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`relative p-8 rounded-3xl backdrop-blur-sm ${
                  combo.popular
                    ? 'bg-gradient-to-br from-orange-900/50 to-red-900/50 border-2 border-orange-500 shadow-2xl shadow-orange-500/30 scale-105'
                    : 'bg-gradient-to-br from-gray-900/50 to-black/50 border border-orange-900/30'
                }`}
              >
                {combo.popular && (
                  <motion.div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-orange-600 to-red-600 rounded-full text-sm font-black shadow-lg"
                    animate={{ y: [-2, 2, -2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    MAIS VENDIDO
                  </motion.div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-black mb-4">{combo.name}</h3>
                  <div className="text-5xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
                    {combo.price}
                  </div>
                  <div className="text-sm text-green-400 font-semibold">{combo.savings}</div>
                </div>

                <ul className="space-y-3 mb-8">
                  {combo.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-orange-500 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  className={`w-full py-4 rounded-full font-black text-lg ${
                    combo.popular
                      ? 'bg-gradient-to-r from-orange-600 to-red-600 shadow-lg shadow-orange-500/50'
                      : 'bg-gray-800 hover:bg-gray-700'
                  } transition-colors`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  PEDIR COMBO
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              CLIENTES <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">SATISFEITOS</span>
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
                className="bg-gradient-to-br from-orange-950/40 to-red-950/40 p-8 rounded-3xl border border-orange-900/30 backdrop-blur-sm"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-orange-500 text-orange-500" />
                  ))}
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center text-3xl shadow-xl">
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

      {/* CTA */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/40 via-red-900/40 to-orange-900/40" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIi8+PC9nPjwvc3ZnPg==')] opacity-30" />

        <motion.div
          className="relative z-10 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block mb-6"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity }
            }}
          >
            <Pizza className="w-32 h-32 text-orange-500 mx-auto drop-shadow-2xl" />
          </motion.div>

          <h2 className="text-6xl md:text-7xl font-black mb-6">
            COM FOME?
          </h2>

          <p className="text-3xl text-gray-300 mb-12 font-bold">
            Peça agora e receba em até 40 minutos!
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button
              className="px-16 py-7 bg-gradient-to-r from-orange-600 to-red-600 rounded-full font-black text-2xl shadow-2xl shadow-orange-600/50 inline-flex items-center gap-4"
              whileHover={{ scale: 1.05, boxShadow: "0 30px 100px rgba(234, 88, 12, 0.8)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Bike className="w-8 h-8" />
              PEDIR DELIVERY
            </motion.button>
            
            <motion.button
              className="px-16 py-7 border-3 border-orange-500 rounded-full font-black text-2xl hover:bg-orange-900/30 transition-colors backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MapPin className="w-8 h-8 inline mr-3" />
              VER LOCALIZAÇÃO
            </motion.button>
          </div>

          <p className="mt-8 text-gray-500 text-lg font-semibold">
            Aberto Seg-Dom • 18h às 23h • Taxa de entrega: R$ 8,00
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-orange-900/20 py-16 px-6 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Pizza className="w-10 h-10 text-orange-500" />
                <span className="text-3xl font-black">PIZZ<span className="text-orange-500">ERIA</span></span>
              </div>
              <p className="text-gray-400 mb-4 text-sm">
                A pizza mais autêntica da cidade desde 2012
              </p>
              <div className="flex gap-4">
                <motion.a href="#" whileHover={{ scale: 1.2, y: -2 }} className="text-gray-400 hover:text-orange-500 transition-colors">
                  <Instagram className="w-7 h-7" />
                </motion.a>
                <motion.a href="#" whileHover={{ scale: 1.2, y: -2 }} className="text-gray-400 hover:text-orange-500 transition-colors">
                  <Facebook className="w-7 h-7" />
                </motion.a>
              </div>
            </div>

            <div>
              <h3 className="font-black mb-4 text-orange-400 text-lg">HORÁRIOS</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-500" />
                  Todos os dias: 18h às 23h
                </li>
                <li className="text-orange-400 font-bold mt-3">
                  🔥 Entrega até 40 minutos
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-black mb-4 text-orange-400 text-lg">SERVIÇOS</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-orange-500" />
                  Delivery Rápido
                </li>
                <li className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-orange-500" />
                  Retirada no Local
                </li>
                <li className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-orange-500" />
                  Pagamento Online
                </li>
                <li className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-orange-500" />
                  Forno a Lenha
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-black mb-4 text-orange-400 text-lg">CONTATO</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-orange-500 mt-0.5" />
                  <span>Rua das Pizzas, 999<br/>Centro</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-orange-500" />
                  (11) 95555-5555
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-orange-500" />
                  delivery@pizzaria.com
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-orange-900/20 text-center text-gray-500">
            <p className="font-bold">&copy; 2026 Pizzaria Autêntica. Feito com 🍕 e muito amor!</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PizzariaComplete;
