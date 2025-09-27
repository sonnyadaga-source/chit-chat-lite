import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  UserX, 
  AlertCircle, 
  CheckCircle, 
  TrendingUp,
  Calendar,
  Clock,
  Target
} from "lucide-react";

const Dashboard = () => {
  // Mock data for demonstration
  const stats = {
    totalStudents: 800,
    presentToday: 742,
    absentToday: 58,
    thresholdAlerts: 12,
    sectionsReported: 14,
    totalSections: 16,
    complianceRate: 87.5
  };

  const recentAlerts = [
    { student: "John Doe", section: "LOVE", absences: 5, type: "escalation" },
    { student: "Jane Smith", section: "HOPE", absences: 4, type: "warning" },
    { student: "Mike Johnson", section: "PEACE", absences: 3, type: "early" },
  ];

  const sectionStatus = [
    { name: "LOVE", reported: true, absences: 8, students: 50 },
    { name: "HOPE", reported: true, absences: 5, students: 48 },
    { name: "PEACE", reported: false, absences: 0, students: 52 },
    { name: "JOY", reported: true, absences: 12, students: 49 },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">Across 16 sections</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.presentToday}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.presentToday / stats.totalStudents) * 100).toFixed(1)}% attendance
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absent Today</CardTitle>
            <UserX className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{stats.absentToday}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.absentToday / stats.totalStudents) * 100).toFixed(1)}% of students
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Threshold Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.thresholdAlerts}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section Compliance */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Section Compliance
            </CardTitle>
            <CardDescription>
              Daily reporting status by section
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Sections Reported</span>
                <span className="text-sm text-muted-foreground">
                  {stats.sectionsReported}/{stats.totalSections}
                </span>
              </div>
              <Progress 
                value={(stats.sectionsReported / stats.totalSections) * 100} 
                className="h-2"
              />
              <div className="space-y-2">
                {sectionStatus.map((section) => (
                  <div key={section.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={section.reported ? "default" : "destructive"}
                        className="w-16 justify-center"
                      >
                        {section.name}
                      </Badge>
                      <span className="text-sm">
                        {section.absences} absent / {section.students} students
                      </span>
                    </div>
                    {section.reported ? (
                      <CheckCircle className="h-4 w-4 text-success" />
                    ) : (
                      <Clock className="h-4 w-4 text-warning" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Recent Alerts
            </CardTitle>
            <CardDescription>
              Students requiring attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">{alert.student}</p>
                    <p className="text-sm text-muted-foreground">Section {alert.section}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{alert.absences} absences</p>
                    <Badge 
                      variant={
                        alert.type === "escalation" ? "destructive" : 
                        alert.type === "warning" ? "secondary" : "outline"
                      }
                      className="text-xs"
                    >
                      {alert.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Trends */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Weekly Attendance Trends
          </CardTitle>
          <CardDescription>
            Attendance patterns over the last 7 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 text-center">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => {
              const attendance = [95, 92, 89, 94, 91, 0, 0][index]; // Mock data
              return (
                <div key={day} className="space-y-2">
                  <div className="text-xs font-medium text-muted-foreground">{day}</div>
                  <div className="h-20 flex items-end justify-center">
                    {attendance > 0 && (
                      <div 
                        className="w-8 bg-gradient-primary rounded-t-sm flex items-end justify-center pb-1"
                        style={{ height: `${attendance}%` }}
                      >
                        <span className="text-xs text-primary-foreground font-medium">
                          {attendance}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;