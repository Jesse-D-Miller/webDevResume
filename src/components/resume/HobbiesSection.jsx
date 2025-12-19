import { useXP } from "../../hooks/useXP.js";
import { useState } from "react";

function HobbiesSection({ resumeData, theme }) {
  const { grantXp } = useXP();
  const [bonusIndex, setBonusIndex] = useState(0);
  const [displayedHobbies, setDisplayedHobbies] = useState(resumeData.hobbies);

  const handleClick = () => {
    if (theme === "cyber" && bonusIndex < resumeData.bonusHobbies.length) {
      setDisplayedHobbies([
        ...displayedHobbies,
        resumeData.bonusHobbies[bonusIndex],
      ]);
      setBonusIndex(bonusIndex + 1);
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
      <div>
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
