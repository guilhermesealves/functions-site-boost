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
      {/* Animated Flame/Fire Symbol */}
      <motion.div
        className="relative"
        animate={animated ? {
          y: [0, -2, 0],
        } : {}}
        transition={animated ? {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        } : {}}
      >
        <svg 
          width={sizes[size].symbol} 
          height={sizes[size].symbol} 
          viewBox="0 0 24 24" 
          fill="none"
          className="text-primary"
        >
          {/* Flame shape */}
          <motion.path
            d="M12 2C12 2 8 6 8 10C8 12 9 14 10 15C10 15 9 13 10 11C11 9 12 8 12 8C12 8 13 9 14 11C15 13 14 15 14 15C15 14 16 12 16 10C16 6 12 2 12 2Z"
            fill="currentColor"
            animate={animated ? {
              opacity: [0.7, 1, 0.7],
              scale: [1, 1.05, 1],
            } : {}}
            transition={animated ? {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            } : {}}
          />
          {/* Inner flame */}
          <motion.path
            d="M12 6C12 6 10 9 10 11C10 12.5 11 13.5 12 14C12 14 11.5 12.5 12 11C12.5 9.5 13 8.5 12 6Z"
            fill="hsl(32, 100%, 60%)"
            animate={animated ? {
              opacity: [0.5, 1, 0.5],
              y: [0, -1, 0],
            } : {}}
            transition={animated ? {
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            } : {}}
          />
        </svg>
        {/* Glow effect */}
        {animated && (
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/40 blur-sm -z-10"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 1.5,
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
