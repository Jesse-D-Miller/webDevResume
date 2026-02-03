import { describe, it, expect, vi, afterEach } from "vitest";
import { render, fireEvent, cleanup } from "@testing-library/react";
import TechnicalSkillsSection from "../../src/components/resume/TechnicalSkillsSection.jsx";
import { XPContext } from "../../src/context/XPContext.js";

const resumeData = {
  skills: [
    { name: "JavaScript", tags: ["language"] },
    { name: "React", tags: ["framework"] },
    { name: "PostgreSQL", tags: ["database"] },
    { name: "Mocha", tags: ["testing"] },
    { name: "Git", tags: ["version-control"] },
    { name: "REST APIs", tags: ["api"] },
    { name: "CLI", tags: ["tooling"] },
  ],
};

function renderWithXP(value) {
  return render(
    <XPContext.Provider value={value}>
      <TechnicalSkillsSection resumeData={resumeData} />
    </XPContext.Provider>
  );
}

describe("TechnicalSkillsSection", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the section header and categories", () => {
    const { getByText } = renderWithXP({ grantXp: vi.fn() });

    expect(getByText("TECHNICAL SKILLS")).toBeTruthy();
    expect(getByText("Languages:")).toBeTruthy();
    expect(getByText("Frameworks & Libraries:")).toBeTruthy();
    expect(getByText("Databases:")).toBeTruthy();
    expect(getByText("Testing:")).toBeTruthy();
    expect(getByText("Tools & Other:")).toBeTruthy();
  });

  it("renders skills grouped by tag", () => {
    const { getByText } = renderWithXP({ grantXp: vi.fn() });

    expect(getByText(/JavaScript/)).toBeTruthy();
    expect(getByText(/React/)).toBeTruthy();
    expect(getByText(/PostgreSQL/)).toBeTruthy();
    expect(getByText(/Mocha/)).toBeTruthy();
    expect(getByText(/Git/)).toBeTruthy();
    expect(getByText(/REST APIs/)).toBeTruthy();
    expect(getByText(/CLI/)).toBeTruthy();
  });

  it("grants XP when section is clicked", () => {
    const grantXp = vi.fn();
    const { container } = renderWithXP({ grantXp });

    const section = container.querySelector(".technical-skills-section");
    expect(section).not.toBeNull();

    fireEvent.click(section);

    expect(grantXp).toHaveBeenCalledWith(
      "technical-skills-section",
      1,
      "Programming levels! I'm proud of this one. It shows the total bytes of code I've written in each language across all my GitHub projects."
    );
  });
});
