import { createPortal } from "react-dom";

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
      // Render an enlarged overlay copy into the outer grid via portal
      // Read neon vars from the base element so overlay matches per-box color
      const neonColor = (typeof window !== "undefined" && document)
        ? (document.querySelector(`.clickable-section.${className?.split(" ").join(".")}`)?.style.getPropertyValue("--neon-color") || undefined)
        : undefined;
      const neonOpacity = (typeof window !== "undefined" && document)
        ? (document.querySelector(`.clickable-section.${className?.split(" ").join(".")}`)?.style.getPropertyValue("--neon-color-opacity") || undefined)
        : undefined;

      const inlineStyle = {};
      if (neonColor) inlineStyle["--neon-color"] = neonColor;
      if (neonOpacity) inlineStyle["--neon-color-opacity"] = neonOpacity;

      const overlay = (
        <div
          className={`overlay-item ${overlayClass ? overlayClass : ""} burned`}
          style={inlineStyle}
        >
          {children}
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
