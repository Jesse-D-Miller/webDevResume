import HeaderSection from "./HeaderSection.jsx";
import SummarySection from "./SummarySection.jsx";
import ProjectsSection from "./ProjectsSection.jsx";
import ExperienceSection from "./ExperienceSection.jsx";
import EducationSection from "./EducationSection.jsx";
import TechnicalSkillsSection from "./TechnicalSkillsSection.jsx";
import SoftSkillsSection from "./SoftSkillsSection.jsx";
import HobbiesSection from "./HobbiesSection.jsx";

function ResumeFront({ resumeData, theme }) {
  const getProjectNumber = (id) => {
    const match = String(id ?? "").match(/\d+/);
    return match ? Number.parseInt(match[0], 10) : 0;
  };
  const topProjects = [...resumeData.projects]
    .sort((a, b) => getProjectNumber(b.id) - getProjectNumber(a.id))
    .slice(0, 3);

  return (
    <div className="resume-front">
      <div className="box-1">
        <HeaderSection resumeData={resumeData} />
      </div>
      <div className="resume-columns">
        <div className="resume-left">
          <div className="box-2">
            <SummarySection resumeData={resumeData} />
          </div>

          {topProjects.map((project, index) => (
            <div key={project.id} className={`box-${index + 3}`}>
              <ProjectsSection
                project={project}
                index={index}
                theme={theme}
                showHeader={index === 0}
              />
            </div>
          ))}
          {resumeData.experience.map((job, index) => (
            <div key={job.id} className={`box-${index + 6}`}>
              <ExperienceSection
                job={job}
                index={index}
                theme={theme}
                showHeader={index === 0}
              />
            </div>
          ))}

          <div className="box-8">
            <EducationSection resumeData={resumeData} />
          </div>
        </div>

        <div className="resume-right">
          <div className="box-9">
            <TechnicalSkillsSection resumeData={resumeData} />
          </div>

          <div className="mobile-sub-grid-inner">
            <div className="box-10">
              <SoftSkillsSection resumeData={resumeData} />
            </div>

            <div className="box-11">
              <HobbiesSection resumeData={resumeData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeFront;
