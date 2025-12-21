import { useState, useEffect } from "react";
import ResumeFront from "./resume/ResumeFront";
import CyberResume from "./resume/CyberResume";
import PixelHero from "./common/PixelHero";
import { useXP } from "../hooks/useXP.js";
import SecretResume from "./SecretResume.jsx";
import { secretResumeData } from "../data/secretResume.js";

function Sheet({ resumeData, theme }) {
  const [isFlipped, setIsFlipped] = useState(false); //tracks which side of the resume is shown
  const { xp, maxXP } = useXP();

  useEffect(() => {
    // Handle spacebar press to flip the sheet
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        if (xp === 1) {
          setIsFlipped((prev) => !prev);
        } else {
          return;
        }
      }
    };

    // Add event listener for keydown
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [xp, maxXP]);

  return (
    <div className="sheet-container">
      {theme === "dark" ? (
        <div
          className="sheet-wrapper"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${isFlipped ? 180 : 0}deg)`,
          }}
        >
          <div
            className="sheet-face front-face"
            style={{
              backfaceVisibility: "hidden",
            }}
          >
            <ResumeFront resumeData={resumeData} theme={theme} />
          </div>
          <div
            className="sheet-face back-face"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <SecretResume secretResumeData={secretResumeData} />
          </div>
        </div>
      ) : (
        <CyberResume resumeData={resumeData} theme={theme} />
      )}

      {xp === 1 && (
        <button className="flip-hint" onClick={() => setIsFlipped(!isFlipped)}>
          {isFlipped ? "Show Resume" : "Show Secrets"}
        </button>
      )}

      <div className="hero-wrapper">
        <PixelHero />
      </div>
    </div>
  );
}

export default Sheet;
