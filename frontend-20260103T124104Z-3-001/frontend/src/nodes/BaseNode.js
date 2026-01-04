// BaseNode.js
// Abstraction for creating custom nodes with shared styling and structure

import { useState, useEffect } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';

export const BaseNode = ({ 
  id, 
  data, 
  title,
  handles = [],
  fields = [],
  style = {},
  showDefaultOutput = false,
}) => {
  const { deleteElements } = useReactFlow();
  const [fieldValues, setFieldValues] = useState({});

  useEffect(() => {
    // Initialize field values from data or defaults
    const initialValues = {};
    fields.forEach(field => {
      initialValues[field.name] = data?.[field.name] || field.defaultValue || '';
    });
    setFieldValues(initialValues);
  }, [data, fields]);

  const handleFieldChange = (fieldName, value) => {
    setFieldValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };

  const baseStyle = {
    backgroundColor: '#2a2a2a',
    border: '1px solid #444',
    borderRadius: '12px',
    padding: '0',
    minWidth: '200px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    overflow: 'hidden',
    ...style
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

  const fieldContainerStyle = {
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  };

  const labelStyle = {
    fontSize: '11px',
    color: '#999',
    marginBottom: '4px',
    fontWeight: '500'
  };

  const inputStyle = {
    width: '100%',
    padding: '8px 10px',
    border: '1px solid #444',
    borderRadius: '6px',
    fontSize: '12px',
    boxSizing: 'border-box',
    backgroundColor: '#1a1a1a',
    color: '#fff',
    outline: 'none'
  };

  const selectStyle = {
    ...inputStyle,
    cursor: 'pointer',
    appearance: 'none',
    backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'white\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 8px center',
    backgroundSize: '16px',
    paddingRight: '32px'
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
    <div style={{ ...baseStyle, position: 'relative' }}>
      {/* Render handles */}
      {handles.map((handle, index) => (
        <Handle
          key={`${handle.type}-${handle.id || index}`}
          type={handle.type}
          position={handle.position || (handle.type === 'target' ? Position.Left : Position.Right)}
          id={handle.id || `${id}-${handle.type}-${index}`}
          style={{
            width: '12px',
            height: '12px',
            border: '2px solid #2a2a2a',
            background: '#fff',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.2)',
            ...handle.style
          }}
        />
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

      {/* Title */}
      <div style={titleStyle}>
        <span>{title}</span>
      </div>

      {/* Fields */}
      <div style={fieldContainerStyle}>
        {fields.map((field, index) => (
          <div key={field.name || index} style={{ width: '100%' }}>
            {field.label && (
              <div style={labelStyle}>{field.label}</div>
            )}
            {field.type === 'select' ? (
              <select
                value={fieldValues[field.name] || ''}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                style={selectStyle}
              >
                {field.options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea
                value={fieldValues[field.name] || ''}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                style={{ ...inputStyle, minHeight: '60px', resize: 'vertical', fontFamily: 'inherit' }}
                placeholder={field.placeholder}
              />
            ) : (
              <input
                type={field.type || 'text'}
                value={fieldValues[field.name] || ''}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                style={inputStyle}
                placeholder={field.placeholder}
              />
            )}
          </div>
        ))}
      </div>

      {/* Default output handle */}
      {showDefaultOutput && (
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
      )}
    </div>
  );
};
