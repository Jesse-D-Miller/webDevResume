import { useHoveredNodes } from "../../hooks/useHoveredNodes";
import { useState } from "react";
import { useXP } from "../../hooks/useXP";

function HoloMap({ resumeData }) {
  const { hoveredNode, setHoveredNode, hoveredNodeIds, setHoveredNodeIds } =
    useHoveredNodes();
  const { grantXp } = useXP();

  const allNodes = [
    ...resumeData.mapNodes.education,
    ...resumeData.mapNodes.career,
    ...resumeData.mapNodes.skills,
  ];

  // Split nodes into hovered and non-hovered for correct stacking
  const nonHoveredNodes = allNodes.filter(
    (node) => hoveredNode?.id !== node.id
  );
  const hoveredNodes = hoveredNode ? [hoveredNode] : [];

  const handleHover = (node) => {
    if (hoveredNodeIds.size >= 16) {
      grantXp(
        `holo-map-explorer`,
        1,
        `Great job exploring my holo map! You've uncovered a lot about my background and skills.`
      );
    }
    setHoveredNode(node);
    setHoveredNodeIds((prev) => {
      if (prev.has(node.id)) return prev;
      const next = new Set(prev);
      next.add(node.id);
      return next;
    });
  };

  return (
    <section className="holo-map-container">
      <div className={"bg-layer bg-base"} />
      <div className="bg-layer bg-education" />
      <div className="bg-layer bg-career" />
      <div className="bg-layer bg-skills" />
      {/* Render all non-hovered nodes first */}
      {nonHoveredNodes.map((node) => {
        const isLit = hoveredNodeIds.has(node.id);
        return (
          <div
            key={node.id}
            className={`map-node ${node.color} ${isLit ? "" : "dim"}`}
            style={{
              border: "2px solid transparent",
              position: "absolute",
              left: node.x,
              top: node.y,
              width: 24,
              height: 24,
              zIndex: 5,
              filter: isLit ? "none" : "grayscale(1) brightness(0.5)",
              transform:
                hoveredNode?.id === node.id ? "scale(1.2)" : "scale(1)",
              transition: "transform 0.2s cubic-bezier(0.4,1.6,0.4,1)",
            }}
            onMouseEnter={() => handleHover(node)}
            onMouseLeave={() => setHoveredNode(null)}
          />
        );
      })}

      {/* Render the hovered node last for stacking */}
      {hoveredNodes.map((node) => {
        const isLit = hoveredNodeIds.has(node.id);
        return (
          <div
            key={node.id}
            className={`map-node ${node.color} ${isLit ? "" : "dim"}`}
            style={{
              border: "2px solid transparent",
              position: "absolute",
              left: node.x,
              top: node.y,
              width: 24,
              height: 24,
              zIndex: 5,
              filter: isLit ? "none" : "grayscale(1) brightness(0.5)",
              transform: "scale(1.2)",
              transition: "transform 0.2s cubic-bezier(0.4,1.6,0.4,1)",
            }}
            onMouseEnter={() => handleHover(node)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div className="node-tooltip">
              <h4>{node.institution || node.vocation || node.achievement}</h4>
              <br />
              <p>{node.intel}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default HoloMap;
