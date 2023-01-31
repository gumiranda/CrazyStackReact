import { useRouter } from "next/router";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { SearchBar } from "./SearchBar";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));
describe("SearchBar component", () => {
  let router;
  beforeEach(() => {
    router = {
      query: { page: "page" },
      route: "route/[page]",
      push: jest.fn(),
    };
    (useRouter as jest.Mock).mockReturnValue(router);
  });
  it("should render SearchBar component", () => {
    const { getByTestId } = render(<SearchBar name="searchbar" />);
    const input: any = getByTestId("InputSearchId");
    expect(input).toBeInTheDocument();
    expect(input.type).toBe("search");
  });
  it("should navigate to the right page when a value is entered and the enter key is pressed", () => {
    const { getByTestId } = render(<SearchBar name="searchbar" />);
    const input: any = getByTestId("InputSearchId");
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.keyDown(input, { key: "Enter", code: 13 });
    expect(router.push).toHaveBeenCalledWith({
      pathname: "route/page",
      query: { text: "test" },
    });
  });
  it("should navigate to the right page when the enter key is pressed without a value", () => {
    const { getByTestId } = render(<SearchBar name="searchbar" />);
    const input = getByTestId("InputSearchId");
    fireEvent.keyDown(input, { key: "Enter", code: 13 });
    expect(router.push).toHaveBeenCalledWith("route/page");
  });
});
