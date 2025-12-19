// Generates a random floating-point number between min (inclusive) and max (exclusive)
// Example: randomBetween(1, 5) could return 1.234, 3.456, etc.
function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export default randomBetween;