import React from 'react';
import { BookOpen, Play, Award, Users, Clock, Star, CheckCircle, ArrowRight, Monitor, Smartphone, Download, Infinity, ChevronRight, Instagram, Youtube, Linkedin } from 'lucide-react';

const CursosOnlineComplete = () => {
  const courses = [
    { title: 'Marketing Digital Completo', instructor: 'Ana Silva', students: '12.5K', rating: 4.9, price: 'R$ 197', oldPrice: 'R$ 497', tag: 'Best Seller' },
    { title: 'Programação do Zero', instructor: 'Carlos Mendes', students: '8.2K', rating: 4.8, price: 'R$ 297', oldPrice: 'R$ 597', tag: 'Novo' },
    { title: 'Design UX/UI Profissional', instructor: 'Marina Costa', students: '6.8K', rating: 4.9, price: 'R$ 247', oldPrice: 'R$ 547', tag: '' },
    { title: 'Excel Avançado', instructor: 'Pedro Santos', students: '15.3K', rating: 4.7, price: 'R$ 97', oldPrice: 'R$ 297', tag: 'Popular' },
  ];

  const categories = [
    { name: 'Tecnologia', courses: 45, icon: '💻' },
    { name: 'Marketing', courses: 32, icon: '📊' },
    { name: 'Design', courses: 28, icon: '🎨' },
    { name: 'Negócios', courses: 38, icon: '💼' },
    { name: 'Finanças', courses: 22, icon: '💰' },
    { name: 'Idiomas', courses: 18, icon: '🌍' },
  ];

  const features = [
    { icon: Infinity, title: 'Acesso Vitalício', desc: 'Estude no seu ritmo, para sempre' },
    { icon: Monitor, title: 'Aulas em HD', desc: 'Qualidade máxima de vídeo' },
    { icon: Smartphone, title: 'Aprenda Offline', desc: 'Baixe e assista onde quiser' },
    { icon: Award, title: 'Certificado', desc: 'Reconhecido pelo mercado' },
  ];

  const stats = [
    { value: '500K+', label: 'Alunos' },
    { value: '200+', label: 'Cursos' },
    { value: '50+', label: 'Instrutores' },
    { value: '4.8', label: 'Avaliação' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="fixed w-full bg-white/95 backdrop-blur-xl z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">EduPro</span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#cursos" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">Cursos</a>
              <a href="#categorias" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">Categorias</a>
              <a href="#" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">Para Empresas</a>
              <a href="#" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">Seja Instrutor</a>
            </nav>

            <div className="flex items-center gap-4">
              <button className="text-sm text-gray-600 hover:text-gray-900">Entrar</button>
              <button className="bg-emerald-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-emerald-700 transition-colors">
                Começar Grátis
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 overflow-hidden relative">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-emerald-100 rounded-full blur-[100px] opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full text-emerald-700 text-sm mb-6">
                <Play className="w-4 h-4" /> +500 mil alunos transformados
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Aprenda as<br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">habilidades</span><br />
                do futuro
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
                Cursos online de alta qualidade com os melhores profissionais do mercado. Aprenda no seu ritmo e conquiste seus objetivos.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <button className="bg-emerald-600 text-white px-8 py-4 rounded-full font-medium hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-lg shadow-emerald-600/30">
                  Explorar Cursos <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-full font-medium hover:bg-gray-50 transition-all">
                  Ver Planos
                </button>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full border-2 border-white"></div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-gray-900">4.8</span>
                    <span className="text-gray-500">(50K+ avaliações)</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white rounded-3xl p-6 shadow-2xl shadow-emerald-500/10 border border-gray-100">
                <div className="aspect-video bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Marketing Digital Completo</h3>
                <p className="text-sm text-gray-500 mb-4">Ana Silva • 45 horas de conteúdo</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">4.9</span>
                    <span className="text-sm text-gray-400">(12.5K)</span>
                  </div>
                  <span className="text-emerald-600 font-bold">R$ 197</span>
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
                <p className="text-4xl font-bold text-emerald-600">{stat.value}</p>
                <p className="text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categorias" className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-emerald-600 text-sm font-medium tracking-wider">CATEGORIAS</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-3">Explore por área de interesse</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, idx) => (
              <div key={idx} className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-500/10 transition-all cursor-pointer text-center">
                <span className="text-4xl block mb-3">{cat.icon}</span>
                <h3 className="font-semibold text-gray-900 mb-1">{cat.name}</h3>
                <p className="text-sm text-gray-500">{cat.courses} cursos</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section id="cursos" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-emerald-600 text-sm font-medium tracking-wider">CURSOS EM DESTAQUE</span>
              <h2 className="text-4xl font-bold text-gray-900 mt-3">Os mais populares</h2>
            </div>
            <a href="#" className="text-emerald-600 hover:underline flex items-center gap-1">
              Ver todos <ChevronRight className="w-4 h-4" />
            </a>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, idx) => (
              <div key={idx} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-emerald-500/10 transition-all">
                <div className="relative aspect-video bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                  {course.tag && (
                    <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${course.tag === 'Best Seller' ? 'bg-orange-500 text-white' : course.tag === 'Novo' ? 'bg-blue-500 text-white' : 'bg-emerald-500 text-white'}`}>
                      {course.tag}
                    </span>
                  )}
                  <Play className="w-12 h-12 text-white/80 group-hover:scale-110 transition-transform" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">{course.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{course.instructor}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-gray-500">{course.students} alunos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-900">{course.price}</span>
                    <span className="text-sm text-gray-400 line-through">{course.oldPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-emerald-600 text-sm font-medium tracking-wider">DIFERENCIAIS</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-3 mb-4">Por que escolher a EduPro?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">A melhor plataforma de cursos online do Brasil, com conteúdo de qualidade e suporte completo.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-emerald-600 transition-colors">
                  <feature.icon className="w-8 h-8 text-emerald-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Comece sua jornada de aprendizado hoje</h2>
          <p className="text-emerald-100 text-xl mb-10">Acesse todos os cursos por uma assinatura mensal. Cancele quando quiser.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-emerald-700 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all">
              Começar 7 Dias Grátis
            </button>
            <button className="border-2 border-white/30 px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-all">
              Ver Planos
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold">EduPro</span>
              </div>
              <p className="text-gray-400 text-sm">Transformando vidas através da educação online.</p>
              <div className="flex gap-4 mt-6">
                <a href="#" className="text-gray-400 hover:text-emerald-400"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-emerald-400"><Youtube className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-emerald-400"><Linkedin className="w-5 h-5" /></a>
              </div>
            </div>
            <div>
              <h5 className="font-medium mb-4">Categorias</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Tecnologia</a></li>
                <li><a href="#" className="hover:text-white">Marketing</a></li>
                <li><a href="#" className="hover:text-white">Design</a></li>
                <li><a href="#" className="hover:text-white">Negócios</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-4">Suporte</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white">Contato</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-4">Legal</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-white">Privacidade</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            <p>© 2024 EduPro. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CursosOnlineComplete;
