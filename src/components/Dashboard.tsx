import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Trophy, Plus, BarChart3, FileText, Eye } from "lucide-react";
import { useState } from "react";

interface DashboardProps {
  userRole: 'trainer' | 'student';
  onStartTest?: () => void;
  onViewScores?: () => void;
}

export const Dashboard = ({ userRole, onStartTest, onViewScores }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tests' | 'results'>('overview');

  if (userRole === 'trainer') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Trainer Dashboard</h2>
          <p className="text-muted-foreground">Manage concepts, create tests, and track student progress</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card hover:shadow-elegant transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Concepts</CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elegant transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85</div>
              <p className="text-xs text-muted-foreground">Active learners</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elegant transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tests Created</CardTitle>
              <FileText className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary" />
                Quick Actions
              </CardTitle>
              <CardDescription>Create and manage your content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="hero" className="w-full justify-start" size="lg">
                <Plus className="h-4 w-4" />
                Add New Concept
              </Button>
              <Button variant="secondary" className="w-full justify-start" size="lg">
                <FileText className="h-4 w-4" />
                Create Test
              </Button>
              <Button variant="default" className="w-full justify-start" size="lg" onClick={onViewScores}>
                <Eye className="h-4 w-4" />
                View Student Scores
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Recent Test Results</CardTitle>
              <CardDescription>Latest student performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "React Fundamentals", students: 15, avgScore: 78 },
                  { name: "JavaScript Advanced", students: 12, avgScore: 85 },
                  { name: "Data Structures", students: 18, avgScore: 72 }
                ].map((test, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">{test.name}</p>
                      <p className="text-sm text-muted-foreground">{test.students} students</p>
                    </div>
                    <Badge variant={test.avgScore >= 80 ? "default" : "secondary"}>
                      {test.avgScore}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Student Dashboard</h2>
        <p className="text-muted-foreground">Track your progress and take assessments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="shadow-card hover:shadow-elegant transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tests Completed</CardTitle>
            <Trophy className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Out of 12 available</p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-elegant transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-elegant transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Concepts Mastered</CardTitle>
            <BookOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">Out of 10 topics</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Available Tests</CardTitle>
            <CardDescription>Take assessments to improve your skills</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "HTML/CSS Fundamentals", difficulty: "Intermediate", duration: "40 min", completed: false },
                { name: "Responsive Design", difficulty: "Advanced", duration: "45 min", completed: true },
                { name: "CSS Grid & Flexbox", difficulty: "Intermediate", duration: "35 min", completed: false }
              ].map((test, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="font-medium">{test.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">{test.difficulty}</Badge>
                      <span className="text-xs text-muted-foreground">{test.duration}</span>
                    </div>
                  </div>
                  <Button 
                    variant={test.completed ? "secondary" : "default"} 
                    size="sm"
                    disabled={test.completed}
                    onClick={test.completed ? undefined : onStartTest}
                  >
                    {test.completed ? "Completed" : "Start Test"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Progress Overview</CardTitle>
            <CardDescription>Your learning journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { topic: "HTML Semantics", progress: 90, score: 88 },
                { topic: "CSS Styling", progress: 85, score: 82 },
                { topic: "Responsive Design", progress: 70, score: 76 },
                { topic: "CSS Grid Layout", progress: 40, score: 0 }
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.topic}</span>
                    <span className="text-muted-foreground">
                      {item.score > 0 ? `${item.score}%` : 'Not started'}
                    </span>
                  </div>
                  <Progress value={item.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};