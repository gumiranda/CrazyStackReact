import { renderWithTheme } from "test/testUtils";
import { screen } from "@testing-library/react";
import { NavLink } from "./NavLink";

describe("<NavLink/>", () => {
  it("should render the NavLink component", () => {
    renderWithTheme(<NavLink />);
    expect(screen.getByTestId("NavLinkTestId")).toBeInTheDocument();
  });
});
