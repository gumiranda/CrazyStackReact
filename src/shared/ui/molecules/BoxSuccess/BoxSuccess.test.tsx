import { renderWithTheme } from "test/testUtils";
import { screen } from "@testing-library/react";
import { BoxSuccess } from "./BoxSuccess";

describe("<BoxSuccess/>", () => {
  it("should render the BoxSuccess component", () => {
    renderWithTheme(<BoxSuccess title="teste" content="content" />);
    expect(screen.getByTestId("BoxSuccessTestId")).toBeInTheDocument();
    expect(screen.getByText("content")).toBeInTheDocument();
    expect(screen.getByText("teste")).toBeInTheDocument();
  });
});
