import { useXP } from "../../hooks/useXP.js";

function ProjectsSection({ project, isFront, showHeader, theme }) {
  const { grantXp, hasClicked } = useXP();

  const clickedLinkStyle = {
    color:
      theme === "cyber" ? "var(--color-neon-secondary)" : "var(--color-ink)",
    textDecoration: "none",
  };

  return (
    <section className={`projects-section${isFront ? " front" : ""}`}>
      {showHeader && <h3>PROJECTS</h3>}
      <div className="section-content">
        <h4>
          <a
            href={project.links.code}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              grantXp(
                `project-click-${project.id}`,
                1,
                `${project.heroMessage}`
              )
            }
            style={
              hasClicked(`project-click-${project.id}`) ? clickedLinkStyle : {}
            }
          >
            {project.title}
          </a>
        </h4>
        <p className="tech-stack">{project.stack.join(", ")}</p>
        <ul>
          {project.highlights.map((highlight, i) => (
            <li key={i}>{highlight}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default ProjectsSection;
