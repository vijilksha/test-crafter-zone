import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { Dashboard } from "@/components/Dashboard";
import { TestInterface } from "@/components/TestInterface";
import { ResultsView } from "@/components/ResultsView";
import { ScoreViewer } from "@/components/ScoreViewer";
import { TestCreator } from "@/components/TestCreator";
import { AuthForm } from "@/components/AuthForm";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

type ViewType = 'landing' | 'dashboard' | 'test' | 'results' | 'scores' | 'create-test';

const Index = () => {
  const { user, userRole, loading } = useAuth();
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [testResults, setTestResults] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'javascript' | 'functional-testing' | null>(null);

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Show auth form if user is not authenticated
  if (!user) {
    return <AuthForm />;
  }

  // Show role selection if user doesn't have a role assigned
  if (!userRole) {
    return <HeroSection onRoleSelect={() => {}} />;
  }

  const handleStartTest = (category: 'javascript' | 'functional-testing') => {
    setSelectedCategory(category);
    setCurrentView('test');
  };

  const handleTestComplete = (results: any[]) => {
    setTestResults(results);
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

  return (
    <div className="min-h-screen bg-background">
      {currentView !== 'landing' && <Header />}
      
      {currentView === 'landing' && (
        <Dashboard 
          userRole={userRole} 
          onStartTest={handleStartTest} 
          onViewScores={handleViewScores} 
          onCreateTest={handleCreateTest} 
        />
      )}
      
      {currentView === 'dashboard' && (
        <Dashboard 
          userRole={userRole} 
          onStartTest={handleStartTest} 
          onViewScores={handleViewScores} 
          onCreateTest={handleCreateTest} 
        />
      )}
      
      {currentView === 'test' && user && (
        <TestInterface 
          onComplete={handleTestComplete}
          onBack={handleBackToDashboard}
          userName={user.email || 'Anonymous User'}
          userRole={userRole}
          category={selectedCategory ?? 'functional-testing'}
        />
      )}
      
      {currentView === 'results' && (
        <ResultsView 
          results={testResults}
          onBack={handleBackToDashboard}
        />
      )}

      {currentView === 'scores' && (
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
