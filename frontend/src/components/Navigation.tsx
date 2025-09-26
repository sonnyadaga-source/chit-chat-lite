import { useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  AlertTriangle, 
  Settings, 
  BarChart3,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: Users, label: "Students", id: "students" },
  { icon: FileText, label: "Reports", id: "reports" },
  { icon: AlertTriangle, label: "Alerts", id: "alerts" },
  { icon: BarChart3, label: "Analytics", id: "analytics" },
  { icon: Calendar, label: "Attendance", id: "attendance" },
  { icon: Settings, label: "Settings", id: "settings" },
];

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  return (
    <nav className="flex h-14 items-center justify-center border-b bg-card">
      <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all",
                "hover:bg-background/50",
                activeTab === item.id
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;