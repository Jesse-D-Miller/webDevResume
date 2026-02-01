import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { act } from "react";
import { XPContext } from "../../src/context/XPContext.js";
import HobbiesSection from "../../src/components/resume/HobbiesSection.jsx";

const resumeData = {
  hobbies: ["Chess", "Hiking"],
  bonusHobbies: ["Retro games", "Synths"],
};

function renderWithXP(ui, value = { grantXp: vi.fn() }) {
  return render(<XPContext.Provider value={value}>{ui}</XPContext.Provider>);
}

describe("HobbiesSection", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(async () => {
    await act(async () => {
      vi.runOnlyPendingTimers();
    });
    vi.useRealTimers();
    cleanup();
  });

  it("renders header and initial hobbies", () => {
    const { getByText } = renderWithXP(
      <HobbiesSection resumeData={resumeData} theme="dark" />
    );

    expect(getByText("HOBBIES")).toBeTruthy();
    expect(getByText("Chess")).toBeTruthy();
    expect(getByText("Hiking")).toBeTruthy();
  });

  it("adds a bonus hobby and grants XP in cyber theme", async () => {
    const grantXp = vi.fn();
    const { getByText, queryByText, container } = renderWithXP(
      <HobbiesSection resumeData={resumeData} theme="cyber" />,
      { grantXp }
    );

    expect(queryByText("Retro games")).toBeNull();

    await act(async () => {
      fireEvent.click(getByText("HOBBIES"));
    });

    expect(getByText("Retro games")).toBeTruthy();
    expect(container.querySelector(".plus-one-flash")).not.toBeNull();
    expect(grantXp).toHaveBeenCalledTimes(1);
  });

  it("does nothing on click in non-cyber theme", async () => {
    const grantXp = vi.fn();
    const { queryByText, getByText, container } = renderWithXP(
      <HobbiesSection resumeData={resumeData} theme="dark" />,
      { grantXp }
    );

    await act(async () => {
      fireEvent.click(getByText("HOBBIES"));
    });

    expect(queryByText("Retro games")).toBeNull();
    expect(container.querySelector(".plus-one-flash")).toBeNull();
    expect(grantXp).not.toHaveBeenCalled();
  });

  it("removes flash after timeout", async () => {
    const { getByText, container } = renderWithXP(
      <HobbiesSection resumeData={resumeData} theme="cyber" />
    );

    await act(async () => {
      fireEvent.click(getByText("HOBBIES"));
    });
    expect(container.querySelector(".plus-one-flash")).not.toBeNull();

    await act(async () => {
      vi.advanceTimersByTime(1500);
    });
    expect(container.querySelector(".plus-one-flash")).toBeNull();
  });

  it("stops adding bonuses after the list is exhausted", async () => {
    const { getByText, queryByText } = renderWithXP(
      <HobbiesSection resumeData={resumeData} theme="cyber" />
    );

    await act(async () => {
      fireEvent.click(getByText("HOBBIES"));
    });
    expect(getByText("Retro games")).toBeTruthy();

    await act(async () => {
      fireEvent.click(getByText("HOBBIES"));
    });
    expect(getByText("Synths")).toBeTruthy();

    await act(async () => {
      fireEvent.click(getByText("HOBBIES"));
    });
    expect(queryByText("Synths")).toBeTruthy();
  });
});
