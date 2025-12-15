function SoftSkillsSection({ resumeData }) {
  return (
    <section className="soft-skills-section">
      <h3>SOFT SKILLS</h3>
      <div>
        {resumeData.skills
          .filter((skill) => skill.tags.includes("soft-skill"))
          .map((skill, index) => (
            <p key={index}>{skill.name}</p>
          ))}
      </div>
    </section>
  );
}

export default SoftSkillsSection;
