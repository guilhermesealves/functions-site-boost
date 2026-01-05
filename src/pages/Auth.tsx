import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Chrome, Github, Mail, Lock, ArrowRight, Eye, EyeOff, User, ArrowUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const placeholderTexts = [
  "Peça para a Codia criar seu blog.",
  "Crie uma landing page incrível...",
  "Monte seu e-commerce do zero...",
  "Faça seu portfolio profissional...",
  "Construa o site da sua empresa...",
];

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
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

  // Typing effect
  useEffect(() => {
    const currentText = placeholderTexts[currentPlaceholderIndex];
    let charIndex = 0;
    let isDeleting = false;
    let timeout: NodeJS.Timeout;

    const type = () => {
      if (!isDeleting) {
        if (charIndex <= currentText.length) {
          setTypingText(currentText.slice(0, charIndex));
          charIndex++;
          timeout = setTimeout(type, 50 + Math.random() * 30);
        } else {
          timeout = setTimeout(() => {
            isDeleting = true;
            type();
          }, 2500);
        }
      } else {
        if (charIndex > 0) {
          charIndex--;
          setTypingText(currentText.slice(0, charIndex));
          timeout = setTimeout(type, 25);
        } else {
          isDeleting = false;
          setCurrentPlaceholderIndex((prev) => (prev + 1) % placeholderTexts.length);
        }
      }
    };

    type();

    return () => clearTimeout(timeout);
  }, [currentPlaceholderIndex]);

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
        toast.success("Conta criada! Você já pode usar a Codia.");
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
    <div className="min-h-screen flex">
      {/* Left side - Login Form */}
      <div className="w-full lg:w-[480px] bg-[#0a0a0a] flex flex-col justify-center p-8 lg:p-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm mx-auto"
        >
          {/* Logo */}
          <div className="flex items-center gap-2 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-semibold text-white mb-8">
            {isLogin ? "Login" : "Criar conta"}
          </h1>

          {/* Social Login */}
          <div className="space-y-3 mb-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleLogin}
              className="w-full justify-center gap-3 h-12 bg-[#1a1a1a] border-[#2a2a2a] text-white hover:bg-[#252525] hover:border-[#3a3a3a]"
            >
              <Chrome className="w-5 h-5" />
              Continuar com Google
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleGithubLogin}
              className="w-full justify-center gap-3 h-12 bg-[#1a1a1a] border-[#2a2a2a] text-white hover:bg-[#252525] hover:border-[#3a3a3a]"
            >
              <Github className="w-5 h-5" />
              Continuar com GitHub
            </Button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#2a2a2a]" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#0a0a0a] px-4 text-[#666]">OU</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm text-[#888]">Nome</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-[#555] focus:border-[#3a3a3a]"
                  required={!isLogin}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-[#888]">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-[#555] focus:border-[#3a3a3a]"
                required
              />
            </div>

            {isLogin && (
              <div className="relative">
                <Button
                  type="submit"
                  disabled={loading || !email.trim()}
                  className="w-full h-12 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold rounded-xl relative overflow-hidden"
                >
                  {loading ? "Carregando..." : "Continuar"}
                </Button>
                {email.trim() && (
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-[#0a0a0a]/50 text-[10px] text-white/60 rounded border border-white/10">
                    Usado por último
                  </span>
                )}
              </div>
            )}

            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm text-[#888]">Senha</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-[#555] focus:border-[#3a3a3a] pr-10"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555] hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold rounded-xl"
                >
                  {loading ? "Carregando..." : "Criar Conta"}
                </Button>
              </>
            )}
          </form>

          <p className="text-center text-sm text-[#666] mt-6">
            {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-white hover:underline font-medium"
            >
              {isLogin ? "Criar sua conta" : "Entrar"}
            </button>
          </p>
        </motion.div>
      </div>

      {/* Right side - Gradient with Chat */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#1a1040] to-[#2a0a2a]" />
        
        {/* Glow Effects */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-gradient-to-t from-pink-500/40 via-orange-500/20 to-transparent blur-[100px]"
        />
        <motion.div
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-0 right-1/4 w-[500px] h-[400px] rounded-full bg-gradient-to-t from-blue-500/30 to-transparent blur-[80px]"
        />

        {/* Chat Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative z-10 w-full max-w-lg px-8"
        >
          <div className="bg-white rounded-2xl p-4 shadow-2xl shadow-black/20 flex items-center gap-3">
            <div className="flex-1 min-h-[24px] flex items-center">
              <span className="text-[#333] text-base">
                {typingText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-0.5 h-5 bg-[#333] ml-0.5 align-middle"
                />
              </span>
            </div>
            <button className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1a1a2e] to-[#2a2040] flex items-center justify-center text-white shrink-0">
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
