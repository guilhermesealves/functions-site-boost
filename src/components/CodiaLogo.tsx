import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface CodiaLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  onClick?: () => void;
}

const CodiaLogo = ({ size = "md", showText = true, onClick }: CodiaLogoProps) => {
  const navigate = useNavigate();

  const sizes = {
    sm: { icon: "w-7 h-7", text: "text-base", spark: "w-3.5 h-3.5" },
    md: { icon: "w-9 h-9", text: "text-xl", spark: "w-4 h-4" },
    lg: { icon: "w-12 h-12", text: "text-2xl", spark: "w-5 h-5" },
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
      className="flex items-center gap-2.5 group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`${sizes[size].icon} rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/30 transition-shadow`}>
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          className={sizes[size].spark}
        >
          <path 
            d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" 
            fill="white"
            stroke="white"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {showText && (
        <span className={`font-bold ${sizes[size].text} text-white`}>
          Codia
        </span>
      )}
    </motion.button>
  );
};

export default CodiaLogo;
