import React from 'react';
import { Sparkles, Zap, Shield, BarChart3, Users, Globe, Check, ArrowRight, Play, Star, ChevronRight, Github, Twitter, Linkedin } from 'lucide-react';

const StartupSaasComplete = () => {
  const features = [
    { icon: Zap, title: 'Ultra Rápido', desc: 'Performance otimizada para escalar com seu negócio' },
    { icon: Shield, title: 'Seguro', desc: 'Criptografia de ponta e conformidade LGPD' },
    { icon: BarChart3, title: 'Analytics', desc: 'Insights poderosos para decisões inteligentes' },
    { icon: Users, title: 'Colaborativo', desc: 'Ferramentas para equipes trabalharem juntas' },
    { icon: Globe, title: 'Global', desc: 'Infraestrutura distribuída mundialmente' },
    { icon: Sparkles, title: 'IA Integrada', desc: 'Automação inteligente em cada etapa' },
  ];

  const plans = [
    { name: 'Starter', price: 'R$ 49', period: '/mês', features: ['5 projetos', '10GB storage', 'Email support', 'Basic analytics'], popular: false },
    { name: 'Pro', price: 'R$ 149', period: '/mês', features: ['Projetos ilimitados', '100GB storage', 'Priority support', 'Advanced analytics', 'API access', 'Team collaboration'], popular: true },
    { name: 'Enterprise', price: 'Custom', period: '', features: ['Tudo do Pro', 'Storage ilimitado', 'Dedicated support', 'Custom integrations', 'SLA garantido', 'On-premise option'], popular: false },
  ];

  const testimonials = [
    { name: 'Maria Silva', role: 'CEO, TechStart', text: 'Aumentamos nossa produtividade em 300% após migrar para a plataforma.' },
    { name: 'João Santos', role: 'CTO, InnovateBR', text: 'A melhor decisão que tomamos para nossa stack de tecnologia.' },
    { name: 'Ana Costa', role: 'PM, ScaleUp', text: 'Interface intuitiva e suporte excepcional. Recomendo fortemente.' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-white">
      {/* Header */}
      <header className="fixed w-full bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Nexus</span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-slate-400 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-sm text-slate-400 hover:text-white transition-colors">Pricing</a>
              <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Docs</a>
              <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Blog</a>
            </nav>

            <div className="flex items-center gap-4">
              <button className="text-sm text-slate-400 hover:text-white transition-colors">Login</button>
              <button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-2 rounded-full text-sm font-medium hover:shadow-lg hover:shadow-violet-500/30 transition-all">
                Começar Grátis
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/20 via-slate-950 to-slate-950"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-full blur-[100px]"></div>
        
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700/50 px-4 py-2 rounded-full text-sm mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-slate-300">v2.0 disponível agora</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            A plataforma que<br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              acelera seu futuro
            </span>
          </h1>
          
          <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Construa, escale e gerencie aplicações modernas com a infraestrutura mais avançada do mercado. Simples para começar, poderoso para crescer.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 rounded-full font-medium hover:shadow-lg hover:shadow-violet-500/30 transition-all flex items-center gap-2 w-full sm:w-auto justify-center">
              Começar Gratuitamente <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border border-slate-700 px-8 py-4 rounded-full font-medium hover:bg-slate-800 transition-all flex items-center gap-2 w-full sm:w-auto justify-center">
              <Play className="w-5 h-5" /> Ver Demo
            </button>
          </div>
          
          <div className="flex items-center justify-center gap-8 mt-12 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" /> Sem cartão necessário
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" /> Setup em 5 minutos
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" /> Cancele quando quiser
            </div>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="max-w-6xl mx-auto px-4 mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 pointer-events-none"></div>
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 shadow-2xl shadow-violet-500/10">
            <div className="flex gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📊</div>
                <p className="text-slate-500">Dashboard Preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className="py-16 border-y border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-slate-500 text-sm mb-8">Empresas que confiam em nós</p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-50">
            {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple'].map((company) => (
              <span key={company} className="text-2xl font-bold text-slate-600">{company}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-violet-400 text-sm tracking-wider">FEATURES</span>
            <h2 className="text-4xl font-bold mt-3 mb-4">Tudo que você precisa</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Uma plataforma completa com todas as ferramentas para construir produtos incríveis.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="group p-6 bg-slate-900/50 rounded-2xl border border-slate-800 hover:border-violet-500/50 transition-all">
                <div className="w-12 h-12 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:from-violet-500/30 group-hover:to-fuchsia-500/30 transition-all">
                  <feature.icon className="w-6 h-6 text-violet-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-violet-400 text-sm tracking-wider">PRICING</span>
            <h2 className="text-4xl font-bold mt-3 mb-4">Planos para cada etapa</h2>
            <p className="text-slate-400">Comece grátis, escale quando precisar.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, idx) => (
              <div key={idx} className={`relative p-8 rounded-2xl border ${plan.popular ? 'bg-gradient-to-b from-violet-500/10 to-fuchsia-500/10 border-violet-500/50' : 'bg-slate-900 border-slate-800'}`}>
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-1 rounded-full text-xs font-medium">
                    Mais Popular
                  </span>
                )}
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-slate-400">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-2 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-violet-400" /> {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-full font-medium transition-all ${plan.popular ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:shadow-lg hover:shadow-violet-500/30' : 'border border-slate-700 hover:bg-slate-800'}`}>
                  Começar Agora
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-violet-400 text-sm tracking-wider">TESTIMONIALS</span>
            <h2 className="text-4xl font-bold mt-3">O que dizem sobre nós</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-sm">{t.name}</p>
                    <p className="text-slate-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Pronto para começar?</h2>
          <p className="text-slate-400 text-xl mb-10">Junte-se a milhares de empresas que já transformaram seus negócios.</p>
          <button className="bg-white text-slate-900 px-10 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-white/20 transition-all">
            Começar Gratuitamente
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-xl font-bold">Nexus</span>
              </div>
              <p className="text-slate-500 text-sm">Construindo o futuro da tecnologia.</p>
              <div className="flex gap-4 mt-6">
                <a href="#" className="text-slate-500 hover:text-violet-400"><Github className="w-5 h-5" /></a>
                <a href="#" className="text-slate-500 hover:text-violet-400"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="text-slate-500 hover:text-violet-400"><Linkedin className="w-5 h-5" /></a>
              </div>
            </div>
            <div>
              <h5 className="font-medium mb-4">Produto</h5>
              <ul className="space-y-2 text-slate-500 text-sm">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Changelog</a></li>
                <li><a href="#" className="hover:text-white">Roadmap</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-4">Recursos</h5>
              <ul className="space-y-2 text-slate-500 text-sm">
                <li><a href="#" className="hover:text-white">Docs</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Community</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-4">Legal</h5>
              <ul className="space-y-2 text-slate-500 text-sm">
                <li><a href="#" className="hover:text-white">Privacidade</a></li>
                <li><a href="#" className="hover:text-white">Termos</a></li>
                <li><a href="#" className="hover:text-white">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
            <p>© 2024 Nexus. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StartupSaasComplete;
