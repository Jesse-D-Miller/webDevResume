import { useXP } from "../../hooks/useXP.js";

function ProjectsSection({ project, isFront, showHeader, theme }) {
  const { grantXp, hasClicked } = useXP();
  const projectId = project?.id ?? "unknown";
  const projectTitle = project?.title ?? "Project";
  const projectStack = project?.stack ?? [];
  const projectHighlights = project?.highlights ?? [];
  const projectHeroMessage = project?.heroMessage ?? "Project explored.";
  const projectCodeLink = project?.links?.code;
  const projectLiveLink = project?.links?.live;
  const projectPrimaryLink = projectLiveLink || projectCodeLink;

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
          {projectPrimaryLink ? (
            <a
              href={projectPrimaryLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {projectTitle}
            </a>
          ) : (
            projectTitle
          )}
        </h4>
        <p className="tech-stack">{projectStack.join(", ")}</p>
        <ul>
          {projectHighlights.map((highlight, i) => (
            <li key={i}>{highlight}</li>
          ))}
        </ul>
        {theme === "cyber" && (projectLiveLink || projectCodeLink) && (
          <div className="project-links">
            {projectLiveLink && (
              <a
                href={projectLiveLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                LIVE WEBSITE
              </a>
            )}
            {projectCodeLink && (
              <a
                href={projectCodeLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  grantXp(`project-click-${projectId}`, 1, projectHeroMessage)
                }
                style={
                  hasClicked(`project-click-${projectId}`)
                    ? clickedLinkStyle
                    : {}
                }
              >
                GITHUB
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProjectsSection;
