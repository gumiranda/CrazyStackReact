import { renderWithTheme } from "test/testUtils";
import { screen } from "@testing-library/react";
import { NavSection } from "./NavSection";

describe("<NavSection/>", () => {
  it("should render the NavSection component", () => {
    renderWithTheme(
      <NavSection title={"teste"}>
        <></>
      </NavSection>
    );
    expect(screen.getByTestId("NavSectionTestId")).toBeInTheDocument();
    expect(screen.getByText("teste")).toBeInTheDocument();
  });
});
