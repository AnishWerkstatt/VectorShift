// filterNode.js
// Node for filtering data based on conditions

import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const FilterNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Filter"
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-input`
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-pass`,
          style: { top: '40%' }
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-fail`,
          style: { top: '60%' }
        }
      ]}
      fields={[
        {
          name: 'condition',
          label: 'Condition:',
          type: 'select',
          defaultValue: 'contains',
          options: [
            { value: 'contains', label: 'Contains' },
            { value: 'equals', label: 'Equals' },
            { value: 'startsWith', label: 'Starts With' },
            { value: 'endsWith', label: 'Ends With' }
          ]
        },
        {
          name: 'value',
          label: 'Value:',
          type: 'text',
          defaultValue: '',
          placeholder: 'Enter filter value'
        }
      ]}
      style={{ backgroundColor: '#fce4ec', borderColor: '#e91e63' }}
    />
  );
};
