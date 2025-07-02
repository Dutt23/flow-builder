import React from 'react';
import { FaImage } from 'react-icons/fa';
import { NodeBase } from '../common/NodeBase';

export const ImageNode = ({ data }) => {
  const { label = 'Image', url, altText } = data;
  
  return (
    <NodeBase 
      type="image"
      label={label}
      icon={FaImage}
      data={data}
    >
      {url ? (
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
            <img 
              src={url} 
              alt={altText || ''} 
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
            />
          </div>
          {altText && <div style={{ fontSize: '12px', color: '#6b7280' }}>{altText}</div>}
        </div>
      ) : (
        <div style={{ color: '#6b7280', fontStyle: 'italic' }}>No image selected</div>
      )}
    </NodeBase>
  );
};

export default ImageNode;
