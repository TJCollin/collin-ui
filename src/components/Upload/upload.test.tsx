import {
  createEvent,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";
import Upload, { UploadProps, UploadFile } from "./upload";
import React from "react";
import { IconProps } from "../Icon/icon";
jest.mock("../Icon/icon", () => {
  return ({ icon, onClick }: IconProps) => {
    return <span onClick={onClick as any}>{icon}</span>;
  };
});
describe("Upload", () => {
  const createStyleFile = () => {
    const cssFile: string = `
			.upload-input {
				display: none;
			}
		`;
    const style = document.createElement("style");
    style.innerHTML = cssFile;
    return style;
  };

  const testProps: UploadProps = {
    action: "fakeUrl",
    beforeUpload: jest.fn((file: UploadFile) => true),
    onUploadProgress: jest.fn(),
    onUploadSuccess: jest.fn(),
    onUploadError: jest.fn(),
    onFileStatusChange: jest.fn(),
    onFileRemove: jest.fn(),
    headers: { "x-powered-by": "collin" },
    data: { testData: "data" },
    name: "testFile",
    withCredentials: true,
    accept: ".png",
    multiple: true,
    drag: true,
  };
  const testFile: File = new File(["xyz"], "myFile.png", { type: "image/png" });
  let wrapper: RenderResult,
    uploadArea: HTMLElement,
    fileInput: HTMLInputElement;
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>Area</Upload>);
    wrapper.container.append(createStyleFile());
    uploadArea = wrapper.getByText("Area");
    fileInput = wrapper.container.querySelector(
      ".upload-input"
    ) as HTMLInputElement;
  });
  it("upload process should works fine", async () => {
    const { queryByText } = wrapper;
    expect(uploadArea).toBeInTheDocument();
    expect(fileInput).not.toBeVisible();
    fireEvent.change(fileInput, { target: { files: [testFile] } });
    // beforeUpload
    expect(testProps.beforeUpload).toHaveBeenCalled();
    expect(queryByText("spinner")).toBeInTheDocument();
    await waitFor(() => {
      expect(queryByText("myFile.png")).toBeInTheDocument();
      expect(queryByText("check-circle")).toBeInTheDocument();
      // onUploadSuccess
      expect(testProps.onUploadSuccess).toHaveBeenCalledWith(
        "mocked response",
        expect.objectContaining({
          row: testFile,
          name: "myFile.png",
          status: "success",
        })
      );
      // onFileStatusChange
      expect(testProps.onFileStatusChange).toHaveBeenCalledWith(
        expect.objectContaining({ row: testFile })
      );
    });

    // hovered events to be tested ......

    //remove the uploaded file
    expect(queryByText("times")).toBeInTheDocument();
    fireEvent.click(queryByText("times") as HTMLElement);
    expect(queryByText("myFile.png")).not.toBeInTheDocument();
  });

  it("drag event should be handled properly", async () => {
    fireEvent.dragOver(uploadArea);
    expect(uploadArea).toHaveClass("dragger", "drag-active");
    fireEvent.dragLeave(uploadArea);
    expect(uploadArea).not.toHaveClass("drag-active");
    const mockDropEvent = createEvent.drop(uploadArea);
    Object.defineProperty(mockDropEvent, "dataTransfer", {
      value: {
        files: [testFile],
      },
    });
    fireEvent(uploadArea, mockDropEvent);
    await waitFor(() => {
      expect(wrapper.queryByText("check-circle")).toBeInTheDocument();
      expect(wrapper.queryByText("myFile.png")).toBeInTheDocument();
    });
  });
});
