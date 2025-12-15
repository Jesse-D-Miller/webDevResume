export function getRandomNeonColor(element) {
  if (!element) return; // Safety check if no element is provided

  const colors = [
    { rgb: "0, 255, 255", opacity: "rgba(0, 255, 255, 0.3)" },
    { rgb: "0, 128, 255", opacity: "rgba(0, 174, 255, 0.3)" },
    { rgb: "64, 0, 255", opacity: "rgba(255, 0, 251, 0.3)" },
    { rgb: "186, 0, 255", opacity: "rgba(186, 0, 255, 0.3)" },
    { rgb: "255, 0, 255", opacity: "rgba(255, 0, 255, 0.3)" },
    { rgb: "0, 0, 255", opacity: "rgba(99, 99, 255, 0.3)" },
    { rgb: "0, 255, 200", opacity: "rgba(0, 255, 200, 0.3)" },
    { rgb: "128, 0, 255", opacity: "rgba(128, 0, 255, 0.3)" },
    { rgb: "0, 255, 128", opacity: "rgba(0, 255, 128, 0.3)" },
    { rgb: "171, 116, 255", opacity: "rgba(171, 116, 255, 0.3)" },
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  element.style.setProperty("--neon-color", `rgb(${color.rgb})`);
  element.style.setProperty("--neon-color-opacity", color.opacity);

  return color;
}
