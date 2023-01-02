/* eslint-disable @typescript-eslint/no-empty-function */
import { screen } from "@testing-library/react";
import { renderWithTheme } from "test/testUtils";
import { TableItems } from "./TableItems";

describe("<TableItems/>", () => {
  it("should render the TableItems", () => {
    renderWithTheme(
      <TableItems
        items={[]}
        route={"/"}
        fields={[]}
        setItems={() => {}}
        linkOnMouseEnter={() => {}}
      />
    );
    expect(screen.getByTestId("TableTestId")).toBeInTheDocument();
  });
});
