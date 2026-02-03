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
  const projectPrimaryKey = projectLiveLink
    ? `project-link-${projectId}-live`
    : projectCodeLink
      ? `project-link-${projectId}-code`
      : null;
  const liveKey = projectLiveLink
    ? `project-link-${projectId}-live`
    : null;
  const codeKey = projectCodeLink
    ? `project-link-${projectId}-code`
    : null;
  const videoKey = projectVideoLink
    ? `project-link-${projectId}-video`
    : null;

  const clickedLinkStyle = {
    color:
      theme === "cyber" ? "var(--color-neon-secondary)" : "var(--color-ink)",
    textDecoration: "none",
  };

  const handleProjectLinkClick = (event, link, clickKey) => {
    if (!link || !clickKey) {
      event.preventDefault();
      return;
    }
    grantXp(clickKey, 1, projectHeroMessage);
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
              onClick={(event) =>
                handleProjectLinkClick(event, projectPrimaryLink, projectPrimaryKey)
              }
              style={
                projectPrimaryKey && hasClicked(projectPrimaryKey)
                  ? clickedLinkStyle
                  : {}
              }
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
              onClick={(event) =>
                handleProjectLinkClick(event, projectLiveLink, liveKey)
              }
              style={liveKey && hasClicked(liveKey) ? clickedLinkStyle : {}}
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
              onClick={(event) =>
                handleProjectLinkClick(event, projectCodeLink, codeKey)
              }
              style={codeKey && hasClicked(codeKey) ? clickedLinkStyle : {}}
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
              onClick={(event) =>
                handleProjectLinkClick(event, projectVideoLink, videoKey)
              }
              style={videoKey && hasClicked(videoKey) ? clickedLinkStyle : {}}
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
