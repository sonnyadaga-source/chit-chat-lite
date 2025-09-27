import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Download, Eye, Edit } from "lucide-react";

const StudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSection, setSelectedSection] = useState("all");

  // Mock student data
  const students = [
    {
      id: "S001",
      name: "John Doe",
      section: "LOVE",
      totalAbsences: 5,
      lastAbsence: "2024-09-25",
      status: "escalation",
      contact: "john.doe@email.com"
    },
    {
      id: "S002", 
      name: "Jane Smith",
      section: "HOPE",
      totalAbsences: 2,
      lastAbsence: "2024-09-20",
      status: "normal",
      contact: "jane.smith@email.com"
    },
    {
      id: "S003",
      name: "Mike Johnson", 
      section: "PEACE",
      totalAbsences: 4,
      lastAbsence: "2024-09-24",
      status: "warning",
      contact: "mike.johnson@email.com"
    },
    {
      id: "S004",
      name: "Sarah Wilson",
      section: "JOY", 
      totalAbsences: 1,
      lastAbsence: "2024-09-18",
      status: "normal",
      contact: "sarah.wilson@email.com"
    },
    {
      id: "S005",
      name: "David Brown",
      section: "LOVE",
      totalAbsences: 6,
      lastAbsence: "2024-09-26",
      status: "escalation",
      contact: "david.brown@email.com"
    }
  ];

  const sections = ["LOVE", "HOPE", "PEACE", "JOY", "FAITH", "GRACE"];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSection = selectedSection === "all" || student.section === selectedSection;
    return matchesSearch && matchesSection;
  });

  const getStatusBadge = (status: string, absences: number) => {
    if (absences >= 5) {
      return <Badge variant="destructive">Escalation</Badge>;
    } else if (absences >= 3) {
      return <Badge variant="secondary">Warning</Badge>;
    }
    return <Badge variant="outline">Normal</Badge>;
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Student Management</h2>
          <p className="text-muted-foreground">Monitor and manage student attendance records</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedSection} onValueChange={setSelectedSection}>
              <SelectTrigger>
                <SelectValue placeholder="Select section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sections</SelectItem>
                {sections.map((section) => (
                  <SelectItem key={section} value={section}>
                    Section {section}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Student Records</CardTitle>
          <CardDescription>
            Showing {filteredStudents.length} of {students.length} students
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Section</TableHead>
                  <TableHead>Total Absences</TableHead>
                  <TableHead>Last Absence</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{student.section}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className={
                        student.totalAbsences >= 5 ? "text-destructive font-medium" :
                        student.totalAbsences >= 3 ? "text-warning font-medium" :
                        "text-foreground"
                      }>
                        {student.totalAbsences}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {student.lastAbsence}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(student.status, student.totalAbsences)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">High Risk Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {students.filter(s => s.totalAbsences >= 5).length}
            </div>
            <p className="text-sm text-muted-foreground">Students with 5+ absences</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Warning Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {students.filter(s => s.totalAbsences >= 3 && s.totalAbsences < 5).length}
            </div>
            <p className="text-sm text-muted-foreground">Students with 3-4 absences</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Good Standing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {students.filter(s => s.totalAbsences < 3).length}
            </div>
            <p className="text-sm text-muted-foreground">Students with &lt;3 absences</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentManagement;