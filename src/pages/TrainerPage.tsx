import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dashboard } from "@/components/Dashboard";
import { ScoreViewer } from "@/components/ScoreViewer";
import { TestCreator } from "@/components/TestCreator";
import { UserCircle, LogOut } from "lucide-react";

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

  const handleLogout = () => {
    localStorage.removeItem('trainer-name');
    setTrainerName('');
    setInputName('');
    setCurrentView('name-entry');
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
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-elegant border-border/50">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
              <UserCircle className="h-10 w-10 text-white" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Trainer Access
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Enter your name to access the trainer dashboard
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleNameSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Your Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  required
                  autoFocus
                  className="h-12"
                />
              </div>
              <Button type="submit" className="w-full h-12" size="lg">
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
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <UserCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Trainer Dashboard</h1>
              <p className="text-xs text-muted-foreground">Welcome, {trainerName}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

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
