import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import Upload, { UploadProps } from "./upload";
import Button from "../Button/button";

export default {
  title: "Upload",
  component: Upload,
} as Meta;

export const BasicUsage: Story<UploadProps> = () => {
  return (
    <Upload
      style={{ paddingLeft: "20px", width: "300px" }}
      multiple
      accept=".txt"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    >
      <Button>Click to upload</Button>
    </Upload>
  );
};

export const DragEvents: Story<UploadProps> = () => {
  return (
    <Upload
      style={{ paddingLeft: "20px", width: "300px" }}
      multiple
      drag
      accept=".txt"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    >
      click or drag files here to upload.
    </Upload>
  );
};
