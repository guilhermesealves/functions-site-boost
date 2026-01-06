export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  style: string;
  thumbnail: string;
  colors: string[];
  type: "website" | "logo" | "both";
  previewHtml?: string;
  logoSvg?: string;
  popular?: boolean;
}

export const categories = [
  "Todos",
  "Saúde & Fitness",
  "Beleza",
  "Gastronomia",
  "Serviços",
  "E-commerce",
  "Tecnologia",
  "Educação",
  "Agência"
];

export const styles = [
  "Todos",
  "Moderno",
  "Minimalista",
  "Luxuoso",
  "Masculino",
  "Feminino",
  "Criativo",
  "Corporativo"
];

// Template de Personal Trainer - Energia e Força
const personalTrainerHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: #0a0a0a; color: #fff; }
    .hero { min-height: 100vh; position: relative; display: flex; align-items: center; background: linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 100%); overflow: hidden; }
    .hero::before { content: ''; position: absolute; right: -20%; top: -20%; width: 80%; height: 140%; background: linear-gradient(180deg, #ef4444 0%, #dc2626 50%, #991b1b 100%); border-radius: 50%; opacity: 0.1; filter: blur(100px); }
    .hero-content { max-width: 1200px; margin: 0 auto; padding: 2rem; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; position: relative; z-index: 1; }
    .badge { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 50px; color: #ef4444; font-size: 0.875rem; font-weight: 500; margin-bottom: 1.5rem; }
    h1 { font-family: 'Bebas Neue', cursive; font-size: clamp(3rem, 8vw, 6rem); line-height: 0.95; margin-bottom: 1.5rem; letter-spacing: 2px; }
    h1 span { color: #ef4444; }
    .tagline { font-size: 1.25rem; color: rgba(255,255,255,0.6); margin-bottom: 2.5rem; max-width: 500px; line-height: 1.6; }
    .cta-group { display: flex; gap: 1rem; flex-wrap: wrap; }
    .btn { padding: 1rem 2.5rem; border-radius: 50px; font-weight: 600; text-decoration: none; transition: all 0.3s; display: inline-flex; align-items: center; gap: 0.5rem; font-size: 1rem; }
    .btn-primary { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; box-shadow: 0 10px 40px rgba(239, 68, 68, 0.3); }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 15px 50px rgba(239, 68, 68, 0.4); }
    .btn-secondary { border: 2px solid rgba(255,255,255,0.2); color: white; background: transparent; }
    .btn-secondary:hover { border-color: #ef4444; }
    .hero-image { position: relative; }
    .hero-image::before { content: ''; position: absolute; inset: -20px; background: linear-gradient(135deg, #ef4444 0%, transparent 50%); border-radius: 30px; opacity: 0.3; transform: rotate(5deg); }
    .image-placeholder { aspect-ratio: 3/4; background: linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%); border-radius: 20px; display: flex; align-items: flex-end; justify-content: center; position: relative; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); }
    .image-placeholder::after { content: '💪'; font-size: 8rem; filter: grayscale(100%); opacity: 0.3; }
    .stats { display: flex; gap: 3rem; margin-top: 3rem; }
    .stat { text-align: center; }
    .stat-number { font-family: 'Bebas Neue', cursive; font-size: 3rem; color: #ef4444; line-height: 1; }
    .stat-label { font-size: 0.875rem; color: rgba(255,255,255,0.5); margin-top: 0.5rem; }
    
    .services { padding: 6rem 2rem; background: #0f0f0f; }
    .section-title { font-family: 'Bebas Neue', cursive; font-size: 3rem; text-align: center; margin-bottom: 3rem; letter-spacing: 2px; }
    .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; max-width: 1200px; margin: 0 auto; }
    .service-card { padding: 2.5rem; background: linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, transparent 100%); border: 1px solid rgba(239, 68, 68, 0.1); border-radius: 20px; transition: all 0.3s; }
    .service-card:hover { transform: translateY(-10px); border-color: rgba(239, 68, 68, 0.3); }
    .service-icon { width: 60px; height: 60px; background: linear-gradient(135deg, #ef4444, #dc2626); border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 1.5rem; }
    .service-card h3 { font-size: 1.25rem; margin-bottom: 0.75rem; }
    .service-card p { color: rgba(255,255,255,0.5); font-size: 0.95rem; line-height: 1.6; }
    
    .testimonials { padding: 6rem 2rem; background: #0a0a0a; }
    .testimonial-card { max-width: 800px; margin: 0 auto; text-align: center; padding: 3rem; background: linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, transparent 100%); border-radius: 30px; border: 1px solid rgba(239, 68, 68, 0.1); }
    .testimonial-text { font-size: 1.5rem; line-height: 1.6; margin-bottom: 2rem; font-style: italic; color: rgba(255,255,255,0.8); }
    .testimonial-author { display: flex; align-items: center; justify-content: center; gap: 1rem; }
    .author-avatar { width: 50px; height: 50px; border-radius: 50%; background: #ef4444; display: flex; align-items: center; justify-content: center; font-weight: 700; }
    .author-info { text-align: left; }
    .author-name { font-weight: 600; }
    .author-title { font-size: 0.875rem; color: rgba(255,255,255,0.5); }
    
    .cta-section { padding: 8rem 2rem; text-align: center; background: linear-gradient(180deg, #0a0a0a 0%, #1a0505 50%, #0a0a0a 100%); }
    .cta-title { font-family: 'Bebas Neue', cursive; font-size: 4rem; margin-bottom: 1rem; letter-spacing: 2px; }
    .cta-text { font-size: 1.25rem; color: rgba(255,255,255,0.6); margin-bottom: 2.5rem; }
    
    footer { padding: 3rem 2rem; border-top: 1px solid rgba(255,255,255,0.05); text-align: center; color: rgba(255,255,255,0.4); font-size: 0.875rem; }
  </style>
</head>
<body>
  <section class="hero">
    <div class="hero-content">
      <div>
        <div class="badge">🔥 #1 Personal Trainer da Região</div>
        <h1>TRANSFORME<br/>SEU <span>CORPO</span></h1>
        <p class="tagline">Treinos personalizados com acompanhamento profissional para você alcançar resultados reais em 90 dias ou menos.</p>
        <div class="cta-group">
          <a href="#" class="btn btn-primary">Agendar Avaliação Grátis</a>
          <a href="#" class="btn btn-secondary">Ver Resultados</a>
        </div>
        <div class="stats">
          <div class="stat">
            <div class="stat-number">500+</div>
            <div class="stat-label">Alunos Transformados</div>
          </div>
          <div class="stat">
            <div class="stat-number">8</div>
            <div class="stat-label">Anos de Experiência</div>
          </div>
          <div class="stat">
            <div class="stat-number">98%</div>
            <div class="stat-label">Taxa de Sucesso</div>
          </div>
        </div>
      </div>
      <div class="hero-image">
        <div class="image-placeholder"></div>
      </div>
    </div>
  </section>

  <section class="services">
    <h2 class="section-title">NOSSOS PROGRAMAS</h2>
    <div class="services-grid">
      <div class="service-card">
        <div class="service-icon">🏋️</div>
        <h3>Treino Presencial</h3>
        <p>Acompanhamento individual em academia com correção de movimento e motivação constante.</p>
      </div>
      <div class="service-card">
        <div class="service-icon">📱</div>
        <h3>Consultoria Online</h3>
        <p>Treinos personalizados via app com vídeos explicativos e suporte por WhatsApp.</p>
      </div>
      <div class="service-card">
        <div class="service-icon">🥗</div>
        <h3>Plano Nutricional</h3>
        <p>Dieta alinhada com seus objetivos, criada em parceria com nutricionista.</p>
      </div>
      <div class="service-card">
        <div class="service-icon">📊</div>
        <h3>Avaliação Física</h3>
        <p>Análise completa de composição corporal e definição de metas realistas.</p>
      </div>
    </div>
  </section>

  <section class="testimonials">
    <h2 class="section-title">O QUE DIZEM NOSSOS ALUNOS</h2>
    <div class="testimonial-card">
      <p class="testimonial-text">"Em 3 meses perdi 15kg e ganhei muito mais disposição. O método é incrível e o acompanhamento faz toda diferença!"</p>
      <div class="testimonial-author">
        <div class="author-avatar">MR</div>
        <div class="author-info">
          <div class="author-name">Maria Rodrigues</div>
          <div class="author-title">Perdeu 15kg em 90 dias</div>
        </div>
      </div>
    </div>
  </section>

  <section class="cta-section">
    <h2 class="cta-title">PRONTO PARA MUDAR?</h2>
    <p class="cta-text">Sua primeira avaliação física é 100% gratuita</p>
    <a href="#" class="btn btn-primary">Quero Começar Agora</a>
  </section>

  <footer>© 2024 FitPro Personal. Todos os direitos reservados.</footer>
</body>
</html>`;

// Template de Fotógrafo - Elegante e Artístico
const photographerHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: #0a0a0a; color: #fff; }
    
    nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 1.5rem 3rem; display: flex; justify-content: space-between; align-items: center; background: rgba(10,10,10,0.8); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.05); }
    .logo { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 600; letter-spacing: 4px; }
    .nav-links { display: flex; gap: 2.5rem; }
    .nav-links a { color: rgba(255,255,255,0.6); text-decoration: none; font-size: 0.875rem; letter-spacing: 1px; transition: color 0.3s; }
    .nav-links a:hover { color: #fff; }
    
    .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; position: relative; overflow: hidden; }
    .hero::before { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%); }
    .hero-bg { position: absolute; inset: 0; background: linear-gradient(45deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); }
    .hero-content { position: relative; z-index: 1; max-width: 900px; padding: 2rem; }
    .hero-subtitle { font-size: 0.875rem; letter-spacing: 6px; color: rgba(255,255,255,0.5); margin-bottom: 2rem; text-transform: uppercase; }
    h1 { font-family: 'Playfair Display', serif; font-size: clamp(3rem, 10vw, 7rem); font-weight: 400; line-height: 1.1; margin-bottom: 2rem; }
    h1 em { font-style: italic; color: #e0a370; }
    .hero-text { font-size: 1.125rem; color: rgba(255,255,255,0.6); max-width: 600px; margin: 0 auto 3rem; line-height: 1.8; }
    .btn { padding: 1.25rem 3rem; background: transparent; border: 1px solid rgba(255,255,255,0.3); color: white; font-size: 0.875rem; letter-spacing: 2px; cursor: pointer; transition: all 0.3s; text-decoration: none; }
    .btn:hover { background: white; color: #0a0a0a; }
    
    .portfolio { padding: 8rem 3rem; }
    .section-header { text-align: center; margin-bottom: 4rem; }
    .section-label { font-size: 0.75rem; letter-spacing: 4px; color: #e0a370; margin-bottom: 1rem; text-transform: uppercase; }
    .section-title { font-family: 'Playfair Display', serif; font-size: 2.5rem; font-weight: 400; }
    .gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; max-width: 1400px; margin: 0 auto; }
    .gallery-item { aspect-ratio: 4/5; background: linear-gradient(135deg, #1a1a2e, #16213e); border-radius: 4px; overflow: hidden; position: relative; cursor: pointer; transition: transform 0.5s; }
    .gallery-item:hover { transform: scale(1.02); }
    .gallery-item::after { content: ''; position: absolute; inset: 0; background: linear-gradient(0deg, rgba(0,0,0,0.5) 0%, transparent 50%); opacity: 0; transition: opacity 0.3s; }
    .gallery-item:hover::after { opacity: 1; }
    .gallery-item:nth-child(2) { grid-row: span 2; }
    .gallery-item:nth-child(5) { grid-column: span 2; aspect-ratio: 16/9; }
    
    .about { padding: 8rem 3rem; background: #0f0f0f; }
    .about-content { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: center; }
    .about-image { aspect-ratio: 3/4; background: linear-gradient(135deg, #1a1a2e, #16213e); border-radius: 4px; position: relative; }
    .about-image::before { content: '📸'; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 5rem; opacity: 0.3; }
    .about-text h2 { font-family: 'Playfair Display', serif; font-size: 2.5rem; font-weight: 400; margin-bottom: 2rem; }
    .about-text p { color: rgba(255,255,255,0.6); line-height: 1.8; margin-bottom: 1.5rem; }
    .signature { font-family: 'Playfair Display', serif; font-size: 2rem; font-style: italic; color: #e0a370; margin-top: 2rem; }
    
    .services { padding: 8rem 3rem; }
    .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; max-width: 1200px; margin: 0 auto; }
    .service { padding: 3rem; border: 1px solid rgba(255,255,255,0.1); text-align: center; transition: all 0.3s; }
    .service:hover { border-color: #e0a370; background: rgba(224, 163, 112, 0.05); }
    .service h3 { font-family: 'Playfair Display', serif; font-size: 1.5rem; margin-bottom: 1rem; font-weight: 400; }
    .service p { color: rgba(255,255,255,0.5); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem; }
    .service-price { font-size: 1.5rem; color: #e0a370; }
    
    .contact { padding: 8rem 3rem; text-align: center; background: linear-gradient(180deg, #0a0a0a 0%, #0f0f14 100%); }
    .contact h2 { font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 400; margin-bottom: 1rem; }
    .contact p { color: rgba(255,255,255,0.5); margin-bottom: 3rem; font-size: 1.125rem; }
    
    footer { padding: 3rem; text-align: center; border-top: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.3); font-size: 0.875rem; letter-spacing: 2px; }
  </style>
</head>
<body>
  <nav>
    <div class="logo">LENS STUDIO</div>
    <div class="nav-links">
      <a href="#">Portfolio</a>
      <a href="#">Sobre</a>
      <a href="#">Serviços</a>
      <a href="#">Contato</a>
    </div>
  </nav>

  <section class="hero">
    <div class="hero-bg"></div>
    <div class="hero-content">
      <div class="hero-subtitle">Fotografia Fine Art</div>
      <h1>Capturando <em>momentos</em> eternos</h1>
      <p class="hero-text">Transformo instantes em memórias inesquecíveis através de uma fotografia autêntica e emocional que conta a sua história.</p>
      <a href="#" class="btn">VER PORTFOLIO</a>
    </div>
  </section>

  <section class="portfolio">
    <div class="section-header">
      <div class="section-label">Portfolio</div>
      <h2 class="section-title">Trabalhos Selecionados</h2>
    </div>
    <div class="gallery">
      <div class="gallery-item"></div>
      <div class="gallery-item"></div>
      <div class="gallery-item"></div>
      <div class="gallery-item"></div>
      <div class="gallery-item"></div>
      <div class="gallery-item"></div>
    </div>
  </section>

  <section class="about">
    <div class="about-content">
      <div class="about-image"></div>
      <div class="about-text">
        <h2>Sobre Mim</h2>
        <p>Há mais de 10 anos, dedico minha vida a capturar a essência dos momentos mais importantes. Cada clique é uma busca pela perfeição, cada imagem uma obra de arte.</p>
        <p>Minha abordagem combina técnica refinada com sensibilidade artística, resultando em fotografias que transcendem o comum e revelam a beleza oculta em cada cena.</p>
        <div class="signature">Amanda Santos</div>
      </div>
    </div>
  </section>

  <section class="services">
    <div class="section-header">
      <div class="section-label">Serviços</div>
      <h2 class="section-title">Como Posso Ajudar</h2>
    </div>
    <div class="services-grid">
      <div class="service">
        <h3>Casamentos</h3>
        <p>Cobertura completa do seu grande dia com toda a emoção e delicadeza que o momento merece.</p>
        <div class="service-price">A partir de R$ 4.500</div>
      </div>
      <div class="service">
        <h3>Ensaios</h3>
        <p>Sessões fotográficas personalizadas para famílias, casais, gestantes e retratos individuais.</p>
        <div class="service-price">A partir de R$ 800</div>
      </div>
      <div class="service">
        <h3>Eventos</h3>
        <p>Cobertura profissional de eventos corporativos, festas e celebrações especiais.</p>
        <div class="service-price">A partir de R$ 1.200</div>
      </div>
    </div>
  </section>

  <section class="contact">
    <h2>Vamos Criar Juntos?</h2>
    <p>Entre em contato e transforme seus momentos em arte</p>
    <a href="#" class="btn">AGENDAR SESSÃO</a>
  </section>

  <footer>© 2024 LENS STUDIO • FOTOGRAFIA PROFISSIONAL</footer>
</body>
</html>`;

// Template Nutricionista - Saúde e Verde
const nutritionistHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'DM Sans', sans-serif; background: #fafdf7; color: #1a2e1a; }
    
    nav { padding: 1.5rem 3rem; display: flex; justify-content: space-between; align-items: center; background: white; position: sticky; top: 0; z-index: 100; box-shadow: 0 2px 20px rgba(0,0,0,0.03); }
    .logo { font-family: 'DM Serif Display', serif; font-size: 1.75rem; color: #2d5a27; display: flex; align-items: center; gap: 0.5rem; }
    .logo span { font-size: 1.5rem; }
    .nav-links { display: flex; gap: 2.5rem; }
    .nav-links a { color: #1a2e1a; text-decoration: none; font-size: 0.95rem; font-weight: 500; transition: color 0.3s; }
    .nav-links a:hover { color: #2d5a27; }
    .nav-cta { padding: 0.875rem 1.75rem; background: #2d5a27; color: white; border-radius: 50px; font-weight: 600; text-decoration: none; transition: all 0.3s; }
    .nav-cta:hover { background: #1e3d1a; transform: translateY(-2px); }
    
    .hero { padding: 6rem 3rem; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; max-width: 1400px; margin: 0 auto; }
    .badge { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: rgba(45, 90, 39, 0.1); border-radius: 50px; color: #2d5a27; font-size: 0.875rem; font-weight: 500; margin-bottom: 1.5rem; }
    h1 { font-family: 'DM Serif Display', serif; font-size: clamp(2.5rem, 5vw, 4rem); line-height: 1.15; margin-bottom: 1.5rem; color: #1a2e1a; }
    h1 span { color: #2d5a27; }
    .tagline { font-size: 1.125rem; color: #4a6347; margin-bottom: 2.5rem; line-height: 1.7; }
    .cta-group { display: flex; gap: 1rem; flex-wrap: wrap; }
    .btn { padding: 1rem 2rem; border-radius: 50px; font-weight: 600; text-decoration: none; transition: all 0.3s; display: inline-flex; align-items: center; gap: 0.5rem; }
    .btn-primary { background: #2d5a27; color: white; box-shadow: 0 10px 30px rgba(45, 90, 39, 0.2); }
    .btn-primary:hover { background: #1e3d1a; transform: translateY(-2px); }
    .btn-secondary { border: 2px solid #2d5a27; color: #2d5a27; background: transparent; }
    .btn-secondary:hover { background: rgba(45, 90, 39, 0.05); }
    .hero-image { position: relative; }
    .hero-visual { aspect-ratio: 1; background: linear-gradient(135deg, #e8f5e3 0%, #d4edcf 100%); border-radius: 30px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
    .hero-visual::before { content: '🥗'; font-size: 12rem; opacity: 0.8; }
    .floating-card { position: absolute; background: white; padding: 1.25rem; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.08); }
    .floating-card.top-right { top: 10%; right: -10%; }
    .floating-card.bottom-left { bottom: 15%; left: -10%; }
    .floating-icon { font-size: 2rem; margin-bottom: 0.5rem; }
    .floating-text { font-weight: 600; color: #1a2e1a; }
    .floating-subtext { font-size: 0.75rem; color: #4a6347; }
    
    .features { padding: 6rem 3rem; background: white; }
    .section-header { text-align: center; max-width: 600px; margin: 0 auto 4rem; }
    .section-label { font-size: 0.875rem; color: #2d5a27; font-weight: 600; margin-bottom: 0.75rem; letter-spacing: 2px; text-transform: uppercase; }
    .section-title { font-family: 'DM Serif Display', serif; font-size: 2.5rem; color: #1a2e1a; }
    .features-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; max-width: 1200px; margin: 0 auto; }
    .feature-card { padding: 2rem; background: #fafdf7; border-radius: 20px; text-align: center; transition: all 0.3s; }
    .feature-card:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(45, 90, 39, 0.1); }
    .feature-icon { width: 70px; height: 70px; background: linear-gradient(135deg, #2d5a27, #4a8c41); border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 1.75rem; margin: 0 auto 1.5rem; }
    .feature-card h3 { font-size: 1.125rem; margin-bottom: 0.75rem; color: #1a2e1a; }
    .feature-card p { color: #4a6347; font-size: 0.95rem; line-height: 1.6; }
    
    .programs { padding: 6rem 3rem; background: #2d5a27; color: white; }
    .programs .section-label { color: rgba(255,255,255,0.7); }
    .programs .section-title { color: white; }
    .programs-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; max-width: 1200px; margin: 0 auto; }
    .program-card { padding: 2.5rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; transition: all 0.3s; }
    .program-card:hover { background: rgba(255,255,255,0.15); transform: translateY(-5px); }
    .program-card h3 { font-family: 'DM Serif Display', serif; font-size: 1.5rem; margin-bottom: 1rem; }
    .program-card p { color: rgba(255,255,255,0.8); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem; }
    .program-price { font-size: 2rem; font-weight: 700; }
    .program-price span { font-size: 1rem; font-weight: 400; opacity: 0.7; }
    
    .testimonial { padding: 6rem 3rem; background: #fafdf7; }
    .testimonial-card { max-width: 800px; margin: 0 auto; text-align: center; }
    .testimonial-text { font-family: 'DM Serif Display', serif; font-size: 1.75rem; line-height: 1.5; margin-bottom: 2rem; color: #1a2e1a; }
    .testimonial-author { display: flex; align-items: center; justify-content: center; gap: 1rem; }
    .author-avatar { width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #2d5a27, #4a8c41); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 1.25rem; }
    .author-info { text-align: left; }
    .author-name { font-weight: 600; color: #1a2e1a; }
    .author-result { font-size: 0.875rem; color: #2d5a27; font-weight: 500; }
    
    .cta-section { padding: 8rem 3rem; text-align: center; background: linear-gradient(135deg, #e8f5e3 0%, #d4edcf 100%); }
    .cta-section h2 { font-family: 'DM Serif Display', serif; font-size: 3rem; color: #1a2e1a; margin-bottom: 1rem; }
    .cta-section p { color: #4a6347; font-size: 1.125rem; margin-bottom: 2.5rem; }
    
    footer { padding: 3rem; text-align: center; background: white; color: #4a6347; font-size: 0.875rem; }
  </style>
</head>
<body>
  <nav>
    <div class="logo"><span>🌿</span> NutriVida</div>
    <div class="nav-links">
      <a href="#">Sobre</a>
      <a href="#">Programas</a>
      <a href="#">Blog</a>
      <a href="#">Contato</a>
    </div>
    <a href="#" class="nav-cta">Agendar Consulta</a>
  </nav>

  <section class="hero">
    <div>
      <div class="badge">🌱 Nutrição Funcional e Integrativa</div>
      <h1>Transforme sua relação com a <span>alimentação</span></h1>
      <p class="tagline">Descubra como uma alimentação equilibrada pode mudar sua vida. Planos alimentares personalizados para seus objetivos e estilo de vida.</p>
      <div class="cta-group">
        <a href="#" class="btn btn-primary">Agendar Consulta</a>
        <a href="#" class="btn btn-secondary">Conhecer Programas</a>
      </div>
    </div>
    <div class="hero-image">
      <div class="hero-visual">
        <div class="floating-card top-right">
          <div class="floating-icon">📉</div>
          <div class="floating-text">-8kg</div>
          <div class="floating-subtext">média em 3 meses</div>
        </div>
        <div class="floating-card bottom-left">
          <div class="floating-icon">⭐</div>
          <div class="floating-text">500+</div>
          <div class="floating-subtext">pacientes atendidos</div>
        </div>
      </div>
    </div>
  </section>

  <section class="features">
    <div class="section-header">
      <div class="section-label">Por que me escolher</div>
      <h2 class="section-title">Nutrição com Ciência e Afeto</h2>
    </div>
    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">🎯</div>
        <h3>Plano Personalizado</h3>
        <p>Dieta única baseada no seu metabolismo, preferências e rotina.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">📱</div>
        <h3>Suporte Contínuo</h3>
        <p>Acompanhamento via WhatsApp para tirar dúvidas do dia a dia.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🧬</div>
        <h3>Base Científica</h3>
        <p>Recomendações fundamentadas em estudos e evidências atualizadas.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">💚</div>
        <h3>Sem Restrições Radicais</h3>
        <p>Alimentação equilibrada e sustentável, sem terrorismo nutricional.</p>
      </div>
    </div>
  </section>

  <section class="programs">
    <div class="section-header">
      <div class="section-label">Programas</div>
      <h2 class="section-title">Escolha seu Caminho</h2>
    </div>
    <div class="programs-grid">
      <div class="program-card">
        <h3>Emagrecimento</h3>
        <p>Programa completo para perda de peso saudável e duradoura, sem efeito sanfona.</p>
        <div class="program-price">R$ 350 <span>/mês</span></div>
      </div>
      <div class="program-card">
        <h3>Reeducação Alimentar</h3>
        <p>Aprenda a fazer escolhas saudáveis e crie uma nova relação com a comida.</p>
        <div class="program-price">R$ 280 <span>/mês</span></div>
      </div>
      <div class="program-card">
        <h3>Performance</h3>
        <p>Nutrição esportiva para atletas e praticantes de atividade física intensa.</p>
        <div class="program-price">R$ 420 <span>/mês</span></div>
      </div>
    </div>
  </section>

  <section class="testimonial">
    <div class="section-header">
      <div class="section-label">Depoimentos</div>
      <h2 class="section-title">Resultados Reais</h2>
    </div>
    <div class="testimonial-card">
      <p class="testimonial-text">"Finalmente encontrei uma profissional que entende que cada pessoa é única. Perdi 12kg sem passar fome e aprendi a comer de verdade."</p>
      <div class="testimonial-author">
        <div class="author-avatar">CS</div>
        <div class="author-info">
          <div class="author-name">Carla Santos</div>
          <div class="author-result">Perdeu 12kg em 4 meses</div>
        </div>
      </div>
    </div>
  </section>

  <section class="cta-section">
    <h2>Pronta para sua transformação?</h2>
    <p>Agende sua consulta e dê o primeiro passo</p>
    <a href="#" class="btn btn-primary">Agendar Consulta Gratuita</a>
  </section>

  <footer>© 2024 NutriVida • Dra. Julia Mendes CRN-3 12345</footer>
</body>
</html>`;

// Template Advogado - Sério e Profissional
const lawyerHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: #0c0f14; color: #fff; }
    
    nav { padding: 1.5rem 4rem; display: flex; justify-content: space-between; align-items: center; position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: rgba(12, 15, 20, 0.95); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(212, 175, 55, 0.1); }
    .logo { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 600; color: #d4af37; letter-spacing: 2px; }
    .nav-links { display: flex; gap: 3rem; }
    .nav-links a { color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.875rem; letter-spacing: 1px; transition: color 0.3s; font-weight: 500; }
    .nav-links a:hover { color: #d4af37; }
    .nav-cta { padding: 0.75rem 1.5rem; background: transparent; border: 1px solid #d4af37; color: #d4af37; font-size: 0.875rem; font-weight: 500; text-decoration: none; transition: all 0.3s; }
    .nav-cta:hover { background: #d4af37; color: #0c0f14; }
    
    .hero { min-height: 100vh; display: flex; align-items: center; padding: 8rem 4rem; position: relative; overflow: hidden; }
    .hero::before { content: ''; position: absolute; top: 0; right: 0; width: 50%; height: 100%; background: linear-gradient(180deg, rgba(212, 175, 55, 0.03) 0%, transparent 100%); }
    .hero-content { max-width: 700px; position: relative; z-index: 1; }
    .hero-label { display: inline-flex; align-items: center; gap: 0.75rem; padding: 0.5rem 1rem; background: rgba(212, 175, 55, 0.1); border-left: 3px solid #d4af37; color: #d4af37; font-size: 0.875rem; font-weight: 500; margin-bottom: 2rem; }
    h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(3rem, 6vw, 5rem); line-height: 1.1; margin-bottom: 2rem; font-weight: 500; }
    h1 span { color: #d4af37; }
    .tagline { font-size: 1.125rem; color: rgba(255,255,255,0.6); line-height: 1.8; margin-bottom: 3rem; max-width: 550px; }
    .hero-cta { display: flex; gap: 1rem; }
    .btn { padding: 1rem 2.5rem; font-size: 0.875rem; font-weight: 500; text-decoration: none; transition: all 0.3s; letter-spacing: 1px; }
    .btn-primary { background: #d4af37; color: #0c0f14; }
    .btn-primary:hover { background: #c4a030; }
    .btn-secondary { border: 1px solid rgba(255,255,255,0.2); color: white; }
    .btn-secondary:hover { border-color: #d4af37; color: #d4af37; }
    
    .hero-stats { display: flex; gap: 4rem; margin-top: 4rem; padding-top: 3rem; border-top: 1px solid rgba(255,255,255,0.1); }
    .stat { }
    .stat-number { font-family: 'Cormorant Garamond', serif; font-size: 3rem; color: #d4af37; line-height: 1; }
    .stat-label { font-size: 0.875rem; color: rgba(255,255,255,0.5); margin-top: 0.5rem; }
    
    .areas { padding: 8rem 4rem; background: #0a0d11; }
    .section-header { max-width: 600px; margin-bottom: 4rem; }
    .section-label { font-size: 0.75rem; color: #d4af37; font-weight: 500; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 1rem; }
    .section-title { font-family: 'Cormorant Garamond', serif; font-size: 2.5rem; font-weight: 500; }
    .areas-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
    .area-card { padding: 2.5rem; background: rgba(212, 175, 55, 0.02); border: 1px solid rgba(212, 175, 55, 0.1); transition: all 0.3s; }
    .area-card:hover { background: rgba(212, 175, 55, 0.05); border-color: rgba(212, 175, 55, 0.3); }
    .area-icon { width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 1.5rem; border: 1px solid rgba(212, 175, 55, 0.3); color: #d4af37; }
    .area-card h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; margin-bottom: 1rem; font-weight: 500; }
    .area-card p { color: rgba(255,255,255,0.5); font-size: 0.95rem; line-height: 1.6; }
    
    .about { padding: 8rem 4rem; display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: center; }
    .about-image { aspect-ratio: 3/4; background: linear-gradient(135deg, #1a1e26, #0c0f14); border: 1px solid rgba(212, 175, 55, 0.1); position: relative; }
    .about-image::before { content: '⚖️'; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 6rem; opacity: 0.2; }
    .about-image::after { content: ''; position: absolute; bottom: -20px; right: -20px; width: 100px; height: 100px; border: 1px solid #d4af37; opacity: 0.3; }
    .about-content h2 { font-family: 'Cormorant Garamond', serif; font-size: 2.5rem; font-weight: 500; margin-bottom: 2rem; }
    .about-content p { color: rgba(255,255,255,0.6); line-height: 1.8; margin-bottom: 1.5rem; }
    .signature { margin-top: 2rem; }
    .signature-name { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; color: #d4af37; font-style: italic; }
    .signature-title { font-size: 0.875rem; color: rgba(255,255,255,0.5); margin-top: 0.25rem; }
    
    .contact { padding: 8rem 4rem; background: linear-gradient(180deg, #0c0f14 0%, #0a0d11 100%); text-align: center; }
    .contact h2 { font-family: 'Cormorant Garamond', serif; font-size: 3rem; margin-bottom: 1.5rem; font-weight: 500; }
    .contact p { color: rgba(255,255,255,0.5); margin-bottom: 3rem; font-size: 1.125rem; max-width: 500px; margin-left: auto; margin-right: auto; }
    
    footer { padding: 3rem 4rem; border-top: 1px solid rgba(212, 175, 55, 0.1); display: flex; justify-content: space-between; align-items: center; color: rgba(255,255,255,0.4); font-size: 0.875rem; }
  </style>
</head>
<body>
  <nav>
    <div class="logo">SILVA & ASSOCIADOS</div>
    <div class="nav-links">
      <a href="#">Áreas de Atuação</a>
      <a href="#">Equipe</a>
      <a href="#">Casos de Sucesso</a>
      <a href="#">Contato</a>
    </div>
    <a href="#" class="nav-cta">Consulta Inicial</a>
  </nav>

  <section class="hero">
    <div class="hero-content">
      <div class="hero-label">⚖️ Escritório de Advocacia</div>
      <h1>Excelência jurídica a serviço dos seus <span>direitos</span></h1>
      <p class="tagline">Há mais de 20 anos defendendo os interesses de nossos clientes com ética, competência e dedicação. Sua confiança é nossa maior conquista.</p>
      <div class="hero-cta">
        <a href="#" class="btn btn-primary">Agendar Consulta</a>
        <a href="#" class="btn btn-secondary">Conhecer Áreas</a>
      </div>
      <div class="hero-stats">
        <div class="stat">
          <div class="stat-number">20+</div>
          <div class="stat-label">Anos de Experiência</div>
        </div>
        <div class="stat">
          <div class="stat-number">5.000+</div>
          <div class="stat-label">Casos Resolvidos</div>
        </div>
        <div class="stat">
          <div class="stat-number">98%</div>
          <div class="stat-label">Taxa de Sucesso</div>
        </div>
      </div>
    </div>
  </section>

  <section class="areas">
    <div class="section-header">
      <div class="section-label">Áreas de Atuação</div>
      <h2 class="section-title">Expertise em Diversas Áreas do Direito</h2>
    </div>
    <div class="areas-grid">
      <div class="area-card">
        <div class="area-icon">🏢</div>
        <h3>Direito Empresarial</h3>
        <p>Assessoria completa para empresas, desde a constituição até reestruturações societárias.</p>
      </div>
      <div class="area-card">
        <div class="area-icon">👨‍👩‍👧</div>
        <h3>Direito de Família</h3>
        <p>Divórcios, inventários, guarda de filhos e pensão alimentícia com sensibilidade e eficiência.</p>
      </div>
      <div class="area-card">
        <div class="area-icon">🏠</div>
        <h3>Direito Imobiliário</h3>
        <p>Compra, venda, locação e regularização de imóveis com segurança jurídica.</p>
      </div>
      <div class="area-card">
        <div class="area-icon">👷</div>
        <h3>Direito Trabalhista</h3>
        <p>Defesa de direitos trabalhistas para empregados e empregadores.</p>
      </div>
      <div class="area-card">
        <div class="area-icon">⚖️</div>
        <h3>Direito Civil</h3>
        <p>Contratos, indenizações, cobranças e responsabilidade civil.</p>
      </div>
      <div class="area-card">
        <div class="area-icon">🛡️</div>
        <h3>Direito do Consumidor</h3>
        <p>Proteção dos seus direitos nas relações de consumo.</p>
      </div>
    </div>
  </section>

  <section class="about">
    <div class="about-image"></div>
    <div class="about-content">
      <div class="section-label">Sobre o Escritório</div>
      <h2>Tradição e Inovação em Advocacia</h2>
      <p>Fundado em 2004, o escritório Silva & Associados nasceu com a missão de oferecer serviços jurídicos de excelência, combinando sólida formação acadêmica com experiência prática.</p>
      <p>Nossa equipe é formada por profissionais especializados em diversas áreas do Direito, prontos para oferecer soluções personalizadas para cada cliente.</p>
      <div class="signature">
        <div class="signature-name">Dr. Ricardo Silva</div>
        <div class="signature-title">Sócio-Fundador • OAB/SP 123.456</div>
      </div>
    </div>
  </section>

  <section class="contact">
    <h2>Precisa de Orientação Jurídica?</h2>
    <p>Entre em contato para uma análise inicial do seu caso, sem compromisso.</p>
    <a href="#" class="btn btn-primary">Falar com Advogado</a>
  </section>

  <footer>
    <div>© 2024 Silva & Associados Advogados</div>
    <div>Rua Augusta, 2000 • São Paulo, SP</div>
  </footer>
</body>
</html>`;

// Template Barbearia - Vintage Masculino  
const barberShopHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Roboto', sans-serif; background: #0d0d0d; color: #fff; }
    
    .hero { min-height: 100vh; position: relative; display: flex; align-items: center; justify-content: center; text-align: center; overflow: hidden; }
    .hero::before { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 100%); z-index: 1; }
    .hero-bg { position: absolute; inset: 0; background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%); }
    .hero-pattern { position: absolute; inset: 0; background-image: repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(212,175,55,0.03) 30px, rgba(212,175,55,0.03) 60px); }
    .hero-content { position: relative; z-index: 2; padding: 2rem; }
    .badge { display: inline-block; padding: 0.5rem 1.5rem; border: 1px solid #d4af37; color: #d4af37; font-size: 0.75rem; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 2rem; }
    .logo-icon { font-size: 4rem; margin-bottom: 1rem; filter: drop-shadow(0 0 30px rgba(212,175,55,0.3)); }
    h1 { font-family: 'Bebas Neue', cursive; font-size: clamp(4rem, 12vw, 10rem); line-height: 0.9; margin-bottom: 1rem; letter-spacing: 10px; }
    h1 span { color: #d4af37; }
    .tagline { font-size: 1.25rem; color: rgba(255,255,255,0.5); letter-spacing: 6px; text-transform: uppercase; margin-bottom: 3rem; }
    .cta-group { display: flex; gap: 1.5rem; justify-content: center; flex-wrap: wrap; }
    .btn { padding: 1.25rem 3rem; font-size: 0.875rem; font-weight: 500; text-decoration: none; transition: all 0.3s; letter-spacing: 2px; text-transform: uppercase; }
    .btn-primary { background: #d4af37; color: #0d0d0d; }
    .btn-primary:hover { background: #e8c04d; }
    .btn-secondary { border: 1px solid rgba(255,255,255,0.3); color: white; }
    .btn-secondary:hover { border-color: #d4af37; color: #d4af37; }
    
    .services { padding: 6rem 2rem; background: #111; }
    .section-header { text-align: center; margin-bottom: 4rem; }
    .section-label { font-size: 0.75rem; color: #d4af37; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 0.75rem; }
    .section-title { font-family: 'Bebas Neue', cursive; font-size: 3rem; letter-spacing: 4px; }
    .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1px; max-width: 1000px; margin: 0 auto; background: rgba(212,175,55,0.1); }
    .service-item { padding: 2.5rem; background: #111; display: flex; justify-content: space-between; align-items: center; transition: all 0.3s; }
    .service-item:hover { background: #1a1a1a; }
    .service-name { font-size: 1.125rem; font-weight: 500; }
    .service-desc { font-size: 0.875rem; color: rgba(255,255,255,0.4); margin-top: 0.5rem; }
    .service-price { font-family: 'Bebas Neue', cursive; font-size: 1.75rem; color: #d4af37; }
    
    .gallery { padding: 6rem 2rem; background: #0d0d0d; }
    .gallery-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; max-width: 1200px; margin: 0 auto; }
    .gallery-item { aspect-ratio: 1; background: linear-gradient(135deg, #1a1a1a, #0d0d0d); position: relative; overflow: hidden; }
    .gallery-item::before { content: '✂️'; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 2rem; opacity: 0.1; }
    .gallery-item:hover { opacity: 0.8; }
    
    .about { padding: 6rem 2rem; background: #111; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; max-width: 1200px; margin: 0 auto; }
    .about-image { aspect-ratio: 4/5; background: linear-gradient(135deg, #1a1a1a, #0d0d0d); border: 1px solid rgba(212,175,55,0.2); position: relative; }
    .about-image::before { content: '💈'; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 5rem; opacity: 0.3; }
    .about-content h2 { font-family: 'Bebas Neue', cursive; font-size: 2.5rem; letter-spacing: 3px; margin-bottom: 2rem; }
    .about-content p { color: rgba(255,255,255,0.6); line-height: 1.8; margin-bottom: 1.5rem; }
    
    .location { padding: 6rem 2rem; background: #0d0d0d; }
    .location-content { max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; }
    .location-info h3 { font-family: 'Bebas Neue', cursive; font-size: 2rem; margin-bottom: 1.5rem; letter-spacing: 2px; }
    .location-detail { margin-bottom: 1.5rem; }
    .location-label { font-size: 0.75rem; color: #d4af37; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 0.5rem; }
    .location-value { font-size: 1.125rem; color: rgba(255,255,255,0.8); }
    .location-map { background: #1a1a1a; border: 1px solid rgba(212,175,55,0.1); aspect-ratio: 16/10; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.2); }
    
    .cta-section { padding: 8rem 2rem; text-align: center; background: linear-gradient(180deg, #0d0d0d 0%, #1a1510 50%, #0d0d0d 100%); }
    .cta-section h2 { font-family: 'Bebas Neue', cursive; font-size: 4rem; letter-spacing: 5px; margin-bottom: 1rem; }
    .cta-section p { color: rgba(255,255,255,0.5); margin-bottom: 2.5rem; font-size: 1.125rem; }
    
    footer { padding: 3rem 2rem; border-top: 1px solid rgba(212,175,55,0.1); text-align: center; color: rgba(255,255,255,0.3); font-size: 0.875rem; letter-spacing: 2px; }
  </style>
</head>
<body>
  <section class="hero">
    <div class="hero-bg"></div>
    <div class="hero-pattern"></div>
    <div class="hero-content">
      <div class="badge">Est. 2015 • São Paulo</div>
      <div class="logo-icon">💈</div>
      <h1>THE <span>BARBER</span></h1>
      <p class="tagline">Barbearia Premium</p>
      <div class="cta-group">
        <a href="#" class="btn btn-primary">Agendar Horário</a>
        <a href="#" class="btn btn-secondary">Ver Serviços</a>
      </div>
    </div>
  </section>

  <section class="services">
    <div class="section-header">
      <div class="section-label">Menu de Serviços</div>
      <h2 class="section-title">NOSSOS SERVIÇOS</h2>
    </div>
    <div class="services-grid">
      <div class="service-item">
        <div>
          <div class="service-name">Corte Clássico</div>
          <div class="service-desc">Tesoura e máquina, finalização com pomada</div>
        </div>
        <div class="service-price">R$ 65</div>
      </div>
      <div class="service-item">
        <div>
          <div class="service-name">Barba Completa</div>
          <div class="service-desc">Toalha quente, navalha e hidratação</div>
        </div>
        <div class="service-price">R$ 45</div>
      </div>
      <div class="service-item">
        <div>
          <div class="service-name">Corte + Barba</div>
          <div class="service-desc">Combo completo com desconto</div>
        </div>
        <div class="service-price">R$ 95</div>
      </div>
      <div class="service-item">
        <div>
          <div class="service-name">Degradê Premium</div>
          <div class="service-desc">Fade perfeito com acabamento detalhado</div>
        </div>
        <div class="service-price">R$ 80</div>
      </div>
      <div class="service-item">
        <div>
          <div class="service-name">Pigmentação</div>
          <div class="service-desc">Cobertura de fios brancos na barba</div>
        </div>
        <div class="service-price">R$ 40</div>
      </div>
      <div class="service-item">
        <div>
          <div class="service-name">Day Spa Masculino</div>
          <div class="service-desc">Corte, barba, hidratação facial e cerveja</div>
        </div>
        <div class="service-price">R$ 180</div>
      </div>
    </div>
  </section>

  <section class="gallery">
    <div class="section-header">
      <div class="section-label">Nosso Trabalho</div>
      <h2 class="section-title">GALERIA</h2>
    </div>
    <div class="gallery-grid">
      <div class="gallery-item"></div>
      <div class="gallery-item"></div>
      <div class="gallery-item"></div>
      <div class="gallery-item"></div>
    </div>
  </section>

  <section class="location">
    <div class="location-content">
      <div class="location-info">
        <h3>ONDE ESTAMOS</h3>
        <div class="location-detail">
          <div class="location-label">Endereço</div>
          <div class="location-value">Rua Augusta, 1500 - Jardins<br/>São Paulo - SP</div>
        </div>
        <div class="location-detail">
          <div class="location-label">Horário</div>
          <div class="location-value">Ter-Sáb: 10h às 20h<br/>Dom: 10h às 16h</div>
        </div>
        <div class="location-detail">
          <div class="location-label">Contato</div>
          <div class="location-value">(11) 99999-0000<br/>contato@thebarber.com</div>
        </div>
      </div>
      <div class="location-map">📍 Mapa</div>
    </div>
  </section>

  <section class="cta-section">
    <h2>HORA DE CUIDAR DO VISUAL</h2>
    <p>Agende seu horário pelo WhatsApp ou telefone</p>
    <a href="#" class="btn btn-primary">Agendar no WhatsApp</a>
  </section>

  <footer>© 2024 THE BARBER • BARBEARIA PREMIUM</footer>
</body>
</html>`;

// Template Dentista - Clean e Moderno
const dentistHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Outfit', sans-serif; background: #ffffff; color: #1a1a2e; }
    
    nav { padding: 1.5rem 4rem; display: flex; justify-content: space-between; align-items: center; position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); }
    .logo { font-size: 1.5rem; font-weight: 700; color: #0ea5e9; display: flex; align-items: center; gap: 0.5rem; }
    .logo span { font-size: 1.75rem; }
    .nav-links { display: flex; gap: 2.5rem; }
    .nav-links a { color: #1a1a2e; text-decoration: none; font-size: 0.95rem; font-weight: 500; transition: color 0.3s; }
    .nav-links a:hover { color: #0ea5e9; }
    .nav-cta { padding: 0.875rem 1.75rem; background: linear-gradient(135deg, #0ea5e9, #0284c7); color: white; border-radius: 50px; font-weight: 600; text-decoration: none; transition: all 0.3s; }
    .nav-cta:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(14, 165, 233, 0.3); }
    
    .hero { min-height: 100vh; display: grid; grid-template-columns: 1fr 1fr; align-items: center; padding: 8rem 4rem 4rem; background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%); }
    .hero-content { max-width: 550px; }
    .badge { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: rgba(14, 165, 233, 0.1); border-radius: 50px; color: #0ea5e9; font-size: 0.875rem; font-weight: 500; margin-bottom: 1.5rem; }
    h1 { font-size: clamp(2.5rem, 5vw, 4rem); line-height: 1.1; margin-bottom: 1.5rem; font-weight: 700; color: #0f172a; }
    h1 span { color: #0ea5e9; }
    .tagline { font-size: 1.125rem; color: #64748b; margin-bottom: 2.5rem; line-height: 1.7; }
    .cta-group { display: flex; gap: 1rem; flex-wrap: wrap; }
    .btn { padding: 1rem 2rem; border-radius: 50px; font-weight: 600; text-decoration: none; transition: all 0.3s; display: inline-flex; align-items: center; gap: 0.5rem; }
    .btn-primary { background: linear-gradient(135deg, #0ea5e9, #0284c7); color: white; box-shadow: 0 10px 30px rgba(14, 165, 233, 0.3); }
    .btn-primary:hover { transform: translateY(-2px); }
    .btn-secondary { border: 2px solid #0ea5e9; color: #0ea5e9; }
    .btn-secondary:hover { background: #0ea5e9; color: white; }
    .hero-image { display: flex; justify-content: center; align-items: center; }
    .hero-visual { width: 100%; max-width: 500px; aspect-ratio: 1; background: linear-gradient(135deg, #0ea5e9, #0284c7); border-radius: 30px; display: flex; align-items: center; justify-content: center; position: relative; }
    .hero-visual::before { content: '😁'; font-size: 10rem; filter: brightness(10); }
    .hero-visual::after { content: ''; position: absolute; inset: -10px; border: 2px dashed rgba(14, 165, 233, 0.3); border-radius: 40px; }
    
    .features { padding: 6rem 4rem; background: white; }
    .section-header { text-align: center; max-width: 600px; margin: 0 auto 4rem; }
    .section-label { font-size: 0.875rem; color: #0ea5e9; font-weight: 600; margin-bottom: 0.75rem; letter-spacing: 1px; text-transform: uppercase; }
    .section-title { font-size: 2.5rem; font-weight: 700; color: #0f172a; }
    .features-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; max-width: 1200px; margin: 0 auto; }
    .feature-card { padding: 2rem; background: #f8fafc; border-radius: 20px; text-align: center; transition: all 0.3s; border: 1px solid transparent; }
    .feature-card:hover { border-color: #0ea5e9; transform: translateY(-5px); box-shadow: 0 20px 40px rgba(14, 165, 233, 0.1); }
    .feature-icon { width: 70px; height: 70px; background: linear-gradient(135deg, #0ea5e9, #0284c7); border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 1.75rem; margin: 0 auto 1.5rem; }
    .feature-card h3 { font-size: 1.125rem; margin-bottom: 0.75rem; color: #0f172a; font-weight: 600; }
    .feature-card p { color: #64748b; font-size: 0.95rem; line-height: 1.6; }
    
    .treatments { padding: 6rem 4rem; background: #f8fafc; }
    .treatments-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; max-width: 1200px; margin: 0 auto; }
    .treatment-card { padding: 2.5rem; background: white; border-radius: 20px; transition: all 0.3s; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
    .treatment-card:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(0,0,0,0.1); }
    .treatment-card h3 { font-size: 1.25rem; margin-bottom: 1rem; color: #0f172a; font-weight: 600; }
    .treatment-card p { color: #64748b; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem; }
    .treatment-price { font-size: 1.5rem; font-weight: 700; color: #0ea5e9; }
    .treatment-price span { font-size: 0.875rem; font-weight: 400; color: #64748b; }
    
    .team { padding: 6rem 4rem; background: white; }
    .team-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; max-width: 1000px; margin: 0 auto; }
    .team-card { text-align: center; }
    .team-avatar { width: 150px; height: 150px; border-radius: 50%; background: linear-gradient(135deg, #e0f2fe, #0ea5e9); margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; font-size: 3rem; }
    .team-card h3 { font-size: 1.25rem; margin-bottom: 0.5rem; color: #0f172a; }
    .team-card p { color: #0ea5e9; font-size: 0.95rem; font-weight: 500; }
    
    .cta-section { padding: 8rem 4rem; text-align: center; background: linear-gradient(135deg, #0ea5e9, #0284c7); color: white; }
    .cta-section h2 { font-size: 3rem; margin-bottom: 1rem; font-weight: 700; }
    .cta-section p { font-size: 1.25rem; opacity: 0.9; margin-bottom: 2.5rem; }
    .btn-white { background: white; color: #0ea5e9; }
    .btn-white:hover { background: #f8fafc; }
    
    footer { padding: 3rem 4rem; text-align: center; color: #64748b; font-size: 0.95rem; }
  </style>
</head>
<body>
  <nav>
    <div class="logo"><span>🦷</span> Smile Clinic</div>
    <div class="nav-links">
      <a href="#">Tratamentos</a>
      <a href="#">Equipe</a>
      <a href="#">Sobre</a>
      <a href="#">Contato</a>
    </div>
    <a href="#" class="nav-cta">Agendar Consulta</a>
  </nav>

  <section class="hero">
    <div class="hero-content">
      <div class="badge">🏆 Clínica 5 Estrelas no Google</div>
      <h1>Sorria com <span>confiança</span> todos os dias</h1>
      <p class="tagline">Tratamentos odontológicos modernos com tecnologia de ponta e uma equipe dedicada ao seu bem-estar e satisfação.</p>
      <div class="cta-group">
        <a href="#" class="btn btn-primary">Agendar Avaliação</a>
        <a href="#" class="btn btn-secondary">Ver Tratamentos</a>
      </div>
    </div>
    <div class="hero-image">
      <div class="hero-visual"></div>
    </div>
  </section>

  <section class="features">
    <div class="section-header">
      <div class="section-label">Por que nos escolher</div>
      <h2 class="section-title">Excelência em Cada Detalhe</h2>
    </div>
    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">🔬</div>
        <h3>Tecnologia Avançada</h3>
        <p>Equipamentos de última geração para diagnóstico e tratamento precisos.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">👨‍⚕️</div>
        <h3>Equipe Especializada</h3>
        <p>Profissionais com formação internacional e experiência comprovada.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">💳</div>
        <h3>Facilidade de Pagamento</h3>
        <p>Parcelamos em até 12x e aceitamos os principais convênios.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🏥</div>
        <h3>Ambiente Confortável</h3>
        <p>Clínica moderna e acolhedora para uma experiência tranquila.</p>
      </div>
    </div>
  </section>

  <section class="treatments">
    <div class="section-header">
      <div class="section-label">Nossos Tratamentos</div>
      <h2 class="section-title">Cuidado Completo Para Seu Sorriso</h2>
    </div>
    <div class="treatments-grid">
      <div class="treatment-card">
        <h3>Clareamento Dental</h3>
        <p>Dentes mais brancos em até 3 tons com tecnologia LED de última geração.</p>
        <div class="treatment-price">R$ 800 <span>à vista</span></div>
      </div>
      <div class="treatment-card">
        <h3>Implantes Dentários</h3>
        <p>Implantes importados com garantia vitalícia e acompanhamento completo.</p>
        <div class="treatment-price">R$ 3.500 <span>por unidade</span></div>
      </div>
      <div class="treatment-card">
        <h3>Ortodontia Invisível</h3>
        <p>Alinhadores transparentes para correção discreta e eficiente.</p>
        <div class="treatment-price">R$ 6.000 <span>tratamento completo</span></div>
      </div>
    </div>
  </section>

  <section class="team">
    <div class="section-header">
      <div class="section-label">Nossa Equipe</div>
      <h2 class="section-title">Profissionais que Cuidam de Você</h2>
    </div>
    <div class="team-grid">
      <div class="team-card">
        <div class="team-avatar">👨‍⚕️</div>
        <h3>Dr. Lucas Mendes</h3>
        <p>Implantodontia</p>
      </div>
      <div class="team-card">
        <div class="team-avatar">👩‍⚕️</div>
        <h3>Dra. Ana Paula</h3>
        <p>Ortodontia</p>
      </div>
      <div class="team-card">
        <div class="team-avatar">👩‍⚕️</div>
        <h3>Dra. Carla Souza</h3>
        <p>Estética Dental</p>
      </div>
    </div>
  </section>

  <section class="cta-section">
    <h2>Transforme Seu Sorriso Hoje</h2>
    <p>Agende sua avaliação gratuita e descubra o tratamento ideal para você</p>
    <a href="#" class="btn btn-white">Agendar Avaliação Gratuita</a>
  </section>

  <footer>© 2024 Smile Clinic • CROSP 123456 • Todos os direitos reservados</footer>
</body>
</html>`;

// Logos SVG
const personalTrainerLogo = `<svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="30" cy="30" r="25" fill="#ef4444"/>
  <path d="M20 30h20M30 20v20" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
  <text x="65" y="38" font-family="Arial Black" font-size="24" fill="#fff" font-weight="900">FITPRO</text>
</svg>`;

const photographerLogo = `<svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="30" cy="30" r="20" stroke="#e0a370" stroke-width="2" fill="none"/>
  <circle cx="30" cy="30" r="10" fill="#e0a370"/>
  <text x="60" y="38" font-family="Playfair Display" font-size="22" fill="#fff" font-style="italic">Lens Studio</text>
</svg>`;

const nutritionistLogo = `<svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15 45c0-20 15-35 15-35s15 15 15 35c0 5-5 10-15 10s-15-5-15-10z" fill="#2d5a27"/>
  <text x="55" y="38" font-family="Georgia" font-size="22" fill="#2d5a27" font-weight="600">NutriVida</text>
</svg>`;

const lawyerLogo = `<svg viewBox="0 0 220 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 40h40M30 15v25M15 25h30" stroke="#d4af37" stroke-width="2"/>
  <circle cx="30" cy="15" r="5" fill="#d4af37"/>
  <text x="60" y="38" font-family="Times New Roman" font-size="18" fill="#d4af37" letter-spacing="2">SILVA & ASSOCIADOS</text>
</svg>`;

const barberLogo = `<svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="10" width="20" height="40" rx="4" fill="#d4af37"/>
  <line x1="25" y1="15" x2="35" y2="15" stroke="#0d0d0d" stroke-width="2"/>
  <line x1="25" y1="25" x2="35" y2="25" stroke="#0d0d0d" stroke-width="2"/>
  <line x1="25" y1="35" x2="35" y2="35" stroke="#0d0d0d" stroke-width="2"/>
  <line x1="25" y1="45" x2="35" y2="45" stroke="#0d0d0d" stroke-width="2"/>
  <text x="55" y="38" font-family="Bebas Neue" font-size="28" fill="#fff" letter-spacing="3">THE BARBER</text>
</svg>`;

const dentistLogo = `<svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20 45c0-15 8-30 10-30s5 10 5 10s5-10 5-10s10 15 10 30c0 5-5 10-15 10s-15-5-15-10z" fill="#0ea5e9"/>
  <text x="60" y="38" font-family="Arial" font-size="22" fill="#0ea5e9" font-weight="700">Smile Clinic</text>
</svg>`;

export const templates: Template[] = [
  // SAÚDE & FITNESS
  {
    id: "personal-trainer",
    name: "Personal Trainer",
    description: "Site energético para personal trainers com foco em resultados",
    category: "Saúde & Fitness",
    style: "Masculino",
    thumbnail: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
    colors: ["#ef4444", "#dc2626", "#0a0a0a"],
    type: "both",
    popular: true,
    previewHtml: personalTrainerHtml,
    logoSvg: personalTrainerLogo
  },
  {
    id: "nutritionist",
    name: "Nutricionista",
    description: "Design fresco e saudável para nutricionistas e consultores alimentares",
    category: "Saúde & Fitness",
    style: "Moderno",
    thumbnail: "linear-gradient(135deg, #84cc16 0%, #2d5a27 100%)",
    colors: ["#2d5a27", "#84cc16", "#fafdf7"],
    type: "both",
    popular: true,
    previewHtml: nutritionistHtml,
    logoSvg: nutritionistLogo
  },
  {
    id: "dentist",
    name: "Clínica Odontológica",
    description: "Site clean e moderno para clínicas e consultórios odontológicos",
    category: "Saúde & Fitness",
    style: "Moderno",
    thumbnail: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
    colors: ["#0ea5e9", "#0284c7", "#ffffff"],
    type: "both",
    previewHtml: dentistHtml,
    logoSvg: dentistLogo
  },
  
  // BELEZA
  {
    id: "barber-shop",
    name: "Barbearia Premium",
    description: "Estética vintage masculina com toques de dourado",
    category: "Beleza",
    style: "Masculino",
    thumbnail: "linear-gradient(135deg, #0d0d0d 0%, #d4af37 100%)",
    colors: ["#d4af37", "#0d0d0d", "#ffffff"],
    type: "both",
    popular: true,
    previewHtml: barberShopHtml,
    logoSvg: barberLogo
  },
  
  // SERVIÇOS
  {
    id: "photographer",
    name: "Fotógrafo Profissional",
    description: "Portfolio elegante e artístico para fotógrafos",
    category: "Serviços",
    style: "Criativo",
    thumbnail: "linear-gradient(135deg, #1a1a2e 0%, #e0a370 100%)",
    colors: ["#e0a370", "#1a1a2e", "#ffffff"],
    type: "both",
    popular: true,
    previewHtml: photographerHtml,
    logoSvg: photographerLogo
  },
  {
    id: "lawyer",
    name: "Escritório de Advocacia",
    description: "Design sério e profissional para advogados",
    category: "Serviços",
    style: "Corporativo",
    thumbnail: "linear-gradient(135deg, #0c0f14 0%, #d4af37 100%)",
    colors: ["#d4af37", "#0c0f14", "#ffffff"],
    type: "both",
    previewHtml: lawyerHtml,
    logoSvg: lawyerLogo
  },
  
  // BELEZA - Mais templates
  {
    id: "beauty-salon",
    name: "Salão de Beleza",
    description: "Design feminino e delicado para salões de beleza",
    category: "Beleza",
    style: "Feminino",
    thumbnail: "linear-gradient(135deg, #ec4899 0%, #f472b6 100%)",
    colors: ["#ec4899", "#f472b6", "#fdf2f8"],
    type: "both",
    popular: true,
    logoSvg: `<svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="30" r="20" fill="#ec4899"/>
      <text x="30" y="38" font-family="Georgia" font-size="24" fill="#fff" text-anchor="middle">✿</text>
      <text x="65" y="38" font-family="Georgia" font-size="22" fill="#ec4899" font-style="italic">Belle Studio</text>
    </svg>`
  },
  {
    id: "spa-wellness",
    name: "Spa & Wellness",
    description: "Design relaxante para spas e centros de bem-estar",
    category: "Beleza",
    style: "Minimalista",
    thumbnail: "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)",
    colors: ["#14b8a6", "#0d9488", "#f0fdfa"],
    type: "both",
    logoSvg: `<svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 35c10-15 20-25 15-5s-5 20 15 5" stroke="#14b8a6" stroke-width="3" fill="none"/>
      <text x="60" y="38" font-family="Georgia" font-size="20" fill="#14b8a6">Serenity Spa</text>
    </svg>`
  },
  
  // SAÚDE & FITNESS - Mais templates
  {
    id: "fitness-gym",
    name: "Academia",
    description: "Site energético para academias e centros fitness",
    category: "Saúde & Fitness",
    style: "Moderno",
    thumbnail: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    colors: ["#10b981", "#059669", "#111827"],
    type: "both",
    logoSvg: `<svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="25" width="40" height="10" rx="2" fill="#10b981"/>
      <rect x="5" y="20" width="10" height="20" rx="2" fill="#10b981"/>
      <rect x="45" y="20" width="10" height="20" rx="2" fill="#10b981"/>
      <text x="65" y="38" font-family="Arial Black" font-size="22" fill="#10b981">FIT GYM</text>
    </svg>`
  },
  {
    id: "psychologist",
    name: "Psicólogo",
    description: "Site acolhedor para psicólogos e terapeutas",
    category: "Saúde & Fitness",
    style: "Minimalista",
    thumbnail: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
    colors: ["#8b5cf6", "#7c3aed", "#f5f3ff"],
    type: "both",
    logoSvg: `<svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="30" r="18" stroke="#8b5cf6" stroke-width="3" fill="none"/>
      <path d="M22 30c0-5 8-5 8 0s8 5 8 0" stroke="#8b5cf6" stroke-width="2" fill="none"/>
      <text x="60" y="38" font-family="Georgia" font-size="20" fill="#8b5cf6">Mente Plena</text>
    </svg>`
  },
  {
    id: "yoga-studio",
    name: "Estúdio de Yoga",
    description: "Design zen para estúdios de yoga e meditação",
    category: "Saúde & Fitness",
    style: "Minimalista",
    thumbnail: "linear-gradient(135deg, #a78bfa 0%, #f0abfc 100%)",
    colors: ["#a78bfa", "#f0abfc", "#faf5ff"],
    type: "both",
    logoSvg: `<svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 15l-15 30h30z" stroke="#a78bfa" stroke-width="2" fill="none"/>
      <circle cx="30" cy="28" r="6" fill="#a78bfa"/>
      <text x="55" y="38" font-family="Georgia" font-size="20" fill="#a78bfa" font-style="italic">Yoga Flow</text>
    </svg>`
  },

  // GASTRONOMIA - Mais templates
  {
    id: "restaurant",
    name: "Restaurante Premium",
    description: "Site sofisticado para restaurantes e gastronomia",
    category: "Gastronomia",
    style: "Luxuoso",
    thumbnail: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    colors: ["#f59e0b", "#d97706", "#1c1917"],
    type: "both",
    popular: true,
    logoSvg: `<svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="30" r="20" stroke="#f59e0b" stroke-width="2" fill="none"/>
      <text x="30" y="38" font-family="Georgia" font-size="20" fill="#f59e0b" text-anchor="middle">★</text>
      <text x="60" y="38" font-family="Georgia" font-size="20" fill="#f59e0b" font-style="italic">Le Gourmet</text>
    </svg>`
  },
  {
    id: "coffee-shop",
    name: "Cafeteria",
    description: "Design aconchegante para cafeterias e padarias",
    category: "Gastronomia",
    style: "Minimalista",
    thumbnail: "linear-gradient(135deg, #92400e 0%, #78350f 100%)",
    colors: ["#92400e", "#78350f", "#fef3c7"],
    type: "both",
    logoSvg: `<svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 20h25c5 0 10 5 10 15s-5 15-10 15H15z" fill="#92400e"/>
      <path d="M40 25c5 0 8 5 8 10s-3 10-8 10" stroke="#92400e" stroke-width="3" fill="none"/>
      <text x="65" y="38" font-family="Georgia" font-size="20" fill="#92400e">Café Arte</text>
    </svg>`
  },
  {
    id: "pizzeria",
    name: "Pizzaria",
    description: "Site vibrante para pizzarias e delivery",
    category: "Gastronomia",
    style: "Moderno",
    thumbnail: "linear-gradient(135deg, #dc2626 0%, #f59e0b 100%)",
    colors: ["#dc2626", "#f59e0b", "#1c1917"],
    type: "both",
    logoSvg: `<svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="30" r="22" fill="#dc2626"/>
      <circle cx="25" cy="25" r="4" fill="#f59e0b"/>
      <circle cx="35" cy="28" r="3" fill="#f59e0b"/>
      <circle cx="28" cy="35" r="3" fill="#f59e0b"/>
      <text x="60" y="38" font-family="Arial Black" font-size="22" fill="#dc2626">PIZZA HOT</text>
    </svg>`
  },

  // SERVIÇOS - Mais templates
  {
    id: "architect",
    name: "Arquiteto",
    description: "Portfolio minimalista para arquitetos e designers",
    category: "Serviços",
    style: "Minimalista",
    thumbnail: "linear-gradient(135deg, #4b5563 0%, #f59e0b 100%)",
    colors: ["#f59e0b", "#4b5563", "#f9fafb"],
    type: "both",
    logoSvg: `<svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 50l20-35 20 35H10z" stroke="#f59e0b" stroke-width="2" fill="none"/>
      <rect x="25" y="35" width="10" height="15" fill="#f59e0b"/>
      <text x="60" y="38" font-family="Helvetica" font-size="20" fill="#4b5563">ARQSTUDIO</text>
    </svg>`
  },
  {
    id: "wedding-planner",
    name: "Assessoria de Casamentos",
    description: "Design romântico e elegante para wedding planners",
    category: "Serviços",
    style: "Feminino",
    thumbnail: "linear-gradient(135deg, #fbbf24 0%, #f9a8d4 100%)",
    colors: ["#fbbf24", "#f9a8d4", "#fefce8"],
    type: "both",
    logoSvg: `<svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 30c0-10 10-15 10-15s10 5 10 15c0 10-10 15-10 15s-10-5-10-15z" fill="#f9a8d4"/>
      <path d="M20 30c0-10 10-15 10-15s10 5 10 15c0 10-10 15-10 15s-10-5-10-15z" stroke="#fbbf24" stroke-width="2" fill="none" transform="rotate(90 30 30)"/>
      <text x="55" y="38" font-family="Georgia" font-size="18" fill="#f9a8d4" font-style="italic">Forever After</text>
    </svg>`
  },
  {
    id: "real-estate",
    name: "Imobiliária",
    description: "Site profissional para corretores e imobiliárias",
    category: "Serviços",
    style: "Corporativo",
    thumbnail: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
    colors: ["#3b82f6", "#1e40af", "#ffffff"],
    type: "both",
    logoSvg: `<svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 50V25l20-15 20 15v25H10z" fill="#3b82f6"/>
      <rect x="22" y="32" width="16" height="18" fill="#1e40af"/>
      <text x="60" y="38" font-family="Arial" font-size="18" fill="#3b82f6" font-weight="700">Prime Imóveis</text>
    </svg>`
  },
  {
    id: "pet-shop",
    name: "Pet Shop",
    description: "Design alegre para pet shops e clínicas veterinárias",
    category: "Serviços",
    style: "Criativo",
    thumbnail: "linear-gradient(135deg, #22c55e 0%, #facc15 100%)",
    colors: ["#22c55e", "#facc15", "#ffffff"],
    type: "both",
    logoSvg: `<svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="25" cy="25" r="8" fill="#22c55e"/>
      <circle cx="35" cy="25" r="8" fill="#22c55e"/>
      <circle cx="20" cy="35" r="8" fill="#22c55e"/>
      <circle cx="40" cy="35" r="8" fill="#22c55e"/>
      <circle cx="30" cy="42" r="10" fill="#facc15"/>
      <text x="60" y="38" font-family="Comic Sans MS" font-size="18" fill="#22c55e">Happy Pets</text>
    </svg>`
  },

  // E-COMMERCE
  {
    id: "ecommerce-fashion",
    name: "Loja de Moda",
    description: "E-commerce elegante para lojas de roupas",
    category: "E-commerce",
    style: "Moderno",
    thumbnail: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    colors: ["#667eea", "#764ba2", "#ffffff"],
    type: "both",
    logoSvg: `<svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="15" width="30" height="30" rx="2" stroke="#667eea" stroke-width="2" fill="none"/>
      <path d="M20 15v-5c0-5 20-5 20 0v5" stroke="#667eea" stroke-width="2" fill="none"/>
      <text x="55" y="38" font-family="Helvetica" font-size="20" fill="#667eea" font-weight="300">STYLE</text>
    </svg>`
  },
  {
    id: "ecommerce-tech",
    name: "Loja de Eletrônicos",
    description: "E-commerce moderno para produtos tech",
    category: "E-commerce",
    style: "Futurista",
    thumbnail: "linear-gradient(135deg, #0f172a 0%, #0ea5e9 100%)",
    colors: ["#0ea5e9", "#0f172a", "#ffffff"],
    type: "both",
    logoSvg: `<svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="18" width="36" height="24" rx="3" stroke="#0ea5e9" stroke-width="2" fill="none"/>
      <line x1="30" y1="42" x2="30" y2="48" stroke="#0ea5e9" stroke-width="2"/>
      <line x1="20" y1="48" x2="40" y2="48" stroke="#0ea5e9" stroke-width="2"/>
      <text x="55" y="38" font-family="Arial" font-size="18" fill="#0ea5e9" font-weight="700">TechStore</text>
    </svg>`
  },

  // TECNOLOGIA
  {
    id: "tech-startup",
    name: "Startup Tech",
    description: "Landing page futurista para startups de tecnologia",
    category: "Tecnologia",
    style: "Futurista",
    thumbnail: "linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)",
    colors: ["#7c3aed", "#4c1d95", "#000000"],
    type: "both",
    logoSvg: `<svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="30,10 50,30 30,50 10,30" stroke="#7c3aed" stroke-width="2" fill="none"/>
      <circle cx="30" cy="30" r="8" fill="#7c3aed"/>
      <text x="60" y="38" font-family="Helvetica" font-size="20" fill="#7c3aed" font-weight="700">NEXUS</text>
    </svg>`
  },
  {
    id: "saas-platform",
    name: "Plataforma SaaS",
    description: "Site moderno para produtos digitais e SaaS",
    category: "Tecnologia",
    style: "Moderno",
    thumbnail: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
    colors: ["#0ea5e9", "#0284c7", "#0f172a"],
    type: "both",
    logoSvg: `<svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="20" width="40" height="25" rx="4" stroke="#0ea5e9" stroke-width="2" fill="none"/>
      <circle cx="25" cy="32" r="6" stroke="#0ea5e9" stroke-width="2" fill="none"/>
      <circle cx="35" cy="32" r="6" stroke="#0ea5e9" stroke-width="2" fill="none"/>
      <text x="60" y="38" font-family="Arial" font-size="18" fill="#0ea5e9" font-weight="700">CloudApp</text>
    </svg>`
  },
  {
    id: "app-landing",
    name: "Landing de App",
    description: "Página de download para aplicativos mobile",
    category: "Tecnologia",
    style: "Moderno",
    thumbnail: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    colors: ["#10b981", "#059669", "#0f172a"],
    type: "both",
    logoSvg: `<svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="10" width="24" height="40" rx="4" stroke="#10b981" stroke-width="2" fill="none"/>
      <circle cx="30" cy="45" r="3" fill="#10b981"/>
      <text x="55" y="38" font-family="Arial" font-size="18" fill="#10b981" font-weight="700">AppMaster</text>
    </svg>`
  },

  // AGÊNCIA
  {
    id: "marketing-agency",
    name: "Agência de Marketing",
    description: "Site criativo para agências de marketing digital",
    category: "Agência",
    style: "Criativo",
    thumbnail: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
    colors: ["#f97316", "#ea580c", "#0f0f0f"],
    type: "both",
    logoSvg: `<svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="25" cy="30" r="15" stroke="#f97316" stroke-width="3" fill="none"/>
      <path d="M40 30l15-10v20z" fill="#f97316"/>
      <text x="65" y="38" font-family="Arial Black" font-size="18" fill="#f97316">BOOST</text>
    </svg>`
  },
  {
    id: "design-agency",
    name: "Agência de Design",
    description: "Portfolio criativo para agências de design",
    category: "Agência",
    style: "Criativo",
    thumbnail: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
    colors: ["#ec4899", "#8b5cf6", "#0f0f0f"],
    type: "both",
    logoSvg: `<svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="15" width="15" height="15" fill="#ec4899"/>
      <rect x="30" y="15" width="15" height="15" fill="#8b5cf6"/>
      <rect x="15" y="30" width="15" height="15" fill="#8b5cf6"/>
      <rect x="30" y="30" width="15" height="15" fill="#ec4899"/>
      <text x="55" y="38" font-family="Helvetica" font-size="18" fill="#ec4899" font-weight="700">PIXEL</text>
    </svg>`
  },
  {
    id: "web-agency",
    name: "Agência Web",
    description: "Site para agências de desenvolvimento web",
    category: "Agência",
    style: "Moderno",
    thumbnail: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
    colors: ["#3b82f6", "#1d4ed8", "#0f172a"],
    type: "both",
    logoSvg: `<svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 25l10-10 10 10-10 10z" fill="#3b82f6"/>
      <path d="M35 25l10-10 10 10-10 10z" fill="#1d4ed8"/>
      <text x="65" y="38" font-family="Arial" font-size="18" fill="#3b82f6" font-weight="700">CodeLab</text>
    </svg>`
  },

  // EDUCAÇÃO
  {
    id: "music-school",
    name: "Escola de Música",
    description: "Site criativo para escolas e professores de música",
    category: "Educação",
    style: "Criativo",
    thumbnail: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
    colors: ["#6366f1", "#ec4899", "#0f0f0f"],
    type: "both",
    logoSvg: `<svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="25" cy="40" r="8" fill="#6366f1"/>
      <line x1="33" y1="40" x2="33" y2="15" stroke="#6366f1" stroke-width="3"/>
      <path d="M33 15c5 0 10 3 10 8s-5 5-10 5" fill="#ec4899"/>
      <text x="55" y="38" font-family="Georgia" font-size="18" fill="#6366f1" font-style="italic">Harmonia</text>
    </svg>`
  },
  {
    id: "online-course",
    name: "Cursos Online",
    description: "Plataforma para venda de cursos digitais",
    category: "Educação",
    style: "Moderno",
    thumbnail: "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)",
    colors: ["#8b5cf6", "#06b6d4", "#0f172a"],
    type: "both",
    logoSvg: `<svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 25l20-10 20 10-20 10z" fill="#8b5cf6"/>
      <path d="M15 28v12l15 8 15-8v-12" stroke="#06b6d4" stroke-width="2" fill="none"/>
      <text x="60" y="38" font-family="Arial" font-size="18" fill="#8b5cf6" font-weight="700">EduPro</text>
    </svg>`
  },
  {
    id: "language-school",
    name: "Escola de Idiomas",
    description: "Site para escolas de idiomas e professores",
    category: "Educação",
    style: "Moderno",
    thumbnail: "linear-gradient(135deg, #14b8a6 0%, #f59e0b 100%)",
    colors: ["#14b8a6", "#f59e0b", "#ffffff"],
    type: "both",
    logoSvg: `<svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="25" cy="30" r="18" stroke="#14b8a6" stroke-width="2" fill="none"/>
      <text x="25" y="36" font-family="Arial" font-size="16" fill="#14b8a6" text-anchor="middle" font-weight="700">ABC</text>
      <text x="55" y="38" font-family="Arial" font-size="18" fill="#14b8a6" font-weight="700">LinguaPro</text>
    </svg>`
  }
];
