import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { Dashboard } from "@/components/Dashboard";
import { TestInterface } from "@/components/TestInterface";
import { ResultsView } from "@/components/ResultsView";
import { ScoreViewer } from "@/components/ScoreViewer";
import { TestCreator } from "@/components/TestCreator";

type ViewType = 'landing' | 'dashboard' | 'test' | 'results' | 'scores' | 'create-test';
type UserRole = 'trainer' | 'student' | null;

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userName, setUserName] = useState<string>('');
  const [testResults, setTestResults] = useState<any[]>([]);

  const handleRoleSelect = (role: UserRole, name?: string) => {
    setUserRole(role);
    setUserName(name || 'Anonymous User');
    setCurrentView('dashboard');
  };

  const handleStartTest = () => {
    setCurrentView('test');
  };

  const handleTestComplete = (results: any[]) => {
    setTestResults(results);
    setCurrentView('results');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    setUserRole(null);
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
        <HeroSection onRoleSelect={handleRoleSelect} />
      )}
      
      {currentView === 'dashboard' && userRole && (
        <Dashboard userRole={userRole} onStartTest={handleStartTest} onViewScores={handleViewScores} onCreateTest={handleCreateTest} />
      )}
      
      {currentView === 'test' && userRole && (
        <TestInterface 
          onComplete={handleTestComplete}
          onBack={handleBackToDashboard}
          userName={userName}
          userRole={userRole}
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

      {currentView === 'create-test' && (
        <TestCreator 
          onBack={handleBackToDashboard}
        />
      )}
    </div>
  );
};

export default Index;
