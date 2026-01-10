import React from 'react';
import { ShoppingBag, Heart, Search, User, Star, Truck, RefreshCw, Shield, ChevronRight, Instagram, Facebook, Twitter } from 'lucide-react';

const LojaRoupasComplete = () => {
  const featuredProducts = [
    { id: 1, name: 'Blazer Oversized', price: 'R$ 459,90', oldPrice: 'R$ 599,90', image: '👔', tag: 'SALE' },
    { id: 2, name: 'Vestido Midi Floral', price: 'R$ 289,90', image: '👗', tag: 'NEW' },
    { id: 3, name: 'Calça Wide Leg', price: 'R$ 199,90', image: '👖', tag: '' },
    { id: 4, name: 'Camisa Linho Premium', price: 'R$ 249,90', image: '👕', tag: 'BEST' },
  ];

  const categories = [
    { name: 'Feminino', image: '👠', count: '248 produtos' },
    { name: 'Masculino', image: '🧥', count: '186 produtos' },
    { name: 'Acessórios', image: '👜', count: '94 produtos' },
    { name: 'Calçados', image: '👟', count: '127 produtos' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Top Bar */}
      <div className="bg-black text-white text-xs py-2 text-center">
        <span>FRETE GRÁTIS para compras acima de R$ 299 | Use o código: PRIMEIRA10</span>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-light tracking-[0.3em] text-black">ÉLÉGANCE</div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-sm text-gray-800 hover:text-black border-b-2 border-transparent hover:border-black pb-1 transition-all">NOVIDADES</a>
              <a href="#" className="text-sm text-gray-800 hover:text-black border-b-2 border-transparent hover:border-black pb-1 transition-all">FEMININO</a>
              <a href="#" className="text-sm text-gray-800 hover:text-black border-b-2 border-transparent hover:border-black pb-1 transition-all">MASCULINO</a>
              <a href="#" className="text-sm text-gray-800 hover:text-black border-b-2 border-transparent hover:border-black pb-1 transition-all">ACESSÓRIOS</a>
              <a href="#" className="text-sm text-red-600 font-medium">SALE</a>
            </nav>

            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Search className="w-5 h-5 text-gray-700" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <User className="w-5 h-5 text-gray-700" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                <Heart className="w-5 h-5 text-gray-700" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[10px] rounded-full flex items-center justify-center">2</span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                <ShoppingBag className="w-5 h-5 text-gray-700" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[10px] rounded-full flex items-center justify-center">3</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[80vh] bg-gradient-to-r from-gray-100 to-gray-200 overflow-hidden">
        <div className="absolute inset-0 opacity-50" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-xl">
            <span className="text-sm tracking-[0.3em] text-gray-600 mb-4 block">NOVA COLEÇÃO 2024</span>
            <h1 className="text-5xl md:text-7xl font-light text-black mb-6 leading-tight">
              Estilo que<br />
              <span className="font-medium italic">define você</span>
            </h1>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Descubra peças exclusivas que combinam elegância atemporal com tendências contemporâneas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-black text-white px-10 py-4 text-sm tracking-wider hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                EXPLORAR COLEÇÃO <ChevronRight className="w-4 h-4" />
              </button>
              <button className="border-2 border-black text-black px-10 py-4 text-sm tracking-wider hover:bg-black hover:text-white transition-colors">
                VER LOOKBOOK
              </button>
            </div>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-l from-amber-100/50 to-transparent hidden lg:block"></div>
      </section>

      {/* Benefits Bar */}
      <section className="bg-gray-50 py-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center justify-center gap-3">
              <Truck className="w-6 h-6 text-gray-700" />
              <div>
                <p className="text-sm font-medium text-gray-900">Frete Grátis</p>
                <p className="text-xs text-gray-500">Acima de R$ 299</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <RefreshCw className="w-6 h-6 text-gray-700" />
              <div>
                <p className="text-sm font-medium text-gray-900">Troca Fácil</p>
                <p className="text-xs text-gray-500">Em até 30 dias</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Shield className="w-6 h-6 text-gray-700" />
              <div>
                <p className="text-sm font-medium text-gray-900">Compra Segura</p>
                <p className="text-xs text-gray-500">100% protegida</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Star className="w-6 h-6 text-gray-700" />
              <div>
                <p className="text-sm font-medium text-gray-900">+50 mil clientes</p>
                <p className="text-xs text-gray-500">Satisfeitos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-gray-900 mb-3">Explore por Categoria</h2>
            <p className="text-gray-500">Encontre exatamente o que você procura</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat, index) => (
              <div key={index} className="group relative overflow-hidden bg-gray-100 aspect-[3/4] cursor-pointer">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-500">{cat.image}</span>
                  <h3 className="text-xl font-medium text-gray-900 group-hover:text-white transition-colors">{cat.name}</h3>
                  <p className="text-sm text-gray-500 group-hover:text-white/80 transition-colors">{cat.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-light text-gray-900 mb-3">Destaques da Semana</h2>
              <p className="text-gray-500">Peças selecionadas especialmente para você</p>
            </div>
            <a href="#" className="text-sm text-gray-900 hover:underline flex items-center gap-1">
              Ver todos <ChevronRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group">
                <div className="relative bg-gray-100 aspect-[3/4] mb-4 overflow-hidden">
                  {product.tag && (
                    <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-medium ${product.tag === 'SALE' ? 'bg-red-500 text-white' : product.tag === 'NEW' ? 'bg-black text-white' : 'bg-amber-400 text-black'}`}>
                      {product.tag}
                    </span>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-50 group-hover:opacity-70 transition-opacity">
                    {product.image}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button className="w-full bg-black text-white py-3 text-sm tracking-wider hover:bg-gray-800 transition-colors">
                      ADICIONAR AO CARRINHO
                    </button>
                  </div>
                  <button className="absolute top-3 right-3 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                    <Heart className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
                <div className="text-center">
                  <h3 className="text-sm font-medium text-gray-900 mb-1">{product.name}</h3>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-medium text-gray-900">{product.price}</span>
                    {product.oldPrice && (
                      <span className="text-sm text-gray-400 line-through">{product.oldPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lookbook Banner */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative bg-gradient-to-br from-rose-100 to-rose-200 aspect-square flex items-center justify-center group cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all"></div>
              <div className="text-center z-10">
                <span className="text-sm tracking-[0.3em] text-rose-700 block mb-2">COLEÇÃO</span>
                <h3 className="text-4xl font-light text-gray-900 mb-4">Primavera</h3>
                <button className="text-sm underline text-gray-900 hover:text-rose-700 transition-colors">Ver coleção</button>
              </div>
            </div>
            <div className="relative bg-gradient-to-br from-slate-700 to-slate-900 aspect-square flex items-center justify-center group cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all"></div>
              <div className="text-center z-10">
                <span className="text-sm tracking-[0.3em] text-slate-300 block mb-2">EXCLUSIVE</span>
                <h3 className="text-4xl font-light text-white mb-4">Night Out</h3>
                <button className="text-sm underline text-white hover:text-slate-300 transition-colors">Ver coleção</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-light mb-4">Receba Novidades em Primeira Mão</h2>
          <p className="text-gray-400 mb-8">Cadastre-se e ganhe 10% OFF na primeira compra</p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Seu melhor e-mail" 
              className="flex-1 px-6 py-4 bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/50"
            />
            <button className="bg-white text-black px-10 py-4 text-sm tracking-wider hover:bg-gray-200 transition-colors">
              INSCREVER
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-lg font-light tracking-[0.2em] mb-6">ÉLÉGANCE</h4>
              <p className="text-gray-400 text-sm leading-relaxed">Moda com propósito e estilo desde 2018.</p>
              <div className="flex gap-4 mt-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
              </div>
            </div>
            <div>
              <h5 className="text-sm font-medium mb-4 tracking-wider">NAVEGAÇÃO</h5>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Novidades</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Feminino</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Masculino</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sale</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-medium mb-4 tracking-wider">AJUDA</h5>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Minha Conta</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Meus Pedidos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Trocas e Devoluções</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-medium mb-4 tracking-wider">CONTATO</h5>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li>contato@elegance.com.br</li>
                <li>(11) 99999-9999</li>
                <li>Seg - Sex: 9h às 18h</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            <p>© 2024 ÉLÉGANCE. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LojaRoupasComplete;
