import FlowCanvas from './components/FlowCanvas';
import NodesPanel from './components/NodesPanel';
import SaveButton from './components/SaveButton';

export default function Flow() {
  return (
    <div style={{ display: 'flex', height: '100vh', background: '#fafbfc' }}>
      <div style={{ flex: 1, position: 'relative' }}>
        <FlowCanvas />
      </div>
      <div style={{ width: 320, borderLeft: '1px solid #eee', position: 'relative', background: '#fff' }}>
        <div style={{ position: 'absolute', top: 24, right: 24 }}>
          <SaveButton />
        </div>
        <div style={{ marginTop: 80 }}>
          <NodesPanel />
        </div>
      </div>
    </div>
  );
}
