import { Story, Meta } from "@storybook/react/types-6-0";
import React from "react";
import Card, { CardProps } from "./card";
import CardContent from "./cardContent";

export default {
  title: "Card",
  component: Card,
  subcomponents: { CardContent },
} as Meta;

export const Default: Story<CardProps> = () => {
  return (
    <Card hovered>
      <CardContent>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </CardContent>
    </Card>
  );
};
Default.storyName = "Basic Usage";

export const InsertCard: Story<CardProps> = () => {
  return (
    <Card inset hovered>
      <CardContent>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </CardContent>
    </Card>
  );
};
