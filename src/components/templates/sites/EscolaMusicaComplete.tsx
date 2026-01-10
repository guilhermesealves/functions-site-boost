import React from 'react';
import { Music, Mic2, Piano, Guitar, Drum, HeadphonesIcon, Users, Award, Clock, MapPin, Phone, Mail, Star, ChevronRight, Play, Instagram, Facebook, Youtube } from 'lucide-react';

const EscolaMusicaComplete = () => {
  const courses = [
    { icon: Piano, name: 'Piano', level: 'Iniciante a Avançado', duration: '6-24 meses', price: 'R$ 350/mês' },
    { icon: Guitar, name: 'Violão & Guitarra', level: 'Iniciante a Avançado', duration: '6-24 meses', price: 'R$ 300/mês' },
    { icon: Mic2, name: 'Canto', level: 'Todos os níveis', duration: '6-18 meses', price: 'R$ 320/mês' },
    { icon: Drum, name: 'Bateria', level: 'Iniciante a Avançado', duration: '6-24 meses', price: 'R$ 380/mês' },
  ];

  const teachers = [
    { name: 'Prof. Carlos Mendes', instrument: 'Piano & Teoria', exp: '20 anos', emoji: '🎹' },
    { name: 'Prof. Ana Paula', instrument: 'Canto & Técnica Vocal', exp: '15 anos', emoji: '🎤' },
    { name: 'Prof. Ricardo Silva', instrument: 'Violão & Guitarra', exp: '18 anos', emoji: '🎸' },
    { name: 'Prof. Marcos Lima', instrument: 'Bateria & Percussão', exp: '12 anos', emoji: '🥁' },
  ];

  const testimonials = [
    { name: 'Julia Santos', text: 'Sempre sonhei em tocar piano e aqui realizei esse sonho. Os professores são incríveis!', course: 'Piano' },
    { name: 'Pedro Oliveira', text: 'Em 8 meses já estava tocando minhas músicas favoritas. Metodologia excelente!', course: 'Guitarra' },
    { name: 'Marina Costa', text: 'A técnica vocal que aprendi aqui transformou minha voz. Super recomendo!', course: 'Canto' },
  ];

  return (
    <div className="min-h-screen bg-[#0c0c0c] font-sans text-white">
      {/* Header */}
      <header className="fixed w-full bg-[#0c0c0c]/90 backdrop-blur-xl z-50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                <Music className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold">Harmonia</span>
                <span className="text-amber-400 text-xs block -mt-1">Escola de Música</span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#cursos" className="text-sm text-gray-400 hover:text-amber-400 transition-colors">Cursos</a>
              <a href="#professores" className="text-sm text-gray-400 hover:text-amber-400 transition-colors">Professores</a>
              <a href="#depoimentos" className="text-sm text-gray-400 hover:text-amber-400 transition-colors">Depoimentos</a>
              <a href="#contato" className="text-sm text-gray-400 hover:text-amber-400 transition-colors">Contato</a>
            </nav>

            <button className="bg-gradient-to-r from-amber-400 to-orange-500 text-black px-6 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-amber-500/30 transition-all">
              Agendar Aula Grátis
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="min-h-screen flex items-center relative overflow-hidden pt-20">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[150px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-full text-amber-400 text-sm mb-6">
                <Music className="w-4 h-4" /> Mais de 25 anos formando músicos
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-[0.95]">
                Desperte o<br />
                <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  músico
                </span><br />
                que há em você
              </h1>
              
              <p className="text-xl text-gray-400 mb-8 leading-relaxed max-w-lg">
                Aprenda com os melhores professores em um ambiente inspirador. Método exclusivo que respeita seu ritmo e seus objetivos musicais.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <button className="bg-gradient-to-r from-amber-400 to-orange-500 text-black px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-amber-500/30 transition-all flex items-center gap-2">
                  Começar Agora <ChevronRight className="w-5 h-5" />
                </button>
                <button className="border border-white/20 px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-all flex items-center gap-2">
                  <Play className="w-5 h-5" /> Ver a Escola
                </button>
              </div>
              
              <div className="flex items-center gap-8">
                <div>
                  <p className="text-3xl font-bold text-amber-400">500+</p>
                  <p className="text-gray-500 text-sm">Alunos formados</p>
                </div>
                <div className="w-px h-12 bg-white/10"></div>
                <div>
                  <p className="text-3xl font-bold text-amber-400">25</p>
                  <p className="text-gray-500 text-sm">Anos de experiência</p>
                </div>
                <div className="w-px h-12 bg-white/10"></div>
                <div>
                  <p className="text-3xl font-bold text-amber-400">4.9</p>
                  <p className="text-gray-500 text-sm">Avaliação média</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-amber-900/30 to-orange-900/30 rounded-[3rem] p-8 border border-amber-500/20">
                <div className="grid grid-cols-2 gap-4">
                  {['🎹', '🎸', '🎤', '🥁'].map((emoji, idx) => (
                    <div key={idx} className="aspect-square bg-white/5 rounded-2xl flex items-center justify-center text-6xl hover:bg-white/10 transition-colors cursor-pointer">
                      {emoji}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section id="cursos" className="py-24 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-amber-400 text-sm tracking-widest">CURSOS</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">Escolha seu instrumento</h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Oferecemos aulas individuais e em grupo para diversos instrumentos, com metodologia adaptada ao seu nível.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, idx) => (
              <div key={idx} className="group p-6 bg-white/5 rounded-3xl border border-white/10 hover:border-amber-500/50 transition-all hover:bg-white/10">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <course.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{course.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{course.level}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Duração</span>
                    <span className="text-white">{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Investimento</span>
                    <span className="text-amber-400 font-semibold">{course.price}</span>
                  </div>
                </div>
                <button className="w-full mt-6 py-3 border border-amber-500/50 text-amber-400 rounded-full text-sm font-medium hover:bg-amber-500/10 transition-all">
                  Saiba Mais
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teachers */}
      <section id="professores" className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-amber-400 text-sm tracking-widest">PROFESSORES</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">Mestres da música</h2>
            <p className="text-gray-400 mt-4">Profissionais experientes e apaixonados pelo ensino.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teachers.map((teacher, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full flex items-center justify-center text-6xl mb-4 group-hover:scale-110 transition-transform border-2 border-amber-500/30">
                  {teacher.emoji}
                </div>
                <h3 className="text-lg font-semibold">{teacher.name}</h3>
                <p className="text-amber-400 text-sm">{teacher.instrument}</p>
                <p className="text-gray-500 text-xs mt-1">{teacher.exp} de experiência</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-gradient-to-r from-amber-500/10 to-orange-500/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-amber-400 text-sm tracking-widest">DIFERENCIAIS</span>
              <h2 className="text-4xl font-bold mt-4 mb-6">Por que escolher a Harmonia?</h2>
              <div className="space-y-6">
                {[
                  { icon: Users, title: 'Aulas Individuais', desc: 'Atenção exclusiva para seu desenvolvimento' },
                  { icon: Award, title: 'Certificação', desc: 'Certificado reconhecido ao final do curso' },
                  { icon: HeadphonesIcon, title: 'Estúdio Equipado', desc: 'Instrumentos de alta qualidade disponíveis' },
                  { icon: Clock, title: 'Horários Flexíveis', desc: 'Aulas que se adaptam à sua rotina' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-amber-900/50 to-orange-900/50 rounded-3xl flex items-center justify-center border border-amber-500/20">
                <span className="text-9xl">🎵</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="depoimentos" className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-amber-400 text-sm tracking-widest">DEPOIMENTOS</span>
            <h2 className="text-4xl font-bold mt-4">O que nossos alunos dizem</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="p-6 bg-white/5 rounded-3xl border border-white/10">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">{t.name}</p>
                    <p className="text-amber-400 text-xs">Aluno de {t.course}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contato" className="py-24 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <span className="text-amber-400 text-sm tracking-widest">CONTATO</span>
              <h2 className="text-4xl font-bold mt-4 mb-6">Agende sua aula experimental gratuita</h2>
              <p className="text-gray-400 mb-8">Preencha o formulário e nossa equipe entrará em contato para agendar sua primeira aula sem compromisso.</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Endereço</p>
                    <p>Rua da Música, 123 - Centro</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Telefone</p>
                    <p>(11) 99999-9999</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">E-mail</p>
                    <p>contato@harmonia.com.br</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
              <form className="space-y-4">
                <input type="text" placeholder="Seu nome" className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl focus:outline-none focus:border-amber-500/50" />
                <input type="email" placeholder="Seu e-mail" className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl focus:outline-none focus:border-amber-500/50" />
                <input type="tel" placeholder="Seu telefone" className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl focus:outline-none focus:border-amber-500/50" />
                <select className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl focus:outline-none focus:border-amber-500/50 text-gray-400">
                  <option value="">Instrumento de interesse</option>
                  <option value="piano">Piano</option>
                  <option value="violao">Violão/Guitarra</option>
                  <option value="canto">Canto</option>
                  <option value="bateria">Bateria</option>
                </select>
                <button className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-black py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-amber-500/30 transition-all">
                  Agendar Aula Grátis
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                <Music className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Harmonia</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-amber-400"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-gray-500 hover:text-amber-400"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-gray-500 hover:text-amber-400"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>© 2024 Harmonia Escola de Música. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EscolaMusicaComplete;
