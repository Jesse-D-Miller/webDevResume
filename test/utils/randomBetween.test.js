import { expect } from "chai";
import randomBetween from "../../src/utils/randomBetween.js";

describe("randomBetween", () => {
  it("returns deterministic midpoint when Math.random is stubbed", () => {
    const originalRandom = Math.random;
    Math.random = () => 0.5;

    try {
      const value = randomBetween(0, 10);
      expect(value).to.equal(5);
    } finally {
      Math.random = originalRandom;
    }
  });

  it("returns min when Math.random is 0", () => {
    const originalRandom = Math.random;
    Math.random = () => 0;

    try {
      const value = randomBetween(3, 7);
      expect(value).to.equal(3);
    } finally {
      Math.random = originalRandom;
    }
  });
});
