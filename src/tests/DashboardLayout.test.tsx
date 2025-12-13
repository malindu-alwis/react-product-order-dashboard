import { test, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../tests/test-utils";
import DashboardLayout from "../layout/DashboardLayout";

test("renders sidebar links", () => {
  renderWithProviders(<DashboardLayout />);
  expect(screen.getByText(/Products/i)).toBeInTheDocument();
  expect(screen.getByText(/Orders/i)).toBeInTheDocument();
});