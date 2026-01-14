import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Search, Mail, MoreHorizontal, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const placeholderCustomers = [
  { id: "1", name: "João Silva", email: "joao@email.com", orders: 5, spent: 1289.90, lastOrder: "Hoje" },
  { id: "2", name: "Maria Santos", email: "maria@email.com", orders: 3, spent: 749.90, lastOrder: "Ontem" },
  { id: "3", name: "Pedro Oliveira", email: "pedro@email.com", orders: 8, spent: 2459.90, lastOrder: "3 dias atrás" },
  { id: "4", name: "Ana Costa", email: "ana@email.com", orders: 2, spent: 399.90, lastOrder: "1 semana atrás" },
  { id: "5", name: "Carlos Lima", email: "carlos@email.com", orders: 12, spent: 4899.90, lastOrder: "2 dias atrás" },
];

const Customers = () => {
  const [search, setSearch] = useState("");

  const handleSendEmail = (customer: string) => {
    toast.success(`Email enviado para ${customer}`);
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
            <h1 className="text-3xl font-extrabold text-foreground mb-2">Clientes</h1>
            <p className="text-muted-foreground">Gerencie sua base de clientes</p>
          </div>
          <Button className="gap-2 bg-primary hover:bg-primary/90">
            <UserPlus className="w-4 h-4" />
            Adicionar Cliente
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar clientes..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Customers Table */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Cliente</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Email</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Pedidos</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Total Gasto</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Último Pedido</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-muted-foreground">Ações</th>
                </tr>
              </thead>
              <tbody>
                {placeholderCustomers.map((customer, i) => (
                  <motion.tr
                    key={customer.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                          {customer.name.charAt(0)}
                        </div>
                        <span className="font-medium text-foreground">{customer.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{customer.email}</td>
                    <td className="px-6 py-4 text-foreground">{customer.orders}</td>
                    <td className="px-6 py-4 font-semibold text-foreground">
                      R$ {customer.spent.toFixed(2).replace(".", ",")}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground text-sm">{customer.lastOrder}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="gap-1.5"
                          onClick={() => handleSendEmail(customer.name)}
                        >
                          <Mail className="w-4 h-4" />
                          Email IA
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-card border-border">
                            <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Excluir</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Customers;
