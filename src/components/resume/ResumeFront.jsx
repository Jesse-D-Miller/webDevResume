import HeaderSection from "./HeaderSection.jsx";
import SummarySection from "./SummarySection.jsx";
import ProjectsSection from "./ProjectsSection.jsx";
import ExperienceSection from "./ExperienceSection.jsx";
import EducationSection from "./EducationSection.jsx";
import TechnicalSkillsSection from "./TechnicalSkillsSection.jsx";
import SoftSkillsSection from "./SoftSkillsSection.jsx";
import HobbiesSection from "./HobbiesSection.jsx";

function ResumeFront({
  resumeData,
}) {
  return (
    <div className="resume-front">
      <div className="box-1">
        <HeaderSection
          resumeData={resumeData}
        />
      </div>

      <div className="box-2">
        <SummarySection resumeData={resumeData} />
      </div>

      {resumeData.projects.map((project, index) => (
        <div
          key={`project-${index}`}
          className={`box-${index + 3}`}
        >
          <ProjectsSection project={project} index={index} />
        </div>
      ))}
      {resumeData.experience.map((job, index) => (
        <div
          key={`experience-${index}`}
          className={`box-${index + 6}`}
        >
          <ExperienceSection job={job} index={index} />
        </div>
      ))}

      <div className="box-8">
        <EducationSection resumeData={resumeData} />
      </div>

      <div className="box-9">
        <TechnicalSkillsSection resumeData={resumeData} />
      </div>

      <div className="box-10">
        <SoftSkillsSection resumeData={resumeData} />
      </div>

      <div className="box-11">
        <HobbiesSection resumeData={resumeData} />
      </div>
    </div>
  );
}

export default ResumeFront;
