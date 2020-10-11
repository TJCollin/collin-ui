import { render } from "@testing-library/react";
import React from "react";
import Icon, { IconProps } from "./icon";

describe("Icon", () => {
  const testProps: IconProps = {
    icon: "search",
    theme: "danger",
  };
  it("should render in different theme based on given props", () => {
    const wrapper = render(<Icon {...testProps}></Icon>);
    const container = wrapper.container;
    expect(container.querySelector(".icon")).toBeInTheDocument();
    let icon = container.querySelector(".icon") as HTMLElement;
    expect(icon).toHaveClass("icon-danger");
    expect(container.querySelector("[data-icon='search']")).toBeInTheDocument();
  });
});
