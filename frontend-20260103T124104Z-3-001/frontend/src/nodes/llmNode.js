// llmNode.js

import { useState } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';

export const LLMNode = ({ id, data }) => {
  const { deleteElements } = useReactFlow();
  const [systemPrompt, setSystemPrompt] = useState(data?.systemPrompt || '');
  const [userPrompt, setUserPrompt] = useState(data?.userPrompt || '');

  const handleDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };

  const containerStyle = {
    backgroundColor: '#f3e5f5',
    border: '1px solid #9c27b0',
    borderRadius: '12px',
    padding: '0',
    minWidth: '200px',
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

  const contentStyle = {
    padding: '12px'
  };

  const labelStyle = {
    fontSize: '11px',
    color: '#666',
    marginBottom: '4px',
    display: 'block',
    fontWeight: '500'
  };

  const textareaStyle = {
    width: '100%',
    minHeight: '50px',
    padding: '8px 10px',
    border: '1px solid #9c27b0',
    borderRadius: '6px',
    fontSize: '12px',
    fontFamily: 'monospace',
    resize: 'vertical',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    color: '#333',
    outline: 'none',
    marginBottom: '10px'
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

  const handleLabelStyle = {
    position: 'absolute',
    fontSize: '10px',
    color: '#666',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '2px 6px',
    borderRadius: '3px',
    border: '1px solid #ddd'
  };

  return (
    <div style={containerStyle}>
      {/* System Handle */}
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-system`}
        style={{ 
          top: '33%',
          width: '12px',
          height: '12px',
          border: '2px solid #9c27b0',
          background: '#fff',
          boxShadow: '0 0 0 1px rgba(156, 39, 176, 0.3)'
        }}
      />
      <div style={{...handleLabelStyle, left: '-70px', top: '33%', transform: 'translateY(-50%)'}}>
        System
      </div>

      {/* Prompt Handle */}
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-prompt`}
        style={{ 
          top: '66%',
          width: '12px',
          height: '12px',
          border: '2px solid #9c27b0',
          background: '#fff',
          boxShadow: '0 0 0 1px rgba(156, 39, 176, 0.3)'
        }}
      />
      <div style={{...handleLabelStyle, left: '-70px', top: '66%', transform: 'translateY(-50%)'}}>
        Prompt
      </div>

      {/* Response Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-response`}
        style={{
          width: '12px',
          height: '12px',
          border: '2px solid #9c27b0',
          background: '#fff',
          boxShadow: '0 0 0 1px rgba(156, 39, 176, 0.3)'
        }}
      />
      <div style={{...handleLabelStyle, right: '-80px', top: '50%', transform: 'translateY(-50%)'}}>
        Response
      </div>

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
        <span>LLM</span>
      </div>
      
      <div style={contentStyle}>
        <div>
          <label style={labelStyle}>System Prompt:</label>
          <textarea
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            style={textareaStyle}
            placeholder="Enter system prompt..."
          />
        </div>
        
        <div>
          <label style={labelStyle}>User Prompt:</label>
          <textarea
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            style={textareaStyle}
            placeholder="Enter user prompt..."
          />
        </div>
      </div>
    </div>
  );
}
