import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coins, Zap, ChevronDown, Trophy, Flame, Crown } from "lucide-react";
import { useCredits } from "@/hooks/useCredits";
import { useNavigate } from "react-router-dom";

interface CreditDisplayProps {
  compact?: boolean;
}

const CreditDisplay = ({ compact = false }: CreditDisplayProps) => {
  const { balance, loading } = useCredits();
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary/50 animate-pulse">
        <div className="w-4 h-4 bg-muted rounded" />
        <div className="w-12 h-4 bg-muted rounded" />
      </div>
    );
  }

  if (!balance) return null;

  const totalCredits = balance.total;
  const isLowCredits = totalCredits < 3;

  if (compact) {
    return (
      <button
        onClick={() => navigate("/pricing")}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${
          isLowCredits 
            ? "bg-destructive/20 text-destructive border border-destructive/30" 
            : "bg-secondary/50 hover:bg-secondary text-foreground border border-border"
        }`}
      >
        <Coins className="w-4 h-4 text-primary" />
        <span className="text-sm font-semibold">{totalCredits.toFixed(1)}</span>
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDetails(!showDetails)}
        className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all ${
          isLowCredits 
            ? "bg-destructive/20 border border-destructive/30 hover:bg-destructive/30" 
            : "bg-secondary/50 hover:bg-secondary border border-border"
        }`}
      >
        {/* Credits */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Coins className="w-5 h-5 text-primary" />
            {isLowCredits && (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full"
              />
            )}
          </div>
          <span className="text-sm font-bold">{totalCredits.toFixed(1)}</span>
        </div>

        {/* Divider */}
        <div className="w-px h-4 bg-border" />

        {/* Level & Streak */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Crown className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-muted-foreground">Nv.{balance.level}</span>
          </div>
          {balance.streak > 0 && (
            <div className="flex items-center gap-1">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-xs text-muted-foreground">{balance.streak}</span>
            </div>
          )}
        </div>

        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showDetails ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Details */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute right-0 top-full mt-2 w-72 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-primary/20 to-amber-500/20 border-b border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-foreground">Seus Créditos</span>
                <span className="text-xs text-muted-foreground uppercase">
                  {balance.tier === "free" ? "Grátis" : balance.tier}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">{totalCredits.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">créditos disponíveis</span>
              </div>
            </div>

            {/* Details */}
            <div className="p-4 space-y-3">
              {/* Daily */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm text-muted-foreground">Diários</span>
                </div>
                <span className="text-sm font-medium">
                  {balance.daily.remaining.toFixed(1)} / {balance.daily.limit}
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(balance.daily.remaining / balance.daily.limit) * 100}%` }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                />
              </div>

              {/* Purchased */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Comprados</span>
                </div>
                <span className="text-sm font-medium">{balance.purchased.toFixed(1)}</span>
              </div>

              {/* XP Progress */}
              <div className="pt-2 border-t border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    <span className="text-sm text-muted-foreground">Nível {balance.level}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{balance.xp} XP</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border bg-secondary/30">
              <button
                onClick={() => {
                  setShowDetails(false);
                  navigate("/pricing");
                }}
                className="w-full py-2 bg-gradient-to-r from-primary to-amber-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                {isLowCredits ? "Comprar Créditos" : "Ver Planos"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreditDisplay;
