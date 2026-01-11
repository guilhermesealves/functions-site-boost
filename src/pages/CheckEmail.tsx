import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Gift, RefreshCw, Clock, ArrowRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CheckEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ minutes: 59, seconds: 59 });

  const email = location.state?.email || "seu@email.com";
  const userId = location.state?.userId;
  const name = location.state?.name;

  // Countdown for token expiration (60 minutes)
  useEffect(() => {
    const startTime = Date.now();
    const expirationTime = startTime + 60 * 60 * 1000; // 60 minutes

    const timer = setInterval(() => {
      const now = Date.now();
      const remaining = expirationTime - now;

      if (remaining <= 0) {
        clearInterval(timer);
        setTimeLeft({ minutes: 0, seconds: 0 });
      } else {
        const minutes = Math.floor(remaining / (1000 * 60));
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
        setTimeLeft({ minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Countdown for resend button (60 seconds)
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResend = async () => {
    if (countdown > 0 || sending || !userId) return;
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
            email,
            userId,
            name,
            type: "resend",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao enviar email");
      }

      toast.success("Email reenviado! Verifique sua caixa de entrada.");
      setCountdown(60); // 60 second cooldown
    } catch (error: any) {
      console.error("Error resending:", error);
      toast.error(error.message || "Erro ao reenviar email");
    } finally {
      setSending(false);
    }
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-lg text-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-24 h-24 mx-auto mb-8 rounded-full bg-primary/20 flex items-center justify-center"
        >
          <Mail className="w-12 h-12 text-primary" />
        </motion.div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Verifique seu Email 📧
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Enviamos um link de verificação para:
        </p>

        {/* Email display */}
        <div className="inline-block px-6 py-3 bg-secondary/50 rounded-xl border border-border mb-8">
          <p className="text-lg font-semibold text-foreground">{email}</p>
        </div>

        {/* Bonus card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-500/30 p-6 mb-8"
        >
          <Gift className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <p className="text-2xl font-bold text-green-400 mb-2">+15 Créditos Grátis</p>
          <p className="text-sm text-muted-foreground">Ao confirmar seu email</p>
        </motion.div>

        {/* Timer */}
        <div className="flex items-center justify-center gap-2 mb-8 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span className="text-sm">
            Link expira em:{" "}
            <span className="text-primary font-semibold">
              {timeLeft.minutes}m {timeLeft.seconds}s
            </span>
          </span>
        </div>

        {/* Instructions */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8 text-left">
          <h3 className="font-semibold text-foreground mb-4">Próximos passos:</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
              <span>Abra seu email e encontre a mensagem da Codia</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
              <span>Clique no botão "Confirmar Email"</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
              <span>Pronto! Você receberá 15 créditos e poderá começar a criar</span>
            </li>
          </ul>
          <p className="text-xs text-muted-foreground mt-4">
            💡 Não encontrou? Verifique a pasta de spam ou lixo eletrônico.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleResend}
            disabled={countdown > 0 || sending}
            className="flex items-center justify-center gap-2 py-3 px-6 bg-secondary hover:bg-secondary/80 text-foreground font-medium rounded-xl transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${sending ? "animate-spin" : ""}`} />
            {countdown > 0 
              ? `Reenviar em ${countdown}s` 
              : sending 
                ? "Enviando..." 
                : "Reenviar Email"
            }
          </button>

          <button
            onClick={() => navigate("/auth")}
            className="py-3 text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            Voltar para Login
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CheckEmail;
