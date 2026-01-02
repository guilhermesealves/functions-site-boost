import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Chrome, Github, Mail, Lock, ArrowRight } from "lucide-react";

const LoginCard = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle authentication logic here
    console.log("Auth:", { email, password, isLogin });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full max-w-sm"
    >
      <div className="bg-card/80 backdrop-blur-xl rounded-2xl border border-border p-6 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
            className="w-12 h-12 rounded-xl bg-gradient-orange flex items-center justify-center mx-auto mb-4"
          >
            <span className="text-primary-foreground font-display font-bold text-xl">F</span>
          </motion.div>
          <h3 className="font-display text-xl font-bold text-foreground">
            {isLogin ? "Bem-vindo de volta" : "Crie sua conta"}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {isLogin ? "Entre na sua conta Functions" : "Comece a criar sites incríveis"}
          </p>
        </div>

        {/* Social Login */}
        <div className="space-y-3 mb-6">
          <Button 
            variant="outline" 
            className="w-full justify-start gap-3 h-11 bg-secondary/50 border-border hover:bg-secondary"
          >
            <Chrome className="w-5 h-5" />
            Continuar com Google
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start gap-3 h-11 bg-secondary/50 border-border hover:bg-secondary"
          >
            <Github className="w-5 h-5" />
            Continuar com GitHub
          </Button>
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-card px-3 text-muted-foreground">ou continue com email</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm text-muted-foreground">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-11 bg-secondary/50 border-border"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm text-muted-foreground">Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 h-11 bg-secondary/50 border-border"
              />
            </div>
          </div>

          {isLogin && (
            <div className="text-right">
              <a href="#" className="text-sm text-primary hover:underline">
                Esqueceu a senha?
              </a>
            </div>
          )}

          <Button type="submit" variant="hero" className="w-full h-11 gap-2">
            {isLogin ? "Entrar" : "Criar Conta"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        {/* Toggle */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary hover:underline font-medium"
          >
            {isLogin ? "Criar agora" : "Entrar"}
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default LoginCard;
