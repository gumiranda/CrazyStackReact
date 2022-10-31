import { renderWithTheme } from "test/testUtils";
import { screen } from "@testing-library/react";
import { Table } from "./Table";

describe("<Table/>", () => {
  it("should render the Table component", () => {
    renderWithTheme(<Table />);
    expect(screen.getByTestId("TableTestId")).toBeInTheDocument();
  });
});
