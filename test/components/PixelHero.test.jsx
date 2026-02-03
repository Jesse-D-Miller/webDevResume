import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, fireEvent, act, cleanup } from "@testing-library/react";
import PixelHero from "../../src/components/common/PixelHero.jsx";
import { XPContext } from "../../src/context/XPContext.js";

function renderWithXP(ui, value) {
  return render(
    <XPContext.Provider value={value}>
      {ui}
    </XPContext.Provider>
  );
}

describe("PixelHero", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("renders sprite and hint for level 1", () => {
    const contextValue = {
      xp: 0,
      grantXp: vi.fn(),
      heroMessage: "",
      setHeroMessage: vi.fn(),
    };

    const { getByLabelText } = renderWithXP(
      <PixelHero theme="dark" isFlipped={false} setIsFlipped={vi.fn()} />,
      contextValue
    );

    expect(getByLabelText("Pixel hero")).toBeTruthy();
    expect(getByLabelText("Pixel hero hint").textContent).toMatch(
      /Hey! I'm Jesse/i
    );
  });

  it("advances animation frames over time", () => {
    const contextValue = {
      xp: 0,
      grantXp: vi.fn(),
      heroMessage: "",
      setHeroMessage: vi.fn(),
    };

    const { getByLabelText } = renderWithXP(
      <PixelHero theme="dark" isFlipped={false} setIsFlipped={vi.fn()} />,
      contextValue
    );

    const sprite = getByLabelText("Pixel hero");
    const initialPosition = sprite.style.backgroundPosition;

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    const nextPosition = sprite.style.backgroundPosition;
    expect(nextPosition).not.toEqual(initialPosition);
  });

  it("shows heroMessage after level-up hint timeout", () => {
    const contextValue = {
      xp: 0,
      grantXp: vi.fn(),
      heroMessage: "Custom message",
      setHeroMessage: vi.fn(),
    };

    const { getByLabelText } = renderWithXP(
      <PixelHero theme="dark" isFlipped={false} setIsFlipped={vi.fn()} />,
      contextValue
    );

    act(() => {
      vi.advanceTimersByTime(4000);
    });

    expect(getByLabelText("Pixel hero hint").textContent).toBe(
      "Custom message"
    );
  });

  it("calls grantXp with zero XP on sprite click", () => {
    const grantXp = vi.fn();
    const contextValue = {
      xp: 0,
      grantXp,
      heroMessage: "",
      setHeroMessage: vi.fn(),
    };

    const { getByLabelText } = renderWithXP(
      <PixelHero theme="dark" isFlipped={false} setIsFlipped={vi.fn()} />,
      contextValue
    );

    fireEvent.click(getByLabelText("Pixel hero"));

    expect(grantXp).toHaveBeenCalledWith(
      "pixel-hero-click",
      0,
      "Hey! That tickles! No XP here!"
    );
  });

  it("toggles flip when xp >= 12 and theme is dark", () => {
    const setIsFlipped = vi.fn();
    const contextValue = {
      xp: 12,
      grantXp: vi.fn(),
      heroMessage: "",
      setHeroMessage: vi.fn(),
    };

    const { getByLabelText } = renderWithXP(
      <PixelHero theme="dark" isFlipped={false} setIsFlipped={setIsFlipped} />,
      contextValue
    );

    fireEvent.click(getByLabelText("Pixel hero hint"));

    expect(setIsFlipped).toHaveBeenCalledTimes(1);
  });

  it("does not toggle flip when xp is below 12", () => {
    const setIsFlipped = vi.fn();
    const contextValue = {
      xp: 11,
      grantXp: vi.fn(),
      heroMessage: "",
      setHeroMessage: vi.fn(),
    };

    const { getByLabelText } = renderWithXP(
      <PixelHero theme="dark" isFlipped={false} setIsFlipped={setIsFlipped} />,
      contextValue
    );

    fireEvent.click(getByLabelText("Pixel hero hint"));

    expect(setIsFlipped).not.toHaveBeenCalled();
  });

  it("does not toggle flip when theme is cyber", () => {
    const setIsFlipped = vi.fn();
    const contextValue = {
      xp: 12,
      grantXp: vi.fn(),
      heroMessage: "",
      setHeroMessage: vi.fn(),
    };

    const { getByLabelText } = renderWithXP(
      <PixelHero theme="cyber" isFlipped={false} setIsFlipped={setIsFlipped} />,
      contextValue
    );

    fireEvent.click(getByLabelText("Pixel hero hint"));

    expect(setIsFlipped).not.toHaveBeenCalled();
  });

  it("shows final hint when xp reaches max", () => {
    const contextValue = {
      xp: 12,
      maxXp: 12,
      grantXp: vi.fn(),
      heroMessage: "",
      setHeroMessage: vi.fn(),
    };

    const { getByLabelText } = renderWithXP(
      <PixelHero theme="dark" isFlipped={false} setIsFlipped={vi.fn()} />,
      contextValue
    );

    expect(getByLabelText("Pixel hero hint").textContent).toMatch(
      /Navigate back to the regular resume/i
    );
  });

  it("temporarily shows new hero message then restores final hint", () => {
    const contextValue = {
      xp: 12,
      maxXp: 12,
      grantXp: vi.fn(),
      heroMessage: "New hero message",
      setHeroMessage: vi.fn(),
    };

    const { getByLabelText } = renderWithXP(
      <PixelHero theme="dark" isFlipped={false} setIsFlipped={vi.fn()} />,
      contextValue
    );

    expect(getByLabelText("Pixel hero hint").textContent).toContain(
      "New hero message"
    );

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(getByLabelText("Pixel hero hint").textContent).toMatch(
      /Navigate back to the regular resume/i
    );
  });

  it("sets Finnegan message only after reveal", () => {
    const setHeroMessage = vi.fn();
    const setIsFlipped = vi.fn();
    const contextValue = {
      xp: 12,
      maxXp: 12,
      grantXp: vi.fn(),
      heroMessage: "",
      setHeroMessage,
    };

    const { getByLabelText, rerender } = renderWithXP(
      <PixelHero theme="dark" isFlipped={false} setIsFlipped={setIsFlipped} />,
      contextValue
    );

    fireEvent.click(getByLabelText("Pixel hero hint"));

    rerender(
      <XPContext.Provider value={contextValue}>
        <PixelHero theme="dark" isFlipped={true} setIsFlipped={setIsFlipped} />
      </XPContext.Provider>
    );

    expect(setHeroMessage).toHaveBeenCalledWith(
      "This is finnegan! Click the button below and I'll give him a treat for you"
    );
  });
});
