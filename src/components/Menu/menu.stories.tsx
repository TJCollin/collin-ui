import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import Menu, { MenuProps } from "./menu";
import SubMenu from "./subMenu";
import MenuItem from "./menuItem";

export default {
  title: "Menu",
  component: Menu,
  subcomponents: {
    SubMenu: SubMenu,
    MenuItem: MenuItem,
  },
} as Meta;

export const BasicUsage: Story<MenuProps> = () => (
  <Menu>
    <MenuItem>one</MenuItem>
    <MenuItem>two</MenuItem>
    <MenuItem>three</MenuItem>
    <MenuItem>four</MenuItem>
    <MenuItem>five</MenuItem>
    <SubMenu title="Click">
      <MenuItem>sub-1</MenuItem>
      <MenuItem>sub-2</MenuItem>
    </SubMenu>
  </Menu>
);

export const VerticalMenuStory: Story<MenuProps> = () => (
  <Menu mode="vertical">
    <MenuItem>one</MenuItem>
    <MenuItem>two</MenuItem>
    <MenuItem>three</MenuItem>
    <MenuItem>four</MenuItem>
    <MenuItem>five</MenuItem>
    <SubMenu title="Click">
      <MenuItem>sub-1</MenuItem>
      <MenuItem>sub-2</MenuItem>
    </SubMenu>
  </Menu>
);
