import { motion } from "framer-motion";
import CodiaLogo from "./CodiaLogo";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="py-4 px-6 border-t border-white/[0.04] bg-[hsl(0,0%,4%)]"
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <CodiaLogo size="sm" />
        <p className="text-xs text-white/30">
          © 2025 Codia. Todos os direitos reservados.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
