import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface CodiaLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  onClick?: () => void;
  animated?: boolean;
}

const CodiaLogo = ({ size = "md", onClick, animated = false }: CodiaLogoProps) => {
  const navigate = useNavigate();

  const sizes = {
    sm: { text: "text-lg", symbol: 16 },
    md: { text: "text-xl", symbol: 20 },
    lg: { text: "text-2xl", symbol: 24 },
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
      className="flex items-center gap-1.5 group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className={`font-bold ${sizes[size].text} text-primary tracking-tight`}>
        Codia
      </span>
      {/* Infinity Symbol */}
      <span className={`${sizes[size].text} text-primary font-light`}>
        ∞
      </span>
    </motion.button>
  );
};

export default CodiaLogo;
