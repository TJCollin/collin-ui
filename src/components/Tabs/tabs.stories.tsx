import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import Tabs, { TabsProps } from "./tabs";
import TabItem from "./tabItem";
import Icon from "../Icon/icon";
export default {
  title: "Tabs",
  component: Tabs,
  subcomponents: {
    TabItem,
  },
} as Meta;

export const BasicUsage: Story<TabsProps> = () => {
  return (
    <Tabs>
      <TabItem label="first"></TabItem>
      <TabItem label="second"></TabItem>
      <TabItem label="third"></TabItem>
    </Tabs>
  );
};

export const CardTabs: Story<TabsProps> = () => {
  return (
    <Tabs type="card">
      <TabItem label="first"></TabItem>
      <TabItem label="second"></TabItem>
      <TabItem label="third"></TabItem>
      <TabItem label="disabled" disaled></TabItem>
    </Tabs>
  );
};
export const CustomizedTabs: Story<TabsProps> = () => {
  return (
    <Tabs type="card">
      <TabItem
        label={
          <span>
            <Icon icon="book"></Icon> first
          </span>
        }
      ></TabItem>
      <TabItem label="second"></TabItem>
      <TabItem label="third"></TabItem>
      <TabItem label="disabled" disaled></TabItem>
    </Tabs>
  );
};
