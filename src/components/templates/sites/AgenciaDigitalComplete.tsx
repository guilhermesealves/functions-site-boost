import React from 'react';
import { Palette, Code, Rocket, TrendingUp, Users, Award, ArrowRight, Play, Star, CheckCircle, Instagram, Linkedin, Dribbble, Github } from 'lucide-react';

const AgenciaDigitalComplete = () => {
  const services = [
    { icon: Palette, title: 'UI/UX Design', desc: 'Interfaces que encantam e convertem' },
    { icon: Code, title: 'Desenvolvimento', desc: 'Código limpo e performático' },
    { icon: TrendingUp, title: 'Marketing Digital', desc: 'Estratégias que geram resultados' },
    { icon: Rocket, title: 'Branding', desc: 'Marcas memoráveis e autênticas' },
  ];

  const projects = [
    { name: 'Fintech App', category: 'UI/UX + Dev', color: 'from-blue-500 to-cyan-400' },
    { name: 'E-commerce Fashion', category: 'Full Stack', color: 'from-pink-500 to-rose-400' },
    { name: 'SaaS Dashboard', category: 'Product Design', color: 'from-violet-500 to-purple-400' },
    { name: 'Startup Branding', category: 'Brand Identity', color: 'from-orange-500 to-amber-400' },
  ];

  const stats = [
    { value: '150+', label: 'Projetos Entregues' },
    { value: '50+', label: 'Clientes Ativos' },
    { value: '12', label: 'Anos de Mercado' },
    { value: '98%', label: 'Taxa de Satisfação' },
  ];

  const team = [
    { name: 'Lucas Silva', role: 'CEO & Founder', emoji: '👨‍💼' },
    { name: 'Marina Costa', role: 'Creative Director', emoji: '👩‍🎨' },
    { name: 'Rafael Santos', role: 'Tech Lead', emoji: '👨‍💻' },
    { name: 'Ana Oliveira', role: 'Marketing Head', emoji: '👩‍💼' },
  ];

  return (
    <div className="min-h-screen bg-black font-sans text-white">
      {/* Header */}
      <header className="fixed w-full bg-black/80 backdrop-blur-xl z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-xl">Ø</span>
              </div>
              <span className="text-xl font-bold">Orbit</span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-sm text-gray-400 hover:text-white transition-colors">Serviços</a>
              <a href="#work" className="text-sm text-gray-400 hover:text-white transition-colors">Portfólio</a>
              <a href="#team" className="text-sm text-gray-400 hover:text-white transition-colors">Time</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Blog</a>
            </nav>

            <button className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
              Fale Conosco
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="min-h-screen flex items-center relative overflow-hidden pt-20">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[150px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 border border-white/20 px-4 py-2 rounded-full text-sm mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Vagas abertas — Estamos contratando!
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-[0.9]">
              Criamos<br />
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                experiências
              </span><br />
              digitais únicas
            </h1>
            
            <p className="text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
              Somos uma agência full-service especializada em transformar ideias em produtos digitais de alto impacto. Design, tecnologia e estratégia para sua marca decolar.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-200 transition-all flex items-center gap-2">
                Iniciar Projeto <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border border-white/30 px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-all flex items-center gap-2">
                <Play className="w-5 h-5" /> Ver Showreel
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">{stat.value}</p>
                <p className="text-gray-500 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm tracking-widest">SERVIÇOS</span>
            <h2 className="text-5xl font-bold mt-4">O que fazemos de melhor</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="group p-8 bg-white/5 rounded-3xl border border-white/10 hover:border-cyan-400/50 transition-all hover:bg-white/10">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-400">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="py-24 bg-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-purple-400 text-sm tracking-widest">PORTFÓLIO</span>
              <h2 className="text-5xl font-bold mt-4">Trabalhos selecionados</h2>
            </div>
            <a href="#" className="text-gray-400 hover:text-white flex items-center gap-2">
              Ver todos <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className={`aspect-[4/3] bg-gradient-to-br ${project.color} rounded-3xl mb-6 flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500`}>
                  <span className="text-8xl">🖥️</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-semibold">{project.name}</h3>
                    <p className="text-gray-500">{project.category}</p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-500 group-hover:text-white group-hover:translate-x-2 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-pink-400 text-sm tracking-widest">TIME</span>
            <h2 className="text-5xl font-bold mt-4">Mentes criativas</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-full flex items-center justify-center text-6xl mb-4 group-hover:scale-110 transition-transform">
                  {member.emoji}
                </div>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-gray-500 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">Vamos criar algo incrível juntos?</h2>
          <p className="text-xl text-gray-400 mb-10">Entre em contato e descubra como podemos transformar sua ideia em realidade.</p>
          <button className="bg-white text-black px-10 py-5 rounded-full font-semibold hover:bg-gray-200 transition-all text-lg">
            Agendar Conversa
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/5 border-t border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold">Ø</span>
                </div>
                <span className="text-lg font-bold">Orbit</span>
              </div>
              <p className="text-gray-500 text-sm">Transformando ideias em experiências digitais desde 2012.</p>
              <div className="flex gap-4 mt-6">
                <a href="#" className="text-gray-500 hover:text-white"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="text-gray-500 hover:text-white"><Linkedin className="w-5 h-5" /></a>
                <a href="#" className="text-gray-500 hover:text-white"><Dribbble className="w-5 h-5" /></a>
                <a href="#" className="text-gray-500 hover:text-white"><Github className="w-5 h-5" /></a>
              </div>
            </div>
            <div>
              <h5 className="font-medium mb-4">Serviços</h5>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-white">UI/UX Design</a></li>
                <li><a href="#" className="hover:text-white">Desenvolvimento</a></li>
                <li><a href="#" className="hover:text-white">Marketing</a></li>
                <li><a href="#" className="hover:text-white">Branding</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-4">Empresa</h5>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-white">Sobre</a></li>
                <li><a href="#" className="hover:text-white">Carreiras</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contato</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-4">Contato</h5>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li>hello@orbitagency.com</li>
                <li>+55 11 99999-9999</li>
                <li>São Paulo, Brasil</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
            <p>© 2024 Orbit Agency. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AgenciaDigitalComplete;
