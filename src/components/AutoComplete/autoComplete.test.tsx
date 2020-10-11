import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from "@testing-library/react";
import React from "react";
import AutoComplete, {
  AutoCompleteProps,
  DataSourceType,
} from "./autoComplete";
import axios from "axios";

const testArr: DataSourceType[] = [
  { value: "abc", label: "abc" },
  { value: "bcd", label: "bcd" },
  { value: "cde", label: "cde" },
  { value: "def", label: "def" },
  { value: "efg", label: "efg" },
  { value: "fgh", label: "fgh" },
];
const placeholderText = "auto-complete";
const testProps: AutoCompleteProps = {
  fetchSuggestions: (val) => testArr.filter((item) => item.value.includes(val)),
  onSelect: jest.fn(),
  placeholder: placeholderText,
};
let wrapper: RenderResult, inputEl: HTMLInputElement;

describe("AutoComplete", () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps}></AutoComplete>);
    inputEl = wrapper.getByPlaceholderText(placeholderText) as HTMLInputElement;
  });

  it("should have basic behavior", async () => {
    fireEvent.change(inputEl, { target: { value: "a" } });
    // show suggestion when input value changed
    await waitFor(() => {
      expect(wrapper.queryByText("abc")).toBeInTheDocument();
      expect(
        wrapper.container.querySelectorAll(".suggestion-item").length
      ).toBe(1);
    });
    // set value when suggestion item clicked
    fireEvent.click(wrapper.getByText("abc"));
    expect(testProps.onSelect).toBeCalledWith({ value: "abc", label: "abc" });
    expect(inputEl).toHaveValue("abc");
    // clear suggestion after click
    await waitFor(() => {
      expect(
        wrapper.container.querySelectorAll(".suggestion-item").length
      ).toBe(0);
    });
  });
  it("should suppport customize suggestion", async () => {
    cleanup();
    const testRenderOptionProps: AutoCompleteProps = {
      ...testProps,
      renderOptions: (data) => {
        return <div className="test-render">{data.value}</div>;
      },
    };
    wrapper = render(<AutoComplete {...testRenderOptionProps}></AutoComplete>);
    inputEl = wrapper.getByPlaceholderText(placeholderText) as HTMLInputElement;
    fireEvent.change(inputEl, { target: { value: "b" } });
    await waitFor(() => {
      expect(wrapper.container.querySelectorAll(".test-render").length).toBe(2);
    });
  });
  it("should respond to key events", async () => {
    fireEvent.change(inputEl, { target: { value: "b" } });
    await waitFor(() => {
      expect(
        wrapper.container.querySelectorAll(".suggestion-item").length
      ).toBe(2);
    });
    const firstSuggestion = wrapper.getByText("abc");
    const secondSuggestion = wrapper.getByText("bcd");
    // default actived suggestion item
    expect(firstSuggestion).toHaveClass("been-actived");
    // arrow down
    fireEvent.keyDown(inputEl, { key: "ArrowDown" });
    expect(firstSuggestion).not.toHaveClass("been-actived");
    expect(secondSuggestion).toHaveClass("been-actived");
    // arrow up
    fireEvent.keyDown(inputEl, { key: "ArrowUp" });
    expect(secondSuggestion).not.toHaveClass("been-actived");
    expect(firstSuggestion).toHaveClass("been-actived");
    // enter
    fireEvent.keyDown(inputEl, { key: "Enter" });
    expect(inputEl).toHaveValue("abc");
    await waitFor(() => {
      expect(
        wrapper.container.querySelectorAll(".suggestion-item").length
      ).toBe(0);
    });
    // esc
    fireEvent.change(inputEl, { target: { value: "b" } });
    await waitFor(() => {
      expect(
        wrapper.container.querySelectorAll(".suggestion-item").length
      ).toBe(2);
    });
    fireEvent.keyDown(inputEl, { key: "Escape" });
    expect(inputEl).toHaveValue("b");
    await waitFor(() => {
      expect(
        wrapper.container.querySelectorAll(".suggestion-item").length
      ).toBe(0);
    });
  });
  it("should close suggestions when click outside", async () => {
    fireEvent.change(inputEl, { target: { value: "b" } });
    await waitFor(() => {
      expect(
        wrapper.container.querySelectorAll(".suggestion-item").length
      ).toBe(2);
    });
    fireEvent.click(document);
    expect(inputEl).toHaveValue("b");
    await waitFor(() => {
      expect(
        wrapper.container.querySelectorAll(".suggestion-item").length
      ).toBe(0);
    });
  });
  it("should support async fetchSuggestion", async () => {
    cleanup();
    const fetchSuggestion = (val: string) => {
      return axios
        .get("fakeUrl.com")
        .then((res) => {
          return res.data;
        })
        .then((items) => items.filter((item: any) => item.value.includes(val)));
    };
    const testAsyncProps: AutoCompleteProps = {
      fetchSuggestions: fetchSuggestion,
      onSelect: jest.fn(),
      placeholder: placeholderText,
    };
    wrapper = render(<AutoComplete {...testAsyncProps}></AutoComplete>);
    inputEl = wrapper.getByPlaceholderText(placeholderText) as HTMLInputElement;
    fireEvent.change(inputEl, { target: { value: "b" } });
    expect(wrapper.container.querySelectorAll(".suggestion-item").length).toBe(
      0
    );
    // show loading
    await waitFor(() => {
      expect(wrapper.container.querySelectorAll(".loading-icon").length).toBe(
        1
      );
    });
    // hide loading
    await waitFor(() => {
      expect(wrapper.container.querySelectorAll(".loading-icon").length).toBe(
        0
      );
    });
    // show suggestions
    await waitFor(() => {
      expect(
        wrapper.container.querySelectorAll(".suggestion-item").length
      ).toBe(2);
    });
  });
});
