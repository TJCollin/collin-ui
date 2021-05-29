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
      <TabItem label="first">
        First Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat.
      </TabItem>
      <TabItem label="second">
        Second Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat.
      </TabItem>
      <TabItem label="third">
        Third Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat.
      </TabItem>
    </Tabs>
  );
};

export const CardTabs: Story<TabsProps> = () => {
  return (
    <Tabs type="card">
      <TabItem label="first">
        First Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat.
      </TabItem>
      <TabItem label="second">
        Second Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat.
      </TabItem>
      <TabItem label="third">
        Third Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat.
      </TabItem>
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
      >
        First Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat.
      </TabItem>
      <TabItem label="second">
        Second Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat.
      </TabItem>
      <TabItem label="third">
        Third Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat.
      </TabItem>
      <TabItem label="disabled" disaled></TabItem>
    </Tabs>
  );
};
