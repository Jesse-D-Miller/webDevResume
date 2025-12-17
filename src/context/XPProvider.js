import React, { useState } from "react";
import { XPContext } from "./XPContext";

export function XPProvider({ children }) {
  // XP related global state
  const [xp, setXp] = useState(0);
  const [clickedIds, setClickedIds] = useState(new Set());
  const [heroMessage, setHeroMessage] = useState("");
  const maxXp = 12;

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
    clickedIds,
    heroMessage,
    grantXp,
    hasClicked,
    setHeroMessage,
  };

  return <XPContext.Provider value={value}>{children}</XPContext.Provider>;
}
