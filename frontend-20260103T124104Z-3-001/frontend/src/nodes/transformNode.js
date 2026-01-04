// transformNode.js
// Node for data transformation operations

import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const TransformNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Transform"
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-input`
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-output`
        }
      ]}
      fields={[
        {
          name: 'operation',
          label: 'Operation:',
          type: 'select',
          defaultValue: 'uppercase',
          options: [
            { value: 'uppercase', label: 'Uppercase' },
            { value: 'lowercase', label: 'Lowercase' },
            { value: 'reverse', label: 'Reverse' },
            { value: 'trim', label: 'Trim' }
          ]
        }
      ]}
      style={{ backgroundColor: '#e1f5fe', borderColor: '#03a9f4' }}
    />
  );
};
