import { renderWithTheme } from "test/testUtils";
import { screen } from "@testing-library/react";
import { FormControl } from "./FormControl";

describe("<FormControl/>", () => {
  it("should render the FormControl component", () => {
    renderWithTheme(<FormControl name={"test"} />);
    expect(screen.getByTestId("FormControlTestId")).toBeInTheDocument();
    expect(screen.getByTestId("InputTestId")).toBeInTheDocument();
    expect(screen.getByTestId("InputTestId")).toHaveAttribute("name", "test");
  });
});
