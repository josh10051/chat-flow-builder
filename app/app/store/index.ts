import { create } from "zustand";
import { nanoid } from "nanoid";
import { applyNodeChanges, applyEdgeChanges, Node, Edge } from "reactflow";

interface CustomNode extends Node {
  message: string;
}

interface StoreState {
  nodes: CustomNode[]; // Array to store nodes
  edges: Edge[]; // Array to store edges
  showNodesPanel: boolean; // Flag to show/hide nodes panel
  error: string; // Error message

  // Function to set error message
  setError(value: string): void;

  // Function to set showNodesPanel flag
  setShowNodesPanel(value: boolean): void;

  // Function to handle changes in nodes
  onNodesChange(changes: any): void;

  // Function to handle changes in edges
  onEdgesChange(changes: any): void;

  // Function to add a new node
  addNode({ type, position }: { type: string; position: any }): void;

  // Function to update node data
  updateNode(nodes: any[]): void;

  // Function to add a new edge
  addEdge(edge: any): void;
}

export const useStore = create<StoreState>((set, get) => ({
  nodes: [], // Array to store nodes
  edges: [], // Array to store edges
  showNodesPanel: true, // Flag to show/hide nodes panel
  error: "", // Error message

  // Implementation of the functions
  setError(value: string): void {
    set({ error: value });
  },

  setShowNodesPanel(value: boolean): void {
    set({ showNodesPanel: value });
  },

  onNodesChange(changes: any): void {
    set({
      nodes: applyNodeChanges(changes, get().nodes).map((node: Node) => {
        if ("message" in node) {
          return node as CustomNode;
        } else {
          return { ...node, message: "" };
        }
      }),
    });
  },

  onEdgesChange(changes: any): void {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  addNode({ type, position }: { type: string; position: any }): void {
    const newNode: any = {
      id: nanoid(),
      type,
      position,
      data: { message: "" }, // Default message for the node
    };
    set((state) => ({ nodes: [...state.nodes, newNode] }));
  },

  updateNode(nodes: CustomNode[]): void {
    set({ nodes });
  },

  addEdge(edge: Edge): void {
    set((state: any) => ({
      edges: [...state.edges, { ...edge, markerEnd: { type: "arrowclosed" } }],
    }));
  },
}));
