# NIYAMR AI - Document Checker

A full-stack web application that analyzes PDF documents against custom rules using AI/LLM technology.

## 📸 Demo

![Application Demo](./screenshots/screenshot1.png)
![Application Demo](./screenshots/screenshot2.png)
![Application Demo](./screenshots/screenshot3.png)
![Application Demo](./screenshots/screenshot4.png)

## 🎯 Features

- **PDF Upload**: Upload any PDF document (up to 10MB)
- **Custom Rules**: Define up to 3 validation rules in natural language
- **AI-Powered Analysis**: Uses Groq LLM (Llama 3.1) to intelligently analyze documents
- **Detailed Results**: Get pass/fail status with:
  - Evidence from specific page numbers
  - Reasoning for each decision
  - Confidence scores (0-100%)
- **Clean UI**: Responsive React interface with real-time feedback

## 🛠️ Tech Stack

### Frontend
- React 18 with Vite
- Axios for API calls
- Modern CSS styling

### Backend
- Node.js with Express
- Multer for file uploads
- pdf-parse for PDF text extraction
- Groq SDK for LLM integration

## 📁 Project Structure
```
niyamr-assignment/
├── frontend/           # React frontend application
├── backend/            # Node.js backend API
├── screenshots/        # Application screenshots
└── README.md          # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Groq API key (free at https://console.groq.com)

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd niyamr-assignment
```

2. **Setup Backend**
```bash
cd backend
npm install
```

Create `.env` file in backend folder:
```
GROQ_API_KEY=your_groq_api_key_here
```

Start backend server:
```bash
node server.js
```
Backend runs on `http://localhost:3000`

3. **Setup Frontend**
```bash
cd ../frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

## 📖 Usage

1. Open `http://localhost:5173` in your browser
2. Click "Choose File" and upload a PDF document
3. Enter 3 rules in natural language (e.g., "Document must mention a date")
4. Click "Check Document"
5. View results with pass/fail status, evidence, and confidence scores

## 🏗️ Architecture

### Backend Flow
```
PDF Upload → Text Extraction → LLM Analysis → Results
```

### Key Components

**Backend:**
- `controllers/` - Request handlers
- `services/` - Business logic (PDF processing, LLM calls)
- `routes/` - API endpoints
- `config/` - Configuration (Multer setup)

**Frontend:**
- `components/` - Reusable UI components
- `services/` - API integration
- `utils/` - Validation logic

## 🔑 API Endpoints

### POST `/api/check-document`

**Request:**
- `pdf` (file): PDF document
- `rules` (JSON array): Array of rule strings

**Response:**
```json
{
  "success": true,
  "filename": "document.pdf",
  "results": [
    {
      "rule": "Document must mention a date",
      "status": "pass",
      "evidence": "Found in page 2: 'Published: January 2025'",
      "reasoning": "Document contains specific date",
      "confidence": 95
    }
  ]
}
```

## 🎨 Features Highlight

- ✅ Clean MVC architecture
- ✅ Proper error handling with UI feedback
- ✅ Input validation on both frontend and backend
- ✅ Page-accurate evidence extraction
- ✅ Responsive design
- ✅ Loading states and user feedback

