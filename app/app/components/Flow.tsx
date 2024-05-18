'use client'

import React, { useState, useCallback } from "react";
import { nanoid } from "nanoid";
import ReactFlow, {
    Background,
    BackgroundVariant,
} from "reactflow";
import "reactflow/dist/style.css";
import { useStore } from "../store";
import TextNode from "./nodes/TextNode";

const nodeTypes = {
    textNode: TextNode,
};

// Default viewport
const defaultViewport = { x: 0, y: 140, zoom: 1.2 };

const Flow = () => {
    // State for managing ReactFlow instance
    const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
    const { nodes, edges, addNode, addEdge, onNodesChange, onEdgesChange } = useStore();

    // Callback function for handling connection between nodes
    const onConnect = useCallback(
        (params: any) => {
            const newEdge = { id: nanoid(), ...params };
            addEdge(newEdge);
        },
        [addEdge]
    );

    // Function to handle drag over event
    const onDragOver = (event: { preventDefault: () => void; dataTransfer: { dropEffect: string; }; }) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    };

    // Function to handle drop event
    const onDrop = (event: { preventDefault: () => void; dataTransfer: { getData: (arg0: string) => any; }; clientX: any; clientY: any; }) => {
        event.preventDefault();
        const type = event.dataTransfer.getData("application/reactflow");
        const position = reactFlowInstance.screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
        });
        // Adding new node with type and position
        addNode({ type, position });
    };

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onInit={setReactFlowInstance}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            defaultViewport={defaultViewport}
        >
            <Background
                gap={24}
                color="#FFFFFF"
                variant={BackgroundVariant.Dots}
                style={{ background: '#ffffff' }}
                size={1}
                lineWidth={1}
            />
        </ReactFlow>
    );
};

export default Flow;
