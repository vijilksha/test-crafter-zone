import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Target, TrendingUp, ArrowLeft, Download } from "lucide-react";

interface TestResult {
  questionId: number;
  correct: boolean;
  topic: string;
  difficulty: 'intermediate' | 'advanced';
}

interface ResultsViewProps {
  results: TestResult[];
  onBack: () => void;
}

export const ResultsView = ({ results, onBack }: ResultsViewProps) => {
  // Ensure results is always an array to prevent filter errors
  const safeResults = Array.isArray(results) ? results : [];
  
  const totalQuestions = safeResults.length;
  const correctAnswers = safeResults.filter(r => r.correct).length;
  const score = Math.round((correctAnswers / totalQuestions) * 100);

  // Topic-wise analysis
  const topicAnalysis = safeResults.reduce((acc, result) => {
    if (!acc[result.topic]) {
      acc[result.topic] = { total: 0, correct: 0 };
    }
    acc[result.topic].total++;
    if (result.correct) acc[result.topic].correct++;
    return acc;
  }, {} as Record<string, { total: number; correct: number }>);

  // Difficulty analysis
  const difficultyAnalysis = safeResults.reduce((acc, result) => {
    if (!acc[result.difficulty]) {
      acc[result.difficulty] = { total: 0, correct: 0 };
    }
    acc[result.difficulty].total++;
    if (result.correct) acc[result.difficulty].correct++;
    return acc;
  }, {} as Record<string, { total: number; correct: number }>);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return "default";
    if (score >= 60) return "secondary";
    return "destructive";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Results
          </Button>
        </div>

        {/* Overall Score */}
        <Card className="shadow-card mb-8 bg-gradient-card">
          <CardHeader className="text-center">
            <div className="mx-auto w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
              <Trophy className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold">Test Completed!</CardTitle>
            <CardDescription>Here's how you performed</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className={`text-6xl font-bold mb-4 ${getScoreColor(score)}`}>
              {score}%
            </div>
            <div className="flex justify-center gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-success">{correctAnswers}</div>
                <div className="text-sm text-muted-foreground">Correct</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-destructive">{totalQuestions - correctAnswers}</div>
                <div className="text-sm text-muted-foreground">Incorrect</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{totalQuestions}</div>
                <div className="text-sm text-muted-foreground">Total</div>
              </div>
            </div>
            <Badge variant={getScoreBadgeVariant(score)} className="text-lg px-4 py-2">
              {score >= 80 ? 'Excellent!' : score >= 60 ? 'Good Job!' : 'Keep Learning!'}
            </Badge>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Topic Analysis */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Topic Performance
              </CardTitle>
              <CardDescription>Your performance across different topics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(topicAnalysis).map(([topic, data]) => {
                  const topicScore = Math.round((data.correct / data.total) * 100);
                  return (
                    <div key={topic} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">{topic}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-semibold ${getScoreColor(topicScore)}`}>
                            {topicScore}%
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({data.correct}/{data.total})
                          </span>
                        </div>
                      </div>
                      <Progress value={topicScore} className="h-2" />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Difficulty Analysis */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-secondary" />
                Difficulty Breakdown
              </CardTitle>
              <CardDescription>Performance by question difficulty</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(difficultyAnalysis).map(([difficulty, data]) => {
                  const difficultyScore = Math.round((data.correct / data.total) * 100);
                  return (
                    <div key={difficulty} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Badge variant={difficulty === 'advanced' ? 'destructive' : 'default'} className="capitalize">
                            {difficulty}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${getScoreColor(difficultyScore)}`}>
                            {difficultyScore}%
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {data.correct} of {data.total} correct
                          </div>
                        </div>
                      </div>
                      <Progress value={difficultyScore} className="h-3" />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <Card className="shadow-card mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-accent" />
              Recommendations
            </CardTitle>
            <CardDescription>Personalized suggestions for improvement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {score >= 80 ? (
                <>
                  <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                    <h4 className="font-semibold text-success mb-2">Excellent Performance!</h4>
                    <p className="text-sm text-muted-foreground">
                      You've mastered these concepts well. Consider taking advanced level assessments.
                    </p>
                  </div>
                  <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                    <h4 className="font-semibold text-primary mb-2">Next Steps</h4>
                    <p className="text-sm text-muted-foreground">
                      Explore more challenging topics to continue your learning journey.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                    <h4 className="font-semibold text-warning mb-2">Areas for Improvement</h4>
                    <p className="text-sm text-muted-foreground">
                      Focus on the topics where you scored below 70% for better understanding.
                    </p>
                  </div>
                  <div className="p-4 bg-secondary/10 border border-secondary/20 rounded-lg">
                    <h4 className="font-semibold text-secondary mb-2">Study Resources</h4>
                    <p className="text-sm text-muted-foreground">
                      Review the recommended materials and practice more scenario-based questions.
                    </p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};