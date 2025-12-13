import { test, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import App from "../../App";

test("renders products page", async () => {
  renderWithProviders(<App />);

  expect(
    await screen.findByText(/products/i)
  ).toBeInTheDocument();
});
