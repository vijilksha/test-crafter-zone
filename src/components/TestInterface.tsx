import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Clock, CheckCircle, AlertCircle, ArrowLeft, ArrowRight, Play } from "lucide-react";
import { useState, useEffect } from "react";
import { CodeEditor } from "@/components/CodeEditor";
import { allQuestions, type Question } from "@/data/allQuestions";

interface TestCaseResult {
  name: string;
  passed: boolean;
  message: string;
}

interface Answer {
  questionId: number;
  type: 'multiple-choice' | 'code' | 'js-code';
  value: number | { html: string; css: string } | { html: string; js: string };
  testResults?: TestCaseResult[];
}

interface TestInterfaceProps {
  onComplete: (results: any) => void;
  onBack: () => void;
}

export const TestInterface = ({ onComplete, onBack }: TestInterfaceProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [timeRemaining, setTimeRemaining] = useState(2400); // 40 minutes for coding questions
  const [testResults, setTestResults] = useState<Record<number, TestCaseResult[]>>({});

  // Use all questions (HTML/CSS and JavaScript)
  const questions = allQuestions;

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleMultipleChoiceAnswer = (questionId: number, answerIndex: number) => {
    setAnswers(prev => ({ 
      ...prev, 
      [questionId]: {
        questionId,
        type: 'multiple-choice',
        value: answerIndex
      }
    }));
  };

  const handleCodeAnswer = (questionId: number, html: string, css: string, js?: string) => {
    const question = questions.find(q => q.id === questionId);
    setAnswers(prev => ({ 
      ...prev, 
      [questionId]: {
        questionId,
        type: question?.type === 'js-code' ? 'js-code' : 'code',
        value: question?.type === 'js-code' ? { html, js: js || '' } : { html, css }
      }
    }));
  };

  const runTests = (question: Question) => {
    if (question.type !== 'code' && question.type !== 'js-code') return;
    
    const answer = answers[question.id];
    if (!answer || (answer.type !== 'code' && answer.type !== 'js-code')) return;

    let results;
    if (question.type === 'js-code') {
      const { html, js } = answer.value as { html: string; js: string };
      results = question.testCases.map(testCase => ({
        name: testCase.name,
        ...testCase.test(html, js)
      }));
    } else {
      const { html, css } = answer.value as { html: string; css: string };
      results = question.testCases.map(testCase => ({
        name: testCase.name,
        ...testCase.test(html, css)
      }));
    }

    setTestResults(prev => ({ ...prev, [question.id]: results }));
    
    // Update answer with test results
    setAnswers(prev => ({
      ...prev,
      [question.id]: {
        ...prev[question.id],
        testResults: results
      }
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      finishTest();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const finishTest = () => {
    const results = questions.map(q => {
      const answer = answers[q.id];
      if (!answer) return { questionId: q.id, correct: false, topic: q.topic, difficulty: q.difficulty };

      if (q.type === 'multiple-choice') {
        return {
          questionId: q.id,
          correct: answer.value === q.correctAnswer,
          topic: q.topic,
          difficulty: q.difficulty
        };
      } else {
        // For code and js-code questions, check if all test cases passed
        const testResults = answer.testResults || [];
        const allPassed = testResults.length > 0 && testResults.every(r => r.passed);
        return {
          questionId: q.id,
          correct: allPassed,
          topic: q.topic,
          difficulty: q.difficulty,
          testResults
        };
      }
    });
    onComplete(results);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const question = questions[currentQuestion];
  const currentAnswer = answers[question.id];
  const hasAnswer = currentAnswer !== undefined;
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="font-mono text-lg">{formatTime(timeRemaining)}</span>
            </div>
            <Badge variant="outline">
              Question {currentQuestion + 1} of {questions.length}
            </Badge>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Question Card */}
        <Card className="shadow-card mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">
                {question.type === 'code' ? question.title : `Question ${currentQuestion + 1}`}
              </CardTitle>
              <div className="flex gap-2">
                <Badge variant={question.difficulty === 'advanced' ? 'destructive' : 'default'}>
                  {question.difficulty}
                </Badge>
                <Badge variant="outline">{question.topic}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Scenario */}
            <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
              <h4 className="font-semibold text-sm text-muted-foreground mb-2 uppercase tracking-wide">
                Scenario
              </h4>
              <p className="text-foreground leading-relaxed">{question.scenario}</p>
            </div>

            {/* Question Content */}
            {question.type === 'multiple-choice' ? (
              <div>
                <h3 className="text-lg font-semibold mb-4">{question.text}</h3>
                
                <RadioGroup 
                  value={currentAnswer?.value?.toString()} 
                  onValueChange={(value) => handleMultipleChoiceAnswer(question.id, parseInt(value))}
                >
                  {question.options.map((option, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} className="mt-1" />
                      <Label htmlFor={`option-${index}`} className="text-sm leading-relaxed cursor-pointer flex-1">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Instructions</h3>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => runTests(question)}
                    disabled={!currentAnswer}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Run Tests
                  </Button>
                </div>
                <div className="mb-6 p-4 bg-accent/10 rounded-lg">
                  <pre className="whitespace-pre-wrap text-sm">{question.instructions}</pre>
                </div>
                
                <CodeEditor
                  initialHtml={question.starterCode.html}
                  initialCss={question.type === 'code' ? question.starterCode.css : ''}
                  initialJs={question.type === 'js-code' ? question.starterCode.js : ''}
                  onCodeChange={(html, css, js) => handleCodeAnswer(question.id, html, css, js)}
                  testResults={testResults[question.id] || []}
                  showJsTab={question.type === 'js-code'}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentQuestion 
                    ? 'bg-primary' 
                    : answers[questions[index].id] !== undefined 
                      ? 'bg-success' 
                      : 'bg-muted'
                }`}
              />
            ))}
          </div>

          <Button 
            onClick={handleNext}
            disabled={!hasAnswer}
            variant={currentQuestion === questions.length - 1 ? "success" : "default"}
          >
            {currentQuestion === questions.length - 1 ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Finish Test
              </>
            ) : (
              <>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};