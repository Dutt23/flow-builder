import React, { useState, useEffect, useCallback } from 'react';
import {
  Flex,
  Box,
  Spinner,
  useToast,
  IconButton,
  useMediaQuery,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import FlowCanvas from '../components/flow/FlowCanvas';
import NodesPanel from '../components/NodesPanel';
import Header from '../components/ui/header/Header';
import fetchInitialFlowData from '../data/initialFlowData';

// Function to validate the flow
const validateFlow = (nodes, edges) => {
  if (nodes.length === 0) return { isValid: false, message: 'No nodes in the flow' };
  if (edges.length === 0) return { isValid: false, message: 'No connecting nodes' };

  // Create a Set of all source node IDs from edges
  const sourceNodeIds = new Set(edges.map(edge => edge.source));
  // Count nodes without outgoing edges
  const nodesWithoutOutgoingEdges = nodes.filter(
    node => !sourceNodeIds.has(node.id)
  );
  if (nodesWithoutOutgoingEdges.length === 0) {
    return { isValid: false, message: 'Flow contains a cycle or all nodes are connected' };
  }
  if (nodesWithoutOutgoingEdges.length > 1) {
    return {
      isValid: false,
      message: `Multiple nodes (${nodesWithoutOutgoingEdges.length}) don't have outgoing edges. Only one node can be the end node.`,
    };
  }
  return { isValid: true };
};

export default function App() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [flowData, setFlowData] = useState({ nodes: [], edges: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const toast = useToast();

  // Auto-open panel on mobile when a node is selected
  useEffect(() => {
    if (isMobile && selectedNode) {
      setIsPanelOpen(true);
    }
  }, [selectedNode, isMobile]);

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

  const handleNodesChange = useCallback((changes) => {
    setFlowData(prev => ({
      ...prev,
      nodes: applyNodeChanges(changes, prev.nodes),
    }));
  }, []);

  const handleEdgesChange = useCallback((changes) => {
    setFlowData(prev => ({
      ...prev,
      edges: applyEdgeChanges(changes, prev.edges),
    }));
  }, []);

  const handleConnect = useCallback((connection) => {
    setFlowData(prev => ({
      ...prev,
      edges: addEdge(connection, prev.edges),
    }));
  }, []);

  const handleNodeUpdate = useCallback(
    (updatedNode) => {
      setFlowData(prev => ({
        ...prev,
        nodes: prev.nodes.map(node =>
          node.id === updatedNode.id
            ? { ...node, data: { ...updatedNode.data } }
            : node
        ),
      }));

      if (selectedNode && selectedNode.id === updatedNode.id) {
        setSelectedNode(prev => ({
          ...prev,
          data: { ...updatedNode.data },
        }));
      }
    },
    [selectedNode]
  );

  const handleSave = useCallback(() => {
    const validation = validateFlow(flowData.nodes, flowData.edges);

    if (!validation.isValid) {
      toast({
        title: 'Cannot save flow',
        description: validation.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      return;
    }

    toast({
      title: 'Flow saved successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });

    // Here you would typically call your API to save the flow
  }, [flowData, toast]);

  // Sidebar width in px
  const sidebarWidth = 340;

  if (isLoading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Flex direction="column" height="100vh" width="100vw" bg="#f7f8fa" overflow="hidden">
      <Header onSave={handleSave} />

      <Flex flex="1" mt="48px">
        {/* Main Canvas Area */}
        <Box
          flex="1"
          position="relative"
          onClick={handleNodeDeselect}
          style={{ cursor: 'default' }}
        >
          <FlowCanvas
            nodes={flowData.nodes}
            edges={flowData.edges}
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
            onNodesChange={handleNodesChange}
            onEdgesChange={handleEdgesChange}
            onConnect={handleConnect}
          />
        </Box>

        {/* Toggle Button */}
        <IconButton
          aria-label={isPanelOpen ? 'Collapse panel' : 'Expand panel'}
          icon={isPanelOpen
            ? (isMobile ? <ChevronRightIcon /> : <ChevronRightIcon />)
            : (isMobile ? <ChevronLeftIcon /> : <ChevronLeftIcon />)
          }
          onClick={() => setIsPanelOpen(!isPanelOpen)}
          position="fixed"
          right={isPanelOpen ? (isMobile ? (sidebarWidth + 8) + 'px' : sidebarWidth + 'px') : '8px'}
          top="50%"
          transform="translateY(-50%)"
          zIndex={20}
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md 0 0 md"
          boxShadow="md"
          _hover={{ bg: 'gray.50' }}
          transition="right 0.3s"
          width="32px"
          height="48px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={0}
        />

        {/* Sidebar */}
        <Box
          width={{ base: '100vw', md: sidebarWidth + 'px' }}
          bg="white"
          borderLeft="1px solid #e3e6ea"
          height="calc(100vh - 48px)"
          overflowY="auto"
          position="fixed"
          right={isPanelOpen ? 0 : `-${sidebarWidth}px`}
          top="48px"
          bottom={0}
          transition="right 0.3s cubic-bezier(.4,0,.2,1)"
          zIndex={15}
          boxShadow={
            isPanelOpen
              ? { base: '-4px 0 15px rgba(0,0,0,0.1)', md: '-2px 0 10px rgba(0,0,0,0.05)' }
              : 'none'
          }
          display={isPanelOpen ? 'block' : { base: 'none', md: 'block' }}
        >
          <Box p={4}>
            <Box mt={4}>
              <NodesPanel
                selectedNode={selectedNode}
                onNodeDeselect={() => {
                  handleNodeDeselect();
                  if (isMobile) setIsPanelOpen(false);
                }}
                onNodeUpdate={handleNodeUpdate}
              />
            </Box>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}
