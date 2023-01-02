import { render } from "@testing-library/react";
import Home from "../pages/index";

describe("first test", () => {
  it("should render div", () => {
    const { container } = render(<Home />);
    expect(container.querySelector("div")).toBeInTheDocument();
  });
});
