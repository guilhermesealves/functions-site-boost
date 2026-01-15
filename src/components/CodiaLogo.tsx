import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface CodiaLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  onClick?: () => void;
  animated?: boolean;
}

const CodiaLogo = ({ size = "md", onClick, animated = true }: CodiaLogoProps) => {
  const navigate = useNavigate();

  const sizes = {
    sm: { text: "text-lg", symbol: "text-lg" },
    md: { text: "text-xl", symbol: "text-xl" },
    lg: { text: "text-2xl", symbol: "text-2xl" },
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate("/");
    }
  };

  return (
    <motion.button 
      onClick={handleClick}
      className="flex items-center gap-1 group relative"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className={`font-bold ${sizes[size].text} text-primary tracking-tight`}>
        Codia
      </span>
      
      {/* Infinity Symbol with subtle pulse glow */}
      <motion.span 
        className={`${sizes[size].symbol} text-primary font-light`}
        animate={animated ? {
          textShadow: [
            "0 0 8px hsl(24, 100%, 55%), 0 0 16px hsl(24, 100%, 55%)",
            "0 0 20px hsl(24, 100%, 55%), 0 0 40px hsl(24, 100%, 55%)",
            "0 0 8px hsl(24, 100%, 55%), 0 0 16px hsl(24, 100%, 55%)"
          ],
          opacity: [0.9, 1, 0.9]
        } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        ∞
      </motion.span>
    </motion.button>
  );
};

export default CodiaLogo;