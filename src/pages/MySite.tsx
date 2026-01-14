import { motion } from "framer-motion";
import { Globe, Edit3, Eye, ExternalLink, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const MySite = () => {
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
            <h1 className="text-3xl font-extrabold text-foreground mb-2">Meu Site</h1>
            <p className="text-muted-foreground">Preview e edição do seu site gerado pela IA</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Eye className="w-4 h-4" />
              Preview
            </Button>
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <Edit3 className="w-4 h-4" />
              Editar com IA
            </Button>
          </div>
        </div>

        {/* Site Preview */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          {/* Browser chrome */}
          <div className="h-12 bg-muted/50 border-b border-border flex items-center px-4 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="px-4 py-1.5 rounded-lg bg-background/50 border border-border text-sm text-muted-foreground flex items-center gap-2">
                <Globe className="w-3.5 h-3.5" />
                seusite.codia.ai
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>

          {/* Preview area */}
          <div className="aspect-[16/9] bg-gradient-to-br from-muted to-background flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Nenhum site criado ainda</h3>
              <p className="text-muted-foreground mb-6">Crie seu primeiro site com a ajuda da IA</p>
              <Button 
                onClick={() => navigate("/builder", { state: { tool: "website" } })}
                className="gap-2 bg-primary hover:bg-primary/90"
              >
                <RefreshCw className="w-4 h-4" />
                Criar Site com IA
              </Button>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {[
            { icon: Edit3, label: "Editar Conteúdo", desc: "Altere textos e imagens" },
            { icon: RefreshCw, label: "Regerar Tema", desc: "Nova paleta de cores" },
            { icon: ExternalLink, label: "Publicar", desc: "Coloque no ar" },
          ].map((action, i) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-all text-left group"
            >
              <action.icon className="w-5 h-5 text-primary mb-2 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold text-foreground">{action.label}</h4>
              <p className="text-sm text-muted-foreground">{action.desc}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MySite;
