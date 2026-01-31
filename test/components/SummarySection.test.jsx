import { describe, it, expect, vi, afterEach } from "vitest";
import { render, fireEvent, cleanup } from "@testing-library/react";
import SummarySection from "../../src/components/resume/SummarySection.jsx";
import { XPContext } from "../../src/context/XPContext.js";

const resumeData = {
  summary: "Test summary content.",
};

function renderWithXP(ui, value) {
  return render(
    <XPContext.Provider value={value}>{ui}</XPContext.Provider>
  );
}

describe("SummarySection", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders summary text and header", () => {
    const { getByText } = renderWithXP(
      <SummarySection resumeData={resumeData} theme="dark" />,
      { grantXp: vi.fn(), hasClicked: () => false }
    );

    expect(getByText("SUMMARY")).toBeTruthy();
    expect(getByText("Test summary content.")).toBeTruthy();
  });

  it("shows power button only in cyber theme", () => {
    const darkRender = renderWithXP(
      <SummarySection resumeData={resumeData} theme="dark" />,
      { grantXp: vi.fn(), hasClicked: () => false }
    );
    expect(darkRender.queryByLabelText("Toggle power")).toBeNull();
    darkRender.unmount();

    const cyberRender = renderWithXP(
      <SummarySection resumeData={resumeData} theme="cyber" />,
      { grantXp: vi.fn(), hasClicked: () => false }
    );
    expect(cyberRender.getByLabelText("Toggle power")).toBeTruthy();
  });

  it("toggles powered state classes on click", () => {
    const { container, getByLabelText } = renderWithXP(
      <SummarySection resumeData={resumeData} theme="cyber" />,
      { grantXp: vi.fn(), hasClicked: () => false }
    );

    const section = container.querySelector(".summary-section");
    expect(section).not.toBeNull();
    expect(section.className).toContain("powered-off-initial");

    fireEvent.click(getByLabelText("Toggle power"));
    expect(section.className).toContain("powered-on");

    fireEvent.click(getByLabelText("Toggle power"));
    expect(section.className).toContain("powered-off");
  });

  it("grants XP only once", () => {
    const grantXp = vi.fn();
    const hasClicked = vi.fn()
      .mockImplementationOnce(() => false)
      .mockImplementationOnce(() => true);

    const { getByLabelText } = renderWithXP(
      <SummarySection resumeData={resumeData} theme="cyber" />,
      { grantXp, hasClicked }
    );

    fireEvent.click(getByLabelText("Toggle power"));
    fireEvent.click(getByLabelText("Toggle power"));

    expect(grantXp).toHaveBeenCalledTimes(1);
    expect(grantXp).toHaveBeenCalledWith(
      "power-click",
      1,
      "That's my summary! Give it a read to learn a little about me!"
    );
  });
});
