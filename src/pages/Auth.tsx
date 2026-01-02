import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Chrome, Github, Mail, Lock, ArrowRight, Eye, EyeOff, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/builder");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/builder");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Login realizado com sucesso!");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/builder`,
            data: { name },
          },
        });
        if (error) throw error;
        toast.success("Conta criada! Você já pode usar a Functions.");
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      if (error.message.includes("already registered")) {
        toast.error("Este email já está cadastrado. Tente fazer login.");
      } else if (error.message.includes("Invalid login")) {
        toast.error("Email ou senha incorretos.");
      } else {
        toast.error(error.message || "Erro ao autenticar");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/builder`,
      },
    });
    if (error) toast.error("Erro ao conectar com Google");
  };

  const handleGithubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/builder`,
      },
    });
    if (error) toast.error("Erro ao conectar com GitHub");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center p-12">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[150px]"
        />

        <div className="relative z-10 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-orange flex items-center justify-center shadow-xl shadow-primary/30">
              <span className="text-primary-foreground font-display font-bold text-3xl">F</span>
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold">Functions</h1>
              <p className="text-sm text-muted-foreground">IA para Sites</p>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl font-bold mb-4"
          >
            Crie sites incríveis{" "}
            <span className="text-gradient-orange">em minutos</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground mb-8"
          >
            Use inteligência artificial para transformar suas ideias em sites profissionais. 
            Sem código, sem complicação.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-3 gap-6"
          >
            {[
              { value: "10k+", label: "Usuários" },
              { value: "50k+", label: "Sites" },
              { value: "99%", label: "Satisfação" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-2xl font-bold text-gradient-orange">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="w-full lg:w-[480px] bg-[hsl(0,0%,3%)] flex flex-col items-center justify-center p-8 relative border-l border-border/30">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-sm"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-orange flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-2xl">F</span>
            </div>
            <span className="font-display font-bold text-xl">Functions</span>
          </div>

          <div className="text-center mb-8">
            <h3 className="font-display text-2xl font-bold text-foreground mb-2">
              {isLogin ? "Entre na sua conta" : "Crie sua conta grátis"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Acesse o construtor de sites" : "Comece a criar sites incríveis"}
            </p>
          </div>

          {/* Social Login */}
          <div className="space-y-3 mb-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleLogin}
              className="w-full justify-center gap-3 h-12 bg-secondary/30 border-border/50 hover:bg-secondary hover:border-primary/30"
            >
              <Chrome className="w-5 h-5" />
              Continuar com Google
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleGithubLogin}
              className="w-full justify-center gap-3 h-12 bg-secondary/30 border-border/50 hover:bg-secondary hover:border-primary/30"
            >
              <Github className="w-5 h-5" />
              Continuar com GitHub
            </Button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[hsl(0,0%,3%)] px-4 text-muted-foreground">ou continue com email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm text-muted-foreground">Nome</Label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-11 h-12 bg-secondary/30 border-border/50 focus:border-primary/50"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

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
                  className="pl-11 h-12 bg-secondary/30 border-border/50 focus:border-primary/50"
                  required
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
                  className="pl-11 pr-11 h-12 bg-secondary/30 border-border/50 focus:border-primary/50"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="hero"
              disabled={loading}
              className="w-full h-12 gap-2 text-base font-semibold shadow-lg shadow-primary/30"
            >
              {loading ? "Carregando..." : isLogin ? "Entrar" : "Criar Conta"}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </Button>
          </form>

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

          <p className="text-center text-xs text-muted-foreground mt-8">
            Ao continuar, você concorda com os{" "}
            <a href="#" className="text-primary hover:underline">Termos de Uso</a>
            {" "}e{" "}
            <a href="#" className="text-primary hover:underline">Política de Privacidade</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
