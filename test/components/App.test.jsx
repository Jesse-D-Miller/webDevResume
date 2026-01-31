import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import App from "../../src/App.jsx";

describe("App", () => {
  it("renders with dark theme by default", () => {
    const { container } = render(<App />);

    const appRoot = container.querySelector(".App");
    expect(appRoot).toBeTruthy();
    expect(appRoot?.classList.contains("theme-dark")).toBe(true);
  });

  it("toggles to cyber theme when battery toggle is clicked", async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);

    const appRoot = container.querySelector(".App");
    const toggle = container.querySelector(".battery-toggle");

    expect(appRoot).toBeTruthy();
    expect(toggle).toBeTruthy();

    await user.click(toggle);

    expect(appRoot?.classList.contains("theme-cyber")).toBe(true);
  });
});
