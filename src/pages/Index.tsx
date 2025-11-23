import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, UserCircle } from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-secondary/30 to-background/60"></div>
      </div>
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            Welcome to QA Assessment Platform
          </h1>
          <p className="text-xl md:text-2xl text-white/90 drop-shadow-md">
            Choose your role to continue
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-center max-w-4xl mx-auto">
          <Link to="/student" className="w-full md:w-auto">
            <div className="text-center group">
              <div className="mx-auto w-32 h-32 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 group-hover:bg-white/20 transition-all duration-300 border-2 border-white/30">
                <GraduationCap className="h-16 w-16 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">Student</h2>
              <p className="text-white/80 mb-6">Take assessments and track your progress</p>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8">
                Continue as Student
              </Button>
            </div>
          </Link>

          <Link to="/trainer" className="w-full md:w-auto">
            <div className="text-center group">
              <div className="mx-auto w-32 h-32 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 group-hover:bg-white/20 transition-all duration-300 border-2 border-white/30">
                <UserCircle className="h-16 w-16 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">Trainer</h2>
              <p className="text-white/80 mb-6">Create tests and view student results</p>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8">
                Continue as Trainer
              </Button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
