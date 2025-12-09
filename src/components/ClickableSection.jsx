function ClickableSection({
  sectionId,
  clickedSections,
  onSectionClick,
  children,
}) {
  const isClicked = clickedSections.has(sectionId);

  const handleClick = () => {
    if (!isClicked) {
      onSectionClick(sectionId);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={isClicked ? "burned" : ""}
      style={{ pointerEvents: isClicked ? "none" : "auto" }}
    >
      {children}
    </div>
  );
}

export default ClickableSection;
