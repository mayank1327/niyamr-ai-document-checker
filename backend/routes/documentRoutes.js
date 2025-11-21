const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const upload = require('../config/multerConfig');
const { validateDocumentUpload } = require('../middlewares/documentValidation');

// POST -> Upload PDF and check against rules
router.post('/check-document', 
upload.single('pdf'), 
validateDocumentUpload,
documentController.checkDocument);

module.exports = router;