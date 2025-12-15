function projectsSection({ project, index }) {
  return (
    <section className="projects-section">
      {index === 0 && <h3>PROJECTS</h3>}
      <h4>{project.title}</h4>
      <p className="tech-stack">{project.stack.join(", ")}</p>
      <ul>
        {project.highlights.map((highlight, i) => (
          <li key={i}>{highlight}</li>
        ))}
      </ul>
    </section>
  );
}

export default projectsSection;