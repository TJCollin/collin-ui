import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import Button, { ButtonProps } from "./button";

export default {
  title: "Button",
  component: Button,
  argTypes: { onClick: { action: "onClick" } },
} as Meta;

export const Default: Story<ButtonProps> = () => {
  return <Button btnType="default">Default</Button>;
};
Default.storyName = "Basic Usage";

export const ButtonSize: Story<ButtonProps> = () => {
  return (
    <div>
      <Button size="sm">Size</Button>
      <Button size="lg">Size</Button>
    </div>
  );
};

export const ButtonTypes: Story<ButtonProps> = () => {
  return (
    <div>
      <Button btnType="default">default</Button>
      <Button btnType="danger">danger</Button>
      <Button btnType="primary">primary</Button>
      <Button btnType="link">link button</Button>
    </div>
  );
};
