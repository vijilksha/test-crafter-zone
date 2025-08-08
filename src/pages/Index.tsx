import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { Dashboard } from "@/components/Dashboard";
import { TestInterface } from "@/components/TestInterface";
import { ResultsView } from "@/components/ResultsView";
import { ScoreViewer } from "@/components/ScoreViewer";

type ViewType = 'landing' | 'dashboard' | 'test' | 'results' | 'scores';
type UserRole = 'trainer' | 'student' | null;

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [testResults, setTestResults] = useState<any[]>([]);

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
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

  return (
    <div className="min-h-screen bg-background">
      {currentView !== 'landing' && <Header />}
      
      {currentView === 'landing' && (
        <HeroSection onRoleSelect={handleRoleSelect} />
      )}
      
      {currentView === 'dashboard' && userRole && (
        <Dashboard userRole={userRole} onStartTest={handleStartTest} onViewScores={handleViewScores} />
      )}
      
      {currentView === 'test' && (
        <TestInterface 
          onComplete={handleTestComplete}
          onBack={handleBackToDashboard}
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
        />
      )}
    </div>
  );
};

export default Index;
