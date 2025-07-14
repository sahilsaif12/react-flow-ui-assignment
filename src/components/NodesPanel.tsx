
import React from 'react';
import { MessageCircleMore, Plus } from 'lucide-react';
import { NodeTypeCard } from './NodeTypeCard';



// Node types config array
const nodeTypes = [
    {
        type: 'textNode',
        label: 'Message',
        description: 'Send a text message',
        icon: <MessageCircleMore className="w-5 h-5 text-white" />,
        iconBgClasses: '', // can pass customize bg classname for node's icon. otherwise it will just apply the default bg
        nodeBgClasses: '', // can pass customize bg classname for each node. otherwise it will just apply the default bg
    },
    // Add more node types here in the future

    // like this we can add  more nodes in future by just updating here
    // Ex: 
    // {
    //     type: 'textNode',
    //     label: 'Query',
    //     description: 'Ask a query',
    //     icon: <SailboatIcon className="w-5 h-5 text-white" />,
    //     iconBgClasses:"bg-green-300",
    //     // can pass customize bg classname for each node. otherwise it will just apply the default bg
    //     nodeBgClasses: 'bg-green-50 hover:bg-green-100 border-2 border-green-300 border-dotted ',
    // },
];



export const NodesPanel: React.FC = () => {

    // Handle drag start for node creation
    const onDragStart = (event: React.DragEvent, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';

        // Create a custom drag image that matches the node UI
        const dragPreview = document.createElement('div');
        dragPreview.style.position = 'absolute';
        dragPreview.style.top = '-1000px';
        dragPreview.style.left = '-1000px';
        dragPreview.style.pointerEvents = 'none';
        dragPreview.style.zIndex = '9999';
        dragPreview.innerHTML = `
          <div style="min-width:200px;max-width:350px;background:white;border-radius:0.5rem;box-shadow:0 4px 24px rgba(0,0,0,0.08);padding:0;margin:0;">
            <div style="display:flex;align-items:center;gap:0.5rem;padding:0.5rem 0.75rem;background:#bbf7d0;border-radius:0.5rem 0.5rem 0 0;border-bottom:1px solid #e5e7eb;">
              <svg width="16" height="16" fill="none" stroke="#15803d" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4l3 3 3-3h2a2 2 0 0 0 2-2Z"/></svg>
              <span style="font-size:0.95rem;font-weight:500;color:#374151;">Send Message</span>
            </div>
            <div style="padding:0.75rem 0.75rem 0.75rem 0.75rem;">
              <div style="font-size:0.9rem;color:#64748b;">Enter your message here...</div>
            </div>
          </div>
        `;
        document.body.appendChild(dragPreview);
        event.dataTransfer.setDragImage(dragPreview, 40, 30);
        // Remove after a tick
        setTimeout(() => document.body.removeChild(dragPreview), 0);
    };

    return (
        <div className="h-full flex flex-col">
            {/* Panel header */}
            <div className="px-4 py-3 border-b border-gray-200">
                <p className="text-sm text-gray-600 mt-1">
                    Drag and drop nodes to build your flow
                </p>
            </div>

            {/* Nodes list */}
            <div className="flex-1 p-4">
                <div className="space-y-3">
                    {nodeTypes.map((node) => (
                        <NodeTypeCard
                            key={node.type}
                            label={node.label}
                            description={node.description}
                            icon={node.icon}
                            nodeBgClasses={node.nodeBgClasses}
                            iconBgClasess={node.iconBgClasses}
                            onDragStart={(event) => onDragStart(event, node.type)}
                        />
                    ))}

                    {/* Placeholder for future node types */}
                    <div className="text-center py-8 text-gray-400">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <Plus className="w-6 h-6" />
                        </div>
                        <p className="text-sm">More node types coming soon...</p>
                    </div>
                </div>
            </div>

            {/* Panel footer with instructions */}
            <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                <div className="text-xs text-gray-600">
                    <p className="font-medium mb-1">Instructions:</p>
                    <ul className="space-y-1 text-gray-500">
                        <li>• Drag nodes to the canvas</li>
                        <li>• Connect nodes by dragging from handles</li>
                        <li>• Click nodes to edit their settings</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
