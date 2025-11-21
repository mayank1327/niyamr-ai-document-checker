# Backend - NIYAMR AI Document Checker

Node.js/Express API for PDF document analysis using LLM.

## 🛠️ Tech Stack

- Node.js
- Express.js
- Multer (file uploads)
- pdf-parse (PDF text extraction)
- Groq SDK (LLM integration)
- dotenv (environment variables)

## 📦 Installation
```bash
npm install
```

## 🔑 Environment Setup

Create a `.env` file in the backend folder:
```env
GROQ_API_KEY=your_groq_api_key_here
PORT=3000
```

### Getting Groq API Key

1. Visit https://console.groq.com
2. Sign up for free account
3. Create API key
4. Copy and paste into `.env` file

## 🚀 Running the Server
```bash
node server.js
```

Server runs on `http://localhost:3000`

## 📁 Project Structure
```
backend/
├── config/
│   └── multerConfig.js      # File upload configuration
├── controllers/
│   └── documentController.js # Request handlers
├── services/
│   ├── pdfService.js        # PDF text extraction
│   └── llmService.js        # LLM API integration
├── routes/
│   └── documentRoutes.js    # API routes
├── .env                     # Environment variables (not in git)
├── .gitignore              
├── server.js               # Main entry point
└── package.json
```

## 🔌 API Endpoints

### Health Check
```
GET /
```

**Response:**
```json
{
  "message": "NIYAMR AI Backend is running!",
  "status": "success"
}
```

### Check Document
```
POST /api/check-document
```

**Request:**
- Content-Type: `multipart/form-data`
- Body:
  - `pdf` (file): PDF document
  - `rules` (string): JSON array of rules


**Success Response:**
```json
{
  "success": true,
  "filename": "document.pdf",
  "results": [
    {
      "rule": "Document must mention a date",
      "status": "pass",
      "evidence": "Found in page 2: 'Published: January 2025'",
      "reasoning": "Document contains specific publication date",
      "confidence": 95
    }
  ]
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message here"
}
```

## 🏗️ Architecture

### MVC Pattern

**Routes** → **Controllers** → **Services**

- **Routes**: Define API endpoints
- **Controllers**: Handle requests/responses, validation
- **Services**: Business logic (PDF extraction, LLM calls)

### Service Layer

**pdfService.js**
- Extracts text from PDF with page numbers
- Handles PDF parsing errors
- Returns cleaned text

**llmService.js**
- Creates prompts for Groq LLM
- Sends requests to Groq API
- Parses and validates LLM responses

## 🔧 Configuration

### File Upload Limits
- Max file size: 10MB
- Allowed types: PDF only

Edit in `config/multerConfig.js`

### LLM Model
Currently using: `llama-3.1-70b-versatile`

Change in `services/llmService.js`:
```javascript
model: 'llama-3.1-70b-versatile'
```

## 🐛 Error Handling

All errors are caught and returned as JSON:
```json
{
  "success": false,
  "error": "Descriptive error message"
}
```

## 📝 Logging

Console logs for debugging:
- PDF extraction progress
- LLM analysis status
- Error messages

## 🔒 Security

- CORS enabled for frontend communication
- File type validation
- File size limits
- API key stored in environment variables
- No file persistence (files stored in memory only)
