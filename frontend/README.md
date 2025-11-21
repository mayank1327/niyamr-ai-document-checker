# Frontend - NIYAMR AI Document Checker

React-based frontend application for document validation.

## 🛠️ Tech Stack

- React 18
- Vite
- Axios
- CSS3

## 📦 Installation
```bash
npm install
```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
Runs on `http://localhost:5173`


## 📁 Project Structure
```
src/
├── components/          # React components
│   ├── FileUpload.jsx   # PDF upload component
│   ├── RulesInput.jsx   # Rules input fields
│   ├── ResultsTable.jsx # Results display table
│   └── ErrorMessage.jsx # Error display component
├── services/
│   └── api.js          # API integration
├── utils/
│   └── validation.js   # Input validation logic
├── App.jsx             # Main application component
├── App.css             # Styles
└── main.jsx            # Entry point
```

## 🔧 Configuration

Update API base URL in `src/services/api.js` if backend runs on different port:
```javascript
const API_BASE_URL = 'http://localhost:3000/api';
```

## ✨ Features

- File upload with validation (PDF only, max 10MB)
- Dynamic rule input (3 rules)
- Real-time error feedback
- Loading states
- Responsive results table with color-coded pass/fail
- Clean, modern UI

## 🎨 Components

### FileUpload
Handles PDF file selection and validation

### RulesInput
Manages 3 text input fields for custom rules

### ResultsTable
Displays analysis results in formatted table

### ErrorMessage
Shows error messages with dismiss option
