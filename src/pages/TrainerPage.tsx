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
      <div className="min-h-screen bg-gradient-to-br from-secondary/10 via-success/5 to-background flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-success/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <Card className="w-full max-w-md shadow-elegant border-secondary/20 relative z-10 animate-scale-in">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-secondary to-success rounded-full flex items-center justify-center shadow-glow animate-fade-in">
              <UserCircle className="h-10 w-10 text-white" />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-secondary to-success bg-clip-text text-transparent">
                Trainer Access
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Enter your name to access the trainer dashboard
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleNameSubmit} className="space-y-4">
              <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <Label htmlFor="name" className="text-sm font-medium">Your Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  required
                  autoFocus
                  className="h-12 border-secondary/20 focus:ring-secondary"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-secondary to-success hover:from-secondary/90 hover:to-success/90 transition-all duration-300 shadow-lg hover:shadow-xl animate-fade-in" 
                style={{ animationDelay: '0.3s' }}
                size="lg"
              >
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
      <header className="border-b border-secondary/20 bg-gradient-to-r from-secondary/5 to-success/5 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 animate-fade-in">
            <div className="w-10 h-10 bg-gradient-to-br from-secondary to-success rounded-lg flex items-center justify-center shadow-md">
              <UserCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-secondary to-success bg-clip-text text-transparent">Trainer Dashboard</h1>
              <p className="text-xs text-muted-foreground">Welcome, {trainerName}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout} className="border-secondary/30 hover:bg-secondary/10 hover:border-secondary/50 transition-all duration-300">
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
