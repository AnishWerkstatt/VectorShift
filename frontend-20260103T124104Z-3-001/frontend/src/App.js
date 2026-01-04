import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        backgroundColor: '#1976d2',
        color: 'white',
        padding: '16px 24px',
        fontSize: '24px',
        fontWeight: '600',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
      }}>
        VectorShift Pipeline Builder
      </div>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;
