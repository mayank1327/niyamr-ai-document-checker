function ResultsTable({ results }) {
  
    if (!results || results.length === 0) {
      return null;
    }
  
    return (
      <div style={{ marginTop: '30px' }}>
        <h2>Results:</h2>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={tableHeaderStyle}>Rule</th>
              <th style={tableHeaderStyle}>Status</th>
              <th style={tableHeaderStyle}>Evidence</th>
              <th style={tableHeaderStyle}>Reasoning</th>
              <th style={tableHeaderStyle}>Confidence</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={tableCellStyle}>{result.rule}</td>
                <td style={{
                  ...tableCellStyle,
                  fontWeight: 'bold',
                  color: result.status === 'pass' ? '#4CAF50' : '#f44336'
                }}>
                  {result.status === 'pass' ? '✅ PASS' : '❌ FAIL'}
                </td>
                <td style={tableCellStyle}>{result.evidence}</td>
                <td style={tableCellStyle}>{result.reasoning}</td>
                <td style={tableCellStyle}>{result.confidence}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
  
const tableHeaderStyle = {
    padding: '12px',
    textAlign: 'left',
    fontWeight: 'bold',
    borderBottom: '2px solid #ddd'
};
  
const tableCellStyle = {
    padding: '12px',
    textAlign: 'left'
};
  
export default ResultsTable;