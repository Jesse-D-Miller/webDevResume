import React, { useState } from "react";
import { XPContext } from "./XPContext";
import { resumeData } from "../data/resume";

export function XPProvider({ children }) {
  // XP related global state
  const [xp, setXp] = useState(0);
  const [clickedIds, setClickedIds] = useState(new Set());
  const [heroMessage, setHeroMessage] = useState("");
  const maxXp = 12;
  const getProjectNumber = (id) => {
    const match = String(id ?? "").match(/\d+/);
    return match ? Number.parseInt(match[0], 10) : 0;
  };
  const topProjects = [...resumeData.projects]
    .sort((a, b) => getProjectNumber(b.id) - getProjectNumber(a.id))
    .slice(0, 3);
  const projectLinkEntries = topProjects.flatMap((project) => {
    const links = project?.links ?? {};
    const entries = [];
    if (links.live) entries.push([`project-link-${project.id}-live`, 1]);
    if (links.code) entries.push([`project-link-${project.id}-code`, 1]);
    if (links.video) entries.push([`project-link-${project.id}-video`, 1]);
    return entries;
  });
  const xpClickValues = new Map([
    ["experience-tabs", 1],
    ...topProjects.slice(1).map((project) => [`project-tab-${project.id}`, 1]),
    ["soft-skill-click", 1],
    ["soft-skill-final-click", 1],
    ["github-stats-link", 1],
    ["hobby-click", 1],
    ["hobby-final-click", 1],
    ["linkedin-link", 1],
    ["github-link", 1],
    ["holo-map-green-complete", 1],
    ["holo-map-red-complete", 1],
    ["holo-map-yellow-complete", 1],
    ["technical-skills-section", 1],
    ["battery-click", 1],
    ["power-click", 1],
    ...projectLinkEntries,
  ]);
  const maxXpPoints = Array.from(xpClickValues.values()).reduce(
    (total, value) => total + value,
    0
  );
  const completedXpPoints = Array.from(clickedIds).reduce(
    (total, id) => total + (xpClickValues.get(id) || 0),
    0
  );

  // grant XP function
  const grantXp = (id, amount = 1, message = "") => {
    if (!clickedIds.has(id)) {
      // only grant XP once per id
      setXp((prev) => prev + amount);
      setClickedIds((prev) => new Set(prev).add(id)); // add id to clicked set
      if (message) {
        setHeroMessage(message); // set hero message if provided
      }
    }
  };

  //check if already clicked
  const hasClicked = (id) => clickedIds.has(id);

  //context value
  const value = {
    xp,
    maxXp,
    maxXpPoints,
    completedXpPoints,
    clickedIds,
    heroMessage,
    grantXp,
    hasClicked,
    setHeroMessage,
  };

  return <XPContext.Provider value={value}>{children}</XPContext.Provider>;
}
