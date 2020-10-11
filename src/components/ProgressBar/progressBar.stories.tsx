import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import ProgressBar, { ProgressBarProps } from "./progressBar";

export default {
  title: "ProgressBar",
  component: ProgressBar,
} as Meta;

export const BasicUsage: Story<ProgressBarProps> = () => {
  return <ProgressBar percent={50}> </ProgressBar>;
};

export const Themes: Story<ProgressBarProps> = () => {
  return (
    <div>
      <ProgressBar percent={20} theme="info"></ProgressBar>
      <br />
      <ProgressBar percent={30} theme="danger"></ProgressBar>
      <br />
      <ProgressBar percent={40} theme="primary"></ProgressBar>
      <br />
      <ProgressBar percent={50} theme="warning"></ProgressBar>
      <br />
      <ProgressBar percent={60} theme="success"></ProgressBar>
    </div>
  );
};
