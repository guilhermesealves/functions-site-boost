import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Chrome, Github, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";

const LoginCard = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Auth:", { email, password, isLogin });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-sm"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
          className="w-16 h-16 rounded-2xl bg-gradient-orange flex items-center justify-center mx-auto mb-5 shadow-xl shadow-primary/30"
        >
          <span className="text-primary-foreground font-display font-bold text-3xl">F</span>
        </motion.div>
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-display text-2xl font-bold text-foreground mb-2"
        >
          {isLogin ? "Bem-vindo de volta" : "Crie sua conta"}
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-muted-foreground"
        >
          {isLogin ? "Entre na sua conta Functions" : "Comece a criar sites incríveis"}
        </motion.p>
      </div>

      {/* Social Login */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-3 mb-6"
      >
        <Button 
          variant="outline" 
          className="w-full justify-center gap-3 h-12 bg-secondary/30 border-border/50 hover:bg-secondary hover:border-primary/30 transition-all"
        >
          <Chrome className="w-5 h-5" />
          Continuar com Google
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-center gap-3 h-12 bg-secondary/30 border-border/50 hover:bg-secondary hover:border-primary/30 transition-all"
        >
          <Github className="w-5 h-5" />
          Continuar com GitHub
        </Button>
      </motion.div>

      {/* Divider */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="relative mb-6"
      >
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/50" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-[hsl(0,0%,3%)] px-4 text-muted-foreground">ou continue com email</span>
        </div>
      </motion.div>

      {/* Form */}
      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        onSubmit={handleSubmit} 
        className="space-y-4"
      >
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm text-muted-foreground">Email</Label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-11 h-12 bg-secondary/30 border-border/50 focus:border-primary/50 focus:bg-secondary/50 transition-all"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm text-muted-foreground">Senha</Label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-11 pr-11 h-12 bg-secondary/30 border-border/50 focus:border-primary/50 focus:bg-secondary/50 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {isLogin && (
          <div className="text-right">
            <a href="#" className="text-sm text-primary hover:underline">
              Esqueceu a senha?
            </a>
          </div>
        )}

        <Button type="submit" variant="hero" className="w-full h-12 gap-2 text-base font-semibold shadow-lg shadow-primary/30">
          {isLogin ? "Entrar" : "Criar Conta"}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </motion.form>

      {/* Toggle */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="text-center text-sm text-muted-foreground mt-6"
      >
        {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-primary hover:underline font-medium"
        >
          {isLogin ? "Criar agora" : "Entrar"}
        </button>
      </motion.p>
    </motion.div>
  );
};

export default LoginCard;
