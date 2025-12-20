import { useState } from "react";

const nodes = [
  { id: 1, color: "green", x: 12, y: 337, tooltip: "High School" },
  { id: 2, color: "green", x: 170, y: 337, tooltip: "Capilano University" },
  { id: 3, color: "green", x: 267, y: 238, tooltip: "Simon Fraser University" },
  { id: 4, color: "green", x: 447, y: 79, tooltip: "Lighthouse Labs" },
  
  { id: 5, color: "red", x: 463, y: 393, tooltip: "Tree Planter (1)" },
  { id: 6, color: "red", x: 267, y: 298, tooltip: "Tree Planter (2)" },
  { id: 7, color: "red", x: 168, y: 25, tooltip: "Brewery Bartender" },
  { id: 8, color: "red", x: 267, y: 160, tooltip: "Wildfire Crew Member" },
  { id: 9, color: "red", x: 267, y: 80, tooltip: "Wildfire Crew Leader" },
  { id: 10, color: "red", x: 370, y: 80, tooltip: "Wildfire Crew Supervisor" },
  { id: 11, color: "red", x: 590, y: 119, tooltip: "Jr. Web Dev" },

  { id: 12, color: "yellow", x: 12, y: 250, tooltip: "Govenor Generals Award" },
  { id: 13, color: "yellow", x: 12, y: 37, tooltip: "Outrigger World Championships" },
  { id: 14, color: "yellow", x: 168, y: 117, tooltip: "BC Wildfire Hiring" },
  { id: 15, color: "yellow", x: 320, y: 117, tooltip: "BC Wildfire Operations Conference" },
  { id: 16, color: "yellow", x: 447, y: 180, tooltip: "Above & Beyond" },
  
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
            border: "2px solid transparent",
            position: "absolute",
            left: node.x,
            top: node.y,
            width: 24,
            height: 24,
            zIndex: 5,
            transform: hoveredNode?.id === node.id ? "scale(1.2)" : "scale(1)",
            transition: "transform 0.2s cubic-bezier(0.4,1.6,0.4,1)",
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
