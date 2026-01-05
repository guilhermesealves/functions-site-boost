import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Eye, ChevronDown } from "lucide-react";
import { templates, categories, styles, Template } from "./TemplatesData";

interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: Template) => void;
}

const TemplatesModal = ({ isOpen, onClose, onSelectTemplate }: TemplatesModalProps) => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedStyle, setSelectedStyle] = useState("Todos");
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(search.toLowerCase()) ||
      template.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || template.category === selectedCategory;
    const matchesStyle = selectedStyle === "Todos" || template.style === selectedStyle;
    return matchesSearch && matchesCategory && matchesStyle;
  });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-sm overflow-y-auto py-8"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-7xl mx-4 bg-[hsl(0,0%,6%)] border border-white/[0.08] rounded-2xl shadow-2xl my-auto"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-[hsl(0,0%,6%)] border-b border-white/[0.08] rounded-t-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white">Templates Prontos</h2>
                <p className="text-white/50 mt-1">Escolha um template e customize com IA</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/[0.06] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-wrap gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Buscar templates..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-orange-500/50"
                />
              </div>

              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none px-4 py-2.5 pr-10 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:border-orange-500/50 cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-[#1a1a1a]">{cat}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  className="appearance-none px-4 py-2.5 pr-10 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:border-orange-500/50 cursor-pointer"
                >
                  {styles.map((style) => (
                    <option key={style} value={style} className="bg-[#1a1a1a]">{style}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
              </div>
            </div>

            {/* Category Pills - Quick Access */}
            <div className="flex flex-wrap gap-2 mt-4">
              {categories.slice(0, 8).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                    selectedCategory === cat
                      ? "bg-orange-500 text-white"
                      : "bg-white/[0.04] text-white/60 hover:bg-white/[0.08] hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Templates Grid */}
          <div className="p-6">
            {filteredTemplates.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-white/40">Nenhum template encontrado</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredTemplates.map((template) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group relative bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden hover:border-orange-500/30 transition-all cursor-pointer"
                  >
                    {/* Preview Thumbnail */}
                    <div
                      className="relative h-40 overflow-hidden"
                      style={{ background: template.thumbnail }}
                    >
                      {/* Live Preview in Thumbnail */}
                      {template.previewHtml && (
                        <iframe
                          srcDoc={template.previewHtml}
                          className="absolute inset-0 w-[400%] h-[400%] origin-top-left scale-[0.25] pointer-events-none"
                          title={template.name}
                        />
                      )}
                      
                      {/* Hover Actions */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewTemplate(template);
                          }}
                          className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          Preview
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectTemplate(template);
                          }}
                          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-sm text-white font-medium transition-colors"
                        >
                          Usar
                        </button>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4" onClick={() => onSelectTemplate(template)}>
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-white text-sm">{template.name}</h3>
                        <div className="flex gap-1">
                          {template.colors.slice(0, 3).map((color, i) => (
                            <div
                              key={i}
                              className="w-3 h-3 rounded-full border border-white/10"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-white/40 mb-2 line-clamp-1">{template.description}</p>
                      <div className="flex gap-2">
                        <span className="px-2 py-0.5 text-[10px] bg-white/[0.04] text-white/50 rounded-full">
                          {template.category}
                        </span>
                        <span className="px-2 py-0.5 text-[10px] bg-white/[0.04] text-white/50 rounded-full">
                          {template.style}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Template Preview Modal */}
          <AnimatePresence>
            {previewTemplate && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
                onClick={() => setPreviewTemplate(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="relative w-full max-w-5xl h-[80vh] bg-[hsl(0,0%,6%)] rounded-xl overflow-hidden border border-white/[0.08]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Preview Header */}
                  <div className="flex items-center justify-between p-4 border-b border-white/[0.08]">
                    <div>
                      <h3 className="font-semibold text-white">{previewTemplate.name}</h3>
                      <p className="text-sm text-white/50">{previewTemplate.description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          onSelectTemplate(previewTemplate);
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
                  
                  {/* Preview iframe */}
                  <div className="h-[calc(100%-72px)] bg-white">
                    {previewTemplate.previewHtml ? (
                      <iframe
                        srcDoc={previewTemplate.previewHtml}
                        className="w-full h-full"
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
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TemplatesModal;
