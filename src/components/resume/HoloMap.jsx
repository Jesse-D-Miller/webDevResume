import { useState } from "react";

function HoloMap({ resumeData }) {
  const [hoveredNode, setHoveredNode] = useState(null);

  const allNodes = [
    ...resumeData.mapNodes.education,
    ...resumeData.mapNodes.career,
    ...resumeData.mapNodes.skills,
  ];

  return (
    <section className="holo-map-container">
      <div className="bg-layer bg-base" />
      <div className="bg-layer bg-education" />
      <div className="bg-layer bg-career" />
      <div className="bg-layer bg-skills" />
      {allNodes.map((node) => (
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
            <div className="node-tooltip">
              <h4>{node.institution || node.vocation || node.achievement}</h4>
              <br />
              <p>
              {node.intel}
              </p>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}

export default HoloMap;
