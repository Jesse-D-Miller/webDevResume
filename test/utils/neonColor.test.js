import { expect } from "chai";
import { getRandomNeonColor } from "../../src/utils/neonColor.js";

describe("getRandomNeonColor", () => {
  it("returns undefined when element is missing", () => {
    const result = getRandomNeonColor(null);
    expect(result).to.equal(undefined);
  });

  it("sets CSS variables on the element style", () => {
    const setCalls = [];
    const element = {
      style: {
        setProperty: (key, value) => setCalls.push({ key, value }),
      },
    };

    const result = getRandomNeonColor(element);

    expect(result).to.have.property("rgb");
    expect(result).to.have.property("opacity");
    expect(setCalls).to.have.length(2);
    expect(setCalls[0].key).to.equal("--neon-color");
    expect(setCalls[0].value).to.match(/^rgb\(/);
    expect(setCalls[1].key).to.equal("--neon-color-opacity");
    expect(setCalls[1].value).to.match(/^rgba\(/);
  });
});
