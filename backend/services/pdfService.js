const pdfParse = require('pdf-parse');

//  Extract text from PDF buffer
//  @param {Buffer} pdfBuffer - PDF file buffer from multer
//  @returns {Promise<string>} - Extracted text
 
const extractTextFromPDF = async (pdfBuffer) => {
    try {
      // Add options to handle problematic PDFs
      const data = await pdfParse(pdfBuffer, {
        max: 0, // Parse all pages
        version: 'v2.0.550', // Use specific version
        pagerender: async (pageData) => {
            // Render each page with page number marker
            const textContent = await pageData.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            const pageNum = pageData.pageIndex + 1;
            // Make page markers VERY clear
            return `\n\n========== START OF PAGE ${pageNum} ==========\n${pageText}\n========== END OF PAGE ${pageNum} ==========\n\n`;
        }
      });
      
      // Clean the extracted text
      const cleanedText = data.text
        .replace(/\0/g, '') // Remove null characters
        .replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '') // Remove control characters
        .trim();
      
      return cleanedText;
    } catch (error) {
      console.error('PDF Parse Error:', error);
      
      // Fallback: Try with different options
      try {
        const data = await pdfParse(pdfBuffer, {
          max: 0,
          pagerender: async (pageData) => {
            // Render each page with page number marker
            const textContent = await pageData.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            const pageNum = pageData.pageIndex + 1;
            // Make page markers VERY clear
            return `\n\n========== START OF PAGE ${pageNum} ==========\n${pageText}\n========== END OF PAGE ${pageNum} ==========\n\n`;
        }
        });

        const cleanedText = data.text
          .replace(/\0/g, '')
          .replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '')
          .trim();
        
        return cleanedText;
      } catch (fallbackError) {
        throw new Error('Failed to extract text from PDF.');
      }
    }
};

module.exports = {
    extractTextFromPDF
};