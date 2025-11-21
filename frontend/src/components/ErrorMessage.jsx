function ErrorMessage({ message, onClose }) {
  
    if (!message) return null;
  
    return (
      <div style={{
        backgroundColor: '#ffebee',
        border: '1px solid #f44336',
        borderRadius: '4px',
        padding: '12px 16px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
      <span style={{ color: '#c62828' }}>❌ {message}</span>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
              color: '#c62828'
            }}
          >
          ×
          </button>
        )}
      </div>
    );
}
  
export default ErrorMessage;