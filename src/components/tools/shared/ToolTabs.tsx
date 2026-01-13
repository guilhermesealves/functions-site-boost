import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LucideIcon } from "lucide-react";

interface Tab {
  value: string;
  label: string;
  icon?: LucideIcon;
}

interface ToolTabsProps {
  tabs: Tab[];
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

export const ToolTabs = ({ tabs, value, onValueChange, children }: ToolTabsProps) => {
  return (
    <Tabs value={value} onValueChange={onValueChange} className="w-full">
      <TabsList className="w-full grid bg-secondary/30 border border-border p-1 rounded-lg" style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}>
        {tabs.map((tab) => (
          <TabsTrigger 
            key={tab.value} 
            value={tab.value} 
            className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md gap-1.5 transition-all"
          >
            {tab.icon && <tab.icon className="w-3 h-3" />}
            <span className="hidden sm:inline">{tab.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  );
};

export default ToolTabs;