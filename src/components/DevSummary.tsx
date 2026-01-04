import { motion } from "framer-motion";
import { 
  Globe, 
  PenTool, 
  FileText, 
  TrendingUp, 
  Palette,
  ExternalLink,
  Download,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface CreatedItem {
  id: string;
  type: "logo" | "website" | "branding" | "copywriter" | "marketing";
  title: string;
  description: string;
  preview?: string;
  createdAt: string;
  status: "completed" | "in-progress" | "pending";
}

interface DevSummaryProps {
  userName?: string;
}

const typeIcons = {
  logo: PenTool,
  website: Globe,
  branding: Palette,
  copywriter: FileText,
  marketing: TrendingUp,
};

const typeColors = {
  logo: "from-orange-500 to-amber-500",
  website: "from-emerald-500 to-teal-500",
  branding: "from-purple-500 to-pink-500",
  copywriter: "from-rose-500 to-red-500",
  marketing: "from-violet-500 to-indigo-500",
};

const typeLabels = {
  logo: "Logo & Visual",
  website: "Website",
  branding: "Branding",
  copywriter: "Copywriter",
  marketing: "Marketing",
};

// Get items from localStorage
const getCreatedItems = (): CreatedItem[] => {
  try {
    const chatHistory = localStorage.getItem("codia_chat_history");
    if (!chatHistory) return [];
    
    const history = JSON.parse(chatHistory);
    const items: CreatedItem[] = [];
    
    // Extract from logo
    if (history.logo && history.logo.length > 0) {
      const logoMessages = history.logo.filter((m: any) => m.role === "assistant" && m.imageUrl);
      logoMessages.forEach((msg: any, i: number) => {
        items.push({
          id: `logo-${i}`,
          type: "logo",
          title: `Logo ${i + 1}`,
          description: "Logo gerada pela IA",
          preview: msg.imageUrl,
          createdAt: "Recente",
          status: "completed"
        });
      });
    }
    
    // Extract from website
    if (history.website && history.website.length > 0) {
      const websiteMessages = history.website.filter((m: any) => m.role === "assistant" && m.content && m.content.length > 100);
      websiteMessages.forEach((msg: any, i: number) => {
        items.push({
          id: `website-${i}`,
          type: "website",
          title: `Website ${i + 1}`,
          description: msg.content.substring(0, 100) + "...",
          createdAt: "Recente",
          status: "completed"
        });
      });
    }
    
    // Extract from other tools
    ["branding", "copywriter", "marketing"].forEach(tool => {
      if (history[tool] && history[tool].length > 0) {
        const messages = history[tool].filter((m: any) => m.role === "assistant" && m.content);
        if (messages.length > 0) {
          items.push({
            id: `${tool}-0`,
            type: tool as any,
            title: typeLabels[tool as keyof typeof typeLabels],
            description: messages[messages.length - 1].content.substring(0, 100) + "...",
            createdAt: "Recente",
            status: "completed"
          });
        }
      }
    });
    
    return items;
  } catch {
    return [];
  }
};

const DevSummary = ({ userName = "você" }: DevSummaryProps) => {
  const createdItems = getCreatedItems();
  
  const itemsByType = createdItems.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, CreatedItem[]>);

  const hasItems = createdItems.length > 0;

  return (
    <div className="flex-1 h-[calc(100vh-64px)] overflow-y-auto bg-[hsl(0,0%,5%)]">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Desenvolvimento
          </h1>
          <p className="text-white/50">
            Resumo de tudo que foi criado para sua empresa
          </p>
        </motion.div>

        {!hasItems ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center min-h-[400px] text-center"
          >
            <div className="w-20 h-20 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center mb-6">
              <AlertCircle className="w-10 h-10 text-white/20" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Nenhum item criado ainda
            </h2>
            <p className="text-white/40 max-w-md mb-6">
              Use as ferramentas de IA para criar logos, websites, textos e mais. 
              Tudo aparecerá aqui como um resumo.
            </p>
            <p className="text-sm text-white/30">
              Comece por: <span className="text-orange-400">Logo</span>, <span className="text-orange-400">Website</span> ou <span className="text-orange-400">Branding</span>
            </p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(itemsByType).map(([type, items], typeIndex) => {
              const Icon = typeIcons[type as keyof typeof typeIcons];
              const color = typeColors[type as keyof typeof typeColors];
              const label = typeLabels[type as keyof typeof typeLabels];
              
              return (
                <motion.div
                  key={type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: typeIndex * 0.1 }}
                  className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden"
                >
                  {/* Type Header */}
                  <div className="p-4 border-b border-white/[0.04] flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{label}</h3>
                      <p className="text-xs text-white/40">{items.length} item(s) criado(s)</p>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  </div>

                  {/* Items */}
                  <div className="p-4 space-y-3">
                    {items.map((item, itemIndex) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.1] transition-colors cursor-pointer group"
                      >
                        {item.preview && (
                          <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-white/[0.02]">
                            <img 
                              src={item.preview} 
                              alt={item.title}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )}
                        
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-white text-sm truncate">{item.title}</h4>
                            <p className="text-xs text-white/40 line-clamp-2">{item.description}</p>
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 rounded-lg hover:bg-white/[0.06] text-white/40 hover:text-white transition-colors">
                              <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                            <button className="p-1.5 rounded-lg hover:bg-white/[0.06] text-white/40 hover:text-white transition-colors">
                              <Download className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-2 text-xs text-white/30">
                          <Clock className="w-3 h-3" />
                          <span>{item.createdAt}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Stats Summary */}
        {hasItems && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { label: "Total Criado", value: createdItems.length },
              { label: "Logos", value: itemsByType.logo?.length || 0 },
              { label: "Websites", value: itemsByType.website?.length || 0 },
              { label: "Textos", value: (itemsByType.copywriter?.length || 0) + (itemsByType.marketing?.length || 0) },
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] text-center">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-white/40">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DevSummary;
