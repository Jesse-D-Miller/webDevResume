import HeaderSection from "./HeaderSection.jsx";
import SummarySection from "./SummarySection.jsx";
import ProjectsSection from "./ProjectsSection.jsx";
import ExperienceSection from "./ExperienceSection.jsx";
import EducationSection from "./EducationSection.jsx";
import TechnicalSkillsSection from "./TechnicalSkillsSection.jsx";
import SoftSkillsSection from "./SoftSkillsSection.jsx";
import HobbiesSection from "./HobbiesSection.jsx";
import Battery from "../common/Battery.jsx";

import { getRandomNeonColor } from "../../utils/neonColor.js";
import { useEffect, useState } from "react";

function CyberResume({ resumeData, theme }) {
  const [frontProjectId, setFrontProjectId] = useState(resumeData.projects[0]?.id ?? null); // Track front project in tab stacks

  useEffect(() => {
    // Select all .box- elements and apply random neon colors from the utility function getRandomNeonColor
    const boxes = document.querySelectorAll(
      ".cyber-resume .box-1, .cyber-resume .box-2, .cyber-resume .box-3, .cyber-resume .box-4, .cyber-resume .box-5, .cyber-resume .box-6, .cyber-resume .box-7, .cyber-resume .box-8, .cyber-resume .box-9, .cyber-resume .box-10, .cyber-resume .box-11, .cyber-resume .box-12"
    );
    boxes.forEach((box) => getRandomNeonColor(box));
  }, []);

  return (
    <div className="cyber-resume">
      <div className="box-1">
        <HeaderSection resumeData={resumeData} />
      </div>

      <div className="box-2">
        <SummarySection resumeData={resumeData} />
      </div>

      {resumeData.projects.map((project, index) => (
        <div key={project.id} className={`box-${index + 3}`}>
          <ProjectsSection
            project={project}
            isFront={frontProjectId === project.id}
            showHeader={true}
            
          />
        </div>
      ))}
      {resumeData.experience.map((job, index) => (
        <div key={`experience-${index}`} className={`box-${index + 6}`}>
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
      <div className="box-12">
        <Battery />
      </div>
    </div>
  );
}

export default CyberResume;
