import { useXP } from "../../hooks/useXP.js";
import HeaderSection from "./HeaderSection.jsx";
import SummarySection from "./SummarySection.jsx";
import ProjectsSection from "./ProjectsSection.jsx";
import ExperienceSection from "./ExperienceSection.jsx";
import EducationSection from "./EducationSection.jsx";
import TechnicalSkillsSection from "./TechnicalSkillsSection.jsx";
import SoftSkillsSection from "./SoftSkillsSection.jsx";
import HobbiesSection from "./HobbiesSection.jsx";
import Battery from "../common/Battery.jsx";
import GithubLanguageSkills from "./GithubLanguageSkills";
import GithubStatsView from "./GithubStatsView.jsx";
import HoloMap from "./HoloMap.jsx";

import { getRandomNeonColor } from "../../utils/neonColor.js";
import { useEffect, useMemo, useState } from "react";

function CyberResume({ resumeData, theme }) {
  const getProjectNumber = (id) => {
    const match = String(id ?? "").match(/\d+/);
    return match ? Number.parseInt(match[0], 10) : 0;
  };
  const topProjects = useMemo(
    () =>
      [...resumeData.projects]
        .sort((a, b) => getProjectNumber(b.id) - getProjectNumber(a.id))
        .slice(0, 3),
    [resumeData.projects]
  );

  const [viewIndex, setViewIndex] = useState(0); // Track current view index for technical skills
  const [frontProjectId, setFrontProjectId] = useState(
    topProjects[0]?.id ?? null
  ); // Track front project in tab stacks
  const [frontExperienceId, setFrontExperienceId] = useState(
    resumeData.experience[0]?.id ?? null
  ); // Track front experience in tab stacks

  const [neonColors, setNeonColors] = useState({});
  const [experienceNeonColors, setExperienceNeonColors] = useState({});

  const { grantXp } = useXP();

  // Define the different technical skills views and which is currently active
  const techViews = [
    <TechnicalSkillsSection resumeData={resumeData} />,
    <GithubLanguageSkills />,
    <GithubStatsView />,
  ];

  const handleNextView = () => {
    setViewIndex((prevIndex) => (prevIndex + 1) % techViews.length);
  };

  useEffect(() => {
    const boxes = document.querySelectorAll(
      ".cyber-resume .box-3, .cyber-resume .box-4, .cyber-resume .box-5"
    );
    const colors = {};
    boxes.forEach((box, idx) => {
      const color = getRandomNeonColor(box);
      const projectId = topProjects[idx]?.id;
      if (projectId) colors[projectId] = color;
    });
    setNeonColors(colors);
  }, [topProjects]);

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
      ".cyber-resume .box-1, .cyber-resume .box-2, .cyber-resume .box-8, .cyber-resume .box-9, .cyber-resume .box-10, .cyber-resume .box-11, .cyber-resume .box-12"
    );
    boxes.forEach((box) => getRandomNeonColor(box));
  }, []);

  return (
    <div className="cyber-resume">
      <div className="box-1">
        <HeaderSection resumeData={resumeData} theme={theme} />
      </div>

      <div className="box-2">
        <SummarySection resumeData={resumeData} theme={theme} />
      </div>

      <div className="project-tabs-row">
        {topProjects.map((project, index) => {
          const shortTitle = project.title.split("-")[0].trim();
          const isLong = shortTitle.length > 18;
          const defaultTabZIndex = topProjects.length - index;
          return (
            <div
              key={project.id}
              className={`folder-tab${
                frontProjectId === project.id ? " active" : ""
              }`}
              data-long={isLong ? "true" : "false"}
              style={{
                "--neon-color": neonColors[project.id]?.rgb
                  ? `rgb(${neonColors[project.id].rgb})`
                  : undefined,
                "--neon-color-opacity": neonColors[project.id]?.opacity,
                zIndex:
                  frontProjectId === project.id ? 6 : defaultTabZIndex,
              }}
              onClick={() => setFrontProjectId(project.id)}
            >
              {shortTitle}
            </div>
          );
        })}
      </div>
      {topProjects.map((project, index) => (
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
            theme={theme}
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
            onClick={() => {
              setFrontExperienceId(job.id);
              grantXp(
                "experience-tabs",
                1,
                "My most recent experience was with the BC Wildfire Service, but I’ve worn a lot of hats - tree planter, bartender, farmhand, and more. I’m always up for a new challenge, and I’d love the chance to bring my skills to your team next."
              );
            }}
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

     

      <div className="box-9" onClick={handleNextView}>
        <div className="page-indicator">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`indicator-circle${viewIndex === i ? " filled" : ""}`}
            />
          ))}
        </div>
        {techViews[viewIndex]}
      </div>

      <div className="box-10">
        <SoftSkillsSection resumeData={resumeData} theme={theme} />
      </div>

      <div className="box-11">
        <HobbiesSection resumeData={resumeData} theme={theme} />
      </div>
      <div className="box-12">
        <Battery />
      </div>

 <div className="box-8">
        {theme === "cyber" ? <HoloMap resumeData={resumeData} /> : <EducationSection resumeData={resumeData}/>}
      </div>

    </div>
  );
}

export default CyberResume;
