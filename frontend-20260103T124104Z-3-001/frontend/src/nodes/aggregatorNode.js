// aggregatorNode.js
// Node for aggregating multiple inputs

import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const AggregatorNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Aggregator"
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-input1`,
          style: { top: '25%' }
        },
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-input2`,
          style: { top: '50%' }
        },
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-input3`,
          style: { top: '75%' }
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
          defaultValue: 'concat',
          options: [
            { value: 'concat', label: 'Concatenate' },
            { value: 'merge', label: 'Merge' },
            { value: 'sum', label: 'Sum' },
            { value: 'average', label: 'Average' }
          ]
        },
        {
          name: 'separator',
          label: 'Separator:',
          type: 'text',
          defaultValue: ', ',
          placeholder: 'Separator (for concat)'
        }
      ]}
      style={{ backgroundColor: '#f1f8e9', borderColor: '#8bc34a' }}
    />
  );
};
