import React from 'react';

interface NodeTypeCardProps {
  label: string;
  description: string;
  icon: React.ReactNode;
  iconBgClasess?:string
  nodeBgClasses?:string
  onDragStart: (event: React.DragEvent) => void;
}

export const NodeTypeCard: React.FC<NodeTypeCardProps> = ({ label, description, icon, onDragStart,nodeBgClasses,iconBgClasess }) => (
  <div
    className={`flex items-center gap-3 p-3 ${nodeBgClasses || "bg-blue-50 hover:bg-blue-100 border-2 border-dashed border-blue-200 hover:border-blue-300" }   rounded-lg cursor-grab  transition-all duration-200 active:cursor-grabbing`}
    draggable
    onDragStart={onDragStart}
  >
    <div className={`flex-shrink-0 w-10 h-10 ${iconBgClasess ||"bg-blue-500"} rounded-lg flex items-center justify-center  `}>
      {icon}
    </div>
    <div className="flex-1">
      <div className="font-medium text-gray-800">{label}</div>
      <div className="text-sm text-gray-600">{description}</div>
    </div>
  </div>
);
