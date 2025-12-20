import { useState } from "react";

const nodes = [
  { id: 1, color: "yellow", x: 13, y: 250, tooltip: "Yellow Node" },

  { id: 2, color: "green", x: 13, y: 337, tooltip: "High School" },
  { id: 3, color: "green", x: 170, y: 337, tooltip: "Capilano University" },
  { id: 4, color: "green", x: 269, y: 238, tooltip: "Simon Fraser University" },

  { id: 5, color: "red", x: 180, y: 200, tooltip: "Red Node" },
];

function HoloMap() {
  const [hoveredNode, setHoveredNode] = useState(null);

  return (
    <section className="holo-map-container">
      <div className="bg-layer bg-base" />
      <div className="bg-layer bg-education" />
      <div className="bg-layer bg-career" />
      <div className="bg-layer bg-skills" />
      {nodes.map((node) => (
        <div
          key={node.id}
          className={`map-node ${node.color}`}
          style={{
            position: "absolute",
            left: node.x,
            top: node.y,
            width: 24,
            height: 24,
            zIndex: 5,
          }}
          onMouseEnter={() => setHoveredNode(node)}
          onMouseLeave={() => setHoveredNode(null)}
          >
            {hoveredNode?.id === node.id && (
              <div className="node-tooltip">{node.tooltip}</div>
            )}
          </div>
      ))}
    </section>
  );
}

export default HoloMap;