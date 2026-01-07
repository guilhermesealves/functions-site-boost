import { motion, useScroll, useTransform, useSpring, useMotionValue, useVelocity } from 'framer-motion';
import { Brain, Heart, Sparkles, User, Clock, Shield, MessageCircle, Calendar, ArrowRight, Star, Zap, Wind, Moon, Sun } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const PsicologoCinematic = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Parallax values
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.4, 1], [1, 0.8, 0.3, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  
  // Background color transitions
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ['#0f0f23', '#1a0f2e', '#0f1419', '#1e0a1e', '#0a0a0a']
  );

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const services = [
    {
      title: 'Terapia Individual',
      description: 'Sessões personalizadas focadas no seu crescimento emocional e autoconhecimento profundo',
      icon: User,
      color: '#a78bfa'
    },
    {
      title: 'Ansiedade & Pânico',
      description: 'Tratamento especializado utilizando técnicas de TCC e mindfulness para controle da ansiedade',
      icon: Zap,
      color: '#f472b6'
    },
    {
      title: 'Terapia de Casal',
      description: 'Fortalecimento de vínculos através de comunicação não-violenta e empatia mútua',
      icon: Heart,
      color: '#fb7185'
    },
    {
      title: 'Trauma & EMDR',
      description: 'Processamento de traumas com técnicas avançadas de EMDR e dessensibilização',
      icon: Shield,
      color: '#8b5cf6'
    }
  ];

  const testimonials = [
    {
      text: 'Encontrei não apenas tratamento, mas uma transformação completa da minha forma de ver a vida e lidar com minhas emoções.',
      author: 'Ana Carolina M.',
      role: 'Superou ansiedade generalizada'
    },
    {
      text: 'A abordagem humanizada e as técnicas utilizadas me ajudaram a processar traumas que carregava há anos.',
      author: 'Roberto S.',
      role: 'Tratamento EMDR'
    },
    {
      text: 'Salvou nosso relacionamento. Aprendemos a nos comunicar de verdade e resgatar o que nos uniu.',
      author: 'Juliana & Pedro',
      role: 'Terapia de casal'
    }
  ];

  return (
    <div ref={containerRef} className="relative bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* LIVE BACKGROUND - Animated mesh gradient */}
      <motion.div 
        className="fixed inset-0 -z-10"
        style={{ backgroundColor }}
      >
        {/* Floating orbs that follow scroll */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-30"
          style={{
            background: 'radial-gradient(circle, #9333ea 0%, transparent 70%)',
            x: useTransform(scrollYProgress, [0, 1], [-100, 300]),
            y: useTransform(scrollYProgress, [0, 1], [0, -400]),
            top: '10%',
            left: '10%',
          }}
        />
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full blur-[180px] opacity-20"
          style={{
            background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
            x: useTransform(scrollYProgress, [0, 1], [100, -300]),
            y: useTransform(scrollYProgress, [0, 1], [100, 600]),
            top: '40%',
            right: '10%',
          }}
        />
        <motion.div
          className="absolute w-[700px] h-[700px] rounded-full blur-[200px] opacity-25"
          style={{
            background: 'radial-gradient(circle, #ec4899 0%, transparent 70%)',
            x: useTransform(scrollYProgress, [0, 1], [-200, 200]),
            y: useTransform(scrollYProgress, [0, 1], [200, -200]),
            bottom: '20%',
            left: '30%',
          }}
        />
        
        {/* Noise overlay */}
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          }}
        />
      </motion.div>

      {/* HERO SECTION - Full viewport with aurora effect */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{ y: y1, scale }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-pink-600/20" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-7xl mx-auto px-6 text-center"
        >
          {/* Tiny technical text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-[0.75rem] tracking-[0.3em] text-purple-300/60 uppercase mb-8 font-mono"
          >
            CRP 06/123456 • Psicologia Clínica • TCC & EMDR
          </motion.p>

          {/* MASSIVE typography */}
          <motion.h1
            className="text-[8rem] md:text-[12rem] lg:text-[16rem] leading-[0.85] font-light tracking-tight mb-8"
            style={{ opacity: opacity1 }}
          >
            MENTE
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent font-bold">
              LEVE
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Terapia humanizada e baseada em evidências para você superar desafios
            e encontrar o equilíbrio emocional que merece
          </motion.p>

          {/* Magnetic button */}
          <MagneticButton>
            <span className="flex items-center gap-3 text-lg">
              Agendar Primeira Sessão
              <ArrowRight className="w-5 h-5" />
            </span>
          </MagneticButton>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex flex-col items-center gap-2 text-purple-300/40">
              <span className="text-xs tracking-widest">SCROLL</span>
              <div className="w-[1px] h-16 bg-gradient-to-b from-purple-400/50 to-transparent" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* MANIFESTO - Sticky text section with huge highlighting text */}
      <section className="relative min-h-[200vh] py-32">
        <div className="sticky top-0 h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <motion.div
              className="grid lg:grid-cols-2 gap-16 items-center"
              style={{ y: y2 }}
            >
              {/* Left side - Huge manifesto text */}
              <div className="space-y-8">
                <motion.p
                  className="text-xs tracking-[0.3em] text-purple-300/60 uppercase font-mono"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  [001] — MANIFESTO
                </motion.p>

                <div className="space-y-6">
                  {['SUA', 'JORNADA', 'COMEÇA', 'AQUI'].map((word, i) => (
                    <motion.h2
                      key={word}
                      className="text-[5rem] lg:text-[8rem] leading-none font-black"
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span className={i % 2 === 0 ? 'text-white' : 'bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'}>
                        {word}
                      </span>
                    </motion.h2>
                  ))}
                </div>
              </div>

              {/* Right side - Text content with line-by-line reveal */}
              <div className="space-y-6">
                <TextReveal>
                  Acredito que cada pessoa possui em si a capacidade de transformação.
                  Meu papel não é dar respostas prontas, mas caminhar ao seu lado,
                  oferecendo um espaço seguro onde você pode explorar suas emoções,
                  ressignificar experiências e construir uma vida mais alinhada com
                  quem você realmente é.
                </TextReveal>

                <TextReveal delay={0.2}>
                  Com mais de 15 anos de experiência clínica, utilizo abordagens
                  integradas de TCC, EMDR e técnicas humanizadas, sempre respeitando
                  sua individualidade e ritmo único de crescimento.
                </TextReveal>

                <TextReveal delay={0.4}>
                  Aqui não há julgamentos. Apenas acolhimento, escuta ativa e
                  ferramentas científicas para você se tornar a melhor versão de si mesmo.
                </TextReveal>

                <motion.div
                  className="flex items-center gap-8 pt-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">Dra. Ana Silva</p>
                      <p className="text-xs text-gray-400">Psicóloga Clínica</p>
                    </div>
                  </div>

                  <div className="flex gap-6 text-sm text-gray-400">
                    <div>
                      <p className="text-2xl font-bold text-purple-400">2000+</p>
                      <p className="text-xs">Vidas transformadas</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-pink-400">15+</p>
                      <p className="text-xs">Anos de experiência</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES - Asymmetric masonry layout with spotlight effect */}
      <section className="relative min-h-screen py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-xs tracking-[0.3em] text-purple-300/60 uppercase font-mono mb-4">
              [002] — ESPECIALIDADES
            </p>
            <h2 className="text-[4rem] md:text-[6rem] leading-none font-black">
              <span className="text-white">COMO POSSO</span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                TE AJUDAR
              </span>
            </h2>
          </motion.div>

          {/* Masonry-style asymmetric grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className={`relative group cursor-pointer ${
                  index === 0 ? 'md:col-span-2' : ''
                } ${index === 1 ? 'md:translate-y-12' : ''} ${
                  index === 3 ? 'md:-translate-y-12' : ''
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: index === 1 ? 48 : index === 3 ? -48 : 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Spotlight effect */}
                {hoveredIndex === index && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${service.color}20, transparent 40%)`,
                    }}
                  />
                )}

                <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-3xl p-8 md:p-12 transition-all duration-500 group-hover:border-white/[0.15] overflow-hidden">
                  {/* Icon with distortion effect */}
                  <motion.div
                    className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center"
                    style={{ backgroundColor: `${service.color}20` }}
                    whileHover={{ scale: 1.1, rotate: 5, borderRadius: '50%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <service.icon className="w-8 h-8" style={{ color: service.color }} />
                  </motion.div>

                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{service.description}</p>

                  {/* Arrow that appears on hover */}
                  <motion.div
                    className="absolute bottom-8 right-8"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={hoveredIndex === index ? { opacity: 1, x: 0 } : {}}
                  >
                    <ArrowRight className="w-6 h-6" style={{ color: service.color }} />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HORIZONTAL SCROLL SECTION - Testimonials */}
      <section className="relative min-h-screen py-32">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div
            className="flex gap-8 px-6"
            style={{
              x: useTransform(scrollYProgress, [0.4, 0.7], [0, -2000]),
            }}
          >
            <div className="flex-shrink-0 w-[600px]">
              <p className="text-xs tracking-[0.3em] text-purple-300/60 uppercase font-mono mb-4">
                [003] — DEPOIMENTOS
              </p>
              <h2 className="text-[4rem] leading-none font-black mb-8">
                <span className="text-white">O QUE</span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  DIZEM
                </span>
              </h2>
              <p className="text-gray-400 text-lg">
                Histórias reais de pessoas que encontraram o caminho para o bem-estar →
              </p>
            </div>

            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                className="flex-shrink-0 w-[500px] bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-3xl p-12"
                whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.15)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-purple-400 text-purple-400" />
                  ))}
                </div>

                <p className="text-xl leading-relaxed mb-8 italic text-gray-300">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
                  <div>
                    <p className="font-bold">{testimonial.author}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* VISUAL BREAK - Full screen parallax image */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-pink-900/30"
          style={{ y: y3 }}
        />

        <motion.div
          className="relative z-10 text-center max-w-4xl mx-auto px-6"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <Brain className="w-32 h-32 mx-auto mb-8 text-purple-400" />
          <h2 className="text-[6rem] leading-none font-black mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              TRANSFORMAÇÃO
            </span>
          </h2>
          <p className="text-2xl text-gray-400">
            Sua mente merece cuidado profissional e acolhimento genuíno
          </p>
        </motion.div>
      </section>

      {/* MASSIVE FOOTER - 80vh */}
      <footer className="relative min-h-[80vh] bg-black border-t border-white/[0.05] flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Left - Giant CTA */}
            <div>
              <motion.h2
                className="text-[6rem] md:text-[8rem] leading-none font-black mb-8"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-white">PRONTO</span>
                <br />
                <span className="text-white">PARA</span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  COMEÇAR?
                </span>
              </motion.h2>

              <MagneticButton>
                <span className="flex items-center gap-3 text-xl">
                  <Calendar className="w-6 h-6" />
                  Agendar Consulta
                </span>
              </MagneticButton>
            </div>

            {/* Right - Contact Info */}
            <div className="space-y-12">
              <div>
                <p className="text-xs tracking-[0.3em] text-purple-300/60 uppercase font-mono mb-4">
                  CONTATO
                </p>
                <div className="space-y-4 text-gray-400">
                  <p className="text-2xl">contato@psicologa.com</p>
                  <p className="text-2xl">(11) 98888-8888</p>
                  <p className="text-lg">Av. Paulista, 1000 - Conjunto 805</p>
                </div>
              </div>

              <div>
                <p className="text-xs tracking-[0.3em] text-purple-300/60 uppercase font-mono mb-4">
                  HORÁRIOS
                </p>
                <div className="space-y-2 text-gray-400">
                  <p>Segunda a Sexta: 8h às 20h</p>
                  <p>Sábados: 9h às 14h</p>
                  <p className="text-purple-400 font-semibold">Atendimento Online Disponível</p>
                </div>
              </div>

              <div className="pt-12 border-t border-white/[0.05]">
                <p className="text-sm text-gray-500">
                  © 2026 Dra. Ana Silva • CRP 06/123456 • Psicologia Clínica
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// MAGNETIC BUTTON COMPONENT
const MagneticButton = ({ children }: { children: React.ReactNode }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={buttonRef}
      className="relative px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold text-lg shadow-2xl shadow-purple-500/50 overflow-hidden group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600"
        initial={{ x: '100%' }}
        whileHover={{ x: 0 }}
        transition={{ duration: 0.3 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

// TEXT REVEAL COMPONENT - Line by line animation
const TextReveal = ({ children, delay = 0 }: { children: string; delay?: number }) => {
  return (
    <motion.p
      className="text-lg text-gray-300 leading-relaxed overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.p>
  );
};

export default PsicologoCinematic;
