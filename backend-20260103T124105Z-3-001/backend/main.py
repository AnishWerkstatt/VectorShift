from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

# Add CORS middleware to allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str

class Edge(BaseModel):
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

def is_dag(nodes: List[Dict[str, Any]], edges: List[Dict[str, Any]]) -> bool:
    """
    Check if the graph is a Directed Acyclic Graph (DAG)
    Uses DFS-based cycle detection
    """
    # Build adjacency list
    graph = {node['id']: [] for node in nodes}
    for edge in edges:
        if edge['source'] in graph:
            graph[edge['source']].append(edge['target'])
    
    # Track visit states: 0 = unvisited, 1 = visiting, 2 = visited
    state = {node['id']: 0 for node in nodes}
    
    def has_cycle(node_id: str) -> bool:
        """DFS to detect cycle"""
        if state[node_id] == 1:  # Currently visiting - found a back edge
            return True
        if state[node_id] == 2:  # Already visited
            return False
        
        state[node_id] = 1  # Mark as visiting
        
        # Visit all neighbors
        for neighbor in graph.get(node_id, []):
            if neighbor in state and has_cycle(neighbor):
                return True
        
        state[node_id] = 2  # Mark as visited
        return False
    
    # Check each node for cycles
    for node in nodes:
        if state[node['id']] == 0:
            if has_cycle(node['id']):
                return False
    
    return True

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag_status = is_dag(pipeline.nodes, pipeline.edges)
    
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': dag_status
    }
