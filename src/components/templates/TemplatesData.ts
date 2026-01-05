export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  style: string;
  thumbnail: string;
  colors: string[];
  previewHtml?: string; // HTML do site preview
}

// Helper para criar HTML de preview
const createPreviewHtml = (config: {
  name: string;
  tagline: string;
  gradient: string;
  accentColor: string;
  bgColor: string;
  textColor: string;
  features?: string[];
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: ${config.bgColor}; color: ${config.textColor}; }
    .hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem; text-align: center; background: ${config.gradient}; }
    .logo { font-size: 1.5rem; font-weight: 700; margin-bottom: 2rem; color: ${config.accentColor}; }
    h1 { font-size: clamp(2rem, 5vw, 4rem); font-weight: 700; margin-bottom: 1rem; line-height: 1.1; }
    .tagline { font-size: 1.25rem; opacity: 0.8; margin-bottom: 2rem; max-width: 600px; }
    .cta { display: inline-flex; gap: 1rem; flex-wrap: wrap; justify-content: center; }
    .btn { padding: 1rem 2rem; border-radius: 8px; font-weight: 600; text-decoration: none; transition: transform 0.2s; }
    .btn:hover { transform: translateY(-2px); }
    .btn-primary { background: ${config.accentColor}; color: white; }
    .btn-secondary { border: 2px solid ${config.accentColor}; color: ${config.accentColor}; background: transparent; }
    .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; padding: 4rem 2rem; max-width: 1200px; margin: 0 auto; }
    .feature { padding: 2rem; border-radius: 12px; background: rgba(255,255,255,0.05); }
    .feature h3 { font-size: 1.25rem; margin-bottom: 0.5rem; color: ${config.accentColor}; }
    .feature p { opacity: 0.7; }
    .footer { padding: 2rem; text-align: center; opacity: 0.5; font-size: 0.875rem; }
  </style>
</head>
<body>
  <section class="hero">
    <div class="logo">${config.name}</div>
    <h1>${config.name}</h1>
    <p class="tagline">${config.tagline}</p>
    <div class="cta">
      <a href="#" class="btn btn-primary">Começar Agora</a>
      <a href="#" class="btn btn-secondary">Saiba Mais</a>
    </div>
  </section>
  ${config.features ? `
  <section class="features">
    ${config.features.map(f => `<div class="feature"><h3>${f}</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></div>`).join('')}
  </section>
  ` : ''}
  <footer class="footer">© 2024 ${config.name}. Todos os direitos reservados.</footer>
</body>
</html>
`;

export const templates: Template[] = [
  // E-COMMERCE
  {
    id: "ecommerce-fashion",
    name: "Fashion Store",
    description: "Loja de moda elegante com visual clean",
    category: "E-commerce",
    style: "Moderno",
    thumbnail: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    colors: ["#667eea", "#764ba2", "#ffffff"],
    previewHtml: createPreviewHtml({
      name: "Fashion Store",
      tagline: "Descubra as últimas tendências da moda com estilo e elegância",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      accentColor: "#764ba2",
      bgColor: "#0f0f0f",
      textColor: "#ffffff",
      features: ["Coleção Exclusiva", "Frete Grátis", "Devoluções Fáceis"]
    })
  },
  {
    id: "ecommerce-jewelry",
    name: "Joalheria Premium",
    description: "Loja de joias sofisticada e luxuosa",
    category: "E-commerce",
    style: "Luxuoso",
    thumbnail: "linear-gradient(135deg, #d4af37 0%, #8b6914 100%)",
    colors: ["#d4af37", "#8b6914", "#0a0a0a"],
    previewHtml: createPreviewHtml({
      name: "Lumière Joias",
      tagline: "Joias exclusivas que contam histórias de amor e elegância",
      gradient: "linear-gradient(135deg, #d4af37 0%, #8b6914 100%)",
      accentColor: "#d4af37",
      bgColor: "#0a0a0a",
      textColor: "#ffffff",
      features: ["Certificado de Autenticidade", "Design Exclusivo", "Entrega Premium"]
    })
  },
  // TECNOLOGIA
  {
    id: "saas-startup",
    name: "SaaS Startup",
    description: "Landing page para produto digital",
    category: "Tecnologia",
    style: "Minimalista",
    thumbnail: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
    colors: ["#0ea5e9", "#0284c7", "#0f172a"],
    previewHtml: createPreviewHtml({
      name: "CloudFlow",
      tagline: "A plataforma que simplifica seu fluxo de trabalho e aumenta a produtividade",
      gradient: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
      accentColor: "#0ea5e9",
      bgColor: "#0f172a",
      textColor: "#ffffff",
      features: ["Automação Inteligente", "Integrações Poderosas", "Analytics Avançado"]
    })
  },
  {
    id: "tech-startup",
    name: "Tech Startup",
    description: "Startup de tecnologia inovadora",
    category: "Tecnologia",
    style: "Futurista",
    thumbnail: "linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)",
    colors: ["#7c3aed", "#4c1d95", "#000000"],
    previewHtml: createPreviewHtml({
      name: "NexaTech",
      tagline: "Transformando o futuro com inteligência artificial e inovação",
      gradient: "linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)",
      accentColor: "#7c3aed",
      bgColor: "#000000",
      textColor: "#ffffff",
      features: ["AI-Powered", "Blockchain Ready", "Cloud Native"]
    })
  },
  {
    id: "app-mobile",
    name: "App Mobile",
    description: "Landing page para aplicativo móvel",
    category: "Tecnologia",
    style: "Moderno",
    thumbnail: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
    colors: ["#06b6d4", "#0891b2", "#0c1222"],
    previewHtml: createPreviewHtml({
      name: "AppFlow",
      tagline: "O aplicativo que revoluciona a forma como você gerencia seu dia",
      gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
      accentColor: "#06b6d4",
      bgColor: "#0c1222",
      textColor: "#ffffff",
      features: ["Download Gratuito", "Disponível iOS e Android", "Sincronização em Nuvem"]
    })
  },
  // GASTRONOMIA
  {
    id: "restaurant-premium",
    name: "Restaurante Premium",
    description: "Site gastronômico sofisticado",
    category: "Gastronomia",
    style: "Luxuoso",
    thumbnail: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    colors: ["#f59e0b", "#d97706", "#1c1917"],
    previewHtml: createPreviewHtml({
      name: "Saveur",
      tagline: "Uma experiência gastronômica única que encanta todos os sentidos",
      gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
      accentColor: "#f59e0b",
      bgColor: "#1c1917",
      textColor: "#ffffff",
      features: ["Chef Premiado", "Ingredientes Selecionados", "Ambiente Exclusivo"]
    })
  },
  {
    id: "coffee-shop",
    name: "Coffee Shop",
    description: "Cafeteria aconchegante e moderna",
    category: "Gastronomia",
    style: "Acolhedor",
    thumbnail: "linear-gradient(135deg, #92400e 0%, #78350f 100%)",
    colors: ["#92400e", "#78350f", "#fef3c7"],
    previewHtml: createPreviewHtml({
      name: "Brew & Bean",
      tagline: "Café artesanal com amor e dedicação em cada xícara",
      gradient: "linear-gradient(135deg, #92400e 0%, #78350f 100%)",
      accentColor: "#92400e",
      bgColor: "#1c1917",
      textColor: "#fef3c7",
      features: ["Grãos Selecionados", "Torrefação Própria", "Ambiente Acolhedor"]
    })
  },
  {
    id: "bakery",
    name: "Padaria Artesanal",
    description: "Padaria com produtos frescos e caseiros",
    category: "Gastronomia",
    style: "Acolhedor",
    thumbnail: "linear-gradient(135deg, #c2410c 0%, #9a3412 100%)",
    colors: ["#c2410c", "#9a3412", "#fef3c7"],
    previewHtml: createPreviewHtml({
      name: "Pão & Arte",
      tagline: "Pães artesanais feitos com ingredientes frescos e muito carinho",
      gradient: "linear-gradient(135deg, #c2410c 0%, #9a3412 100%)",
      accentColor: "#c2410c",
      bgColor: "#1f1510",
      textColor: "#fef3c7",
      features: ["Receitas Tradicionais", "Produtos Frescos Diariamente", "Delivery"]
    })
  },
  // BELEZA & SAÚDE
  {
    id: "beauty-salon",
    name: "Beauty Salon",
    description: "Salão de beleza feminino e delicado",
    category: "Beleza",
    style: "Feminino",
    thumbnail: "linear-gradient(135deg, #ec4899 0%, #f472b6 100%)",
    colors: ["#ec4899", "#f472b6", "#fdf2f8"],
    previewHtml: createPreviewHtml({
      name: "Glow Beauty",
      tagline: "Realce sua beleza natural com nossos tratamentos exclusivos",
      gradient: "linear-gradient(135deg, #ec4899 0%, #f472b6 100%)",
      accentColor: "#ec4899",
      bgColor: "#1a0a12",
      textColor: "#fdf2f8",
      features: ["Profissionais Especializados", "Produtos Premium", "Ambiente Relaxante"]
    })
  },
  {
    id: "spa-wellness",
    name: "Spa & Wellness",
    description: "Centro de bem-estar e relaxamento",
    category: "Beleza",
    style: "Minimalista",
    thumbnail: "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)",
    colors: ["#14b8a6", "#0d9488", "#f0fdfa"],
    previewHtml: createPreviewHtml({
      name: "Zen Spa",
      tagline: "Encontre seu equilíbrio interior com nossas terapias de relaxamento",
      gradient: "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)",
      accentColor: "#14b8a6",
      bgColor: "#0a1612",
      textColor: "#f0fdfa",
      features: ["Massagens Relaxantes", "Aromaterapia", "Ambiente Zen"]
    })
  },
  {
    id: "fitness-gym",
    name: "Fitness Academy",
    description: "Academia com visual forte e energético",
    category: "Saúde",
    style: "Masculino",
    thumbnail: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    colors: ["#10b981", "#059669", "#111827"],
    previewHtml: createPreviewHtml({
      name: "PowerFit",
      tagline: "Transforme seu corpo e sua mente com treinos de alta performance",
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      accentColor: "#10b981",
      bgColor: "#111827",
      textColor: "#ffffff",
      features: ["Personal Trainers", "Equipamentos Modernos", "Aulas em Grupo"]
    })
  },
  {
    id: "personal-trainer",
    name: "Personal Trainer",
    description: "Site para personal trainer profissional",
    category: "Saúde",
    style: "Masculino",
    thumbnail: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
    colors: ["#ef4444", "#dc2626", "#0f0f0f"],
    previewHtml: createPreviewHtml({
      name: "FitPro",
      tagline: "Treinamento personalizado para alcançar seus objetivos",
      gradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
      accentColor: "#ef4444",
      bgColor: "#0f0f0f",
      textColor: "#ffffff",
      features: ["Planos Personalizados", "Acompanhamento Online", "Resultados Garantidos"]
    })
  },
  {
    id: "nutritionist",
    name: "Nutricionista",
    description: "Site para nutricionista e consultoria alimentar",
    category: "Saúde",
    style: "Moderno",
    thumbnail: "linear-gradient(135deg, #84cc16 0%, #65a30d 100%)",
    colors: ["#84cc16", "#65a30d", "#0f0f0f"],
    previewHtml: createPreviewHtml({
      name: "NutriVida",
      tagline: "Alimentação saudável e equilibrada para uma vida melhor",
      gradient: "linear-gradient(135deg, #84cc16 0%, #65a30d 100%)",
      accentColor: "#84cc16",
      bgColor: "#0f0f0f",
      textColor: "#ffffff",
      features: ["Consultas Online", "Planos Alimentares", "Acompanhamento Nutricional"]
    })
  },
  {
    id: "psychologist",
    name: "Psicólogo",
    description: "Site para psicólogo e terapia",
    category: "Saúde",
    style: "Minimalista",
    thumbnail: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
    colors: ["#8b5cf6", "#7c3aed", "#f5f3ff"],
    previewHtml: createPreviewHtml({
      name: "MindCare",
      tagline: "Cuidando da sua saúde mental com acolhimento e profissionalismo",
      gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      accentColor: "#8b5cf6",
      bgColor: "#0f0a1a",
      textColor: "#f5f3ff",
      features: ["Terapia Online", "Ambiente Acolhedor", "Confidencialidade Total"]
    })
  },
  // SERVIÇOS PROFISSIONAIS
  {
    id: "photographer",
    name: "Fotógrafo",
    description: "Portfolio para fotógrafo profissional",
    category: "Serviços",
    style: "Criativo",
    thumbnail: "linear-gradient(135deg, #374151 0%, #1f2937 100%)",
    colors: ["#374151", "#1f2937", "#ffffff"],
    previewHtml: createPreviewHtml({
      name: "Lens Studio",
      tagline: "Capturando momentos únicos com arte e sensibilidade",
      gradient: "linear-gradient(135deg, #374151 0%, #1f2937 100%)",
      accentColor: "#f97316",
      bgColor: "#0f0f0f",
      textColor: "#ffffff",
      features: ["Ensaios Fotográficos", "Eventos", "Edição Profissional"]
    })
  },
  {
    id: "lawyer",
    name: "Advogado",
    description: "Site para escritório de advocacia",
    category: "Serviços",
    style: "Corporativo",
    thumbnail: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)",
    colors: ["#1e3a8a", "#1e40af", "#ffffff"],
    previewHtml: createPreviewHtml({
      name: "Justo & Associados",
      tagline: "Advocacia especializada com ética e excelência",
      gradient: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)",
      accentColor: "#3b82f6",
      bgColor: "#0c1222",
      textColor: "#ffffff",
      features: ["Direito Empresarial", "Direito Civil", "Consultoria Jurídica"]
    })
  },
  {
    id: "dentist",
    name: "Dentista",
    description: "Clínica odontológica moderna",
    category: "Saúde",
    style: "Moderno",
    thumbnail: "linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%)",
    colors: ["#22d3ee", "#06b6d4", "#ffffff"],
    previewHtml: createPreviewHtml({
      name: "Smile Clinic",
      tagline: "Sorrisos saudáveis e bonitos com tecnologia de ponta",
      gradient: "linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%)",
      accentColor: "#06b6d4",
      bgColor: "#0c1620",
      textColor: "#ffffff",
      features: ["Clareamento Dental", "Implantes", "Ortodontia"]
    })
  },
  {
    id: "architect",
    name: "Arquiteto",
    description: "Portfolio de arquitetura e design",
    category: "Serviços",
    style: "Minimalista",
    thumbnail: "linear-gradient(135deg, #4b5563 0%, #374151 100%)",
    colors: ["#4b5563", "#374151", "#f9fafb"],
    previewHtml: createPreviewHtml({
      name: "Arq Studio",
      tagline: "Design de interiores e arquitetura com estilo único",
      gradient: "linear-gradient(135deg, #4b5563 0%, #374151 100%)",
      accentColor: "#f59e0b",
      bgColor: "#0f0f0f",
      textColor: "#f9fafb",
      features: ["Projetos Residenciais", "Comerciais", "Paisagismo"]
    })
  },
  {
    id: "barber-shop",
    name: "Barbearia",
    description: "Barbearia masculina moderna",
    category: "Beleza",
    style: "Masculino",
    thumbnail: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    colors: ["#0f172a", "#1e293b", "#d4af37"],
    previewHtml: createPreviewHtml({
      name: "The Barber",
      tagline: "Cortes clássicos e modernos para o homem contemporâneo",
      gradient: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      accentColor: "#d4af37",
      bgColor: "#0f172a",
      textColor: "#ffffff",
      features: ["Cortes Exclusivos", "Barba & Bigode", "Produtos Premium"]
    })
  },
  // AGÊNCIAS & NEGÓCIOS
  {
    id: "agency-creative",
    name: "Creative Agency",
    description: "Agência criativa com design arrojado",
    category: "Agência",
    style: "Criativo",
    thumbnail: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
    colors: ["#8b5cf6", "#7c3aed", "#0f0f0f"],
    previewHtml: createPreviewHtml({
      name: "Pixel Agency",
      tagline: "Criatividade sem limites para transformar marcas",
      gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      accentColor: "#8b5cf6",
      bgColor: "#0f0f0f",
      textColor: "#ffffff",
      features: ["Branding", "Design Digital", "Campanhas Criativas"]
    })
  },
  {
    id: "consulting-corporate",
    name: "Corporate Consulting",
    description: "Consultoria empresarial profissional",
    category: "Negócios",
    style: "Corporativo",
    thumbnail: "linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)",
    colors: ["#1e40af", "#1e3a8a", "#ffffff"],
    previewHtml: createPreviewHtml({
      name: "Stratex",
      tagline: "Estratégias corporativas para impulsionar seu negócio",
      gradient: "linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)",
      accentColor: "#3b82f6",
      bgColor: "#0c1222",
      textColor: "#ffffff",
      features: ["Consultoria Estratégica", "Análise de Mercado", "Planejamento"]
    })
  },
  {
    id: "marketing-agency",
    name: "Marketing Digital",
    description: "Agência de marketing digital",
    category: "Agência",
    style: "Moderno",
    thumbnail: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
    colors: ["#f97316", "#ea580c", "#0f0f0f"],
    previewHtml: createPreviewHtml({
      name: "GrowthLab",
      tagline: "Escalando negócios com marketing digital de alta performance",
      gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
      accentColor: "#f97316",
      bgColor: "#0f0f0f",
      textColor: "#ffffff",
      features: ["Tráfego Pago", "Social Media", "SEO & Content"]
    })
  },
  // PORTFÓLIO & EDUCAÇÃO
  {
    id: "portfolio-minimal",
    name: "Portfolio Minimal",
    description: "Portfólio pessoal minimalista",
    category: "Portfólio",
    style: "Minimalista",
    thumbnail: "linear-gradient(135deg, #374151 0%, #1f2937 100%)",
    colors: ["#374151", "#1f2937", "#f9fafb"],
    previewHtml: createPreviewHtml({
      name: "Portfolio",
      tagline: "Design, desenvolvimento e criatividade em cada projeto",
      gradient: "linear-gradient(135deg, #374151 0%, #1f2937 100%)",
      accentColor: "#10b981",
      bgColor: "#0a0a0a",
      textColor: "#f9fafb",
      features: ["Web Design", "Desenvolvimento", "UX/UI"]
    })
  },
  {
    id: "education-online",
    name: "Online Course",
    description: "Plataforma de cursos online",
    category: "Educação",
    style: "Moderno",
    thumbnail: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
    colors: ["#0d9488", "#0f766e", "#ffffff"],
    previewHtml: createPreviewHtml({
      name: "EduPro",
      tagline: "Aprenda novas habilidades com cursos online de qualidade",
      gradient: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
      accentColor: "#0d9488",
      bgColor: "#0a1612",
      textColor: "#ffffff",
      features: ["Cursos em Vídeo", "Certificados", "Comunidade Exclusiva"]
    })
  },
  // IMOBILIÁRIO
  {
    id: "real-estate",
    name: "Real Estate",
    description: "Imobiliária com visual premium",
    category: "Imobiliário",
    style: "Premium",
    thumbnail: "linear-gradient(135deg, #ca8a04 0%, #a16207 100%)",
    colors: ["#ca8a04", "#a16207", "#000000"],
    previewHtml: createPreviewHtml({
      name: "Prime Imóveis",
      tagline: "Encontre o imóvel dos seus sonhos com nossa consultoria exclusiva",
      gradient: "linear-gradient(135deg, #ca8a04 0%, #a16207 100%)",
      accentColor: "#ca8a04",
      bgColor: "#0a0a0a",
      textColor: "#ffffff",
      features: ["Imóveis de Luxo", "Consultoria Personalizada", "Financiamento"]
    })
  },
  // EVENTOS
  {
    id: "wedding-planner",
    name: "Wedding Planner",
    description: "Organizadora de casamentos",
    category: "Eventos",
    style: "Feminino",
    thumbnail: "linear-gradient(135deg, #fda4af 0%, #fb7185 100%)",
    colors: ["#fda4af", "#fb7185", "#fff1f2"],
    previewHtml: createPreviewHtml({
      name: "Love Events",
      tagline: "Realizando o casamento dos seus sonhos com carinho e perfeição",
      gradient: "linear-gradient(135deg, #fda4af 0%, #fb7185 100%)",
      accentColor: "#f43f5e",
      bgColor: "#1a0a0c",
      textColor: "#fff1f2",
      features: ["Decoração", "Buffet", "Organização Completa"]
    })
  },
  {
    id: "event-space",
    name: "Espaço de Eventos",
    description: "Locação de espaços para eventos",
    category: "Eventos",
    style: "Premium",
    thumbnail: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
    colors: ["#6366f1", "#4f46e5", "#ffffff"],
    previewHtml: createPreviewHtml({
      name: "The Venue",
      tagline: "O espaço perfeito para seus eventos corporativos e celebrações",
      gradient: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
      accentColor: "#6366f1",
      bgColor: "#0c0a1a",
      textColor: "#ffffff",
      features: ["Eventos Corporativos", "Casamentos", "Formaturas"]
    })
  },
  // PETS
  {
    id: "pet-shop",
    name: "Pet Shop",
    description: "Loja e serviços para pets",
    category: "Pets",
    style: "Moderno",
    thumbnail: "linear-gradient(135deg, #f472b6 0%, #ec4899 100%)",
    colors: ["#f472b6", "#ec4899", "#fdf2f8"],
    previewHtml: createPreviewHtml({
      name: "PetLove",
      tagline: "Tudo para o bem-estar e felicidade do seu melhor amigo",
      gradient: "linear-gradient(135deg, #f472b6 0%, #ec4899 100%)",
      accentColor: "#ec4899",
      bgColor: "#1a0a12",
      textColor: "#fdf2f8",
      features: ["Banho e Tosa", "Ração Premium", "Acessórios"]
    })
  },
  {
    id: "veterinary",
    name: "Veterinário",
    description: "Clínica veterinária moderna",
    category: "Pets",
    style: "Moderno",
    thumbnail: "linear-gradient(135deg, #34d399 0%, #10b981 100%)",
    colors: ["#34d399", "#10b981", "#f0fdf4"],
    previewHtml: createPreviewHtml({
      name: "VetCare",
      tagline: "Cuidado veterinário de excelência para seu pet",
      gradient: "linear-gradient(135deg, #34d399 0%, #10b981 100%)",
      accentColor: "#10b981",
      bgColor: "#0a1612",
      textColor: "#f0fdf4",
      features: ["Consultas", "Vacinas", "Emergência 24h"]
    })
  }
];

export const categories = [
  "Todos",
  "E-commerce",
  "Tecnologia",
  "Gastronomia",
  "Beleza",
  "Saúde",
  "Serviços",
  "Agência",
  "Negócios",
  "Portfólio",
  "Imobiliário",
  "Educação",
  "Eventos",
  "Pets"
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
