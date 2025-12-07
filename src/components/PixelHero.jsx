function PixelHero({ level }) {
  // Hero data for different growth stages (levels)
  const heroData ={
    0: { emoji: "👶", hint: "Click around to help me grow!" },
    1: { emoji: "💻", hint: "Check out my projects!" },
    2: { emoji: "🎧", hint: "Explore my GitHub!" },
    3: { emoji: "🚀", hint: "Almost there..." },
    4: { emoji: "🧙‍♂️", hint: "Ready to see what's behind?" }
  };

  // fallback incase level if out of bounds or unset
  const currentHero = heroData[level] || heroData[0];

  return (
    <div className="pixel-hero">
      <div className="hero-sprite">{currentHero.emoji}</div>
      <div className="hero-speech-bubble">{currentHero.hint}</div>
    </div>
  );
}

export default PixelHero;