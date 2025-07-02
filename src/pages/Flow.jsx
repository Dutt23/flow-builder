import React, { useState } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import FlowCanvas from '../components/FlowCanvas';
import NodesPanel from '../components/NodesPanel';
import Header from '../components/Header';

export default function App() {
  const [selectedNode, setSelectedNode] = useState(null);

  return (
    <Flex direction="column" height="100vh" width="100vw" bg="#f7f8fa" overflow="hidden">
      <Header />
      
      <Flex flex="1" mt="48px">
        {/* Main Canvas Area - takes remaining space */}
        <Box flex="1" position="relative">
          <FlowCanvas setSelectedNode={setSelectedNode} />
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
              <NodesPanel selectedNode={selectedNode} />
            </Box>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}
