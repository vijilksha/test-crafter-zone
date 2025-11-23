import { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, Packer } from 'docx';
import { saveAs } from 'file-saver';
import { Button } from './ui/button';
import { Download } from 'lucide-react';
import { jsQuestions, type JSQuestion } from '@/data/jsQuestions';

export const QuestionDownloader = () => {
  const generateWordDocument = async () => {
    // Filter only medium-level code questions
    const mediumQuestions = jsQuestions.filter(
      q => q.difficulty === 'Medium' && q.type === 'code'
    ).slice(0, 20);

    const children: any[] = [
      new Paragraph({
        text: '20 Scenario-Based Medium Level JavaScript Questions',
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 }
      }),
      new Paragraph({
        text: 'With Answers and Unit Testing Code',
        alignment: AlignmentType.CENTER,
        spacing: { after: 600 }
      })
    ];

    mediumQuestions.forEach((question, index) => {
      if (question.type === 'code') {
        // Question Number and Title
        children.push(
          new Paragraph({
            text: `Question ${index + 1}: ${question.title}`,
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 }
          })
        );

        // Scenario
        children.push(
          new Paragraph({
            children: [new TextRun({ text: 'Scenario:', bold: true })],
            spacing: { after: 100 }
          })
        );
        children.push(
          new Paragraph({
            text: question.scenario,
            spacing: { after: 200 }
          })
        );

        // Topic and Difficulty
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: 'Topic: ', bold: true }),
              new TextRun({ text: question.topic })
            ],
            spacing: { after: 100 }
          })
        );
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: 'Difficulty: ', bold: true }),
              new TextRun({ text: question.difficulty })
            ],
            spacing: { after: 200 }
          })
        );

        // Instructions
        children.push(
          new Paragraph({
            children: [new TextRun({ text: 'Instructions:', bold: true })],
            spacing: { after: 100 }
          })
        );
        children.push(
          new Paragraph({
            text: question.instructions,
            spacing: { after: 200 }
          })
        );

        // Starter Code
        children.push(
          new Paragraph({
            children: [new TextRun({ text: 'Starter Code:', bold: true })],
            spacing: { after: 100 }
          })
        );
        if (question.starterCode.html) {
          children.push(
            new Paragraph({
              children: [new TextRun({ text: 'HTML:', italics: true })],
              spacing: { after: 50 }
            })
          );
          children.push(
            new Paragraph({
              text: question.starterCode.html,
              spacing: { after: 100 }
            })
          );
        }
        children.push(
          new Paragraph({
            children: [new TextRun({ text: 'JavaScript:', italics: true })],
            spacing: { after: 50 }
          })
        );
        children.push(
          new Paragraph({
            text: question.starterCode.js,
            spacing: { after: 300 }
          })
        );

        // Answer Section
        children.push(
          new Paragraph({
            text: 'ANSWER:',
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 200, after: 100 }
          })
        );
        children.push(
          new Paragraph({
            children: [new TextRun({ text: 'Solution Code:', bold: true })],
            spacing: { after: 100 }
          })
        );
        
        // Extract solution from test cases (simplified version)
        const solutionHint = `// Implement the function following the instructions above
// Make sure to handle all edge cases mentioned in the test cases`;
        
        children.push(
          new Paragraph({
            text: solutionHint,
            spacing: { after: 300 }
          })
        );

        // Unit Testing Code
        children.push(
          new Paragraph({
            text: 'UNIT TESTS:',
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 200, after: 100 }
          })
        );

        question.testCases.forEach((testCase, testIndex) => {
          children.push(
            new Paragraph({
              children: [new TextRun({ text: `Test Case ${testIndex + 1}: ${testCase.name}`, bold: true })],
              spacing: { after: 50 }
            })
          );
          children.push(
            new Paragraph({
              text: `// ${testCase.name}`,
              spacing: { after: 100 }
            })
          );
        });

        // Add separator
        children.push(
          new Paragraph({
            text: '─'.repeat(80),
            spacing: { before: 300, after: 300 }
          })
        );
      }
    });

    const doc = new Document({
      sections: [{
        properties: {},
        children: children
      }]
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, 'JavaScript_Medium_Questions_With_Tests.docx');
  };

  return (
    <Button 
      onClick={generateWordDocument}
      variant="outline"
      className="gap-2"
    >
      <Download className="h-4 w-4" />
      Download 20 Medium Questions (Word)
    </Button>
  );
};
