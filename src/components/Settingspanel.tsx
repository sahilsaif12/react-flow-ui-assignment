
import React, { useState, useEffect } from 'react';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import { Node } from '@xyflow/react';
import { TextNodeData } from './nodes/TextNode';

interface SettingsPanelProps {
  node: Node;
  onUpdateNode: (nodeId: string, data: Partial<TextNodeData>) => void;
  onClose: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  node,
  onUpdateNode,
  onClose,
}) => {
  console.log("node",node);
  
  const [text, setText] = useState(node.data.text || '');

  // Update local state when node changes
  useEffect(() => {
    setText(node.data.text || '');
  }, [node.data.text]);

  // Handle text input change
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setText(newText);
    onUpdateNode(node.id,  {  text: newText });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Panel header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title="Back to nodes panel"
          >
            <ArrowLeft className="w-4 h-4 text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">Message Settings</h2>
          </div>
        </div>
      </div>

      {/* Settings content */}
      <div className="flex-1 p-4">
        <div className="space-y-4">
          {/* Node info */}
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm text-gray-600 mb-1">Node ID</div>
            <div className="text-sm font-mono text-gray-800">{node.id}</div>
          </div>

          {/* Text input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message Text
            </label>
            <textarea
              value={text}
              onChange={handleTextChange}
              placeholder="Enter your message here..."
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
            />
            <div className="text-xs text-gray-500 mt-1">
              This text will be sent to the user when this node is reached.
            </div>
          </div>

          {/* Preview */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preview
            </label>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="text-sm text-gray-800">
                {text || <span className="text-gray-400 italic">No message text</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Panel footer */}
      <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-600">
          <p className="font-medium mb-1">Tips:</p>
          <ul className="space-y-1 text-gray-500">
            <li>• Keep messages concise and clear</li>
            <li>• Use variables for personalization</li>
            <li>• Test your flow before deploying</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
