export const initialNodes = [
  {
    id: '1',
    type: 'customNode',
    position: { x: 100, y: 100 },
    data: { 
      type: 'text',
      label: 'Text Node',
      text: 'This is a text node.'
    },
  },
  {
    id: '2',
    type: 'customNode',
    position: { x: 300, y: 200 },
    data: { 
      type: 'image',
      label: 'Image Node',
      src: '',
      alt: 'Image description'
    },
  }
];

export const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
];

// Mock API function to simulate data fetching
const fetchInitialFlowData = () => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve({
        nodes: initialNodes,
        edges: initialEdges
      });
    }, 500);
  });
};

export default fetchInitialFlowData;
