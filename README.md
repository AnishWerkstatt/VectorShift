# VectorShift Pipeline Builder - Technical Assessment

This application is a visual pipeline builder with drag-and-drop functionality for creating node-based workflows. It features a React frontend with ReactFlow and a FastAPI backend for pipeline analysis.

## Features Implemented

### Part 1: Node Abstraction ✅
- **BaseNode Component**: Created a flexible abstraction (`BaseNode.js`) that allows rapid creation of new nodes with minimal code
- **Key Benefits**:
  - Centralized styling and structure
  - Configurable handles (input/output connections)
  - Dynamic field rendering (text inputs, selects, textareas)
  - Consistent design across all nodes

- **Refactored Existing Nodes**:
  - InputNode - Green theme, single output
  - OutputNode - Red theme, single input
  - LLMNode - Purple theme, dual inputs, single output
  - TextNode - Enhanced with dynamic sizing and variable detection (see Part 3)

- **5 New Node Types Created**:
  1. **TransformNode** (Blue) - Data transformation operations (uppercase, lowercase, reverse, trim)
  2. **FilterNode** (Pink) - Conditional filtering with pass/fail outputs
  3. **APINode** (Indigo) - HTTP API request configuration (GET, POST, PUT, DELETE)
  4. **ConditionalNode** (Yellow) - Branching logic with comparison operators
  5. **AggregatorNode** (Green) - Combines multiple inputs with various operations

### Part 2: Styling ✅
- **Professional Design System**:
  - Color-coded nodes by category
  - Consistent border radius, shadows, and spacing
  - Smooth hover effects and transitions
  - Custom styled draggable node palette
  - Enhanced toolbar with visual hierarchy
  - Improved submit button with hover effects
  - Application header with branding

- **Visual Improvements**:
  - Clean, modern UI with Material Design inspiration
  - Custom scrollbar styling
  - Responsive layout
  - Professional typography and spacing
  - Box shadows for depth perception

### Part 3: Text Node Logic ✅
- **Dynamic Sizing**: Text node automatically adjusts width and height based on content
  - Width: 200px to 500px based on text length
  - Height: Adjusts based on number of lines and content
  
- **Variable Detection**: 
  - Automatically detects variables in `{{variable_name}}` format
  - Creates dynamic handles on the left side for each unique variable
  - Validates JavaScript variable naming conventions
  - Displays detected variables below the text area
  - Handles are positioned dynamically to avoid overlap

### Part 4: Backend Integration ✅
- **Frontend Updates**:
  - Submit button sends nodes and edges to backend via POST request
  - Fetches from `http://localhost:8000/pipelines/parse`
  - Displays user-friendly alert with analysis results
  - Error handling for network issues

- **Backend Implementation**:
  - Endpoint: `POST /pipelines/parse`
  - Calculates `num_nodes` and `num_edges`
  - Implements DAG (Directed Acyclic Graph) detection using DFS-based cycle detection
  - Returns JSON: `{num_nodes: int, num_edges: int, is_dag: bool}`
  - CORS enabled for frontend communication

## Technology Stack

### Frontend
- React 18.2
- ReactFlow 11.8.3 (visual graph editor)
- Zustand 4.4.1 (state management)
- React Scripts 5.0.1

### Backend
- Python 3.13
- FastAPI 0.104.1
- Uvicorn 0.24.0 (ASGI server)
- Pydantic 2.5.0 (data validation)

## Installation & Running

### Prerequisites
- Node.js and npm
- Python 3.8+

### Frontend Setup
```bash
cd frontend-20260103T124104Z-3-001/frontend
npm install
npm start
```
The frontend will run on http://localhost:3000

### Backend Setup
```bash
cd backend-20260103T124105Z-3-001/backend
pip install -r requirements.txt
uvicorn main:app --reload
```
The backend API will run on http://localhost:8000

## Project Structure

```
VectorShift/
├── frontend-20260103T124104Z-3-001/
│   └── frontend/
│       ├── src/
│       │   ├── nodes/
│       │   │   ├── BaseNode.js          # Node abstraction component
│       │   │   ├── inputNode.js         # Input node
│       │   │   ├── outputNode.js        # Output node
│       │   │   ├── llmNode.js           # LLM node
│       │   │   ├── textNode.js          # Enhanced text node
│       │   │   ├── transformNode.js     # NEW: Transform node
│       │   │   ├── filterNode.js        # NEW: Filter node
│       │   │   ├── apiNode.js           # NEW: API node
│       │   │   ├── conditionalNode.js   # NEW: Conditional node
│       │   │   └── aggregatorNode.js    # NEW: Aggregator node
│       │   ├── App.js                   # Main app with styling
│       │   ├── ui.js                    # ReactFlow canvas
│       │   ├── toolbar.js               # Node palette
│       │   ├── submit.js                # Submit button with backend integration
│       │   ├── store.js                 # Zustand state management
│       │   ├── draggableNode.js         # Draggable node component
│       │   └── index.css                # Global styles
│       └── package.json
│
└── backend-20260103T124105Z-3-001/
    └── backend/
        ├── main.py                      # FastAPI app with DAG detection
        └── requirements.txt             # Python dependencies
```

## Key Implementation Details

### BaseNode Abstraction
The `BaseNode.js` component accepts configuration props:
- `title`: Node display name
- `handles`: Array of handle configurations with type, position, and style
- `fields`: Array of form field configurations (text, select, textarea)
- `style`: Custom styling overrides

### DAG Detection Algorithm
Uses Depth-First Search (DFS) with three states:
- 0: Unvisited
- 1: Visiting (in current DFS path)
- 2: Visited (completely processed)

A cycle exists if we encounter a node with state 1 during traversal.

### Dynamic Text Node
- Uses `useRef` for textarea DOM access
- `useEffect` for text analysis and dimension calculation
- Regex pattern: `/\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g`
- Dynamically positions handles using percentage-based positioning

## Usage

1. **Start both servers** (frontend and backend)
2. **Drag nodes** from the toolbar onto the canvas
3. **Configure nodes** by editing their fields
4. **Connect nodes** by dragging from output handles to input handles
5. **Create text node variables** by typing `{{variable_name}}` in text nodes
6. **Submit pipeline** to analyze the graph structure
7. **View results** in the alert showing node count, edge count, and DAG status

## Demonstration of Node Abstraction Flexibility

Creating a new node is as simple as:

```javascript
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const CustomNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Custom"
      handles={[/* handle configs */]}
      fields={[/* field configs */]}
      style={{ backgroundColor: '#color', borderColor: '#color' }}
    />
  );
};
```

No need to rewrite state management, styling, or rendering logic!

## Future Enhancements

- Persistent storage of pipelines
- Node execution engine
- Real-time collaboration
- Advanced node types (loops, error handling)
- Export/import pipeline configurations
- Undo/redo functionality
- Node grouping and comments

---

Built with ❤️ for VectorShift Technical Assessment
