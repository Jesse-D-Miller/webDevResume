import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import { use } from "react";

function ClickableSection({
  sectionId,
  clickedSections,
  onSectionClick,
  children,
  style,
  className,
}) {
  const [depth, setDepth] = useState(0); // to manage z-index for overlays
  const [isFront, setIsFront] = useState(false); // to manage which tabs are shown in projects/experiences
  const isClicked = clickedSections.has(sectionId);

  useEffect(() => {
    const handler = (e) => {
      const id = e.detail?.id;
      setIsFront(id === sectionId);
    };
    window.addEventListener("overlay:front", handler);
    return () => {
      window.removeEventListener("overlay:front", handler);
    }}, [sectionId]);

  const bringToFront = (e) => {
    e.stopPropagation();
    setDepth((d) => Math.min(d + 1, 3)); // optional: pop forward visually
    window.dispatchEvent(
      new CustomEvent("overlay:front", { detail: { id: sectionId } })
    );
  };

  const handleClick = (e) => {
    if (!isClicked) {
      const element = e.currentTarget; //gets the div that was clicked
      onSectionClick(sectionId, element);
    }
  };

  // Compute overlay class (maps box-N -> overlay-box-N) if present
  const overlayClass = className
    ? className.replace(/box-(\d+)/, "overlay-box-$1")
    : undefined;

  const base = (
    <div
      onClick={handleClick}
      className={`clickable-section ${className ? className : ""} ${
        isClicked ? "burned" : ""
      }`}
      style={{ ...style, pointerEvents: isClicked ? "none" : "auto" }}
    >
      {children}
    </div>
  );

  if (isClicked) {
    const overlayRoot = document.getElementById("sheet-overlay-root");
    if (overlayRoot) {
      // to differentiate between project and experience sections for tabbing
      const isProject = sectionId.startsWith("project-");
      const isExperience = sectionId.startsWith("experience-");

      // Calculate tab left position based on section type and index
      const sectionIndex = isProject
        ? Number(sectionId.split("-")[1])
        : isExperience
        ? Number(sectionId.split("-")[1])
        : 0;
      const tabGap = 100; // px between tabs
      const tabLeft = 10 + sectionIndex * tabGap; // stagger

      // Render an enlarged overlay copy into the outer grid via portal
      // Read neon vars from the base element so overlay matches per-box color
      const neonColor =
        typeof window !== "undefined" && document
          ? document
              .querySelector(
                `.clickable-section.${className?.split(" ").join(".")}`
              )
              ?.style.getPropertyValue("--neon-color") || undefined
          : undefined;
      const neonOpacity =
        typeof window !== "undefined" && document
          ? document
              .querySelector(
                `.clickable-section.${className?.split(" ").join(".")}`
              )
              ?.style.getPropertyValue("--neon-color-opacity") || undefined
          : undefined;

      const inlineStyle = {};
      if (neonColor) inlineStyle["--neon-color"] = neonColor;
      if (neonOpacity) inlineStyle["--neon-color-opacity"] = neonOpacity;

      const overlay = (
        <div
          className={`overlay-item ${overlayClass ??""} burned ${isFront ? "overlay-front" : ""}`}
          style={inlineStyle}
        >
          {(isProject || isExperience) && (
            <button
              className="folder-tab"
              type="button"
              style={{ left: `${tabLeft}px` }} // Adjust tab position
              onClick={bringToFront}
              aria-label="Cycle project depth"
            >
              {sectionId.toUpperCase()}
            </button>
          )}
          <div className="overlay-content" style={{ "--z": depth }}>
            {children}
          </div>
        </div>
      );
      return (
        <>
          {base}
          {createPortal(overlay, overlayRoot)}
        </>
      );
    }
  }

  return base;
}

export default ClickableSection;
