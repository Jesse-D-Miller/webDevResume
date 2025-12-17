import { useXP } from "../../hooks/useXP.js";
import { useState } from "react";
import batteryCoverSpriteSheet from "../../assets/batteryCoverSpriteSheet.png";

function Battery({ charge }) {
  const [coverOpen, setCoverOpen] = useState(false);
  const [animating, setAnimating] = useState(false);
  const { xp, maxXp, grantXp, hasClicked } = useXP();

  const handleClick = () => {
    setAnimating(true);
    setCoverOpen((open) => !open);
    if (!hasClicked("battery-click")) {
      grantXp("battery-click", 1, "The Battery is Charging! Exploring my resume charges the battery. Once it's full, something special happens!");
    }
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
      {Array.from({ length: maxXp }).map((_, index) => (
        <div
          key={index}
          className={`battery-segment ${index < xp ? "charged" : ""}`}
        />
      ))}
    </div>
  );
}

export default Battery;
