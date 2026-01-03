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
    md: { icon: "w-8 h-8", text: "text-lg" },
    lg: { icon: "w-10 h-10", text: "text-xl" },
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
      className="flex items-center gap-2 group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`${sizes[size].icon} rounded-lg overflow-hidden`}>
        <img 
          src={codiaLogoImage} 
          alt="Codia Logo" 
          className="w-full h-full object-cover"
        />
      </div>
      {showText && (
        <span className={`font-bold ${sizes[size].text} text-white tracking-tight`}>
          Codia
        </span>
      )}
    </motion.button>
  );
};

export default CodiaLogo;
