import { motion } from "framer-motion";

const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main glow orb */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/30 blur-[120px]"
      />

      {/* Secondary glow */}
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-orange-600/20 blur-[100px]"
      />

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(24, 100%, 50%) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(24, 100%, 50%) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            opacity: 0,
          }}
          animate={{
            y: [
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
            ],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
          className="absolute w-1 h-1 bg-primary rounded-full"
        />
      ))}

      {/* Gradient lines */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 0.1, x: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-20 left-0 w-px h-40 bg-gradient-to-b from-transparent via-primary to-transparent"
      />
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.1, x: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-40 right-0 w-px h-60 bg-gradient-to-b from-transparent via-primary to-transparent"
      />
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 0.1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="absolute top-0 left-1/4 h-px w-40 bg-gradient-to-r from-transparent via-primary to-transparent"
      />
    </div>
  );
};

export default FloatingElements;
