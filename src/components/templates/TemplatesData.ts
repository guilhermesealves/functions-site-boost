export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  style: string;
  thumbnail: string;
  colors: string[];
}

export const templates: Template[] = [
  {
    id: "ecommerce-fashion",
    name: "Fashion Store",
    description: "Loja de moda elegante com visual clean",
    category: "E-commerce",
    style: "Moderno",
    thumbnail: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    colors: ["#667eea", "#764ba2", "#ffffff"]
  },
  {
    id: "saas-startup",
    name: "SaaS Startup",
    description: "Landing page para produto digital",
    category: "Tecnologia",
    style: "Minimalista",
    thumbnail: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
    colors: ["#0ea5e9", "#0284c7", "#0f172a"]
  },
  {
    id: "restaurant-premium",
    name: "Restaurante Premium",
    description: "Site gastronômico sofisticado",
    category: "Gastronomia",
    style: "Luxuoso",
    thumbnail: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    colors: ["#f59e0b", "#d97706", "#1c1917"]
  },
  {
    id: "beauty-salon",
    name: "Beauty Salon",
    description: "Salão de beleza feminino e delicado",
    category: "Beleza",
    style: "Feminino",
    thumbnail: "linear-gradient(135deg, #ec4899 0%, #f472b6 100%)",
    colors: ["#ec4899", "#f472b6", "#fdf2f8"]
  },
  {
    id: "fitness-gym",
    name: "Fitness Academy",
    description: "Academia com visual forte e energético",
    category: "Saúde",
    style: "Masculino",
    thumbnail: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    colors: ["#10b981", "#059669", "#111827"]
  },
  {
    id: "agency-creative",
    name: "Creative Agency",
    description: "Agência criativa com design arrojado",
    category: "Agência",
    style: "Criativo",
    thumbnail: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
    colors: ["#8b5cf6", "#7c3aed", "#0f0f0f"]
  },
  {
    id: "consulting-corporate",
    name: "Corporate Consulting",
    description: "Consultoria empresarial profissional",
    category: "Negócios",
    style: "Corporativo",
    thumbnail: "linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)",
    colors: ["#1e40af", "#1e3a8a", "#ffffff"]
  },
  {
    id: "portfolio-minimal",
    name: "Portfolio Minimal",
    description: "Portfólio pessoal minimalista",
    category: "Portfólio",
    style: "Minimalista",
    thumbnail: "linear-gradient(135deg, #374151 0%, #1f2937 100%)",
    colors: ["#374151", "#1f2937", "#f9fafb"]
  },
  {
    id: "real-estate",
    name: "Real Estate",
    description: "Imobiliária com visual premium",
    category: "Imobiliário",
    style: "Premium",
    thumbnail: "linear-gradient(135deg, #ca8a04 0%, #a16207 100%)",
    colors: ["#ca8a04", "#a16207", "#000000"]
  },
  {
    id: "education-online",
    name: "Online Course",
    description: "Plataforma de cursos online",
    category: "Educação",
    style: "Moderno",
    thumbnail: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
    colors: ["#0d9488", "#0f766e", "#ffffff"]
  },
  {
    id: "coffee-shop",
    name: "Coffee Shop",
    description: "Cafeteria aconchegante e moderna",
    category: "Gastronomia",
    style: "Acolhedor",
    thumbnail: "linear-gradient(135deg, #92400e 0%, #78350f 100%)",
    colors: ["#92400e", "#78350f", "#fef3c7"]
  },
  {
    id: "tech-startup",
    name: "Tech Startup",
    description: "Startup de tecnologia inovadora",
    category: "Tecnologia",
    style: "Futurista",
    thumbnail: "linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)",
    colors: ["#7c3aed", "#4c1d95", "#000000"]
  }
];

export const categories = [
  "Todos",
  "E-commerce",
  "Tecnologia",
  "Gastronomia",
  "Beleza",
  "Saúde",
  "Agência",
  "Negócios",
  "Portfólio",
  "Imobiliário",
  "Educação"
];

export const styles = [
  "Todos",
  "Moderno",
  "Minimalista",
  "Luxuoso",
  "Feminino",
  "Masculino",
  "Criativo",
  "Corporativo",
  "Premium",
  "Futurista",
  "Acolhedor"
];
