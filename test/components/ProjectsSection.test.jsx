import { describe, it, expect, vi, afterEach } from "vitest";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { XPContext } from "../../src/context/XPContext.js";
import ProjectsSection from "../../src/components/resume/ProjectsSection.jsx";

const project = {
  id: "portfolio",
  title: "Portfolio",
  heroMessage: "Check out the build!",
  stack: ["React", "Vite"],
  links: {
    code: "https://example.com/repo",
    video: "",
  },
  highlights: ["Fast", "Responsive"],
};

function renderWithXP(ui, value) {
  return render(<XPContext.Provider value={value}>{ui}</XPContext.Provider>);
}

describe("ProjectsSection", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders header when requested", () => {
    const { getByText } = renderWithXP(
      <ProjectsSection project={project} isFront={false} showHeader theme="dark" />,
      { grantXp: vi.fn(), hasClicked: () => false }
    );

    expect(getByText("PROJECTS")).toBeTruthy();
  });

  it("omits header when not requested", () => {
    const { queryByText } = renderWithXP(
      <ProjectsSection project={project} isFront showHeader={false} theme="dark" />,
      { grantXp: vi.fn(), hasClicked: () => false }
    );

    expect(queryByText("PROJECTS")).toBeNull();
  });

  it("renders project title as a link when a live or code link exists", () => {
    const { getByText } = renderWithXP(
      <ProjectsSection project={project} isFront={false} showHeader theme="dark" />,
      { grantXp: vi.fn(), hasClicked: () => false }
    );

    const link = getByText("Portfolio");
    expect(link.tagName.toLowerCase()).toBe("a");
    expect(link.getAttribute("href")).toBe("https://example.com/repo");
  });

  it("renders project title as text when no links are available", () => {
    const { getByText } = renderWithXP(
      <ProjectsSection
        project={{ ...project, links: {} }}
        isFront={false}
        showHeader
        theme="dark"
      />,
      { grantXp: vi.fn(), hasClicked: () => false }
    );

    const title = getByText("Portfolio");
    expect(title.tagName.toLowerCase()).toBe("h4");
  });

  it("grants XP on link click", () => {
    const grantXp = vi.fn();
    const { getByText } = renderWithXP(
      <ProjectsSection project={project} isFront={false} showHeader theme="cyber" />,
      { grantXp, hasClicked: () => false }
    );

    fireEvent.click(getByText("GITHUB"));

    expect(grantXp).toHaveBeenCalledWith(
      "project-link-portfolio-code",
      1,
      "Check out the build!"
    );
  });

  it("applies clicked style when hasClicked returns true", () => {
    const { getByText } = renderWithXP(
      <ProjectsSection project={project} isFront={false} showHeader theme="cyber" />,
      { grantXp: vi.fn(), hasClicked: (id) => id === "project-link-portfolio-code" }
    );

    const link = getByText("GITHUB");
    expect(link.style.color).toBe("var(--color-neon-secondary)");
  });

  it("renders disabled links when missing", () => {
    const { getByText } = renderWithXP(
      <ProjectsSection
        project={{ ...project, links: { live: "", code: "", video: "" } }}
        isFront={false}
        showHeader
        theme="cyber"
      />,
      { grantXp: vi.fn(), hasClicked: () => false }
    );

    expect(getByText("WEBSITE").className).toContain("disabled");
    expect(getByText("GITHUB").className).toContain("disabled");
    expect(getByText("VIDEO").className).toContain("disabled");
  });

  it("renders tech stack and highlights", () => {
    const { getByText } = renderWithXP(
      <ProjectsSection project={project} isFront={false} showHeader theme="dark" />,
      { grantXp: vi.fn(), hasClicked: () => false }
    );

    expect(getByText("React, Vite")).toBeTruthy();
    expect(getByText("Fast")).toBeTruthy();
    expect(getByText("Responsive")).toBeTruthy();
  });

  it("uses defaults when project fields are missing", () => {
    const { getByText, queryByText } = renderWithXP(
      <ProjectsSection project={{}} isFront={false} showHeader theme="dark" />,
      { grantXp: vi.fn(), hasClicked: () => false }
    );

    expect(getByText("Project")).toBeTruthy();
    expect(queryByText("PROJECTS")).toBeTruthy();
  });
});
