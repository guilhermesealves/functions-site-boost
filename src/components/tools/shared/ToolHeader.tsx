import { LucideIcon } from "lucide-react";

interface ToolHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
  stat?: {
    value: string | number;
    label: string;
  };
}

export const ToolHeader = ({ icon: Icon, title, description, stat }: ToolHeaderProps) => {
  return (
    <div className="flex items-center gap-4 pb-4 border-b border-border">
      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1">
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      {stat && (
        <div className="text-right">
          <p className="text-xl font-bold text-primary">{stat.value}</p>
          <p className="text-[10px] text-muted-foreground">{stat.label}</p>
        </div>
      )}
    </div>
  );
};

export default ToolHeader;