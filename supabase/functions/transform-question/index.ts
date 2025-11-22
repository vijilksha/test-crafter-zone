import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question, difficulty, type } = await req.json();

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    let systemPrompt = '';
    
    if (difficulty === 'medium') {
      systemPrompt = `You are an expert at creating engaging scenario-based questions. 
Convert the given straightforward question into a story-based scenario that tests the same concept.
The scenario should be realistic, relatable, and engaging while maintaining the same difficulty level.
Include a brief context/scenario (2-3 sentences) followed by the question.

IMPORTANT: Return ONLY a JSON object with this exact structure:
{
  "scenario": "the scenario/story context here",
  "question": "the rephrased question here",
  "options": ["option1", "option2", "option3", "option4"] (only for multiple choice)
}

Do not include any markdown, code blocks, or additional text.`;
    } else if (difficulty === 'hard') {
      systemPrompt = `You are an expert at creating advanced challenging questions.
Transform the given question into a more complex version that:
1. Tests deeper understanding and edge cases
2. Adds constraints or time complexity considerations
3. Requires multi-step reasoning
4. Tests practical application in complex scenarios

IMPORTANT: Return ONLY a JSON object with this exact structure:
{
  "scenario": "the enhanced scenario with constraints here",
  "question": "the more challenging question here",
  "options": ["option1", "option2", "option3", "option4"] (only for multiple choice),
  "additionalConstraints": "any time limits or special conditions"
}

Do not include any markdown, code blocks, or additional text.`;
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { 
            role: 'user', 
            content: `Original Question:\n${JSON.stringify(question)}\n\nQuestion Type: ${type}\n\nTransform this into ${difficulty} difficulty format.` 
          }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), 
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Payment required. Please add credits to your workspace.' }), 
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI Gateway returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const transformedContent = data.choices[0].message.content;
    
    // Parse the JSON response
    let transformedQuestion;
    try {
      // Remove markdown code blocks if present
      const cleanContent = transformedContent.replace(/```json\n?|\n?```/g, '').trim();
      transformedQuestion = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error('Failed to parse AI response:', transformedContent);
      throw new Error('Invalid response format from AI');
    }

    return new Response(
      JSON.stringify({ transformedQuestion }), 
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in transform-question function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Unknown error occurred' }), 
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});