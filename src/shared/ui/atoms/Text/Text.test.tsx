import { renderWithTheme } from "test/testUtils";
import { screen } from "@testing-library/react";
import { Text } from "./Text";

describe("<Text/>", () => {
  it("should render the Text component", () => {
    renderWithTheme(<Text />);
    expect(screen.getByTestId("TextTestId")).toBeInTheDocument();
  });
});
