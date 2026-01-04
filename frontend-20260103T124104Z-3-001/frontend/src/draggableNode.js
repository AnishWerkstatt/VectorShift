// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{ 
          cursor: 'grab', 
          minWidth: '100px', 
          height: '50px',
          display: 'flex', 
          alignItems: 'center', 
          borderRadius: '6px',
          backgroundColor: '#2c3e50',
          justifyContent: 'center', 
          flexDirection: 'column',
          padding: '8px 12px',
          border: '2px solid transparent',
          transition: 'all 0.2s ease',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }} 
        draggable
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#34495e';
          e.target.style.borderColor = '#3498db';
          e.target.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#2c3e50';
          e.target.style.borderColor = 'transparent';
          e.target.style.transform = 'translateY(0)';
        }}
      >
          <span style={{ color: '#ecf0f1', fontWeight: '500', fontSize: '13px' }}>{label}</span>
      </div>
    );
  };
  