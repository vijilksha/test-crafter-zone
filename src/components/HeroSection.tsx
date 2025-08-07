import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users } from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";

interface HeroSectionProps {
  onRoleSelect: (role: 'trainer' | 'student') => void;
}

export const HeroSection = ({ onRoleSelect }: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Master Knowledge with
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Smart Assessments
                </span>
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Create comprehensive tests, track progress, and measure learning outcomes with our advanced assessment platform designed for trainers and students.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="lg" 
                onClick={() => onRoleSelect('trainer')}
                className="group"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                I'm a Trainer
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="secondary" 
                size="lg" 
                onClick={() => onRoleSelect('student')}
                className="group"
              >
                <Users className="h-5 w-5 mr-2" />
                I'm a Student
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-white/80 text-sm">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">1000+</div>
                <div className="text-white/80 text-sm">Tests Created</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">95%</div>
                <div className="text-white/80 text-sm">Success Rate</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-glow">
              <img 
                src={heroImage} 
                alt="Educational Platform" 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};