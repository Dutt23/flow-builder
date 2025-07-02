import React from 'react';
import { DefaultNodeEditor } from '.';

// Map of node types to their editor components
const editorRegistry = {
  text: React.lazy(() => import('./TextNodeEditor')),
  // Add more editors here as needed
};

/**
 * NodeEditor component that renders the appropriate editor based on node type
 * @param {Object} props
 * @param {Object} props.node - The node object
 * @param {Function} props.onUpdate - Callback when node is updated
 */
const NodeEditor = ({ node, onUpdate }) => {
  if (!node?.data) return null;

  // Get the appropriate editor component or fallback to DefaultNodeEditor
  const EditorComponent = editorRegistry[node.data.type] || DefaultNodeEditor;
  
  return (
    <React.Suspense fallback={<div>Loading editor...</div>}>
      <EditorComponent node={node} onUpdate={onUpdate} />
    </React.Suspense>
  );
};

export default NodeEditor;
