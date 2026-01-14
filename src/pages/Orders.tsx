import { useState } from "react";
import { motion } from "framer-motion";
import { ClipboardList, Search, Filter, Eye, Package, Clock, CheckCircle, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const placeholderOrders = [
  { id: "#1001", customer: "João Silva", total: 289.90, status: "Pendente", date: "Hoje, 14:32", items: 3 },
  { id: "#1002", customer: "Maria Santos", total: 549.90, status: "Enviado", date: "Hoje, 10:15", items: 2 },
  { id: "#1003", customer: "Pedro Oliveira", total: 159.90, status: "Entregue", date: "Ontem, 18:45", items: 1 },
  { id: "#1004", customer: "Ana Costa", total: 899.90, status: "Pendente", date: "Ontem, 09:20", items: 5 },
  { id: "#1005", customer: "Carlos Lima", total: 349.90, status: "Entregue", date: "2 dias atrás", items: 2 },
];

const statusConfig = {
  Pendente: { icon: Clock, color: "text-yellow-400", bg: "bg-yellow-500/10" },
  Enviado: { icon: Truck, color: "text-blue-400", bg: "bg-blue-500/10" },
  Entregue: { icon: CheckCircle, color: "text-green-400", bg: "bg-green-500/10" },
};

const Orders = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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
            <h1 className="text-3xl font-extrabold text-foreground mb-2">Pedidos</h1>
            <p className="text-muted-foreground">Gerencie os pedidos da sua loja</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar por ID ou cliente..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="shipped">Enviado</SelectItem>
              <SelectItem value="delivered">Entregue</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Mais filtros
          </Button>
        </div>

        {/* Orders Table */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Pedido</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Cliente</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Itens</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Total</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Data</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-muted-foreground">Ações</th>
                </tr>
              </thead>
              <tbody>
                {placeholderOrders.map((order, i) => {
                  const config = statusConfig[order.status as keyof typeof statusConfig];
                  return (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-foreground">{order.id}</td>
                      <td className="px-6 py-4 text-foreground">{order.customer}</td>
                      <td className="px-6 py-4 text-muted-foreground">{order.items} itens</td>
                      <td className="px-6 py-4 font-semibold text-foreground">
                        R$ {order.total.toFixed(2).replace(".", ",")}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
                          <config.icon className="w-3 h-3" />
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground text-sm">{order.date}</td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="sm" className="gap-1.5">
                          <Eye className="w-4 h-4" />
                          Ver
                        </Button>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Orders;
