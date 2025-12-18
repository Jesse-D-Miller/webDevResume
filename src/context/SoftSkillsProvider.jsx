import { useState } from "react";
import { SoftSkillsContext } from "./SoftSkillsContext";
import { resumeData } from "../data/resume.js";

export const SoftSkillsProvider = ({ children }) => {
  const [displayedSkills, setDisplayedSkills] = useState(
    resumeData.skills.filter((skill) => skill.tags.includes("soft-skill"))
  );

  const contextValue = { displayedSkills, setDisplayedSkills };

  return (
    <SoftSkillsContext.Provider value={contextValue}>
      {children}
    </SoftSkillsContext.Provider>
  );
};
