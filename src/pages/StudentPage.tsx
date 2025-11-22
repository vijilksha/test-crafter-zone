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
      <div className="min-h-screen relative overflow-hidden">
        {/* Hero Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/src/assets/hero-education.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary-glow/30 to-background/60"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Hero Section */}
          <div className="flex-1 flex items-center justify-center px-4 py-16">
            <div className="max-w-4xl w-full text-center space-y-8">
              <div className="animate-fade-in">
                <div className="mx-auto w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow mb-6">
                  <GraduationCap className="h-12 w-12 text-white" />
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                  Student Portal
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-md">
                  Welcome to your learning journey
                </p>
              </div>

              {/* Login Card */}
              <Card className="max-w-md mx-auto shadow-2xl border-primary/20 bg-background/95 backdrop-blur-lg animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    Enter Your Name
                  </CardTitle>
                  <CardDescription className="text-base">
                    Start your assessment journey
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
                        className="h-14 text-lg border-primary/30 focus:ring-primary bg-background"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full h-14 text-lg bg-gradient-primary hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl" 
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
                    <div className="text-3xl font-bold mb-2">5+</div>
                    <p className="text-sm text-white/90">Assessment Topics</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold mb-2">40min</div>
                    <p className="text-sm text-white/90">Test Duration</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold mb-2">100%</div>
                    <p className="text-sm text-white/90">Your Potential</p>
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
      <header className="border-b border-primary/20 bg-gradient-to-r from-primary/5 to-primary-glow/5 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 animate-fade-in">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-md">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">Student Dashboard</h1>
              <p className="text-xs text-muted-foreground">Welcome, {studentName}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout} className="border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300">
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
