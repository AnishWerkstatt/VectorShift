// apiNode.js
// Node for making API requests

import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const APINode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="API Request"
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-url`,
          style: { top: '33%' }
        },
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-body`,
          style: { top: '66%' }
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-response`
        }
      ]}
      fields={[
        {
          name: 'method',
          label: 'Method:',
          type: 'select',
          defaultValue: 'GET',
          options: [
            { value: 'GET', label: 'GET' },
            { value: 'POST', label: 'POST' },
            { value: 'PUT', label: 'PUT' },
            { value: 'DELETE', label: 'DELETE' }
          ]
        },
        {
          name: 'endpoint',
          label: 'Endpoint:',
          type: 'text',
          defaultValue: '',
          placeholder: 'https://api.example.com'
        }
      ]}
      style={{ backgroundColor: '#e8eaf6', borderColor: '#3f51b5' }}
    />
  );
};
