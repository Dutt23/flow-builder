import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { getHeaderBgColor, getBorderColor, getTextColor, getHandleColor } from '../../../utils/nodeUtils';

export const NodeBase = ({ 
  type, 
  label, 
  icon: Icon, 
  children, 
  data,
  showSourceHandle = true,
  showTargetHandle = true
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

      {/* Handles */}
      {showTargetHandle && (
        <Handle
          type="target"
          position={Position.Left}
          style={{
            background: getHandleColor(type),
            border: '2px solid #fff',
            width: 10,
            height: 10,
            borderRadius: '50%',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
          }}
        />
      )}
      
      {showSourceHandle && (
        <Handle
          type="source"
          position={Position.Right}
          style={{
            background: getHandleColor(type),
            border: '2px solid #fff',
            width: 10,
            height: 10,
            borderRadius: '50%',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
};

export default NodeBase;
