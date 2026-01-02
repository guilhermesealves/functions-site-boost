import { motion } from "framer-motion";
import { Sparkles, Zap, Globe, Code2 } from "lucide-react";
import ChatInput from "./ChatInput";
import LoginCard from "./LoginCard";
import FloatingElements from "./FloatingElements";

const HeroSection = () => {
  const handleChatSubmit = (message: string) => {
    console.log("Creating site:", message);
    // Handle AI chat submission
  };

  const features = [
    { icon: Zap, text: "Criação instantânea" },
    { icon: Globe, text: "100% em português" },
    { icon: Code2, text: "Código limpo" },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden pt-20">
      {/* Animated Background */}
      <FloatingElements />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background z-0" />

      <div className="container mx-auto px-6 relative z-10 py-12 lg:py-20">
        <div className="grid lg:grid-cols-[1fr,400px] gap-12 lg:gap-16 items-center min-h-[calc(100vh-160px)]">
          {/* Main Content - Chat Area */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 text-primary" />
              </motion.div>
              <span className="text-sm text-primary font-medium">IA Brasileira para criar sites</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
            >
              Diga o que precisa.{" "}
              <motion.span 
                className="text-gradient-orange inline-block"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              >
                A Functions cria.
              </motion.span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl"
            >
              Transforme suas ideias em sites profissionais usando apenas texto. 
              Sem código, sem complicação. Feito no Brasil, para brasileiros.
            </motion.p>

            {/* Chat Input */}
            <ChatInput onSubmit={handleChatSubmit} />

            {/* Quick Features */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap items-center gap-6 mt-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <feature.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-border/50"
            >
              {[
                { value: "10k+", label: "Usuários ativos" },
                { value: "50k+", label: "Sites criados" },
                { value: "99%", label: "Satisfação" },
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                  className="text-center lg:text-left"
                >
                  <motion.div 
                    className="font-display text-2xl sm:text-3xl font-bold text-gradient-orange"
                    whileHover={{ scale: 1.05 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Login Card - Right Side */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <LoginCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
