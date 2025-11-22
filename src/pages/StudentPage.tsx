import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dashboard } from "@/components/Dashboard";
import { TestInterface } from "@/components/TestInterface";
import { ResultsView } from "@/components/ResultsView";
import { GraduationCap, LogOut } from "lucide-react";

type ViewType = 'name-entry' | 'dashboard' | 'test' | 'results';

const StudentPage = () => {
  const [currentView, setCurrentView] = useState<ViewType>('name-entry');
  const [studentName, setStudentName] = useState('');
  const [inputName, setInputName] = useState('');
  const [testResults, setTestResults] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'javascript' | 'mock-interim'>('mock-interim');

  useEffect(() => {
    const savedName = localStorage.getItem('student-name');
    if (savedName) {
      setStudentName(savedName);
      setCurrentView('dashboard');
    }
  }, []);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputName.trim()) {
      localStorage.setItem('student-name', inputName.trim());
      setStudentName(inputName.trim());
      setCurrentView('dashboard');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('student-name');
    setStudentName('');
    setInputName('');
    setCurrentView('name-entry');
  };

  const handleStartTest = (category: 'javascript' | 'mock-interim') => {
    setSelectedCategory(category);
    setCurrentView('test');
  };

  const handleTestComplete = (data: any) => {
    setTestResults(data.results || data);
    setCurrentView('results');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  if (currentView === 'name-entry') {
    return (
      <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
        {/* Hero Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/src/assets/hero-education.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-success/30 via-secondary/20 to-background/50 backdrop-blur-sm"></div>
        </div>
        
        {/* Animated overlay elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        
        <Card className="w-full max-w-md shadow-2xl border-success/20 relative z-10 animate-scale-in bg-background/95 backdrop-blur-md">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-success to-secondary rounded-full flex items-center justify-center shadow-glow animate-fade-in">
              <GraduationCap className="h-10 w-10 text-white" />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-success to-secondary bg-clip-text text-transparent">
                Student Access
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Enter your name to access the student dashboard
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
                  className="h-12 border-success/20 focus:ring-success bg-background"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-success to-secondary hover:from-success/90 hover:to-secondary/90 transition-all duration-300 shadow-lg hover:shadow-xl animate-fade-in" 
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
      <header className="border-b border-success/20 bg-gradient-to-r from-success/5 to-secondary/5 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 animate-fade-in">
            <div className="w-10 h-10 bg-gradient-to-br from-success to-secondary rounded-lg flex items-center justify-center shadow-md">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-success to-secondary bg-clip-text text-transparent">Student Dashboard</h1>
              <p className="text-xs text-muted-foreground">Welcome, {studentName}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout} className="border-success/30 hover:bg-success/10 hover:border-success/50 transition-all duration-300">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {currentView === 'dashboard' && (
        <Dashboard 
          userRole="student" 
          onStartTest={handleStartTest}
        />
      )}
      
      {currentView === 'test' && (
        <TestInterface 
          onComplete={handleTestComplete}
          onBack={handleBackToDashboard}
          userName={studentName}
          userRole="student"
          category={selectedCategory}
        />
      )}
      
      {currentView === 'results' && (
        <ResultsView 
          results={testResults}
          onBack={handleBackToDashboard}
        />
      )}
    </div>
  );
};

export default StudentPage;
