import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolStatProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  variant?: "default" | "success" | "warning" | "danger";
}

const variants = {
  default: {
    bg: "bg-secondary/50",
    border: "border-border",
    icon: "text-primary",
    label: "text-muted-foreground",
  },
  success: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    icon: "text-emerald-500",
    label: "text-emerald-500/70",
  },
  warning: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    icon: "text-amber-500",
    label: "text-amber-500/70",
  },
  danger: {
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    icon: "text-red-500",
    label: "text-red-500/70",
  },
};

export const ToolStat = ({ icon: Icon, label, value, variant = "default" }: ToolStatProps) => {
  const styles = variants[variant];
  
  return (
    <div className={cn("p-4 rounded-xl border", styles.bg, styles.border)}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className={cn("w-4 h-4", styles.icon)} />
        <span className={cn("text-xs", styles.label)}>{label}</span>
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
    </div>
  );
};

export default ToolStat;