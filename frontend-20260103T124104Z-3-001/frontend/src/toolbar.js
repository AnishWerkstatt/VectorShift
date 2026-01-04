// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ 
            padding: '15px', 
            backgroundColor: '#f5f5f5', 
            borderBottom: '2px solid #ddd',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <h3 style={{ margin: '0 0 12px 0', color: '#333', fontSize: '16px' }}>Node Palette</h3>
            <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '10px' 
            }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='transform' label='Transform' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='api' label='API Request' />
                <DraggableNode type='conditional' label='Conditional' />
                <DraggableNode type='aggregator' label='Aggregator' />
            </div>
        </div>
    );
};
