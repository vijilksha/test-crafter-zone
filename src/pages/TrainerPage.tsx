import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dashboard } from "@/components/Dashboard";
import { ScoreViewer } from "@/components/ScoreViewer";
import { TestCreator } from "@/components/TestCreator";
import { UserCircle } from "lucide-react";

type ViewType = 'name-entry' | 'dashboard' | 'scores' | 'create-test';

const TrainerPage = () => {
  const [currentView, setCurrentView] = useState<ViewType>('name-entry');
  const [trainerName, setTrainerName] = useState('');
  const [inputName, setInputName] = useState('');

  useEffect(() => {
    const savedName = localStorage.getItem('trainer-name');
    if (savedName) {
      setTrainerName(savedName);
      setCurrentView('dashboard');
    }
  }, []);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputName.trim()) {
      localStorage.setItem('trainer-name', inputName.trim());
      setTrainerName(inputName.trim());
      setCurrentView('dashboard');
    }
  };

  const handleViewScores = () => {
    setCurrentView('scores');
  };

  const handleCreateTest = () => {
    setCurrentView('create-test');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  if (currentView === 'name-entry') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-elegant">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
              <UserCircle className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Trainer Access</CardTitle>
            <CardDescription>Enter your name to access the trainer dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleNameSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Continue to Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {currentView === 'dashboard' && (
        <Dashboard 
          userRole="trainer" 
          onViewScores={handleViewScores} 
          onCreateTest={handleCreateTest} 
        />
      )}
      
      {currentView === 'scores' && (
        <ScoreViewer 
          onBack={handleBackToDashboard}
          userRole="trainer"
        />
      )}

      {currentView === 'create-test' && (
        <TestCreator 
          onBack={handleBackToDashboard}
        />
      )}
    </div>
  );
};

export default TrainerPage;
