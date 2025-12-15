import Battery from "../common/Battery.jsx";
import ClickableSection from "../common/ClickableSection.jsx";
import HeaderSection from "./HeaderSection.jsx";
import SummarySection from "./SummarySection.jsx";
import ProjectsSection from "./ProjectsSection.jsx";
import ExperienceSection from "./ExperienceSection.jsx";
import EducationSection from "./EducationSection.jsx";

function ResumeFront({
  clickedSections = new Set(),
  onSectionClick = () => {},
  frontProjectId = null,
  frontExperienceId = null,
  onBringToFront = () => {},
  resumeData,
  summaryOff,
  setSummaryOff,
  isOverlay,
}) {
  return (
    <div className="resume-front">
      <ClickableSection
        sectionId="header"
        clickedSections={clickedSections}
        onSectionClick={onSectionClick}
        className="clickable-section box-1"
      >
        <HeaderSection
          onSectionClick={onSectionClick}
          resumeData={resumeData}
        />
      </ClickableSection>

      <ClickableSection
        sectionId="summary"
        clickedSections={clickedSections}
        onSectionClick={onSectionClick}
        className="clickable-section box-2"
      >
        <SummarySection
          resumeData={resumeData}
        />
      </ClickableSection>

      {resumeData.projects.map((project, index) => (
        <ClickableSection
          key={`project-${index}`}
          sectionId={`project-${index}`}
          clickedSections={clickedSections}
          onSectionClick={onSectionClick}
          frontProjectId={frontProjectId}
          onBringToFront={onBringToFront}
          tabLabel={project.title.split("-")[0].trim()}
          className={`clickable-section box-${index + 3}`}
        >
          <ProjectsSection project={project} index={index} />
        </ClickableSection>
      ))}

      {resumeData.experience.map((job, index) => (
        <ClickableSection
          key={`experience-${index}`}
          sectionId={`experience-${index}`}
          clickedSections={clickedSections}
          onSectionClick={onSectionClick}
          frontExperienceId={frontExperienceId}
          onBringToFront={onBringToFront}
          tabLabel={job.role}
          className={`clickable-section box-${index + 6}`}
        >
          <ExperienceSection job={job} index={index} />
        </ClickableSection>
      ))}

      <ClickableSection
        sectionId="education"
        clickedSections={clickedSections}
        onSectionClick={onSectionClick}
        className="clickable-section box-8"
      >
        <EducationSection resumeData={resumeData} />
      </ClickableSection>

      <ClickableSection
        sectionId="tech-skills"
        clickedSections={clickedSections}
        onSectionClick={onSectionClick}
        className="clickable-section box-9"
      >
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
      </ClickableSection>

      <ClickableSection
        sectionId="soft-skills"
        clickedSections={clickedSections}
        onSectionClick={onSectionClick}
        className="clickable-section box-10"
      >
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
      </ClickableSection>

      <ClickableSection
        sectionId="hobbies"
        clickedSections={clickedSections}
        onSectionClick={onSectionClick}
        className="clickable-section box-11"
      >
        <section className="hobbies-section">
          <h3>HOBBIES</h3>
          <div>
            {resumeData.hobbies.map((hobby, index) => (
              <p key={index}>{hobby}</p>
            ))}
          </div>
        </section>
      </ClickableSection>

      <ClickableSection
        sectionId="Battery-Indicator"
        clickedSections={clickedSections}
        onSectionClick={onSectionClick}
        className="clickable-section box-12"
      >
        <Battery charge={Math.min(clickedSections.size, 12)} />
      </ClickableSection>
    </div>
  );
}

export default ResumeFront;
