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
    sm: { text: "text-lg", symbol: 16, glow: 8 },
    md: { text: "text-xl", symbol: 20, glow: 12 },
    lg: { text: "text-2xl", symbol: 24, glow: 16 },
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
      className="flex items-center gap-1.5 group relative"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className={`font-bold ${sizes[size].text} text-primary tracking-tight`}>
        Codia
      </span>
      
      {/* Infinity Symbol with Spinning + Glow Effect */}
      <div className="relative">
        {animated && (
          <>
            {/* Glow ring */}
            <motion.div
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 blur-md bg-primary/60 rounded-full"
            />
            {/* Outer spinning ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-4px] rounded-full border border-primary/30"
            />
          </>
        )}
        <motion.span 
          className={`${sizes[size].text} text-primary font-light relative z-10`}
          animate={animated ? {
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
            textShadow: [
              "0 0 10px hsl(24, 100%, 55%)",
              "0 0 25px hsl(24, 100%, 55%)",
              "0 0 10px hsl(24, 100%, 55%)"
            ]
          } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          ∞
        </motion.span>
      </div>
    </motion.button>
  );
};

export default CodiaLogo;