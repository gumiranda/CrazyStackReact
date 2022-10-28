import { renderWithTheme } from "test/testUtils";
import { screen } from "@testing-library/react";
import { Avatar } from "./Avatar";

describe("<Avatar/>", () => {
  it("should render the Avatar component", () => {
    renderWithTheme(<Avatar />);
    expect(screen.getByTestId("AvatarTestId")).toBeInTheDocument();
  });
});
