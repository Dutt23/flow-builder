import React, { useCallback, useRef, useState, useEffect } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  MiniMap,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomNode from './CustomNode';

const nodeTypes = { customNode: CustomNode };

function FlowCanvasInner({ nodes: initialNodes = [], edges: initialEdges = [], setSelectedNode }) {
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes and edges when initial data changes
  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);
  const reactFlowWrapper = useRef(null);

  // Listen for selection changes
  const onSelectionChange = useCallback(({ nodes: selectedNodes }) => {
    if (selectedNodes && selectedNodes.length > 0) {
      setSelectedNode(selectedNodes[0]);
    }
  }, [setSelectedNode]);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const nodeData = event.dataTransfer.getData('application/reactflow');
      if (!nodeData) return;

      const { type, data } = JSON.parse(nodeData);
      
      // Get the drop position relative to the React Flow container
      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      // Create a new node with the calculated position
      const newNode = {
        id: `${type}-${+new Date()}`,
        type: 'customNode',
        position: {
          x: position.x / (reactFlowInstance?.getZoom() || 1) - (reactFlowInstance?.getViewport().x || 0),
          y: position.y / (reactFlowInstance?.getZoom() || 1) - (reactFlowInstance?.getViewport().y || 0)
        },
        data: {
          ...data,
          type, // Store the node type for rendering
        },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes, reactFlowInstance]
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onSelectionChange={onSelectionChange}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        fitView
        style={{ width: '100%', height: '100%' }}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
      >
        <Background color="#f7f8fa" gap={32} />
        <Controls />
        <MiniMap nodeColor={() => '#1976d2'} />
      </ReactFlow>
    </div>
  );
}

export default function FlowCanvas({ nodes = [], edges = [], setSelectedNode }) {
  return (
    <ReactFlowProvider>
       <FlowCanvasInner 
        nodes={nodes} 
        edges={edges} 
        setSelectedNode={setSelectedNode} 
      />
    </ReactFlowProvider>
  );
}
