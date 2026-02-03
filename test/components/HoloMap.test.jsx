import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
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
  const setViewportWidth = (width) => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: width,
    });
    window.dispatchEvent(new Event("resize"));
  };

  beforeEach(() => {
    setViewportWidth(1200);
  });

  afterEach(() => {
    cleanup();
  });

  it("renders nodes from education, career, and skills", () => {
    const hoveredState = createHoveredNodesState();
    const { container } = renderWithProviders(
      <HoloMap resumeData={resumeData} />,
      hoveredState,
      { grantXp: vi.fn(), hasClicked: () => false }
    );

    expect(container.querySelectorAll(".map-node").length).toBe(3);
  });

  it("shows tooltip when a node is activated", () => {
    const hoveredState = createHoveredNodesState();
    const { container, rerender } = renderWithProviders(
      <HoloMap resumeData={resumeData} />,
      hoveredState,
      { grantXp: vi.fn(), hasClicked: () => false }
    );

    const node = container.querySelector(".node-1");
    fireEvent.pointerEnter(node);

    rerender(
      <XPContext.Provider value={{ grantXp: vi.fn(), hasClicked: () => false }}>
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
      { grantXp: vi.fn(), hasClicked: () => false }
    );

    const node = container.querySelector(".node-2");
    fireEvent.click(node);

    rerender(
      <XPContext.Provider value={{ grantXp: vi.fn(), hasClicked: () => false }}>
        <HoveredNodesContext.Provider value={hoveredState}>
          <HoloMap resumeData={resumeData} />
        </HoveredNodesContext.Provider>
      </XPContext.Provider>
    );

    expect(container.querySelector(".node-tooltip")).not.toBeNull();

    const updatedNode = container.querySelector(".node-2");
    fireEvent.click(updatedNode);

    rerender(
      <XPContext.Provider value={{ grantXp: vi.fn(), hasClicked: () => false }}>
        <HoveredNodesContext.Provider value={hoveredState}>
          <HoloMap resumeData={resumeData} />
        </HoveredNodesContext.Provider>
      </XPContext.Provider>
    );

    expect(container.querySelector(".node-tooltip")).toBeNull();
  });

  it("grants XP when all nodes of each color are activated", () => {
    const clicked = new Set();
    const grantXp = vi.fn((id) => {
      clicked.add(id);
    });
    const hasClicked = (id) => clicked.has(id);
    const hoveredState = createHoveredNodesState();
    const { container } = renderWithProviders(
      <HoloMap resumeData={resumeData} />,
      hoveredState,
      { grantXp, hasClicked }
    );

    fireEvent.pointerEnter(container.querySelector(".node-1"));
    fireEvent.pointerEnter(container.querySelector(".node-2"));
    fireEvent.pointerEnter(container.querySelector(".node-3"));

    expect(grantXp).toHaveBeenCalledWith(
      "holo-map-yellow-complete",
      1,
      "All yellow nodes active. Awards and accolades trail complete."
    );
    expect(grantXp).toHaveBeenCalledWith(
      "holo-map-red-complete",
      1,
      "All red nodes lit. Career path fully traced."
    );
    expect(grantXp).toHaveBeenCalledWith(
      "holo-map-green-complete",
      1,
      "All green nodes online. Education confirmed and humming."
    );
  });

  it("supports keyboard activation", () => {
    const hoveredState = createHoveredNodesState();
    const { container, rerender } = renderWithProviders(
      <HoloMap resumeData={resumeData} />,
      hoveredState,
      { grantXp: vi.fn(), hasClicked: () => false }
    );

    const node = container.querySelector(".node-1");
    fireEvent.keyDown(node, { key: "Enter" });

    rerender(
      <XPContext.Provider value={{ grantXp: vi.fn(), hasClicked: () => false }}>
        <HoveredNodesContext.Provider value={hoveredState}>
          <HoloMap resumeData={resumeData} />
        </HoveredNodesContext.Provider>
      </XPContext.Provider>
    );

    expect(container.querySelector(".node-tooltip")).not.toBeNull();
  });

  it("centers tooltips under 1024px", () => {
    setViewportWidth(800);
    const hoveredState = createHoveredNodesState();
    const { container, rerender } = renderWithProviders(
      <HoloMap resumeData={resumeData} />,
      hoveredState,
      { grantXp: vi.fn(), hasClicked: () => false }
    );

    const node = container.querySelector(".node-1");
    fireEvent.pointerDown(node, { pointerType: "mouse" });

    rerender(
      <XPContext.Provider value={{ grantXp: vi.fn(), hasClicked: () => false }}>
        <HoveredNodesContext.Provider value={hoveredState}>
          <HoloMap resumeData={resumeData} />
        </HoveredNodesContext.Provider>
      </XPContext.Provider>
    );

    expect(container.querySelector(".map-centered-tooltip")).not.toBeNull();
  });

  it("keeps mobile tooltip open until an outside click", () => {
    setViewportWidth(800);
    const hoveredState = createHoveredNodesState();
    const { container, rerender } = renderWithProviders(
      <HoloMap resumeData={resumeData} />,
      hoveredState,
      { grantXp: vi.fn(), hasClicked: () => false }
    );

    const node = container.querySelector(".node-2");
    fireEvent.pointerDown(node, { pointerType: "mouse" });

    rerender(
      <XPContext.Provider value={{ grantXp: vi.fn(), hasClicked: () => false }}>
        <HoveredNodesContext.Provider value={hoveredState}>
          <HoloMap resumeData={resumeData} />
        </HoveredNodesContext.Provider>
      </XPContext.Provider>
    );

    expect(container.querySelector(".map-centered-tooltip")).not.toBeNull();

    fireEvent.pointerDown(document.body, { pointerType: "mouse" });

    rerender(
      <XPContext.Provider value={{ grantXp: vi.fn(), hasClicked: () => false }}>
        <HoveredNodesContext.Provider value={hoveredState}>
          <HoloMap resumeData={resumeData} />
        </HoveredNodesContext.Provider>
      </XPContext.Provider>
    );

    expect(container.querySelector(".map-centered-tooltip")).toBeNull();
  });
});
