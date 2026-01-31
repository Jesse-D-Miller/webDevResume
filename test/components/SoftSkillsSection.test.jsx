import { describe, it, expect, vi, afterEach } from "vitest";
import { render, fireEvent, cleanup } from "@testing-library/react";
import SoftSkillsSection from "../../src/components/resume/SoftSkillsSection.jsx";
import { XPContext } from "../../src/context/XPContext.js";
import { SoftSkillsContext } from "../../src/context/SoftSkillsContext.js";

const resumeData = {
  skills: [
    { name: "Communication", tags: ["soft-skill"] },
    { name: "Leadership", tags: ["soft-skill"] },
    { name: "JavaScript", tags: ["language"] },
  ],
  bonusSoftSkills: [
    { name: "Kindness", tags: ["soft-skill-bonus"] },
    { name: "Work Ethic", tags: ["soft-skill-bonus"] },
  ],
};

function renderWithContexts(ui, { xpValue, softSkillsValue }) {
  return render(
    <XPContext.Provider value={xpValue}>
      <SoftSkillsContext.Provider value={softSkillsValue}>
        {ui}
      </SoftSkillsContext.Provider>
    </XPContext.Provider>
  );
}

describe("SoftSkillsSection", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders soft skills list in non-cyber theme", () => {
    const { getByText } = renderWithContexts(
      <SoftSkillsSection resumeData={resumeData} theme="dark" />,
      {
        xpValue: { grantXp: vi.fn(), hasClicked: () => false },
        softSkillsValue: {
          displayedSkills: resumeData.skills.filter((s) =>
            s.tags.includes("soft-skill")
          ),
          setDisplayedSkills: vi.fn(),
        },
      }
    );

    expect(getByText("SOFT SKILLS")).toBeTruthy();
    expect(getByText("Communication")).toBeTruthy();
    expect(getByText("Leadership")).toBeTruthy();
  });

  it("adds a bonus skill and grants XP in cyber theme", () => {
    const grantXp = vi.fn();
    const setDisplayedSkills = vi.fn();

    const { container } = renderWithContexts(
      <SoftSkillsSection resumeData={resumeData} theme="cyber" />,
      {
        xpValue: { grantXp, hasClicked: () => false },
        softSkillsValue: {
          displayedSkills: resumeData.skills.filter((s) =>
            s.tags.includes("soft-skill")
          ),
          setDisplayedSkills,
        },
      }
    );

    const list = container.querySelector(".soft-skills-list");
    expect(list).not.toBeNull();

    fireEvent.click(list);

    expect(setDisplayedSkills).toHaveBeenCalledTimes(1);
    expect(grantXp).toHaveBeenCalledTimes(1);
  });

  it("stops adding bonus skills after exhaustion", () => {
    const setDisplayedSkills = vi.fn();

    const { container } = renderWithContexts(
      <SoftSkillsSection resumeData={resumeData} theme="cyber" />,
      {
        xpValue: { grantXp: vi.fn(), hasClicked: () => false },
        softSkillsValue: {
          displayedSkills: resumeData.skills.filter((s) =>
            s.tags.includes("soft-skill")
          ),
          setDisplayedSkills,
        },
      }
    );

    const list = container.querySelector(".soft-skills-list");
    expect(list).not.toBeNull();

    resumeData.bonusSoftSkills.forEach(() => {
      fireEvent.click(list);
    });

    fireEvent.click(list);

    expect(setDisplayedSkills).toHaveBeenCalledTimes(
      resumeData.bonusSoftSkills.length
    );
  });
});
