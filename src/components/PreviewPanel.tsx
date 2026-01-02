import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Monitor, 
  Smartphone, 
  Tablet, 
  RefreshCw, 
  ExternalLink, 
  Code,
  Eye,
  Maximize2,
  Copy,
  Check
} from "lucide-react";
import { Button } from "./ui/button";

interface PreviewPanelProps {
  content?: string;
  type: "website" | "logo" | "branding" | "copy" | "marketing" | "business" | "sales";
  isLoading?: boolean;
}

const PreviewPanel = ({ content, type, isLoading }: PreviewPanelProps) => {
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const deviceWidths = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px"
  };

  const handleCopy = () => {
    if (content) {
      navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getPlaceholderContent = () => {
    switch (type) {
      case "website":
        return (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 border border-orange-500/20 flex items-center justify-center">
              <Monitor className="w-8 h-8 text-orange-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Preview do Website</h3>
              <p className="text-white/40 text-sm">Seu site aparecerá aqui enquanto você conversa</p>
            </div>
          </div>
        );
      case "logo":
        return (
          <div className="text-center space-y-4">
            <div className="grid grid-cols-2 gap-3 max-w-[200px] mx-auto">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500/30 to-amber-500/20" />
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Conceitos de Logo</h3>
              <p className="text-white/40 text-sm">Suas opções de logo aparecerão aqui</p>
            </div>
          </div>
        );
      case "branding":
        return (
          <div className="text-center space-y-4">
            <div className="flex justify-center gap-2">
              {["#FF6B35", "#FFA726", "#1A1A2E", "#16213E", "#E8E8E8"].map((color) => (
                <div 
                  key={color}
                  className="w-10 h-10 rounded-xl border border-white/10"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Paleta & Branding</h3>
              <p className="text-white/40 text-sm">Cores, tipografia e identidade visual</p>
            </div>
          </div>
        );
      case "copy":
        return (
          <div className="text-center space-y-4 max-w-md mx-auto">
            <div className="space-y-2">
              <div className="h-4 bg-white/[0.06] rounded w-3/4 mx-auto" />
              <div className="h-3 bg-white/[0.04] rounded w-full" />
              <div className="h-3 bg-white/[0.04] rounded w-5/6 mx-auto" />
              <div className="h-3 bg-white/[0.04] rounded w-4/5 mx-auto" />
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Textos & Copies</h3>
              <p className="text-white/40 text-sm">Headlines, descrições e CTAs</p>
            </div>
          </div>
        );
      case "marketing":
        return (
          <div className="text-center space-y-4">
            <div className="flex justify-center gap-4">
              <div className="w-24 h-32 rounded-xl bg-white/[0.03] border border-white/[0.06] p-2">
                <div className="w-full h-3 bg-orange-500/30 rounded mb-2" />
                <div className="space-y-1">
                  <div className="h-2 bg-white/[0.06] rounded w-full" />
                  <div className="h-2 bg-white/[0.04] rounded w-3/4" />
                </div>
              </div>
              <div className="w-24 h-32 rounded-xl bg-white/[0.03] border border-white/[0.06] p-2">
                <div className="w-full h-3 bg-amber-500/30 rounded mb-2" />
                <div className="space-y-1">
                  <div className="h-2 bg-white/[0.06] rounded w-full" />
                  <div className="h-2 bg-white/[0.04] rounded w-2/3" />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Estratégia de Marketing</h3>
              <p className="text-white/40 text-sm">Campanhas, posts e calendário</p>
            </div>
          </div>
        );
      case "business":
        return (
          <div className="text-center space-y-4">
            <div className="grid grid-cols-3 gap-3 max-w-[240px] mx-auto">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="text-lg font-bold text-orange-400">MVP</div>
                <div className="text-[10px] text-white/40">Produto</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="text-lg font-bold text-amber-400">TAM</div>
                <div className="text-[10px] text-white/40">Mercado</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="text-lg font-bold text-emerald-400">ROI</div>
                <div className="text-[10px] text-white/40">Retorno</div>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Plano de Negócio</h3>
              <p className="text-white/40 text-sm">Modelo, estratégia e projeções</p>
            </div>
          </div>
        );
      case "sales":
        return (
          <div className="text-center space-y-4">
            <div className="max-w-[200px] mx-auto space-y-2">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-left">
                <div className="text-xs text-emerald-400">Script de Abertura</div>
                <div className="h-2 bg-white/[0.06] rounded w-full mt-1" />
              </div>
              <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-left">
                <div className="text-xs text-orange-400">Quebra de Objeções</div>
                <div className="h-2 bg-white/[0.06] rounded w-3/4 mt-1" />
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Scripts de Vendas</h3>
              <p className="text-white/40 text-sm">Abordagem, objeções e fechamento</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col bg-[hsl(0,0%,4%)] border-l border-white/[0.06]">
      {/* Header */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-white/[0.06] bg-[hsl(0,0%,5%)]">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowCode(false)}
            className={`h-8 px-3 rounded-lg ${!showCode ? 'bg-white/[0.06] text-white' : 'text-white/50 hover:text-white'}`}
          >
            <Eye className="w-4 h-4 mr-1.5" />
            Preview
          </Button>
          {type === "website" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCode(true)}
              className={`h-8 px-3 rounded-lg ${showCode ? 'bg-white/[0.06] text-white' : 'text-white/50 hover:text-white'}`}
            >
              <Code className="w-4 h-4 mr-1.5" />
              Código
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Device Switcher */}
          {type === "website" && !showCode && (
            <div className="flex items-center gap-1 p-1 bg-white/[0.03] rounded-lg">
              <button
                onClick={() => setDevice("desktop")}
                className={`p-1.5 rounded ${device === "desktop" ? 'bg-white/[0.08] text-white' : 'text-white/40 hover:text-white'}`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDevice("tablet")}
                className={`p-1.5 rounded ${device === "tablet" ? 'bg-white/[0.08] text-white' : 'text-white/40 hover:text-white'}`}
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDevice("mobile")}
                className={`p-1.5 rounded ${device === "mobile" ? 'bg-white/[0.08] text-white' : 'text-white/40 hover:text-white'}`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          )}

          {content && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="h-8 w-8 p-0 text-white/40 hover:text-white"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-white/40 hover:text-white"
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center space-y-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 mx-auto rounded-full border-2 border-orange-500/20 border-t-orange-500"
              />
              <p className="text-white/40 text-sm">Gerando preview...</p>
            </div>
          </div>
        ) : content ? (
          <div className="h-full flex items-center justify-center">
            {type === "website" && !showCode ? (
              <div 
                className="bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-300"
                style={{ 
                  width: deviceWidths[device],
                  maxWidth: "100%",
                  height: device === "mobile" ? "667px" : "100%"
                }}
              >
                <iframe
                  srcDoc={content}
                  className="w-full h-full border-0"
                  title="Website Preview"
                  sandbox="allow-scripts"
                />
              </div>
            ) : (
              <div className="w-full h-full">
                <pre className="p-4 bg-[hsl(0,0%,6%)] rounded-xl border border-white/[0.06] overflow-auto text-sm text-white/70 font-mono whitespace-pre-wrap">
                  {content}
                </pre>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            {getPlaceholderContent()}
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;
