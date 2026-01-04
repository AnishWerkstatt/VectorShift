// textNode.js

import { useState, useEffect, useRef } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 200, height: 100 });
  const textareaRef = useRef(null);
  const { deleteElements } = useReactFlow();

  const handleDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };

  // Extract variables from text (e.g., {{variable_name}})
  useEffect(() => {
    const variablePattern = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g;
    const matches = [...currText.matchAll(variablePattern)];
    const foundVars = [...new Set(matches.map(match => match[1]))];
    setVariables(foundVars);
  }, [currText]);

  // Dynamic sizing based on text content
  useEffect(() => {
    if (textareaRef.current) {
      const scrollHeight = textareaRef.current.scrollHeight;
      const lineCount = currText.split('\n').length;
      const textLength = currText.length;
      
      // Calculate dynamic width (min 200, max 500)
      const newWidth = Math.min(Math.max(200, textLength * 2 + 100), 500);
      
      // Calculate dynamic height (min 100)
      const newHeight = Math.max(100, scrollHeight + 60, lineCount * 20 + 80);
      
      setDimensions({ width: newWidth, height: newHeight });
    }
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const containerStyle = {
    width: dimensions.width,
    minHeight: dimensions.height,
    backgroundColor: '#2a2a2a',
    border: '1px solid #444',
    borderRadius: '12px',
    padding: '0',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    position: 'relative',
    overflow: 'hidden'
  };

  const titleStyle = {
    fontWeight: '600',
    fontSize: '13px',
    color: '#ffffff',
    padding: '12px 14px',
    margin: '0',
    backgroundColor: '#333',
    borderBottom: '1px solid #444',
    textAlign: 'left'
  };

  const textareaStyle = {
    width: '100%',
    minHeight: '60px',
    padding: '8px 10px',
    border: '1px solid #444',
    borderRadius: '6px',
    fontSize: '12px',
    fontFamily: 'monospace',
    resize: 'none',
    boxSizing: 'border-box',
    backgroundColor: '#1a1a1a',
    color: '#fff',
    outline: 'none'
  };

  const labelStyle = {
    fontSize: '11px',
    color: '#999',
    marginBottom: '4px',
    display: 'block',
    fontWeight: '500'
  };

  const handleLabelStyle = {
    position: 'absolute',
    left: '-60px',
    fontSize: '10px',
    color: '#999',
    fontWeight: '500',
    whiteSpace: 'nowrap'
  };

  const contentStyle = {
    padding: '12px'
  };

  const deleteButtonStyle = {
    position: 'absolute',
    top: '8px',
    right: '8px',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: '#444',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0',
    lineHeight: '1',
    zIndex: 10,
    transition: 'all 0.2s ease'
  };

  return (
    <div style={{ ...containerStyle, position: 'relative' }}>
      {/* Dynamic handles for variables */}
      {variables.map((variable, index) => (
        <div key={`var-${variable}`} style={{ position: 'relative' }}>
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-${variable}`}
            style={{ 
              top: `${30 + (index + 1) * (60 / (variables.length + 1))}%`,
              width: '12px',
              height: '12px',
              border: '2px solid #2a2a2a',
              background: '#fff',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.2)'
            }}
          />
          <div style={{
            ...handleLabelStyle,
            top: `${30 + (index + 1) * (60 / (variables.length + 1))}%`,
            transform: 'translateY(-50%)'
          }}>
            {variable}
          </div>
        </div>
      ))}

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        style={deleteButtonStyle}
        title="Delete node"
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#ff4444';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#444';
        }}
      >
        ×
      </button>

      <div style={titleStyle}>
        <span>Text</span>
      </div>
      
      <div style={contentStyle}>
        <div style={labelStyle}>
          Text:
        </div>
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          style={textareaStyle}
          placeholder="Enter text with variables like {{variable_name}}"
        />
      </div>

      {variables.length > 0 && (
        <div style={{ fontSize: '10px', color: '#666', padding: '0 12px 8px', marginTop: '-4px' }}>
          Variables: {variables.join(', ')}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{
          width: '12px',
          height: '12px',
          border: '2px solid #2a2a2a',
          background: '#fff',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.2)'
        }}
      />
    </div>
  );
}
