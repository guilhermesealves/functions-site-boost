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
      {/* Infinity Symbol with glow animation */}
      <motion.div
        className="relative"
        animate={animated ? {
          scale: [1, 1.1, 1],
        } : {}}
        transition={animated ? {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        } : {}}
      >
        <motion.span 
          className={`${sizes[size].text} text-primary font-light`}
          animate={animated ? {
            opacity: [0.7, 1, 0.7],
          } : {}}
          transition={animated ? {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          } : {}}
        >
          ∞
        </motion.span>
        {/* Glow effect */}
        {animated && (
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/30 blur-md -z-10"
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
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
