import { renderWithTheme } from "test/testUtils";
import { screen } from "@testing-library/react";
import { Flex } from "./Flex";

describe("<Flex/>", () => {
  it("should render the Flex component", () => {
    renderWithTheme(<Flex />);
    expect(screen.getByTestId("FlexTestId")).toBeInTheDocument();
  });
});
