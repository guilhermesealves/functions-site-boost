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
    sm: { text: "text-lg", symbol: 20 },
    md: { text: "text-xl", symbol: 24 },
    lg: { text: "text-2xl", symbol: 28 },
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
      {/* Animated Infinity Symbol */}
      <motion.div
        className="relative"
        animate={animated ? {
          rotateY: [0, 180, 360],
          scale: [1, 1.1, 1],
        } : {}}
        transition={animated ? {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        } : {}}
        style={{ transformStyle: "preserve-3d" }}
      >
        <svg 
          width={sizes[size].symbol} 
          height={sizes[size].symbol} 
          viewBox="0 0 24 24" 
          fill="none"
          className="text-primary"
        >
          <motion.path
            d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.781 0-4.781 8 0 8 5.606 0 7.644-8 12.74-8z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={animated ? { 
              pathLength: [0, 1, 1, 0],
              opacity: [0, 1, 1, 0],
            } : { pathLength: 1, opacity: 1 }}
            transition={animated ? {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.4, 0.6, 1],
            } : { duration: 0.5 }}
          />
          <motion.path
            d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.781 0-4.781 8 0 8 5.606 0 7.644-8 12.74-8z"
            fill="currentColor"
            initial={{ opacity: 0 }}
            animate={animated ? { 
              opacity: [0, 0.3, 0.3, 0],
            } : { opacity: 0.2 }}
            transition={animated ? {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.4, 0.6, 1],
            } : {}}
          />
        </svg>
        {/* Glow effect */}
        {animated && (
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/30 blur-md"
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </motion.div>
    </motion.button>
  );
};

export default CodiaLogo;
