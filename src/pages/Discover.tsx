import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Sparkles,
  ArrowRight,
  Globe,
  Palette,
  Star,
  Eye,
  X,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { templates, categories, Template } from "@/components/templates/TemplatesData";

const Discover = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const popularTemplates = templates.filter(t => t.popular);
  const filteredTemplates = selectedCategory === "Todos" 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  const handleUseTemplate = (template: Template) => {
    navigate("/builder", { 
      state: { 
        prompt: `Use o template "${template.name}" para criar um site`, 
        tool: "website",
        template: template 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Back Button */}
      <div className="fixed top-20 left-4 z-50">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-3 py-2 text-sm text-white/70 hover:text-white bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar</span>
        </button>
      </div>
      
      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-orange-500/5 to-background" />
          <motion.div
            animate={{ opacity: [0.03, 0.08, 0.03] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 blur-[100px]"
          />

          <div className="container mx-auto px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6"
              >
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span className="text-sm text-orange-400 font-medium">Templates Prontos</span>
              </motion.div>

              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                Templates{" "}
                <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                  profissionais
                </span>{" "}
                para seu negócio
              </h1>

              <p className="text-lg text-white/60 mb-8">
                Escolha um template, personalize com IA e tenha seu site pronto em minutos.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Popular Templates */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-5 h-5 text-orange-400 fill-orange-400" />
              <h2 className="text-xl font-bold text-white">Mais Usados</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {popularTemplates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden hover:border-orange-500/30 transition-all cursor-pointer"
                >
                  <div
                    className="relative h-48 overflow-hidden"
                    style={{ background: template.thumbnail }}
                  >
                    {template.previewHtml && (
                      <iframe
                        srcDoc={template.previewHtml}
                        className="absolute inset-0 w-[400%] h-[400%] origin-top-left scale-[0.25] pointer-events-none"
                        title={template.name}
                      />
                    )}
                    
                    <div className="absolute top-2 left-2 px-2 py-1 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" /> Popular
                    </div>

                    <div className="absolute top-2 right-2 flex gap-1">
                      {(template.type === "both" || template.type === "website") && (
                        <div className="w-6 h-6 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                          <Globe className="w-3 h-3 text-white" />
                        </div>
                      )}
                      {(template.type === "both" || template.type === "logo") && (
                        <div className="w-6 h-6 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                          <Palette className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => setPreviewTemplate(template)}
                        className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        Preview
                      </button>
                      <button
                        onClick={() => handleUseTemplate(template)}
                        className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-sm text-white font-medium transition-colors"
                      >
                        Usar
                      </button>
                    </div>
                  </div>

                  <div className="p-4" onClick={() => handleUseTemplate(template)}>
                    <h3 className="font-semibold text-white text-sm mb-1">{template.name}</h3>
                    <p className="text-xs text-white/40 line-clamp-1">{template.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <h2 className="text-xl font-bold text-white mb-6">Explorar por Categoria</h2>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-orange-500 text-white"
                      : "bg-white/[0.04] text-white/60 hover:bg-white/[0.08] hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredTemplates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="group relative bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden hover:border-orange-500/30 transition-all cursor-pointer"
                >
                  <div
                    className="relative h-40 overflow-hidden"
                    style={{ background: template.thumbnail }}
                  >
                    {template.previewHtml && (
                      <iframe
                        srcDoc={template.previewHtml}
                        className="absolute inset-0 w-[400%] h-[400%] origin-top-left scale-[0.25] pointer-events-none"
                        title={template.name}
                      />
                    )}

                    <div className="absolute top-2 right-2 flex gap-1">
                      {(template.type === "both" || template.type === "website") && (
                        <div className="w-6 h-6 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                          <Globe className="w-3 h-3 text-white" />
                        </div>
                      )}
                      {(template.type === "both" || template.type === "logo") && (
                        <div className="w-6 h-6 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                          <Palette className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => setPreviewTemplate(template)}
                        className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleUseTemplate(template)}
                        className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-sm text-white font-medium transition-colors"
                      >
                        Usar
                      </button>
                    </div>
                  </div>

                  <div className="p-4" onClick={() => handleUseTemplate(template)}>
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold text-white text-sm">{template.name}</h3>
                      <div className="flex gap-1">
                        {template.colors.slice(0, 3).map((color, i) => (
                          <div
                            key={i}
                            className="w-2.5 h-2.5 rounded-full border border-white/10"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-white/40 line-clamp-1">{template.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent border border-orange-500/20"
            >
              <Palette className="w-16 h-16 text-orange-400 mx-auto mb-6" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                Não encontrou o que procura?
              </h2>
              <p className="text-lg text-white/60 mb-8">
                Descreva seu negócio e a IA cria um site sob medida para você.
              </p>
              <Button
                onClick={() => navigate("/builder")}
                size="lg"
                className="h-14 px-10 text-lg font-bold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl shadow-xl shadow-orange-500/30"
              >
                Criar Site Personalizado
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Preview Modal */}
      {previewTemplate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setPreviewTemplate(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-6xl h-[85vh] bg-[hsl(0,0%,6%)] rounded-xl overflow-hidden border border-white/[0.08]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/[0.08]">
              <div>
                <h3 className="font-semibold text-white">{previewTemplate.name}</h3>
                <p className="text-sm text-white/50">{previewTemplate.description}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    handleUseTemplate(previewTemplate);
                    setPreviewTemplate(null);
                  }}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-sm text-white font-medium transition-colors"
                >
                  Usar Template
                </button>
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="p-2 hover:bg-white/[0.06] rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white/60" />
                </button>
              </div>
            </div>
            
            <div className="h-[calc(100%-72px)] overflow-hidden">
              {previewTemplate.previewHtml ? (
                <iframe
                  srcDoc={previewTemplate.previewHtml}
                  className="w-full h-full bg-white"
                  title={previewTemplate.name}
                />
              ) : (
                <div 
                  className="w-full h-full flex items-center justify-center"
                  style={{ background: previewTemplate.thumbnail }}
                >
                  <span className="text-white text-2xl font-bold">{previewTemplate.name}</span>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Discover;
