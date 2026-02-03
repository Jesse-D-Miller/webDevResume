import { useHoveredNodes } from "../../hooks/useHoveredNodes";
import { useXP } from "../../hooks/useXP";
import { useEffect, useRef, useState } from "react";

function HoloMap({ resumeData }) {
  const { hoveredNode, setHoveredNode, hoveredNodeIds, setHoveredNodeIds } =
    useHoveredNodes();
  const { grantXp, hasClicked } = useXP();
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  const allNodes = [
    ...resumeData.mapNodes.education,
    ...resumeData.mapNodes.career,
    ...resumeData.mapNodes.skills,
  ];
  const colorCounts = allNodes.reduce(
    (counts, node) => {
      const nextCounts = counts;
      nextCounts[node.color] = (nextCounts[node.color] || 0) + 1;
      return nextCounts;
    },
    {}
  );

  const countActivatedByColor = (ids, color) =>
    allNodes.reduce(
      (count, node) => count + (node.color === color && ids.has(node.id) ? 1 : 0),
      0
    );

  // Split nodes into hovered and non-hovered for correct stacking
  const nonHoveredNodes = allNodes.filter(
    (node) => hoveredNode?.id !== node.id
  );
  const hoveredNodes = hoveredNode ? [hoveredNode] : [];

  const activateNode = (node) => {
    const isNewNode = !hoveredNodeIds.has(node.id);
    if (isNewNode) {
      const nextIds = new Set(hoveredNodeIds);
      nextIds.add(node.id);

      if (nextIds.size === 1 && !hasClicked("holo-map-intro")) {
        grantXp(
          "holo-map-intro",
          0,
          "This holomap is a combination of my education and career paths with some awards and acollades mixed in. Light up the nodes to gain XP."
        );
      }

      if (
        colorCounts.green &&
        countActivatedByColor(nextIds, "green") === colorCounts.green &&
        !hasClicked("holo-map-green-complete")
      ) {
        grantXp(
          "holo-map-green-complete",
          1,
          "All green nodes online. Education confirmed and humming."
        );
      }

      if (
        colorCounts.red &&
        countActivatedByColor(nextIds, "red") === colorCounts.red &&
        !hasClicked("holo-map-red-complete")
      ) {
        grantXp(
          "holo-map-red-complete",
          1,
          "All red nodes lit. Career path fully traced."
        );
      }

      if (
        colorCounts.yellow &&
        countActivatedByColor(nextIds, "yellow") === colorCounts.yellow &&
        !hasClicked("holo-map-yellow-complete")
      ) {
        grantXp(
          "holo-map-yellow-complete",
          1,
          "All yellow nodes active. Awards and accolades trail complete."
        );
      }
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

  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  useEffect(() => {
    if (!isMobile || !hoveredNode) return;

    const handleOutsideClick = (event) => {
      const target = event.target;
      if (!target) return;
      const nodeElement = target.closest?.(".map-node");
      if (nodeElement) {
        return;
      }
      deactivateNode();
    };

    document.addEventListener("pointerdown", handleOutsideClick);
    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, [isMobile, hoveredNode]);

  return (
    <section className="holo-map-container" ref={containerRef}>
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
            onPointerDown={(event) => {
              if (isMobile || event.pointerType === "touch") {
                event.preventDefault();
                activateNode(node);
              }
            }}
            onPointerEnter={() => {
              if (!isMobile) activateNode(node);
            }}
            onPointerLeave={() => {
              if (!isMobile) deactivateNode();
            }}
            onClick={() => {
              if (!isMobile) toggleNode(node);
            }}
            onKeyDown={(event) => handleKeyDown(event, node)}
            onContextMenu={(event) => event.preventDefault()}
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
            onPointerDown={(event) => {
              if (isMobile || event.pointerType === "touch") {
                event.preventDefault();
                activateNode(node);
              }
            }}
            onPointerEnter={() => {
              if (!isMobile) activateNode(node);
            }}
            onPointerLeave={() => {
              if (!isMobile) deactivateNode();
            }}
            onClick={() => {
              if (!isMobile) toggleNode(node);
            }}
            onKeyDown={(event) => handleKeyDown(event, node)}
            onContextMenu={(event) => event.preventDefault()}
          >
            {!isMobile && (
              <div className="node-tooltip" style={{ pointerEvents: "none" }}>
                <h4>{node.institution || node.vocation || node.achievement}</h4>
                <br />
                <p>{node.intel}</p>
              </div>
            )}
          </div>
        );
      })}

      {isMobile && hoveredNode && (
        <div className="node-tooltip map-centered-tooltip" style={{ pointerEvents: "none" }}>
          <h4>
            {hoveredNode.institution ||
              hoveredNode.vocation ||
              hoveredNode.achievement}
          </h4>
          <br />
          <p>{hoveredNode.intel}</p>
        </div>
      )}
    </section>
  );
}

export default HoloMap;
