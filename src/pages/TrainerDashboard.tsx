import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Trophy, Plus, BarChart3, FileText, Eye, MessageSquare, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { useTestSession } from "@/hooks/useTestSession";
import { TestResult } from "@/types/database";
import { useNavigate } from "react-router-dom";

export default function TrainerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'answers' | 'analytics'>('overview');
  const [studentCount, setStudentCount] = useState(0);
  const [recentTests, setRecentTests] = useState<any[]>([]);
  const [allAnswers, setAllAnswers] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { getStudentScores, getTestResults } = useTestSession();

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      const scores = await getStudentScores();
      setStudentCount(scores.length);
      
      const recent = scores
        .slice(0, 5)
        .map(score => ({
          studentName: score.user_name,
          score: Math.round(score.total_score),
          questions: `${score.correct_answers}/${score.total_questions}`,
          completedAt: new Date(score.completed_at).toLocaleDateString(),
          time: new Date(score.completed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sessionId: score.session_id
        }));
        
      setRecentTests(recent);

      const allDetailedAnswers: TestResult[] = [];
      for (const score of scores) {
        const sessionResults = await getTestResults(score.session_id);
        allDetailedAnswers.push(...sessionResults);
      }
      setAllAnswers(allDetailedAnswers);
      setLoading(false);
    };

    fetchDashboardData();
  }, [getStudentScores, getTestResults]);

  const totalTests = recentTests.length;
  const averageScore = recentTests.length > 0 
    ? Math.round(recentTests.reduce((sum, test) => sum + test.score, 0) / recentTests.length)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Trainer Dashboard</h1>
          <p className="text-muted-foreground">Manage tests, track student progress, and analyze performance</p>
          
          <div className="flex gap-4 mt-6">
            <Button 
              variant={activeTab === 'overview' ? 'default' : 'outline'}
              onClick={() => setActiveTab('overview')}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </Button>
            <Button 
              variant={activeTab === 'answers' ? 'default' : 'outline'}
              onClick={() => setActiveTab('answers')}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Student Answers
            </Button>
            <Button 
              variant={activeTab === 'analytics' ? 'default' : 'outline'}
              onClick={() => setActiveTab('analytics')}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Analytics
            </Button>
          </div>
        </div>

        {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="shadow-card hover:shadow-elegant transition-all duration-300 border-l-4 border-l-primary">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{studentCount}</div>
                  <p className="text-xs text-muted-foreground">Active learners</p>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elegant transition-all duration-300 border-l-4 border-l-secondary">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tests Completed</CardTitle>
                  <FileText className="h-4 w-4 text-secondary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalTests}</div>
                  <p className="text-xs text-muted-foreground">Total submissions</p>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elegant transition-all duration-300 border-l-4 border-l-accent">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                  <Trophy className="h-4 w-4 text-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{averageScore}%</div>
                  <p className="text-xs text-muted-foreground">Class performance</p>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elegant transition-all duration-300 border-l-4 border-l-primary">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Concepts</CardTitle>
                  <BookOpen className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">Topics covered</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Recent Test Submissions</CardTitle>
                  <CardDescription>Latest student test results</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <p className="text-muted-foreground">Loading...</p>
                  ) : recentTests.length > 0 ? (
                    <div className="space-y-4">
                      {recentTests.map((test, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium text-foreground">{test.studentName}</p>
                            <p className="text-sm text-muted-foreground">{test.completedAt} at {test.time}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="font-semibold text-foreground">{test.score}%</p>
                              <p className="text-xs text-muted-foreground">{test.questions}</p>
                            </div>
                            <Badge variant={test.score >= 70 ? "default" : "secondary"}>
                              {test.score >= 70 ? "Pass" : "Review"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No tests completed yet</p>
                  )}
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Manage your testing platform</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => navigate('/')}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Test
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => navigate('/')}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View All Scores
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => navigate('/')}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Export Results
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => navigate('/')}
                  >
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View Analytics
                  </Button>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {activeTab === 'answers' && (
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Student Answers</CardTitle>
              <CardDescription>Review all student responses and provide feedback</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-muted-foreground">Loading answers...</p>
              ) : allAnswers.length > 0 ? (
                <div className="space-y-4">
                  {allAnswers.map((answer, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{answer.question_text}</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline">{answer.topic}</Badge>
                            <Badge variant="secondary">{answer.difficulty}</Badge>
                          </div>
                        </div>
                        <Badge variant={answer.is_correct ? "default" : "destructive"}>
                          {answer.is_correct ? "Correct" : "Incorrect"}
                        </Badge>
                      </div>
                      <div className="text-sm space-y-1 mt-3">
                        <p className="text-muted-foreground">
                          <span className="font-medium">Student Answer:</span> {answer.selected_answer}
                        </p>
                        {!answer.is_correct && (
                          <p className="text-muted-foreground">
                            <span className="font-medium">Correct Answer:</span> {answer.correct_answer}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No answers available yet</p>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Track student progress over time</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Analytics charts coming soon...</p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Topic Mastery</CardTitle>
                <CardDescription>Identify strong and weak areas</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Topic analysis coming soon...</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
