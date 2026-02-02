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
  const projectVideoLink = project?.links?.video;
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
        {theme === "cyber" && (
          <div className="project-links">
            <a
              href={projectLiveLink || "#"}
              target={projectLiveLink ? "_blank" : undefined}
              rel={projectLiveLink ? "noopener noreferrer" : undefined}
              aria-disabled={!projectLiveLink}
              className={!projectLiveLink ? "disabled" : undefined}
              onClick={(event) => {
                if (!projectLiveLink) event.preventDefault();
              }}
            >
              WEBSITE
            </a>
            <span className="project-link-divider">|</span>
            <a
              href={projectCodeLink || "#"}
              target={projectCodeLink ? "_blank" : undefined}
              rel={projectCodeLink ? "noopener noreferrer" : undefined}
              aria-disabled={!projectCodeLink}
              className={!projectCodeLink ? "disabled" : undefined}
              onClick={(event) => {
                if (!projectCodeLink) {
                  event.preventDefault();
                  return;
                }
                grantXp(`project-click-${projectId}`, 1, projectHeroMessage);
              }}
              style={
                hasClicked(`project-click-${projectId}`)
                  ? clickedLinkStyle
                  : {}
              }
            >
              GITHUB
            </a>
            <span className="project-link-divider">|</span>
            <a
              href={projectVideoLink || "#"}
              target={projectVideoLink ? "_blank" : undefined}
              rel={projectVideoLink ? "noopener noreferrer" : undefined}
              aria-disabled={!projectVideoLink}
              className={!projectVideoLink ? "disabled" : undefined}
              onClick={(event) => {
                if (!projectVideoLink) event.preventDefault();
              }}
            >
              VIDEO
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProjectsSection;
