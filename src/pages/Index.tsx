import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { Dashboard } from "@/components/Dashboard";
import { TestInterface } from "@/components/TestInterface";
import { ResultsView } from "@/components/ResultsView";
import { ScoreViewer } from "@/components/ScoreViewer";
import { TestCreator } from "@/components/TestCreator";

type ViewType = 'landing' | 'dashboard' | 'test' | 'results' | 'scores' | 'create-test';
type UserRole = 'student' | 'trainer';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [testResults, setTestResults] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'javascript' | 'functional-testing' | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [userName, setUserName] = useState<string>('');

  const handleRoleSelect = (role: UserRole, name?: string) => {
    setUserRole(role);
    setUserName(name || 'Anonymous User');
    setCurrentView('dashboard');
  };

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
      {currentView === 'landing' && (
        <HeroSection onRoleSelect={handleRoleSelect} />
      )}
      
      {currentView !== 'landing' && <Header />}
      
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
          userName={userName}
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
