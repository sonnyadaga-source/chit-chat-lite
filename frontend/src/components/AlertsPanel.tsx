import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Clock, CheckCircle, Bell, MessageSquare, Users } from "lucide-react";

const AlertsPanel = () => {
  const [alerts] = useState([
    {
      id: 1,
      type: "escalation",
      title: "High Absence Count",
      description: "David Brown (LOVE) has reached 6 absences",
      student: "David Brown",
      section: "LOVE",
      timestamp: "2024-09-26 09:15",
      status: "active",
      priority: "high"
    },
    {
      id: 2,
      type: "warning",
      title: "Approaching Threshold",
      description: "Mike Johnson (PEACE) has 4 absences",
      student: "Mike Johnson", 
      section: "PEACE",
      timestamp: "2024-09-25 14:30",
      status: "active",
      priority: "medium"
    },
    {
      id: 3,
      type: "compliance",
      title: "Missing Report",
      description: "Section GRACE has not submitted today's report",
      section: "GRACE",
      timestamp: "2024-09-26 16:00",
      status: "active",
      priority: "high"
    },
    {
      id: 4,
      type: "resolved",
      title: "Report Submitted",
      description: "Section HOPE submitted their weekly report",
      section: "HOPE",
      timestamp: "2024-09-25 11:45",
      status: "resolved",
      priority: "low"
    }
  ]);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "escalation":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case "warning":
        return <Clock className="h-4 w-4 text-warning" />;
      case "compliance":
        return <Users className="h-4 w-4 text-primary" />;
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-success" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge variant="secondary">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">Normal</Badge>;
    }
  };

  const activeAlerts = alerts.filter(alert => alert.status === "active");
  const resolvedAlerts = alerts.filter(alert => alert.status === "resolved");

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Alert Management</h2>
          <p className="text-muted-foreground">Monitor and respond to system alerts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            Send Telegram Update
          </Button>
        </div>
      </div>

      {/* Alert Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{activeAlerts.length}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {activeAlerts.filter(a => a.priority === "high").length}
            </div>
            <p className="text-xs text-muted-foreground">Urgent actions needed</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{resolvedAlerts.length}</div>
            <p className="text-xs text-muted-foreground">Successfully handled</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Bell className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3m</div>
            <p className="text-xs text-muted-foreground">Average response</p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Tabs */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Alert Details</CardTitle>
          <CardDescription>View and manage system alerts by status</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active" className="w-full">
            <TabsList>
              <TabsTrigger value="active">
                Active Alerts ({activeAlerts.length})
              </TabsTrigger>
              <TabsTrigger value="resolved">
                Resolved ({resolvedAlerts.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              {activeAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start justify-between p-4 rounded-lg border bg-card">
                  <div className="flex items-start gap-3">
                    {getAlertIcon(alert.type)}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{alert.title}</h4>
                        {getPriorityBadge(alert.priority)}
                      </div>
                      <p className="text-sm text-muted-foreground">{alert.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{alert.timestamp}</span>
                        {alert.section && <span>Section: {alert.section}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="default" size="sm">
                      Resolve
                    </Button>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="resolved" className="space-y-4">
              {resolvedAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start justify-between p-4 rounded-lg border bg-muted/30">
                  <div className="flex items-start gap-3">
                    {getAlertIcon(alert.type)}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-muted-foreground">{alert.title}</h4>
                        <Badge variant="outline">Resolved</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{alert.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{alert.timestamp}</span>
                        {alert.section && <span>Section: {alert.section}</span>}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    View History
                  </Button>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlertsPanel;