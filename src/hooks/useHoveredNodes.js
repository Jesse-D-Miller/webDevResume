import { useContext } from "react";
import { HoveredNodesContext } from "../context/HoveredNodesContext";

export const useHoveredNodes = () => {
	const context = useContext(HoveredNodesContext);
	if (!context) {
		throw new Error("useHoveredNodes must be used within HoveredNodesProvider");
	}
	return context;
};