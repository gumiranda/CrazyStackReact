import { renderWithTheme } from "test/testUtils";
import { screen } from "@testing-library/react";
import { Stack } from "./Stack";

describe("<Stack/>", () => {
  it("should render the Stack component", () => {
    renderWithTheme(<Stack />);
    expect(screen.getByTestId("StackTestId")).toBeInTheDocument();
  });
});
