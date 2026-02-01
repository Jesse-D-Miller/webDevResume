import { useHoveredNodes } from "../../hooks/useHoveredNodes";
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

  const activateNode = (node) => {
    const isNewNode = !hoveredNodeIds.has(node.id);
    const nextSize = hoveredNodeIds.size + (isNewNode ? 1 : 0);
    if (isNewNode && nextSize >= 16) {
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

  const deactivateNode = () => {
    setHoveredNode(null);
  };

  const toggleNode = (node) => {
    if (hoveredNode?.id === node.id) {
      setHoveredNode(null);
      return;
    }
    activateNode(node);
  };

  const handleKeyDown = (event, node) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleNode(node);
    }
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
            className={`map-node node-${node.id} ${node.color} ${isLit ? "lit" : "dim"}`}
            style={{
              border: "2px solid transparent",
              position: "absolute",
              zIndex: 5,
              filter: isLit ? "none" : "grayscale(1) brightness(0.5)",
              transform:
                hoveredNode?.id === node.id ? "scale(1.2)" : "scale(1)",
              transition: "transform 0.2s cubic-bezier(0.4,1.6,0.4,1)",
            }}
            role="button"
            tabIndex={0}
            aria-label={node.institution || node.vocation || node.achievement}
            onPointerEnter={() => activateNode(node)}
            onPointerLeave={deactivateNode}
            onClick={() => toggleNode(node)}
            onKeyDown={(event) => handleKeyDown(event, node)}
          />
        );
      })}

      {/* Render the hovered node last for stacking */}
      {hoveredNodes.map((node) => {
        const isLit = hoveredNodeIds.has(node.id);
        return (
          <div
            key={node.id}
            className={`map-node node-${node.id} ${node.color} ${isLit ? "lit" : "dim"}`}
            style={{
              position: "absolute",
              border: "2px solid transparent",
              zIndex: 5,
              filter: isLit ? "none" : "grayscale(1) brightness(0.5)",
              transform: "scale(1.2)",
              transition: "transform 0.2s cubic-bezier(0.4,1.6,0.4,1)",
            }}
            role="button"
            tabIndex={0}
            aria-label={node.institution || node.vocation || node.achievement}
            onPointerEnter={() => activateNode(node)}
            onPointerLeave={deactivateNode}
            onClick={() => toggleNode(node)}
            onKeyDown={(event) => handleKeyDown(event, node)}
          >
            <div className="node-tooltip" style={{ pointerEvents: "none" }}>
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
