import { renderWithTheme } from "test/testUtils";
import { screen } from "@testing-library/react";
import { Checkbox } from "./Checkbox";

describe("<Checkbox/>", () => {
  it("should render the Checkbox component", () => {
    renderWithTheme(<Checkbox />);
    expect(screen.getByTestId("CheckboxTestId")).toBeInTheDocument();
  });
});
