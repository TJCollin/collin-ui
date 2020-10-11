import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import Icon, { IconProps } from "./icon";
import Button from "../Button/button";

export default {
  title: "Icon",
  component: Icon,
} as Meta;

export const Default: Story<IconProps> = () => {
  return (
    <div>
      <Button>
        <Icon icon="arrow-left"></Icon>
      </Button>
      <Button>
        <Icon icon="arrow-right"></Icon>
      </Button>
    </div>
  );
};
Default.storyName = "Basic Usage";

export const IconTheme: Story<IconProps> = () => {
  return (
    <div>
      <Button>
        <Icon icon="arrow-left" theme="danger"></Icon>
      </Button>
      <Button>
        <Icon icon="arrow-right" theme="success"></Icon>
      </Button>
    </div>
  );
};
