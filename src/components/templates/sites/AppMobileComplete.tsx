import React from 'react';
import { Smartphone, Download, Star, Check, ArrowRight, Play, Shield, Zap, Heart, Bell, MapPin, ChevronRight, Apple, Instagram, Twitter, Facebook } from 'lucide-react';

const AppMobileComplete = () => {
  const features = [
    { icon: Zap, title: 'Super Rápido', desc: 'Performance nativa em todas as plataformas' },
    { icon: Shield, title: 'Seguro', desc: 'Seus dados protegidos com criptografia de ponta' },
    { icon: Bell, title: 'Notificações Smart', desc: 'Alertas inteligentes e personalizados' },
    { icon: MapPin, title: 'Offline Mode', desc: 'Funciona mesmo sem internet' },
  ];

  const stats = [
    { value: '4.9', label: 'App Store' },
    { value: '2M+', label: 'Downloads' },
    { value: '50+', label: 'Países' },
    { value: '24/7', label: 'Suporte' },
  ];

  const reviews = [
    { name: 'Ana Paula', text: 'O melhor app que já usei! Interface linda e super fácil.', rating: 5 },
    { name: 'Carlos Mendes', text: 'Revolucionou minha rotina. Recomendo muito!', rating: 5 },
    { name: 'Juliana Costa', text: 'Simplesmente perfeito. 5 estrelas merecidas.', rating: 5 },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="fixed w-full bg-white/80 backdrop-blur-xl z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center rotate-12">
                <Heart className="w-5 h-5 text-white -rotate-12" />
              </div>
              <span className="text-xl font-bold text-gray-900">Flowy</span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-gray-600 hover:text-gray-900">Features</a>
              <a href="#reviews" className="text-sm text-gray-600 hover:text-gray-900">Reviews</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Preços</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Suporte</a>
            </nav>

            <button className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" /> Download
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 overflow-hidden relative">
        <div className="absolute top-40 left-1/4 w-96 h-96 bg-indigo-200 rounded-full blur-[100px] opacity-50"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-200 rounded-full blur-[100px] opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full text-sm text-indigo-700 mb-6">
                <Star className="w-4 h-4 fill-current" /> App do Ano 2024
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Sua vida mais<br />
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">organizada</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
                O app que transforma seu dia a dia. Organize tarefas, crie hábitos e alcance seus objetivos de forma simples e intuitiva.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <button className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-medium hover:bg-gray-800 transition-all flex items-center gap-3 shadow-lg shadow-gray-900/20">
                  <Apple className="w-6 h-6" />
                  <div className="text-left">
                    <span className="text-xs text-gray-400 block">Download on</span>
                    <span className="text-sm font-semibold">App Store</span>
                  </div>
                </button>
                <button className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-medium hover:bg-gray-800 transition-all flex items-center gap-3 shadow-lg shadow-gray-900/20">
                  <Play className="w-6 h-6" />
                  <div className="text-left">
                    <span className="text-xs text-gray-400 block">Get it on</span>
                    <span className="text-sm font-semibold">Google Play</span>
                  </div>
                </button>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full border-2 border-white"></div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">+2M usuários ativos</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-[3rem] blur-3xl"></div>
              <div className="relative flex justify-center">
                <div className="w-72 h-[580px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl shadow-gray-900/30 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2.5rem] flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-8xl mb-4">📱</div>
                      <p className="text-sm opacity-80">Preview do App</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{stat.value}</p>
                <p className="text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-indigo-600 text-sm font-medium tracking-wider">FEATURES</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-3 mb-4">Por que escolher o Flowy?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Recursos pensados para facilitar sua vida e aumentar sua produtividade.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-xl hover:shadow-indigo-500/10 transition-all group">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Preview */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 to-purple-700 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Interface intuitiva que você vai amar</h2>
              <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
                Design pensado em cada detalhe para proporcionar a melhor experiência. Navegação fluida, cores harmoniosas e funcionalidades na ponta dos dedos.
              </p>
              <ul className="space-y-4">
                {['Dark mode automático', 'Gestos personalizáveis', 'Widgets na home screen', 'Sincronização em nuvem'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-indigo-200" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-white/20 rounded-[3rem] blur-xl"></div>
                <div className="relative w-64 h-[520px] bg-gray-900 rounded-[2.5rem] p-2">
                  <div className="w-full h-full bg-gray-800 rounded-[2.2rem] flex items-center justify-center">
                    <span className="text-6xl">✨</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-indigo-600 text-sm font-medium tracking-wider">REVIEWS</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-3 mb-4">O que nossos usuários dizem</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, idx) => (
              <div key={idx} className="p-6 bg-gray-50 rounded-2xl">
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full"></div>
                  <span className="font-medium text-gray-900">{review.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Baixe agora e comece sua transformação</h2>
          <p className="text-gray-400 text-xl mb-10">Disponível para iOS e Android. Totalmente grátis para começar.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-medium hover:bg-gray-100 transition-all flex items-center gap-3">
              <Apple className="w-6 h-6" /> App Store
            </button>
            <button className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-medium hover:bg-gray-100 transition-all flex items-center gap-3">
              <Play className="w-6 h-6" /> Google Play
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center rotate-12">
                  <Heart className="w-4 h-4 text-white -rotate-12" />
                </div>
                <span className="text-lg font-bold text-gray-900">Flowy</span>
              </div>
              <p className="text-gray-500 text-sm">Organize sua vida de forma simples.</p>
              <div className="flex gap-4 mt-6">
                <a href="#" className="text-gray-400 hover:text-indigo-600"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-indigo-600"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-indigo-600"><Facebook className="w-5 h-5" /></a>
              </div>
            </div>
            <div>
              <h5 className="font-medium text-gray-900 mb-4">Produto</h5>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-gray-900">Features</a></li>
                <li><a href="#" className="hover:text-gray-900">Preços</a></li>
                <li><a href="#" className="hover:text-gray-900">Download</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-gray-900 mb-4">Suporte</h5>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-gray-900">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-gray-900">Contato</a></li>
                <li><a href="#" className="hover:text-gray-900">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-gray-900 mb-4">Legal</h5>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-gray-900">Privacidade</a></li>
                <li><a href="#" className="hover:text-gray-900">Termos</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-gray-500 text-sm">
            <p>© 2024 Flowy. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppMobileComplete;
