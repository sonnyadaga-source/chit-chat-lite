import { useState } from "react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import StudentManagement from "@/components/StudentManagement";
import AlertsPanel from "@/components/AlertsPanel";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "students":
        return <StudentManagement />;
      case "alerts":
        return <AlertsPanel />;
      case "reports":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Reports & Analytics</h2>
            <p className="text-muted-foreground">Detailed reporting interface coming soon...</p>
          </div>
        );
      case "analytics":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Advanced Analytics</h2>
            <p className="text-muted-foreground">Data visualization and trends analysis coming soon...</p>
          </div>
        );
      case "attendance":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Attendance Management</h2>
            <p className="text-muted-foreground">Real-time attendance tracking interface coming soon...</p>
          </div>
        );
      case "settings":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">System Settings</h2>
            <p className="text-muted-foreground">Configuration options coming soon...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="container mx-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
