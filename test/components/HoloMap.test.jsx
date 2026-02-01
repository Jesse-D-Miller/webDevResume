import { describe, it, expect, vi, afterEach } from "vitest";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { HoveredNodesContext } from "../../src/context/HoveredNodesContext.js";
import { XPContext } from "../../src/context/XPContext.js";
import HoloMap from "../../src/components/resume/HoloMap.jsx";

const resumeData = {
  mapNodes: {
    education: [
      { id: 1, color: "yellow", institution: "School", intel: "Ed" },
    ],
    career: [
      { id: 2, color: "red", vocation: "Engineer", intel: "Work" },
    ],
    skills: [
      { id: 3, color: "green", achievement: "Skill", intel: "Skills" },
    ],
  },
};

function createHoveredNodesState(initialHovered = null, ids = []) {
  let hoveredNode = initialHovered;
  let hoveredNodeIds = new Set(ids);
  return {
    get hoveredNode() {
      return hoveredNode;
    },
    setHoveredNode: (node) => {
      hoveredNode = node;
    },
    get hoveredNodeIds() {
      return hoveredNodeIds;
    },
    setHoveredNodeIds: (updater) => {
      hoveredNodeIds = updater(hoveredNodeIds);
    },
  };
}

function renderWithProviders(ui, hoveredState, xpValue) {
  return render(
    <XPContext.Provider value={xpValue}>
      <HoveredNodesContext.Provider value={hoveredState}>
        {ui}
      </HoveredNodesContext.Provider>
    </XPContext.Provider>
  );
}

describe("HoloMap", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders nodes from education, career, and skills", () => {
    const hoveredState = createHoveredNodesState();
    const { container } = renderWithProviders(
      <HoloMap resumeData={resumeData} />,
      hoveredState,
      { grantXp: vi.fn() }
    );

    expect(container.querySelectorAll(".map-node").length).toBe(3);
  });

  it("shows tooltip when a node is activated", () => {
    const hoveredState = createHoveredNodesState();
    const { container, rerender } = renderWithProviders(
      <HoloMap resumeData={resumeData} />,
      hoveredState,
      { grantXp: vi.fn() }
    );

    const node = container.querySelector(".node-1");
    fireEvent.pointerEnter(node);

    rerender(
      <XPContext.Provider value={{ grantXp: vi.fn() }}>
        <HoveredNodesContext.Provider value={hoveredState}>
          <HoloMap resumeData={resumeData} />
        </HoveredNodesContext.Provider>
      </XPContext.Provider>
    );

    const tooltip = container.querySelector(".node-tooltip");
    expect(tooltip).not.toBeNull();
    expect(tooltip.textContent).toContain("School");
  });

  it("toggle click activates and deactivates a node", () => {
    const hoveredState = createHoveredNodesState();
    const { container, rerender } = renderWithProviders(
      <HoloMap resumeData={resumeData} />,
      hoveredState,
      { grantXp: vi.fn() }
    );

    const node = container.querySelector(".node-2");
    fireEvent.click(node);

    rerender(
      <XPContext.Provider value={{ grantXp: vi.fn() }}>
        <HoveredNodesContext.Provider value={hoveredState}>
          <HoloMap resumeData={resumeData} />
        </HoveredNodesContext.Provider>
      </XPContext.Provider>
    );

    expect(container.querySelector(".node-tooltip")).not.toBeNull();

    const updatedNode = container.querySelector(".node-2");
    fireEvent.click(updatedNode);

    rerender(
      <XPContext.Provider value={{ grantXp: vi.fn() }}>
        <HoveredNodesContext.Provider value={hoveredState}>
          <HoloMap resumeData={resumeData} />
        </HoveredNodesContext.Provider>
      </XPContext.Provider>
    );

    expect(container.querySelector(".node-tooltip")).toBeNull();
  });

  it("grants XP when the final unique node is activated", () => {
    const grantXp = vi.fn();
    const prefilledIds = Array.from({ length: 15 }, (_, index) => index + 10);
    const hoveredState = createHoveredNodesState(null, prefilledIds);
    const { container } = renderWithProviders(
      <HoloMap resumeData={resumeData} />,
      hoveredState,
      { grantXp }
    );

    const node = container.querySelector(".node-3");
    fireEvent.pointerEnter(node);

    expect(grantXp).toHaveBeenCalledWith(
      "holo-map-explorer",
      1,
      "Great job exploring my holo map! You've uncovered a lot about my background and skills."
    );
  });

  it("supports keyboard activation", () => {
    const hoveredState = createHoveredNodesState();
    const { container, rerender } = renderWithProviders(
      <HoloMap resumeData={resumeData} />,
      hoveredState,
      { grantXp: vi.fn() }
    );

    const node = container.querySelector(".node-1");
    fireEvent.keyDown(node, { key: "Enter" });

    rerender(
      <XPContext.Provider value={{ grantXp: vi.fn() }}>
        <HoveredNodesContext.Provider value={hoveredState}>
          <HoloMap resumeData={resumeData} />
        </HoveredNodesContext.Provider>
      </XPContext.Provider>
    );

    expect(container.querySelector(".node-tooltip")).not.toBeNull();
  });
});
