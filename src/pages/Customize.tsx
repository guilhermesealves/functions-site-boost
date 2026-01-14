import { useState } from "react";
import { motion } from "framer-motion";
import { Paintbrush, Palette, Type, Image, Layout, Save, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const colorPresets = [
  { name: "Laranja Neon", primary: "#ff6b00", secondary: "#0a0a0a" },
  { name: "Azul Moderno", primary: "#3b82f6", secondary: "#0a0a0a" },
  { name: "Verde Natureza", primary: "#22c55e", secondary: "#0a0a0a" },
  { name: "Roxo Premium", primary: "#a855f7", secondary: "#0a0a0a" },
  { name: "Rosa Vibrante", primary: "#ec4899", secondary: "#0a0a0a" },
];

const fontOptions = [
  { name: "Inter", style: "font-sans" },
  { name: "Playfair", style: "font-serif" },
  { name: "Roboto Mono", style: "font-mono" },
];

const Customize = () => {
  const [selectedColor, setSelectedColor] = useState(colorPresets[0]);
  const [selectedFont, setSelectedFont] = useState(fontOptions[0]);

  const handleSave = () => {
    toast.success("Personalizações salvas");
  };

  return (
    <div className="min-h-screen bg-background p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-foreground mb-2">Personalizar</h1>
            <p className="text-muted-foreground">Customize a aparência da sua loja</p>
          </div>
          <Button onClick={handleSave} className="gap-2 bg-primary hover:bg-primary/90">
            <Save className="w-4 h-4" />
            Salvar
          </Button>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {/* Colors */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl border border-border bg-card"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <Palette className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Cores</h3>
                <p className="text-sm text-muted-foreground">Defina a paleta de cores da sua marca</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {colorPresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => setSelectedColor(preset)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedColor.name === preset.name
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div 
                    className="w-full h-8 rounded-lg mb-2"
                    style={{ backgroundColor: preset.primary }}
                  />
                  <p className="text-sm font-medium text-foreground text-center">{preset.name}</p>
                </button>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <Label>Cor Primária</Label>
                <div className="flex items-center gap-2 mt-1.5">
                  <div 
                    className="w-10 h-10 rounded-lg border border-border"
                    style={{ backgroundColor: selectedColor.primary }}
                  />
                  <Input value={selectedColor.primary} readOnly className="flex-1" />
                </div>
              </div>
              <div>
                <Label>Cor Secundária</Label>
                <div className="flex items-center gap-2 mt-1.5">
                  <div 
                    className="w-10 h-10 rounded-lg border border-border"
                    style={{ backgroundColor: selectedColor.secondary }}
                  />
                  <Input value={selectedColor.secondary} readOnly className="flex-1" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Fonts */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl border border-border bg-card"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <Type className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Tipografia</h3>
                <p className="text-sm text-muted-foreground">Escolha as fontes do seu site</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {fontOptions.map((font) => (
                <button
                  key={font.name}
                  onClick={() => setSelectedFont(font)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedFont.name === font.name
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <p className={`text-2xl font-bold text-foreground mb-1 ${font.style}`}>Aa</p>
                  <p className="text-sm text-muted-foreground">{font.name}</p>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-2xl border border-border bg-card"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <Image className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Logo</h3>
                <p className="text-sm text-muted-foreground">Faça upload do logo da sua marca</p>
              </div>
            </div>

            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/30 transition-colors cursor-pointer">
              <Image className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">Arraste uma imagem ou clique para fazer upload</p>
              <p className="text-xs text-muted-foreground/60 mt-1">PNG, JPG ou SVG até 2MB</p>
            </div>
          </motion.div>

          {/* Regenerate Theme */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-2xl border border-primary/20 bg-primary/5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/20">
                  <RefreshCw className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Regerar Tema com IA</h3>
                  <p className="text-sm text-muted-foreground">Deixe a IA criar uma nova paleta para você</p>
                </div>
              </div>
              <Button className="gap-2 bg-primary hover:bg-primary/90">
                <RefreshCw className="w-4 h-4" />
                Regerar
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Customize;
