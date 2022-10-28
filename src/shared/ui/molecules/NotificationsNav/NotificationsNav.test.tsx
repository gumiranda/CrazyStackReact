import { renderWithTheme } from "test/testUtils";
import { screen } from "@testing-library/react";
import { NotificationsNav } from "./NotificationsNav";

describe("<NotificationsNav/>", () => {
  it("should render the NotificationsNav component", () => {
    renderWithTheme(<NotificationsNav />);
    expect(screen.getByTestId("NotificationsNavTestId")).toBeInTheDocument();
  });
});
