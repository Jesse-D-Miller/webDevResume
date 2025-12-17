import { useXP } from "../../hooks/useXP.js";

function HeaderSection({ resumeData }) {
  const { hasClicked, grantXp } = useXP();

  return (
    <header className="resume-header">
      <h1>{resumeData.meta.name}</h1>
      <p className="contact-info">
        {resumeData.meta.location} | (604) 698-8224 |{" "}
        {resumeData.meta.links.email} |{" "}
        <a
          href={resumeData.meta.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => grantXp("linkedin-link", 1, "You found my LinkedIn!")}
          style={hasClicked("linkedin-link") ? { opacity: 0.5 } : {}}
        >
          LinkedIn
        </a>{" "}
        |{" "}
        <a
          href={resumeData.meta.links.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => grantXp("github-link", 1, "You found my GitHub!")}
          style={hasClicked("github-link") ? { opacity: 0.5 } : {}}
        >
          GitHub
        </a>
      </p>
    </header>
  );
}

export default HeaderSection;
