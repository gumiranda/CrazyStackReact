import { renderWithTheme } from "test/testUtils";
import { screen } from "@testing-library/react";
import { Input } from "./Input";

describe("<Input/>", () => {
  it("should render the Input component", () => {
    renderWithTheme(<Input name="test" />);
    expect(screen.getByTestId("InputTestId")).toBeInTheDocument();
    expect(screen.getByTestId("InputTestId")).toHaveAttribute("name", "test");
  });
});
