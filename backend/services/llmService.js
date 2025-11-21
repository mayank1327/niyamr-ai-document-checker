const Groq = require('groq-sdk');

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

/**
 * Analyze document with LLM based on rules
 * @param {string} documentText - Extracted PDF text
 * @param {Array<string>} rules - Array of rules to check
 * @returns {Promise<Array>} - Analysis results
 */

const analyzeDocument = async (documentText, rules) => {
  try {
    // Create prompt for LLM
    const prompt = createPrompt(documentText, rules);

    // Call Groq API
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a document analyzer. Respond ONLY with valid JSON, no extra text.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: 'llama-3.3-70b-versatile', // Fast and free model
      temperature: 0.3, // Lower temperature for more consistent results
      max_tokens: 2000
    });

    // Extract response
    const responseText = completion.choices[0].message.content;
    
    // Parse JSON response
    const parsedResponse = parseGroqResponse(responseText);
    
    return parsedResponse;

  } catch (error) {
    throw new Error('Failed to analyze document with LLM: ' + error.message);
  }
};

// Create prompt for LLM
const createPrompt = (documentText, rules) => {
  return `You are a document analyzer. Analyze the following document against the given rules.
  
  DOCUMENT TEXT:
  ${documentText.substring(0, 8000)} 
  
  RULES TO CHECK:
  ${rules.map((rule, index) => `${index + 1}. ${rule}`).join('\n')}
  
  For EACH rule, you must respond in this EXACT JSON format:
  {
    "results": [
      {
        "rule": "exact rule text here",
        "status": "pass or fail",
        "evidence": "Found in page X: 'exact quote from document'",
        "reasoning": "brief explanation of why it passed or failed",
        "confidence": number between 0-100
      }
    ]
  }
  
   FORMATTING REQUIREMENTS:
   - The document text includes page markers like "--- PAGE 1 ---", "--- PAGE 2 ---" etc.
   - Evidence MUST start with "Found in page X:" where X is the ACTUAL page number from the document
   - Look for the page marker before the text you're quoting
   - Quote the EXACT text from the document, including any section headers
   - Status must be lowercase: "pass" or "fail"
   - Confidence must be a realistic number between 0-100 (not always 100)
  
  IMPORTANT:
  - Respond ONLY with valid JSON
  - Include all ${rules.length} rules in results array
  - No markdown, no code blocks, just pure JSON`;
};

// Parse Groq response and extract JSON
const parseGroqResponse = (responseText) => {
  try {
    // Remove markdown code blocks if present
    let cleanedText = responseText.trim();
    
    // Remove ```json and ``` if present
    cleanedText = cleanedText.replace(/```json\n?/g, '');
    cleanedText = cleanedText.replace(/```\n?/g, '');
    cleanedText = cleanedText.trim();

    // Parse JSON
    const parsed = JSON.parse(cleanedText);
    
    // Validate structure
    if (!parsed.results || !Array.isArray(parsed.results)) {
      throw new Error('Invalid response structure');
    }

    return parsed.results;

  } catch (error) {
    throw new Error('Failed to parse LLM response: ' + error.message);
  }
};

module.exports = {
  analyzeDocument
};