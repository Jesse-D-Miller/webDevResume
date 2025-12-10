function ClickableSection({
  sectionId,
  clickedSections,
  onSectionClick,
  children,
  style,
}) {
  const isClicked = clickedSections.has(sectionId);

  const handleClick = (e) => {
    if (!isClicked) {
      const element = e.currentTarget; //gets the div that was clicked
      onSectionClick(sectionId, element);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`clickable-section ${isClicked ? "burned" : ""}`}
      style={{ ...style, pointerEvents: isClicked ? "none" : "auto" }}
    >
      {children}
    </div>
  );
}

export default ClickableSection;
