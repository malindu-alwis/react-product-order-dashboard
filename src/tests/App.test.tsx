import { test, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "./test-utils";
import App from "../App";

test("app renders without crashing", () => {
  renderWithProviders(<App />);
  expect(screen.getByTestId("app-root")).toBeInTheDocument();
});