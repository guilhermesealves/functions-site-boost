import { cn } from "@/lib/utils";
import { LucideIcon, Lightbulb } from "lucide-react";

interface ToolTipProps {
  children: React.ReactNode;
  icon?: LucideIcon;
  variant?: "default" | "warning" | "info";
}

const variants = {
  default: {
    bg: "bg-primary/5",
    border: "border-primary/20",
    text: "text-foreground/80",
    icon: "text-primary",
  },
  warning: {
    bg: "bg-amber-500/5",
    border: "border-amber-500/20",
    text: "text-amber-200/80",
    icon: "text-amber-500",
  },
  info: {
    bg: "bg-blue-500/5",
    border: "border-blue-500/20",
    text: "text-blue-200/80",
    icon: "text-blue-500",
  },
};

export const ToolTip = ({ children, icon: Icon = Lightbulb, variant = "default" }: ToolTipProps) => {
  const styles = variants[variant];
  
  return (
    <div className={cn("p-4 rounded-xl border", styles.bg, styles.border)}>
      <div className="flex items-start gap-3">
        <Icon className={cn("w-4 h-4 shrink-0 mt-0.5", styles.icon)} />
        <p className={cn("text-xs leading-relaxed", styles.text)}>
          {children}
        </p>
      </div>
    </div>
  );
};

export default ToolTip;