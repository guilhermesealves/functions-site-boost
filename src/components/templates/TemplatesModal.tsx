import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Eye, ChevronDown, Globe, Palette, Star, LayoutGrid, List } from "lucide-react";
import { templates, categories, styles, Template } from "./TemplatesData";
import { useNavigate } from "react-router-dom";

interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: Template) => void;
}

const TemplatesModal = ({ isOpen, onClose, onSelectTemplate }: TemplatesModalProps) => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedStyle, setSelectedStyle] = useState("Todos");
  const [selectedType, setSelectedType] = useState<"all" | "website" | "logo">("all");
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const navigate = useNavigate();

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(search.toLowerCase()) ||
      template.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || template.category === selectedCategory;
    const matchesStyle = selectedStyle === "Todos" || template.style === selectedStyle;
    const matchesType = selectedType === "all" || template.type === selectedType || template.type === "both";
    return matchesSearch && matchesCategory && matchesStyle && matchesType;
  });

  const popularTemplates = templates.filter(t => t.popular);

  // Group templates by category for organized display
  const templatesByCategory = categories.slice(1).reduce((acc, category) => {
    const categoryTemplates = filteredTemplates.filter(t => t.category === category);
    if (categoryTemplates.length > 0) {
      acc[category] = categoryTemplates;
    }
    return acc;
  }, {} as Record<string, Template[]>);

  const handleUseTemplate = (template: Template) => {
    onSelectTemplate(template);
    onClose();
  };

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
          className="relative w-full max-w-7xl mx-4 bg-card border border-border rounded-2xl shadow-2xl my-auto"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-card border-b border-border rounded-t-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Templates Prontos</h2>
                <p className="text-muted-foreground mt-1">Sites e logos profissionais para começar rápido</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Type Tabs */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setSelectedType("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  selectedType === "all"
                    ? "bg-orange-500 text-white"
                    : "bg-white/[0.04] text-white/60 hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setSelectedType("website")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  selectedType === "website"
                    ? "bg-orange-500 text-white"
                    : "bg-white/[0.04] text-white/60 hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                <Globe className="w-4 h-4" />
                Websites
              </button>
              <button
                onClick={() => setSelectedType("logo")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  selectedType === "logo"
                    ? "bg-orange-500 text-white"
                    : "bg-white/[0.04] text-white/60 hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                <Palette className="w-4 h-4" />
                Logos
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

          {/* Content */}
          <div className="p-6">
            {/* Popular Section */}
            {selectedCategory === "Todos" && search === "" && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-orange-400 fill-orange-400" />
                  <h3 className="text-lg font-semibold text-white">Mais Usados</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {popularTemplates.slice(0, 4).map((template) => (
                    <TemplateCard
                      key={`popular-${template.id}`}
                      template={template}
                      onPreview={() => setPreviewTemplate(template)}
                      onSelect={() => onSelectTemplate(template)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* All Templates */}
            {filteredTemplates.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-white/40">Nenhum template encontrado</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredTemplates.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    onPreview={() => setPreviewTemplate(template)}
                    onSelect={() => onSelectTemplate(template)}
                  />
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
                  className="relative w-full max-w-6xl h-[85vh] bg-[hsl(0,0%,6%)] rounded-xl overflow-hidden border border-white/[0.08]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Preview Header */}
                  <div className="flex items-center justify-between p-4 border-b border-white/[0.08]">
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="font-semibold text-white">{previewTemplate.name}</h3>
                        <p className="text-sm text-white/50">{previewTemplate.description}</p>
                      </div>
                      <div className="flex gap-2">
                        {(previewTemplate.type === "both" || previewTemplate.type === "website") && (
                          <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full flex items-center gap-1">
                            <Globe className="w-3 h-3" /> Site
                          </span>
                        )}
                        {(previewTemplate.type === "both" || previewTemplate.type === "logo") && (
                          <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-400 rounded-full flex items-center gap-1">
                            <Palette className="w-3 h-3" /> Logo
                          </span>
                        )}
                      </div>
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
                  
                  {/* Preview Content */}
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
                        <div className="text-center">
                          <span className="text-white text-4xl font-bold block mb-4">{previewTemplate.name}</span>
                          <span className="text-white/60">Preview em desenvolvimento</span>
                        </div>
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

// Template Card Component
interface TemplateCardProps {
  template: Template;
  onPreview: () => void;
  onSelect: () => void;
}

const TemplateCard = ({ template, onPreview, onSelect }: TemplateCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden hover:border-orange-500/30 transition-all cursor-pointer"
    >
      {/* Preview Thumbnail */}
      <div
        className="relative h-44 overflow-hidden"
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

        {/* Popular Badge */}
        {template.popular && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" /> Popular
          </div>
        )}

        {/* Type Badges */}
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
        
        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPreview();
            }}
            className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white transition-colors"
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-sm text-white font-medium transition-colors"
          >
            Usar
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4" onClick={onSelect}>
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
  );
};

export default TemplatesModal;
