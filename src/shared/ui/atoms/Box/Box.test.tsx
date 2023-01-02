import { renderWithTheme } from "test/testUtils";
import { screen } from "@testing-library/react";
import { Box } from "./Box";

describe("<Box/>", () => {
  it("should render the Box component", () => {
    renderWithTheme(<Box />);
    expect(screen.getByTestId("BoxTestId")).toBeInTheDocument();
  });
});
