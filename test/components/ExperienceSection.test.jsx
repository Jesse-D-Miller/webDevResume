import { describe, it, expect } from "vitest";
import { render, cleanup } from "@testing-library/react";
import ExperienceSection from "../../src/components/resume/ExperienceSection.jsx";

const job = {
  company: "Acme Corp",
  role: "Frontend Dev",
  period: "2022 - 2024",
  bullets: ["Built UI", "Improved performance"],
};

describe("ExperienceSection", () => {
  it("renders header when requested", () => {
    const { getByText } = render(
      <ExperienceSection job={job} isFront={false} showHeader />
    );

    expect(getByText("EXPERIENCE")).toBeTruthy();
    expect(getByText("Acme Corp - Frontend Dev")).toBeTruthy();
    expect(getByText("2022 - 2024")).toBeTruthy();
    expect(getByText("Built UI")).toBeTruthy();
    expect(getByText("Improved performance")).toBeTruthy();
    cleanup();
  });

  it("omits header when not requested", () => {
    const { queryByText } = render(
      <ExperienceSection job={job} isFront showHeader={false} />
    );

    expect(queryByText("EXPERIENCE")).toBeNull();
    cleanup();
  });
});
