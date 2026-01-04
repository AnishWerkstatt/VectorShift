// conditionalNode.js
// Node for conditional branching logic

import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const ConditionalNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Conditional"
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-condition`,
          style: { top: '30%' }
        },
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-value`,
          style: { top: '70%' }
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-true`,
          style: { top: '40%' }
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-false`,
          style: { top: '60%' }
        }
      ]}
      fields={[
        {
          name: 'operator',
          label: 'Operator:',
          type: 'select',
          defaultValue: '==',
          options: [
            { value: '==', label: 'Equals (==)' },
            { value: '!=', label: 'Not Equals (!=)' },
            { value: '>', label: 'Greater Than (>)' },
            { value: '<', label: 'Less Than (<)' },
            { value: '>=', label: 'Greater or Equal (>=)' },
            { value: '<=', label: 'Less or Equal (<=)' }
          ]
        }
      ]}
      style={{ backgroundColor: '#fff9c4', borderColor: '#fbc02d' }}
    />
  );
};
