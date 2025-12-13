import { createPortal } from "react-dom";
import { useState } from "react";

function ClickableSection({
  sectionId,
  clickedSections,
  onSectionClick,
  children,
  style,
  className,
}) {
  const isClicked = clickedSections.has(sectionId);

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
      const [depth, setDepth] = useState(0); // to manage z-index for overlays

      // Calculate tab left position based on section type and index
      const sectionIndex = isProject ? Number(sectionId.split("-")[1]) : isExperience ? Number(sectionId.split("-")[1]) : 0;
      const tabGap = 90; // px between tabs
      const tabLeft = 20 + sectionIndex * tabGap; // stagger

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
          className={`overlay-item ${overlayClass ? overlayClass : ""} burned`}
          style={inlineStyle}
        >
          {(isProject || isExperience) && (
            <button
              className="folder-tab"
              type="button"
              style={{ left: `${tabLeft}px` }} // Adjust tab position
              onClick={(e) => {
                e.stopPropagation();
                setDepth((d) => (d + 1) % 4);
              }}
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
