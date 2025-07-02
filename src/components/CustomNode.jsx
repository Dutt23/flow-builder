import { Handle, Position } from '@xyflow/react';
import { FaWhatsapp } from 'react-icons/fa';

export default function CustomNode({ data }) {
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
      {/* Header with WhatsApp icon on the right */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#d1fae5', // lighter green
          padding: '16px 20px 12px 20px',
        }}
      >
        <span
          style={{
            fontWeight: 700,
            fontSize: 18,
            color: '#166534', // dark green text
            letterSpacing: 0.1,
          }}
        >
          Send Message
        </span>
        <span
          style={{
            background: '#22c55e', // WhatsApp green circle background
            borderRadius: '50%',
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FaWhatsapp color="#fff" size={20} />
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: '18px 20px 18px 20px', color: '#222', fontSize: 15 }}>
        {data.text}
      </div>

      {/* Smaller black round edge connectors */}
      <Handle
        type="target"
        position={Position.Left}
        style={{
          background: '#111',
          border: '2px solid #fff',
          width: 12,
          height: 12,
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
          background: '#111',
          border: '2px solid #fff',
          width: 12,
          height: 12,
          borderRadius: '50%',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
        }}
      />
    </div>
  );
}
