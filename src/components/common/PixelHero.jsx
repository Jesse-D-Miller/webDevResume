import { useXP } from "../../hooks/useXP";
import { useState, useEffect } from "react";
import spriteLevel1 from "../../assets/pixelHeroLevel1.png";
import spriteLevel2 from "../../assets/pixelHeroLevel2.png";
import spriteLevel3 from "../../assets/pixelHeroLevel3.png";
import spriteLevel4 from "../../assets/pixelHeroLevel4.png";
import spriteLevel5 from "../../assets/pixelHeroLevel5.png";

function PixelHero() {
  const [frameIndex, setFrameIndex] = useState(0);
  const [showLevelUpMessage, setShowLevelUpMessage] = useState(true);
  const { xp, grantXp, heroMessage } = useXP();

  const level = Math.min(1 + Math.floor(xp / 3), 5); // level 1-5 based on xp

  // Animate sprite frames (1000ms per frame)
  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex((prevIndex) => (prevIndex + 1) % 3); // 3 frames per level
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // if hero level changes, show level up message briefly
  useEffect(() => {
    setShowLevelUpMessage(true);
    const timer = setTimeout(() => {
      setShowLevelUpMessage(false);
    }, 4000); // hide after 4 seconds
    return () => clearTimeout(timer);
  }, [level]);

  //level up messages
  const hints = {
    1: "Hey! I'm Jesse and this is my resume.",
    2: "Am...Am I glowing? Neat!",
    3: "Another level! Keep exploring!",
    4: "Oh wow, I'm feeling powerful!",
    5: "Congrats! Only one more secret to unlock!",
  };

  // Sprite dimensions per level (width is single frame, height is total)
  const spriteSizes = {
    1: { width: 64, height: 100 },
    2: { width: 64, height: 100 },
    3: { width: 125, height: 100 },
    4: { width: 112, height: 130 },
    5: { width: 128, height: 128 },
  };

  // Spritesheet mapping for levels 1-5
  const spritesheets = {
    1: spriteLevel1,
    2: spriteLevel2,
    3: spriteLevel3,
    4: spriteLevel4,
    5: spriteLevel5,
  };

  // If we have a spritesheet for this level, render it
  if (spritesheets[level]) {
    const spriteSize = spriteSizes[level];
    const frameOffsets = [0, -spriteSize.width, -spriteSize.width * 2];

    // Custom positioning per level (x: left/right, y: up/down)
    const spritePositions = {
      1: { x: 0, y: 0 },
      2: { x: 0, y: 0 },
      3: { x: 0, y: 0 },
      4: { x: 0, y: 0 },
      5: { x: 0, y: 0 },
    };

    // Bubble positions per level
    const bubblePositions = {
      1: { x: 0, y: 0 },
      2: { x: 0, y: 0 },
      3: { x: 0, y: 0 },
      4: { x: 0, y: 0 },
      5: { x: 0, y: 0 },
    };

    return (
      <div className="pixel-hero" onClick={() => grantXp("pixel-hero-click", 0, "Hey! That tickles! No XP here!")}>
        <div
          className="hero-speech-bubble"
          style={{
            transform: `translate(${bubblePositions[level].x}px, ${bubblePositions[level].y}px)`,
          }}
        >
          {showLevelUpMessage ? hints[level] || "Click around to help me level up!" : heroMessage || "Click around to help me level up!"}
        </div>
        <div
          className="hero-sprite"
          style={{
            backgroundImage: `url(${spritesheets[level]})`,
            backgroundPosition: `${frameOffsets[frameIndex]}px 0`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${spriteSize.width * 3}px ${spriteSize.height}px`,
            width: `${spriteSize.width}px`,
            height: `${spriteSize.height}px`,
            transform: `translate(${spritePositions[level].x}px, ${spritePositions[level].y}px)`,
            transition: "none",
          }}
        />
      </div>
    );
  }

  // Fallback for levels without sprites yet
  const fallbackData = {
    1: "💻",
    2: "🎧",
    3: "🚀",
    4: "⭐",
    5: "🧙‍♂️",
  };

  return (
    <div className="pixel-hero">
      <div className="hero-sprite">{fallbackData[level] || "💻"}</div>
      <div className="hero-speech-bubble">{hints[level] || "Welcome!"}</div>
    </div>
  );
}

export default PixelHero;
