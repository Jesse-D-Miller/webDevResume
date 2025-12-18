import { useXP } from "../../hooks/useXP.js";

function TechnicalSkillsSection({ resumeData }) {
  const { grantXp } = useXP();

  return (
    <section className="technical-skills-section"
    onClick={() => grantXp("technical-skills-section", 0, "Programming levels! I'm proud of this one. It shows, in order, the total bytes of code I've written in each language across all my GitHub projects.")}>
      <h3>TECHNICAL SKILLS</h3>
      <h4>Languages:</h4>
      <p>
        {resumeData.skills
          .filter((skill) => skill.tags.includes("language"))
          .map((skill) => skill.name)
          .join(", ")}
      </p>
      <h4>Frameworks & Libraries:</h4>
      <p>
        {resumeData.skills
          .filter((skill) => skill.tags.includes("framework"))
          .map((skill) => skill.name)
          .join(", ")}
      </p>
      <h4>Databases:</h4>
      <p>
        {resumeData.skills
          .filter((skill) => skill.tags.includes("database"))
          .map((skill) => skill.name)
          .join(", ")}
      </p>
      <h4>Testing:</h4>
      <p>
        {resumeData.skills
          .filter((skill) => skill.tags.includes("testing"))
          .map((skill) => skill.name)
          .join(", ")}
      </p>
      <h4>Tools & Other:</h4>
      <p>
        {resumeData.skills
          .filter(
            (skill) =>
              skill.tags.includes("version-control") ||
              skill.tags.includes("tooling") ||
              skill.tags.includes("api")
          )
          .map((skill) => skill.name)
          .join(", ")}
      </p>
    </section>
  );
}

export default TechnicalSkillsSection;
