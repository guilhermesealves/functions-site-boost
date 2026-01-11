import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, X, Gift, Send } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const EmailVerificationBanner = () => {
  const { profile, user, isVerified } = useProfile();
  const [dismissed, setDismissed] = useState(false);
  const [sending, setSending] = useState(false);

  // Don't show if verified, dismissed, or no profile
  if (isVerified || dismissed || !profile || !user) return null;

  const handleResend = async () => {
    if (sending) return;
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

      toast.success("Email de verificação enviado! Verifique sua caixa de entrada.");
    } catch (error: any) {
      console.error("Error resending verification:", error);
      toast.error(error.message || "Erro ao reenviar email");
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 border-b border-amber-500/30"
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Left side */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
              <Mail className="w-5 h-5 text-amber-400" />
            </div>
            
            <div>
              <p className="text-sm font-medium text-foreground">
                📧 Verifique seu email para começar
              </p>
              <p className="text-xs text-muted-foreground">
                {profile.email}
              </p>
            </div>
          </div>

          {/* Center - Bonus */}
          <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/20 border border-green-500/30">
            <Gift className="w-4 h-4 text-green-400" />
            <span className="text-sm font-semibold text-green-400">+15 créditos ao verificar</span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleResend}
              disabled={sending}
              className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {sending ? "Enviando..." : "Reenviar Email"}
            </button>
            
            <button
              onClick={() => setDismissed(true)}
              className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EmailVerificationBanner;
