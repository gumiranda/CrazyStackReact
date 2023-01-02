import { renderWithTheme } from "test/testUtils";
import { screen } from "@testing-library/react";
import { Logo } from "./Logo";

describe("<Logo/>", () => {
  it("should render the Logo component", () => {
    renderWithTheme(<Logo />);
    expect(screen.getByTestId("LogoTestId")).toBeInTheDocument();
  });
});
