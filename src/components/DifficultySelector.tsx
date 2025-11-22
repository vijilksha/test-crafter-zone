import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Flame, Rocket, ArrowLeft } from "lucide-react";
import { DifficultyLevel } from "@/components/TestInterface";

interface DifficultySelectorProps {
  onSelect: (difficulty: DifficultyLevel) => void;
  onBack: () => void;
}

export const DifficultySelector = ({ onSelect, onBack }: DifficultySelectorProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={onBack} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Choose Your Challenge Level
          </h2>
          <p className="text-lg text-muted-foreground">
            Select the difficulty that matches your skill level
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Easy */}
          <Card 
            className="hover:shadow-elegant transition-all duration-300 cursor-pointer border-2 hover:border-primary/50"
            onClick={() => onSelect('easy')}
          >
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-2xl">Easy</CardTitle>
              <CardDescription>Perfect for beginners</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Badge variant="secondary" className="w-full justify-center py-2">
                Direct Questions
              </Badge>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Straightforward questions</li>
                <li>✓ Clear and direct format</li>
                <li>✓ Focus on fundamentals</li>
                <li>✓ No hidden complexity</li>
              </ul>
              <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                Start Easy Test
              </Button>
            </CardContent>
          </Card>

          {/* Medium */}
          <Card 
            className="hover:shadow-elegant transition-all duration-300 cursor-pointer border-2 hover:border-primary/50 transform hover:scale-105"
            onClick={() => onSelect('medium')}
          >
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4">
                <Flame className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <CardTitle className="text-2xl">Medium</CardTitle>
              <CardDescription>Test your practical skills</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Badge variant="secondary" className="w-full justify-center py-2 bg-orange-100 dark:bg-orange-900/30">
                Scenario-Based Questions
              </Badge>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Real-world scenarios</li>
                <li>✓ Story-based context</li>
                <li>✓ Practical application</li>
                <li>✓ AI-generated scenarios</li>
              </ul>
              <Button className="w-full bg-orange-600 hover:bg-orange-700" size="lg">
                Start Medium Test
              </Button>
            </CardContent>
          </Card>

          {/* Hard */}
          <Card 
            className="hover:shadow-elegant transition-all duration-300 cursor-pointer border-2 hover:border-primary/50"
            onClick={() => onSelect('hard')}
          >
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                <Rocket className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
              <CardTitle className="text-2xl">Hard</CardTitle>
              <CardDescription>For advanced learners</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Badge variant="secondary" className="w-full justify-center py-2 bg-red-100 dark:bg-red-900/30">
                Complex Challenges
              </Badge>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Multi-step reasoning</li>
                <li>✓ Edge case testing</li>
                <li>✓ Time complexity focus</li>
                <li>✓ Advanced constraints</li>
              </ul>
              <Button className="w-full bg-red-600 hover:bg-red-700" size="lg">
                Start Hard Test
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-6 bg-muted/30 rounded-lg text-center">
          <p className="text-sm text-muted-foreground">
            💡 <strong>Pro Tip:</strong> Start with Easy to understand the format, then progress to Medium and Hard as you build confidence!
          </p>
        </div>
      </div>
    </div>
  );
};