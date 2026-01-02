import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import codiaLogoImage from "@/assets/codia-logo.png";

interface CodiaLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  onClick?: () => void;
}

const CodiaLogo = ({ size = "md", showText = true, onClick }: CodiaLogoProps) => {
  const navigate = useNavigate();

  const sizes = {
    sm: { icon: "w-7 h-7", text: "text-base" },
    md: { icon: "w-9 h-9", text: "text-xl" },
    lg: { icon: "w-12 h-12", text: "text-2xl" },
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
      <div className={`${sizes[size].icon} rounded-xl overflow-hidden shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/30 transition-shadow`}>
        <img 
          src={codiaLogoImage} 
          alt="Codia Logo" 
          className="w-full h-full object-cover"
        />
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
