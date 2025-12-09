
export function getRandomNeonColor(element) {
const colors = ['#ff006e', '#00d4ff', '#00ff41'];
const randomColor = colors[Math.floor(Math.random() * colors.length)];
element.style.setProperty('--neon-color', randomColor);
}