import { useState, useEffect } from "react";
import spriteLevel1 from "../assets/pixelHeroLevel1.png";

function PixelHero({ level }) {
  const [frameIndex, setFrameIndex] = useState(0);

  // Animate sprite frames (600ms per frame)
  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex((prevIndex) => (prevIndex + 1) % 3); // 3 frames per level
    }, 600);
    return () => clearInterval(interval);
  }, []);

  const hints = {
    1: "Hey! My name is Jesse and this is my Resume. Click around to help me grow!",
    2: "Explore my experience!",
    3: "Check out my skills!",
    4: "Almost at max power!",
    5: "Ready to see my secrets?"
  };

  const spriteSize = { width: 128, height: 203 };
  const frameOffsets = [0, -128, -256]; // X offsets for each frame

  // Spritesheet mapping for levels 1-5
  const spritesheets = {
    1: spriteLevel1
  };

  // If we have a spritesheet for this level, render it
  if (spritesheets[level]) {
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
          }}
        />
        <div className="hero-speech-bubble">{hints[level] || "Welcome!"}</div>
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