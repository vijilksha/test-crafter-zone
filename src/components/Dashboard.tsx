import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Trophy, Plus, BarChart3, FileText, Eye, MessageSquare, Download, TrendingUp, Target } from "lucide-react";
import { useState, useEffect } from "react";
import { useTestSession } from "@/hooks/useTestSession";
import { TestResult } from "@/types/database";
import * as XLSX from 'xlsx';

interface StudentTopicPerformance {
  studentId: string;
  studentName: string;
  cohortCode: string;
  topic: string;
  correct: number;
  total: number;
  score: number;
  feedback: string;
}

interface DashboardProps {
  userRole: 'trainer' | 'student';
  onStartTest?: (category: 'javascript' | 'mock-interim') => void;
  onViewScores?: () => void;
  onCreateTest?: () => void;
}

export const Dashboard = ({ userRole, onStartTest, onViewScores, onCreateTest }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'answers' | 'analytics' | 'topics'>('overview');
  const [studentCount, setStudentCount] = useState(0);
  const [recentTests, setRecentTests] = useState<any[]>([]);
  const [allAnswers, setAllAnswers] = useState<TestResult[]>([]);
  const [topicPerformance, setTopicPerformance] = useState<any[]>([]);
  const [difficultyPerformance, setDifficultyPerformance] = useState<any[]>([]);
  const [studentTopicPerformance, setStudentTopicPerformance] = useState<StudentTopicPerformance[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { getStudentScores, getTestResults } = useTestSession();

  const generateFeedback = (score: number, topic: string, correct: number, total: number): string => {
    const percentage = (correct / total) * 100;
    
    if (percentage >= 90) {
      return `Excellent mastery of ${topic}! Keep up the outstanding work.`;
    } else if (percentage >= 80) {
      return `Strong understanding of ${topic}. Minor improvements needed in edge cases.`;
    } else if (percentage >= 70) {
      return `Good grasp of ${topic} fundamentals. Focus on advanced concepts to improve.`;
    } else if (percentage >= 60) {
      return `Basic understanding of ${topic}. Need significant practice on core concepts.`;
    } else {
      return `${topic} requires immediate attention. Schedule 1-on-1 review session.`;
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (userRole === 'trainer') {
        setLoading(true);
        console.log('Dashboard: Fetching data...');
        const scores = await getStudentScores();
        console.log('Dashboard: Scores fetched:', scores.length);
        setStudentCount(scores.length);
        
        // Get the 5 most recent individual test results
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

        // Fetch all detailed answers from all sessions
        const allDetailedAnswers: TestResult[] = [];
        for (const score of scores) {
          const sessionResults = await getTestResults(score.session_id);
          allDetailedAnswers.push(...sessionResults);
        }
        setAllAnswers(allDetailedAnswers);
        
        // Calculate topic performance
        const topicStats: any = {};
        allDetailedAnswers.forEach(answer => {
          if (!topicStats[answer.topic]) {
            topicStats[answer.topic] = { correct: 0, total: 0 };
          }
          topicStats[answer.topic].total++;
          if (answer.is_correct) topicStats[answer.topic].correct++;
        });
        
        const topicPerf = Object.entries(topicStats).map(([topic, stats]: [string, any]) => ({
          topic,
          score: Math.round((stats.correct / stats.total) * 100),
          correct: stats.correct,
          total: stats.total
        }));
        setTopicPerformance(topicPerf);
        
        // Calculate difficulty performance
        const difficultyStats: any = {};
        allDetailedAnswers.forEach(answer => {
          if (!difficultyStats[answer.difficulty]) {
            difficultyStats[answer.difficulty] = { correct: 0, total: 0 };
          }
          difficultyStats[answer.difficulty].total++;
          if (answer.is_correct) difficultyStats[answer.difficulty].correct++;
        });
        
        const diffPerf = Object.entries(difficultyStats).map(([difficulty, stats]: [string, any]) => ({
          difficulty,
          score: Math.round((stats.correct / stats.total) * 100),
          correct: stats.correct,
          total: stats.total
        }));
        setDifficultyPerformance(diffPerf);
        
        // Calculate individual student performance per topic
        const studentTopicPerf: StudentTopicPerformance[] = [];
        const studentTopicMap = new Map<string, Map<string, { correct: number; total: number; sessionId: string }>>();
        
        // Group answers by student and topic
        for (const score of scores) {
          const sessionResults = await getTestResults(score.session_id);
          
          for (const result of sessionResults) {
            const studentKey = `${score.student_id || 'unknown'}_${score.user_name}`;
            
            if (!studentTopicMap.has(studentKey)) {
              studentTopicMap.set(studentKey, new Map());
            }
            
            const topicMap = studentTopicMap.get(studentKey)!;
            if (!topicMap.has(result.topic)) {
              topicMap.set(result.topic, { correct: 0, total: 0, sessionId: score.session_id });
            }
            
            const topicStats = topicMap.get(result.topic)!;
            topicStats.total++;
            if (result.is_correct) topicStats.correct++;
          }
        }
        
        // Generate student topic performance with feedback
        studentTopicMap.forEach((topicMap, studentKey) => {
          const [studentId, studentName] = studentKey.split('_');
          const cohortCode = scores.find(s => s.student_id === studentId)?.cohort_code || 'N/A';
          
          topicMap.forEach((stats, topic) => {
            const score = Math.round((stats.correct / stats.total) * 100);
            const feedback = generateFeedback(score, topic, stats.correct, stats.total);
            
            studentTopicPerf.push({
              studentId,
              studentName,
              cohortCode,
              topic,
              correct: stats.correct,
              total: stats.total,
              score,
              feedback
            });
          });
        });
        
        setStudentTopicPerformance(studentTopicPerf);
        console.log('Dashboard: Data loaded successfully');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);
  
  const exportPerformanceData = () => {
    // Export detailed student topic performance
    const excelData = studentTopicPerformance.map(perf => ({
      'Student ID': perf.studentId,
      'Student Name': perf.studentName,
      'Cohort Code': perf.cohortCode,
      'Topic': perf.topic,
      'Correct Answers': perf.correct,
      'Total Questions': perf.total,
      'Score (%)': perf.score,
      'Feedback': perf.feedback
    }));
    
    // Also create summary sheet
    const summaryData = recentTests.map(test => ({
      'Student Name': test.studentName,
      'Overall Score': `${test.score}%`,
      'Questions Correct': test.questions,
      'Completion Date': test.completedAt,
      'Time': test.time
    }));
    
    const workbook = XLSX.utils.book_new();
    const topicSheet = XLSX.utils.json_to_sheet(excelData);
    const summarySheet = XLSX.utils.json_to_sheet(summaryData);
    
    XLSX.utils.book_append_sheet(workbook, topicSheet, 'Topic Performance');
    XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');
    XLSX.writeFile(workbook, `student-performance-${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  if (userRole === 'trainer') {
    const averageScore = recentTests.length > 0 
      ? Math.round(recentTests.reduce((sum, test) => sum + test.score, 0) / recentTests.length)
      : 0;
      
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Trainer Dashboard</h2>
              <p className="text-muted-foreground">Monitor student performance and manage assessments</p>
            </div>
            <Button variant="outline" onClick={exportPerformanceData}>
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
          
          {userRole === 'trainer' && (
            <div className="flex gap-4 mt-6">
              <Button 
                variant={activeTab === 'overview' ? 'default' : 'outline'}
                onClick={() => setActiveTab('overview')}
                className="bg-gradient-hero"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Overview
              </Button>
              <Button 
                variant={activeTab === 'topics' ? 'default' : 'outline'}
                onClick={() => setActiveTab('topics')}
              >
                <Target className="h-4 w-4 mr-2" />
                Topic Performance
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
          )}
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
                  <p className="text-xs text-muted-foreground">Students tested</p>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elegant transition-all duration-300 border-l-4 border-l-secondary">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tests Completed</CardTitle>
                  <FileText className="h-4 w-4 text-secondary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{recentTests.length}</div>
                  <p className="text-xs text-muted-foreground">Total submissions</p>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elegant transition-all duration-300 border-l-4 border-l-accent">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Class Average</CardTitle>
                  <Trophy className="h-4 w-4 text-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{averageScore}%</div>
                  <Progress value={averageScore} className="mt-2 h-2" />
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elegant transition-all duration-300 border-l-4 border-l-success">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
                  <Target className="h-4 w-4 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {recentTests.length > 0 
                      ? Math.round((recentTests.filter(t => t.score >= 70).length / recentTests.length) * 100)
                      : 0}%
                  </div>
                  <p className="text-xs text-muted-foreground">Students passing (≥70%)</p>
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
                  {userRole === 'trainer' && (
                    <>
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
                    </>
                  )}
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Recent Test Results</CardTitle>
                  <CardDescription>Latest student performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {loading ? (
                      <div className="text-center py-4 text-muted-foreground">Loading...</div>
                    ) : recentTests.length === 0 ? (
                      <div className="text-center py-4 text-muted-foreground">
                        No test results yet
                      </div>
                    ) : (
                      recentTests.map((test, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex-1">
                            <p className="font-medium">{test.studentName}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{test.questions} correct</span>
                              <span>•</span>
                              <span>{test.completedAt}</span>
                              <span>{test.time}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <div className="text-lg font-bold">{test.score}%</div>
                              <Progress value={test.score} className="w-16 h-1 mt-1" />
                            </div>
                            <Badge variant={test.score >= 80 ? "default" : test.score >= 70 ? "secondary" : "destructive"}>
                              {test.score >= 80 ? "Excellent" : test.score >= 70 ? "Good" : "Needs Work"}
                            </Badge>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {userRole === 'trainer' && activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Performance by Topic
                  </CardTitle>
                  <CardDescription>Student mastery across different topics</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <p className="text-muted-foreground">Loading analytics...</p>
                  ) : topicPerformance.length === 0 ? (
                    <p className="text-muted-foreground">No data available yet</p>
                  ) : (
                    <div className="space-y-4">
                      {topicPerformance.map((topic, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">{topic.topic}</span>
                            <span className="text-muted-foreground">
                              {topic.correct}/{topic.total} ({topic.score}%)
                            </span>
                          </div>
                          <Progress value={topic.score} className="h-2" />
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-accent" />
                    Performance by Difficulty
                  </CardTitle>
                  <CardDescription>How students handle different difficulty levels</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <p className="text-muted-foreground">Loading analytics...</p>
                  ) : difficultyPerformance.length === 0 ? (
                    <p className="text-muted-foreground">No data available yet</p>
                  ) : (
                    <div className="space-y-4">
                      {difficultyPerformance.map((diff, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">{diff.difficulty}</span>
                            <span className="text-muted-foreground">
                              {diff.correct}/{diff.total} ({diff.score}%)
                            </span>
                          </div>
                          <Progress value={diff.score} className="h-2" />
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Student Performance Ranking</CardTitle>
                <CardDescription>Top performers in recent assessments</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p className="text-muted-foreground">Loading rankings...</p>
                ) : recentTests.length === 0 ? (
                  <p className="text-muted-foreground">No rankings available yet</p>
                ) : (
                  <div className="space-y-3">
                    {recentTests
                      .sort((a, b) => b.score - a.score)
                      .slice(0, 10)
                      .map((test, i) => (
                        <div key={i} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                            {i + 1}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{test.studentName}</p>
                            <p className="text-xs text-muted-foreground">{test.completedAt}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg">{test.score}%</div>
                            <p className="text-xs text-muted-foreground">{test.questions}</p>
                          </div>
                          <Badge variant={i < 3 ? "default" : "secondary"}>
                            {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}
                          </Badge>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {userRole === 'trainer' && activeTab === 'topics' && (
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      Batch Performance by Topic
                    </CardTitle>
                    <CardDescription>
                      Overall batch performance across different topics
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p className="text-muted-foreground">Loading topic performance...</p>
                ) : topicPerformance.length === 0 ? (
                  <p className="text-muted-foreground">No data available yet</p>
                ) : (
                  <div className="space-y-4">
                    {topicPerformance.map((topic, i) => (
                      <div key={i} className="p-4 bg-muted/30 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-lg">{topic.topic}</span>
                          <Badge variant={topic.score >= 80 ? "default" : topic.score >= 60 ? "secondary" : "destructive"}>
                            {topic.score}% Average
                          </Badge>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground mb-2">
                          <span>{topic.correct} correct out of {topic.total} attempts</span>
                          <span>{topic.total} students attempted</span>
                        </div>
                        <Progress value={topic.score} className="h-2" />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-accent" />
                      Individual Student Performance by Topic
                    </CardTitle>
                    <CardDescription>
                      Detailed breakdown with personalized feedback for each student
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={exportPerformanceData}>
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p className="text-muted-foreground">Loading student performance...</p>
                ) : studentTopicPerformance.length === 0 ? (
                  <p className="text-muted-foreground">No student data available yet</p>
                ) : (
                  <div className="space-y-6">
                    {/* Group by student */}
                    {Array.from(new Set(studentTopicPerformance.map(p => p.studentId))).map(studentId => {
                      const studentPerf = studentTopicPerformance.filter(p => p.studentId === studentId);
                      const student = studentPerf[0];
                      const avgScore = Math.round(studentPerf.reduce((sum, p) => sum + p.score, 0) / studentPerf.length);
                      
                      return (
                        <div key={studentId} className="border border-border rounded-lg p-5 space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">{student.studentName}</h3>
                              <div className="flex gap-2 mt-1">
                                <Badge variant="outline">ID: {student.studentId}</Badge>
                                <Badge variant="outline">Cohort: {student.cohortCode}</Badge>
                                <Badge variant={avgScore >= 80 ? "default" : avgScore >= 60 ? "secondary" : "destructive"}>
                                  Avg: {avgScore}%
                                </Badge>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            {studentPerf.map((perf, i) => (
                              <div key={i} className="bg-muted/20 rounded-md p-4">
                                <div className="flex justify-between items-start mb-2">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="font-medium">{perf.topic}</span>
                                      <Badge variant={perf.score >= 80 ? "default" : perf.score >= 60 ? "secondary" : "destructive"} className="text-xs">
                                        {perf.score}%
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                      {perf.correct} / {perf.total} correct
                                    </p>
                                  </div>
                                </div>
                                <Progress value={perf.score} className="h-2 mb-3" />
                                <div className="bg-background/50 rounded p-3">
                                  <p className="text-sm font-medium mb-1">Feedback:</p>
                                  <p className="text-sm text-muted-foreground">{perf.feedback}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {userRole === 'trainer' && activeTab === 'answers' && (
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  All Student Answers
                </CardTitle>
                <CardDescription>
                  Detailed answers from mock interim assessments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {allAnswers.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No answers yet. Students need to complete assessments first.
                    </div>
                  ) : (
                    allAnswers.map((answer, i) => (
                      <div key={i} className="border border-border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline">{answer.topic}</Badge>
                              <Badge variant={answer.difficulty === 'Easy' ? 'secondary' : answer.difficulty === 'Medium' ? 'default' : 'destructive'}>
                                {answer.difficulty}
                              </Badge>
                            </div>
                            <h4 className="font-medium text-foreground mb-2">
                              Question {answer.question_id}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-3">
                              {answer.question_text}
                            </p>
                          </div>
                          <div className="text-right text-sm text-muted-foreground">
                            {new Date(answer.answered_at).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <div className="bg-muted rounded-md p-3 space-y-3">
                          <div>
                            <h5 className="font-medium text-sm text-muted-foreground mb-2">Student Answer:</h5>
                            <p className="text-sm text-foreground whitespace-pre-wrap">
                              {answer.selected_answer || answer.user_answer}
                            </p>
                          </div>
                          
                          {answer.ai_feedback && (() => {
                            try {
                              const feedback = JSON.parse(answer.ai_feedback);
                              return (
                                <div className="space-y-2 pt-2 border-t border-border">
                                  <div className="flex items-center gap-2">
                                    <Badge variant={feedback.score >= 70 ? "default" : "secondary"}>
                                      AI Score: {feedback.score}/100
                                    </Badge>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">AI Feedback:</p>
                                    <p className="text-sm text-muted-foreground">{feedback.feedback}</p>
                                  </div>
                                  {feedback.strengths?.length > 0 && (
                                    <div>
                                      <p className="text-sm font-medium text-green-600">Strengths:</p>
                                      <ul className="text-sm text-muted-foreground list-disc list-inside">
                                        {feedback.strengths.map((strength: string, i: number) => (
                                          <li key={i}>{strength}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                  {feedback.improvements?.length > 0 && (
                                    <div>
                                      <p className="text-sm font-medium text-orange-600">Areas for Improvement:</p>
                                      <ul className="text-sm text-muted-foreground list-disc list-inside">
                                        {feedback.improvements.map((improvement: string, i: number) => (
                                          <li key={i}>{improvement}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              );
                            } catch {
                              return null;
                            }
                          })()}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
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
            <CardTitle>Mixed Assessment</CardTitle>
            <CardDescription>Take comprehensive assessment with JavaScript, TypeScript, and interview questions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="mb-4">
                <Badge variant="outline" className="mb-2">Mixed Question Types</Badge>
                <h3 className="text-lg font-medium mb-2">Comprehensive Assessment</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  5 mixed questions covering JavaScript, TypeScript, and interview scenarios
                </p>
              </div>
              <Button 
                variant="default" 
                size="lg"
                onClick={() => onStartTest?.('mock-interim')}
                className="w-full max-w-xs"
              >
                Start Assessment
              </Button>
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