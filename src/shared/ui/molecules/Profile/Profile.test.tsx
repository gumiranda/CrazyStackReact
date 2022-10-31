import { renderWithTheme } from "test/testUtils";
import { screen } from "@testing-library/react";
import { Profile } from "./Profile";

describe("<Profile/>", () => {
  it("should render the Profile component", () => {
    renderWithTheme(<Profile showProfileData />);
    expect(screen.getByTestId("ProfileTestId")).toBeInTheDocument();
  });
});
