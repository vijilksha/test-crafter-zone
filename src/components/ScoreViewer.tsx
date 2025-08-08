import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Trophy, BarChart3, FileText, ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

interface TestResult {
  questionId: number;
  correct: boolean;
  topic: string;
  difficulty: 'intermediate' | 'advanced';
  testResults?: any[];
}

interface Student {
  id: string;
  name: string;
  email: string;
  results: TestResult[];
  completedAt: string;
  totalScore: number;
}

interface ScoreViewerProps {
  onBack: () => void;
}

// Mock data - in real app this would come from Supabase
const mockStudentResults: Student[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    results: [
      { questionId: 1, correct: true, topic: "CSS Responsive Design", difficulty: "intermediate" },
      { questionId: 2, correct: false, topic: "CSS Grid Layout", difficulty: "advanced" },
      { questionId: 3, correct: true, topic: "CSS Flexbox", difficulty: "intermediate" },
      { questionId: 101, correct: true, topic: "DOM Manipulation", difficulty: "intermediate" },
      { questionId: 102, correct: false, topic: "ES6 Features", difficulty: "advanced" }
    ],
    completedAt: "2024-01-15T10:30:00Z",
    totalScore: 60
  },
  {
    id: "2", 
    name: "Bob Smith",
    email: "bob@example.com",
    results: [
      { questionId: 1, correct: true, topic: "CSS Responsive Design", difficulty: "intermediate" },
      { questionId: 2, correct: true, topic: "CSS Grid Layout", difficulty: "advanced" },
      { questionId: 3, correct: true, topic: "CSS Flexbox", difficulty: "intermediate" },
      { questionId: 101, correct: false, topic: "DOM Manipulation", difficulty: "intermediate" },
      { questionId: 102, correct: true, topic: "ES6 Features", difficulty: "advanced" }
    ],
    completedAt: "2024-01-14T14:20:00Z",
    totalScore: 80
  },
  {
    id: "3",
    name: "Carol Davis", 
    email: "carol@example.com",
    results: [
      { questionId: 1, correct: true, topic: "CSS Responsive Design", difficulty: "intermediate" },
      { questionId: 2, correct: true, topic: "CSS Grid Layout", difficulty: "advanced" },
      { questionId: 3, correct: true, topic: "CSS Flexbox", difficulty: "intermediate" },
      { questionId: 101, correct: true, topic: "DOM Manipulation", difficulty: "intermediate" },
      { questionId: 102, correct: true, topic: "ES6 Features", difficulty: "advanced" }
    ],
    completedAt: "2024-01-13T09:15:00Z",
    totalScore: 100
  }
];

export const ScoreViewer = ({ onBack }: ScoreViewerProps) => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const getTopicScores = (results: TestResult[]) => {
    const topicGroups = results.reduce((acc, result) => {
      if (!acc[result.topic]) {
        acc[result.topic] = { correct: 0, total: 0 };
      }
      acc[result.topic].total++;
      if (result.correct) acc[result.topic].correct++;
      return acc;
    }, {} as Record<string, { correct: number; total: number }>);

    return Object.entries(topicGroups).map(([topic, scores]) => ({
      topic,
      score: Math.round((scores.correct / scores.total) * 100),
      correct: scores.correct,
      total: scores.total
    }));
  };

  const getDifficultyScores = (results: TestResult[]) => {
    const difficultyGroups = results.reduce((acc, result) => {
      if (!acc[result.difficulty]) {
        acc[result.difficulty] = { correct: 0, total: 0 };
      }
      acc[result.difficulty].total++;
      if (result.correct) acc[result.difficulty].correct++;
      return acc;
    }, {} as Record<string, { correct: number; total: number }>);

    return Object.entries(difficultyGroups).map(([difficulty, scores]) => ({
      difficulty,
      score: Math.round((scores.correct / scores.total) * 100),
      correct: scores.correct,
      total: scores.total
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (selectedStudent) {
    const topicScores = getTopicScores(selectedStudent.results);
    const difficultyScores = getDifficultyScores(selectedStudent.results);

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Button variant="ghost" onClick={() => setSelectedStudent(null)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to All Results
            </Button>
            <div className="text-right">
              <h1 className="text-2xl font-bold">{selectedStudent.name}</h1>
              <p className="text-muted-foreground">{selectedStudent.email}</p>
              <p className="text-sm text-muted-foreground">Completed: {formatDate(selectedStudent.completedAt)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overall Score</CardTitle>
                <Trophy className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{selectedStudent.totalScore}%</div>
                <Progress value={selectedStudent.totalScore} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Questions Correct</CardTitle>
                <CheckCircle className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {selectedStudent.results.filter(r => r.correct).length}/{selectedStudent.results.length}
                </div>
                <p className="text-xs text-muted-foreground">Total answered correctly</p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Performance Level</CardTitle>
                <BarChart3 className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {selectedStudent.totalScore >= 90 ? "Excellent" : 
                   selectedStudent.totalScore >= 80 ? "Very Good" :
                   selectedStudent.totalScore >= 70 ? "Good" :
                   selectedStudent.totalScore >= 60 ? "Fair" : "Needs Improvement"}
                </div>
                <Badge variant={selectedStudent.totalScore >= 80 ? "default" : "secondary"} className="mt-1">
                  {selectedStudent.totalScore >= 80 ? "Strong" : "Developing"}
                </Badge>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Performance by Topic</CardTitle>
                <CardDescription>Score breakdown by subject area</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topicScores.map((topic, index) => (
                    <div key={index} className="space-y-2">
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
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Performance by Difficulty</CardTitle>
                <CardDescription>How well student handles different complexity levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {difficultyScores.map((difficulty, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium capitalize">{difficulty.difficulty}</span>
                        <span className="text-muted-foreground">
                          {difficulty.correct}/{difficulty.total} ({difficulty.score}%)
                        </span>
                      </div>
                      <Progress value={difficulty.score} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-card mt-6">
            <CardHeader>
              <CardTitle>Question-by-Question Results</CardTitle>
              <CardDescription>Detailed breakdown of each question response</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedStudent.results.map((result, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      result.correct ? "bg-success/5 border-success/20" : "bg-destructive/5 border-destructive/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {result.correct ? (
                        <CheckCircle className="h-5 w-5 text-success" />
                      ) : (
                        <XCircle className="h-5 w-5 text-destructive" />
                      )}
                      <div>
                        <p className="font-medium">Question {result.questionId}</p>
                        <p className="text-sm text-muted-foreground">{result.topic}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={result.difficulty === 'advanced' ? 'destructive' : 'default'}>
                        {result.difficulty}
                      </Badge>
                      <Badge variant={result.correct ? "default" : "secondary"}>
                        {result.correct ? "Correct" : "Incorrect"}
                      </Badge>
                    </div>
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
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Student Test Results</h1>
            <p className="text-muted-foreground">View and analyze student performance</p>
          </div>
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStudentResults.length}</div>
              <p className="text-xs text-muted-foreground">Completed tests</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <BarChart3 className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(mockStudentResults.reduce((sum, student) => sum + student.totalScore, 0) / mockStudentResults.length)}%
              </div>
              <p className="text-xs text-muted-foreground">Class average</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
              <Trophy className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">
                {mockStudentResults.sort((a, b) => b.totalScore - a.totalScore)[0]?.name}
              </div>
              <p className="text-xs text-muted-foreground">
                {mockStudentResults.sort((a, b) => b.totalScore - a.totalScore)[0]?.totalScore}% score
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Student Results</CardTitle>
            <CardDescription>Click on any student to view detailed results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockStudentResults
                .sort((a, b) => b.totalScore - a.totalScore)
                .map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedStudent(student)}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                      <p className="text-xs text-muted-foreground">
                        Completed: {formatDate(student.completedAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-lg font-bold">{student.totalScore}%</div>
                      <div className="text-xs text-muted-foreground">
                        {student.results.filter(r => r.correct).length}/{student.results.length} correct
                      </div>
                    </div>
                    <Badge variant={student.totalScore >= 80 ? "default" : student.totalScore >= 60 ? "secondary" : "destructive"}>
                      {student.totalScore >= 90 ? "Excellent" : 
                       student.totalScore >= 80 ? "Very Good" :
                       student.totalScore >= 70 ? "Good" :
                       student.totalScore >= 60 ? "Fair" : "Poor"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};