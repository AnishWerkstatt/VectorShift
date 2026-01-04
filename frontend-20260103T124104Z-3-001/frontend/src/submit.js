// submit.js

import { useStore } from './store';

export const SubmitButton = () => {
    const nodes = useStore(state => state.nodes);
    const edges = useStore(state => state.edges);

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            // Display styled alert with the results
            const icon = data.is_dag ? '✓' : '⚠';
            const status = data.is_dag ? 'VALID DAG' : 'CONTAINS CYCLES';
            const message = `${icon} PIPELINE ANALYSIS COMPLETE\n` +
                          `${'='.repeat(40)}\n\n` +
                          `📊 Number of Nodes: ${data.num_nodes}\n` +
                          `🔗 Number of Edges: ${data.num_edges}\n` +
                          `${data.is_dag ? '✓' : '⚠'} Status: ${status}\n\n` +
                          `${'='.repeat(40)}\n\n` +
                          (data.is_dag ? 
                            '✓ Success! This is a valid Directed Acyclic Graph.\nYour pipeline structure is correct.' : 
                            '⚠ Warning! This graph contains cycles.\nPlease remove circular dependencies.');
            
            alert(message);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert(`Error submitting pipeline: ${error.message}`);
        }
    };

    return (
        <div style={{
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '16px',
            backgroundColor: '#f5f5f5',
            borderTop: '2px solid #ddd'
        }}>
            <button 
                type="button"
                onClick={handleSubmit}
                style={{
                    backgroundColor: '#4caf50',
                    color: 'white',
                    padding: '12px 32px',
                    fontSize: '16px',
                    fontWeight: '600',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#45a049';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#4caf50';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
                }}
            >
                Submit Pipeline
            </button>
        </div>
    );
}
