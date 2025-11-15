import { GraduationCap, LayoutDashboard, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const location = useLocation();
  
  return (
    <header className="bg-background border-b border-border/60 sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <GraduationCap className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-bold">Testing Platform</h1>
        </Link>
        
        <nav className="flex items-center gap-2">
          <Link to="/">
            <Button 
              variant={location.pathname === "/" ? "default" : "ghost"}
              size="sm"
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          </Link>
          <Link to="/trainer-dashboard">
            <Button 
              variant={location.pathname === "/trainer-dashboard" ? "default" : "ghost"}
              size="sm"
            >
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Trainer Dashboard
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};