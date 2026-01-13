import { cn } from "@/lib/utils";

interface ToolCardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
  hover?: boolean;
  onClick?: () => void;
}

export const ToolCard = ({ children, className, gradient = false, hover = false, onClick }: ToolCardProps) => {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "p-4 rounded-xl border transition-all",
        gradient 
          ? "bg-gradient-to-br from-primary/5 to-transparent border-primary/20" 
          : "bg-card/50 border-border",
        hover && "hover:border-primary/30 hover:bg-card/80 cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
};

export default ToolCard;