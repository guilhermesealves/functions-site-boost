import { useState } from "react";
import { motion } from "framer-motion";
import { Percent, Plus, Copy, Trash2, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const placeholderDiscounts = [
  { id: "1", code: "PROMO10", type: "Porcentagem", value: "10%", uses: 45, maxUses: 100, status: "Ativo", expires: "30 Jan 2025" },
  { id: "2", code: "FRETE", type: "Frete Grátis", value: "100%", uses: 23, maxUses: 50, status: "Ativo", expires: "15 Fev 2025" },
  { id: "3", code: "NATAL50", type: "Valor Fixo", value: "R$ 50", uses: 100, maxUses: 100, status: "Expirado", expires: "25 Dez 2024" },
];

const Discounts = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Código copiado");
  };

  const handleCreateDiscount = () => {
    toast.success("Cupom criado com sucesso");
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
            <h1 className="text-3xl font-extrabold text-foreground mb-2">Descontos</h1>
            <p className="text-muted-foreground">Crie e gerencie cupons de desconto</p>
          </div>
          
          <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4" />
                Criar Desconto IA
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle>Criar Cupom de Desconto</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label>Código do Cupom</Label>
                  <Input placeholder="Ex: PROMO20" className="mt-1.5 uppercase" />
                </div>
                <div>
                  <Label>Tipo de Desconto</Label>
                  <Select defaultValue="percentage">
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="percentage">Porcentagem</SelectItem>
                      <SelectItem value="fixed">Valor Fixo</SelectItem>
                      <SelectItem value="shipping">Frete Grátis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Valor</Label>
                    <Input placeholder="10" className="mt-1.5" />
                  </div>
                  <div>
                    <Label>Limite de Uso</Label>
                    <Input type="number" placeholder="100" className="mt-1.5" />
                  </div>
                </div>
                <div>
                  <Label>Data de Expiração</Label>
                  <Input type="date" className="mt-1.5" />
                </div>
                <Button onClick={handleCreateDiscount} className="w-full bg-primary hover:bg-primary/90">
                  Criar Cupom
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Discounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {placeholderDiscounts.map((discount, i) => (
            <motion.div
              key={discount.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-2xl border border-border bg-card hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Tag className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{discount.code}</h3>
                    <p className="text-sm text-muted-foreground">{discount.type}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  discount.status === "Ativo"
                    ? "bg-green-500/10 text-green-400"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {discount.status}
                </span>
              </div>

              <div className="text-3xl font-bold text-primary mb-4">{discount.value}</div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Usos</span>
                  <span className="text-foreground">{discount.uses} / {discount.maxUses}</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(discount.uses / discount.maxUses) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  {discount.expires}
                </div>
                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => handleCopyCode(discount.code)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Discounts;
