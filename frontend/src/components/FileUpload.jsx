function FileUpload({ onFileSelect, selectedFile }) {
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      
      // Check if file is PDF
      if (file && file.type === 'application/pdf') {
        onFileSelect(file);
      } else {
        alert('Please select a PDF file only!');
        e.target.value = null;
      }
    };
  
    return (
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
          Upload PDF Document:
        </label>
        <input 
          type="file" 
          accept=".pdf"
          onChange={handleFileChange}
          style={{ padding: '10px' }}
        />
        {selectedFile && (
          <p style={{ marginTop: '10px', color: 'green' }}>
            ✅ Selected: {selectedFile.name}
          </p>
        )}
      </div>
    );
}
  
export default FileUpload;