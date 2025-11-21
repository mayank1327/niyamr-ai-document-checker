import { useState } from 'react'
import FileUpload from './components/FileUpload'
import RulesInput from './components/RulesInput'
import ResultsTable from './components/ResultsTable'
import ErrorMessage from './components/ErrorMessage'
import { validatePdfFile, validateRules } from './utils/validation'
import { checkDocument } from './services/api'
import './App.css'

function App() {
  // State
  const [pdfFile, setPdfFile] = useState(null);
  const [rules, setRules] = useState(['', '', '']);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  // Handlers
  const handleFileSelect = (file) => {
    setPdfFile(file);
    setError(null);
  };

  const handleRulesChange = (newRules) => {
    setRules(newRules);
  };

  const handleCheckDocument = async () => {
    // Clear previous results and errors
    setError(null);
    setResults(null);

    // Validate PDF
    const fileValidation = validatePdfFile(pdfFile);
    if (!fileValidation.isValid) {
      setError(fileValidation.error);
      return;
    }

    // Validate Rules
    const rulesValidation = validateRules(rules);
    if (!rulesValidation.isValid) {
      setError(rulesValidation.error);
      return;
    }

    // Call API
    setLoading(true);
    const response = await checkDocument(pdfFile, rulesValidation.filledRules);
    setLoading(false);

    if (response.success) {
      setResults(response.data.results);
    } else {
      setError(response.error);
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  // Render UI
  return (
    <div className="app-container">
      <h1 className="app-title">NIYAMR AI - Document Checker</h1>
       
  
      <ErrorMessage message={error} onClose={handleCloseError} />
      

      <FileUpload 
        onFileSelect={handleFileSelect}
        selectedFile={pdfFile}
      />

      <RulesInput 
        rules={rules}
        onRulesChange={handleRulesChange}
      />

      <button
        onClick={handleCheckDocument}
        disabled={loading}
        className="check-button"
      >
        {loading ? 'Checking...' : 'Check Document'}
      </button>
      
      
      <ResultsTable results={results} />
    </div>
  )
}

export default App
