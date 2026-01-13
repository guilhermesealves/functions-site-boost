import { motion } from "framer-motion";
import { Eye } from "lucide-react";

const PreviewOverlay = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute top-4 left-4 z-20"
    >
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 backdrop-blur-sm">
        <Eye className="w-3.5 h-3.5 text-amber-400" />
        <span className="text-xs font-medium text-amber-400">
          Modo Preview
        </span>
      </div>
    </motion.div>
  );
};

export default PreviewOverlay;
