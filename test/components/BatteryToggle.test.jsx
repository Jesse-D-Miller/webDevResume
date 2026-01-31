import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, fireEvent, act } from "@testing-library/react";
import BatteryToggle from "../../src/components/common/BatteryToggle.jsx";
import { XPContext } from "../../src/context/XPContext.js";

function renderWithXP(ui, value) {
  return render(
    <XPContext.Provider value={value}>
      {ui}
    </XPContext.Provider>
  );
}

describe("BatteryToggle", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the toggle wrapper and svg icon", () => {
    const contextValue = {
      grantXp: vi.fn(),
      hasClicked: () => false,
    };

    const { container } = renderWithXP(
      <BatteryToggle onClick={() => {}} theme="dark" />,
      contextValue
    );

    const toggle = container.querySelector(".battery-toggle");
    const icon = container.querySelector("svg");

    expect(toggle).not.toBeNull();
    expect(icon).not.toBeNull();
  });

  it("uses the dark theme default frame", () => {
    const contextValue = {
      grantXp: vi.fn(),
      hasClicked: () => false,
    };

    const { container } = renderWithXP(
      <BatteryToggle onClick={() => {}} theme="dark" />,
      contextValue
    );

    const path = container.querySelector("svg path");
    expect(path).not.toBeNull();
  });

  it("uses the cyber theme default frame", () => {
    const contextValue = {
      grantXp: vi.fn(),
      hasClicked: () => false,
    };

    const { container } = renderWithXP(
      <BatteryToggle onClick={() => {}} theme="cyber" />,
      contextValue
    );

    const path = container.querySelector("svg path");
    expect(path).not.toBeNull();
  });

  it("starts animation on hover for dark theme", () => {
    const contextValue = {
      grantXp: vi.fn(),
      hasClicked: () => false,
    };

    const { container } = renderWithXP(
      <BatteryToggle onClick={() => {}} theme="dark" />,
      contextValue
    );

    const toggle = container.querySelector(".battery-toggle");
    const firstPath = container.querySelector("svg path")?.getAttribute("d");

    expect(toggle).not.toBeNull();
    expect(firstPath).not.toBeNull();

    fireEvent.mouseEnter(toggle);

    act(() => {
      vi.advanceTimersByTime(600);
    });

    const nextPath = container.querySelector("svg path")?.getAttribute("d");
    expect(nextPath).not.toEqual(firstPath);
  });

  it("does not start animation on hover for cyber theme", () => {
    const contextValue = {
      grantXp: vi.fn(),
      hasClicked: () => false,
    };

    const { container } = renderWithXP(
      <BatteryToggle onClick={() => {}} theme="cyber" />,
      contextValue
    );

    const toggle = container.querySelector(".battery-toggle");
    const firstPath = container.querySelector("svg path")?.getAttribute("d");

    expect(toggle).not.toBeNull();
    expect(firstPath).not.toBeNull();

    fireEvent.mouseEnter(toggle);

    act(() => {
      vi.advanceTimersByTime(600);
    });

    const nextPath = container.querySelector("svg path")?.getAttribute("d");
    expect(nextPath).toEqual(firstPath);
  });

  it("calls onClick and grants XP once", () => {
    const grantXp = vi.fn();
    const onClick = vi.fn();

    const contextValue = {
      grantXp,
      hasClicked: () => false,
    };

    const { container } = renderWithXP(
      <BatteryToggle onClick={onClick} theme="dark" />,
      contextValue
    );

    const toggle = container.querySelector(".battery-toggle");

    expect(toggle).not.toBeNull();

    fireEvent.click(toggle);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(grantXp).toHaveBeenCalledTimes(1);
  });

  it("clears interval on unmount", () => {
    const contextValue = {
      grantXp: vi.fn(),
      hasClicked: () => false,
    };

    const { container, unmount } = renderWithXP(
      <BatteryToggle onClick={() => {}} theme="dark" />,
      contextValue
    );

    const toggle = container.querySelector(".battery-toggle");
    expect(toggle).not.toBeNull();

    fireEvent.mouseEnter(toggle);
    unmount();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(vi.getTimerCount()).toBe(0);
  });
});
