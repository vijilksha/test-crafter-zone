import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Clock, CheckCircle, AlertCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

interface Question {
  id: number;
  text: string;
  scenario: string;
  difficulty: 'intermediate' | 'advanced';
  options: string[];
  correctAnswer: number;
  topic: string;
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    text: "What would be the best approach to optimize this React component?",
    scenario: "You have a React component that renders a list of 1000 items. Users are experiencing lag when scrolling through the list. The component re-renders frequently due to state updates in the parent component.",
    difficulty: 'intermediate',
    options: [
      "Use React.memo to prevent unnecessary re-renders",
      "Implement virtual scrolling with react-window",
      "Move the list state to a separate context",
      "Both A and B"
    ],
    correctAnswer: 3,
    topic: "React Performance"
  },
  {
    id: 2,
    text: "How would you handle this API integration challenge?",
    scenario: "Your application needs to fetch data from multiple APIs simultaneously. Some APIs are slow and might timeout. You need to display partial results even if some APIs fail, and implement proper error handling without blocking the user interface.",
    difficulty: 'advanced',
    options: [
      "Use Promise.all() and handle errors with try-catch",
      "Use Promise.allSettled() with individual error handling",
      "Make sequential API calls to avoid overloading",
      "Use async/await with parallel execution"
    ],
    correctAnswer: 1,
    topic: "API Integration"
  }
];

interface TestInterfaceProps {
  onComplete: (results: any) => void;
  onBack: () => void;
}

export const TestInterface = ({ onComplete, onBack }: TestInterfaceProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes
  const [showResults, setShowResults] = useState(false);

  const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100;

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleNext = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
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
    const results = sampleQuestions.map(q => ({
      questionId: q.id,
      correct: answers[q.id] === q.correctAnswer,
      topic: q.topic,
      difficulty: q.difficulty
    }));
    onComplete(results);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const question = sampleQuestions[currentQuestion];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
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
              Question {currentQuestion + 1} of {sampleQuestions.length}
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
                Question {currentQuestion + 1}
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

            {/* Question */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{question.text}</h3>
              
              <RadioGroup 
                value={answers[question.id]?.toString()} 
                onValueChange={(value) => handleAnswerSelect(question.id, parseInt(value))}
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
            {sampleQuestions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentQuestion 
                    ? 'bg-primary' 
                    : answers[sampleQuestions[index].id] !== undefined 
                      ? 'bg-success' 
                      : 'bg-muted'
                }`}
              />
            ))}
          </div>

          <Button 
            onClick={handleNext}
            disabled={answers[question.id] === undefined}
            variant={currentQuestion === sampleQuestions.length - 1 ? "success" : "default"}
          >
            {currentQuestion === sampleQuestions.length - 1 ? (
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