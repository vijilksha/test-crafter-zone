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
      <div className="min-h-screen relative overflow-hidden">
        {/* Hero Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/src/assets/hero-education.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/40 via-success/30 to-background/60"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Hero Section */}
          <div className="flex-1 flex items-center justify-center px-4 py-16">
            <div className="max-w-4xl w-full text-center space-y-8">
              <div className="animate-fade-in">
                <div className="mx-auto w-24 h-24 bg-gradient-to-br from-secondary to-success rounded-full flex items-center justify-center shadow-glow mb-6">
                  <UserCircle className="h-12 w-12 text-white" />
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                  Trainer Portal
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-md">
                  Manage and track student progress
                </p>
              </div>

              {/* Login Card */}
              <Card className="max-w-md mx-auto shadow-2xl border-secondary/20 bg-background/95 backdrop-blur-lg animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-secondary to-success bg-clip-text text-transparent">
                    Enter Your Name
                  </CardTitle>
                  <CardDescription className="text-base">
                    Access trainer dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleNameSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">Your Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                        required
                        autoFocus
                        className="h-14 text-lg border-secondary/30 focus:ring-secondary bg-background"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full h-14 text-lg bg-gradient-to-r from-secondary to-success hover:from-secondary/90 hover:to-success/90 transition-all duration-300 shadow-lg hover:shadow-xl" 
                      size="lg"
                    >
                      Continue to Dashboard
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold mb-2">Create</div>
                    <p className="text-sm text-white/90">Custom Tests</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold mb-2">Track</div>
                    <p className="text-sm text-white/90">Student Progress</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold mb-2">Analyze</div>
                    <p className="text-sm text-white/90">Performance Data</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
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
