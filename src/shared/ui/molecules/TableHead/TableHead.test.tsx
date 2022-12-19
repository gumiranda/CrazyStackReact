import { renderWithTheme } from "test/testUtils";
import { screen } from "@testing-library/react";
import { TableHead } from "./TableHead";

describe("<TableHead/>", () => {
  it("should render the TableHead component", () => {
    renderWithTheme(
      <TableHead
        routeCreate={"/categorys/create"}
        routeList={"/categorys/list"}
        title={"Categorias"}
      />
    );
    expect(screen.getByTestId("TableHeadTestId")).toBeInTheDocument();
    expect(screen.getByText("Lista")).toHaveAttribute("href", "/categorys/list");
    expect(screen.getByText("Cadastrar")).toHaveAttribute("href", "/categorys/create");
  });
});
