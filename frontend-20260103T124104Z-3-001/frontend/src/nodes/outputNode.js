// outputNode.js

import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const OutputNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-value`
        }
      ]}
      fields={[
        {
          name: 'outputName',
          label: 'Name:',
          type: 'text',
          defaultValue: id.replace('customOutput-', 'output_')
        },
        {
          name: 'outputType',
          label: 'Type:',
          type: 'select',
          defaultValue: 'Text',
          options: [
            { value: 'Text', label: 'Text' },
            { value: 'Image', label: 'Image' }
          ]
        }
      ]}
      style={{ backgroundColor: '#ffebee', borderColor: '#f44336' }}
    />
  );
}
