const pdfService = require('../services/pdfService');
const llmService = require('../services/llmService');

const checkDocument = async (req, res) => {
  try {
    // Extract text from PDF
    console.log('📄 Extracting text from PDF...');
    const documentText = await pdfService.extractTextFromPDF(req.file.buffer);

    if (!documentText || documentText.trim().length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'Could not extract text from PDF. The PDF might be empty or image-based.' 
      });
    }

    console.log(`✅ Extracted ${documentText.length} characters from PDF`);

    // Analyze with LLM
    console.log('🤖 Analyzing document with LLM...');
    const results = await llmService.analyzeDocument(documentText, req.parsedRules);
    console.log('✅ Analysis complete!');

    // Send response
    res.json({
      success: true,
      filename: req.file.originalname,
      results: results
    });

  } catch (error) {
    console.error('❌ Error in checkDocument:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

module.exports = {
  checkDocument
};
