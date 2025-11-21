function RulesInput({ rules, onRulesChange }) {
  
    const handleRuleChange = (index, value) => {
      const newRules = [...rules];
      newRules[index] = value;
      onRulesChange(newRules);
    };
  
    return (
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
          Enter 3 Rules to Check:
        </label>
        
        {rules.map((rule, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder={`Rule ${index + 1}: e.g., Document must mention a date`}
              value={rule}
              onChange={(e) => handleRuleChange(index, e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '14px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
          </div>
        ))}
      </div>
    );
}
  
export default RulesInput;