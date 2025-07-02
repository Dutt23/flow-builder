import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { getHeaderBgColor, getBorderColor, getTextColor, getHandleColor } from '../../../utils/nodeUtils';

export const NodeBase = ({ 
  type, 
  label, 
  icon: Icon, 
  children, 
  data,
  showSourceHandles = true,
  showTargetHandles = true
}) => {
  return (
    <div
      style={{
        minWidth: 320,
        borderRadius: 16,
        background: '#fff',
        border: '1.5px solid #e3e6ea',
        boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
        overflow: 'hidden',
        fontFamily: 'Inter, Arial, sans-serif',
      }}
    >
      {/* Node Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: getHeaderBgColor(type),
          padding: '12px 16px',
          borderBottom: `1px solid ${getBorderColor(type)}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {Icon && (
            <Icon color={getTextColor(type)} style={{ marginRight: 8 }} size={16} />
          )}
          <span style={{ fontWeight: 600, fontSize: 14, color: getTextColor(type) }}>
            {label}
          </span>
        </div>
      </div>

      {/* Node Content */}
      <div style={{ padding: '16px' }}>
        {children}
      </div>

      {/* Left Handle - Target */}
      {showTargetHandles && (
        <Handle
          id="target"
          type="target"
          position={Position.Left}
          style={{
            background: getHandleColor(type),
            width: '14px',
            height: '14px',
            border: '2px solid #fff',
            top: '50%',
            left: '-7px',
            transform: 'translateY(-50%)',
            zIndex: 1
          }}
        />
      )}

      {/* Right Handle - Source */}
      {showSourceHandles && (
        <Handle
          id="source"
          type="source"
          position={Position.Right}
          style={{
            background: getHandleColor(type),
            width: '14px',
            height: '14px',
            border: '2px solid #fff',
            top: '50%',
            right: '-7px',
            transform: 'translateY(-50%)',
            zIndex: 1
          }}
        />
      )}
    </div>
  );
};

export default NodeBase;
