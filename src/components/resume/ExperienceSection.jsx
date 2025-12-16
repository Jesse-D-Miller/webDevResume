function ExperienceSection({ job, isFront, showHeader }) {
  return (
    <section className={`experience-section${isFront ? " front" : ""}`}>
      {showHeader && <h3>EXPERIENCE</h3>}
      <div className="section-content">
        <h4>
          {job.company} - {job.role}
        </h4>
        <p className="company-period">{job.period}</p>
        <ul>
          {job.bullets.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default ExperienceSection;
