import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface CodiaLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  onClick?: () => void;
}

const CodiaLogo = ({ size = "md", onClick }: CodiaLogoProps) => {
  const navigate = useNavigate();

  const sizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
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
      className="flex items-center gap-1 group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className={`font-bold ${sizes[size]} text-orange-500 tracking-tight`}>
        Codia
      </span>
      <span className={`${sizes[size]} text-orange-500`}>∞</span>
    </motion.button>
  );
};

export default CodiaLogo;
