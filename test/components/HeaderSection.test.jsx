import { describe, it, expect, vi, afterEach } from "vitest";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { XPContext } from "../../src/context/XPContext.js";
import HeaderSection from "../../src/components/resume/HeaderSection.jsx";

const resumeData = {
  meta: {
    name: "Ada Lovelace",
    location: "London",
    links: {
      email: "ada@example.com",
      linkedin: "https://linkedin.com/in/ada",
      github: "https://github.com/ada",
    },
  },
};

function renderWithXP(ui, value) {
  return render(<XPContext.Provider value={value}>{ui}</XPContext.Provider>);
}

describe("HeaderSection", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders header name and contact info", () => {
    const { getByText, container } = renderWithXP(
      <HeaderSection resumeData={resumeData} theme="dark" />,
      { grantXp: vi.fn(), hasClicked: () => false, xp: 0, maxXp: 100 }
    );

    expect(getByText("ADA LOVELACE")).toBeTruthy();
    const contactInfo = container.querySelector(".contact-info");
    expect(contactInfo).not.toBeNull();
    expect(contactInfo.textContent).toContain("London");
    expect(contactInfo.textContent).toContain("ada@example.com");
    expect(getByText("LinkedIn")).toBeTruthy();
    expect(getByText("GitHub")).toBeTruthy();
  });

  it("cycles header display on click in cyber theme", () => {
    const { container } = renderWithXP(
      <HeaderSection resumeData={resumeData} theme="cyber" />,
      { grantXp: vi.fn(), hasClicked: () => false, xp: 50, maxXp: 100 }
    );

    const header = container.querySelector(".resume-header");
    expect(header).not.toBeNull();

    fireEvent.click(header);
    expect(container.querySelector("h1.case-1")).not.toBeNull();

    fireEvent.click(header);
    expect(container.querySelector("h1.case-2")).not.toBeNull();

    const fill = container.querySelector(".progress-fill");
    expect(fill).not.toBeNull();
    expect(fill.style.width).toBe("50%");
  });

  it("clicking links grants XP without changing header display", () => {
    const grantXp = vi.fn();
    const { container, getByText } = renderWithXP(
      <HeaderSection resumeData={resumeData} theme="cyber" />,
      { grantXp, hasClicked: () => false, xp: 0, maxXp: 100 }
    );

    const header = container.querySelector(".resume-header");
    expect(header).not.toBeNull();

    fireEvent.click(getByText("LinkedIn"));
    expect(grantXp).toHaveBeenCalledWith(
      "linkedin-link",
      1,
      "You found my LinkedIn!"
    );
    expect(container.querySelector("h1.case-1")).toBeNull();

    fireEvent.click(getByText("GitHub"));
    expect(grantXp).toHaveBeenCalledWith(
      "github-link",
      1,
      "You found my GitHub!"
    );
    expect(container.querySelector("h1.case-1")).toBeNull();
  });
});
