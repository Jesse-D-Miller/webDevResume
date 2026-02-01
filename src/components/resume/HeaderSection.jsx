import { useXP } from "../../hooks/useXP.js";
import { useState } from "react";

function HeaderSection({ resumeData, theme }) {
  const [screenState, setScreenState] = useState(0);
  const { hasClicked, grantXp, xp, maxXp } = useXP();
  const safePercent = maxXp ? Math.min(100, (xp / maxXp) * 100) : 0;
  const headerName = resumeData?.meta?.name?.toUpperCase?.() || "";
  const headerLocation = resumeData?.meta?.location || "";
  const headerEmail = resumeData?.meta?.links?.email || "";
  const headerLinkedIn = resumeData?.meta?.links?.linkedin || "#";
  const headerGitHub = resumeData?.meta?.links?.github || "#";

  const handleClick = () => {
    setScreenState((prevState) => (prevState + 1) % 3);
  };
  const stopHeaderClick = (event) => {
    event.stopPropagation();
  };

  let headerContent;
  if (theme !== "cyber") {
    headerContent = <h1>{headerName}</h1>;
  } else {
    switch (screenState) {
      case 0:
        headerContent = <h1>{headerName}</h1>;
        break;
      case 1:
        headerContent = (
          <h1 className="case-1">
            {headerName}
          </h1>
        );
        break;
      case 2:
        headerContent = (
          <h1 className="case-2">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${safePercent}%` }}
              >{maxXp ? `${safePercent.toFixed(2)}%` : "0%"}</div>
            </div>
          </h1>
        );
        break;
    }
  }

  return (
    <header
      className="resume-header"
      onClick={theme === "cyber" ? handleClick : undefined}
      style={{ height: "100%", width: "100%" }}
    >
      {headerContent}
      <p className="contact-info">
        {headerLocation} | (604) 698-8224 | {headerEmail} |{" "}
        <a
          href={headerLinkedIn}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => {
            stopHeaderClick(event);
            grantXp("linkedin-link", 1, "You found my LinkedIn!");
          }}
          style={hasClicked("linkedin-link") ? { opacity: 0.5 } : {}}
        >
          LinkedIn
        </a>{" "}
        |{" "}
        <a
          href={headerGitHub}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => {
            stopHeaderClick(event);
            grantXp("github-link", 1, "You found my GitHub!");
          }}
          style={hasClicked("github-link") ? { opacity: 0.5 } : {}}
        >
          GitHub
        </a>
      </p>
    </header>
  );
}

export default HeaderSection;
