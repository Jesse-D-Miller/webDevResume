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
  const [frontProjectId, setFrontProjectId] = useState(
    resumeData.projects[0]?.id ?? null
  ); // Track front project in tab stacks
  const [frontExperienceId, setFrontExperienceId] = useState(
    resumeData.experience[0]?.id ?? null
  ); // Track front experience in tab stacks

  const [neonColors, setNeonColors] = useState({});
  const [experienceNeonColors, setExperienceNeonColors] = useState({});

  useEffect(() => {
    const boxes = document.querySelectorAll(
      ".cyber-resume .box-3, .cyber-resume .box-4, .cyber-resume .box-5"
    );
    const colors = {};
    boxes.forEach((box, idx) => {
      const color = getRandomNeonColor(box);
      const projectId = resumeData.projects[idx]?.id;
      if (projectId) colors[projectId] = color;
    });
    setNeonColors(colors);
  }, [resumeData.projects]);

  useEffect(() => {
    const experienceBoxes = document.querySelectorAll(
      ".cyber-resume .box-6, .cyber-resume .box-7"
    );
    const experienceColors = {};
    experienceBoxes.forEach((box, idx) => {
      const color = getRandomNeonColor(box);
      const experienceId = resumeData.experience[idx]?.id;
      if (experienceId) experienceColors[experienceId] = color;
    });
    setExperienceNeonColors(experienceColors);
  }, [resumeData.experience]);

  useEffect(() => {
    // Select all .box- elements and apply random neon colors from the utility function getRandomNeonColor
    const boxes = document.querySelectorAll(
      ".cyber-resume .box-1, .cyber-resume .box-2, .cyber-resume .box-6, .cyber-resume .box-7, .cyber-resume .box-8, .cyber-resume .box-9, .cyber-resume .box-10, .cyber-resume .box-11, .cyber-resume .box-12"
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

      <div className="project-tabs-row">
        {resumeData.projects.map((project) => (
          <div
            key={project.id}
            className={`folder-tab${
              frontProjectId === project.id ? " active" : ""
            }`}
            style={{
              "--neon-color": neonColors[project.id]?.rgb
                ? `rgb(${neonColors[project.id].rgb})`
                : undefined,
              "--neon-color-opacity": neonColors[project.id]?.opacity,
            }}
            onClick={() => setFrontProjectId(project.id)}
          >
            {project.title.split("-")[0].trim()}
          </div>
        ))}
      </div>
      {resumeData.projects.map((project, index) => (
        <div
          key={project.id}
          className={`box-${index + 3}${
            frontProjectId === project.id ? " front" : ""
          }`}
        >
          <ProjectsSection
            project={project}
            isFront={frontProjectId === project.id}
            showHeader={true}
          />
        </div>
      ))}

      <div className="experience-tabs-row">
        {resumeData.experience.map((job) => (
          <div
            key={job.id}
            className={`folder-tab${
              frontExperienceId === job.id ? " active" : ""
            }`}
            style={{
              "--neon-color": experienceNeonColors[job.id]?.rgb
                ? `rgb(${experienceNeonColors[job.id].rgb})`
                : undefined,
              "--neon-color-opacity": experienceNeonColors[job.id]?.opacity,
            }}
            onClick={() => setFrontExperienceId(job.id)}
          >
            {job.role}
          </div>
        ))}
      </div>
      {resumeData.experience.map((job, index) => (
        <div
          key={job.id}
          className={`box-${index + 6}${
            frontExperienceId === job.id ? " front" : ""
          }`}
        >
          <ExperienceSection
            job={job}
            index={index}
            isFront={frontExperienceId === job.id}
            showHeader={true}
          />
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
