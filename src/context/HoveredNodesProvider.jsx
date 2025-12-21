import React, { useState } from "react";
import { HoveredNodesContext } from "./HoveredNodesContext";

export function HoveredNodesProvider({ children }) {
  // State to track hovered node IDs
  const [hoveredNode, setHoveredNode] = useState(null);
  const [hoveredNodeIds, setHoveredNodeIds] = useState(new Set());

  const value = {
    hoveredNode,
    setHoveredNode,
    hoveredNodeIds,
    setHoveredNodeIds,
  };

  return (
    <HoveredNodesContext.Provider value={value}>
      {children}
    </HoveredNodesContext.Provider>
  );
}