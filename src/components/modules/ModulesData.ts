import { 
  CreditCard, Package, Warehouse, Users, BarChart3, 
  MessageSquare, ShoppingCart, Globe, FileText, Plug,
  TrendingUp, Mail, Truck, Receipt, Shield
} from "lucide-react";

export interface Module {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  category: "core" | "sales" | "marketing" | "integrations";
  plan: "starter" | "pro" | "enterprise";
  status: "active" | "inactive" | "coming_soon";
  features: string[];
  price?: number; // Créditos por mês
}

export interface ModuleCategory {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const moduleCategories: ModuleCategory[] = [
  { id: "core", label: "Core", description: "Funcionalidades essenciais", icon: Package },
  { id: "sales", label: "Vendas", description: "Aumente suas vendas", icon: ShoppingCart },
  { id: "marketing", label: "Marketing", description: "Cresça seu alcance", icon: TrendingUp },
  { id: "integrations", label: "Integrações", description: "Conecte serviços", icon: Plug },
];

export const modules: Module[] = [
  // Core Modules
  {
    id: "payments",
    name: "Pagamentos",
    description: "Aceite pagamentos com PIX, cartão e boleto",
    icon: CreditCard,
    category: "core",
    plan: "starter",
    status: "active",
    features: ["PIX instantâneo", "Cartão de crédito", "Boleto bancário", "Parcelamento", "Taxas competitivas"],
  },
  {
    id: "products",
    name: "Produtos",
    description: "Gerencie produtos físicos e digitais",
    icon: Package,
    category: "core",
    plan: "starter",
    status: "active",
    features: ["Produtos físicos", "Produtos digitais", "Variações", "SKU automático", "Importação em massa"],
  },
  {
    id: "inventory",
    name: "Estoque",
    description: "Controle de estoque inteligente",
    icon: Warehouse,
    category: "core",
    plan: "pro",
    status: "active",
    features: ["Alertas de estoque baixo", "Múltiplos depósitos", "Histórico de movimentações", "Reserva automática"],
  },
  {
    id: "erp",
    name: "ERP Integrado",
    description: "Gestão completa do negócio",
    icon: BarChart3,
    category: "core",
    plan: "pro",
    status: "active",
    features: ["Gestão de pedidos", "Financeiro", "Relatórios", "Clientes", "Fornecedores"],
  },
  
  // Sales Modules
  {
    id: "crm",
    name: "CRM",
    description: "Gestão de relacionamento com clientes",
    icon: Users,
    category: "sales",
    plan: "pro",
    status: "active",
    features: ["Pipeline de vendas", "Histórico de contatos", "Tags e segmentação", "Automações"],
  },
  {
    id: "whatsapp",
    name: "WhatsApp Commerce",
    description: "Vendas e atendimento via WhatsApp",
    icon: MessageSquare,
    category: "sales",
    plan: "pro",
    status: "active",
    features: ["Catálogo no WhatsApp", "Pedidos automáticos", "Respostas rápidas", "Multi-atendentes"],
  },
  {
    id: "cart-recovery",
    name: "Recuperação de Carrinho",
    description: "Recupere vendas abandonadas",
    icon: ShoppingCart,
    category: "sales",
    plan: "pro",
    status: "active",
    features: ["E-mail automático", "WhatsApp de recuperação", "Descontos personalizados", "Analytics"],
  },
  {
    id: "orders",
    name: "Gestão de Pedidos",
    description: "Acompanhe pedidos de ponta a ponta",
    icon: Receipt,
    category: "sales",
    plan: "starter",
    status: "active",
    features: ["Status em tempo real", "Notificações", "Etiquetas de envio", "Histórico completo"],
  },
  
  // Marketing Modules
  {
    id: "seo",
    name: "SEO Automático",
    description: "Otimização para buscadores",
    icon: Globe,
    category: "marketing",
    plan: "pro",
    status: "active",
    features: ["Meta tags automáticas", "Sitemap", "Schema markup", "Relatórios de performance"],
  },
  {
    id: "email-marketing",
    name: "E-mail Marketing",
    description: "Campanhas de e-mail automatizadas",
    icon: Mail,
    category: "marketing",
    plan: "pro",
    status: "coming_soon",
    features: ["Templates prontos", "Segmentação", "Automações", "Analytics"],
  },
  {
    id: "content",
    name: "Gerador de Conteúdo",
    description: "Crie conteúdo com IA",
    icon: FileText,
    category: "marketing",
    plan: "pro",
    status: "active",
    features: ["Posts para redes sociais", "Descrições de produto", "Blog posts", "SEO otimizado"],
  },
  
  // Integrations
  {
    id: "shipping",
    name: "Frete & Envio",
    description: "Integração com transportadoras",
    icon: Truck,
    category: "integrations",
    plan: "starter",
    status: "active",
    features: ["Correios", "Jadlog", "Melhor Envio", "Frete grátis condicional"],
  },
  {
    id: "marketplaces",
    name: "Marketplaces",
    description: "Venda em múltiplos canais",
    icon: ShoppingCart,
    category: "integrations",
    plan: "enterprise",
    status: "coming_soon",
    features: ["Mercado Livre", "Shopee", "Amazon", "Sincronização de estoque"],
  },
  {
    id: "security",
    name: "Segurança Avançada",
    description: "Proteção extra para seu negócio",
    icon: Shield,
    category: "integrations",
    plan: "enterprise",
    status: "active",
    features: ["SSL premium", "Proteção DDoS", "Backup automático", "Logs de acesso"],
  },
];

export const getModulesByCategory = (categoryId: string) => {
  return modules.filter(m => m.category === categoryId);
};

export const getModuleById = (moduleId: string) => {
  return modules.find(m => m.id === moduleId);
};
