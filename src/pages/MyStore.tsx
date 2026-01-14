import { motion } from "framer-motion";
import { Store, Package, ShoppingCart, Users, TrendingUp, DollarSign, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "Vendas Hoje", value: "R$ 0,00", icon: DollarSign, color: "text-green-400", change: "+0%" },
  { label: "Pedidos Pendentes", value: "0", icon: ShoppingCart, color: "text-blue-400", change: "" },
  { label: "Estoque Baixo", value: "0", icon: AlertCircle, color: "text-yellow-400", change: "itens" },
  { label: "Novos Clientes", value: "0", icon: Users, color: "text-purple-400", change: "esta semana" },
];

const quickActions = [
  { label: "Adicionar Produto", path: "/store/products", icon: Package },
  { label: "Ver Pedidos", path: "/store/orders", icon: ShoppingCart },
  { label: "Ver Analytics", path: "/analytics", icon: TrendingUp },
];

const MyStore = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-foreground mb-2">Minha Loja</h1>
            <p className="text-muted-foreground">Dashboard de métricas e ações rápidas</p>
          </div>
          <Button className="gap-2 bg-primary hover:bg-primary/90">
            <Store className="w-4 h-4" />
            Configurar Loja
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-2xl border border-border bg-card hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2.5 rounded-xl bg-muted ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                {stat.change && (
                  <span className="text-xs text-muted-foreground">{stat.change}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <h2 className="text-lg font-bold text-foreground mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {quickActions.map((action, i) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              onClick={() => navigate(action.path)}
              className="p-5 rounded-xl border border-border bg-card hover:border-primary/30 hover:bg-primary/5 transition-all text-left group"
            >
              <action.icon className="w-6 h-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold text-foreground">{action.label}</h4>
            </motion.button>
          ))}
        </div>

        {/* Recent Activity */}
        <h2 className="text-lg font-bold text-foreground mb-4">Atividade Recente</h2>
        <div className="rounded-2xl border border-border bg-card p-8 text-center">
          <Store className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground">Nenhuma atividade recente</p>
          <p className="text-sm text-muted-foreground/60 mt-1">As vendas e atualizações aparecerão aqui</p>
        </div>
      </motion.div>
    </div>
  );
};

export default MyStore;
