import {
    BaseEdge,
    EdgeLabelRenderer,
    getBezierPath,
    useReactFlow,
    type EdgeProps,
} from '@xyflow/react';
import { X } from 'lucide-react';

export const CustomEdgeWithCancelBtn = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
}: EdgeProps) => {
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    const { setEdges } = useReactFlow();
    const onEdgeClick = () => {
        setEdges((edges) => edges.filter((edge) => edge.id !== id));
    };

    return (
        <>
            <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
            <EdgeLabelRenderer>
                <div
                    className="button-edge__label nodrag nopan"
                    style={{
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                    }}
                >
                    <button className="button-edge__button" onClick={onEdgeClick}>
                        <X className='h-4 w-4' />
                    </button>
                </div>
            </EdgeLabelRenderer>
        </>
    );
}
