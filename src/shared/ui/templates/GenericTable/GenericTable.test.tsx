import { screen } from "@testing-library/react";
import { renderWithTheme } from "test/testUtils";
import { GenericTable } from "./GenericTable";
const Text = ({ id, ...data }: any) => {
  return <h1 data-testid={"h1TestId" + id}>{data[id]}</h1>;
};
describe("<GenericTable/>", () => {
  it("should render the GenericTable", () => {
    renderWithTheme(
      <GenericTable
        items={[{ test: "valueTest", description: "somedescription", email: "someemail" }]}
        route={"/"}
        fields={[
          { id: "test", label: "teste", displayKeyText: true },
          {
            id: "description",
            label: "teste2",
            displayKeyText: false,
            children: <Text />,
          },
          {
            id: "email",
            label: "email",
            displayKeyText: false,
            children: <Text />,
          },
        ]}
        setItems={() => {}}
        linkOnMouseEnter={() => {}}
        isLoading={false}
        error={undefined}
        routeCreate={"/"}
        routeList={"/"}
        title={"Teste"}
      />
    );
    expect(screen.getByTestId("TableTestId")).toBeInTheDocument();
    expect(screen.getByTestId("h1TestIdemail")).toBeInTheDocument();
    expect(screen.getByTestId("h1TestIddescription")).toBeInTheDocument();
    expect(screen.getByText("valueTest")).toBeInTheDocument();
    expect(screen.getByText("somedescription")).toBeInTheDocument();
    expect(screen.getByText("someemail")).toBeInTheDocument();
  });
});
