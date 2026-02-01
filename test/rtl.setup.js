import { expect } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

globalThis.IS_REACT_ACT_ENVIRONMENT = true;
