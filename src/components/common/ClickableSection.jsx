import { createPortal } from "react-dom";
import { useState } from "react";

function ClickableSection({
  sectionId,
  clickedSections,
  onSectionClick,
  frontProjectId,
  frontExperienceId,
  onBringToFront,
  tabLabel,
  children,
  style,
  className,
}) {
  
  const [depth, setDepth] = useState(0); // to manage z-index for overlays
  const isClicked = clickedSections.has(sectionId);

  // Determine group and whether this overlay is currently front
  const isProject = sectionId.startsWith("project-");
  const isExperience = sectionId.startsWith("experience-");
  const isFront = isProject
    ? frontProjectId === sectionId
    : isExperience
    ? frontExperienceId === sectionId
    : false;

  const bringToFront = (e) => {
    e.stopPropagation();
    setDepth((d) => Math.min(d + 1, 3)); // optional: pop forward visually
    if (onBringToFront) {
      const group = isProject ? "project" : isExperience ? "experience" : null;
      if (group) onBringToFront(group, sectionId);
    }
  };

  const handleClick = (e) => {
    if (!isClicked) {
      const element = e.currentTarget; //gets the div that was clicked
      onSectionClick(sectionId, element);
      // Immediately set front so the overlay/tab animates on first reveal
      if (onBringToFront) {
        const group = isProject ? "project" : isExperience ? "experience" : null;
        if (group) onBringToFront(group, sectionId);
      }
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
              {(tabLabel ?? sectionId).toUpperCase()}
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
