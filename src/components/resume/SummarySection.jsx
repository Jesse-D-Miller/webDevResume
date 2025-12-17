import { useState } from "react";

function SummarySection({ resumeData, theme }) {
  const [isPowered, setIsPowered] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handlePowerClick = () => {
    setHasInteracted(true);
    setIsPowered((prev) => !prev);
  };

  // Only animate after first interaction
  const summaryClass =
    "summary-section" +
    (isPowered
      ? hasInteracted
        ? " powered-on"
        : " powered-on-initial"
      : hasInteracted
      ? " powered-off"
      : " powered-off-initial");

  return (
    <section
      className={summaryClass}
    >
      {theme === "cyber" && (
        <button
          className="power-btn"
          onClick={ handlePowerClick }
          aria-label="Power On"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-84 31.5-156.5T197-763l56 56q-44 44-68.5 102T160-480q0 134 93 227t227 93q134 0 227-93t93-227q0-67-24.5-125T707-707l56-56q54 54 85.5 126.5T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-360v-440h80v440h-80Z" />
          </svg>
        </button>
      )}
      <div
        className={`summary-content${
          isPowered ? " powered-on" : " powered-off"
        }`}
      >
        <h3>SUMMARY</h3>
        <p>{resumeData.summary}</p>
      </div>
    </section>
  );
}

export default SummarySection;
