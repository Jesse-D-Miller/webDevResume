import { useXP } from "../../hooks/useXP.js";
import { useRef, useState, useEffect } from "react";
import batteryCoverSpriteSheet from "../../assets/batteryCoverSpriteSheet.png";

function Battery({ charge }) {
  const [coverOpen, setCoverOpen] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [xpFloats, setXpFloats] = useState([]);
  const { xp, maxXp, grantXp, hasClicked } = useXP();

  const prevXp = useRef(xp);

  useEffect(() => {
  if (xp > prevXp.current) {
    const key = Date.now() + Math.random();
    setXpFloats((prev) => [...prev, { key }]);
    setTimeout(() => {
      setXpFloats((prev) => prev.filter(f => f.key !== key));
    }, 1100); 
  }
  prevXp.current = xp;
}, [xp]);

  const handleClick = () => {
    setAnimating(true);
    setCoverOpen((open) => !open);
    if (!hasClicked("battery-click")) {
      grantXp(
        "battery-click",
        1,
        "The Battery is Charging! Exploring my resume charges the battery. Once it's full, something special happens!"
      );
    }
  };

  const handleAnimationEnd = () => {
    setAnimating(false);
  };

  return (
    <div className="battery" onClick={handleClick}>
      {xpFloats.map((f) => (
        <span key={f.key} className="battery-xp-float">
          +1 XP
        </span>
      ))}
      <div
        className={`battery-cover ${
          coverOpen ? "cover-open" : "cover-closed"
        } ${animating ? "cover-animating" : ""}`}
        style={{ backgroundImage: `url(${batteryCoverSpriteSheet})` }}
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
