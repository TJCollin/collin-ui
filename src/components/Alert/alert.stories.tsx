import React from "react";
import Alert, { AlertProps } from "./alert";
import { Story, Meta } from "@storybook/react/types-6-0";

export default {
  title: "Alert",
  component: Alert,
  decorators: [
    (Story) => (
      <div style={{ display: "flex", width: "300px", flexDirection: "column" }}>
        {Story()}
      </div>
    ),
  ],
} as Meta;

const Template: Story<AlertProps> = (args) => <Alert {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "this is a alert",
  type: "default",
};
Default.storyName = "Basic Usage";

export const Types: Story<AlertProps> = () => (
  <>
    <Alert type="default" title="Default Alert"></Alert>
    <Alert type="success" title="Success Alert"></Alert>
    <Alert type="danger" title="Error Alert"></Alert>
    <Alert type="warning" title="Warning Alert"></Alert>
  </>
);

export const Closable: Story<AlertProps> = () => (
  <>
    <Alert
      type="default"
      title="Closable"
      onClose={() => {
        alert("closed");
      }}
    ></Alert>
    <Alert type="default" title="Unclosable" closable={false}></Alert>
  </>
);
Closable.decorators = [
  (Story) => (
    <div>
      <p>
        <code>onClose</code> event fires when alert is closed.
      </p>
      <Story />
    </div>
  ),
];

export const Description = Template.bind({});
Description.args = {
  title: "Alert with description",
  description: "description under the title",
};
Description.storyName = "With description";
