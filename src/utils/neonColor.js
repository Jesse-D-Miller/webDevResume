export function getRandomNeonColor(element) {
  // Check if color already exists on this element
  const existingColor = element.style.getPropertyValue("--neon-color");
  if (existingColor) return; // Already has a color, don't change it
  
  const colors = [
    { rgb: "255, 0, 110", opacity: "rgba(255, 0, 110, 0.3)" },
    { rgb: "0, 212, 255", opacity: "rgba(0, 212, 255, 0.3)" },
    { rgb: "0, 255, 65", opacity: "rgba(0, 255, 65, 0.3)" },
    { rgb: "255, 255, 0", opacity: "rgba(255, 255, 0, 0.3)" },
    { rgb: "255, 0, 255", opacity: "rgba(255, 0, 255, 0.3)" },
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  element.style.setProperty("--neon-color", `rgb(${color.rgb})`);
  element.style.setProperty("--neon-color-opacity", color.opacity);
}
