import { useXP } from "../../hooks/useXP.js";
import { useState } from "react";

function SoftSkillsSection({ resumeData, theme }) {
  const [displayedSkills, setDisplayedSkills] = useState(resumeData.skills.filter((skill) => skill.tags.includes("soft-skill"))) ;
  const [bonusIndex, setBonusIndex] = useState(0);

  const { grantXp } = useXP();

  // each click adds a skill to the soft skills section. 42 bonus skills available
  const handleClick = () => {
    if (theme === "cyber" && bonusIndex < resumeData.bonusSoftSkills.length) {
      setDisplayedSkills([...displayedSkills, resumeData.bonusSoftSkills[bonusIndex]]);
      setBonusIndex(bonusIndex + 1);
      grantXp(
        `soft-skill-click`,
        1,
        `When I was writing this section, I was told that I listed too many soft skills. Don't worry, you can still see them by clicking here!`
      );
    }
  }

  return (
    <section className="soft-skills-section">
      <h3>SOFT SKILLS</h3>
      <div className="soft-skills-list" onClick={handleClick}>
        {(theme === "cyber" ? ( displayedSkills.map((skill, index) => (
          <p key={index}>{skill.name}</p>
        ))) : resumeData.skills
          .filter((skill) => skill.tags.includes("soft-skill"))
          .map((skill, index) => (
            <p key={index}>{skill.name}</p>
          )))}
      </div>
    </section>
  );
}

export default SoftSkillsSection;
