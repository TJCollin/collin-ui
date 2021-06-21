import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import IconButton, { IconButtonProps } from "./iconButton";

export default {
  title: "IconButton",
  component: IconButton,
} as Meta;

export const Default: Story<IconButtonProps> = () => {
  return (
    <div>
      <IconButton icon="arrow-left"></IconButton>
      <IconButton
        rounded
        icon="arrow-right"
        style={{ marginLeft: "20px" }}
      ></IconButton>
    </div>
  );
};
Default.storyName = "Basic Usage";
