
import React, { useState, useCallback, useRef } from 'react';

import {
    ReactFlow,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    Connection,
    Edge,
    Node,
    OnConnect,
    OnNodesChange,
    OnEdgesChange,
    ReactFlowInstance,
    MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { TextNode, TextNodeData } from './nodes/TextNode';
import { CustomEdgeWithCancelBtn } from './edges/CustomEdgeWithBtn';
import { NodesPanel } from '../components/NodesPanel';
import { SettingsPanel } from '../components/Settingspanel';
import { validateFlow } from '../utils/flowValidation';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { CloudCheck } from 'lucide-react';


// Custom node types
const nodeTypes = {
    textNode: TextNode,
};

// Custom edge types
const edgeTypes = {
    customWithCancelBtn: CustomEdgeWithCancelBtn,
};

// Initial empty flow
const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const Home = () => {
    const [nodes, setNodes, onNodesChange]: [Node[], any, OnNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange]: [Edge[], any, OnEdgesChange] = useEdgesState(initialEdges);
    const [selectedNode, setSelectedNode] = useState<Node<TextNodeData> | null>(null);
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

    // Handle new connections with validation for source handles
    const onConnect: OnConnect = useCallback((params: Connection) => {
        // Check if source handle already has a connection
        const sourceHasConnection = edges.some(
            (edge) => edge.source === params.source && edge.sourceHandle === params.sourceHandle
        );

        if (sourceHasConnection) {

            toast.error("Connection Error", {
                description: "Each source handle can only have one outgoing connection.",

            })

            return;
        }

        setEdges((eds: Edge[]) => addEdge({
            ...params, type: 'customWithCancelBtn', markerEnd: {
                type: MarkerType.Arrow,
                width: 30,
                height: 30,
                color: '#6a6a6a',
            },
            style: {
                strokeWidth: 1.5,
                stroke: '#7e7e7e',
            },
        }, eds));
    }, [edges, setEdges,]);// toast

    // Handle node selection
    const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
        // Cast to TextNodeData for our selected node state
        event.preventDefault()
        setSelectedNode(node as Node<TextNodeData>);
    }, []);

    // Handle canvas click to deselect nodes
    const onPaneClick = useCallback(() => {
        setSelectedNode(null);
    }, []);

    // Handle drag and drop from nodes panel
    const onDrop = useCallback((event: React.DragEvent) => {
        event.preventDefault();

        const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/reactflow');

        if (typeof type === 'undefined' || !type || !reactFlowBounds || !reactFlowInstance) {
            return;
        }

        // Use screenToFlowPosition instead of project
        const position = reactFlowInstance.screenToFlowPosition({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });

        const newNode:
            TextNodeData = {
            id: `${type}-${Date.now()}`,
            type,
            position,
            data: {
                label: 'Text Message',
                text: 'Enter your message here...',
            },
        };

        setNodes((nds: Node[]) => nds.concat(newNode));
    }, [reactFlowInstance, setNodes]);

    const onDragOver = useCallback((event: React.DragEvent) => {        
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);


    // Update selected node data
    const updateNodeData = useCallback((nodeId: string, data: Partial<TextNodeData>) => {
        setNodes((nds: Node[]) =>
            nds.map((node) => {
                if (node.id === nodeId) {
                    return { ...node, data: { ...node.data, ...data } };
                }
                return node;
            })
        );

        // Update selected node state
        if (selectedNode?.id === nodeId) {
            setSelectedNode((prev) => prev ? { ...prev, data: { ...prev.data, ...data } } : null);
        }
    }, [setNodes, selectedNode]);

    // Handle save flow
    const handleSave = useCallback(() => {
        const validationResult = validateFlow(nodes, edges);

        if (!validationResult.isValid) {


            toast.error("Can not save the flow", {
                description: "There should not be any node left with no connection"
            })
            return;
        }


        toast.success("Flow Saved", {
            description: "Your chatbot flow has been saved successfully!"
        })

    }, [nodes, edges,]);

    return (
        <div className="h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-300 px-4 py-3 flex justify-between items-center">
                <h1 className="text-xl font-semibold text-gray-600">Chatbot	&lt; &gt;Flow</h1>
                <Button
                    onClick={handleSave}
                    variant="outline"
                    className="flex items-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-700 hover:text-white transition-colors duration-200 font-medium"
                >
                    Save Changes
                    <CloudCheck className="w-6 h-6" />
                </Button>
            </header>

            <div className="flex-1 flex">
                {/* Flow canvas */}
                <div className="flex-1 bg-white/60" ref={reactFlowWrapper}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onNodeClick={onNodeClick}
                        onPaneClick={onPaneClick}
                        onInit={setReactFlowInstance}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        selectNodesOnDrag={false}
                        nodeTypes={nodeTypes}
                        edgeTypes={edgeTypes}
                        className="bg-gray-100"
                    >
                        <Controls className="bg-white border border-gray-200" />
                        {/* <BackgroundVariant/> */}
                        {/* <Background color="#363636"  gap={50} /> */}
                    </ReactFlow>
                </div>

                {/* Right panel */}
                <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
                    {selectedNode ? (
                        <SettingsPanel
                            node={selectedNode}
                            onUpdateNode={updateNodeData}
                            onClose={() => setSelectedNode(null)}
                        />
                    ) : (
                        <NodesPanel />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
