import { test, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../tests/test-utils";
import { useColorMode } from "../theme/ColorModeContext";

function TestComp() {
  const { mode } = useColorMode();
  return <div>MODE: {mode}</div>;
}

test("default theme mode is light", () => {
  renderWithProviders(<TestComp />);
  expect(screen.getByText("MODE: light")).toBeInTheDocument();
});