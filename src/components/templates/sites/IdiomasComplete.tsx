import React from 'react';
import { Globe, MessageCircle, Users, Award, Clock, Star, Check, Play, ArrowRight, Headphones, BookOpen, Video, ChevronRight, Instagram, Facebook, Youtube, Linkedin } from 'lucide-react';

const IdiomasComplete = () => {
  const languages = [
    { name: 'Inglês', flag: '🇺🇸', students: '25K+', level: 'Do básico ao avançado' },
    { name: 'Espanhol', flag: '🇪🇸', students: '12K+', level: 'Do básico ao avançado' },
    { name: 'Francês', flag: '🇫🇷', students: '8K+', level: 'Do básico ao intermediário' },
    { name: 'Alemão', flag: '🇩🇪', students: '5K+', level: 'Do básico ao intermediário' },
    { name: 'Italiano', flag: '🇮🇹', students: '4K+', level: 'Do básico ao intermediário' },
    { name: 'Japonês', flag: '🇯🇵', students: '6K+', level: 'Do básico ao intermediário' },
  ];

  const methods = [
    { icon: MessageCircle, title: 'Conversação Real', desc: 'Pratique com falantes nativos desde a primeira aula' },
    { icon: Headphones, title: 'Imersão Total', desc: 'Áudios e vídeos autênticos do dia a dia' },
    { icon: BookOpen, title: 'Gramática Contextual', desc: 'Aprenda regras através de situações reais' },
    { icon: Video, title: 'Aulas Ao Vivo', desc: 'Interaja em tempo real com professores' },
  ];

  const plans = [
    { name: 'Individual', price: 'R$ 197', period: '/mês', features: ['1 idioma', 'Aulas individuais', 'Material incluso', 'App exclusivo'], popular: false },
    { name: 'Duo', price: 'R$ 297', period: '/mês', features: ['2 idiomas', 'Aulas em grupo', 'Material incluso', 'App exclusivo', 'Certificado'], popular: true },
    { name: 'Família', price: 'R$ 397', period: '/mês', features: ['Até 4 pessoas', 'Todos os idiomas', 'Aulas ilimitadas', 'App exclusivo', 'Certificado', 'Suporte VIP'], popular: false },
  ];

  const testimonials = [
    { name: 'Carolina Mendes', text: 'Em 6 meses já estava conversando fluentemente em inglês!', lang: 'Inglês', avatar: '👩' },
    { name: 'Ricardo Santos', text: 'O método é incrível. Aprendi espanhol de forma natural e divertida.', lang: 'Espanhol', avatar: '👨' },
    { name: 'Juliana Costa', text: 'Finalmente consegui realizar o sonho de falar francês. Merci!', lang: 'Francês', avatar: '👩‍🦰' },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans">
      {/* Header */}
      <header className="fixed w-full bg-white/95 backdrop-blur-xl z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Polyglot</span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#idiomas" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Idiomas</a>
              <a href="#metodo" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Método</a>
              <a href="#planos" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Planos</a>
              <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Para Empresas</a>
            </nav>

            <div className="flex items-center gap-4">
              <button className="text-sm text-gray-600 hover:text-gray-900">Entrar</button>
              <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
                Aula Grátis
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-24 overflow-hidden relative bg-gradient-to-b from-blue-50 to-white">
        <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-blue-200 rounded-full blur-[150px] opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-200 rounded-full blur-[150px] opacity-40"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full text-blue-700 text-sm mb-6">
                <Star className="w-4 h-4 fill-current" /> Método mais eficaz do Brasil
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Fale um novo<br />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">idioma</span> em<br />
                menos tempo
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
                Aprenda idiomas de forma natural e divertida. Conversação desde o primeiro dia, com professores nativos e tecnologia inteligente.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-medium hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-600/30">
                  Agendar Aula Grátis <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-full font-medium hover:bg-gray-50 transition-all flex items-center gap-2">
                  <Play className="w-5 h-5" /> Como Funciona
                </button>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex -space-x-3">
                  {languages.slice(0, 5).map((lang, i) => (
                    <div key={i} className="w-10 h-10 bg-white rounded-full border-2 border-white shadow-md flex items-center justify-center text-xl">
                      {lang.flag}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">6 idiomas disponíveis</p>
                  <p className="text-sm text-gray-500">+50 mil alunos ativos</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-[3rem] blur-3xl"></div>
              <div className="relative grid grid-cols-2 gap-4">
                {languages.slice(0, 4).map((lang, idx) => (
                  <div key={idx} className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer ${idx === 1 ? 'mt-8' : ''} ${idx === 3 ? 'mt-8' : ''}`}>
                    <span className="text-4xl mb-3 block">{lang.flag}</span>
                    <h3 className="font-semibold text-gray-900">{lang.name}</h3>
                    <p className="text-sm text-gray-500">{lang.students} alunos</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Languages */}
      <section id="idiomas" className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-blue-600 text-sm font-medium tracking-wider">IDIOMAS</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-3 mb-4">Escolha seu próximo idioma</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Oferecemos os idiomas mais requisitados pelo mercado de trabalho e para viagens internacionais.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {languages.map((lang, idx) => (
              <div key={idx} className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/10 transition-all cursor-pointer text-center">
                <span className="text-5xl mb-4 block group-hover:scale-110 transition-transform">{lang.flag}</span>
                <h3 className="font-semibold text-gray-900 mb-1">{lang.name}</h3>
                <p className="text-xs text-gray-500">{lang.students} alunos</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Method */}
      <section id="metodo" className="py-24 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-blue-200 text-sm tracking-wider">NOSSO MÉTODO</span>
            <h2 className="text-4xl font-bold mt-3 mb-4">Aprendizado que funciona</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">Combinamos tecnologia e metodologia exclusiva para você alcançar a fluência mais rápido.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {methods.map((method, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <method.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{method.title}</h3>
                <p className="text-blue-100 text-sm">{method.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section id="planos" className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-blue-600 text-sm font-medium tracking-wider">PLANOS</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-3 mb-4">Invista no seu futuro</h2>
            <p className="text-gray-600">Escolha o plano ideal para você ou sua família.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, idx) => (
              <div key={idx} className={`relative rounded-3xl p-8 ${plan.popular ? 'bg-gradient-to-b from-blue-600 to-indigo-700 text-white shadow-2xl shadow-blue-500/30 scale-105' : 'bg-white border border-gray-100'}`}>
                {plan.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-black px-4 py-1 rounded-full text-xs font-bold">
                    MAIS POPULAR
                  </span>
                )}
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className={plan.popular ? 'text-blue-200' : 'text-gray-400'}>{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-2 text-sm">
                      <Check className={`w-4 h-4 ${plan.popular ? 'text-blue-200' : 'text-blue-600'}`} />
                      <span className={plan.popular ? 'text-white' : 'text-gray-600'}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-full font-medium transition-all ${plan.popular ? 'bg-white text-blue-600 hover:bg-blue-50' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                  Começar Agora
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-blue-600 text-sm font-medium tracking-wider">DEPOIMENTOS</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-3">Histórias de sucesso</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center text-2xl">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{t.name}</p>
                    <p className="text-blue-600 text-sm">Aluno de {t.lang}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Comece sua jornada hoje</h2>
          <p className="text-gray-400 text-xl mb-10">Agende sua aula experimental gratuita e descubra como é fácil aprender um novo idioma.</p>
          <button className="bg-blue-600 text-white px-10 py-4 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30">
            Agendar Aula Grátis
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Globe className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold">Polyglot</span>
              </div>
              <p className="text-gray-400 text-sm">Conectando pessoas através de idiomas desde 2015.</p>
              <div className="flex gap-4 mt-6">
                <a href="#" className="text-gray-400 hover:text-blue-400"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-blue-400"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-blue-400"><Youtube className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-blue-400"><Linkedin className="w-5 h-5" /></a>
              </div>
            </div>
            <div>
              <h5 className="font-medium mb-4">Idiomas</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Inglês</a></li>
                <li><a href="#" className="hover:text-white">Espanhol</a></li>
                <li><a href="#" className="hover:text-white">Francês</a></li>
                <li><a href="#" className="hover:text-white">Alemão</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-4">Empresa</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Sobre</a></li>
                <li><a href="#" className="hover:text-white">Carreiras</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contato</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-4">Suporte</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white">Termos</a></li>
                <li><a href="#" className="hover:text-white">Privacidade</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            <p>© 2024 Polyglot. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IdiomasComplete;
