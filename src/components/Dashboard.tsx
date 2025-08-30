import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Trophy, Plus, BarChart3, FileText, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { useTestSession } from "@/hooks/useTestSession";

interface DashboardProps {
  userRole: 'trainer' | 'student';
  onStartTest?: (category: 'javascript' | 'functional-testing') => void;
  onViewScores?: () => void;
  onCreateTest?: () => void;
}

export const Dashboard = ({ userRole, onStartTest, onViewScores, onCreateTest }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tests' | 'results'>('overview');
  const [studentCount, setStudentCount] = useState(0);
  const [recentTests, setRecentTests] = useState<any[]>([]);
  
  const { getStudentScores } = useTestSession();

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (userRole === 'trainer') {
        const scores = await getStudentScores();
        setStudentCount(scores.length);
        
        // Get the 5 most recent individual test results
        const recent = scores
          .slice(0, 5)
          .map(score => ({
            studentName: score.user_name,
            score: Math.round(score.total_score),
            questions: `${score.correct_answers}/${score.total_questions}`,
            completedAt: new Date(score.completed_at).toLocaleDateString(),
            time: new Date(score.completed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }));
          
        setRecentTests(recent);
      }
    };

    fetchDashboardData();
  }, [userRole, getStudentScores]);

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
              <div className="text-2xl font-bold">{studentCount}</div>
              <p className="text-xs text-muted-foreground">Students tested</p>
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
              <Button variant="hero" className="w-full justify-start" size="lg" onClick={onCreateTest}>
                <Plus className="h-4 w-4" />
                Create New Test
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
                {recentTests.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">
                    No test results yet
                  </div>
                ) : (
                  recentTests.map((test, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{test.studentName}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{test.questions} correct</span>
                          <span>•</span>
                          <span>{test.completedAt}</span>
                          <span>{test.time}</span>
                        </div>
                      </div>
                      <Badge variant={test.score >= 80 ? "default" : "secondary"}>
                        {test.score}%
                      </Badge>
                    </div>
                  ))
                )}
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
                { name: "Functional Testing Concepts", difficulty: "Medium", duration: "35 min", completed: false, category: 'functional-testing' },
                { name: "Test Design & Strategy", difficulty: "Medium", duration: "30 min", completed: false, category: 'functional-testing' },
                { name: "API Functional Testing", difficulty: "Hard", duration: "40 min", completed: false, category: 'functional-testing' }
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
                    onClick={() => !test.completed && onStartTest?.('functional-testing')}
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
                { topic: "Test Case Design", progress: 90, score: 88 },
                { topic: "Boundary Value Analysis", progress: 85, score: 82 },
                { topic: "API Testing", progress: 70, score: 76 },
                { topic: "Exploratory Testing", progress: 40, score: 0 }
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