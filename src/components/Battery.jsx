import { useState } from "react";
// import batteryCoverSpriteSheet from "../assets/battery_cover_sprite_sheet.png";

function Battery({ charge }) {
  const [coverOpen, setCoverOpen] = useState(false);

  return (
    <div
      className="battery"
      onClick={() => setCoverOpen((coverOpen) => !coverOpen)}
    >
      <div className={`battery-cover ${coverOpen ? "cover-open" : ""}`} />
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className={`battery-segment ${index < charge ? "charged" : ""}`}
        />
      ))}
    </div>
  );
}

export default Battery;
