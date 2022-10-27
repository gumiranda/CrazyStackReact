import { renderWithTheme } from "test/testUtils";
import { screen } from "@testing-library/react";
import { BoxError } from "./BoxError";

describe("<BoxError/>", () => {
  it("should render the BoxError component", () => {
    renderWithTheme(<BoxError title="teste" content="content" />);
    expect(screen.getByTestId("BoxErrorTestId")).toBeInTheDocument();
    expect(screen.getByText("content")).toBeInTheDocument();
    expect(screen.getByText("teste")).toBeInTheDocument();
  });
});
