import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dashboard } from "@/components/Dashboard";
import { TestInterface } from "@/components/TestInterface";
import { ResultsView } from "@/components/ResultsView";
import { GraduationCap } from "lucide-react";

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
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-elegant">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Student Access</CardTitle>
            <CardDescription>Enter your name to access the student dashboard</CardDescription>
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
