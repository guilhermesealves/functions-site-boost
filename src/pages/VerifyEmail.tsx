import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Loader2, Gift, ArrowRight, RefreshCw } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

type VerificationStatus = "loading" | "success" | "error" | "expired";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<VerificationStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [creditsEarned, setCreditsEarned] = useState(0);
  const [sending, setSending] = useState(false);

  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setErrorMessage("Token de verificação não encontrado");
      return;
    }

    verifyEmail(token);
  }, [token]);

  const verifyEmail = async (token: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (data.code === "EXPIRED_TOKEN") {
          setStatus("expired");
        } else {
          setStatus("error");
        }
        setErrorMessage(data.error || "Erro ao verificar email");
        return;
      }

      setStatus("success");
      setCreditsEarned(data.creditsEarned || 15);
      toast.success("Email verificado com sucesso! 🎉");

      // Redirect after 3 seconds
      setTimeout(() => {
        navigate("/builder");
      }, 3000);
    } catch (error: any) {
      console.error("Verification error:", error);
      setStatus("error");
      setErrorMessage(error.message || "Erro ao verificar email");
    }
  };

  const handleResend = async () => {
    setSending(true);
    // This would need the user's email - typically stored in session
    toast.info("Por favor, faça login para reenviar o email de verificação");
    setSending(false);
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10" />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/30 blur-[150px] pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
          {/* Loading State */}
          {status === "loading" && (
            <div className="p-12 text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 mx-auto mb-6"
              >
                <Loader2 className="w-16 h-16 text-primary" />
              </motion.div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Verificando seu email...
              </h2>
              <p className="text-muted-foreground">
                Aguarde um momento
              </p>
            </div>
          )}

          {/* Success State */}
          {status === "success" && (
            <>
              <div className="p-8 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-b border-border text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center"
                >
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </motion.div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Email Verificado! 🎉
                </h2>
                <p className="text-muted-foreground">
                  Sua conta está ativa
                </p>
              </div>

              <div className="p-6 space-y-4">
                {/* Credits earned */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/30 text-center"
                >
                  <Gift className="w-12 h-12 text-green-400 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-green-400 mb-1">
                    +{creditsEarned} Créditos
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Creditados na sua conta!
                  </p>
                </motion.div>

                {/* Redirect notice */}
                <p className="text-center text-sm text-muted-foreground">
                  Redirecionando em 3 segundos...
                </p>

                <button
                  onClick={() => navigate("/builder")}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-primary to-amber-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
                >
                  Começar Agora
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </>
          )}

          {/* Error State */}
          {(status === "error" || status === "expired") && (
            <>
              <div className="p-8 bg-gradient-to-br from-destructive/20 to-red-500/20 border-b border-border text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-destructive/20 flex items-center justify-center">
                  <XCircle className="w-10 h-10 text-destructive" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {status === "expired" ? "Link Expirado" : "Erro na Verificação"}
                </h2>
                <p className="text-muted-foreground">
                  {errorMessage}
                </p>
              </div>

              <div className="p-6 space-y-4">
                <button
                  onClick={handleResend}
                  disabled={sending}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-primary to-amber-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  <RefreshCw className={`w-5 h-5 ${sending ? "animate-spin" : ""}`} />
                  {sending ? "Enviando..." : "Solicitar Novo Link"}
                </button>

                <button
                  onClick={() => navigate("/auth")}
                  className="w-full py-3 text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Voltar para Login
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
