import { GraduationCap } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-background border-b border-border/60 sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-bold">Testing Platform</h1>
        </div>
      </div>
    </header>
  );
};