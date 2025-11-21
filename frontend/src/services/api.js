import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

 // Send PDF and rules to backend for checking
export const checkDocument = async (pdfFile, rules) => {
  try {
    const formData = new FormData();
    formData.append('pdf', pdfFile);
    formData.append('rules', JSON.stringify(rules));

    const response = await axios.post(
      `${API_BASE_URL}/check-document`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    return {
      success: true,
      data: response.data
    };

  } catch (error) {
    console.error('API Error:', error);
    
    return {
      success: false,
      error: error.response?.data?.error || error.message || 'Failed to check document'
    };
  }
};