import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { label: "Recursos", href: "#recursos" },
    { label: "Como Funciona", href: "#como-funciona" },
    { label: "Preços", href: "#precos" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Glass background */}
      <div className="absolute inset-0 bg-[hsl(0,0%,4%)]/80 backdrop-blur-2xl border-b border-border/20" />
      
      <div className="container mx-auto px-6 py-4 relative">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a 
            href="/" 
            className="flex items-center group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-bold text-xl text-primary">Codia</span>
            <span className="font-bold text-xl text-primary ml-1">∞</span>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-secondary/30 rounded-full px-2 py-1.5 border border-border/30">
            {navLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-secondary/70"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hover:text-foreground"
              onClick={() => navigate("/auth")}
            >
              Entrar
            </Button>
            <Button 
              variant="hero" 
              size="sm" 
              className="shadow-lg shadow-primary/30"
              onClick={() => navigate("/auth")}
            >
              Começar Grátis
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-secondary/50 text-foreground border border-border/30"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ 
          height: isMenuOpen ? "auto" : 0,
          opacity: isMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-[hsl(0,0%,4%)]/95 backdrop-blur-xl border-b border-border/20"
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: isMenuOpen ? 0 : -20, opacity: isMenuOpen ? 1 : 0 }}
              transition={{ delay: index * 0.1 }}
              className="px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-xl transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </motion.a>
          ))}
          <div className="flex gap-2 pt-4 mt-2 border-t border-border/30">
            <Button 
              variant="ghost" 
              className="flex-1"
              onClick={() => navigate("/auth")}
            >
              Entrar
            </Button>
            <Button 
              variant="hero" 
              className="flex-1"
              onClick={() => navigate("/auth")}
            >
              Começar Grátis
            </Button>
          </div>
        </nav>
      </motion.div>
    </motion.header>
  );
};

export default Header;
