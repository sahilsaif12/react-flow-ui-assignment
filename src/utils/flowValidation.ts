
import { Node, Edge } from '@xyflow/react';

export interface ValidationResult {
    isValid: boolean;
    message: string;
}

// If there are more than one nodes, no more than one node should have empty target handles
 
export const validateFlow = (nodes: Node[], edges: Edge[]): ValidationResult => {
    // If there's only one node or no nodes, the flow is valid
    if (nodes.length <= 1) {
        return {
            isValid: true,
            message: 'Flow is valid',
        };
    }

    // Count nodes with empty target handles (no incoming connections)
    const nodesWithEmptyTargets = nodes.filter((node) => {
        const hasIncomingConnection = edges.some((edge) => edge.target === node.id);
        return !hasIncomingConnection;
    });

    // If more than one node has empty target handles, the flow is invalid
    if (nodesWithEmptyTargets.length > 1) {
        return {
            isValid: false,
            message: `Error: ${nodesWithEmptyTargets.length} nodes have no incoming connections. Only one node can be without incoming connections (the start node).`,
        };
    }

    return {
        isValid: true,
        message: 'Flow is valid',
    };
};





/**
 * Additional validation utilities that could be useful in the future
 */

export const getNodesWithoutIncomingConnections = (nodes: Node[], edges: Edge[]): Node[] => {
    return nodes.filter((node) => {
        const hasIncomingConnection = edges.some((edge) => edge.target === node.id);
        return !hasIncomingConnection;
    });
};

export const getNodesWithoutOutgoingConnections = (nodes: Node[], edges: Edge[]): Node[] => {
    return nodes.filter((node) => {
        const hasOutgoingConnection = edges.some((edge) => edge.source === node.id);
        return !hasOutgoingConnection;
    });
};

export const findOrphanedNodes = (nodes: Node[], edges: Edge[]): Node[] => {
    return nodes.filter((node) => {
        const hasIncomingConnection = edges.some((edge) => edge.target === node.id);
        const hasOutgoingConnection = edges.some((edge) => edge.source === node.id);
        return !hasIncomingConnection && !hasOutgoingConnection;
    });
};
