import { useState } from "react";
import { motion } from "framer-motion";
import { Package, Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const placeholderProducts = [
  { id: "1", name: "Camiseta Premium", price: 89.90, stock: 45, status: "Ativo", image: "" },
  { id: "2", name: "Calça Jeans Slim", price: 199.90, stock: 23, status: "Ativo", image: "" },
  { id: "3", name: "Tênis Esportivo", price: 349.90, stock: 8, status: "Baixo estoque", image: "" },
  { id: "4", name: "Jaqueta de Couro", price: 599.90, stock: 0, status: "Esgotado", image: "" },
];

const Products = () => {
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddProduct = () => {
    toast.success("Produto adicionado com sucesso");
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen bg-background p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-foreground mb-2">Produtos</h1>
            <p className="text-muted-foreground">Gerencie o catálogo da sua loja</p>
          </div>
          
          <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4" />
                Adicionar Produto
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle>Adicionar Produto</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label>Nome do Produto</Label>
                  <Input placeholder="Ex: Camiseta Premium" className="mt-1.5" />
                </div>
                <div>
                  <Label>Descrição</Label>
                  <Textarea placeholder="Descreva seu produto..." className="mt-1.5" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Preço (R$)</Label>
                    <Input type="number" placeholder="99.90" className="mt-1.5" />
                  </div>
                  <div>
                    <Label>Estoque</Label>
                    <Input type="number" placeholder="100" className="mt-1.5" />
                  </div>
                </div>
                <Button onClick={handleAddProduct} className="w-full bg-primary hover:bg-primary/90">
                  Adicionar Produto
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar produtos..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filtrar
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {placeholderProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-border bg-card overflow-hidden group hover:border-primary/30 transition-colors"
            >
              {/* Image */}
              <div className="aspect-square bg-muted flex items-center justify-center relative">
                <Package className="w-12 h-12 text-muted-foreground/30" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="absolute top-2 right-2 p-1.5 rounded-lg bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-card border-border">
                    <DropdownMenuItem className="gap-2">
                      <Eye className="w-4 h-4" /> Ver
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <Edit className="w-4 h-4" /> Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 text-destructive">
                      <Trash2 className="w-4 h-4" /> Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-semibold text-foreground truncate">{product.name}</h3>
                <p className="text-lg font-bold text-primary mt-1">
                  R$ {product.price.toFixed(2).replace(".", ",")}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-muted-foreground">{product.stock} em estoque</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    product.status === "Ativo" 
                      ? "bg-green-500/10 text-green-400"
                      : product.status === "Baixo estoque"
                        ? "bg-yellow-500/10 text-yellow-400"
                        : "bg-destructive/10 text-destructive"
                  }`}>
                    {product.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Products;
