import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, ArrowRight, Loader2 } from "lucide-react";
import { useStore } from "@/hooks/useStore";
import { toast } from "sonner";

interface CreateStoreModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

const CreateStoreModal = ({ isOpen, onComplete }: CreateStoreModalProps) => {
  const [storeName, setStoreName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const { createStore } = useStore();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!storeName.trim()) {
      toast.error("Digite o nome da sua empresa");
      return;
    }

    setIsCreating(true);
    try {
      await createStore(storeName.trim());
      toast.success("Empresa criada com sucesso");
      onComplete();
    } catch (error: any) {
      toast.error(error.message || "Erro ao criar empresa");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-8 pb-0">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <Building2 className="w-8 h-8 text-primary" />
            </div>

            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Cadastre sua empresa
            </h2>
            <p className="text-muted-foreground">
              Digite o nome da sua empresa para continuar. Você poderá editar essas informações posteriormente.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="mb-6">
              <label 
                htmlFor="storeName" 
                className="block text-sm font-medium text-foreground mb-2"
              >
                Nome da empresa
              </label>
              <input
                id="storeName"
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="Ex: Minha Loja, Consultoria ABC..."
                className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                autoFocus
                disabled={isCreating}
              />
            </div>

            <button
              type="submit"
              disabled={isCreating || !storeName.trim()}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isCreating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Criando...
                </>
              ) : (
                <>
                  Continuar
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CreateStoreModal;
