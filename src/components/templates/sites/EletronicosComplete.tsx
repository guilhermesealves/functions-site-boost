import React from 'react';
import { ShoppingCart, Search, User, Star, Cpu, Smartphone, Headphones, Laptop, Gamepad2, Camera, Truck, Shield, CreditCard, ChevronRight, Zap, Instagram, Twitter, Youtube } from 'lucide-react';

const EletronicosComplete = () => {
  const categories = [
    { icon: Smartphone, name: 'Smartphones', count: '156 produtos' },
    { icon: Laptop, name: 'Notebooks', count: '89 produtos' },
    { icon: Headphones, name: 'Áudio', count: '234 produtos' },
    { icon: Gamepad2, name: 'Games', count: '312 produtos' },
    { icon: Camera, name: 'Câmeras', count: '78 produtos' },
    { icon: Cpu, name: 'Hardware', count: '445 produtos' },
  ];

  const featuredProducts = [
    { name: 'iPhone 15 Pro Max', price: 'R$ 9.499', oldPrice: 'R$ 10.999', discount: '-14%', rating: 5 },
    { name: 'MacBook Air M3', price: 'R$ 12.999', oldPrice: '', discount: '', rating: 5 },
    { name: 'AirPods Pro 2', price: 'R$ 2.299', oldPrice: 'R$ 2.699', discount: '-15%', rating: 4 },
    { name: 'PlayStation 5', price: 'R$ 3.999', oldPrice: '', discount: 'HOT', rating: 5 },
  ];

  const deals = [
    { name: 'Galaxy S24 Ultra', price: 'R$ 7.999', timer: '02:15:33' },
    { name: 'iPad Air 2024', price: 'R$ 5.499', timer: '05:42:18' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 font-sans text-white">
      {/* Promo Bar */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white text-sm py-2 text-center">
        <span className="animate-pulse">⚡ MEGA SALE: Até 40% OFF + Frete Grátis! ⚡</span>
      </div>

      {/* Header */}
      <header className="bg-gray-900/95 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">TechZone</span>
            </div>

            <div className="hidden md:flex flex-1 max-w-xl">
              <div className="relative w-full">
                <input 
                  type="text" 
                  placeholder="Buscar produtos, marcas..." 
                  className="w-full px-5 py-3 bg-gray-800 border border-gray-700 rounded-full text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-colors">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <User className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-xs rounded-full flex items-center justify-center">3</span>
              </button>
            </div>
          </div>

          <nav className="hidden md:flex items-center justify-center gap-8 mt-4 pb-2">
            {categories.map((cat, idx) => (
              <a key={idx} href="#" className="flex items-center gap-2 text-sm text-gray-400 hover:text-blue-400 transition-colors group">
                <cat.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                {cat.name}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"30\" height=\"30\" viewBox=\"0 0 30 30\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%234f46e5\" fill-opacity=\"0.05\" fill-rule=\"evenodd\"%3E%3Ccircle cx=\"3\" cy=\"3\" r=\"3\"/%3E%3C/g%3E%3C/svg%3E')]"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                🎉 Lançamento Exclusivo
              </span>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                O Futuro da<br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Tecnologia</span><br />
                Está Aqui
              </h1>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Descubra os últimos lançamentos em eletrônicos com os melhores preços e condições exclusivas.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2">
                  Explorar Ofertas <ChevronRight className="w-5 h-5" />
                </button>
                <button className="border border-gray-600 px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-all">
                  Ver Catálogo
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-gray-800">
                <div className="text-9xl text-center">📱</div>
                <div className="text-center mt-4">
                  <span className="text-gray-400 text-sm">Em destaque</span>
                  <h3 className="text-xl font-bold mt-1">iPhone 15 Pro Max</h3>
                  <p className="text-blue-400 font-bold text-2xl mt-2">R$ 9.499</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flash Deals */}
      <section className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-red-500/20 px-4 py-2 rounded-lg">
              <Zap className="w-5 h-5 text-red-500 animate-pulse" />
              <span className="text-red-400 font-bold">FLASH DEALS</span>
            </div>
            <span className="text-gray-400">Ofertas por tempo limitado!</span>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {deals.map((deal, idx) => (
              <div key={idx} className="bg-gradient-to-r from-gray-800 to-gray-850 rounded-2xl p-6 border border-gray-700 flex items-center gap-6 hover:border-blue-500/50 transition-all">
                <div className="text-6xl">📱</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{deal.name}</h3>
                  <p className="text-2xl font-bold text-blue-400 mt-1">{deal.price}</p>
                </div>
                <div className="text-center">
                  <span className="text-xs text-gray-400">Termina em</span>
                  <div className="bg-red-500/20 text-red-400 font-mono font-bold px-4 py-2 rounded-lg mt-1">
                    {deal.timer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Explore por Categoria</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {categories.map((cat, idx) => (
              <div key={idx} className="group cursor-pointer text-center">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center mb-4 group-hover:from-blue-600/20 group-hover:to-purple-600/20 transition-all border border-gray-700 group-hover:border-blue-500/50">
                  <cat.icon className="w-8 h-8 text-gray-400 group-hover:text-blue-400 transition-colors" />
                </div>
                <h3 className="font-medium text-sm">{cat.name}</h3>
                <p className="text-xs text-gray-500">{cat.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Mais Vendidos</h2>
            <a href="#" className="text-blue-400 hover:underline flex items-center gap-1">
              Ver todos <ChevronRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((product, idx) => (
              <div key={idx} className="group bg-gray-800/50 rounded-2xl p-4 border border-gray-700 hover:border-blue-500/50 transition-all">
                <div className="relative aspect-square bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl mb-4 flex items-center justify-center">
                  {product.discount && (
                    <span className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-bold ${product.discount === 'HOT' ? 'bg-orange-500' : 'bg-red-500'}`}>
                      {product.discount}
                    </span>
                  )}
                  <span className="text-6xl">📱</span>
                </div>
                <div className="flex gap-1 mb-2">
                  {[...Array(product.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <h3 className="font-medium text-sm mb-2 group-hover:text-blue-400 transition-colors">{product.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-blue-400">{product.price}</span>
                  {product.oldPrice && <span className="text-sm text-gray-500 line-through">{product.oldPrice}</span>}
                </div>
                <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-sm font-medium transition-colors">
                  Adicionar
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="font-medium">Frete Grátis</h4>
              <p className="text-sm text-gray-500">Acima de R$ 299</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-400" />
              </div>
              <h4 className="font-medium">Garantia Estendida</h4>
              <p className="text-sm text-gray-500">Proteção total</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 mx-auto bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="font-medium">12x Sem Juros</h4>
              <p className="text-sm text-gray-500">Em todos cartões</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 mx-auto bg-orange-500/20 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-orange-400" />
              </div>
              <h4 className="font-medium">Entrega Rápida</h4>
              <p className="text-sm text-gray-500">Em até 24h</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Fique por Dentro</h2>
          <p className="text-gray-400 mb-8">Cadastre-se e receba ofertas exclusivas e lançamentos em primeira mão.</p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Digite seu e-mail" 
              className="flex-1 px-6 py-4 bg-gray-800 border border-gray-700 rounded-full focus:outline-none focus:border-blue-500"
            />
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all">
              Inscrever
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="text-xl font-bold">TechZone</span>
              </div>
              <p className="text-gray-400 text-sm">O melhor da tecnologia ao seu alcance.</p>
              <div className="flex gap-4 mt-6">
                <a href="#" className="text-gray-400 hover:text-blue-400"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-blue-400"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-blue-400"><Youtube className="w-5 h-5" /></a>
              </div>
            </div>
            <div>
              <h5 className="font-medium mb-4">Categorias</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Smartphones</a></li>
                <li><a href="#" className="hover:text-white">Notebooks</a></li>
                <li><a href="#" className="hover:text-white">Games</a></li>
                <li><a href="#" className="hover:text-white">Áudio</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-4">Ajuda</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white">Meus Pedidos</a></li>
                <li><a href="#" className="hover:text-white">Trocas</a></li>
                <li><a href="#" className="hover:text-white">Garantia</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-4">Contato</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>suporte@techzone.com.br</li>
                <li>0800 123 4567</li>
                <li>Seg - Sáb: 8h às 22h</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            <p>© 2024 TechZone. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EletronicosComplete;
