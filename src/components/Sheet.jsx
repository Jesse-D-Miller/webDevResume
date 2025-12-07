import { useState, useEffect } from "react";
import ResumeFront from "./ResumeFront";
import PixelHero from "./PixelHero";

function Sheet() {
  const [isFlipped, setIsFlipped] = useState(false); //tracks which side of the resume is shown
  const [interactionCount, setInteractionCount] = useState(0); //tracks number of interactions
  const [heroLevel, setHeroLevel] = useState(0); //tracks hero level based on interactions

  useEffect(() => {
    // Update hero level based on interaction count
    if (interactionCount >= 20) setHeroLevel(4);
    else if (interactionCount >= 15 ) setHeroLevel(3);
    else if (interactionCount >= 10) setHeroLevel(2);
    else if (interactionCount >= 5) setHeroLevel(1);
    else setHeroLevel(0);
  }, [interactionCount]);

  useEffect(() => {
    // Handle spacebar press to flip the sheet
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        setIsFlipped((prev) => !prev);
      }
    };

    // Add event listener for keydown
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="sheet-container">
      <div
        className="sheet-wrapper"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateY(${isFlipped ? 180 : 0}deg)`,
        }}
      >
        <div className="sheet-face front-face" style={{ backfaceVisibility: "hidden" }}>
          <ResumeFront />
        </div>
        <div
          className="sheet-face back-face"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          Back: Secret Map Stats Here
        </div>
      </div>
      <button className="flip-hint" onClick={() => setIsFlipped(!isFlipped)}>{isFlipped ? "Show Resume" : "Show Secrets"}</button>
      <div className="hero-wrapper">
      <PixelHero level={heroLevel} />
      </div>
    </div>
  );
}

export default Sheet;
