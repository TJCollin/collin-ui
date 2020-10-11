import { fireEvent, render, RenderResult } from "@testing-library/react";
import React from "react";
import Icon from "../Icon/icon";
import Input, { InputProps } from "./input";

describe("Input", () => {
  const testProps: InputProps = {
    size: "sm",
    icon: "search",
    placeholder: "test-input",
    append: <Icon icon="arrow-left"></Icon>,
    prepend: <Icon icon="arrow-right"></Icon>,
    onChange: jest.fn(),
  };
  let wrapper: RenderResult,
    container: HTMLElement,
    inputEl: HTMLInputElement,
    outerWrapper: HTMLElement,
    prependWrapper: HTMLElement,
    inputIconWrapper: HTMLElement,
    appendWrapper: HTMLElement;
  it("should render all icons based on given props", () => {
    wrapper = render(<Input {...testProps}></Input>);
    container = wrapper.container;
    inputEl = wrapper.getByPlaceholderText("test-input") as HTMLInputElement;
    expect(container.querySelector(".input-outer-wrapper")).toBeInTheDocument();
    expect(container.querySelector(".input-icon-wrapper")).toBeInTheDocument();
    expect(container.querySelector(".prepend-wrapper")).toBeInTheDocument();
    expect(container.querySelector(".append-wrapper")).toBeInTheDocument();
    outerWrapper = container.querySelector(
      ".input-outer-wrapper"
    ) as HTMLElement;
    inputIconWrapper = container.querySelector(
      ".input-icon-wrapper"
    ) as HTMLElement;
    prependWrapper = container.querySelector(".prepend-wrapper") as HTMLElement;
    appendWrapper = container.querySelector(".append-wrapper") as HTMLElement;
    // prepend icon
    expect(
      prependWrapper.querySelector("[data-icon='arrow-right']")
    ).toBeInTheDocument();
    // input icon
    expect(
      inputIconWrapper.querySelector("[data-icon='search']")
    ).toBeInTheDocument();
    // different style
    expect(outerWrapper).toHaveClass(
      "input-with-prepend",
      "input-with-append",
      "input-sm"
    );
    // append icon
    expect(
      appendWrapper.querySelector("[data-icon='arrow-left']")
    ).toBeInTheDocument();

    // onchange triggered
    fireEvent.change(inputEl, { target: { value: "a" } });
    expect(testProps.onChange).toHaveBeenCalled();
  });
  it("should render disabled input", () => {
    const testDisableInputProps: InputProps = { ...testProps, disabled: true };
    wrapper = render(<Input {...testDisableInputProps}></Input>);
    container = wrapper.container;
    inputEl = wrapper.getByPlaceholderText("test-input") as HTMLInputElement;
    expect(inputEl).toBeDisabled();
    expect(container.querySelector(".input-outer-wrapper")).toBeInTheDocument();
    outerWrapper = container.querySelector(
      ".input-outer-wrapper"
    ) as HTMLElement;
    // disabled style
    expect(outerWrapper).toHaveClass("input-disabled");
  });
});
