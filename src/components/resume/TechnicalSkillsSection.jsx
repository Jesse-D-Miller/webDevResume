function TechnicalSkillsSection({ resumeData }) {
  return (
    <section className="technical-skills-section">
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
