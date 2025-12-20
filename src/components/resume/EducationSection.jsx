function EducationSection({ resumeData, theme }) {
  return theme === "cyber" ? (
    <section className="education-section">
      <div className="bg-layer bg-base" />
      <div className="bg-layer bg-education" />
      <div className="bg-layer bg-career" />
      <div className="bg-layer bg-skills" />
    </section>
  ) : (
    <section className="education-section">
      <h3>EDUCATION</h3>
      {resumeData.education.map((edu, index) => (
        <div key={index} className="education-item">
          <h4>{edu.school}</h4>
          <p className="program-period">
            {edu.program} | {edu.period}
          </p>
          <ul>
            {edu.details.map((detail, i) => (
              <li key={i}>{detail}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

export default EducationSection;
