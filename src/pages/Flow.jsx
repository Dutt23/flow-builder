import React, { useState, useEffect } from 'react';
import { Flex, Box, Spinner } from '@chakra-ui/react';
import FlowCanvas from '../components/FlowCanvas';
import NodesPanel from '../components/NodesPanel';
import Header from '../components/Header';
import fetchInitialFlowData from '../data/initialFlowData';

export default function App() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [flowData, setFlowData] = useState({ nodes: [], edges: [] });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch initial data on component mount
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchInitialFlowData();
        setFlowData(data);
      } catch (error) {
        console.error('Failed to load flow data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleNodeDeselect = () => {
    setSelectedNode(null);
  };

  if (isLoading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Flex direction="column" height="100vh" width="100vw" bg="#f7f8fa" overflow="hidden">
      <Header />
      
      <Flex flex="1" mt="48px">
        {/* Main Canvas Area - takes remaining space */}
        <Box 
          flex="1" 
          position="relative"
          onClick={handleNodeDeselect}
          style={{ cursor: 'default' }}
        >
          <FlowCanvas 
            nodes={flowData.nodes}
            edges={flowData.edges}
            setSelectedNode={setSelectedNode} 
          />
        </Box>
        
        {/* Sidebar - fixed width on the right */}
        <Box 
          width="340px" 
          bg="white" 
          borderLeft="1px solid #e3e6ea"
          height="calc(100vh - 48px)"
          overflowY="auto"
          position="relative"
          boxShadow="-2px 0 10px rgba(0,0,0,0.05)"
        >
          <Box p={4}>
            <Box mt={4}>
              <NodesPanel 
                selectedNode={selectedNode} 
                onNodeDeselect={handleNodeDeselect}
              />
            </Box>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}
