import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, act } from "@testing-library/react";
import Battery from "../../src/components/common/Battery.jsx";
import { XPContext } from "../../src/context/XPContext.js";

function renderWithXP(value) {
  return render(
    <XPContext.Provider value={value}>
      <Battery />
    </XPContext.Provider>
  );
}

describe("Battery", () => {
  it("renders the correct number of segments", () => {
    const contextValue = {
      xp: 0,
      maxXp: 5,
      grantXp: vi.fn(),
      hasClicked: () => false,
    };

    const { container } = renderWithXP(contextValue);
    const segments = container.querySelectorAll(".battery-segment");
    expect(segments).toHaveLength(5);
  });

  it("marks segments as charged based on xp", () => {
    const contextValue = {
      xp: 2,
      maxXp: 5,
      grantXp: vi.fn(),
      hasClicked: () => false,
    };

    const { container } = renderWithXP(contextValue);
    const charged = container.querySelectorAll(".battery-segment.charged");
    expect(charged).toHaveLength(2);
  });

  it("grants XP once and opens the cover on click", async () => {
    const grantXp = vi.fn();
    const contextValue = {
      xp: 0,
      maxXp: 5,
      grantXp,
      hasClicked: () => false,
    };

    const { container } = renderWithXP(contextValue);

    const battery = container.querySelector(".battery");
    const cover = container.querySelector(".battery-cover");

    expect(battery).not.toBeNull();
    expect(cover).not.toBeNull();

    fireEvent.click(battery);

    expect(grantXp).toHaveBeenCalledTimes(1);
    expect(cover.className).toContain("cover-open");
  });

  it("does not toggle cover twice while animating", async () => {
    const grantXp = vi.fn();
    const contextValue = {
      xp: 0,
      maxXp: 5,
      grantXp,
      hasClicked: () => false,
    };

    const { container } = renderWithXP(contextValue);

    const battery = container.querySelector(".battery");
    const cover = container.querySelector(".battery-cover");

    expect(battery).not.toBeNull();
    expect(cover).not.toBeNull();

    fireEvent.click(battery);
    fireEvent.click(battery);

    expect(cover.className).toContain("cover-open");
  });

  it("shows and clears XP float when xp increases", () => {
    vi.useFakeTimers();
    const contextValue = {
      xp: 0,
      maxXp: 5,
      grantXp: vi.fn(),
      hasClicked: () => false,
    };

    const { rerender, queryByText } = render(
      <XPContext.Provider value={contextValue}>
        <Battery />
      </XPContext.Provider>
    );

    expect(queryByText("+1 XP")).toBeNull();

    const updatedValue = { ...contextValue, xp: 1 };
    rerender(
      <XPContext.Provider value={updatedValue}>
        <Battery />
      </XPContext.Provider>
    );

    expect(queryByText("+1 XP")).not.toBeNull();

    act(() => {
      vi.advanceTimersByTime(1100);
    });

    expect(queryByText("+1 XP")).toBeNull();
    vi.useRealTimers();
  });
});
