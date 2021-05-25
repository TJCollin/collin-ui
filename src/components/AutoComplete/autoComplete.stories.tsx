import React from "react";
import AutoComplete, { AutoCompleteProps } from "./autoComplete";
import { Story, Meta } from "@storybook/react/types-6-0";
import axios from "../../__mocks__/axios";

const axiosTool = axios as any;

export default {
  title: "AutoComplete",
  component: AutoComplete,
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          width: "300px",
          flexDirection: "column",
          minHeight: "200px",
        }}
      >
        {Story()}
      </div>
    ),
    (Story) => (
      <div>
        <p>
          Try input a letter like <code>a</code>.
        </p>
        <Story />
      </div>
    ),
  ],
} as Meta;

export const Default: Story<AutoCompleteProps> = () => {
  const arr = [
    { value: "abc", label: "abc" },
    { value: "bcd", label: "bcd" },
    { value: "cde", label: "cde" },
    { value: "def", label: "def" },
    { value: "efg", label: "efg" },
    { value: "fgh", label: "fgh" },
  ];

  const fetchLocalSuggestion = (val: string) =>
    arr.filter((item) => item.value.includes(val));

  return (
    <>
      <AutoComplete fetchSuggestions={fetchLocalSuggestion}></AutoComplete>
    </>
  );
};
Default.storyName = "Basic Usage";

export const FetchRemoteData: Story<AutoCompleteProps> = () => {
  const fetchAsyncSuggestion = (val: string) => {
    return axiosTool
      .get("fakeUrl.com")
      .then((res: any) => {
        return res.data;
      })
      .then((items: any[]) =>
        items.filter((item: any) => item.value.includes(val))
      );
  };
  return (
    <>
      <AutoComplete fetchSuggestions={fetchAsyncSuggestion}></AutoComplete>
    </>
  );
};

export const SuggestionTemplate: Story<AutoCompleteProps> = () => {
  const fetchAsyncSuggestion = (val: string) => {
    return axiosTool
      .get("fakeUrl.com")
      .then((res: any) => {
        return res.data;
      })
      .then((items: any[]) =>
        items.filter((item: any) => item.value.includes(val))
      );
  };
  const renderOptions = (item: any) => {
    return (
      <div>
        <span role="img" aria-label="tag" style={{ paddingRight: "10px" }}>
          📚
        </span>
        {item.value}
      </div>
    );
  };
  return (
    <>
      <AutoComplete
        fetchSuggestions={fetchAsyncSuggestion}
        renderOptions={renderOptions}
      ></AutoComplete>
    </>
  );
};
SuggestionTemplate.decorators = [
  (Story) => (
    <div>
      <span style={{ whiteSpace: "nowrap" }}>
        <code>renderOptions</code> can be used to customize suggetion item
        style.
      </span>
      <p> </p>
      <Story />
    </div>
  ),
];
