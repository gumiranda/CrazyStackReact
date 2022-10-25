import { renderWithTheme } from "test/testUtils";
import { screen } from "@testing-library/react";
import { Button } from "./Button";

describe("<Button/>", () => {
  it("should render the Button component", () => {
    renderWithTheme(<Button />);
    expect(screen.getByTestId("ButtonTestId")).toBeInTheDocument();
  });
});
