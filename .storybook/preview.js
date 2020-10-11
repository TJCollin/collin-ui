/*
 * @Author: your name
 * @Date: 2020-09-13 10:46:52
 * @LastEditTime: 2020-10-11 14:24:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \collin-components\.storybook\preview.js
 */
import "../src/styles/index.scss";
import React from "react";
export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	storySort: ['Introduction']
};

export const decorators = [
  (Story, Context) => (
    <div style={{ padding: "20px 40px" }}>
      <h3 style={{ marginBottom: "20px" }}>{Context.name}</h3>
      <Story />
    </div>
  ),
];
