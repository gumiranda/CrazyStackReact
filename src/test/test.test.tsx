import { render } from "@testing-library/react";
import Home from "../pages/index";
import React from "react";

describe("first test", () => {
  it("should render div", () => {
    const { container } = render(<Home />);
    expect(container.querySelector("div")).toBeInTheDocument();
  });
});
