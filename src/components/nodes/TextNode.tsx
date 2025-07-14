
import { memo } from 'react';
import { Handle, Position, NodeProps, Node, } from '@xyflow/react';
import { MessageCircleMore } from 'lucide-react';

export type TextNodeData = Node<{
    label: string;
    text: string;
    [key: string]: unknown; // Index signature to satisfy React Flow constraints
}, string>

export const TextNode = memo(({ data, selected, dragging, }: NodeProps<TextNodeData>) => {

    return (
        <div className={`
      min-w-[200px] max-w-[350px] bg-white rounded-lg border-2 shadow-xl transition-all duration-100
      ${selected && !dragging ? ' border-blue-600  border-2 border-dashed shadow-2xl' : 'border-gray-200 hover:border-gray-300'}
    `}>

            {/* Node header */}
            <div className="flex items-center  gap-2 px-3 py-2 bg-green-200 rounded-t-lg border-b border-gray-200">
                <MessageCircleMore className="w-4 h-4 text-green-700" />
                <span className="text-sm font-medium text-gray-700">Send Message</span>

            </div>

            {/* Node content */}
            <div className="px-3 py-3">
                <div className="text-sm text-gray-600 line-clamp-3">
                    {data.text || 'Enter your message here...'}
                </div>
            </div>

            {/* Handles */}
            <Handle
                type="target"
                position={Position.Left}
                className="w-3 h-3 border-2 border-gray-400 bg-white hover:border-blue-500 transition-colors"
            />
            <Handle
                type="source"
                position={Position.Right}
                className="w-3 h-3 border-2 border-gray-400 bg-white hover:border-blue-500 transition-colors"
            />
        </div>
    );
});

TextNode.displayName = 'TextNode';
