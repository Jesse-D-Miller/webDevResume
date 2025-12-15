import Battery from "../common/Battery.jsx";
import ClickableSection from "../common/ClickableSection.jsx";
import HeaderSection from "./HeaderSection.jsx";
import SummarySection from "./SummarySection.jsx";
import ProjectsSection from "./ProjectsSection.jsx";
import ExperienceSection from "./ExperienceSection.jsx";
import EducationSection from "./EducationSection.jsx";
import TechnicalSkillsSection from "./TechnicalSkillsSection.jsx";
import SoftSkillsSection from "./SoftSkillsSection.jsx";

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
        <TechnicalSkillsSection resumeData={resumeData} />  
      </ClickableSection>

      <ClickableSection
        sectionId="soft-skills"
        clickedSections={clickedSections}
        onSectionClick={onSectionClick}
        className="clickable-section box-10"
      >
        <SoftSkillsSection resumeData={resumeData} />
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
