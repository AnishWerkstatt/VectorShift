// inputNode.js

import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const InputNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      handles={[
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-value`
        }
      ]}
      fields={[
        {
          name: 'inputName',
          label: 'Name:',
          type: 'text',
          defaultValue: id.replace('customInput-', 'input_')
        },
        {
          name: 'inputType',
          label: 'Type:',
          type: 'select',
          defaultValue: 'Text',
          options: [
            { value: 'Text', label: 'Text' },
            { value: 'Image', label: 'Image' }
          ]
        }
      ]}
      style={{ backgroundColor: '#e8f5e9', borderColor: '#4caf50' }}
    />
  );
}
