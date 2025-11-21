// middlewares/documentValidation.js
const validateDocumentUpload = (req, res, next) => {
    // 1. Check if PDF is uploaded
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        error: 'No PDF file uploaded' 
      });
    }
  
    // 2. Validate rules
    let rules;
    try {
      rules = JSON.parse(req.body.rules);
    } catch (error) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid rules format. Rules must be a JSON array.' 
      });
    }
  
    if (!rules || !Array.isArray(rules) || rules.length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please provide at least one rule' 
      });
    }
  
    if (rules.length > 10) {
      return res.status(400).json({ 
        success: false, 
        error: 'Maximum 10 rules allowed' 
      });
    }
  
    // Attach parsed rules to req for use in controller
    req.parsedRules = rules;
  
    next();
};
  
module.exports = {
 validateDocumentUpload
};
  