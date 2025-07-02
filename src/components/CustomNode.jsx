import { TextNode, ImageNode, VideoNode, ButtonNode } from './nodes';

export default function CustomNode(props) {
  const { type = 'text' } = props.data || {};
  
  const nodeComponents = {
    text: TextNode,
    image: ImageNode,
    video: VideoNode,
    button: ButtonNode,
  };
  
  const NodeComponent = nodeComponents[type] || TextNode;
  
  return <NodeComponent {...props} />;
}
