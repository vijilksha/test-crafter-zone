import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, Play, Code } from "lucide-react";

interface CodeEditorProps {
  initialHtml?: string;
  initialCss?: string;
  onCodeChange: (html: string, css: string) => void;
  testResults?: TestCaseResult[];
}

interface TestCaseResult {
  name: string;
  passed: boolean;
  message: string;
}

export const CodeEditor = ({ 
  initialHtml = "", 
  initialCss = "", 
  onCodeChange,
  testResults = []
}: CodeEditorProps) => {
  const [html, setHtml] = useState(initialHtml);
  const [css, setCss] = useState(initialCss);
  const [showPreview, setShowPreview] = useState(true);

  const handleHtmlChange = (value: string) => {
    setHtml(value);
    onCodeChange(value, css);
  };

  const handleCssChange = (value: string) => {
    setCss(value);
    onCodeChange(html, value);
  };

  const generatePreviewCode = () => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
          ${css}
        </style>
      </head>
      <body>
        ${html}
      </body>
      </html>
    `;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Code className="h-5 w-5 text-primary" />
          Code Editor
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowPreview(!showPreview)}
        >
          {showPreview ? "Hide Preview" : "Show Preview"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-96">
        {/* Code Editors */}
        <div className="space-y-4">
          <Tabs defaultValue="html" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="html">HTML</TabsTrigger>
              <TabsTrigger value="css">CSS</TabsTrigger>
            </TabsList>
            
            <TabsContent value="html" className="flex-1">
              <textarea
                value={html}
                onChange={(e) => handleHtmlChange(e.target.value)}
                className="w-full h-full p-3 border rounded-md font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your HTML code here..."
                spellCheck={false}
              />
            </TabsContent>
            
            <TabsContent value="css" className="flex-1">
              <textarea
                value={css}
                onChange={(e) => handleCssChange(e.target.value)}
                className="w-full h-full p-3 border rounded-md font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your CSS code here..."
                spellCheck={false}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview */}
        {showPreview && (
          <div className="border rounded-md overflow-hidden">
            <div className="bg-muted px-3 py-2 text-sm font-medium border-b">
              Preview
            </div>
            <iframe
              srcDoc={generatePreviewCode()}
              className="w-full h-full border-0"
              sandbox="allow-scripts"
              title="Code Preview"
            />
          </div>
        )}
      </div>

      {/* Test Results */}
      {testResults.length > 0 && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Play className="h-4 w-4" />
              Test Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 p-2 rounded-md ${
                    result.passed ? "bg-success/10" : "bg-destructive/10"
                  }`}
                >
                  {result.passed ? (
                    <CheckCircle className="h-4 w-4 text-success" />
                  ) : (
                    <XCircle className="h-4 w-4 text-destructive" />
                  )}
                  <div className="flex-1">
                    <div className="font-medium text-sm">{result.name}</div>
                    <div className="text-xs text-muted-foreground">{result.message}</div>
                  </div>
                  <Badge variant={result.passed ? "default" : "destructive"}>
                    {result.passed ? "PASS" : "FAIL"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};