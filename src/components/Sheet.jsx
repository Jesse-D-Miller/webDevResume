import { useState, useEffect } from "react";
import ResumeFront from "./resume/ResumeFront";
import CyberResume from "./resume/CyberResume";
import PixelHero from "./common/PixelHero";
import { getRandomNeonColor } from "../utils/neonColor";
import CyberResume from "./resume/CyberResume";

function Sheet({ resumeData, theme }) {
  const [isFlipped, setIsFlipped] = useState(false); //tracks which side of the resume is shown
  const [interactionCount, setInteractionCount] = useState(0); //tracks number of interactions
  const [heroLevel, setHeroLevel] = useState(1); //tracks hero level based on interactions
  const [frontProjectId, setFrontProjectId] = useState(null);
  const [frontExperienceId, setFrontExperienceId] = useState(null);

  const handleBringToFront = (group, sectionId) => {
    if (group === "project") {
      setFrontProjectId(sectionId);
    } else if (group === "experience") {
      setFrontExperienceId(sectionId);
    }
  };

  useEffect(() => {
    // Update hero level based on interaction count
    if (interactionCount >= 12) setHeroLevel(5);
    else if (interactionCount >= 9) setHeroLevel(4);
    else if (interactionCount >= 6) setHeroLevel(3);
    else if (interactionCount >= 3) setHeroLevel(2);
    else setHeroLevel(1);
  }, [interactionCount]);

  useEffect(() => {
    // Handle spacebar press to flip the sheet
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        if (heroLevel === 5) {
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
  }, [heroLevel]);

  return (
    <div className="sheet-container">
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
          {theme === "dark" ? (
            <ResumeFront
              frontProjectId={frontProjectId}
              frontExperienceId={frontExperienceId}
              onBringToFront={handleBringToFront}
              resumeData={resumeData}
            />
          ) : (
            <CyberResume resumeData={resumeData} />
          )}
        </div>
        <div
          className="sheet-face back-face"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          Back: Secret Map Stats Here
        </div>
      </div>
      {heroLevel === 5 && (
        <button className="flip-hint" onClick={() => setIsFlipped(!isFlipped)}>
          {isFlipped ? "Show Resume" : "Show Secrets"}
        </button>
      )}
      <div className="hero-wrapper">
        <PixelHero level={heroLevel} />
      </div>
    </div>
  );
}

export default Sheet;
