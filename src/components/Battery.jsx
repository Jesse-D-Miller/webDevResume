import { useState } from "react";
import batteryCoverSpriteSheet from "../assets/batteryCoverSpriteSheet.png";

function Battery({ charge }) {
  const [coverOpen, setCoverOpen] = useState(false);
  const [animating, setAnimating] = useState(false);

  const handleClick = () => {
    setAnimating(true);
    setCoverOpen((open) => !open);
  };

  const handleAnimationEnd = () => {
    setAnimating(false);
  };

  return (
    <div className="battery" onClick={handleClick}>
      <div
        className={`battery-cover ${
          coverOpen ? "cover-open" : "cover-closed"
        } ${animating ? "cover-animating" : ""}`}
        style={{backgroundImage: `url(${batteryCoverSpriteSheet})`}}
        onAnimationEnd={handleAnimationEnd}
      />
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
