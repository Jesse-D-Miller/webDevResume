import { useContext } from "react";
import { SoftSkillsContext } from "../context/SoftSkillsContext";

export const useSoftSkills = () => {
	const context = useContext(SoftSkillsContext);
	if (!context) {
		throw new Error("useSoftSkills must be used within SoftSkillsProvider");
	}
	return context;
};