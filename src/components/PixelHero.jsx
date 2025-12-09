import { useState, useEffect } from "react";
import spriteLevel1 from "../assets/pixelHeroLevel1.png";
import spriteLevel2 from "../assets/pixelHeroLevel2.png";
import spriteLevel3 from "../assets/pixelHeroLevel3.png";
import spriteLevel4 from "../assets/pixelHeroLevel4.png";
import spriteLevel5 from "../assets/pixelHeroLevel5.png";

function PixelHero({ level }) {
  const [frameIndex, setFrameIndex] = useState(0);

  // Animate sprite frames (1000ms per frame)
  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex((prevIndex) => (prevIndex + 1) % 3); // 3 frames per level
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hints = {
    1: "Hey! My name is Jesse and this is my Resume. Click around to help me level up!",
    2: "Am...Am I glowing? Neat!",
    3: "Try clicking that blank space!",
    4: "Almost at max power!",
    5: "Ready to see my secrets?"
  };

  // Sprite dimensions per level (width is single frame, height is total)
  const spriteSizes = {
    1: { width: 128, height: 203 },
    2: { width: 128, height: 203 },
    3: { width: 153, height: 203 },
    4: { width: 225, height: 260 },
    5: { width: 350, height: 350 }
  };

  // Spritesheet mapping for levels 1-5
  const spritesheets = {
    1: spriteLevel1,
    2: spriteLevel2,
    3: spriteLevel3,
    4: spriteLevel4,
    5: spriteLevel5
  };

  // If we have a spritesheet for this level, render it
  if (spritesheets[level]) {
    const spriteSize = spriteSizes[level];
    const frameOffsets = [0, -spriteSize.width, -spriteSize.width * 2];
    
    // Custom positioning per level (x: left/right, y: up/down)
    const spritePositions = {
      1: { x: 0, y: 0 },
      2: { x: 0, y: 0 },
      3: { x: 15, y: 0 },
      4: { x: 55, y: 0 },
      5: { x: 100, y: -55 }
    };
    
    // Bubble positions per level
    const bubblePositions = {
      1: { x: -90, y: 20 },
      2: { x: -90, y: 20 },
      3: { x: -79, y: 20 },
      4: { x: -45, y: 30 },
      5: { x: 25, y: 0 }
    };
    
    return (
      <div className="pixel-hero">
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
            transition: "none"
          }}
        />
        <div className="hero-speech-bubble" style={{ transform: `translate(${bubblePositions[level].x}px, ${bubblePositions[level].y}px)` }}>{hints[level] || "Welcome!"}</div>
      </div>
    );
  }

  // Fallback for levels without sprites yet
  const fallbackData = {
    1: "💻",
    2: "🎧",
    3: "🚀",
    4: "⭐",
    5: "🧙‍♂️"
  };

  return (
    <div className="pixel-hero">
      <div className="hero-sprite">{fallbackData[level] || "💻"}</div>
      <div className="hero-speech-bubble">{hints[level] || "Welcome!"}</div>
    </div>
  );
}

export default PixelHero;