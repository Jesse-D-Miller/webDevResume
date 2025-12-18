import { useXP } from "../../hooks/useXP.js";
import { useState } from "react";

function HeaderSection({ resumeData, theme }) {
  const [screenState, setScreenState] = useState(0);
  const { hasClicked, grantXp } = useXP();

  const handleClick = () => {
    setScreenState((prevState) => (prevState + 1) % 3);
  };

  console.log(screenState);

  let headerContent;
  if (theme !== "cyber") {
    headerContent = <h1>{resumeData.meta.name.toUpperCase()}</h1>;
  } else {
    switch (screenState) {
      case 0:
        headerContent = (
          <h1 onClick={handleClick}>{resumeData.meta.name.toUpperCase()}</h1>
        );
        break;
      case 1:
        headerContent = (
          <h1 onClick={handleClick} className="case-1">
            {resumeData.meta.name.toUpperCase()}
          </h1>
        );
        break;
      case 2:
        headerContent = (
          <h1 onClick={handleClick} className="case-2">
            {resumeData.meta.name.toUpperCase()}
          </h1>
        );
        break;
    }
  }

  return (
    <header className="resume-header">
      {headerContent}
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
