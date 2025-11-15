import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HeroSection } from "@/components/HeroSection";
import { Dashboard } from "@/components/Dashboard";
import { TestInterface } from "@/components/TestInterface";
import { ResultsView } from "@/components/ResultsView";
import { ScoreViewer } from "@/components/ScoreViewer";
import { TestCreator } from "@/components/TestCreator";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

type ViewType = 'landing' | 'dashboard' | 'test' | 'results' | 'scores' | 'create-test';
type UserRole = 'student' | 'trainer';

const Index = () => {
  const navigate = useNavigate();
  const { user, userRole, loading } = useAuth();
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [testResults, setTestResults] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'javascript' | 'mock-interim' | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    } else if (!loading && user && currentView === 'landing') {
      setCurrentView('dashboard');
    }
  }, [user, loading, navigate, currentView]);


  const handleStartTest = (category: 'javascript' | 'mock-interim') => {
    setSelectedCategory(category);
    setCurrentView('test');
  };

  const handleTestComplete = (data: any) => {
    console.log('Index: Received test completion data:', data);
    setTestResults(data.results || data);
    console.log('Index: Setting view to results');
    setCurrentView('results');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleViewScores = () => {
    setCurrentView('scores');
  };

  const handleCreateTest = () => {
    setCurrentView('create-test');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {currentView === 'dashboard' && userRole && (
        <Dashboard 
          userRole={userRole} 
          onStartTest={handleStartTest} 
          onViewScores={handleViewScores} 
          onCreateTest={handleCreateTest} 
        />
      )}
      
      {currentView === 'test' && userRole && (
        <TestInterface 
          onComplete={handleTestComplete}
          onBack={handleBackToDashboard}
          userName={user.user_metadata?.name || user.email || 'User'}
          userRole={userRole}
          category={selectedCategory ?? 'mock-interim'}
        />
      )}
      
      {currentView === 'results' && (
        <ResultsView 
          results={testResults}
          onBack={handleBackToDashboard}
        />
      )}

      {currentView === 'scores' && userRole && (
        <ScoreViewer 
          onBack={handleBackToDashboard}
          userRole={userRole}
        />
      )}

      {currentView === 'create-test' && userRole === 'trainer' && (
        <TestCreator 
          onBack={handleBackToDashboard}
        />
      )}
    </div>
  );
};

export default Index;
