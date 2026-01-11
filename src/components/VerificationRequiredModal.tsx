import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Gift, Send, X, CheckCircle } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { toast } from "sonner";

interface VerificationRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VerificationRequiredModal = ({ isOpen, onClose }: VerificationRequiredModalProps) => {
  const { profile, user } = useProfile();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleResend = async () => {
    if (sending || !profile || !user) return;
    setSending(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-verification-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: profile.email,
            userId: user.id,
            name: profile.name,
            type: "resend",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao enviar email");
      }

      setSent(true);
      toast.success("Email enviado! Verifique sua caixa de entrada.");
    } catch (error: any) {
      console.error("Error resending verification:", error);
      toast.error(error.message || "Erro ao reenviar email");
    } finally {
      setSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md bg-card border border-border rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="relative p-6 bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-b border-border">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/20 flex items-center justify-center">
              <Mail className="w-8 h-8 text-amber-400" />
            </div>

            <h2 className="text-xl font-bold text-center text-foreground">
              Verifique seu Email
            </h2>
            <p className="text-sm text-center text-muted-foreground mt-2">
              Para usar esta funcionalidade, confirme seu email
            </p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Email display */}
            <div className="p-4 bg-secondary/50 rounded-xl border border-border">
              <p className="text-xs text-muted-foreground mb-1">Email da conta</p>
              <p className="text-sm font-medium text-foreground">{profile?.email}</p>
            </div>

            {/* Bonus card */}
            <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/30">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Gift className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-lg font-bold text-green-400">+15 Créditos</p>
                  <p className="text-xs text-muted-foreground">Esperando por você!</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            {sent ? (
              <div className="flex items-center gap-3 p-4 bg-green-500/10 rounded-xl border border-green-500/30">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <p className="text-sm text-green-400">Email enviado! Verifique sua caixa.</p>
              </div>
            ) : (
              <button
                onClick={handleResend}
                disabled={sending}
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
                {sending ? "Enviando..." : "Enviar Email de Verificação"}
              </button>
            )}

            <button
              onClick={onClose}
              className="w-full py-3 text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Entendi, verificarei depois
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VerificationRequiredModal;
