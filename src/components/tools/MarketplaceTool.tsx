import { useState } from "react";
import { Store, Plus, Tag, DollarSign, Package, Percent, Trash2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

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
}

const MarketplaceTool = ({ onSendMessage }: MarketplaceToolProps) => {
  const [products, setProducts] = useState<Product[]>([
    { id: "1", name: "Consultoria Básica", description: "1 hora de consultoria", price: 150, category: "Serviços", commission: 10, partner: "João Silva" },
    { id: "2", name: "Design de Logo", description: "Logo profissional", price: 300, category: "Design", commission: 15, partner: "Maria Design" },
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

  const totalRevenue = products.reduce((acc, p) => acc + p.price, 0);
  const totalCommission = products.reduce((acc, p) => acc + (p.price * p.commission / 100), 0);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
          <Package className="w-5 h-5 text-primary mx-auto mb-1" />
          <p className="text-lg font-bold text-white">{products.length}</p>
          <p className="text-[10px] text-white/40">Produtos</p>
        </div>
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
          <DollarSign className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
          <p className="text-lg font-bold text-white">R$ {totalRevenue.toFixed(0)}</p>
          <p className="text-[10px] text-white/40">Valor Total</p>
        </div>
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
          <Percent className="w-5 h-5 text-amber-400 mx-auto mb-1" />
          <p className="text-lg font-bold text-white">R$ {totalCommission.toFixed(0)}</p>
          <p className="text-[10px] text-white/40">Comissões</p>
        </div>
      </div>

      {/* Products List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Produtos/Serviços</h3>
          <Button
            size="sm"
            onClick={() => setShowForm(!showForm)}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="w-3 h-3 mr-1" />
            Adicionar
          </Button>
        </div>

        {/* Add Form */}
        {showForm && (
          <div className="p-4 rounded-xl bg-white/[0.02] border border-primary/20 space-y-3">
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
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    newProduct.category === cat
                      ? "bg-primary text-white"
                      : "bg-white/[0.06] text-white/60 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowForm(false)}
                className="flex-1 border-white/10"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleAddProduct}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                Adicionar
              </Button>
            </div>
          </div>
        )}

        {/* Products */}
        <div className="space-y-2">
          {products.map((product) => (
            <div
              key={product.id}
              className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium text-white">{product.name}</p>
                  <p className="text-xs text-white/50 mt-1">{product.description}</p>
                </div>
                <button
                  onClick={() => handleRemoveProduct(product.id)}
                  className="p-1.5 rounded-lg hover:bg-red-500/20 text-white/30 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 text-[10px] rounded-full bg-white/[0.06] text-white/60">
                    {product.category}
                  </span>
                  <span className="text-xs text-white/40">
                    por {product.partner}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-emerald-400">
                    {product.commission}% comissão
                  </span>
                  <span className="font-semibold text-white">
                    R$ {product.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button
        onClick={handleGenerateMarketplace}
        disabled={products.length === 0}
        className="w-full bg-primary hover:bg-primary/90"
      >
        <Store className="w-4 h-4 mr-2" />
        Gerar Página Marketplace
      </Button>
    </div>
  );
};

export default MarketplaceTool;
