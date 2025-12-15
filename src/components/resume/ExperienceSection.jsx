function ExperienceSection({ job, index }) {
  return (
    <section className="experience-section">
      {index === 0 && <h3>EXPERIENCE</h3>}
      <h4>
        {job.company} - {job.role}
      </h4>
      <p className="company-period">{job.period}</p>
      <ul>
        {job.bullets.map((bullet, i) => (
          <li key={i}>{bullet}</li>
        ))}
      </ul>
    </section>
  );
}

export default ExperienceSection;
