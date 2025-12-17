import { useContext } from "react";
import { XPContext } from "../context/XPContext";
export const useXP = () => useContext(XPContext);