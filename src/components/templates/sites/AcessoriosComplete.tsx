import React from 'react';
import { ShoppingCart, Heart, Search, User, Star, Diamond, Watch, Gem, Gift, ChevronRight, Instagram, Facebook, Twitter } from 'lucide-react';

const AcessoriosComplete = () => {
  const products = [
    { id: 1, name: 'Colar Pérolas Douradas', price: 'R$ 189,90', rating: 5, category: 'Colares' },
    { id: 2, name: 'Brincos Argola Cristal', price: 'R$ 129,90', rating: 4, category: 'Brincos' },
    { id: 3, name: 'Pulseira Charm Prata', price: 'R$ 159,90', rating: 5, category: 'Pulseiras' },
    { id: 4, name: 'Anel Solitário Rose', price: 'R$ 249,90', rating: 5, category: 'Anéis' },
    { id: 5, name: 'Relógio Classic Gold', price: 'R$ 459,90', rating: 4, category: 'Relógios' },
    { id: 6, name: 'Bolsa Clutch Veludo', price: 'R$ 299,90', rating: 5, category: 'Bolsas' },
  ];

  const collections = [
    { name: 'Minimalista', desc: 'Elegância simples', icon: '◇' },
    { name: 'Boho Chic', desc: 'Espírito livre', icon: '☽' },
    { name: 'Clássico', desc: 'Atemporais', icon: '♛' },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f7] font-serif">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Diamond className="w-6 h-6 text-amber-600" />
              <span className="text-2xl font-light tracking-wider text-gray-800">Lumière</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-sm text-gray-600 hover:text-amber-700 transition-colors">Joias</a>
              <a href="#" className="text-sm text-gray-600 hover:text-amber-700 transition-colors">Relógios</a>
              <a href="#" className="text-sm text-gray-600 hover:text-amber-700 transition-colors">Bolsas</a>
              <a href="#" className="text-sm text-gray-600 hover:text-amber-700 transition-colors">Coleções</a>
              <a href="#" className="text-sm text-gray-600 hover:text-amber-700 transition-colors">Sobre</a>
            </nav>

            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-amber-50 rounded-full transition-colors">
                <Search className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-amber-50 rounded-full transition-colors">
                <User className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-amber-50 rounded-full transition-colors relative">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-amber-50 rounded-full transition-colors relative">
                <ShoppingCart className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-600 text-white text-[10px] rounded-full flex items-center justify-center">2</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#faf9f7] via-amber-50/30 to-rose-50/30"></div>
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-amber-100/40 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block text-amber-700 text-sm tracking-[0.4em] mb-6 border border-amber-300 px-4 py-2">NOVA COLEÇÃO</span>
            <h1 className="text-5xl md:text-7xl font-light text-gray-800 mb-6 leading-tight">
              Brilhe com<br />
              <span className="italic text-amber-700">elegância única</span>
            </h1>
            <p className="text-gray-600 text-lg mb-10 leading-relaxed max-w-lg">
              Cada peça conta uma história. Descubra acessórios que celebram sua essência e transformam momentos em memórias preciosas.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-amber-700 text-white px-10 py-4 text-sm tracking-widest hover:bg-amber-800 transition-all shadow-lg hover:shadow-xl">
                EXPLORAR COLEÇÃO
              </button>
              <button className="border-2 border-gray-800 text-gray-800 px-10 py-4 text-sm tracking-widest hover:bg-gray-800 hover:text-white transition-all">
                PRESENTES
              </button>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute right-20 top-1/4 text-8xl opacity-20 animate-pulse">💎</div>
        <div className="absolute right-40 bottom-1/3 text-6xl opacity-15 animate-pulse" style={{ animationDelay: '1s' }}>✨</div>
      </section>

      {/* Collections */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-amber-700 text-sm tracking-[0.3em]">INSPIRAÇÕES</span>
            <h2 className="text-4xl font-light text-gray-800 mt-3">Nossas Coleções</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {collections.map((col, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="aspect-[4/5] bg-gradient-to-b from-gray-100 to-gray-50 relative overflow-hidden mb-6">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-9xl text-gray-200 group-hover:text-amber-200 transition-colors duration-500">{col.icon}</span>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-500"></div>
                </div>
                <h3 className="text-xl font-light text-gray-800 mb-1">{col.name}</h3>
                <p className="text-gray-500 text-sm">{col.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gradient-to-r from-amber-50 to-rose-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <Gem className="w-8 h-8 text-amber-700 mx-auto mb-3" />
              <h4 className="font-medium text-gray-800">Qualidade Premium</h4>
              <p className="text-sm text-gray-500 mt-1">Materiais selecionados</p>
            </div>
            <div>
              <Gift className="w-8 h-8 text-amber-700 mx-auto mb-3" />
              <h4 className="font-medium text-gray-800">Embalagem Especial</h4>
              <p className="text-sm text-gray-500 mt-1">Perfeita para presente</p>
            </div>
            <div>
              <Watch className="w-8 h-8 text-amber-700 mx-auto mb-3" />
              <h4 className="font-medium text-gray-800">Garantia 2 Anos</h4>
              <p className="text-sm text-gray-500 mt-1">Contra defeitos</p>
            </div>
            <div>
              <Diamond className="w-8 h-8 text-amber-700 mx-auto mb-3" />
              <h4 className="font-medium text-gray-800">Certificado</h4>
              <p className="text-sm text-gray-500 mt-1">Autenticidade garantida</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-amber-700 text-sm tracking-[0.3em]">BEST SELLERS</span>
              <h2 className="text-4xl font-light text-gray-800 mt-3">Mais Desejados</h2>
            </div>
            <a href="#" className="text-amber-700 text-sm hover:underline flex items-center gap-1">
              Ver todos <ChevronRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group">
                <div className="relative aspect-square bg-gray-50 mb-4 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-7xl opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-500">
                    {product.category === 'Colares' && '📿'}
                    {product.category === 'Brincos' && '💎'}
                    {product.category === 'Pulseiras' && '⌚'}
                    {product.category === 'Anéis' && '💍'}
                    {product.category === 'Relógios' && '⌚'}
                    {product.category === 'Bolsas' && '👜'}
                  </div>
                  <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all">
                    <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/95 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button className="w-full bg-amber-700 text-white py-3 text-sm tracking-wider hover:bg-amber-800 transition-colors">
                      ADICIONAR
                    </button>
                  </div>
                </div>
                <span className="text-xs text-amber-600 tracking-wider">{product.category}</span>
                <h3 className="text-gray-800 font-medium mt-1">{product.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex">
                    {[...Array(product.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-gray-800 font-medium">{product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-amber-700 text-sm tracking-[0.3em]">@LUMIERE.OFICIAL</span>
          <h2 className="text-4xl font-light text-gray-800 mt-3 mb-12">Siga-nos no Instagram</h2>
          <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
            {['💎', '👜', '💍', '⌚', '📿', '✨'].map((emoji, idx) => (
              <div key={idx} className="aspect-square bg-gradient-to-br from-amber-100 to-rose-100 flex items-center justify-center text-4xl cursor-pointer hover:opacity-80 transition-opacity">
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Diamond className="w-5 h-5 text-amber-400" />
                <span className="text-xl font-light tracking-wider">Lumière</span>
              </div>
              <p className="text-gray-400 text-sm">Joias e acessórios que iluminam sua jornada.</p>
              <div className="flex gap-4 mt-6">
                <a href="#" className="text-gray-400 hover:text-amber-400"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-amber-400"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-amber-400"><Twitter className="w-5 h-5" /></a>
              </div>
            </div>
            <div>
              <h5 className="text-sm font-medium mb-4 text-amber-400">CATEGORIAS</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Colares</a></li>
                <li><a href="#" className="hover:text-white">Brincos</a></li>
                <li><a href="#" className="hover:text-white">Pulseiras</a></li>
                <li><a href="#" className="hover:text-white">Anéis</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-medium mb-4 text-amber-400">ATENDIMENTO</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Contato</a></li>
                <li><a href="#" className="hover:text-white">Trocas</a></li>
                <li><a href="#" className="hover:text-white">Garantia</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-medium mb-4 text-amber-400">NEWSLETTER</h5>
              <p className="text-gray-400 text-sm mb-4">Receba ofertas exclusivas</p>
              <input type="email" placeholder="Seu e-mail" className="w-full px-4 py-3 bg-white/10 border border-white/20 text-sm focus:outline-none focus:border-amber-400" />
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            <p>© 2024 Lumière. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AcessoriosComplete;
