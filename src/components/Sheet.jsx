import { useState, useEffect } from "react";
import ResumeFront from "./ResumeFront";
import PixelHero from "./PixelHero";

function Sheet() {
  const [isFlipped, setIsFlipped] = useState(false); //tracks which side of the resume is shown
  const [interactionCount, setInteractionCount] = useState(0); //tracks number of interactions
  const [heroLevel, setHeroLevel] = useState(1); //tracks hero level based on interactions
  const [clickedSections, setClickedSections] = useState(new Set()); //tracks clicked sections

  const burnPercentage = (clickedSections.size / 11) * 100;

  const handleSectionClick = (sectionId) => {
    setClickedSections((prev) => new Set(prev).add(sectionId));
    setInteractionCount((count) => count + 1);
  };

  const isFullyClicked = clickedSections.size === 12; //12 sections total

  useEffect(() => {
    // Update hero level based on interaction count
    if (interactionCount >= 20) setHeroLevel(5);
    else if (interactionCount >= 15) setHeroLevel(4);
    else if (interactionCount >= 10) setHeroLevel(3);
    else if (interactionCount >= 5) setHeroLevel(2);
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
        onClick={() => {
          setInteractionCount((count) => count + 1);
        }} //increment interaction count on click
      >
        <div
          className="sheet-face front-face"
          style={{
            backfaceVisibility: "hidden",
            "--burn-percentage": burnPercentage / 100,
          }}
        >
          <ResumeFront
            clickedSections={clickedSections}
            onSectionClick={handleSectionClick}
          />
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
