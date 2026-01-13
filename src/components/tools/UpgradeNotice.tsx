import { motion } from "framer-motion";
import { Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UpgradeNoticeProps {
  className?: string;
}

const UpgradeNotice = ({ className = "" }: UpgradeNoticeProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-30 ${className}`}
    >
      <button
        onClick={() => navigate("/pricing")}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-card/95 backdrop-blur-sm border border-border shadow-lg hover:border-primary/50 hover:bg-card transition-all group"
      >
        <Crown className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-foreground">
          Assinar o Pro
        </span>
        <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
          →
        </span>
      </button>
    </motion.div>
  );
};

export default UpgradeNotice;
