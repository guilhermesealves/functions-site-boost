import { useState } from "react";
import { Store, Plus, Tag, DollarSign, Package, Percent, Trash2, TrendingUp, BarChart3, ShoppingBag, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";

interface MarketplaceToolProps {
  onSendMessage?: (message: string) => void;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  commission: number;
  partner: string;
  sales: number;
}

const MarketplaceTool = ({ onSendMessage }: MarketplaceToolProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [products, setProducts] = useState<Product[]>([
    { id: "1", name: "Consultoria Básica", description: "1 hora de consultoria", price: 150, category: "Serviços", commission: 10, partner: "João Silva", sales: 12 },
    { id: "2", name: "Design de Logo", description: "Logo profissional", price: 300, category: "Design", commission: 15, partner: "Maria Design", sales: 8 },
    { id: "3", name: "Pack Social Media", description: "10 posts prontos", price: 200, category: "Marketing", commission: 12, partner: "Agência XYZ", sales: 15 },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    commission: "",
    partner: "",
  });

  const categories = ["Serviços", "Produtos", "Design", "Marketing", "Tecnologia", "Consultoria"];

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      toast.error("Preencha nome e preço");
      return;
    }

    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      description: newProduct.description,
      price: parseFloat(newProduct.price),
      category: newProduct.category || "Outros",
      commission: parseFloat(newProduct.commission) || 0,
      partner: newProduct.partner,
      sales: 0,
    };

    setProducts([...products, product]);
    setNewProduct({ name: "", description: "", price: "", category: "", commission: "", partner: "" });
    setShowForm(false);
    toast.success("Produto adicionado!");
  };

  const handleRemoveProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast.success("Produto removido");
  };

  const handleGenerateMarketplace = () => {
    if (onSendMessage) {
      onSendMessage(`Crie uma página de marketplace com os seguintes produtos:

${products.map(p => `
📦 ${p.name}
- Descrição: ${p.description}
- Preço: R$ ${p.price.toFixed(2)}
- Categoria: ${p.category}
- Parceiro: ${p.partner}
- Comissão: ${p.commission}%
`).join("\n")}

A página deve ter:
- Grid de produtos com cards
- Filtro por categoria
- Ordenação por preço
- Botão de compra/contato
- Design moderno e responsivo`);
    }
    toast.success("Gerando marketplace...");
  };

  const totalRevenue = products.reduce((acc, p) => acc + (p.price * p.sales), 0);
  const totalCommission = products.reduce((acc, p) => acc + (p.price * p.commission / 100 * p.sales), 0);
  const totalSales = products.reduce((acc, p) => acc + p.sales, 0);

  const categoryData = categories.map(cat => ({
    name: cat,
    products: products.filter(p => p.category === cat).length,
    revenue: products.filter(p => p.category === cat).reduce((acc, p) => acc + (p.price * p.sales), 0),
  })).filter(c => c.products > 0);

  const performanceData = [
    { month: "Jan", vendas: 12, comissao: 450 },
    { month: "Fev", vendas: 18, comissao: 680 },
    { month: "Mar", vendas: 25, comissao: 920 },
    { month: "Abr", vendas: 35, comissao: 1250 },
  ];

  const conversionData = [
    { name: "Visualizações", value: 1200 },
    { name: "Cliques", value: 450 },
    { name: "Conversões", value: totalSales },
  ];

  const COLORS = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-white/[0.06]">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center">
          <Store className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Hub de Marketplace</h2>
          <p className="text-xs text-white/50">Gerencie produtos e parceiros</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-4 bg-white/[0.02] border border-white/[0.06] p-1 rounded-xl">
          <TabsTrigger value="overview" className="text-xs data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400 rounded-lg">
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="products" className="text-xs data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400 rounded-lg">
            Ofertas
          </TabsTrigger>
          <TabsTrigger value="categories" className="text-xs data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400 rounded-lg">
            Categorias
          </TabsTrigger>
          <TabsTrigger value="manage" className="text-xs data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400 rounded-lg">
            Gestão
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-emerald-400">Produtos</span>
              </div>
              <p className="text-2xl font-bold text-white">{products.length}</p>
              <p className="text-xs text-white/40 mt-1">ativos</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-cyan-400" />
                <span className="text-xs text-cyan-400">Faturamento</span>
              </div>
              <p className="text-2xl font-bold text-white">R$ {totalRevenue.toLocaleString()}</p>
              <p className="text-xs text-white/40 mt-1">total</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Percent className="w-4 h-4 text-amber-400" />
                <span className="text-xs text-amber-400">Comissões</span>
              </div>
              <p className="text-2xl font-bold text-white">R$ {totalCommission.toLocaleString()}</p>
              <p className="text-xs text-white/40 mt-1">ganhos</p>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h4 className="text-sm font-semibold text-white mb-4">Desempenho das Ofertas</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={11} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      color: "white",
                    }}
                  />
                  <Area type="monotone" dataKey="vendas" stroke="#10b981" fill="url(#colorVendas)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Conversion Indicators */}
          <div className="grid grid-cols-3 gap-4">
            {conversionData.map((item, index) => (
              <div key={item.name} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
                <p className="text-2xl font-bold text-white">{item.value.toLocaleString()}</p>
                <p className="text-xs text-white/40">{item.name}</p>
                {index < conversionData.length - 1 && (
                  <div className="mt-2 flex items-center justify-center gap-1">
                    <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                    <span className="text-xs text-emerald-400">
                      {Math.round((conversionData[index + 1].value / item.value) * 100)}%
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="products" className="mt-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">{products.length} Produtos Ativos</h3>
            <Button
              size="sm"
              onClick={() => { setShowForm(true); setActiveTab("manage"); }}
              className="bg-emerald-500 hover:bg-emerald-600"
            >
              <Plus className="w-3 h-3 mr-1" />
              Adicionar
            </Button>
          </div>

          <AnimatePresence>
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/30 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-white">{product.name}</p>
                      <span className="px-2 py-0.5 text-[10px] rounded-full bg-white/[0.06] text-white/60">
                        {product.category}
                      </span>
                    </div>
                    <p className="text-xs text-white/50 mt-1">{product.description}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-xs text-white/40">
                        por <span className="text-white/60">{product.partner}</span>
                      </span>
                      <span className="text-xs text-emerald-400">{product.sales} vendas</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-white">R$ {product.price.toFixed(2)}</p>
                    <p className="text-xs text-amber-400">{product.commission}% comissão</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </TabsContent>

        <TabsContent value="categories" className="mt-6 space-y-4">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h4 className="text-sm font-semibold text-white mb-4">Receita por Categoria</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis type="number" stroke="rgba(255,255,255,0.3)" fontSize={11} />
                  <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.3)" fontSize={11} width={80} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      color: "white",
                    }}
                    formatter={(value: number) => [`R$ ${value}`, "Receita"]}
                  />
                  <Bar dataKey="revenue" fill="#10b981" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {categoryData.map((cat, index) => (
              <div key={cat.name} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-sm text-white">{cat.name}</span>
                </div>
                <p className="text-lg font-bold text-white">{cat.products} produtos</p>
                <p className="text-xs text-emerald-400">R$ {cat.revenue.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="manage" className="mt-6 space-y-4">
          {/* Add Form */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 space-y-3"
              >
                <h4 className="text-sm font-semibold text-white mb-2">Novo Produto</h4>
                <Input
                  placeholder="Nome do produto/serviço"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="bg-white/[0.04] border-white/[0.08] text-white"
                />
                <Textarea
                  placeholder="Descrição"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="bg-white/[0.04] border-white/[0.08] text-white min-h-[60px]"
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="number"
                    placeholder="Preço (R$)"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="bg-white/[0.04] border-white/[0.08] text-white"
                  />
                  <Input
                    type="number"
                    placeholder="Comissão (%)"
                    value={newProduct.commission}
                    onChange={(e) => setNewProduct({ ...newProduct, commission: e.target.value })}
                    className="bg-white/[0.04] border-white/[0.08] text-white"
                  />
                </div>
                <Input
                  placeholder="Nome do parceiro"
                  value={newProduct.partner}
                  onChange={(e) => setNewProduct({ ...newProduct, partner: e.target.value })}
                  className="bg-white/[0.04] border-white/[0.08] text-white"
                />
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setNewProduct({ ...newProduct, category: cat })}
                      className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                        newProduct.category === cat
                          ? "bg-emerald-500 text-white"
                          : "bg-white/[0.06] text-white/60 hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    className="flex-1 border-white/10"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleAddProduct}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                  >
                    Adicionar
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!showForm && (
            <Button
              onClick={() => setShowForm(true)}
              variant="outline"
              className="w-full border-dashed border-white/20 text-white/60 hover:text-white hover:border-emerald-500/40"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Novo Produto
            </Button>
          )}

          {/* Products List with Delete */}
          <div className="space-y-2">
            {products.map((product) => (
              <div
                key={product.id}
                className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-4 h-4 text-emerald-400" />
                  <div>
                    <p className="text-sm text-white">{product.name}</p>
                    <p className="text-xs text-white/40">R$ {product.price} • {product.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveProduct(product.id)}
                  className="p-2 rounded-lg hover:bg-red-500/20 text-white/30 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <Button
            onClick={handleGenerateMarketplace}
            disabled={products.length === 0}
            className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:opacity-90"
          >
            <Store className="w-4 h-4 mr-2" />
            Gerar Página Marketplace
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketplaceTool;
