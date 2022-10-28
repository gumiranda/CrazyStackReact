import { renderWithTheme } from "test/testUtils";
import { screen } from "@testing-library/react";
import { Header } from "./Header";

describe("<Header/>", () => {
  it("should render the Header component", () => {
    renderWithTheme(<Header />);
    expect(screen.getByTestId("HeaderTestId")).toBeInTheDocument();
  });
});
