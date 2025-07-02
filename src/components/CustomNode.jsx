import { Handle, Position } from '@xyflow/react';
import { 
  FaWhatsapp, 
  FaImage, 
  FaVideo,
  FaMousePointer
} from 'react-icons/fa';

const NodeTypeIcon = ({ type }) => {
  const iconProps = { size: 16, style: { marginRight: 8 } };
  
  switch(type) {
    case 'image':
      return <FaImage {...iconProps} color="#3b82f6" />;
    case 'video':
      return <FaVideo {...iconProps} color="#ef4444" />;
    case 'button':
      return <FaMousePointer {...iconProps} color="#8b5cf6" />;
    default: // text
      return <FaWhatsapp {...iconProps} color="#22c55e" />;
  }
};

export default function CustomNode({ data }) {
  const { type = 'text', label = 'Node', text = '' } = data;
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
        position: 'relative',
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
          <NodeTypeIcon type={type} />
          <span
            style={{
              fontWeight: 600,
              fontSize: 14,
              color: getTextColor(type),
            }}
          >
            {label}
          </span>
        </div>
      </div>

      {/* Node Content */}
      <div style={{ padding: '16px', color: '#333', fontSize: 14 }}>
        {renderNodeContent(data, type)}
      </div>

      {/* Smaller black round edge connectors */}
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
    </div>
  );
}

// Helper functions for node styling
function getHeaderBgColor(type) {
  const colors = {
    text: '#d1fae5',
    image: '#dbeafe',
    video: '#fee2e2',
    button: '#f3e8ff',
  };
  return colors[type] || '#f3f4f6';
}

function getBorderColor(type) {
  const colors = {
    text: '#86efac',
    image: '#93c5fd',
    video: '#fca5a5',
    button: '#c4b5fd',
  };
  return colors[type] || '#e5e7eb';
}

function getTextColor(type) {
  const colors = {
    text: '#166534',
    image: '#1e40af',
    video: '#991b1b',
    button: '#5b21b6',
  };
  return colors[type] || '#1f2937';
}

function getHandleColor(type) {
  const colors = {
    text: '#22c55e',
    image: '#3b82f6',
    video: '#ef4444',
    button: '#8b5cf6',
  };
  return colors[type] || '#6b7280';
}

function renderNodeContent(data, type) {
  switch(type) {
    case 'image':
      return data.url ? (
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            background: '#f3f4f6', 
            height: '100px', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '8px',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            {data.url ? (
              <img 
                src={data.url} 
                alt={data.altText || ''} 
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
              />
            ) : (
              <span style={{ color: '#9ca3af' }}>No image</span>
            )}
          </div>
          {data.altText && <div style={{ fontSize: '12px', color: '#6b7280' }}>{data.altText}</div>}
        </div>
      ) : (
        <div style={{ color: '#6b7280', fontStyle: 'italic' }}>No image selected</div>
      );

    case 'video':
      return data.url ? (
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            background: '#f3f4f6', 
            height: '100px', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '4px',
            marginBottom: '8px'
          }}>
            <FaVideo size={24} color="#9ca3af" />
          </div>
          <div style={{ fontSize: '12px', color: '#6b7280', wordBreak: 'break-all' }}>
            {data.url}
          </div>
        </div>
      ) : (
        <div style={{ color: '#6b7280', fontStyle: 'italic' }}>No video URL provided</div>
      );

    case 'button':
      return (
        <div style={{ textAlign: 'center' }}>
          <button 
            style={{
              background: '#4f46e5',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              width: '100%',
              fontSize: '14px'
            }}
          >
            {data.text || 'Button'}
          </button>
          {data.action && (
            <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
              Action: {data.action}
            </div>
          )}
        </div>
      );

    default: // text
      return (
        <div style={{ 
          background: '#f9fafb', 
          padding: '12px', 
          borderRadius: '4px',
          borderLeft: `3px solid ${getBorderColor(type)}`
        }}>
          {data.text || 'No content'}
        </div>
      );
  }
}
