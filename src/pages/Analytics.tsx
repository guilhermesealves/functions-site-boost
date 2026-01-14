import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, ShoppingCart, DollarSign, Eye, ArrowUp, ArrowDown } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const salesData = [
  { name: "Jan", vendas: 4000, visitas: 2400 },
  { name: "Fev", vendas: 3000, visitas: 1398 },
  { name: "Mar", vendas: 5000, visitas: 3800 },
  { name: "Abr", vendas: 2780, visitas: 3908 },
  { name: "Mai", vendas: 1890, visitas: 4800 },
  { name: "Jun", vendas: 2390, visitas: 3800 },
  { name: "Jul", vendas: 3490, visitas: 4300 },
];

const conversionData = [
  { name: "Seg", taxa: 2.4 },
  { name: "Ter", taxa: 3.1 },
  { name: "Qua", taxa: 2.8 },
  { name: "Qui", taxa: 4.2 },
  { name: "Sex", taxa: 3.8 },
  { name: "Sáb", taxa: 5.1 },
  { name: "Dom", taxa: 4.5 },
];

const stats = [
  { label: "Receita Total", value: "R$ 24.890", change: "+12.5%", up: true, icon: DollarSign },
  { label: "Pedidos", value: "156", change: "+8.2%", up: true, icon: ShoppingCart },
  { label: "Visitantes", value: "3.240", change: "-2.1%", up: false, icon: Eye },
  { label: "Conversão", value: "4.8%", change: "+0.6%", up: true, icon: TrendingUp },
];

const Analytics = () => {
  return (
    <div className="min-h-screen bg-background p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-foreground mb-2">Analytics</h1>
          <p className="text-muted-foreground">Acompanhe as métricas da sua loja</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-2xl border border-border bg-card"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-primary/10">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <span className={`flex items-center gap-1 text-sm font-medium ${
                  stat.up ? "text-green-400" : "text-destructive"
                }`}>
                  {stat.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-2xl border border-border bg-card"
          >
            <h3 className="font-bold text-foreground mb-4">Vendas vs Visitas</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(24, 100%, 50%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(24, 100%, 50%)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorVisitas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(210, 100%, 50%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(210, 100%, 50%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 15%)" />
                  <XAxis dataKey="name" stroke="hsl(0, 0%, 40%)" fontSize={12} />
                  <YAxis stroke="hsl(0, 0%, 40%)" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(0, 0%, 8%)", 
                      border: "1px solid hsl(0, 0%, 15%)",
                      borderRadius: "8px"
                    }}
                  />
                  <Area type="monotone" dataKey="vendas" stroke="hsl(24, 100%, 50%)" fillOpacity={1} fill="url(#colorVendas)" />
                  <Area type="monotone" dataKey="visitas" stroke="hsl(210, 100%, 50%)" fillOpacity={1} fill="url(#colorVisitas)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Conversion Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-2xl border border-border bg-card"
          >
            <h3 className="font-bold text-foreground mb-4">Taxa de Conversão</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={conversionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 15%)" />
                  <XAxis dataKey="name" stroke="hsl(0, 0%, 40%)" fontSize={12} />
                  <YAxis stroke="hsl(0, 0%, 40%)" fontSize={12} unit="%" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(0, 0%, 8%)", 
                      border: "1px solid hsl(0, 0%, 15%)",
                      borderRadius: "8px"
                    }}
                    formatter={(value: number) => [`${value}%`, "Conversão"]}
                  />
                  <Bar dataKey="taxa" fill="hsl(24, 100%, 50%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;
