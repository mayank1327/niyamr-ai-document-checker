
// Validate PDF file
export const validatePdfFile = (file) => {
    if (!file) {
      return { isValid: false, error: 'Please upload a PDF file!' };
    }
    
    if (file.type !== 'application/pdf') {
      return { isValid: false, error: 'Please select a valid PDF file!' };
    }
    
    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return { isValid: false, error: 'PDF file size must be less than 10MB!' };
    }
    
    return { isValid: true, error: null };
};
  
// Validate rules
export const validateRules = (rules) => {
    const filledRules = rules.filter(rule => rule.trim() !== '');
    
    if (filledRules.length === 0) {
      return { isValid: false, error: 'Please enter at least one rule!', filledRules: [] };
    }
    
    return { isValid: true, error: null, filledRules };
};