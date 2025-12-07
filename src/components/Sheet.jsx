import { useState, useEffect } from "react";
import ResumeFront from "./ResumeFront";

function Sheet() {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        setIsFlipped((prev) => !prev);
      }
    };

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
    </div>
  );
}

export default Sheet;
