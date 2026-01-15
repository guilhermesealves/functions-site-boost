import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 relative overflow-hidden bg-background">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[400px] rounded-full blur-[150px]" style={{ background: 'radial-gradient(circle, rgba(19, 82, 21, 0.2) 0%, transparent 70%)' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Pronto para criar seu{" "}
            <span className="text-gradient-green">site incrível</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            Junte-se a milhares de brasileiros que já transformaram suas ideias em realidade com a Codia.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg"
              onClick={() => navigate("/auth")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-14 text-lg font-semibold glow-green gap-2"
            >
              Criar Meu Site Agora
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary/30 text-foreground hover:bg-primary/5 px-8 h-14 text-lg"
            >
              Agendar Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
