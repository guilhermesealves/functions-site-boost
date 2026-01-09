import { motion } from "framer-motion";
import { Scissors, Star, Clock, MapPin, Phone, Instagram, Heart, Sparkles } from "lucide-react";

const SalaoComplete = () => {
  const services = [
    { name: "Corte Feminino", price: "R$ 80", duration: "45 min", icon: "✂️" },
    { name: "Coloração", price: "R$ 150", duration: "2h", icon: "🎨" },
    { name: "Escova", price: "R$ 60", duration: "40 min", icon: "💇" },
    { name: "Manicure", price: "R$ 45", duration: "30 min", icon: "💅" },
    { name: "Pedicure", price: "R$ 55", duration: "40 min", icon: "🦶" },
    { name: "Hidratação", price: "R$ 90", duration: "1h", icon: "💧" },
  ];

  const testimonials = [
    { name: "Carolina M.", text: "Melhor salão da cidade! Sempre saio renovada.", rating: 5 },
    { name: "Juliana S.", text: "Profissionais incríveis e ambiente super aconchegante.", rating: 5 },
    { name: "Amanda L.", text: "Meu cabelo nunca esteve tão bonito. Recomendo!", rating: 5 },
  ];

  return (
    <div className="min-h-screen bg-[#fdf8f6] text-[#2d2d2d] overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-rose-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center">
              <Scissors className="w-5 h-5 text-white" />
            </div>
            <span className="font-serif text-xl font-semibold text-rose-600">Belle Salon</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm text-gray-600 hover:text-rose-500 transition-colors">Início</a>
            <a href="#" className="text-sm text-gray-600 hover:text-rose-500 transition-colors">Serviços</a>
            <a href="#" className="text-sm text-gray-600 hover:text-rose-500 transition-colors">Galeria</a>
            <a href="#" className="text-sm text-gray-600 hover:text-rose-500 transition-colors">Contato</a>
          </nav>
          <button className="px-5 py-2.5 bg-gradient-to-r from-rose-400 to-pink-500 text-white text-sm font-medium rounded-full hover:shadow-lg hover:shadow-rose-200 transition-all">
            Agendar
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-rose-200 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-30" />
        
        <div className="max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-rose-500" />
              <span className="text-sm text-rose-600 font-medium">Beleza & Bem-estar</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6">
              Realce sua{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-500">
                beleza natural
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Um espaço dedicado a você, onde cada detalhe foi pensado para proporcionar 
              momentos de cuidado, relaxamento e transformação.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-rose-400 to-pink-500 text-white font-medium rounded-full hover:shadow-xl hover:shadow-rose-200 transition-all">
                Agendar Agora
              </button>
              <button className="px-8 py-4 border-2 border-rose-300 text-rose-500 font-medium rounded-full hover:bg-rose-50 transition-all">
                Ver Serviços
              </button>
            </div>

            <div className="flex items-center gap-8 mt-10">
              <div className="text-center">
                <div className="text-3xl font-bold text-rose-500">500+</div>
                <div className="text-sm text-gray-500">Clientes Felizes</div>
              </div>
              <div className="w-px h-12 bg-rose-200" />
              <div className="text-center">
                <div className="text-3xl font-bold text-rose-500">10</div>
                <div className="text-sm text-gray-500">Anos de Experiência</div>
              </div>
              <div className="w-px h-12 bg-rose-200" />
              <div className="text-center">
                <div className="flex items-center gap-1 justify-center text-3xl font-bold text-rose-500">
                  <Star className="w-6 h-6 fill-current" /> 4.9
                </div>
                <div className="text-sm text-gray-500">Avaliação</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-rose-200 to-pink-300 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-8xl opacity-30">💇‍♀️</div>
              </div>
              {/* Floating cards */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-rose-500" />
                  </div>
                  <div>
                    <div className="font-medium">Ambiente Acolhedor</div>
                    <div className="text-sm text-gray-500">Relaxe e se sinta em casa</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-rose-500 font-medium">Nossos Serviços</span>
            <h2 className="text-4xl font-serif font-bold mt-2 mb-4">
              Tratamentos Exclusivos
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Conheça nossa linha completa de serviços para cabelo, unhas e estética
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl border border-rose-100 hover:border-rose-300 hover:shadow-lg hover:shadow-rose-100 transition-all group cursor-pointer"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-rose-500 transition-colors">
                  {service.name}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {service.duration}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-rose-500">{service.price}</span>
                  <button className="px-4 py-2 text-sm text-rose-500 border border-rose-300 rounded-full hover:bg-rose-50 transition-colors">
                    Agendar
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-rose-500 font-medium">Depoimentos</span>
            <h2 className="text-4xl font-serif font-bold mt-2">
              O Que Dizem Nossas Clientes
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white rounded-2xl shadow-sm"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <div className="font-medium text-rose-600">{testimonial.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-gradient-to-br from-rose-400 to-pink-500 rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-serif font-bold mb-4">
              Agende Seu Horário
            </h2>
            <p className="text-rose-100 mb-8 max-w-xl mx-auto">
              Entre em contato conosco e marque seu momento de cuidado e beleza
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>Rua das Flores, 123</span>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="w-5 h-5" />
                <span>@bellesalon</span>
              </div>
            </div>
            <button className="px-8 py-4 bg-white text-rose-500 font-medium rounded-full hover:shadow-xl transition-all">
              Agendar pelo WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-rose-50 border-t border-rose-100">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-500 text-sm">
          © 2024 Belle Salon. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

export default SalaoComplete;
