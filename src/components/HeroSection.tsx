import { motion } from "framer-motion";
import { Sparkles, Zap, Globe, Code2 } from "lucide-react";
import ChatInput from "./ChatInput";

const HeroSection = () => {
  const features = [
    { icon: Zap, text: "Criação instantânea" },
    { icon: Globe, text: "100% em português" },
    { icon: Code2, text: "Código limpo" },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Full width content */}
      <div className="relative flex flex-col min-h-screen">
        {/* Orange gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/15" />
        
        {/* Animated glow orbs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-primary/30 blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.12, 0.05],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-orange-500/20 blur-[120px]"
        />

        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(24, 100%, 50%) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(24, 100%, 50%) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />

        {/* Content - Centered */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 lg:px-16 xl:px-24 pt-24 pb-12">
          <div className="w-full max-w-2xl text-center">
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
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Diga o que precisa.{" "}
              <br />
              <span className="text-gradient-orange">A Codia cria.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-muted-foreground mb-10"
            >
              Transforme suas ideias em sites profissionais usando apenas texto. 
              Sem código, sem complicação.
            </motion.p>

            {/* Chat Input */}
            <ChatInput />

            {/* Quick Features */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-6 mt-10"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-border/30 max-w-md mx-auto"
            >
              {[
                { value: "10k+", label: "Usuários" },
                { value: "50k+", label: "Sites" },
                { value: "99%", label: "Satisfação" },
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                  className="text-center"
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
        </div>
      </div>
    </section>
  );
};

export default HeroSection;