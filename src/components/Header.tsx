import { Button } from "@/components/ui/button";
import { GraduationCap, User, LogOut } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const [userRole, setUserRole] = useState<'trainer' | 'student' | null>('trainer');

  return (
    <header className="border-b bg-card shadow-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-lg shadow-elegant">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">LearnTest Pro</h1>
              <p className="text-sm text-muted-foreground">Assessment Platform</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {userRole && (
              <>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium capitalize">{userRole}</span>
                </div>
                <Button variant="ghost" size="sm">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};