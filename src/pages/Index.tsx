import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            Welcome to QA Assessment Platform
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose your role to continue
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="shadow-elegant hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="mx-auto w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                <GraduationCap className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-2xl">Student</CardTitle>
              <CardDescription>
                Take assessments and track your progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/student">
                <Button variant="default" size="lg" className="w-full">
                  Continue as Student
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="shadow-elegant hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="mx-auto w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                <UserCircle className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-2xl">Trainer</CardTitle>
              <CardDescription>
                Create tests and view student results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/trainer">
                <Button variant="default" size="lg" className="w-full">
                  Continue as Trainer
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
