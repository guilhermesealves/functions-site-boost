import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[400px] bg-primary/20 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Pronto para criar seu{" "}
            <span className="text-gradient-orange">site incrível</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            Junte-se a milhares de brasileiros que já transformaram suas ideias em realidade com a Functions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl">
              Criar Meu Site Agora
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="heroOutline" size="xl">
              Agendar Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
