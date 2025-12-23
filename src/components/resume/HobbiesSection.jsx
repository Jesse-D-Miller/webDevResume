import { useXP } from "../../hooks/useXP.js";
import { useState } from "react";
import randomBetween from "../../utils/randomBetween.js";

function HobbiesSection({ resumeData, theme }) {
  const [bonusIndex, setBonusIndex] = useState(0);
  const [displayedHobbies, setDisplayedHobbies] = useState(resumeData.hobbies);
  const [flashes, setFlashes] = useState([]);
  const [scrollKey, setScrollKey] = useState(0);
  const { grantXp } = useXP();

  // each click adds a hobby to the hobbies section. the first click also adds XP
  const handleClick = () => {
    if (theme === "cyber" && bonusIndex < resumeData.bonusHobbies.length) {
      setDisplayedHobbies([
        ...displayedHobbies,
        resumeData.bonusHobbies[bonusIndex],
      ]);
      setBonusIndex(bonusIndex + 1);

      const key = Date.now() + Math.random();
      setFlashes(() => [
        {
          x: randomBetween(-200, 200),
          y: randomBetween(-15, 15),
          rotation: randomBetween(-50, 50),
          key: key,
        },
      ]);
      setTimeout(() => {
        setFlashes((prev) => prev.filter((f) => f.key !== key));
      }, 1500);

      setScrollKey((k) => k + 1);

      grantXp(
        `hobby-click`,
        1,
        `You found an extra hobby! I have a lot of interests outside of coding, and I'm always happy to share them.`
      );
    }
  };

  return (
    <section className="hobbies-section" onClick={handleClick}>
      <h3>HOBBIES</h3>
      {flashes.map((flash) => (
        <span
          key={flash.key}
          style={{
            left: `calc(50% + ${flash.x}px)`,
            top: `calc(50% + ${flash.y}px)`,
            "--plus-one-rotate": `${flash.rotation}deg`,
          }}
          className="plus-one-flash"
        >
          +1
        </span>
      ))}
      <div key={scrollKey}>
        {theme === "cyber"
          ? displayedHobbies.map((hobby, index) => <p key={index}>{hobby}</p>)
          : resumeData.hobbies.map((hobby, index) => (
              <p key={index}>{hobby}</p>
            ))}
      </div>
    </section>
  );
}

export default HobbiesSection;
