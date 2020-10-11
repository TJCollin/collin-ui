import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import Input, { InputProps } from "./input";
import Icon from "../Icon/icon";
export default {
  title: "Input",
  component: Input,
} as Meta;

export const BasicUsage: Story<InputProps> = () => <Input></Input>;
export const InputSize: Story<InputProps> = () => (
  <div>
    <Input size="lg"></Input>
    <br />
    <Input size="sm"></Input>
  </div>
);
export const InputIcon: Story<InputProps> = () => (
  <div>
    <Input icon="search"></Input>
  </div>
);
export const MixedInput: Story<InputProps> = () => (
  <div>
    <Input prepend="id"></Input>
    <br />
    <Input prepend={<Icon icon="id-card"></Icon>}></Input>
    <br />
    <Input append="search"></Input>
    <br />
    <Input append={<Icon icon="search"></Icon>}></Input>
  </div>
);
