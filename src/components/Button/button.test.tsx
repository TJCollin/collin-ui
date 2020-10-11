import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "./button";
import { ButtonProps } from "./button";

const testText = "Children Text";
const testClass = "test-class";
const testHref = "www.baidu.com";
describe("test Button component", () => {
  it("should render default button", () => {
    const buttonText = "Collin Button";
    const wrapper = render(<Button>{buttonText}</Button>);
    const el = wrapper.getByText(buttonText) as HTMLElement;
    expect(el).toBeInTheDocument();
    expect(el.tagName).toBe("BUTTON");
    expect(el).toHaveClass("btn btn-default");
  });
  it("should render different button based on different props", () => {
    const testProps: ButtonProps = {
      className: testClass,
      btnType: "primary",
      size: "lg",
      children: <span>{testText}</span>,
    };
    const { container, getByText } = render(<Button {...testProps}></Button>);
    expect(getByText(testText)).toBeInTheDocument();
    const el = container.firstChild as HTMLElement;
    expect(el.tagName).toBe("BUTTON");
    expect(el).toHaveClass("btn", `btn-primary`, `btn-lg`, testClass);
  });
  it("should render linkButton when buttonType is link && href is provided", () => {
    const testLinkProps: ButtonProps = {
      className: testClass,
      btnType: "link",
      size: "lg",
      href: testHref,
      children: <span>{testText}</span>,
    };
    const { container, getByText } = render(
      <Button {...testLinkProps}></Button>
    );
    expect(getByText(testText)).toBeInTheDocument();
    const el = container.firstChild as HTMLElement;
    expect(el.tagName).toBe("A");
    expect(el).toHaveClass("btn", `btn-link`, `btn-lg`, testClass);
  });
  it("should render disabled button when disabled set to true", () => {
    const disabledTestProps: ButtonProps = {
      btnType: "primary",
      href: testHref,
      disabled: true,
      onClick: jest.fn(),
    };
    const wrapper = render(<Button {...disabledTestProps}>{testText}</Button>);
    const el = wrapper.getByText(testText) as HTMLButtonElement;
    expect(el.disabled).toBeTruthy();
    fireEvent.click(el);
    expect(disabledTestProps.onClick).not.toHaveBeenCalled();
  });
});
