import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import Button, { ButtonProps } from "./button";

// as Meta 代表导出的用于描述当前
export default {
  title: "Button",
  component: Button,
} as Meta;

export const Default: Story<ButtonProps> = () => {
  return (
    <div
      style={{
        width: "180px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Button btnType="default">Default</Button>
      <Button btnType="default" disabled>
        Disabled
      </Button>
    </div>
  );
};
Default.storyName = "Basic Usage";

export const ButtonSize: Story<ButtonProps> = () => {
  return (
    <div
      style={{
        width: "220px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Button size="sm">Small Size</Button>

      <Button size="lg">Large Size</Button>
    </div>
  );
};

export const ButtonTypes: Story<ButtonProps> = () => {
  return (
    <div
      style={{
        width: "380px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Button btnType="default">default</Button>
      <Button btnType="danger">danger</Button>
      <Button btnType="primary">primary</Button>
      <Button btnType="link">link button</Button>
    </div>
  );
};

export const ColoredButton: Story<ButtonProps> = () => {
  return (
    <div
      style={{
        width: "170px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Button btnType="primary" colored>
        primary
      </Button>
      <Button btnType="danger" colored>
        danger
      </Button>
    </div>
  );
};
