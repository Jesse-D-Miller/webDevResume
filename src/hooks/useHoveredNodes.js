import { useContext } from "react";
import { HoveredNodesContext } from "../context/HoveredNodesContext";
export const useHoveredNodes = () => useContext(HoveredNodesContext);