import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface StudentInfoDialogProps {
  open: boolean;
  onSubmit: (studentId: string, name: string, cohortCode: string) => void;
  onCancel: () => void;
}

export const StudentInfoDialog = ({ open, onSubmit, onCancel }: StudentInfoDialogProps) => {
  const [inputValue, setInputValue] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    const parts = inputValue.trim().split('_');
    
    if (parts.length !== 3) {
      toast({
        title: "Invalid Format",
        description: "Please enter your information in the format: StudentID_Name_CohortCode (e.g., ST001_John_C2024)",
        variant: "destructive"
      });
      return;
    }

    const [studentId, name, cohortCode] = parts;
    
    if (!studentId || !name || !cohortCode) {
      toast({
        title: "Incomplete Information",
        description: "All fields are required. Format: StudentID_Name_CohortCode",
        variant: "destructive"
      });
      return;
    }

    onSubmit(studentId, name, cohortCode);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Student Information</DialogTitle>
          <DialogDescription>
            Please enter your information to begin the test.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="student-info">
              Student Information
            </Label>
            <Input
              id="student-info"
              placeholder="StudentID_Name_CohortCode"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
            <p className="text-sm text-muted-foreground">
              Format: <span className="font-mono">ST001_JohnDoe_C2024</span>
            </p>
          </div>
          <div className="rounded-lg bg-muted p-4 space-y-2">
            <p className="text-sm font-medium">Example:</p>
            <p className="text-sm text-muted-foreground">
              • Student ID: <span className="font-mono">ST001</span><br/>
              • Name: <span className="font-mono">JohnDoe</span> (no spaces)<br/>
              • Cohort: <span className="font-mono">C2024</span>
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Combine with underscores: <span className="font-mono">ST001_JohnDoe_C2024</span>
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Start Test
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};