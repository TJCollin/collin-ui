import React from "react";
import { render, fireEvent, getByRole } from "@testing-library/react";
import Alert, { AlertProps } from "./alert";
describe("Alert component", () => {
  const testAlertProps: AlertProps = {
    title: "testAlertTitle",
    type: "success",
    description: "testAlertDesc",
    onClose: jest.fn(),
    className: "testAlertClassName",
    closable: false,
  };
  it("should render default Alert Style", () => {
    const { container, getByText } = render(
      <Alert title={testAlertProps.title}></Alert>
    );
    expect(getByText(testAlertProps.title)).toBeInTheDocument();
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass("alert", "alert-default");
    const closeButton = getByRole(el, "button");
    expect(closeButton.tagName).toBe("BUTTON");
    expect(closeButton).toBeInTheDocument();
  });
  it("should close when close button clicked", () => {
    const { container, getByText, queryByText } = render(
      <Alert title={testAlertProps.title}></Alert>
    );
    expect(getByText(testAlertProps.title)).toBeInTheDocument();
    const el = container.firstChild as HTMLElement;
    const closeButton = getByRole(el, "button");
    fireEvent.click(closeButton);
    expect(queryByText(testAlertProps.title)).not.toBeInTheDocument();
  });
  it("should render different Alert based on different props", () => {
    const { container, getByText, queryByText } = render(
      <Alert {...testAlertProps}></Alert>
    );
    expect(getByText(testAlertProps.title)).toBeInTheDocument();
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass("alert", "alert-success");
    expect(queryByText("x")).not.toBeInTheDocument();
  });
});
