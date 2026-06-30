// Test.jsx
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

export default function Test() {
  return (
    <PanelGroup direction="horizontal">
      <Panel defaultSize={50}>
        <div>Left</div>
      </Panel>

      <PanelResizeHandle style={{ width: "5px", background: "red" }} />

      <Panel defaultSize={50}>
        <div>Right</div>
      </Panel>
    </PanelGroup>
  );
}
